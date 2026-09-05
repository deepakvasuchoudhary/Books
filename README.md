# 📚 Libris — Personal Reading Vault & Library

A modern, high-performance digital library and reading archive inspired by Linear and Apple Books aesthetics. Designed as a pure reading and showcase experience for book lovers—curated, version-controlled in Git, and deployed seamlessly to GitHub Pages.

Live Site: **[https://deepakvasuchoudhary.github.io/Books/](https://deepakvasuchoudhary.github.io/Books/)**

---

## ✨ Design & Features

- **Linear / Apple Books App Shell**:
  - Persistent, collapsible navigation sidebar with real-time status counters, topic shelves, and reading milestones.
  - Sticky glassmorphic top header with instant search (`⌘K` or `/`), view switcher, and sort options.
- **Triple Layout Modes**:
  - **Bento Grid**: Modern card deck with ratings, genres, publication year, and synopsis preview.
  - **Apple Books Cover Gallery**: Visual cover art gallery with 3D spine depth and hover physics.
  - **Linear Table Catalog**: High-density table for rapid browsing and power sorting across all 81 volumes.
- **Interactive Bento Hero**:
  - Featured selection spotlight with realistic 3D book physics.
  - 4-metric reading stats bento (Total Volumes, 5-Star Gems, Est. Pages, Curated Shelves).
  - Literary quote of the day.
- **Slide-Over Reading Dossier**:
  - Apple Books-style slide-over inspection drawer from the right.
  - Full literary synopsis, reader impressions & reflections, and memorable quote highlights.
  - Pure showcase: clean, non-cluttered, read-only reading experience without intrusive edit/delete controls.
  - Keyboard navigation: `←` / `→` arrows to leaf through books, `Esc` to close.
- **Random Book Discovery**:
  - "Surprise Me" modal with celebratory confetti and keyboard shortcut `R`.
- **Minimalist Light & Dark Mode**:
  - Crisp high-contrast slate in light mode, deep midnight obsidian (`#090a0f`) in dark mode.

---

## ⚡ Adding Books to the Repository

All 81 volumes are version-controlled in **[`src/data/books.js`](./src/data/books.js)**. You can add or update books via the CLI or direct file editing:

```bash
# Terminal helper to search Open Library and add books:
npm run add-book
```

---

## 🚀 Publishing to GitHub Pages

Whenever you add or update books, commit and push your changes:

```bash
git add .
git commit -m "add: [Book Title]"
git push origin main
```

The GitHub Actions workflow will automatically build and deploy the updates to GitHub Pages! You can also deploy manually at any time via:

```bash
npm run deploy
```


