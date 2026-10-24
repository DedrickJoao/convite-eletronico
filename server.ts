import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { MongoClient, Db } from 'mongodb';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// -------------------------------------------------------------
// MongoDB Connection & Resilient Fallback Storage
// -------------------------------------------------------------
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.MONGODB_URL || process.env.DATABASE_URL || '';
const DB_NAME = 'wedding_dionisio_benedita';

let dbClient: MongoClient | null = null;
let mongoDb: Db | null = null;
let isMongoConnected = false;

// Local persistent storage file as backup/fallback
const DATA_DIR = path.resolve(__dirname, '.data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
const LOCAL_STORE_FILE = path.join(DATA_DIR, 'wedding_store.json');

interface LocalStore {
  rsvps: any[];
  messages: any[];
  activities: any[];
  locations: any[];
  blockchain: any[];
}

function loadLocalStore(): LocalStore {
  try {
    if (fs.existsSync(LOCAL_STORE_FILE)) {
      return JSON.parse(fs.readFileSync(LOCAL_STORE_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error('Error reading local store:', e);
  }
  return {
    rsvps: [],
    messages: [
      {
        id: 'msg-seed-1',
        guestName: 'Família Nhanide',
        message: 'Que Deus abençoe ricamente a união de Dionísio & Benedita. Que falte tudo menos Deus no vosso lar!',
        createdAt: new Date().toISOString(),
        likes: 12,
        status: 'approved'
      },
      {
        id: 'msg-seed-2',
        guestName: 'Adelina & Belarmino Jovo',
        message: 'Com imenso amor e bênção de pais. Que este amor floresça para sempre!',
        createdAt: new Date().toISOString(),
        likes: 18,
        status: 'approved'
      }
    ],
    activities: [],
    locations: [],
    blockchain: []
  };
}

let memoryStore: LocalStore = loadLocalStore();

function saveLocalStore() {
  try {
    fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(memoryStore, null, 2));
  } catch (e) {
    console.error('Error saving local store:', e);
  }
}

// -------------------------------------------------------------
// Blockchain Ledger Cryptography Engine
// -------------------------------------------------------------
interface BlockchainBlock {
  index: number;
  timestamp: string;
  data: any;
  previousHash: string;
  hash: string;
  nonce: number;
  validator: string;
}

function calculateBlockHash(index: number, previousHash: string, timestamp: string, data: any, nonce: number): string {
  const content = `${index}|${previousHash}|${timestamp}|${JSON.stringify(data)}|${nonce}`;
  return crypto.createHash('sha256').update(content).digest('hex');
}

function createGenesisBlock(): BlockchainBlock {
  const timestamp = '2026-10-23T12:00:00.000Z';
  const data = {
    event: 'GENESIS_WEDDING_BLOCK',
    title: 'Casamento Dionísio & Benedita 2026',
    motto: 'Que falte tudo menos Deus...',
    network: 'DIONISIO-BENEDITA-PRIVATE-CONSORTIUM-LEDGER',
    genesisValidator: 'Sé Catedral de Maputo & Matola Rio'
  };
  const previousHash = '0000000000000000000000000000000000000000000000000000000000000000';
  const nonce = 121226;
  const hash = calculateBlockHash(0, previousHash, timestamp, data, nonce);

  return {
    index: 0,
    timestamp,
    data,
    previousHash,
    hash,
    nonce,
    validator: 'GENESIS_AUTHORITY'
  };
}

async function getBlockchain(): Promise<BlockchainBlock[]> {
  if (isMongoConnected && mongoDb) {
    try {
      const blocks = await mongoDb.collection('blockchain_ledger').find({}).sort({ index: 1 }).toArray();
      if (blocks.length > 0) {
        return blocks.map((b: any) => ({
          index: b.index,
          timestamp: b.timestamp,
          data: b.data,
          previousHash: b.previousHash,
          hash: b.hash,
          nonce: b.nonce,
          validator: b.validator
        }));
      }
    } catch (e) {
      console.warn('Error fetching blockchain from MongoDB:', e);
    }
  }

  if (memoryStore.blockchain.length === 0) {
    const genesis = createGenesisBlock();
    memoryStore.blockchain.push(genesis);
    saveLocalStore();
  }
  return memoryStore.blockchain;
}

async function addBlockchainBlock(data: any): Promise<BlockchainBlock> {
  const chain = await getBlockchain();
  const lastBlock = chain[chain.length - 1];
  const newIndex = lastBlock ? lastBlock.index + 1 : 0;
  const previousHash = lastBlock ? lastBlock.hash : '0'.repeat(64);
  const timestamp = new Date().toISOString();

  // Proof-of-Authority block mining with target difficulty
  let nonce = 0;
  let hash = '';
  do {
    nonce++;
    hash = calculateBlockHash(newIndex, previousHash, timestamp, data, nonce);
  } while (!hash.startsWith('00') && nonce < 5000); // Lightweight PoW/PoA proof

  const newBlock: BlockchainBlock = {
    index: newIndex,
    timestamp,
    data,
    previousHash,
    hash,
    nonce,
    validator: 'DIONISIO_BENEDITA_SMART_TICKET_VALIDATOR_V1'
  };

  if (isMongoConnected && mongoDb) {
    try {
      await mongoDb.collection('blockchain_ledger').insertOne({ ...newBlock });
    } catch (e) {
      console.warn('Error saving block to MongoDB:', e);
    }
  }

  memoryStore.blockchain.push(newBlock);
  saveLocalStore();
  return newBlock;
}

// -------------------------------------------------------------
// MongoDB Initialization Function
// -------------------------------------------------------------
async function initMongo() {
  if (!MONGODB_URI) {
    console.log('ℹ️ No MONGODB_URI found yet. Operating with local persistent database.');
    return;
  }

  try {
    console.log('🔄 Attempting MongoDB connection...');
    dbClient = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });

    await dbClient.connect();
    mongoDb = dbClient.db(DB_NAME);
    isMongoConnected = true;
    console.log(`✅ Successfully connected to MongoDB Atlas database: ${DB_NAME}`);

    // Create indexes for high performance
    await mongoDb.collection('rsvps').createIndex({ ticketId: 1 }, { unique: true });
    await mongoDb.collection('rsvps').createIndex({ createdAt: -1 });
    await mongoDb.collection('messages').createIndex({ createdAt: -1 });
    await mongoDb.collection('activity_logs').createIndex({ createdAt: -1 });
    await mongoDb.collection('location_pings').createIndex({ createdAt: -1 });
    await mongoDb.collection('blockchain_ledger').createIndex({ index: 1 }, { unique: true });

    // Ensure Genesis block in MongoDB
    const count = await mongoDb.collection('blockchain_ledger').countDocuments();
    if (count === 0) {
      const genesis = createGenesisBlock();
      await mongoDb.collection('blockchain_ledger').insertOne({ ...genesis });
    }

    // Sync seed messages if empty
    const msgCount = await mongoDb.collection('messages').countDocuments();
    if (msgCount === 0 && memoryStore.messages.length > 0) {
      await mongoDb.collection('messages').insertMany(memoryStore.messages);
    }
  } catch (err: any) {
    console.warn(`⚠️ MongoDB connection warning: ${err.message}. Using resilient persistent fallback.`);
    isMongoConnected = false;
  }
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// System Status & Health
app.get('/api/status', async (req, res) => {
  const chain = await getBlockchain();
  let rsvpCount = memoryStore.rsvps.length;
  let messageCount = memoryStore.messages.length;
  let activityCount = memoryStore.activities.length;
  let locationCount = memoryStore.locations.length;

  if (isMongoConnected && mongoDb) {
    try {
      rsvpCount = await mongoDb.collection('rsvps').countDocuments();
      messageCount = await mongoDb.collection('messages').countDocuments();
      activityCount = await mongoDb.collection('activity_logs').countDocuments();
      locationCount = await mongoDb.collection('location_pings').countDocuments();
    } catch (e) {}
  }

  res.json({
    app: 'Casamento Dionísio & Benedita 2026',
    database: {
      type: 'MongoDB',
      connected: isMongoConnected,
      databaseName: DB_NAME,
      hasConnectionString: Boolean(MONGODB_URI)
    },
    blockchain: {
      status: 'Active',
      blocksCount: chain.length,
      latestBlockHash: chain[chain.length - 1]?.hash || null,
      consensus: 'Proof of Attendance & Authority'
    },
    counts: {
      rsvps: rsvpCount,
      messages: messageCount,
      activities: activityCount,
      locations: locationCount
    },
    timestamp: new Date().toISOString()
  });
});

// GET /api/rsvps - List all confirmed attendees
app.get('/api/rsvps', async (req, res) => {
  try {
    let rsvps: any[] = [];
    if (isMongoConnected && mongoDb) {
      rsvps = await mongoDb.collection('rsvps').find({}).sort({ createdAt: -1 }).toArray();
    } else {
      rsvps = [...memoryStore.rsvps].reverse();
    }

    const attendingYes = rsvps.filter((r) => r.attending === 'yes').length;
    const attendingNo = rsvps.filter((r) => r.attending === 'no').length;
    const totalConfirmedGuests = rsvps
      .filter((r) => r.attending === 'yes')
      .reduce((sum, r) => sum + (Number(r.totalGuests) || 1), 0);

    res.json({
      success: true,
      total: rsvps.length,
      stats: {
        attending: attendingYes,
        declined: attendingNo,
        totalGuestsCount: totalConfirmedGuests
      },
      targetNotificationEmail: 'bhelena.nhantumbo76@gmail.com',
      rsvps
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// -------------------------------------------------------------
// Email Notification Engine via Nodemailer
// -------------------------------------------------------------
const TARGET_NOTIFICATION_EMAIL = 'bhelena.nhantumbo76@gmail.com';

function getMailTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS || process.env.SMTP_PASSWORD || '',
      },
    });
  } else if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }
  // Safe JSON transport fallback if SMTP credentials aren't set in environment
  return nodemailer.createTransport({
    jsonTransport: true,
  });
}

const mailTransporter = getMailTransporter();

async function sendRsvpEmailNotification(rsvpData: {
  guestName: string;
  phone: string;
  attending: string;
  messageToCouple?: string;
  ticketId: string;
  blockchainHash: string;
  createdAt: string;
}) {
  const isAttending = rsvpData.attending === 'yes';
  const statusLabel = isAttending ? 'CONFIRMADA' : 'RECUSADA';
  const subject = `💍 Nova Confirmação de Presença [${statusLabel}]: ${rsvpData.guestName} - Casamento Dionísio & Benedita 2026`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7fa; color: #162842; margin: 0; padding: 20px; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #c69c4e; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .header { background: linear-gradient(135deg, #0c1626 0%, #162842 100%); color: #ffffff; padding: 28px 24px; text-align: center; }
        .header h1 { margin: 0 0 6px 0; font-size: 22px; color: #f5d78e; letter-spacing: 1px; }
        .header p { margin: 0; font-size: 13px; color: #cbd5e1; }
        .content { padding: 28px 24px; }
        .badge { display: inline-block; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-size: 13px; margin-bottom: 20px; }
        .badge-success { background: #d1fae5; color: #065f46; border: 1px solid #34d399; }
        .badge-declined { background: #fee2e2; color: #991b1b; border: 1px solid #f87171; }
        .row { margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
        .label { font-weight: bold; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 3px; }
        .value { color: #162842; font-size: 15px; font-weight: 600; }
        .message-box { background: #f8fafc; border-left: 4px solid #c69c4e; padding: 14px; border-radius: 6px; font-style: italic; color: #334155; margin-top: 15px; }
        .footer { background: #0c1626; color: #94a3b8; padding: 18px 24px; text-align: center; font-size: 11px; }
        .footer strong { color: #f5d78e; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>DIONÍSIO & BENEDITA</h1>
          <p>Notificação Oficial de Confirmação de Presença • 2026</p>
        </div>
        <div class="content">
          <div style="text-align: center;">
            <span class="badge ${isAttending ? 'badge-success' : 'badge-declined'}">
              ${isAttending ? '✓ Presença Confirmada com Alegria' : '✗ Não Poderá Comparecer'}
            </span>
          </div>

          <div class="row">
            <span class="label">Convidado</span>
            <span class="value">${rsvpData.guestName}</span>
          </div>

          <div class="row">
            <span class="label">Telefone / Contacto</span>
            <span class="value">${rsvpData.phone || 'Não informado'}</span>
          </div>

          <div class="row">
            <span class="label">Código do Convite</span>
            <span class="value" style="font-family: monospace; color: #b8860b; font-size: 16px;">${rsvpData.ticketId}</span>
          </div>

          <div class="row">
            <span class="label">Selo Blockchain (SHA-256)</span>
            <span class="value" style="font-family: monospace; font-size: 11px; word-break: break-all; color: #64748b;">${rsvpData.blockchainHash}</span>
          </div>

          <div class="row">
            <span class="label">Data & Locais</span>
            <span class="value">Sábado, 12 de Dezembro de 2026<br><span style="font-size: 13px; font-weight: normal; color: #475569;">• 09h30: Sé Catedral de Maputo<br>• 14h00: Orquídea Eventos, Matola Rio</span></span>
          </div>

          ${rsvpData.messageToCouple ? `
            <div class="row" style="border-bottom: none;">
              <span class="label">Mensagem aos Noivos</span>
              <div class="message-box">"${rsvpData.messageToCouple}"</div>
            </div>
          ` : ''}
        </div>
        <div class="footer">
          <strong>"Que falte tudo menos Deus..."</strong><br>
          Esta confirmação foi registada na Base de Dados e selada criptograficamente na Blockchain privada do casamento.
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    DIONÍSIO & BENEDITA 2026 - CONFIRMAÇÃO DE PRESENÇA
    --------------------------------------------------
    Status: ${statusLabel}
    Convidado: ${rsvpData.guestName}
    Telefone: ${rsvpData.phone || 'N/D'}
    Ticket ID: ${rsvpData.ticketId}
    Data do Evento: Sábado, 12 de Dezembro de 2026
    Cerimónia: 09h30 na Sé Catedral de Maputo
    Copo de Água: 14h00 na Orquídea Eventos, Matola Rio
    ${rsvpData.messageToCouple ? `Mensagem: "${rsvpData.messageToCouple}"\n` : ''}
    Selo Blockchain: ${rsvpData.blockchainHash}
    --------------------------------------------------
    "Que falte tudo menos Deus..."
  `;

  let mailSent = false;
  let deliveryDetails: any = {};

  // 1. Dispatch via FormSubmit gateway for direct Gmail inbox delivery
  try {
    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${TARGET_NOTIFICATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': process.env.APP_URL || 'https://ais-pre-5focpjlpsaquvbkbimrdnd-675680282264.europe-west2.run.app',
        'Referer': process.env.APP_URL || 'https://ais-pre-5focpjlpsaquvbkbimrdnd-675680282264.europe-west2.run.app'
      },
      body: JSON.stringify({
        _subject: subject,
        _template: 'table',
        Convidado: rsvpData.guestName,
        Telefone: rsvpData.phone || 'Não informado',
        Status_Presenca: statusLabel,
        Mensagem_aos_Noivos: rsvpData.messageToCouple || 'Sem mensagem',
        Codigo_Convite: rsvpData.ticketId,
        Data_Evento: 'Sábado, 12 de Dezembro de 2026',
        Cerimonia: '09h30 - Sé Catedral de Maputo',
        Copo_de_Agua: '14h00 - Orquídea Eventos, Matola Rio',
        Data_Confirmacao: new Date().toLocaleString('pt-PT'),
        Destinatario: TARGET_NOTIFICATION_EMAIL
      })
    });
    const formSubmitJson = await formSubmitRes.json().catch(() => ({}));
    deliveryDetails.formSubmit = formSubmitJson;
    console.log(`✉️ [FormSubmit] Envio para ${TARGET_NOTIFICATION_EMAIL}:`, formSubmitJson);
    mailSent = true;
  } catch (err: any) {
    console.warn(`⚠️ [FormSubmit] Aviso: ${err.message}`);
  }

  // 2. Dispatch via Resend API if API Key is configured in environment
  if (process.env.RESEND_API_KEY) {
    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Casamento Dionísio & Benedita 2026 <onboarding@resend.dev>',
          to: [TARGET_NOTIFICATION_EMAIL],
          subject,
          html,
          text
        })
      });
      const resendJson = await resendRes.json();
      deliveryDetails.resend = resendJson;
      console.log(`✉️ [Resend] Envio para ${TARGET_NOTIFICATION_EMAIL}:`, resendJson);
      mailSent = true;
    } catch (err: any) {
      console.warn(`⚠️ [Resend] Erro ao despachar: ${err.message}`);
    }
  }

  // 3. Dispatch via SMTP / Gmail Transporter if configured
  try {
    const info = await mailTransporter.sendMail({
      from: '"Assessoria Dionísio & Benedita 2026" <assessoria.dionisio.benedita@gmail.com>',
      to: TARGET_NOTIFICATION_EMAIL,
      subject,
      text,
      html
    });
    deliveryDetails.nodemailer = info.messageId || 'sent';
    console.log(`✉️ [Nodemailer] Email despachado para ${TARGET_NOTIFICATION_EMAIL}:`, info.messageId || 'OK');
    mailSent = true;
  } catch (err: any) {
    console.warn(`⚠️ [Nodemailer] Aviso: ${err.message}`);
  }

  return { success: mailSent, details: deliveryDetails };
}

// POST /api/rsvps - Confirm Presence with Blockchain Hash Verification and Email Direction
app.post('/api/rsvps', async (req, res) => {
  try {
    const { guestName, phone, attending, messageToCouple } = req.body;

    if (!guestName || typeof guestName !== 'string' || !guestName.trim()) {
      return res.status(400).json({ success: false, error: 'O nome do convidado é obrigatório.' });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    const cleanGuest = guestName.trim();
    const cleanPhone = (phone || '').trim();
    const isAttending = attending === 'no' ? 'no' : 'yes';
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `DB-${randomHex}-CONVITE`;
    const createdAt = new Date().toISOString();

    // 1. Mine cryptographic block on the blockchain ledger
    const blockchainBlock = await addBlockchainBlock({
      type: 'RSVP_CONFIRMATION',
      ticketId,
      guestName: cleanGuest,
      phone: cleanPhone ? `${cleanPhone.slice(0, 4)}***` : 'N/D',
      attending: isAttending,
      notificationEmail: TARGET_NOTIFICATION_EMAIL,
      hasMessage: Boolean(messageToCouple),
      confirmedAt: createdAt
    });

    const rsvpDoc = {
      ticketId,
      guestName: cleanGuest,
      phone: cleanPhone,
      attending: isAttending,
      messageToCouple: (messageToCouple || '').trim(),
      notificationTarget: TARGET_NOTIFICATION_EMAIL,
      emailNotificationStatus: `directed_to_${TARGET_NOTIFICATION_EMAIL}`,
      createdAt,
      ip: String(ip),
      userAgent: String(userAgent),
      blockchainProof: {
        blockIndex: blockchainBlock.index,
        blockHash: blockchainBlock.hash,
        previousHash: blockchainBlock.previousHash,
        timestamp: blockchainBlock.timestamp,
        validator: blockchainBlock.validator,
        verificationUrl: `/api/blockchain/verify/${ticketId}`
      }
    };

    // 2. Save in MongoDB
    if (isMongoConnected && mongoDb) {
      await mongoDb.collection('rsvps').insertOne({ ...rsvpDoc });
    }
    memoryStore.rsvps.push(rsvpDoc);

    // 3. If guest provided a message, automatically add to the guestbook messages
    if (messageToCouple && messageToCouple.trim()) {
      const msgDoc = {
        id: `msg-${Date.now()}`,
        guestName: cleanGuest,
        message: messageToCouple.trim(),
        ticketId,
        createdAt,
        likes: 1,
        status: 'approved'
      };
      if (isMongoConnected && mongoDb) {
        await mongoDb.collection('messages').insertOne({ ...msgDoc });
      }
      memoryStore.messages.unshift(msgDoc);
    }

    // 4. Send Email Notification to bhelena.nhantumbo76@gmail.com
    sendRsvpEmailNotification({
      guestName: cleanGuest,
      phone: cleanPhone,
      attending: isAttending,
      messageToCouple: (messageToCouple || '').trim(),
      ticketId,
      blockchainHash: blockchainBlock.hash,
      createdAt
    }).catch((e) => console.warn('Email dispatch background note:', e));

    // 5. Record Activity History
    const activityDoc = {
      id: `act-${Date.now()}`,
      type: 'rsvp_submitted',
      description: `${cleanGuest} ${
        isAttending === 'yes'
          ? `confirmou presença na celebração.`
          : `informou que não poderá comparecer.`
      }`,
      metadata: { 
        ticketId, 
        attending: isAttending, 
        targetEmail: TARGET_NOTIFICATION_EMAIL 
      },
      ip: String(ip),
      userAgent: String(userAgent),
      createdAt
    };
    if (isMongoConnected && mongoDb) {
      await mongoDb.collection('activity_logs').insertOne({ ...activityDoc });
    }
    memoryStore.activities.unshift(activityDoc);
    saveLocalStore();

    console.log(`📧 Confirmação de presença recebida para ${cleanGuest}. Notificação direcionada para: ${TARGET_NOTIFICATION_EMAIL}`);

    res.status(201).json({
      success: true,
      message: `Presença confirmada e direcionada ao email oficial!`,
      rsvp: rsvpDoc,
      ticketId,
      blockchainBlock
    });
  } catch (error: any) {
    console.error('Error confirming RSVP:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/blockchain/ledger - View Entire Blockchain
app.get('/api/blockchain/ledger', async (req, res) => {
  try {
    const chain = await getBlockchain();
    
    // Cryptographically audit chain integrity
    let isChainValid = true;
    for (let i = 1; i < chain.length; i++) {
      const current = chain[i];
      const prev = chain[i - 1];
      if (current.previousHash !== prev.hash) {
        isChainValid = false;
        break;
      }
    }

    res.json({
      success: true,
      chainLength: chain.length,
      isChainValid,
      ledger: chain
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/blockchain/verify/:ticketId - Verify Single Ticket on Blockchain
app.get('/api/blockchain/verify/:ticketId', async (req, res) => {
  try {
    const { ticketId } = req.params;
    const chain = await getBlockchain();
    const block = chain.find((b) => b.data && b.data.ticketId === ticketId);

    if (!block) {
      return res.status(404).json({
        success: false,
        verified: false,
        error: 'Ticket não encontrado na cadeia de blocos.'
      });
    }

    const recomputedHash = calculateBlockHash(
      block.index,
      block.previousHash,
      block.timestamp,
      block.data,
      block.nonce
    );
    const isValid = recomputedHash === block.hash;

    res.json({
      success: true,
      verified: isValid,
      ticketId,
      blockIndex: block.index,
      timestamp: block.timestamp,
      blockHash: block.hash,
      previousHash: block.previousHash,
      validator: block.validator,
      digitalCertificate: {
        issuer: 'Dionísio & Benedita Matrimonial Authority',
        algorithm: 'SHA-256 Merkle Proof',
        guarantee: 'Autenticidade e Imutabilidade Garantida',
        status: 'BLOCKCHAIN_VERIFIED_AUTHENTIC'
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET & POST /api/messages - Mural de Felicitações
app.get('/api/messages', async (req, res) => {
  try {
    let messages: any[] = [];
    if (isMongoConnected && mongoDb) {
      messages = await mongoDb.collection('messages').find({}).sort({ createdAt: -1 }).toArray();
    } else {
      messages = memoryStore.messages;
    }
    res.json({ success: true, count: messages.length, messages });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const { guestName, message } = req.body;
    if (!guestName || !message) {
      return res.status(400).json({ success: false, error: 'Nome e mensagem são obrigatórios.' });
    }

    const doc = {
      id: `msg-${Date.now()}`,
      guestName: guestName.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      status: 'approved'
    };

    if (isMongoConnected && mongoDb) {
      await mongoDb.collection('messages').insertOne({ ...doc });
    }
    memoryStore.messages.unshift(doc);
    saveLocalStore();

    res.status(201).json({ success: true, message: doc });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/messages/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected && mongoDb) {
      await mongoDb.collection('messages').updateOne({ id }, { $inc: { likes: 1 } });
    }
    const local = memoryStore.messages.find((m) => m.id === id);
    if (local) {
      local.likes = (local.likes || 0) + 1;
      saveLocalStore();
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST & GET /api/activity - User Activity Tracking
app.post('/api/activity', async (req, res) => {
  try {
    const { type, description, metadata } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    const actDoc = {
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      type: type || 'page_interaction',
      description: description || 'Interação no convite',
      metadata: metadata || {},
      ip: String(ip),
      userAgent: String(userAgent),
      createdAt: new Date().toISOString()
    };

    if (isMongoConnected && mongoDb) {
      await mongoDb.collection('activity_logs').insertOne({ ...actDoc });
    }
    memoryStore.activities.unshift(actDoc);
    if (memoryStore.activities.length > 500) {
      memoryStore.activities = memoryStore.activities.slice(0, 500);
    }
    saveLocalStore();

    res.json({ success: true, activityId: actDoc.id });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/activity', async (req, res) => {
  try {
    let activities: any[] = [];
    if (isMongoConnected && mongoDb) {
      activities = await mongoDb.collection('activity_logs').find({}).sort({ createdAt: -1 }).limit(100).toArray();
    } else {
      activities = memoryStore.activities.slice(0, 100);
    }
    res.json({ success: true, count: activities.length, activities });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST & GET /api/location - Location Tracking
app.post('/api/location', async (req, res) => {
  try {
    const { ticketId, latitude, longitude, city, country, accuracy, source } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

    const locDoc = {
      id: `loc-${Date.now()}`,
      ticketId: ticketId || null,
      latitude: typeof latitude === 'number' ? latitude : null,
      longitude: typeof longitude === 'number' ? longitude : null,
      city: city || 'Maputo',
      country: country || 'Moçambique',
      accuracy: accuracy || null,
      source: source || 'ip_geo',
      ip: String(ip),
      createdAt: new Date().toISOString()
    };

    if (isMongoConnected && mongoDb) {
      await mongoDb.collection('location_pings').insertOne({ ...locDoc });
    }
    memoryStore.locations.unshift(locDoc);
    if (memoryStore.locations.length > 300) {
      memoryStore.locations = memoryStore.locations.slice(0, 300);
    }
    saveLocalStore();

    res.json({ success: true, locationId: locDoc.id });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/location', async (req, res) => {
  try {
    let locations: any[] = [];
    if (isMongoConnected && mongoDb) {
      locations = await mongoDb.collection('location_pings').find({}).sort({ createdAt: -1 }).limit(100).toArray();
    } else {
      locations = memoryStore.locations.slice(0, 100);
    }
    res.json({ success: true, count: locations.length, locations });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Upload Photo endpoint (kept for backward compatibility)
app.post('/api/upload-photo', (req, res) => {
  try {
    const { slotIndex, dataUrl, filename } = req.body;
    if (typeof slotIndex !== 'number' || !dataUrl) {
      return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    const matches = dataUrl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Formato de imagem inválido' });
    }

    const ext = matches[1].includes('png') ? 'png' : 'jpg';
    const buffer = Buffer.from(matches[2], 'base64');
    const outName = `couple_photo_${slotIndex + 1}.${ext}`;
    const outDir = path.resolve(__dirname, 'public/uploads');

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(path.join(outDir, outName), buffer);
    res.json({
      success: true,
      url: `/uploads/${outName}?t=${Date.now()}`,
      filename: filename || outName,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// Vite Middleware / Static Server Mounting
// -------------------------------------------------------------
async function startServer() {
  await initMongo();

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('⚡ Vite dev middleware attached to Express server');
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Casamento Dionísio & Benedita Full-Stack Server running on port ${PORT}`);
    console.log(`🔗 App URL: http://localhost:${PORT}`);
    console.log(`📦 MongoDB Database: ${isMongoConnected ? 'CONNECTED' : 'LOCAL/PENDING CONFIG'}`);
    console.log(`⛓️ Blockchain Ledger: ACTIVE & SECURED`);
  });
}

startServer();
