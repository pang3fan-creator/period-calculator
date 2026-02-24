/**
 * ICS Calendar Event Generator
 *
 * Generates ICS (iCalendar) file content for adding period predictions
 * to calendar applications like Apple Calendar, Outlook, etc.
 */

export interface CalendarEvent {
  /** Event title */
  title: string;
  /** Event description */
  description: string;
  /** Event start date (inclusive) */
  startDate: Date;
  /** Event end date (inclusive) */
  endDate: Date;
  /** Optional location */
  location?: string;
}

/**
 * Format date to ICS format (yyyyMMddTHHmmssZ)
 */
function formatDateICS(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

/**
 * Format date to ICS format (yyyyMMdd) for all-day events
 */
function formatDateICSAllDay(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

/**
 * Escape special characters for ICS format
 */
function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/**
 * Generate a unique ID for ICS events
 */
function generateUID(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}@periodcalculator.com`;
}

/**
 * Generate ICS file content from calendar events
 *
 * @param events - Array of calendar events to include in the ICS file
 * @returns ICS file content as string
 */
export function generateICS(events: CalendarEvent[]): string {
  const now = new Date();
  const uid = generateUID();

  // Build VEVENT sections for each event
  const vevents = events.map((event) => {
    const startDate = formatDateICSAllDay(event.startDate);
    const endDate = formatDateICSAllDay(event.endDate);

    return [
      "BEGIN:VEVENT",
      `UID:${generateUID()}`,
      `DTSTAMP:${formatDateICS(now)}`,
      `DTSTART;VALUE=DATE:${startDate}`,
      `DTEND;VALUE=DATE:${endDate}`,
      `SUMMARY:${escapeICSText(event.title)}`,
      `DESCRIPTION:${escapeICSText(event.description)}`,
      event.location ? `LOCATION:${escapeICSText(event.location)}` : null,
      "END:VEVENT",
    ]
      .filter(Boolean)
      .join("\r\n");
  });

  // Build complete ICS file
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Period Calculator//Period Calculator//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Period Calculator Predictions",
    ...vevents,
    "END:VCALENDAR",
  ].join("\r\n");

  return icsContent;
}

/**
 * Helper function to add days to a date
 */
function addDaysICS(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Download ICS file content as a file
 *
 * @param icsContent - ICS file content
 * @param filename - Optional filename (without .ics extension)
 */
export function downloadICS(
  icsContent: string,
  filename = "period-predictions",
): void {
  // Create blob from ICS content
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });

  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.ics`;

  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up
  URL.revokeObjectURL(url);
}
