# Heenan Tae Kwon Do — Free Trial (demo)

A mobile-first landing page demo for Heenan Tae Kwon Do.

## Features
- **Loading screen** — white background with the club logo spinning; shows for a minimum of 2s and holds until the page is fully loaded, then lifts up to reveal the site.
- **Hero** — big stacked **FREE** / **TRIAL** wordmark (gold + royal-blue gradients with a light fade), drawn from the club's logo palette.
- **Scroll-driven kick sequence** — three background-removed athlete frames (ready → chamber → high kick) are scrubbed by scroll position, advancing 1 → 2 → 3 without looping, layered in front of the wordmark.
- **Pill navbar** — floating glassy pill with Home (icon), Schedule, and Contact.
- White background throughout, with white space below so the scroll effect is easy to see.

## Run locally
Any static server works, e.g.:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Structure
```
index.html      # markup
styles.css      # styles + loader / hero / nav
script.js       # loader timing + scroll-driven frame crossfade
assets/         # logo.png, frame1.png, frame2.png, frame3.png
```
