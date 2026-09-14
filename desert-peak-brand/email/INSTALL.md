# Email signature — install guide

The signature is generated, not written. Never edit the HTML by hand: change `people.json` (name, title, phone, email, license numbers, Medicare flag) or `collateral.config.json` (company lines, TPMO text) and run `pnpm build:signatures`. The rebuild also refreshes the renders in `email/renders/` and this folder's `INVENTORY.json`.

## Files

| File | What |
|---|---|
| `email/{slug}.html` | The signature. Table-based, inline styles only, under 10 KB, one image. |
| `email/{slug}.txt` | Plain-text fallback for clients and threads that strip HTML. |
| `email/{slug}-no-medicare.html` / `.txt` | Same signature without the TPMO paragraph. Exists only for people flagged `medicareTrack: true`. Use it on threads that are not about Medicare; use the default on anything that is. |
| `email/email-logo@2x.png` | The one hosted image (400×100, displayed at 200×50). |
| `email/email-logo@1x.png`, `email/email-logo.svg` | Fallback and master. Not referenced by the signature. |

## The hosted logo

The signature references exactly one image by absolute URL:

```
https://www.desertpeakinsurance.com/brand/email-logo@2x.png
```

The site must serve `email/email-logo@2x.png` at that address (`collateral.config.json → mediaBaseUrl`, plus the file name; in the site repo that is `public/brand/email-logo@2x.png`). The domain is a placeholder until the client confirms it; until the file is live at that URL, the image shows as a broken box in every client. Do not embed the image as base64 and do not attach it: Gmail strips base64 images and Outlook turns attached images into paperclips.

The PNG is the horizontal lockup on a padded surface panel with a hairline border. That padding is deliberate: dark-mode clients that darken or invert backgrounds leave images alone, so the mark keeps its own light ground instead of sitting on black.

## Gmail (web)

Gmail has no HTML field; it takes rich text pasted from a browser.

1. Open `email/{slug}.html` in Chrome or Edge (double-click the file). The logo shows a broken image until the hosted URL is live; that is fine, the link is preserved when pasted.
2. Select everything on the page: `Ctrl+A` (Windows) / `Cmd+A` (Mac), then copy: `Ctrl+C` / `Cmd+C`.
3. In Gmail, click the gear icon (top right) → **See all settings** → **General** tab → scroll to **Signature** → **Create new** → name it (for example `Desert Peak`).
4. Click into the signature editor and paste: `Ctrl+V` / `Cmd+V`.
5. Under **Signature defaults**, set it for **For new emails use** and **On reply/forward use**.
6. Scroll down and click **Save changes**.
7. Send yourself a test message and check the logo, the links and the line breaks.

Gmail's dark theme lightens the text automatically; the logo stays on its light panel.

## Outlook desktop (Windows, new Outlook)

1. Open `email/{slug}.html` in Edge, `Ctrl+A`, `Ctrl+C`.
2. In new Outlook: **Settings** (gear) → **Accounts** → **Signatures** → **+ New signature**.
3. Name it, click into the editor, `Ctrl+V`.
4. Under **Select default signatures**, choose it for **New messages** and **Replies/forwards**. **Save**.

## Outlook desktop (Windows, classic Outlook)

1. Open `email/{slug}.html` in Edge, `Ctrl+A`, `Ctrl+C`.
2. **File** → **Options** → **Mail** → **Signatures…** → **New**, name it.
3. Click into the editor, `Ctrl+V`. Classic Outlook may re-space the lines slightly; do not fix it by retyping, it is Word's rendering engine and will look the same to recipients regardless.
4. Set **New messages** and **Replies/forwards** to the new signature. **OK**.

Classic Outlook stores the signature as its own `.htm` in `%APPDATA%\Microsoft\Signatures\`. Advanced users can replace that file with `email/{slug}.html` directly after creating a signature of the same name; Outlook will use it as-is.

## Outlook on the web

1. Open `email/{slug}.html` in the browser, `Ctrl+A` / `Cmd+A`, copy.
2. In Outlook on the web: **Settings** (gear) → **Mail** → **Compose and reply** → under **Email signature**, **+ New signature**.
3. Name it, paste into the editor, **Save**.
4. Choose it under **Select default signatures** for new messages and replies.

## Apple Mail (macOS)

Apple Mail's signature editor accepts pasted rich text, but it rewrites it and can drop the table layout. The reliable method replaces the stored signature file:

1. **Mail** → **Settings…** → **Signatures**. Select the account, click **+**, name it `Desert Peak`, type one placeholder word, and close the window so Mail saves it.
2. Quit Mail.
3. In Finder, hold **Option**, click **Go** → **Library** → `Mail/V*/MailData/Signatures/` (the `V` number depends on the macOS version; the folder may be under `~/Library/Mail/`). If the account is in iCloud, the folder is `~/Library/Mobile Documents/com~apple~mail/Data/V*/Signatures/`.
4. Find the newest `.mailsignature` file (sort by date). Open it in TextEdit. Keep the header lines at the top (`Content-Transfer-Encoding`, `Content-Type`, `Message-Id`, `Mime-Version`) and replace everything below the blank line with the full contents of `email/{slug}.html`.
5. Save. Select the file in Finder, **File** → **Get Info**, tick **Locked** so Mail does not overwrite it.
6. Reopen Mail, go back to **Settings** → **Signatures** and confirm the signature renders. Untick **Always match my default message font** for that signature.

**iOS Mail** has a plain-text signature field only. Paste the contents of `email/{slug}.txt` there (**Settings** → **Mail** → **Signature**). It cannot carry the logo.

## Plain-text version

Every client offers a plain-text mode or falls back to it when a recipient's client cannot render HTML. Paste `email/{slug}.txt` wherever a plain-text signature is asked for (iOS Mail, some CRM tools, the plain-text field in classic Outlook when composing in plain text). Do not shorten the compliance lines; they are the reason the signature exists.

## Which version to use

- Default (`{slug}.html`): anyone whose title or book includes Medicare, on any thread that touches Medicare. The TPMO paragraph is required by 42 CFR § 422.2267(e)(41) on electronic communication, and the plan counts in it are TODO tokens until the client supplies them. The tokens render visibly on purpose.
- `{slug}-no-medicare.html`: the same person on threads that are not about Medicare, if the client prefers a shorter signature there. When in doubt, use the default.

## Checks before going live

- The hosted logo URL loads in a private browser window.
- `{{TODO:…}}` tokens are gone: phone, last name, per-state license numbers, TPMO plan counts. Each is a `people.json` or `collateral.config.json` field.
- A test message to a Gmail address, an Outlook.com address and an iPhone shows the logo, the rule and the compliance lines.
- Dark mode on each: the logo stays on its light panel; the text is readable.
