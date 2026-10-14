import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Share2, 
  Star, 
  Tv, 
  Server,
  Plus,
  Check,
  Download
} from 'lucide-react';
import { PirateSkull } from './PirateIcons';

export default function VideoPlayerModal({ 
  item, 
  onClose, 
  watchlist = [], 
  onToggleWatchlist, 
  onToast 
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentServer, setCurrentServer] = useState('Server 1 [VIP 4K Ultra]');
  const [activeSeason, setActiveSeason] = useState(1);
  const [activeEpisode, setActiveEpisode] = useState(1);
  const [quality, setQuality] = useState('1080p');
  const [speed, setSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isLoadingStream, setIsLoadingStream] = useState(false);

  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const isSaved = watchlist.some((saved) => saved.id === item.id);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          onClose();
        }
      } else if (e.key === ' ' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch((err) => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    onToast({ type: 'success', message: 'Stream link copied to clipboard!' });
  };

  const handleServerChange = (srvName) => {
    setIsLoadingStream(true);
    setCurrentServer(srvName);
    onToast({ type: 'info', message: `Connected to ${srvName}` });
    setTimeout(() => {
      setIsLoadingStream(false);
    }, 600);
  };

  const handleDownload = () => {
    onToast({ type: 'success', message: `Downloading ${item.title} (1080p MP4)...` });
  };

  const episodes = item.seasons?.[activeSeason - 1]?.episodes || [
    { ep: 1, title: 'Episode 1: The Beginning', duration: '55m', thumbnail: item.backdrop || item.poster },
    { ep: 2, title: 'Episode 2: Into the Shadows', duration: '52m', thumbnail: item.poster },
    { ep: 3, title: 'Episode 3: The Gathering', duration: '58m', thumbnail: item.backdrop || item.poster },
    { ep: 4, title: 'Episode 4: Turning Tide', duration: '50m', thumbnail: item.poster },
  ];

  const servers = [
    { id: 's1', name: 'Server 1 [VIP 4K Ultra]', speed: 'Fastest' },
    { id: 's2', name: 'Server 2 [Fast CDN]', speed: 'Smooth' },
    { id: 's3', name: 'Server 3 [Multi-Audio]', speed: 'Global' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/92 backdrop-blur-xl flex items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Container Card */}
      <div className="relative w-full max-w-6xl bg-[#0a0d14] border border-[#232d3d] rounded-none sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[100vh] sm:max-h-[94vh]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#232d3d] bg-[#0e131d]">
          <div className="flex items-center gap-2.5">
            <PirateSkull className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm font-bold text-slate-200">
              BootyBox Player • <span className="text-amber-300 font-mono">{currentServer}</span>
            </span>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Section */}
        <div 
          ref={playerContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          className="relative w-full aspect-video bg-black flex items-center justify-center group select-none overflow-hidden"
        >
          {isLoadingStream ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <PirateSkull className="w-10 h-10 text-amber-400 animate-spin" />
              <span className="text-xs font-mono text-amber-300">Connecting to stream...</span>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={item.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
              poster={item.backdrop}
              autoPlay
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              onClick={togglePlay}
              className="w-full h-full object-contain cursor-pointer"
            />
          )}

          {/* Big Center Play Icon when Paused */}
          {!isPlaying && !isLoadingStream && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#f5c35b] to-[#e59934] flex items-center justify-center shadow-2xl shadow-amber-500/50 hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-[#0a0d14] fill-[#0a0d14] ml-1" />
              </div>
            </div>
          )}

          {/* Custom Controls */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 sm:p-5 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            
            {/* Seek Bar */}
            <div className="relative flex items-center group/scrub mb-2.5">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/20 hover:h-2.5 rounded-lg appearance-none cursor-pointer accent-[#f5c35b] transition-all"
              />
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between text-white text-xs sm:text-sm">
              
              <div className="flex items-center gap-3 sm:gap-4">
                <button 
                  onClick={togglePlay}
                  className="p-1.5 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                </button>

                {/* Volume Slider */}
                <div className="flex items-center gap-1.5 group/vol">
                  <button onClick={toggleMute} className="p-1 hover:text-amber-400">
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-14 sm:w-20 h-1 bg-white/20 rounded-lg appearance-none accent-[#f5c35b] cursor-pointer"
                  />
                </div>

                {/* Time Display */}
                <div className="text-[11px] sm:text-xs text-slate-300 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span className="mx-1 text-white/40">/</span>
                  <span>{formatTime(duration || 120)}</span>
                </div>
              </div>

              {/* Right: Quality, Speed, Fullscreen */}
              <div className="flex items-center gap-2 sm:gap-3">
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="bg-[#0e131d] border border-white/20 text-slate-200 rounded px-1.5 py-0.5 text-xs focus:outline-none cursor-pointer hidden sm:block font-mono"
                >
                  <option value="4K UHD">4K UHD</option>
                  <option value="1080p">1080p</option>
                  <option value="720p">720p</option>
                  <option value="Auto">Auto</option>
                </select>

                <select
                  value={speed}
                  onChange={(e) => {
                    const sp = parseFloat(e.target.value);
                    setSpeed(sp);
                    if (videoRef.current) videoRef.current.playbackRate = sp;
                  }}
                  className="bg-[#0e131d] border border-white/20 text-slate-200 rounded px-1.5 py-0.5 text-xs focus:outline-none cursor-pointer hidden sm:block font-mono"
                >
                  <option value="0.75">0.75x</option>
                  <option value="1">1.0x</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2.0x</option>
                </select>

                <button 
                  onClick={toggleFullscreen}
                  className="p-1.5 hover:text-amber-400 transition-colors"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Details & Episodes */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Server Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0e131d] p-3 rounded-xl border border-[#232d3d]">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-300 uppercase font-mono">Select Server:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {servers.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => handleServerChange(srv.name)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentServer === srv.name
                      ? 'pirate-gold-btn text-[#090d14] shadow-md font-bold'
                      : 'bg-[#151c2b] text-slate-300 hover:text-white hover:bg-white/10 border border-[#232d3d]'
                  }`}
                >
                  {srv.name}
                </button>
              ))}
            </div>
          </div>

          {/* Title & Metadata & Actions */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-md font-mono font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {item.rating || '8.8'}
                </span>
                <span className="bg-white/10 text-white/80 px-2 py-0.5 rounded font-mono">
                  {item.year || 2024}
                </span>
                <span className="bg-white/10 text-white/80 px-2 py-0.5 rounded">
                  {item.quality || '4K UHD'}
                </span>
                <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">
                  {item.type || 'Movie'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {item.title}
              </h2>

              <p className="text-sm text-slate-300/80 leading-relaxed max-w-3xl">
                {item.overview || 'Stream this title in full high definition with zero ads and fast buffering servers.'}
              </p>
            </div>

            {/* Quick Actions (Watchlist, Share, Download) */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => onToggleWatchlist(item)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                    : 'bg-[#121824] hover:bg-[#1a2333] border-[#232d3d] text-white'
                }`}
              >
                {isSaved ? <Check className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4" />}
                <span>{isSaved ? 'In Watchlist' : 'Watchlist'}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-[#121824] hover:bg-[#1a2333] border border-[#232d3d] text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 pirate-gold-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Episodes Grid if TV Series or Animation */}
          {(item.type === 'TV Series' || item.type === 'Animation' || item.seasons) && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b border-[#232d3d] pb-2">
                <div className="flex items-center gap-2">
                  <Tv className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm sm:text-base font-bold text-white">Episodes</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Season:</span>
                  <select
                    value={activeSeason}
                    onChange={(e) => setActiveSeason(Number(e.target.value))}
                    className="bg-[#0e131d] border border-white/20 text-white rounded px-2.5 py-1 text-xs font-semibold focus:outline-none"
                  >
                    <option value="1">Season 1</option>
                    <option value="2">Season 2</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {episodes.map((ep, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveEpisode(ep.ep || idx + 1);
                      onToast({ type: 'info', message: `Now playing ${ep.title}` });
                    }}
                    className={`group/ep relative p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                      activeEpisode === (ep.ep || idx + 1)
                        ? 'bg-amber-500/15 border-amber-400/60 shadow-lg'
                        : 'bg-[#0e131d] border-[#232d3d] hover:border-amber-400/30 hover:bg-[#141b29]'
                    }`}
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-black/60">
                      <img src={ep.thumbnail || item.poster} alt={ep.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/ep:opacity-100 transition-opacity">
                        <Play className="w-6 h-6 text-amber-400 fill-amber-400" />
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-300">
                        {ep.duration || '48m'}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className={activeEpisode === (ep.ep || idx + 1) ? 'text-amber-300' : 'text-slate-200'}>
                          Episode {ep.ep || idx + 1}
                        </span>
                        {activeEpisode === (ep.ep || idx + 1) && (
                          <span className="text-[9px] text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded font-mono font-bold">
                            PLAYING
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{ep.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cast Crew */}
          {item.cast && item.cast.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-sm sm:text-base font-bold text-white">Top Cast</h3>
              <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
                {item.cast.map((actor, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 bg-[#0e131d] p-2 rounded-xl border border-[#232d3d] shrink-0">
                    <img 
                      src={actor.avatar} 
                      alt={actor.name} 
                      className="w-10 h-10 rounded-full object-cover border border-white/10" 
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{actor.name}</h4>
                      <p className="text-[11px] text-slate-400 font-mono">{actor.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
