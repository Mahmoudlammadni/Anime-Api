# AnimeFusion

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![Build](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![License](https://img.shields.io/badge/license-MIT-blue)](#)

AnimeFusion is a React single-page application that lets you browse, search, and save anime from the Jikan API (MyAnimeList). It features real-time translation into French and Arabic with full RTL support, a favorites list, and a streaming-style card layout.

---

## Features

- **Multi-language support** — English, French, and Arabic with automatic RTL direction switching
- **Real-time translation** — Anime titles, synopsis, and background text are translated on-the-fly using MyMemory API with Mozhi fallback
- **Favorites list** — Save anime to a persistent list managed with Redux
- **Streaming-style cards** — Clean card layout with hover effects, favorite toggle, and original-text button
- **Dark/Light theme** — Persistent theme toggle with CSS variables
- **Responsive design** — Mobile-first layout with hamburger navigation
- **404 page** — Friendly error page for unknown routes
- **Scroll-to-top** — Smooth scroll on navigation and a floating button

---

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── AnimeCard.jsx  # Anime card with title translation
│   ├── Nav.jsx        # Navigation bar with lang/theme picker
│   └── ScrollToTop.jsx# Floating scroll-to-top button
├── context/
│   └── ThemeContext.jsx# Theme & language state provider
├── pages/             # Route pages
│   ├── Airing.js      # Currently airing anime
│   ├── AniInfo.jsx    # Additional anime info page
│   ├── AnimeDetails.jsx# Detail page with synopsis translation
│   ├── Genre.js       # Genre-based browsing
│   ├── Home.jsx       # Home page with search & filters
│   ├── Latest.jsx     # Latest airing anime
│   ├── MyList.js      # Favorites list
│   ├── NotFound.jsx   # 404 error page
│   ├── Popular.js     # Popular anime
│   └── Upcoming.js    # Upcoming anime
├── redux/             # Redux state management
│   ├── action.js      # Action creators
│   └── reducer.js     # Root reducer
├── services/
│   └── jikanApi.js    # Jikan API client with queue & cache
├── styles/
│   ├── style.css      # Global styles & RTL support
│   └── style2.css     # Additional page styles
├── utils/
│   ├── i18n.js        # Translation strings (EN/FR/AR)
│   └── translate.js   # Translation API client (MyMemory + Mozhi)
├── App.js             # Root component with routing
└── index.js           # Entry point & Redux provider
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router 7, Redux 5 |
| Styling | Plain CSS with CSS custom properties |
| API | [Jikan API v4](https://jikan.moe/) (unofficial MyAnimeList API) |
| Translation | [MyMemory API](https://mymemory.translated.net/) + Mozhi fallback |
| Icons | react-icons (Feather) |

No environment variables are required. The app runs out of the box.

---

## Installation

```bash
git clone https://github.com/YOUR_USERNAME/anime-fusion.git
cd anime-fusion
npm install
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000).

---

## Screenshots

*Hero section with search and filters — placeholder*

*Anime detail page with translated synopsis — placeholder*

*Mobile responsive layout — placeholder*

---

## Known Limitations

- **MyMemory free tier** has a daily request quota. When exhausted, translation falls back to Mozhi (community-run proxy). If both fail, the original English text is shown with an error message.
- **Jikan API** rate-limits requests (approx. 3 per second). Requests are queued and retried automatically.
- Translation is best-effort — accuracy depends on the external translation service.

---

## Future Improvements

- Offline cache for translation results using IndexedDB
- User authentication to sync favorites across devices
- Episode watchlist with progress tracking
- PWA support for mobile installation
- Anime search autocomplete

---

## License

MIT
