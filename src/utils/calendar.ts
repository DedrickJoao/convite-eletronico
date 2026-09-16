import { WEDDING_DETAILS } from '../data/weddingData';

export function getGoogleCalendarUrl(): string {
  const title = encodeURIComponent(`Casamento Real de ${WEDDING_DETAILS.bride} & ${WEDDING_DETAILS.groom}`);
  const details = encodeURIComponent(
    `Você é convidado de honra para o Melhor Casamento de 2026: ${WEDDING_DETAILS.bride} & ${WEDDING_DETAILS.groom}.\n\nLocal: ${WEDDING_DETAILS.venueName}\nEndereço: ${WEDDING_DETAILS.venueAddress}\n\nTraje: Black Tie / Gala Imperial\nFavor apresentar o seu Pass Digital NFC / QR Code na entrada.`
  );
  const location = encodeURIComponent(`${WEDDING_DETAILS.venueName}, ${WEDDING_DETAILS.venueAddress}`);
  // 12 Dec 2026 15:30 to 13 Dec 2026 05:00 UTC
  const startTime = "20261212T153000Z";
  const endTime = "20261213T050000Z";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
}

export function downloadIcsFile(): void {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Benedita e Dionisio//Casamento Real 2026//PT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:casamento-benedita-dionisio-20261212@royalwedding.com",
    "DTSTAMP:20260101T000000Z",
    "DTSTART:20261212T153000Z",
    "DTEND:20261213T050000Z",
    `SUMMARY:Casamento de ${WEDDING_DETAILS.bride} & ${WEDDING_DETAILS.groom} - O Casamento do Ano`,
    `DESCRIPTION:O Melhor Casamento de 2026. Cerimónia Solene e Grande Banquete Imperial.\\nLocal: ${WEDDING_DETAILS.venueName}\\nEndereço: ${WEDDING_DETAILS.venueAddress}\\nTraje: Black Tie Imperial`,
    `LOCATION:${WEDDING_DETAILS.venueName}, ${WEDDING_DETAILS.venueAddress}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-P7D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Lembrete: O Casamento de Benedita & Dionísio é daqui a 1 semana!",
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Hoje é o grande dia! O Casamento Real de Benedita & Dionísio começa em 2 horas.",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "Casamento_Benedita_e_Dionisio_2026.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
