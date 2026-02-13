import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Database, 
  Cpu, 
  Zap, 
  Linkedin, 
  Mail, 
  Play, 
  ChevronRight,
  Monitor,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

// Firebase Storage Imports
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "./firebase";

// Import Playback Orchestrator
import { playbackController } from './playbackController.js';

const App = () => {
  const [view, setView] = useState('home'); // 'home' or 'video'
  const [scrolled, setScrolled] = useState(false);
  const [brandLogoUrl, setBrandLogoUrl] = useState(null);

  // --- GLOBAL BRAND LOGO RETRIEVAL ---
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const storage = getStorage(app);
        const logoRef = ref(storage, "logos/Advansells-LOGO.png");
        const url = await getDownloadURL(logoRef);
        setBrandLogoUrl(url);
      } catch (error) {
        console.error("Brand logo retrieval failed:", error);
      }
    };

    fetchLogo();
  }, []);

  // --- ROUTING ORCHESTRATION ---

  // Handle initial path detection on mount
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/video')) {
      setView('video');
    } else {
      setView('home');
    }
  }, []);

  // Navigation Helpers
  const navigateToVideo = () => {
    setView('video');
    window.history.pushState({}, '', '/video' + window.location.search);
  };

  const navigateToHome = () => {
    setView('home');
    window.history.pushState({}, '', '/' + window.location.search);
  };

  // --- EXISTING EFFECTS ---

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const ACCENT_COLOR = "text-[#00f2ff]";
  const ACCENT_BG = "bg-[#00f2ff]";
  const ACCENT_BORDER = "border-[#00f2ff]";

  // --- SUB-COMPONENTS ---

  const LandingPage = () => {
    const vid = new URLSearchParams(window.location.search).get('vid');

    return (
      <>
        <style>{`
          @keyframes heroPulse {
            0% {
              transform: scale(1);
              box-shadow: 0 0 25px rgba(255,255,255,0.4);
            }
            50% {
              transform: scale(1.28);
              box-shadow: 0 0 55px rgba(255,255,255,0.9);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 0 25px rgba(255,255,255,0.4);
            }
          }
        `}</style>
        
        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-black/80 backdrop-blur-md border-white/10' : 'bg-transparent border-transparent'}`}>
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${ACCENT_BG} animate-pulse`} />
              <span className="font-bold tracking-tight text-xl uppercase italic">Advansells</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
              <a href="#how" className="hover:text-white transition-colors">Process</a>
              <a href="#proof" className="hover:text-white transition-colors">Results</a>
              <button 
                onClick={navigateToVideo}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border border-[#00f2ff]/30 text-[#00f2ff] hover:bg-[#00f2ff]/10 transition-all duration-300`}
              >
                <Monitor size={14} />
                View Prototype
              </button>
            </div>
          </div>
        </nav>

        <main>
          {/* Section 1: Hero */}
          <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#00f2ff]/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest uppercase ${ACCENT_COLOR}`}>
                  Advanced AI Strategic Outreach
                </div>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
                  Hyper-Personalized <br /> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
                    AI Outbound.
                  </span> <br />
                  At Scale.
                </h1>
                <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                  Advansells automates 1-to-1 video prospecting for high-growth sales teams. Increase booking rates by 300% without increasing headcount.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={navigateToVideo}
                    className={`group relative px-8 py-4 ${ACCENT_BG} text-black font-bold rounded-lg overflow-hidden hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2`}
                  >
                    Get Your Sample Video
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Video Placeholder */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00f2ff]/20 to-purple-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative aspect-video bg-black rounded-xl border border-white/10 overflow-hidden flex items-center justify-center cursor-pointer" onClick={navigateToVideo}>
                  {/* BLURRED TEASER INJECTION */}
                  {vid && (
                    <video
                      src={`https://firebasestorage.googleapis.com/v0/b/authenticateflash.firebasestorage.app/o/videos%2F${vid}.mp4?alt=media`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover blur-md scale-105 opacity-70"
                    />
                  )}
                  
                  {/* BRAND LOGO CIRCLE */}
                  <div className="absolute bottom-6 left-6 w-32 h-32 rounded-full border-2 border-[#00f2ff] bg-slate-800 flex items-center justify-center overflow-hidden shadow-2xl shadow-[#00f2ff]/20 z-10">
                      {brandLogoUrl && (
                        <img
                          src={brandLogoUrl}
                          alt="Advansells Brand"
                          className="w-full h-full object-contain p-1 scale-110"
                        />
                      )}
                  </div>

                  <div 
                    className="relative z-10 w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transition-transform"
                    style={{
                      animation: "heroPulse 1.6s ease-in-out infinite"
                    }}
                  >
                    <Play className="fill-current ml-1" size={32} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: How It Works */}
          <section id="how" className="py-24 px-6 border-y border-white/5 bg-[#0d0d0d]">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-3 gap-12">
                <FeatureCard 
                  icon={<Database className={ACCENT_COLOR} />}
                  title="Data Extraction"
                  description="Advansells pulls your top 100 leads from your CRM or LinkedIn with surgical precision."
                />
                <FeatureCard 
                  icon={<Cpu className={ACCENT_COLOR} />}
                  title="AI Synthesis"
                  description="Our proprietary engine generates personalized lip-sync video and voice for every prospect."
                />
                <FeatureCard 
                  icon={<Zap className={ACCENT_COLOR} />}
                  title="Instant Deployment"
                  description="Custom landing pages for every lead, delivered via Advansells nodes in under 24 hours."
                />
              </div>
            </div>
          </section>

          {/* Section 3: Proof */}
          <section id="proof" className="py-32 px-6">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <div className="relative">
                <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-[160px] font-serif italic text-white/5 leading-none select-none">“</span>
                <blockquote className="text-3xl md:text-5xl font-medium tracking-tight leading-tight">
                  "The Advansells methodology yields an ROI <span className={ACCENT_COLOR}>11x higher</span> than traditional text. We don't send emails; we send high-leverage assets."
                </blockquote>
                <div className="mt-8 flex items-center justify-center gap-4">
                  {/* FOUNDER BRAND LOGO CIRCLE */}
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-slate-800 flex items-center justify-center overflow-hidden shadow-xl">
                    {brandLogoUrl ? (
                      <img 
                        src={brandLogoUrl} 
                        alt="Founder" 
                        className="w-full h-full object-contain p-1 scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#00f2ff] to-slate-900" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-bold uppercase tracking-widest">Founder</p>
                    <p className="text-sm text-slate-500">Advansells Strategy Group</p>
                  </div>
                </div>
              </div>

              <div className="pt-20">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-8">Propelled by Elite Infrastructure</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
                  <LogoPlaceholder name="HeyGen" />
                  <LogoPlaceholder name="Tavus" />
                  <LogoPlaceholder name="Apollo" />
                  <LogoPlaceholder name="OpenAI" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Footer */}
          <section className="py-24 px-6 bg-gradient-to-t from-[#00f2ff]/5 to-transparent">
            <div className="max-w-7xl mx-auto border border-white/10 rounded-3xl p-12 md:p-24 bg-black relative overflow-hidden text-center">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,242,255,0.1),transparent)]" />
               
               <div className="relative z-10 space-y-8">
                 <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Scale your outreach with Advansells.</h2>
                 <p className="text-slate-400 text-lg max-w-md mx-auto">
                   Stop competing for attention. Start demanding it with Advansells' hyper-personalized technical strategies.
                 </p>
                 <div className="flex flex-col items-center gap-6">
                   <button className={`group px-10 py-5 ${ACCENT_BG} text-black font-bold rounded-xl hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] transition-all flex items-center gap-2`}>
                     Book a 15-Min Strategy Session
                     <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                   </button>
                   
                   <div className="flex items-center gap-8 pt-8 border-t border-white/10 w-full max-w-xs justify-center">
                      <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
                      <a href="#" className="text-slate-500 hover:text-white transition-colors"><Mail size={20} /></a>
                   </div>
                 </div>
               </div>
            </div>
            
            <div className="max-w-7xl mx-auto mt-16 flex flex-col md:row justify-between items-center text-slate-600 text-xs">
              <p>© 2026 Advansells. Built for Leverage.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                  <a href="#" className="hover:text-white">Privacy</a>
                  <a href="#" className="hover:text-white">Terms</a>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  };

  const VideoDeliveryPage = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playback, setPlayback] = useState({
      identity: null,
      downloadURL: null,
      status: {
        isLoading: true,
        isReady: false,
        isError: false,
        message: 'Initializing playback engine...'
      }
    });

    useEffect(() => {
      const initPlayback = async () => {
        const session = await playbackController.initSession();
        setPlayback(session);
      };
      initPlayback();
    }, []);

    const handlePlayClick = () => {
      if (videoRef.current) {
        setIsPlaying(true);
        videoRef.current.play();
      }
    };

    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00f2ff]/10 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Back to Home */}
        <button 
          onClick={navigateToHome}
          className="absolute top-8 left-8 text-slate-600 hover:text-white flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Return to HQ
        </button>

        <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {/* Header Tag */}
          <div className="text-slate-600 text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">
            ADVANSELLS STRATEGIC PROTOTYPE
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            A Custom Outbound Engine for <span className={ACCENT_COLOR}>{playback.identity || '[Company Name]'}</span>
          </h1>

          {/* Video Player Container */}
          <div className="w-full relative group">
            <div className={`absolute -inset-1 ${playback.status.isError ? 'bg-red-500/10' : 'bg-[#00f2ff]/10'} rounded-2xl blur opacity-50`}></div>
            <div className="relative aspect-video w-full bg-[#111] rounded-xl border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl">
              
              {/* LOADING STATE */}
              {playback.status.isLoading && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-pulse">
                      <Cpu className="text-[#00f2ff]/40" size={32} />
                    </div>
                    <span className="text-slate-500 font-mono text-[10px] tracking-widest uppercase">{playback.status.message}</span>
                  </div>
                </>
              )}

              {/* READY STATE (HTML5 VIDEO PLAYER) */}
              {playback.status.isReady && (
                <>
                  {/* Blurred Teaser Layer */}
                  {!isPlaying && (
                    <video 
                      src={playback.downloadURL}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover blur-md scale-105 z-0"
                    />
                  )}

                  <video 
                    ref={videoRef}
                    className={`w-full h-full object-cover relative z-10 ${!isPlaying ? 'opacity-0' : 'opacity-100'}`}
                    controls={isPlaying}
                    playsInline
                  >
                    <source src={playback.downloadURL} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Pulsing Play Button Overlay */}
                  {!isPlaying && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                      onClick={handlePlayClick}
                    >
                      <div 
                        className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:scale-110 transition-transform"
                        style={{
                          animation: !isPlaying ? "pulse 1.4s infinite" : "none"
                        }}
                      >
                        <Play className="fill-black text-black ml-1" size={36} />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ERROR STATE */}
              {playback.status.isError && (
                <div className="relative z-10 flex flex-col items-center gap-4 p-8">
                  <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <AlertCircle className="text-red-500" size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white font-bold">Delivery Interrupted</h3>
                    <p className="text-slate-500 text-sm font-mono uppercase tracking-tighter">
                      {playback.status.message}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Close Section */}
          <div className="space-y-8 max-w-xl">
            <p className="text-slate-400 text-lg md:text-xl font-medium">
              I can deploy this full system for your sales team in 24 hours.
            </p>
            
            <button className={`group relative px-10 py-5 ${ACCENT_BG} text-black font-extrabold text-lg rounded-xl hover:shadow-[0_0_40px_rgba(0,242,255,0.4)] hover:scale-[1.03] transition-all flex items-center gap-3 mx-auto`}>
              Deploy My Engine - Book 15-Min Strategy Session
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
            </button>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.9; box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
            50% { transform: scale(1.15); opacity: 1; box-shadow: 0 0 40px 10px rgba(255, 255, 255, 0.2); }
            100% { transform: scale(1); opacity: 0.9; box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
          }
        `}} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#00f2ff]/30">
      {view === 'home' ? <LandingPage /> : <VideoDeliveryPage />}
    </div>
  );
};

// --- UTILS ---

const FeatureCard = ({ icon, title, description }) => (
  <div className="group space-y-4 p-8 rounded-2xl border border-white/5 hover:border-white/20 hover:bg-white/[0.02] transition-all duration-500">
    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

const LogoPlaceholder = ({ name }) => (
  <div className="flex items-center justify-center font-bold text-xl tracking-tighter hover:text-white transition-colors cursor-default py-4">
    {name}
  </div>
);

export default App;