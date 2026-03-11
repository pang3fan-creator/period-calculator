import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { generateICS, downloadICS, type CalendarEvent } from "./ics-generator";

// Mock document and window objects
const mockCreateElement = vi.fn();
const mockAppendChild = vi.fn();
const mockRemoveChild = vi.fn();
const mockClick = vi.fn();
const mockCreateObjectURL = vi.fn();
const mockRevokeObjectURL = vi.fn();

describe("ics-generator", () => {
  beforeEach(() => {
    vi.stubGlobal("document", {
      createElement: mockCreateElement,
      body: {
        appendChild: mockAppendChild,
        removeChild: mockRemoveChild,
      },
    });

    vi.stubGlobal("URL", {
      createObjectURL: mockCreateObjectURL,
      revokeObjectURL: mockRevokeObjectURL,
    });

    mockCreateElement.mockReturnValue({
      href: "",
      download: "",
      click: mockClick,
    });

    mockCreateObjectURL.mockReturnValue("blob:http://localhost/test");
    mockClick.mockReturnValue(undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetAllMocks();
  });

  describe("generateICS", () => {
    it("should generate ICS content for single event", () => {
      const events: CalendarEvent[] = [
        {
          title: "Period",
          description: "Test description",
          startDate: new Date("2024-01-15"),
          endDate: new Date("2024-01-19"),
        },
      ];

      const ics = generateICS(events);

      expect(ics).toContain("BEGIN:VCALENDAR");
      expect(ics).toContain("VERSION:2.0");
      expect(ics).toContain("BEGIN:VEVENT");
      expect(ics).toContain("SUMMARY:Period");
      expect(ics).toContain("DESCRIPTION:Test description");
      expect(ics).toContain("END:VEVENT");
      expect(ics).toContain("END:VCALENDAR");
    });

    it("should generate ICS content for multiple events", () => {
      const events: CalendarEvent[] = [
        {
          title: "Period",
          description: "Period description",
          startDate: new Date("2024-01-15"),
          endDate: new Date("2024-01-19"),
        },
        {
          title: "Fertile Window",
          description: "Fertile window description",
          startDate: new Date("2024-01-25"),
          endDate: new Date("2024-01-31"),
        },
        {
          title: "Ovulation",
          description: "Ovulation description",
          startDate: new Date("2024-01-29"),
          endDate: new Date("2024-01-29"),
        },
      ];

      const ics = generateICS(events);

      // Should have 3 VEVENT blocks
      const eventCount = ics.split("BEGIN:VEVENT").length - 1;
      expect(eventCount).toBe(3);
    });

    it("should escape backslash character", () => {
      const events: CalendarEvent[] = [
        {
          title: "Test\\Event",
          description: "Test\\description",
          startDate: new Date("2024-01-15"),
          endDate: new Date("2024-01-15"),
        },
      ];

      const ics = generateICS(events);

      expect(ics).toContain("SUMMARY:Test\\\\Event");
    });

    it("should escape semicolon character", () => {
      const events: CalendarEvent[] = [
        {
          title: "Test;Event",
          description: "Test;description",
          startDate: new Date("2024-01-15"),
          endDate: new Date("2024-01-15"),
        },
      ];

      const ics = generateICS(events);

      expect(ics).toContain("SUMMARY:Test\\;Event");
    });

    it("should escape comma character", () => {
      const events: CalendarEvent[] = [
        {
          title: "Test,Event",
          description: "Test,description",
          startDate: new Date("2024-01-15"),
          endDate: new Date("2024-01-15"),
        },
      ];

      const ics = generateICS(events);

      expect(ics).toContain("SUMMARY:Test\\,Event");
    });

    it("should escape newline character", () => {
      const events: CalendarEvent[] = [
        {
          title: "Test Event",
          description: "Line 1\nLine 2",
          startDate: new Date("2024-01-15"),
          endDate: new Date("2024-01-15"),
        },
      ];

      const ics = generateICS(events);

      expect(ics).toContain("DESCRIPTION:Line 1\\nLine 2");
    });

    it("should generate unique UID for each event", () => {
      const events: CalendarEvent[] = [
        {
          title: "Event 1",
          description: "Description 1",
          startDate: new Date("2024-01-15"),
          endDate: new Date("2024-01-15"),
        },
        {
          title: "Event 2",
          description: "Description 2",
          startDate: new Date("2024-01-16"),
          endDate: new Date("2024-01-16"),
        },
      ];

      const ics = generateICS(events);

      // Extract UIDs from ICS
      const uidMatches = ics.match(/UID:[\w-]+@periodcalculator\.com/g);
      expect(uidMatches).toHaveLength(2);
      expect(uidMatches?.[0]).not.toBe(uidMatches?.[1]);
    });

    it("should include location when provided", () => {
      const events: CalendarEvent[] = [
        {
          title: "Event",
          description: "Description",
          startDate: new Date("2024-01-15"),
          endDate: new Date("2024-01-15"),
          location: "Home",
        },
      ];

      const ics = generateICS(events);

      expect(ics).toContain("LOCATION:Home");
    });

    it("should not include location when not provided", () => {
      const events: CalendarEvent[] = [
        {
          title: "Event",
          description: "Description",
          startDate: new Date("2024-01-15"),
          endDate: new Date("2024-01-15"),
        },
      ];

      const ics = generateICS(events);

      expect(ics).not.toContain("LOCATION:");
    });

    it("should format dates correctly for all-day events", () => {
      const events: CalendarEvent[] = [
        {
          title: "Event",
          description: "Description",
          startDate: new Date("2024-01-15"),
          endDate: new Date("2024-01-20"),
        },
      ];

      const ics = generateICS(events);

      expect(ics).toContain("DTSTART;VALUE=DATE:20240115");
      expect(ics).toContain("DTEND;VALUE=DATE:20240120");
    });
  });

  describe("downloadICS", () => {
    it("should create blob with correct content type", () => {
      const icsContent = "BEGIN:VCALENDAR\nEND:VCALENDAR";

      downloadICS(icsContent, "test-calendar");

      expect(mockCreateObjectURL).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "text/calendar;charset=utf-8",
        }),
      );
    });

    it("should create download link with correct filename", () => {
      const icsContent = "BEGIN:VCALENDAR\nEND:VCALENDAR";

      downloadICS(icsContent, "my-calendar");

      expect(mockCreateElement).toHaveBeenCalledWith("a");
      expect(mockAppendChild).toHaveBeenCalled();
      expect(mockClick).toHaveBeenCalled();
      expect(mockRemoveChild).toHaveBeenCalled();
    });

    it("should use default filename when not provided", () => {
      const icsContent = "BEGIN:VCALENDAR\nEND:VCALENDAR";

      downloadICS(icsContent);

      const link = mockCreateElement.mock.results[0].value;
      expect(link.download).toBe("period-predictions.ics");
    });

    it("should revoke object URL after download", () => {
      const icsContent = "BEGIN:VCALENDAR\nEND:VCALENDAR";

      downloadICS(icsContent, "test");

      expect(mockRevokeObjectURL).toHaveBeenCalledWith(
        "blob:http://localhost/test",
      );
    });
  });
});
