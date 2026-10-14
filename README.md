# 🏴‍☠️ BootyBox - Streaming Platform UI

A modern, high-performance streaming platform front-end UI built with **React**, **Vite**, and **Tailwind CSS**, featuring an animated pirate loading screen and sleek dark cinema styling inspired by [movibox.net](https://movibox.net/).

---

## ✨ Features

- **Animated Pirate Loading Screen**: Custom animated pirate skull medallion, glowing progress bar, and connection status before entering the platform.
- **Glassmorphic Navigation Bar**: Responsive header with search input, navigation links (*Home, Movies, TV Shows, Animation, Trending*), and live watchlist counter.
- **Cinematic Hero Carousel**: Featured spotlight banners with auto-advance, backdrop vignettes, metadata badges (*4K UHD, IMDb ratings, Dolby Atmos*), and quick actions (*Watch Now, Trailer, Watchlist*).
- **Responsive Media Grid & Shelves**:
  - Top 10 Most Watched Today with bold stylized rank numbers
  - Popular TV Shows & Seasons
  - Blockbuster Movies
  - Trending Animation & Anime
- **Full Video Player Theater Modal**:
  - Interactive HTML5 player with play/pause, scrub bar, time tracking, volume, playback speed, and quality toggles
  - Multi-server switcher (*Server 1 [VIP 4K Ultra]*, *Server 2 [Fast CDN]*, *Server 3 [Multi-Audio]*)
  - Season & Episode guide with thumbnail cards
  - Cast crew list and direct 1080p download simulation
- **Local Storage Watchlist**: Save titles with 1-click; persists in browser `localStorage`.
- **Live Search**: Instant real-time filtering across titles, genres, and overviews.
- **Mobile Bottom Navigation**: Native app-like floating bottom bar on mobile screens.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cypher-0007/BootyBox.git
   cd BootyBox
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure TMDB by copying `.env.example` to `.env` and setting `VITE_TMDB_ACCESS_TOKEN` to your TMDB API Read Access Token. The app uses this token for the live home shelves, trending hero, and search. Keep `.env` private; it is excluded from Git. For deployment, set the same variable in your host's environment settings.

4. Start development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. Build for production:
   ```bash
   npm run build
   ```

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) + Handcrafted Vector Pirate Icons
- **Fonts**: Plus Jakarta Sans & Space Grotesk

This product uses the TMDB API but is not endorsed or certified by TMDB.
