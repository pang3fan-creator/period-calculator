---
name: apple-icloud-no-web-intent
description: |
  Apple iCloud Calendar lacks Web Intent API for creating calendar events via URL.
  Use when: (1) Building "Add to Calendar" feature needing Apple Calendar support,
  (2) Cannot find web URL scheme for iCloud calendar, (3) Need alternative for
  Apple Calendar in web apps. Must open iCloud website for user to manually add events.
author: Claude Code
version: 1.0.0
date: 2026-02-22
---

# Apple iCloud Calendar Web Intent

## Problem
Unlike Google Calendar and Outlook, Apple iCloud Calendar does not provide a Web Intent API (URL scheme) for creating calendar events directly from a web page.

## Context / Trigger Conditions
- Building "Add to Calendar" dropdown with multiple calendar options
- Need to support Apple Calendar alongside Google Calendar and Outlook
- Searching for Apple Calendar URL scheme or web intent API
- Finding that `icloud.com/calendar` doesn't support URL parameters for event creation

## Solution
The only available option is to open the iCloud Calendar website directly:
```typescript
const appleUrl = "https://www.icloud.com/calendar/";
window.open(appleUrl, "_blank", "noopener,noreferrer");
```

Users must manually create the event after the page opens.

## Alternative Approaches Considered
1. **ICS file download** - Works for Apple Calendar but requires user to import
2. **Native app deep link** - `ical://` scheme exists but only works on macOS/iOS native apps, not web
3. **MailTo with calendar attachment** - Not well supported

## Best Practice for "Add to Calendar" Features
When supporting Apple Calendar in web apps:
1. Provide **ICS file download** as primary option (works across all platforms)
2. Show **"Open iCloud Calendar"** button that opens the website
3. Document that user needs to manually create the event
4. Consider Apple Business Manager / Web Clipper if enterprise features needed

## Verification
- Confirm no URL scheme exists for creating events via web
- Test: Try `icloud.com/calendar/new?title=Test` - won't work

## Notes
- Google Calendar: `calendar.google.com/calendar/render?action=TEMPLATE`
- Outlook: `outlook.live.com/calendar/0/deeplink/compose`
- Apple: No equivalent web API exists
