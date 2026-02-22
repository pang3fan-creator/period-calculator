---
name: ics-calendar-color
description: |
  Fix ICS calendar event colors not appearing in Google Calendar. Use when: (1) ICS files
  with COLOR property don't show colors in Google Calendar, (2) Event colors work in
  Apple Calendar but not Google, (3) Want to add color coding to calendar exports.
  Google Calendar ignores the VCALENDAR COLOR property and does not support it.
author: Claude Code
version: 1.0.0
date: 2026-02-22
---

# ICS Calendar Event Colors in Google Calendar

## Problem
When generating ICS files with event colors using the `COLOR` property, the colors don't appear in Google Calendar even though they may work in Apple Calendar or Outlook.

## Context / Trigger Conditions
- Generating ICS files for calendar applications
- Using `COLOR` property in VEVENT blocks
- Colors appear in Apple Calendar but not Google Calendar
- Testing: Import same ICS file to different calendar apps

## Solution
**Do not rely on ICS COLOR property for Google Calendar.** Google Calendar does not support the `COLOR` property in ICS files. This is a known limitation.

If color coding is essential:
1. **Remove color feature from ICS** - Accept that Google Calendar will not show colors
2. **Use Google Calendar Web Intent** instead of ICS - Direct links preserve the most functionality
3. **Document the limitation** - Inform users that colors may vary by calendar app

## Verification
Import the same ICS file to:
- Apple Calendar - Colors should work
- Microsoft Outlook - Colors may work
- Google Calendar - Colors will NOT work (expected behavior)

## Notes
- This is a Google Calendar limitation, not a bug in the ICS generator
- The ICS 2.0 spec allows for COLOR property, but Google doesn't implement it
- Alternative: Use category-based color coding if available
