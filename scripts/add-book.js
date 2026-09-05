import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const booksFilePath = path.join(__dirname, '../src/data/books.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

async function searchOpenLibrary(query) {
  try {
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=1`);
    const data = await res.json();
    if (data.docs && data.docs.length > 0) {
      const doc = data.docs[0];
      return {
        coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : '',
        year: doc.first_publish_year || (doc.publish_year && doc.publish_year[0]) || '',
        pages: doc.number_of_pages_median || (doc.number_of_pages && doc.number_of_pages[0]) || '',
      };
    }
  } catch (err) {
    // ignore
  }
  return null;
}

async function run() {
  console.log('\n📖 --- Add a New Book to Folio ---\n');

  const title = (await ask('1. Book Title: ')).trim();
  if (!title) {
    console.log('❌ Title is required.');
    rl.close();
    return;
  }

  const author = (await ask('2. Author / Writer: ')).trim();
  if (!author) {
    console.log('❌ Author is required.');
    rl.close();
    return;
  }

  console.log('🔍 Checking Open Library for cover and metadata...');
  const autoData = await searchOpenLibrary(`${title} ${author}`);

  const defaultYear = autoData?.year || new Date().getFullYear();
  const yearInput = await ask(`3. Publication Year [${defaultYear}]: `);
  const publishedYear = yearInput.trim() ? Number(yearInput.trim()) : defaultYear;

  const defaultCover = autoData?.coverUrl || '';
  const coverInput = await ask(`4. Cover Image URL [${defaultCover || 'Leave empty for auto fallback'}]: `);
  const coverUrl = coverInput.trim() || defaultCover;

  const defaultPages = autoData?.pages || '';
  const pagesInput = await ask(`5. Number of Pages [${defaultPages || 'optional'}]: `);
  const pages = pagesInput.trim() ? Number(pagesInput.trim()) : (defaultPages || '');

  const ratingInput = await ask('6. Rating (1-5) [5]: ');
  const rating = ratingInput.trim() ? Number(ratingInput.trim()) : 5;

  const statusInput = await ask('7. Status (read / reading / want_to_read) [read]: ');
  const status = statusInput.trim() || 'read';

  const dateToday = new Date().toISOString().split('T')[0];
  const dateReadInput = status === 'read' ? await ask(`8. Date Finished [${dateToday}]: `) : '';
  const dateRead = status === 'read' ? (dateReadInput.trim() || dateToday) : '';

  const genresInput = await ask('9. Genres/Tags (comma-separated, e.g. Sci-Fi, Fiction) [General]: ');
  const genres = genresInput.trim()
    ? genresInput.split(',').map((g) => g.trim()).filter(Boolean)
    : ['General'];

  const favInput = await ask('10. Favorite? (y/n) [n]: ');
  const favorite = favInput.trim().toLowerCase() === 'y';

  console.log('\n💭 11. Your Thoughts & Reflections (press Enter when done):');
  const myThoughts = await ask('> ');

  console.log('\n💬 12. Favorite Quote (optional):');
  const favoriteQuote = await ask('> ');

  console.log('\n📝 13. Book Description / Synopsis (optional):');
  const description = await ask('> ');

  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const newBook = {
    id: id || `book-${Date.now()}`,
    title,
    author,
    publishedYear,
    coverUrl,
    rating,
    status,
    dateRead,
    dateStarted: '',
    pages,
    genres,
    favorite,
    description,
    myThoughts,
    favoriteQuote,
  };

  // Read existing books.js
  let content = fs.readFileSync(booksFilePath, 'utf8');

  // Insert before the last closing bracket of BOOKS
  const closingIndex = content.lastIndexOf('];');
  if (closingIndex === -1) {
    console.error('❌ Could not locate BOOKS array in src/data/books.js');
    rl.close();
    return;
  }

  const formattedBook = `  {\n` +
    `    id: ${JSON.stringify(newBook.id)},\n` +
    `    title: ${JSON.stringify(newBook.title)},\n` +
    `    author: ${JSON.stringify(newBook.author)},\n` +
    `    publishedYear: ${newBook.publishedYear},\n` +
    `    coverUrl: ${JSON.stringify(newBook.coverUrl)},\n` +
    `    rating: ${newBook.rating},\n` +
    `    status: ${JSON.stringify(newBook.status)},\n` +
    `    dateRead: ${JSON.stringify(newBook.dateRead)},\n` +
    `    dateStarted: ${JSON.stringify(newBook.dateStarted)},\n` +
    `    pages: ${newBook.pages || "''"},\n` +
    `    genres: ${JSON.stringify(newBook.genres)},\n` +
    `    favorite: ${newBook.favorite},\n` +
    `    description: \`${newBook.description.replace(/`/g, '\\`')}\`,\n` +
    `    myThoughts: \`${newBook.myThoughts.replace(/`/g, '\\`')}\`,\n` +
    `    favoriteQuote: \`${newBook.favoriteQuote.replace(/`/g, '\\`')}\`,\n` +
    `  },\n`;

  const updatedContent = content.slice(0, closingIndex) + formattedBook + content.slice(closingIndex);
  fs.writeFileSync(booksFilePath, updatedContent, 'utf8');

  console.log(`\n✅ Added "${title}" to src/data/books.js!`);
  console.log('\n👉 Next steps to deploy to GitHub Pages:');
  console.log('   git add src/data/books.js');
  console.log(`   git commit -m "add: ${title}"`);
  console.log('   git push\n');

  rl.close();
}

run();
