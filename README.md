# 📖 Folio — Personal Reading Journal & Book Sanctuary

A minimal, aesthetically crafted personal bookshelf and reading journal designed for book lovers. Track every book you read, record heartfelt impressions and reflections, discover your reading habits, and search your collection seamlessly in both Light and Dark mode.

---

## ✨ Features

- **Personal Reflections & Thoughts**: Dedicated literary journal space to write what you thought, felt, and learned when reading each book.
- **Book Metadata & Covers**:
  - High-resolution covers with realistic 3D book spine depth and ambient shadow.
  - Typographic, color-themed fallback covers when no image is available.
  - Writer / Author name, year of publication, page count, and genres/tags.
  - Favorite quote highlights and book synopses.
- **Instant Search & Deep Filtering**:
  - Instant live search matching title, author, thoughts, quotes, and genres.
  - Status filters: *All*, *Finished Reading*, *Currently Reading*, *Want to Read*, *Favorites*.
  - Dynamic genre pill filters (automatically generated from your collection).
  - Star rating filter (5 stars, 4+ stars, 3+ stars).
  - Sorting: *Recently Read*, *Highest Rated*, *Title (A–Z)*, *Author (A–Z)*, *Publication Year (Newest/Oldest)*.
- **Dual View Modes**:
  - **Cover Showcase (Grid)**: Visual cover grid with ratings, status badges, and quick thought excerpts.
  - **Reading Journal (Editorial Stream)**: Longform reading view focusing on your reflections, notes, and favorite quotes.
- **Open Library Instant Auto-Fill**:
  - Search any book title, author, or ISBN to auto-fill cover image, author, year published, pages, and genres in one click.
  - Option to upload custom cover images from your computer or paste any image URL.
- **Reading Stats & Annual Challenge**:
  - Live counts: Books Read, Total Pages, Average Rating, and Top Genre.
  - Annual Reading Goal tracker with progress bar and celebratory confetti!
- **Theme Support**:
  - Handcrafted **Warm Alabaster (Light Mode)** and **Obsidian Charcoal (Dark Mode)** with seamless toggle and system preference sync.
- **Data Privacy & Portability**:
  - Fully local: data persists automatically in your browser's `localStorage`.
  - Single-click JSON backup export and import.
  - Ability to export individual book notes to Markdown for Obsidian or Notion.
  - Curated initial library with thoughtful sample reviews.

---

## 🚀 Getting Started

### Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🛠️ Built With

- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **Lucide Icons**
- **Canvas Confetti**
- **Open Library API**
