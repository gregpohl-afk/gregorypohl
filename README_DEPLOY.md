# GregoryPohl.com — Deploy Notes

Upload this folder to GitHub or Vercel as a static site.

## Included
- `index.html` homepage
- `red-dot.html` — The Red Dot story page (currently not linked from anywhere on the homepage; reachable only by direct URL. Worth deciding whether the portrait or the Red Dot easter egg should link to it.)
- `style.css`
- `script.js`
- `favicon.ico`
- `/assets/fonts`, `/assets/icons`, `/assets/images` (includes the new WebP homepage image and the `og-preview.jpg` social-share image)
- `/assets/perspectives` — the 6 Perspective PDFs. Not included in this package; keep your existing folder, don't replace it.
- `/docs` — source document retained in package, not directly linked from Perspective tiles. (Not verified as part of this update — carried over from the original notes.)

## Launch checks
- Field Note opens from the homepage.
- Perspective tiles show a teaser on hover (title, deck line, summary). Click opens a fuller reveal card with a "Read on →" link to the actual PDF — the full document is one deliberate step away, not hidden or removed.
- Portrait opens a "What I see" reveal card. It does not link to the Red Dot story (see note above).
- Notebook ("Now What?"), Workshop, and Boredroom now show a hover teaser too, matching the Work tiles. Click still opens the same modal as before.
- Boredroom's "Come in →" now opens email (`mailto:greg@gregorypohl.com`), not WhatsApp.
- Email links use `greg@gregorypohl.com`.
- Custom cursor, Work-tile lift effect, and the Boredroom knock animation are desktop-only by design — all confirmed hidden on touch, with tap going straight to the same modal/reveal.
- Social preview: confirm `https://www.gregorypohl.com/` in `index.html`'s `<head>` matches your actual live domain exactly (with or without `www`) before launch — Open Graph and JSON-LD tags are hardcoded to that URL.

## Vercel
Framework preset: Other / Static.
Build command: leave blank.
Output directory: leave blank or `/`.
