/**
 * Helper to search Open Library for auto-filling book metadata
 */
export async function searchOpenLibrary(query) {
  if (!query || query.trim().length < 2) return [];

  try {
    const encoded = encodeURIComponent(query.trim());
    const res = await fetch(`https://openlibrary.org/search.json?q=${encoded}&limit=8`);
    if (!res.ok) throw new Error('Search failed');
    const data = await res.json();

    return (data.docs || []).map((doc) => {
      const coverUrl = doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
        : doc.isbn && doc.isbn[0]
        ? `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-L.jpg`
        : '';

      const genres = (doc.subject || [])
        .filter((s) => s.length < 24 && !s.includes('protected') && !s.includes('Accessible'))
        .slice(0, 4);

      return {
        title: doc.title || 'Untitled',
        author: (doc.author_name && doc.author_name[0]) || 'Unknown Author',
        publishedYear: doc.first_publish_year || (doc.publish_year && doc.publish_year[0]) || new Date().getFullYear(),
        coverUrl,
        pages: doc.number_of_pages_median || (doc.number_of_pages && doc.number_of_pages[0]) || 0,
        genres: genres.length > 0 ? genres : ['General'],
        key: doc.key,
      };
    });
  } catch (error) {
    console.error('Error searching Open Library:', error);
    return [];
  }
}

/**
 * Gradient presets for books without cover images
 */
export const COVER_GRADIENTS = [
  { name: 'Amber Terracotta', value: 'from-amber-700 via-orange-800 to-stone-900' },
  { name: 'Deep Emerald', value: 'from-emerald-800 via-teal-900 to-zinc-950' },
  { name: 'Midnight Indigo', value: 'from-indigo-900 via-blue-950 to-slate-950' },
  { name: 'Burgundy Wine', value: 'from-rose-900 via-red-950 to-neutral-950' },
  { name: 'Vintage Ochre', value: 'from-yellow-700 via-amber-800 to-stone-900' },
  { name: 'Obsidian Slate', value: 'from-stone-800 via-neutral-900 to-black' },
];

export function getRandomGradient() {
  const index = Math.floor(Math.random() * COVER_GRADIENTS.length);
  return COVER_GRADIENTS[index].value;
}
