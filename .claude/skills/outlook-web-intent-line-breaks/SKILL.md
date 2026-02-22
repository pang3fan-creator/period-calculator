---
name: outlook-web-intent-line-breaks
description: |
  Fix line breaks not appearing in Outlook Calendar event descriptions from web intents.
  Use when: (1) Calendar event description shows as single line instead of multiple lines,
  (2) \n or \\n in description parameter doesn't create new lines, (3) Building "Add to Outlook
  Calendar" feature. Requires proper URL encoding with %0A and correct replacement handling.
author: Claude Code
version: 1.0.0
date: 2026-02-22
---

# Outlook Web Intent Line Breaks

## Problem
When using Outlook's Web Intent URL to create calendar events, line breaks in the event description don't render correctly. The description appears as a single line instead of properly formatted text with multiple lines.

## Context / Trigger Conditions
- Using `outlook.live.com/calendar/0/deeplink/compose` URL
- Adding `body` parameter with multi-line text
- Description shows no line breaks or incorrect formatting
- Works in Google Calendar but not Outlook

## Solution
The issue is with URL encoding of line break characters. Here's the correct approach:

```typescript
// 1. First encode the content
const details = encodeURIComponent(
  t("calendarEventDetails", {
    nextPeriodStart: nextPeriodStartStr,
    // ... other parameters
  })
);

// 2. Ensure %0A is properly preserved
.replace(/%0A/g, "%0A")

// 3. Build the URL
const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${startDate}&enddt=${endDate}&body=${details}`;
```

The key is the `.replace(/%0A/g, "%0A")` - this ensures that the encoded newline character is not double-encoded or stripped.

## Common Mistakes
1. **Using `\n` directly in URL** - Must be URL encoded as `%0A`
2. **Double encoding** - `encodeURIComponent` encodes `%` to `%25`, so applying it after already-encoded content corrupts the result
3. **Using `encodeURI` instead of `encodeURIComponent`** - `encodeURIComponent` is more thorough

## Verification
Create an Outlook event with:
- Subject: "Test Event"
- Body: "Line 1\nLine 2\nLine 3"

Check that the description shows three separate lines, not "Line 1Line 2Line 3".

## Notes
- Google Calendar uses `details` parameter
- Outlook Calendar uses `body` parameter
- Both require proper URL encoding of line breaks
- This applies to any web intent calendar API with multi-line descriptions
