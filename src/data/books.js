/**
 * 📚 FOLIO — PERSONAL BOOK REPOSITORY
 * 
 * To add a new book:
 * 1. Add a new object to the `BOOKS` array below (you can copy the template at the bottom).
 * 2. Commit and push:
 *    git add src/data/books.js
 *    git commit -m "add: [Book Title]"
 *    git push
 * 
 * The site will automatically rebuild and deploy your changes to GitHub Pages!
 */

export const BOOKS = [
  {
    id: "klara-and-the-sun",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    publishedYear: 2021,
    coverUrl: "https://covers.openlibrary.org/b/id/10543781-L.jpg",
    rating: 5, // 1 to 5
    status: "read", // "read" | "reading" | "want_to_read"
    dateRead: "2024-02-14",
    dateStarted: "2024-02-02",
    pages: 303,
    genres: ["Sci-Fi", "Literary Fiction", "Philosophy"],
    favorite: true,
    description: `Narrated from the viewpoint of Klara, an Artificial Friend with outstanding observational qualities, who watches carefully the behavior of those who enter to browse and of those who pass on the street outside. When she is chosen to be the companion of a sick girl named Josie, Klara remains devoted to saving her.`,
    myThoughts: `Ishiguro has this miraculous ability to break your heart in the quietest, most understated way imaginable. Klara's perception of the world—how she interprets sunlight as a literal healing force and divides complex human emotions into distinct sensory boxes—felt deeply moving. It made me reflect on what love really is: is it irreplaceable, or can devotion be so pure that it transcends biology? The ending lingered with me for weeks.`,
    favoriteQuote: `Do you believe in the human heart? I don't mean simply the organ, obviously. Do you think there is something inside each of us that makes us special and individual?`,
  },
  {
    id: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    publishedYear: 180,
    coverUrl: "https://covers.openlibrary.org/b/id/12833139-L.jpg",
    rating: 5,
    status: "read",
    dateRead: "2024-01-20",
    dateStarted: "2024-01-01",
    pages: 256,
    genres: ["Philosophy", "Classics", "Non-Fiction"],
    favorite: true,
    description: `A series of personal writings by Marcus Aurelius, Roman Emperor from AD 161 to 180, recording his private notes to himself and ideas on Stoic philosophy, duty, mortality, and the nature of human life.`,
    myThoughts: `What strikes me most is that Marcus Aurelius never intended these pages for anyone else to read. It's essentially the private journal of the most powerful person on Earth at the time, continually reminding himself to stay humble, not get angry at rude people, and remember how fleeting everything is. Whenever I feel overwhelmed by daily noise or modern anxieties, returning to these pages acts like an instant cold water splash on the soul.`,
    favoriteQuote: `You have power over your mind - not outside events. Realize this, and you will find strength.`,
  },
  {
    id: "project-hail-mary",
    title: "Project Hail Mary",
    author: "Andy Weir",
    publishedYear: 2021,
    coverUrl: "https://covers.openlibrary.org/b/id/11181676-L.jpg",
    rating: 5,
    status: "read",
    dateRead: "2024-04-10",
    dateStarted: "2024-04-06",
    pages: 496,
    genres: ["Sci-Fi", "Adventure", "Space"],
    favorite: true,
    description: `Ryland Grace is the sole survivor on a desperate, last-chance mission to save humanity from an extinction-level solar crisis. Waking up from an induced coma with amnesia, he must use science, memory, and an unexpected ally to solve an impossible scientific riddle.`,
    myThoughts: `Pure, unadulterated joy from start to finish. I couldn't put this down and finished it in two breathless sittings. The dynamic between Grace and Rocky is hands down one of the most heartwarming friendships ever written in modern sci-fi. Weir somehow makes complex orbital mechanics and xenobiology feel like an electrifying puzzle. 'Amaze! Amaze! Amaze!'`,
    favoriteQuote: `Human beings have a remarkable ability to accept the abnormal and make it normal.`,
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    publishedYear: 2018,
    coverUrl: "https://covers.openlibrary.org/b/id/12836266-L.jpg",
    rating: 4,
    status: "read",
    dateRead: "2023-11-28",
    dateStarted: "2023-11-15",
    pages: 320,
    genres: ["Self-Improvement", "Psychology", "Non-Fiction"],
    favorite: false,
    description: `An extraordinarily practical guide on how small changes can lead to remarkable results. Clear draws on biology, psychology, and neuroscience to create an easy-to-understand framework for making good habits inevitable and bad habits impossible.`,
    myThoughts: `Most self-help books could have been an 800-word blog post, but Atomic Habits genuinely earns its length. The idea that you don't rise to the level of your goals, but fall to the level of your systems completely rewired how I plan my mornings and work routine. Setting up habit stacking and 2-minute friction reductions for reading actually helped me read 20+ books this year.`,
    favoriteQuote: `You do not rise to the level of your goals. You fall to the level of your systems.`,
  },
  {
    id: "when-breath-becomes-air",
    title: "When Breath Becomes Air",
    author: "Paul Kalanithi",
    publishedYear: 2016,
    coverUrl: "https://covers.openlibrary.org/b/id/8313460-L.jpg",
    rating: 5,
    status: "read",
    dateRead: "2023-09-18",
    dateStarted: "2023-09-12",
    pages: 228,
    genres: ["Memoir", "Biography", "Medicine", "Philosophy"],
    favorite: true,
    description: `At the age of thirty-six, on the verge of completing a decade's worth of training as a neurosurgeon, Paul Kalanithi was diagnosed with stage IV lung cancer. One day he was a doctor treating the dying, and the next he was a patient struggling to live.`,
    myThoughts: `An intensely poignant, poetic memoir on mortality, doctor-patient relationships, and living with purpose when time is abruptly limited. Kalanithi's prose has the precision of a scalpel and the tenderness of a poet. The final chapter written by his wife Lucy brought me to tears. It makes you value every single breath and every quiet conversation with loved ones.`,
    favoriteQuote: `You can't ever reach perfection, but you can believe in an asymptote toward which you are ceaselessly striving.`,
  },
  {
    id: "tomorrow-and-tomorrow-and-tomorrow",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    publishedYear: 2022,
    coverUrl: "https://covers.openlibrary.org/b/id/12843574-L.jpg",
    rating: 4,
    status: "read",
    dateRead: "2024-05-02",
    dateStarted: "2024-04-18",
    pages: 416,
    genres: ["Fiction", "Contemporary", "Art"],
    favorite: false,
    description: `Two friends—often in love, but never lovers—come together as creative partners in the world of video game design, where success brings them fame, joy, tragedy, duplicity, and ultimately, a kind of immortality.`,
    myThoughts: `A celebration of creative collaboration and the nuances of non-romantic intimacy. Watching Sam and Sadie navigate game design, grief, ego, and aging was utterly captivating. Even if you've never played video games in your life, the metaphors of restart buttons, infinite lives, and crafted worlds speak to anyone who loves making things.`,
    favoriteQuote: `To allow yourself to play with another person is no small risk. It means allowing yourself to be open, to be exposed, to be hurt.`,
  },
  {
    id: "dune",
    title: "Dune",
    author: "Frank Herbert",
    publishedYear: 1965,
    coverUrl: "https://covers.openlibrary.org/b/id/12836267-L.jpg",
    rating: 5,
    status: "reading",
    dateRead: "",
    dateStarted: "2024-08-15",
    pages: 688,
    genres: ["Sci-Fi", "Classics", "Fantasy"],
    favorite: true,
    description: `Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange, a drug capable of extending life and enhancing consciousness.`,
    myThoughts: `The worldbuilding in Dune is towering. The ecology of Arrakis, the religious manipulations by the Bene Gesserit, and the cautionary perspective on messianic leaders are timeless. Reading this carefully reveals that Paul is not simply a hero, but a warning against giving unchecked faith to charismatic figures.`,
    favoriteQuote: `I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration.`,
  },
  {
    id: "thinking-fast-and-slow",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    publishedYear: 2011,
    coverUrl: "https://covers.openlibrary.org/b/id/8313462-L.jpg",
    rating: 4,
    status: "reading",
    dateRead: "",
    dateStarted: "2024-08-25",
    pages: 499,
    genres: ["Psychology", "Science", "Non-Fiction"],
    favorite: false,
    description: `Nobel Memorial Prize in Economic Sciences laureate Daniel Kahneman takes us on an exploration of the two systems that drive the way we think: System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.`,
    myThoughts: `Currently working through this dense masterwork. It constantly catches you in cognitive illusions you swear you are immune to. Really helping me reflect on decision-making under uncertainty and how easily we mistake confidence for competence.`,
    favoriteQuote: `A reliable way to make people believe in falsehoods is frequent repetition, because familiarity is not easily distinguished from truth.`,
  },
];

/**
 * 📝 TEMPLATE FOR ADDING A NEW BOOK:
 * 
  {
    id: "your-book-id",
    title: "Book Title",
    author: "Author Name",
    publishedYear: 2024,
    coverUrl: "https://covers.openlibrary.org/b/id/123456-L.jpg", // or leave empty for stylish typographic fallback
    rating: 5, // 1 to 5
    status: "read", // "read" | "reading" | "want_to_read"
    dateRead: "2024-09-01",
    dateStarted: "2024-08-20",
    pages: 350,
    genres: ["Non-Fiction", "History"],
    favorite: true, // true or false
    description: `Brief book synopsis...`,
    myThoughts: `Write your authentic impressions, reflections, and takeaways here...`,
    favoriteQuote: `A memorable line from the book...`,
  },
 */
