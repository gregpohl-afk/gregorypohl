# GregoryPohl.com — Deploy Notes

Upload this folder to GitHub or Vercel as a static site.

## Included
- `index.html` homepage
- `red-dot.html` — The Red Dot story page (currently not linked from anywhere on the homepage; reachable only by direct URL. Worth deciding whether the portrait or the Red Dot easter egg should link to it.)
- `style.css`
- `script.js`
- `favicon.ico`
- `/assets/fonts`, `/assets/icons`, `/assets/images` (includes the new WebP homepage image and the `og-preview.jpg` social-share image)
- `/assets/perspectives` — the 6 Perspective PDFs, now all included in this package (The Coordination Problem was added).
- `/docs` — source document retained in package, not directly linked from Perspective tiles. (Not verified as part of this update — carried over from the original notes.)

## Launch checks
- Field Note opens from the homepage.
- Perspective tiles show a teaser on hover (title, deck line, summary) ending in a "Click to read →" cue. On hover-capable devices a click opens the PDF directly. On touch devices (no hover) a tap opens the reveal card with a "Read on →" link, so touch users still get the teaser first.
- The "Now What?" notebook teaser ends in a "Click to read more →" cue; clicking opens the Somebody's Unicorn reveal card as before.
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
