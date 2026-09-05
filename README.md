# 📖 Folio — Personal Reading Journal & Shelf

A minimal, aesthetically crafted static bookshelf and reading journal designed for book lovers. All your books, personal thoughts, and reviews live directly in your Git repository. Add or update books locally, push to GitHub, and your website updates automatically.

Live Site: **[https://deepakvasuchoudhary.github.io/Books/](https://deepakvasuchoudhary.github.io/Books/)**

---

## ⚡ How to Add or Update Books

Your entire library is stored in **[`src/data/books.js`](./src/data/books.js)**. You can manage books in two simple ways:

### Option 1: Terminal Helper (Recommended)
Run the interactive helper in your terminal:
```bash
npm run add-book
```
This CLI prompt asks for the book's title and author, automatically fetches cover images and publication info from Open Library, asks for your thoughts and quotes, and appends the new entry directly to `src/data/books.js`!

### Option 2: Edit `src/data/books.js` Directly
Open `src/data/books.js` in your text editor (VS Code, Cursor, etc.) and add or update an entry:

```javascript
{
  id: "your-book-id",
  title: "Book Title",
  author: "Author Name",
  publishedYear: 2024,
  coverUrl: "https://covers.openlibrary.org/b/id/10543781-L.jpg", // or leave empty for auto fallback
  rating: 5, // 1 to 5
  status: "read", // "read" | "reading" | "want_to_read"
  dateRead: "2024-09-01",
  dateStarted: "2024-08-20",
  pages: 350,
  genres: ["Sci-Fi", "Philosophy"],
  favorite: true, // true or false
  description: `Brief book synopsis...`,
  myThoughts: `Write your authentic impressions, reflections, and takeaways here...`,
  favoriteQuote: `A memorable line from the book...`,
},
```

---

## 🚀 Publish Changes to GitHub Pages

Whenever you add or update books, commit and push your changes:

```bash
git add .
git commit -m "add: [Book Title]"
git push origin main
```

The GitHub Actions workflow will automatically build the static website and deploy the updates to GitHub Pages!

You can also deploy manually at any time by running:
```bash
npm run deploy
```

---

## 🛠️ Local Development

To preview your library locally before pushing:

```bash
# Start local development server
npm run dev

# Run build verification
npm run build
```

---

## ✨ Features

- **3D Hardcover Physical Book Aesthetics**: Tactile book covers featuring realistic spine folds, ambient depth shadows, paper page-edge textures, ribbon bookmarks, and hover tilt physics.
- **Triple View Modes**:
  - **3D Shelf Gallery**: Visual hardcover showcase on an atmospheric library shelf.
  - **Editorial Reading Journal**: In-depth review spreads highlighting reader reflections, memorable passages, and synopses.
  - **Compact Catalog Index**: High-density tabular index for rapid browsing and power sorting.
- **Curator's Atelier & Spotlight**: Time-aware greeting, featured book spotlight with ambient colored aura, shuffleable quotes of inspiration, and quick sanctuary counters.
- **Reading Journey & Milestones**: Annual reading goal tracker with inline editing, pages consumed, critical rating, and interactive multi-color genre spectrum bar.
- **Interactive Live Curation**: Rate volumes directly, toggle favorites with celebratory confetti, change reading statuses, and write/edit personal marginalia in the browser (persisted to localStorage).
- **Random Volume Discovery**: "Surprise Me" drawer with dice icon and confetti to discover unexpected reads.
- **Deep Search & Multi-Filters**: Instant command search (`/`), status tabs, 5-Star Hall of Fame, dynamic genre pills, and multi-criteria sorting.
- **Full Keyboard Navigation**: Press `/` to focus search, `R` to discover a random book, `←`/`→` to leaf through volume dossiers, and `ESC` to dismiss modals.
- **Luxury Light & Dark Modes**: Warm paper ivory in light mode, deep atelier obsidian in dark mode.
- **100% Static & Git-Backed**: Your notes and library remain version-controlled in Git forever—no databases, no external lock-in.

