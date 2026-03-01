# Official Website of Riva Data
https://www.rivadata.uk/

Marketing site for **Riva Data** built with **Vite** (vanilla HTML/CSS/JS) and a scalable, data-driven content structure.

## Tech Stack
- **Vite** for dev server + production builds
- **Vanilla HTML/CSS/JS** (no framework)
- Data-driven sections using JSON:
  - Programs (`src/data/programs.json`)
  - Consulting (`src/data/consulting.json`)
  - Footer links (`src/data/footerLinks.json`)
- GitHub Actions **CI** (build check)

---

## Project Structure

```
├── index.html
├── vite.config.js
├── package.json
├── src
│   ├── scripts
│   │   ├── main.js          # Renders Programs/Consulting/Footer from JSON + init UI behaviors
│   │   ├── nav.js           # Navbar scroll behavior
│   │   └── reveal.js        # Scroll reveal animation
│   ├── styles
│   │   ├── base.css         # Main styles (currently contains site CSS)
│   │   ├── components.css   # Reserved for component styles (optional refactor)
│   │   └── sections.css     # Reserved for section styles (optional refactor)
│   └── data
│       ├── programs.json
│       ├── consulting.json
│       └── footerLinks.json
└── public
└── assets
├── images
└── icons
```
---
---

## Branching Model

This repo uses environment branches:

- dev
- qas
- prod

Typically:
- Work is merged into dev first.
- qas and prod are updated from dev when ready.

----
