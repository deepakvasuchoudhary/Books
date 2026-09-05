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

- **Personal Thoughts & Reflections**: Featured prominently in both Grid and Journal views.
- **Instant Search & Deep Filtering**: Search across titles, authors, thoughts, quotes, and genres. Filter by reading status, star rating, and dynamically detected genres.
- **Dual View Modes**: Cover Showcase (visual grid) and Reading Journal (editorial reading stream).
- **Minimalist Light & Dark Mode**: Warm paper aesthetic in light mode, deep obsidian charcoal in dark mode.
- **100% Static & Git-Backed**: Your notes and library are version-controlled in Git forever—no databases, no external lock-in.
