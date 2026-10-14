import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import HeroBanner from './components/HeroBanner';
import FilterBar from './components/FilterBar';
import MediaSection from './components/MediaSection';
import TopRankedSection from './components/TopRankedSection';
import VideoPlayerModal from './components/VideoPlayerModal';
import WatchlistModal from './components/WatchlistModal';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';
import Toast from './components/Toast';
import PirateLoadingScreen from './components/PirateLoadingScreen';

import { 
  HERO_BANNERS, 
  POPULAR_SERIES, 
  POPULAR_MOVIES, 
  ANIMATION_SERIES, 
  TOP_RANKED, 
  ALL_MEDIA 
} from './data/mockData';

import { Film, Tv, Sparkles } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & Active state
  const [activeVideo, setActiveVideo] = useState(null);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Watchlist stored in LocalStorage
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('bootybox_watchlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bootybox_watchlist', JSON.stringify(watchlist));
    } catch (e) {
      console.error(e);
    }
  }, [watchlist]);

  const showToast = (toastObj) => {
    setToast(toastObj);
  };

  const handleToggleWatchlist = (item) => {
    const exists = watchlist.some((i) => i.id === item.id);
    if (exists) {
      setWatchlist((prev) => prev.filter((i) => i.id !== item.id));
      showToast({ type: 'info', message: `Removed "${item.title}" from Watchlist` });
    } else {
      setWatchlist((prev) => [...prev, item]);
      showToast({ type: 'success', message: `Added "${item.title}" to Watchlist` });
    }
  };

  const handleRemoveFromWatchlist = (id) => {
    const item = watchlist.find((i) => i.id === id);
    setWatchlist((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      showToast({ type: 'info', message: `Removed "${item.title}" from Watchlist` });
    }
  };

  const handleClearWatchlist = () => {
    setWatchlist([]);
    showToast({ type: 'info', message: 'Watchlist cleared' });
  };

  const handleWatch = (item) => {
    setActiveVideo(item);
  };

  const handleTrailer = (item) => {
    setActiveVideo({
      ...item,
      videoUrl: item.trailerUrl || item.videoUrl
    });
    showToast({ type: 'info', message: `Playing Official Trailer for ${item.title}` });
  };

  // Search Results Filter
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return ALL_MEDIA.filter((item) => {
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchGenres = item.genres?.some((g) => g.toLowerCase().includes(q));
      const matchOverview = item.overview?.toLowerCase().includes(q);
      const matchDirector = item.director?.toLowerCase().includes(q);
      return matchTitle || matchGenres || matchOverview || matchDirector;
    });
  }, [searchQuery]);

  // General Filter / Sort for Catalog
  const filterAndSort = (items) => {
    let result = [...items];

    // Filter by Category/Genre
    if (selectedCategory !== 'All') {
      result = result.filter((item) => item.genres?.includes(selectedCategory));
    }

    // Filter by Type
    if (selectedType !== 'all') {
      result = result.filter((item) => item.type === selectedType);
    }

    // Sort
    if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.year || 0) - (a.year || 0));
    }

    return result;
  };

  const filteredSeries = useMemo(() => filterAndSort(POPULAR_SERIES), [selectedCategory, selectedType, sortBy]);
  const filteredMovies = useMemo(() => filterAndSort(POPULAR_MOVIES), [selectedCategory, selectedType, sortBy]);
  const filteredAnimation = useMemo(() => filterAndSort(ANIMATION_SERIES), [selectedCategory, selectedType, sortBy]);

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-300">
      
      {/* Pirate Loading Screen Intro */}
      {isLoading && (
        <PirateLoadingScreen onFinished={() => setIsLoading(false)} duration={1600} />
      )}

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        watchlistCount={watchlist.length}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-14 pb-12">
        
        {/* If user is actively searching */}
        {searchQuery.trim() ? (
          <SearchResults
            query={searchQuery}
            results={searchResults}
            onWatch={handleWatch}
            watchlist={watchlist}
            onToggleWatchlist={handleToggleWatchlist}
            onClearSearch={() => setSearchQuery('')}
          />
        ) : (
          <>
            {/* Tab: All / Movies / TV / Animation */}
            {['all', 'tv', 'movies', 'animation', 'top-ranked'].includes(activeTab) && (
              <>
                {/* Hero Banner Carousel (Shown on Home/All) */}
                {activeTab === 'all' && (
                  <HeroBanner
                    banners={HERO_BANNERS}
                    onWatch={handleWatch}
                    onTrailer={handleTrailer}
                    watchlist={watchlist}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                )}

                {/* Filter and Category Pills */}
                <FilterBar
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />

                {/* Top 10 Ranked Section */}
                {(activeTab === 'all' || activeTab === 'top-ranked') && (
                  <TopRankedSection
                    onWatch={handleWatch}
                    watchlist={watchlist}
                    onToggleWatchlist={handleToggleWatchlist}
                  />
                )}

                {/* Popular TV Shows */}
                {(activeTab === 'all' || activeTab === 'tv') && (
                  <MediaSection
                    title="Popular TV Shows"
                    subtitle="Trending seasons and top-rated television series"
                    items={filteredSeries}
                    icon={Tv}
                    onWatch={handleWatch}
                    watchlist={watchlist}
                    onToggleWatchlist={handleToggleWatchlist}
                    onSeeMore={() => setSelectedType('TV Series')}
                  />
                )}

                {/* Blockbuster Movies */}
                {(activeTab === 'all' || activeTab === 'movies') && (
                  <MediaSection
                    title="Blockbuster Movies"
                    subtitle="Feature films and box-office hits streaming in 4K"
                    items={filteredMovies}
                    icon={Film}
                    onWatch={handleWatch}
                    watchlist={watchlist}
                    onToggleWatchlist={handleToggleWatchlist}
                    onSeeMore={() => setSelectedType('Movie')}
                  />
                )}

                {/* Trending Animation & Anime */}
                {(activeTab === 'all' || activeTab === 'animation') && (
                  <MediaSection
                    title="Trending Animation"
                    subtitle="Acclaimed animated series and films"
                    items={filteredAnimation}
                    icon={Sparkles}
                    onWatch={handleWatch}
                    watchlist={watchlist}
                    onToggleWatchlist={handleToggleWatchlist}
                    onSeeMore={() => setSelectedType('Animation')}
                  />
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onCategoryClick={(cat) => {
          setSelectedCategory(cat);
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        watchlistCount={watchlist.length}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
      />

      {/* Video Player Modal */}
      {activeVideo && (
        <VideoPlayerModal
          item={activeVideo}
          onClose={() => setActiveVideo(null)}
          watchlist={watchlist}
          onToggleWatchlist={handleToggleWatchlist}
          onToast={showToast}
        />
      )}

      {/* Watchlist Modal */}
      {isWatchlistOpen && (
        <WatchlistModal
          watchlist={watchlist}
          onClose={() => setIsWatchlistOpen(false)}
          onWatch={handleWatch}
          onRemove={handleRemoveFromWatchlist}
          onClearAll={handleClearWatchlist}
        />
      )}

      {/* Toast Notification */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />

    </div>
  );
}
