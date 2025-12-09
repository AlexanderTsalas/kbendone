import React, { useState, useEffect, useCallback, useRef, useMemo, createContext, useContext, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { 
  Menu, X, Sun, Moon, Globe, Sparkles, Check, Clock, ChevronDown, Layers, Filter,
  ArrowRight, ArrowLeft, Star, Award, Shield, Quote, MapPin, Phone, Mail,
  Search, BookOpen, Activity, Heart, AlertTriangle, Calendar, User, Share2, Facebook, Twitter, Linkedin, Plus, Minus
} from 'lucide-react';
import { 
  Language, ServiceItem, ServiceCategory, NavItem, SubCategory, CategoryData, 
  ProcedureStep, ProcedureDetail, GalleryCase, BlogPost 
} from './types';
import { getServiceTree, translations, getFaqData, getBlogPosts } from './translations';

// --- CONTEXTS ---

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('el');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// --- UI COMPONENTS ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'gold';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative px-8 py-4 font-sans font-bold text-sm tracking-widest uppercase transition-all duration-500 overflow-hidden group rounded-full";
  
  const variants = {
    primary: "bg-slate-900 text-white dark:bg-white dark:text-dark hover:scale-105 hover:shadow-[0_0_30px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]",
    outline: "border border-black/10 dark:border-white/30 text-slate-900 dark:text-white hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/10 backdrop-blur-md",
    gold: "bg-gradient-to-r from-gold-dim to-gold text-white dark:text-black hover:scale-105 hover:shadow-[0_0_40px_rgb(var(--color-gold)/0.4)]",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </span>
      {/* Glint effect */}
      <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[30deg] group-hover:left-[100%] transition-all duration-700 ease-in-out"></div>
    </button>
  );
};

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  centered = true 
}) => {
  return (
    <div className={`mb-12 md:mb-24 relative ${centered ? 'text-center' : 'text-left'}`}>
      {subtitle && (
        <span className="block mb-4 text-xs font-bold uppercase tracking-[0.5em] text-gold-dim dark:text-gold animate-pulse-glow">
          {subtitle}
        </span>
      )}
      <h2 className="text-5xl md:text-7xl font-serif leading-tight text-slate-900 dark:text-white relative z-10 transition-colors duration-500">
        {title}
      </h2>
      {/* Background glow for depth */}
      <div className={`absolute top-1/2 -translate-y-1/2 w-64 h-64 bg-gold/10 rounded-full blur-[100px] -z-10 ${centered ? 'left-1/2 -translate-x-1/2' : 'left-0'}`}></div>
    </div>
  );
};

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.animate({
          transform: `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`
        }, { duration: 500, fill: "forwards" });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="hidden md:block fixed top-0 left-0 w-3 h-3 bg-gold rounded-full pointer-events-none z-[9999] shadow-[0_0_20px_rgb(var(--color-gold))] mix-blend-difference"
      />
      <div 
        ref={ringRef}
        className="hidden md:block fixed top-0 left-0 w-12 h-12 border border-gold/50 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out"
      />
    </>
  );
};

// --- FEATURE COMPONENTS ---

interface HeroProps {
  onNavigate: (view: 'home' | 'services' | 'service-details', data?: any) => void;
}

const heroServices = [
  { id: 'rhinoplasty', title: 'Ρινοπλαστική', subtitle: 'Ultrasonic Piezo', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3SjPGFs1QFWSt40yPZw5GjgMFsyyw3XYfuA&s' },
  { id: 'augmentation', title: 'Αυξητική Στήθους', subtitle: 'Premium Implants', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoRXGBwhlANFvf_kyzWmhiG0xc2jgw_YTyDg&s' },
  { id: 'lipo', title: 'Λιπογλυπτική', subtitle: 'Vaser HD', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop' },
  { id: 'facelift', title: 'Face Lift', subtitle: 'Deep Plane', img: 'https://images.unsplash.com/photo-1551024601-562963525607?q=80&w=1000&auto=format&fit=crop' },
  { id: 'blepharoplasty', title: 'Βλεφαροπλαστική', subtitle: 'Eyelid Surgery', img: 'https://images.unsplash.com/photo-1557002665-c552e1832483?q=80&w=800&auto=format&fit=crop' },
  { id: 'botox', title: 'Injectables', subtitle: 'Botox & Fillers', img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1000&auto=format&fit=crop' },
];

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { language } = useLanguage();
  const t = translations[language].hero;
  const serviceTree = getServiceTree(language);

  const cellCount = heroServices.length;
  const radius = 380; // Distance from center
  const theta = 360 / cellCount;

  const rotateCarousel = () => {
    const angle = selectedIndex * -theta;
    return `translateZ(-${radius}px) rotateY(${angle}deg)`;
  };

  const nextSlide = () => {
    setSelectedIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setSelectedIndex((prev) => prev - 1);
  };

  const handleServiceClick = (serviceId: string) => {
    let foundProcedure: ProcedureDetail | undefined;
    
    // Search through the dynamic service tree
    for (const cat of serviceTree) {
        if (cat.items) {
            const item = cat.items.find(i => i.id === serviceId);
            if (item) { foundProcedure = item; break; }
        }
        if (cat.subCategories) {
            for (const sub of cat.subCategories) {
                const item = sub.items.find(i => i.id === serviceId);
                if (item) { foundProcedure = item; break; }
            }
        }
        if (foundProcedure) break;
    }

    if (foundProcedure) {
        onNavigate('service-details', foundProcedure);
    } else {
        // Fallback to services page if not found
        onNavigate('services');
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen relative flex items-center justify-center overflow-hidden transition-colors duration-500 pt-[3.5rem] pb-20 lg:py-0"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-light dark:bg-gradient-dark z-0 transition-colors duration-500"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] animate-pulse-glow pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/5 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Content */}
      <div 
        className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Text Content Layer */}
          <div className="order-2 lg:order-1 relative z-20">
            <div className="relative">
               <span className="inline-block text-gold-dim dark:text-gold text-xs font-bold uppercase tracking-[0.4em] mb-6 animate-fade-in">
                 {t.subtitle}
               </span>
               
               <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-slate-900 dark:text-white leading-[0.9] mb-8 transition-colors duration-500">
                 {t.title_start} <br/>
                 {t.title_mid} <span className="text-gradient-gold italic">{t.title_end}</span>
               </h1>

               <p className="text-slate-600 dark:text-gray-300 text-lg md:text-xl font-light mb-12 max-w-lg leading-relaxed transition-colors duration-500">
                 {t.desc}
               </p>

               <div className="flex flex-col md:flex-row gap-6">
                 <Button variant="outline" onClick={() => onNavigate('services')}>
                    {t.cta_results}
                 </Button>
                 <Button variant="gold" onClick={() => window.location.href='#contact'} >
                    {t.cta_book}
                 </Button>
               </div>
            </div>
          </div>

          {/* 3D Carousel */}
          <div className="order-1 lg:order-2 relative h-[650px] lg:h-[700px] flex flex-col items-center justify-center perspective-container z-30">
             
             {/* Scene */}
             <div className="relative w-[300px] h-[420px] preserve-3d transition-transform duration-1000 ease-out scale-75 md:scale-100" 
                  style={{ transform: rotateCarousel() }}>
                
                {heroServices.map((service, index) => (
                  <div 
                    key={service.id}
                    onClick={() => handleServiceClick(service.id)}
                    className="absolute top-0 left-0 w-full h-full backface-hidden group cursor-pointer"
                    style={{
                      transform: `rotateY(${index * theta}deg) translateZ(${radius}px)`,
                      opacity: 1 // Always visible, depth managed by z-space
                    }}
                  >
                     {/* 
                         INNER CARD WRAPPER 
                         Handles Hover States: Shift Up (-translate-y-6) + Gold Shadow + Gold Border
                     */}
                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-white dark:bg-dark-lighter border border-white/20 dark:border-white/10 transition-all duration-500 ease-out group-hover:-translate-y-6 group-hover:shadow-[0_0_60px_rgb(var(--color-gold)/0.6)] group-hover:border-gold/60">
                        
                        {/* LASER EFFECT: Scanning Beam */}
                        <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-transparent via-gold/80 to-transparent blur-md opacity-0 group-hover:opacity-100 group-hover:animate-laser pointer-events-none z-50 mix-blend-screen"></div>

                        {/* Image Layer */}
                        <div className="absolute inset-0">
                           <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                           <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                        </div>

                        {/* Content Layer */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                           <Sparkles className="text-gold w-6 h-6 mb-4 animate-pulse" />
                           <h3 className="text-2xl font-serif text-white mb-1 shadow-black drop-shadow-md group-hover:text-gold transition-colors">{service.title}</h3>
                           <p className="text-white/80 text-xs font-light uppercase tracking-widest mb-6">{service.subtitle}</p>
                           <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-gold group-hover:border-gold group-hover:text-black transition-all">
                              <ArrowRight size={16} />
                           </div>
                        </div>

                        {/* Gloss Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-30 pointer-events-none z-10"></div>
                    </div>
                  </div>
                ))}
             </div>

             {/* Navigation Controls */}
             <div className="absolute bottom-4 lg:bottom-10 flex gap-6 z-50">
                <button 
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white dark:hover:text-black transition-all text-slate-500 dark:text-white"
                >
                  <ArrowLeft size={20} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white dark:hover:text-black transition-all text-slate-500 dark:text-white"
                >
                  <ArrowRight size={20} />
                </button>
             </div>
             
             {/* Decorative floor reflection glow */}
             <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[300px] h-[20px] bg-black/50 blur-[30px] rounded-[100%]"></div>
          </div>

        </div>
      </div>

    </section>
  );
};

const About: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].about;

  return (
    <section id="about" className="py-32 bg-slate-50 dark:bg-dark relative overflow-hidden transition-colors duration-500">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-20 mix-blend-multiply dark:mix-blend-overlay"></div>
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          
          <div className="w-full lg:w-1/2 relative flex justify-center items-center perspective-container min-h-[500px]">
             {/* The Abstract Golden Sphere Animation */}
             <div className="relative w-96 h-96 preserve-3d scale-75 md:scale-100">
                {/* Core Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold/50 dark:bg-gold rounded-full blur-[60px] animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full blur-[20px] animate-pulse-glow"></div>
                
                {/* Ring 1 - Outer Vertical */}
                <div className="absolute inset-0 border border-gold/40 rounded-full animate-spin-3d-1 shadow-[0_0_30px_rgb(var(--color-gold)/0.2)] border-t-gold border-r-transparent"></div>
                
                {/* Ring 2 - Outer Horizontal/Tilt */}
                <div className="absolute inset-4 border border-gold/30 rounded-full animate-spin-3d-2 shadow-[0_0_20px_rgb(var(--color-gold)/0.1)] border-b-gold border-l-transparent"></div>
                
                {/* Ring 3 - Inner Fast */}
                <div className="absolute inset-16 border-2 border-gold/60 rounded-full animate-spin-3d-3 border-l-transparent border-b-transparent"></div>

                {/* Ring 4 - Static Orbit */}
                <div className="absolute inset-[-40px] border border-black/5 dark:border-white/5 rounded-full animate-[spin_30s_linear_infinite]"></div>

                {/* Floating Particles */}
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-gold rounded-full blur-[1px] shadow-[0_0_10px_rgb(var(--color-gold))] animate-float"></div>
                <div className="absolute bottom-10 right-10 w-3 h-3 bg-slate-900 dark:bg-white rounded-full blur-[2px] animate-pulse"></div>
                <div className="absolute top-20 left-10 w-1 h-1 bg-gold rounded-full blur-[1px]"></div>
             </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-12">
             <div>
                <span className="text-gold-dim dark:text-gold text-xs font-bold uppercase tracking-[0.4em] block mb-4">{t.philosophy}</span>
                <h2 className="text-4xl md:text-6xl font-serif text-slate-900 dark:text-white leading-tight transition-colors duration-500">
                  {t.title_start} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dim to-gold dark:from-gold dark:to-white">{t.title_end}</span>
                </h2>
             </div>

             <div className="space-y-6 text-slate-600 dark:text-gray-400 font-light text-lg leading-relaxed transition-colors duration-500">
                <p>{t.p1}</p>
                <p>{t.p2}</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5 p-6 rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-colors backdrop-blur-sm">
                   <Shield className="text-gold-dim dark:text-gold mb-4" />
                   <h4 className="text-slate-900 dark:text-white font-serif text-xl mb-2">{t.safety}</h4>
                   <p className="text-xs text-slate-500 dark:text-gray-500">{t.safety_desc}</p>
                </div>
                <div className="bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5 p-6 rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-colors backdrop-blur-sm">
                   <Award className="text-gold-dim dark:text-gold mb-4" />
                   <h4 className="text-slate-900 dark:text-white font-serif text-xl mb-2">{t.expertise}</h4>
                   <p className="text-xs text-slate-500 dark:text-gray-500">{t.expertise_desc}</p>
                </div>
                <div className="bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5 p-6 rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-colors backdrop-blur-sm">
                   <Star className="text-gold-dim dark:text-gold mb-4" />
                   <h4 className="text-slate-900 dark:text-white font-serif text-xl mb-2">{t.technology}</h4>
                   <p className="text-xs text-slate-500 dark:text-gray-500">{t.technology_desc}</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

interface DoctorProps {
    onNavigate?: (view: 'home' | 'services' | 'faq' | 'doctor-bio', hash?: string) => void;
}

const Doctor: React.FC<DoctorProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const { language } = useLanguage();
  const t = translations[language].doctor;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (inverted X for natural feel)
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;

    // Calculate glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setRotation({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  };

  return (
    <section id="doctor" className="py-20 bg-white dark:bg-dark-lighter relative overflow-hidden transition-colors duration-500">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
          
          {/* 3D Holographic Model Container */}
          <div className="w-full lg:w-1/2 relative h-[500px] flex items-center justify-center perspective-container">
             
             {/* Interactive Area */}
             <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full max-w-md h-[550px] cursor-pointer group preserve-3d transition-transform duration-100 ease-out"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                }}
             >
                {/* Backplate / Shadow */}
                <div className="absolute inset-4 bg-gold/20 rounded-[2rem] blur-xl transform translate-z-[-50px] transition-all duration-500 group-hover:bg-gold/40"></div>

                {/* Layer 1: Base Image (The "Physical" layer) */}
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 bg-dark shadow-2xl backface-hidden">
                    <img 
                      src="https://kbenetatos.gr/wp-content/uploads/CV-s1-p1-768x555.jpg" 
                      alt="Δρ. Κωνσταντίνος Μπενετάτος" 
                      className="w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                </div>

                {/* Layer 2: Holographic Ghosting (Volumetric Effect) */}
                <div 
                    className="absolute inset-0 rounded-[2rem] overflow-hidden opacity-0 group-hover:opacity-40 transition-opacity duration-300 mix-blend-screen pointer-events-none border border-gold/50"
                    style={{ transform: 'translateZ(30px)' }}
                >
                     <img 
                      src="https://kbenetatos.gr/wp-content/uploads/CV-s1-p1-768x555.jpg" 
                      alt="Hologram" 
                      className="w-full h-full object-cover filter brightness-150 contrast-125 sepia hue-rotate-15"
                    />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50"></div>
                </div>

                {/* Layer 3: Tech HUD Overlay */}
                <div 
                    className="absolute inset-0 rounded-[2rem] border border-white/10 pointer-events-none"
                    style={{ transform: 'translateZ(60px)' }}
                >
                    {/* Corners */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gold opacity-50"></div>
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gold opacity-50"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute bottom-8 left-8 bg-black/80 backdrop-blur-md border border-gold/30 px-6 py-3 rounded-xl shadow-lg transform transition-transform group-hover:translate-x-2">
                        <h3 className="text-xl font-serif text-white">Δρ. Κωνσταντίνος Μπενετάτος</h3>
                        <div className="h-[1px] w-full bg-gradient-to-r from-gold to-transparent my-1"></div>
                        <span className="text-gold text-[10px] font-bold uppercase tracking-widest">MD, PhD Plastic Surgeon</span>
                    </div>

                    {/* Scanline Animation */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gold/50 blur-[2px] animate-float opacity-0 group-hover:opacity-100"></div>
                </div>

                {/* Layer 4: Interactive Glare/Reflection */}
                <div 
                    className="absolute inset-0 rounded-[2rem] pointer-events-none mix-blend-overlay transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                        transform: 'translateZ(80px)'
                    }}
                ></div>
             </div>
             
             {/* Background Atmosphere */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-gold/5 to-transparent blur-3xl pointer-events-none z-0"></div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 space-y-8">
             <div>
                <span className="text-gold-dim dark:text-gold text-xs font-bold uppercase tracking-[0.4em] block mb-4">{t.label}</span>
                <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white leading-tight transition-colors duration-500">
                   {t.title_main} <br/>
                   <span className="italic text-slate-500 dark:text-gray-400">{t.title_sub}</span>
                </h2>
             </div>

             <div className="space-y-6 text-slate-600 dark:text-gray-400 font-light text-lg leading-relaxed transition-colors duration-500">
                <p>{t.p1}</p>
                <p>{t.p2}</p>
             </div>
             
             <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="border-l-2 border-gold pl-6">
                    <span className="block text-3xl font-serif text-slate-900 dark:text-white font-bold">15+</span>
                    <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-gray-500">{t.years}</span>
                </div>
                <div className="border-l-2 border-gold pl-6">
                    <span className="block text-3xl font-serif text-slate-900 dark:text-white font-bold">5k+</span>
                    <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-gray-500">{t.ops}</span>
                </div>
             </div>

             <div className="pt-8">
                 <Button variant="gold" onClick={() => onNavigate && onNavigate('doctor-bio')}>
                    {t.cta}
                 </Button>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Distinctions: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].distinctions;

  const memberships = [
    { id: 1, label: 'ISAPS', desc: 'International Society of Aesthetic Plastic Surgery' },
    { id: 2, label: 'HESPRAS', desc: 'Hellenic Society of Plastic Reconstructive & Aesthetic Surgery' },
    { id: 3, label: 'FEBOPRAS', desc: 'Fellow of European Board of Plastic Reconstructive and Aesthetic Surgery' },
    { id: 4, label: 'RCS', desc: 'Royal College of Surgeons of England' },
    { id: 5, label: 'GMC', desc: 'General Medical Council (UK) Specialist Register' },
    { id: 6, label: 'H.S.M', desc: 'Hellenic Society for Microsurgery' }
  ];

  return (
    <section className="py-20 bg-slate-100 dark:bg-black/40 relative border-t border-black/5 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32">
        
        <div className="text-center mb-12">
            <span className="text-gold-dim dark:text-gold text-xs font-bold uppercase tracking-[0.3em] block mb-4 opacity-80">
                {t.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white max-w-2xl mx-auto leading-tight">
                {t.main_title}
            </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-center opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
           {memberships.map((item) => (
             <div key={item.id} className="group flex flex-col items-center justify-center text-center space-y-3 cursor-default hover:opacity-100 transition-opacity">
                {/* Logo Placeholder / Text Representation */}
                <div className="h-16 w-full flex items-center justify-center relative">
                    <h3 className="text-3xl font-serif font-bold text-slate-400 dark:text-white/40 group-hover:text-gold-dim dark:group-hover:text-gold transition-colors duration-500">
                        {item.label}
                    </h3>
                </div>
                <div className="w-8 h-[1px] bg-slate-300 dark:bg-white/10 group-hover:bg-gold transition-colors duration-500"></div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-gray-500 font-medium max-w-[150px] leading-tight">
                    {item.desc}
                </p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

interface ServicesProps {
    onNavigate: (view: 'home' | 'services', data?: any) => void;
}

const serviceItems: { id: string, categoryId: ServiceCategory, img: string }[] = [
  { id: '01', categoryId: 'face', img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1000&auto=format&fit=crop' },
  { id: '02', categoryId: 'skin', img: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=800&auto=format&fit=crop' },
  { id: '03', categoryId: 'breast', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoRXGBwhlANFvf_kyzWmhiG0xc2jgw_YTyDg&s' },
  { id: '04', categoryId: 'body', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop' },
  { id: '05', categoryId: 'combined', img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop' },
  { id: '06', categoryId: 'men', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop' },
];

const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = translations[language].servicesSection;

  return (
    <section id="services" className="py-32 bg-white dark:bg-dark-lighter relative transition-colors duration-500">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none"></div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32 relative z-10">
        <SectionTitle 
          title={t.title} 
          subtitle={t.subtitle}
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((service, idx) => {
             const categoryData = t.items[service.categoryId as keyof typeof t.items];
             
             return (
            <div 
              key={service.id}
              onClick={() => onNavigate('services', service.categoryId)}
              className="group relative h-[400px] perspective-container cursor-pointer"
            >
              <div className="relative w-full h-full duration-500 ease-out preserve-3d group-hover:rotate-x-2 group-hover:-translate-y-4">
                {/* Card Content */}
                <div className="absolute inset-0 bg-slate-50 dark:bg-dark border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-[0_0_50px_rgb(var(--color-gold)/0.2)]">
                  
                  {/* Image Background */}
                  <img 
                    src={service.img} 
                    alt={categoryData.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Hover Dark Overlay for Readability */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-500 z-0"></div>

                  {/* Minimized gradient intensity */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60 dark:to-black/60 group-hover:opacity-0 transition-opacity duration-500"></div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                    <div className="mb-auto transform translate-y-[-20px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <Sparkles className="text-white w-8 h-8 mb-4 animate-pulse" />
                    </div>

                    <span className="text-gold/50 text-5xl font-serif font-bold absolute top-6 right-6 opacity-20 group-hover:opacity-50 transition-all">
                      {service.id}
                    </span>

                    <h3 className="text-3xl font-serif text-slate-900 dark:text-white mb-2 group-hover:text-white transition-colors drop-shadow-md">
                      {categoryData.title}
                    </h3>
                    <p className="text-slate-900 dark:text-gray-200 font-medium text-sm mb-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 drop-shadow-md group-hover:text-gray-100">
                      {categoryData.desc}
                    </p>

                    <div className="flex items-center gap-2 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors drop-shadow-sm">
                      {t.more} <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
};

const Testimonials: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].testimonials;

  return (
    <section className="py-32 bg-slate-50 dark:bg-dark relative overflow-hidden transition-colors duration-500">
      {/* Abstract light leaks */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-gold/5 to-transparent blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32 relative z-10">
        <SectionTitle 
          title={t.title} 
          subtitle={t.subtitle}
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.items.map((item, idx) => (
            <div key={idx} className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/5 p-10 rounded-3xl hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 relative group shadow-lg dark:shadow-none">
              <Quote className="text-gold w-8 h-8 mb-6 opacity-50 group-hover:opacity-100 transition-opacity" />
              <p className="font-serif text-xl italic text-slate-700 dark:text-gray-300 mb-8 leading-relaxed group-hover:text-black dark:group-hover:text-white transition-colors">
                "{item.text}"
              </p>
              <div className="border-t border-black/5 dark:border-white/10 pt-6">
                <span className="block text-slate-900 dark:text-white font-bold tracking-wide">{item.name}</span>
                <span className="text-gold-dim dark:text-gold text-xs uppercase tracking-widest">{item.proc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].contact;

  return (
    <section id="contact" className="py-32 bg-white dark:bg-black relative transition-colors duration-500">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-10"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle title={t.title} subtitle={t.subtitle} centered={true} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-slate-50 dark:bg-dark-lighter border border-black/5 dark:border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden transition-colors duration-500">
          {/* Glowing Border effect */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
          
          {/* Info Side */}
          <div className="space-y-12">
             <div className="space-y-2">
                <h3 className="text-3xl font-serif text-slate-900 dark:text-white">{t.visit_title}</h3>
                <p className="text-slate-600 dark:text-gray-400">{t.visit_desc}</p>
             </div>

             <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                   <div className="w-12 h-12 rounded-full bg-white/50 dark:bg-white/5 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-colors border border-black/5 dark:border-transparent">
                      <MapPin size={20} className="text-slate-900 dark:text-white group-hover:text-black" />
                   </div>
                   <div>
                      <span className="block text-xs text-gold-dim dark:text-gold uppercase tracking-widest">{t.address_label}</span>
                      <p className="text-slate-800 dark:text-white text-lg">Λεωφόρος Κηφισίας 123, Αθήνα</p>
                   </div>
                </div>

                <div className="flex items-center gap-6 group">
                   <div className="w-12 h-12 rounded-full bg-white/50 dark:bg-white/5 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-colors border border-black/5 dark:border-transparent">
                      <Phone size={20} className="text-slate-900 dark:text-white group-hover:text-black" />
                   </div>
                   <div>
                      <span className="block text-xs text-gold-dim dark:text-gold uppercase tracking-widest">{t.phone_label}</span>
                      <p className="text-slate-800 dark:text-white text-lg">+30 210 123 4567</p>
                   </div>
                </div>

                <div className="flex items-center gap-6 group">
                   <div className="w-12 h-12 rounded-full bg-white/50 dark:bg-white/5 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-colors border border-black/5 dark:border-transparent">
                      <Mail size={20} className="text-slate-900 dark:text-white group-hover:text-black" />
                   </div>
                   <div>
                      <span className="block text-xs text-gold-dim dark:text-gold uppercase tracking-widest">{t.email_label}</span>
                      <p className="text-slate-800 dark:text-white text-lg">info@kbenetatos.gr</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Form Side */}
          <form className="space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <input 
                    type="text" 
                    placeholder={t.form.name} 
                    className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-gold focus:outline-none focus:bg-white dark:focus:bg-white/10 transition-all shadow-sm"
                   />
                </div>
                <div className="space-y-2">
                   <input 
                    type="tel" 
                    placeholder={t.form.tel} 
                    className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-gold focus:outline-none focus:bg-white dark:focus:bg-white/10 transition-all shadow-sm"
                   />
                </div>
             </div>
             
             <div className="space-y-2">
                <input 
                  type="email" 
                  placeholder={t.form.email} 
                  className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-gold focus:outline-none focus:bg-white dark:focus:bg-white/10 transition-all shadow-sm"
                />
             </div>

             <div className="space-y-2">
                <textarea 
                  rows={4} 
                  placeholder={t.form.msg} 
                  className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-gold focus:outline-none focus:bg-white dark:focus:bg-white/10 transition-all resize-none shadow-sm"
                ></textarea>
             </div>

             <Button variant="gold" className="w-full">
                {t.form.submit}
             </Button>
          </form>

        </div>
      </div>
    </section>
  );
};

interface FooterProps {
  onNavigate?: (view: 'home' | 'services' | 'faq', hash?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="bg-slate-100 dark:bg-dark border-t border-black/5 dark:border-white/10 py-12 relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 bg-gold/5 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-2">
           <img 
             src="https://kbenetatos.gr/wp-content/uploads/cropped-logo-white-e1541003043733.png" 
             alt="Logo" 
             className="h-10 opacity-80 invert dark:invert-0 transition-all duration-500" 
           />
           <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-gray-500">Excellence Since 2010</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 text-sm">
           {onNavigate && (
             <button onClick={() => onNavigate('faq')} className="text-slate-500 dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors uppercase text-xs font-bold tracking-widest">
               {t.faq}
             </button>
           )}
           <a href="#" className="text-slate-500 dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors">Instagram</a>
           <a href="#" className="text-slate-500 dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors">Facebook</a>
           <a href="#" className="text-slate-500 dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors">LinkedIn</a>
        </div>

        <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-gray-600 text-center md:text-right">
           © 2024 Dr. Konstantinos Benetatos. {t.rights}
        </p>
      </div>
    </footer>
  );
};

// --- PAGES / NAVIGATION ---

type ViewType = 'home' | 'services' | 'faq' | 'doctor-bio' | 'blog' | 'service-details' | 'blog-post';

interface NavLink {
  id: string;
  label: string;
  targetView: ViewType;
  hash?: string;
}

const NavigationBar: React.FC<{
  currentView: string;
  onNavigate: (view: ViewType, data?: any) => void;
  toggleTheme: () => void;
  isDark: boolean;
}> = ({ currentView, onNavigate, toggleTheme, isDark }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  
  const t = translations[language]?.nav || translations['el'].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { id: 'doc', label: t.doctor, targetView: 'doctor-bio' },
    { id: 'srv', label: t.services, targetView: 'services' },
    { id: 'blg', label: t.blog, targetView: 'blog' },
    { id: 'cnt', label: t.contact, targetView: 'home', hash: 'contact' },
    { id: 'faq', label: t.faq, targetView: 'faq' },
  ];

  const availableLangs = [
    { code: 'el', label: 'EL' },
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
    { code: 'fr', label: 'FR' },
    { code: 'ru', label: 'RU' },
  ] as const;

  const handleNavAction = useCallback((link: NavLink) => {
    setMobileMenuOpen(false);
    onNavigate(link.targetView, link.hash);
  }, [onNavigate]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled ? 'py-4' : 'py-6 md:py-8'
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32">
          <div className={`
            relative flex justify-between items-center px-6 py-3 rounded-2xl
            transition-all duration-300
            ${isScrolled 
              ? 'bg-white/80 dark:bg-black/60 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-lg' 
              : 'bg-transparent'}
          `}>
            
            <div 
              className="cursor-pointer z-50 flex items-center" 
              onClick={() => onNavigate('home', 'hero')}
            >
               {isDark ? (
                  <img 
                    src="https://kbenetatos.gr/wp-content/uploads/cropped-logo-white-e1541003043733.png" 
                    alt="Dr. Benetatos" 
                    className={`transition-all duration-300 object-contain ${isScrolled ? 'h-10' : 'h-14'}`}
                  />
              ) : (
                  <span className="text-xl md:text-2xl font-serif font-bold tracking-[0.2em] text-slate-900 leading-none">
                      BENETATOS
                  </span>
              )}
            </div>

            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavAction(link)}
                  className="text-xs font-bold uppercase tracking-[0.15em] text-slate-600 dark:text-gray-300 hover:text-gold dark:hover:text-gold transition-colors relative group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300 ease-out"></span>
                </button>
              ))}

              <div className="w-px h-6 bg-slate-300 dark:bg-white/20 mx-2"></div>

              <div className="flex items-center gap-4">
                <div className="relative group">
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-gray-300 hover:text-gold uppercase">
                        <Globe size={14} /> <span>{language}</span>
                    </button>
                    
                    <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-xl shadow-xl overflow-hidden min-w-[120px] flex flex-col">
                            {availableLangs.map((l) => (
                                <button
                                    key={l.code}
                                    onClick={() => setLanguage(l.code as any)}
                                    className={`text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gold/10 hover:text-gold transition-colors ${language === l.code ? 'text-gold bg-gold/5' : 'text-slate-600 dark:text-gray-400'}`}
                                >
                                    {l.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button 
                  onClick={toggleTheme}
                  className="text-slate-600 dark:text-gray-300 hover:text-gold transition-colors p-1"
                  aria-label="Toggle Theme"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <button 
                    onClick={() => onNavigate('home', 'contact')}
                    className="ml-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-gold dark:hover:bg-gold hover:text-white dark:hover:text-black transition-all shadow-md hover:shadow-gold/20 active:scale-95"
                >
                    {t.book}
                </button>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-4 z-50">
               <button onClick={toggleTheme} className="text-slate-900 dark:text-white p-1">
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
               </button>
               <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-900 dark:text-white p-1"
                aria-label="Menu"
               >
                 {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
            </div>
          </div>
        </div>
      </header>

      <div 
        className={`fixed inset-0 bg-white dark:bg-black z-40 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col pt-32 px-8 overflow-y-auto pb-10">
            <div className="flex flex-col gap-6 mb-12">
                {navLinks.map((link) => (
                    <button
                        key={link.id}
                        onClick={() => handleNavAction(link)}
                        className="text-3xl font-serif text-slate-900 dark:text-white text-left hover:text-gold dark:hover:text-gold transition-colors"
                    >
                        {link.label}
                    </button>
                ))}
            </div>

            <div className="w-full h-px bg-slate-200 dark:bg-white/10 mb-8"></div>

            <div className="grid grid-cols-5 gap-2 mb-8">
                {availableLangs.map((l) => (
                    <button
                        key={l.code}
                        onClick={() => setLanguage(l.code as any)}
                        className={`py-3 rounded-lg text-xs font-bold uppercase border transition-all ${
                            language === l.code 
                            ? 'border-gold text-gold bg-gold/10' 
                            : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-500'
                        }`}
                    >
                        {l.code}
                    </button>
                ))}
            </div>

            <button 
                onClick={() => { setMobileMenuOpen(false); onNavigate('home', 'contact'); }}
                className="w-full py-4 bg-gold text-white dark:text-black font-bold uppercase tracking-widest rounded-xl shadow-lg mt-auto"
            >
                {t.book}
            </button>
        </div>
      </div>
    </>
  );
};

interface ServicesPageProps {
  onNavigate: (view: 'home' | 'services' | 'faq' | 'doctor-bio' | 'service-details', data?: any) => void;
  initialCategory?: ServiceCategory | null;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, initialCategory }) => {
  const { language } = useLanguage();
  const t = translations[language].servicesPage;
  
  const dynamicServiceTree = useMemo(() => getServiceTree(language), [language]);

  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [expandedProcedure, setExpandedProcedure] = useState<string | null>(null);
  const [showFilterFab, setShowFilterFab] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (initialCategory) {
        setActiveCategory(initialCategory);
        const catData = dynamicServiceTree.find(c => c.id === initialCategory);
        if (catData && catData.subCategories && catData.subCategories.length > 0) {
            setActiveSubCategory(catData.subCategories[0].id);
        } else {
            setActiveSubCategory(null);
        }
    } else {
        setActiveCategory('all');
        setActiveSubCategory(null);
        setExpandedProcedure(null);
    }
  }, [initialCategory, dynamicServiceTree]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFilterFab(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0, rootMargin: "-100px 0px 0px 0px" }
    );

    if (filtersRef.current) {
      observer.observe(filtersRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const displayItems = React.useMemo(() => {
    if (activeCategory === 'all') {
        const allItems: ProcedureDetail[] = [];
        dynamicServiceTree.forEach(cat => {
            if (cat.items) allItems.push(...cat.items);
            if (cat.subCategories) {
                cat.subCategories.forEach(sub => allItems.push(...sub.items));
            }
        });
        return allItems;
    }

    const currentCategoryData = dynamicServiceTree.find(c => c.id === activeCategory);
    if (!currentCategoryData) return [];
    
    if (currentCategoryData.subCategories) {
      const sub = currentCategoryData.subCategories.find(s => s.id === activeSubCategory);
      return sub ? sub.items : [];
    }
    
    return currentCategoryData.items || [];
  }, [activeCategory, activeSubCategory, dynamicServiceTree]);

  const scrollToContent = () => {
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        if (contentRef.current) {
           const yOffset = -150; 
           const element = contentRef.current;
           const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
           window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    }
  };

  const scrollToFilters = () => {
    if (filtersRef.current) {
        const yOffset = -150; 
        const y = filtersRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (catId: ServiceCategory | 'all') => {
    if (catId === 'all') {
        if (activeCategory === 'all') return;
        setActiveCategory('all');
        setActiveSubCategory(null);
        setExpandedProcedure(null);
        scrollToContent();
        return;
    }

    const cat = dynamicServiceTree.find(c => c.id === catId);
    if (!cat) return;

    if (activeCategory === cat.id) {
        setActiveCategory('all');
        setExpandedProcedure(null);
        setActiveSubCategory(null);
        return;
    }

    setActiveCategory(cat.id);
    setExpandedProcedure(null);
    
    const hasSubCategories = cat.subCategories && cat.subCategories.length > 0;
    
    if (hasSubCategories) {
      setActiveSubCategory(cat.subCategories![0].id);
    } else {
      setActiveSubCategory(null);
      scrollToContent();
    }
  };

  const toggleProcedure = (name: string) => {
    setExpandedProcedure(expandedProcedure === name ? null : name);
  };

  return (
    <div className="pt-52 pb-20 bg-slate-50 dark:bg-dark min-h-screen text-slate-900 dark:text-white relative transition-colors duration-500">
       <div className="fixed top-0 left-0 w-full h-screen bg-gradient-light dark:bg-gradient-dark z-0 pointer-events-none transition-colors duration-500"></div>

       <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32 relative z-10">
          
          <SectionTitle 
            title={t.title} 
            subtitle={t.subtitle}
            centered={false}
          />

          <div className="flex flex-col lg:flex-row gap-20 mt-8 lg:mt-16">
             
             <div ref={filtersRef} className="w-full lg:w-1/4 lg:sticky lg:top-48 lg:self-start space-y-4 lg:max-h-[calc(100vh-14rem)] lg:overflow-y-auto pr-2 custom-scrollbar">
                <nav className="flex flex-col space-y-4">
                   {dynamicServiceTree.map((cat) => {
                      const isActive = activeCategory === cat.id;
                      const hasSubCats = cat.subCategories && cat.subCategories.length > 0;

                      return (
                        <div key={cat.id} className="flex flex-col">
                           <button
                              onClick={() => handleCategoryClick(cat.id)}
                              className={`text-left px-8 py-6 rounded-2xl text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 relative border overflow-hidden group w-full ${
                                 isActive 
                                  ? 'bg-gold text-white dark:text-black border-gold shadow-[0_0_20px_rgb(var(--color-gold)/0.5)] z-20' 
                                  : 'bg-white/40 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:border-gold/50 z-10'
                              }`}
                           >
                              <span className="relative z-10 flex justify-between items-center">
                                {cat.label}
                                {hasSubCats && (
                                  <ChevronDown size={16} className={`transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                                )}
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                           </button>

                           <div 
                             className={`overflow-hidden transition-all duration-500 ease-in-out origin-top ${isActive && hasSubCats ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                           >
                             {cat.subCategories && (
                               <div className="bg-white/30 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl p-2 mx-2 flex flex-col gap-1">
                                  {cat.subCategories.map((sub) => (
                                    <button
                                      key={sub.id}
                                      onClick={() => { 
                                        setActiveSubCategory(sub.id); 
                                        setExpandedProcedure(null); 
                                        scrollToContent();
                                      }}
                                      className={`w-full text-left px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-between ${
                                        activeSubCategory === sub.id
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg'
                                        : 'text-slate-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                                      }`}
                                    >
                                      {sub.label}
                                      {activeSubCategory === sub.id && <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>}
                                    </button>
                                  ))}
                               </div>
                             )}
                           </div>
                        </div>
                      );
                   })}

                    <button
                        onClick={() => handleCategoryClick('all')}
                        className={`text-left px-8 py-6 rounded-2xl text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 relative border overflow-hidden group w-full ${
                            activeCategory === 'all'
                            ? 'bg-gold text-white dark:text-black border-gold shadow-[0_0_20px_rgb(var(--color-gold)/0.5)] z-20' 
                            : 'bg-white/40 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:border-gold/50 z-10'
                        }`}
                    >
                        <span className="relative z-10 flex justify-between items-center">
                            {t.all}
                            <Layers size={16} className={`transition-transform duration-300 ${activeCategory === 'all' ? 'text-black dark:text-black' : 'text-slate-400'}`} />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </button>
                </nav>
             </div>

             <div ref={contentRef} className="w-full lg:w-3/4">
                 <style>{`
                   @keyframes slideUpFade {
                     0% { opacity: 0; transform: translateY(30px); filter: blur(5px); }
                     100% { opacity: 1; transform: translateY(0); filter: blur(0); }
                   }
                 `}</style>
                 
                 <div 
                    key={`${activeCategory}-${activeSubCategory}`} 
                    className="space-y-6 animate-[slideUpFade_1s_cubic-bezier(0.25,1,0.5,1)_forwards]"
                 >
                     {displayItems.length > 0 ? (
                        displayItems.map((procedure, index) => {
                        const isExpanded = expandedProcedure === procedure.name;
                        return (
                        <div 
                            key={index}
                            className={`group bg-white/40 dark:bg-white/5 border p-8 rounded-3xl transition-all duration-500 relative overflow-hidden backdrop-blur-sm ${isExpanded ? 'border-gold shadow-[0_0_30px_rgb(var(--color-gold)/0.1)] bg-white/80 dark:bg-white/10' : 'border-black/5 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 cursor-pointer'}`}
                            onClick={() => !isExpanded && toggleProcedure(procedure.name)}
                        >
                            <div className={`absolute top-0 left-0 w-1 h-full bg-gold transition-transform duration-300 ${isExpanded ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`}></div>
                            
                            <div className="flex flex-col gap-6">
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <Sparkles size={16} className={`text-gold transition-opacity ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                                            <h3 className={`text-2xl font-serif transition-colors ${isExpanded ? 'text-gold-dim dark:text-gold' : 'text-slate-900 dark:text-white group-hover:text-gold-dim dark:group-hover:text-gold'}`}>
                                                {procedure.name}
                                            </h3>
                                        </div>
                                        <p className="text-slate-600 dark:text-gray-400 font-light max-w-2xl text-lg leading-relaxed">
                                            {procedure.description}
                                        </p>
                                    </div>
                                    <Button 
                                        variant="outline" 
                                        className={`shrink-0 rounded-full w-12 h-12 flex items-center justify-center p-0 border-opacity-20 ${isExpanded ? 'bg-gold text-white dark:text-black border-gold' : ''}`}
                                        onClick={(e) => { e.stopPropagation(); toggleProcedure(procedure.name); }}
                                    >
                                        <ChevronDown size={20} className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
                                    </Button>
                                </div>

                                <div 
                                    className={`overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black/5 dark:border-white/5 pt-8 mt-2">
                                        
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-4 flex items-center gap-2">
                                                <Check size={14} className="text-gold" /> {t.benefits}
                                            </h4>
                                            <ul className="space-y-3">
                                                {procedure.benefits.map((benefit, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-gray-300 text-sm">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0"></span>
                                                        {benefit}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="flex flex-col">
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500 mb-4 flex items-center gap-2">
                                                <Clock size={14} className="text-gold" /> {t.recovery}
                                            </h4>
                                            <p className="text-slate-700 dark:text-gray-300 text-sm leading-relaxed bg-white/50 dark:bg-white/5 p-4 rounded-xl border border-black/5 dark:border-white/5 mb-6">
                                                {procedure.recovery}
                                            </p>
                                            
                                            <div className="mt-auto flex flex-col xl:flex-row gap-4">
                                                <Button 
                                                    variant="outline"
                                                    onClick={(e) => { e.stopPropagation(); onNavigate('service-details', procedure); }}
                                                    className="flex-1 py-3 text-xs justify-center"
                                                >
                                                    {t.results}
                                                </Button>
                                                <Button 
                                                    variant="gold"
                                                    onClick={(e) => { e.stopPropagation(); window.location.href='#contact'; }}
                                                    className="flex-1 py-3 text-xs justify-center"
                                                >
                                                    {t.book}
                                                </Button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        );
                        })
                     ) : (
                        <div className="text-center py-20 text-slate-500 dark:text-gray-400">
                            {t.empty}
                        </div>
                     )}
                 </div>
             </div>
          </div>
          
          {mounted && createPortal(
            <button
                onClick={scrollToFilters}
                className={`fixed bottom-8 right-8 z-[9999] w-14 h-14 bg-gold rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-white/20 text-slate-900 transition-all duration-500 lg:hidden ${showFilterFab ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0 pointer-events-none'}`}
                aria-label="Back to filters"
            >
               <Filter size={24} strokeWidth={2.5} />
            </button>,
            document.body
          )}

       </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].faq;
  const faqData = getFaqData(language);

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItem, setOpenItem] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  const categories = [
    { id: 'all', label: t.categories.all },
    { id: 'general', label: t.categories.general },
    { id: 'face', label: t.categories.face },
    { id: 'breast', label: t.categories.breast },
    { id: 'body', label: t.categories.body },
    { id: 'non-invasive', label: t.categories.non_invasive },
  ];

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-52 pb-20 bg-slate-50 dark:bg-dark min-h-screen text-slate-900 dark:text-white transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <SectionTitle 
          title={t.title}
          subtitle={t.subtitle}
        />

        {/* Search Bar */}
        <div className="relative mb-12">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-slate-400 dark:text-gray-500" size={20} />
            </div>
            <input 
                type="text"
                placeholder={t.search_placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 shadow-sm"
            />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'bg-gold text-black border-gold shadow-[0_0_15px_rgb(var(--color-gold)/0.4)]'
                  : 'bg-transparent text-slate-500 dark:text-gray-400 border-black/5 dark:border-white/10 hover:border-gold hover:text-gold-dim dark:hover:text-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
                filteredFaqs.map((item) => (
                    <div 
                        key={item.id}
                        className={`bg-white dark:bg-white/5 border rounded-2xl overflow-hidden transition-all duration-300 ${openItem === item.id ? 'border-gold shadow-[0_0_20px_rgb(var(--color-gold)/0.1)]' : 'border-black/5 dark:border-white/10 hover:border-gold/30'}`}
                    >
                        <button
                            onClick={() => toggleItem(item.id)}
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                        >
                            <span className={`font-serif text-lg md:text-xl pr-8 transition-colors ${openItem === item.id ? 'text-gold-dim dark:text-gold' : 'text-slate-900 dark:text-white'}`}>
                                {item.question}
                            </span>
                            <span className={`shrink-0 transition-transform duration-300 text-gold ${openItem === item.id ? 'rotate-180' : ''}`}>
                                {openItem === item.id ? <Minus size={20} /> : <Plus size={20} />}
                            </span>
                        </button>
                        
                        <div 
                            className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${openItem === item.id ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="pt-2 border-t border-black/5 dark:border-white/5">
                                <p className="text-slate-600 dark:text-gray-400 font-light leading-relaxed mt-4">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-20 opacity-50">
                    <p>{t.no_results} "{searchQuery}"</p>
                </div>
            )}
        </div>

        <div className="mt-20 text-center">
            <p className="mb-6 text-slate-500 dark:text-gray-400">{t.not_found_title}</p>
            <Button onClick={() => window.location.href='#contact'} variant="outline" className="rounded-full">
                {t.contact_us} <ArrowRight size={16} />
            </Button>
        </div>

      </div>
    </div>
  );
};

interface DoctorBioProps {
  onBack: () => void;
}

const DoctorBio: React.FC<DoctorBioProps> = ({ onBack }) => {
  const { language } = useLanguage();
  const t = translations[language].doctorBio;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark transition-colors duration-500 pt-52 pb-20 relative">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Navigation */}
        <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest mb-12 hover:-translate-x-2 transition-transform"
        >
            <ArrowLeft size={16} /> {t.back}
        </button>

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-end">
            <div>
                <h1 className="text-5xl md:text-7xl font-serif text-slate-900 dark:text-white leading-[0.9] mb-6">
                    {t.title} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dim to-gold">{t.surname}</span>
                </h1>
                <div className="flex flex-wrap gap-4 items-center">
                    <span className="px-4 py-2 border border-black/10 dark:border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-gray-400">MD</span>
                    <span className="px-4 py-2 border border-black/10 dark:border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-gray-400">MRCS</span>
                    <span className="px-4 py-2 border border-black/10 dark:border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 border-gold/20">FEBOPRAS</span>
                </div>
            </div>
            <div className="text-right hidden lg:block">
                <p className="text-slate-500 dark:text-gray-500 text-sm font-light italic max-w-md ml-auto border-r-2 border-gold pr-6">
                    {t.quote}
                </p>
            </div>
        </div>

        {/* Main Image & Intro */}
        <div className="relative mb-12 md:mb-24 group">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-[2rem] shadow-2xl relative">
                <img 
                    src="https://kbenetatos.gr/wp-content/uploads/CV-s1-p1-768x555.jpg" 
                    alt="Dr. Konstantinos Benetatos" 
                    className="w-full h-full object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-1000"
                />
                
                {/* Desktop Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent hidden md:block"></div>
                <div className="absolute bottom-12 left-12 max-w-2xl hidden md:block">
                    <div className="w-20 h-1 bg-gold mb-6"></div>
                    <p className="text-white font-serif text-2xl leading-relaxed opacity-90">
                        {t.intro_title}
                    </p>
                </div>
            </div>

            {/* Mobile Text Below Image */}
            <div className="block md:hidden mt-8 px-2">
                 <div className="w-20 h-1 bg-gold mb-6"></div>
                 <p className="text-slate-900 dark:text-white font-serif text-2xl leading-relaxed">
                    {t.intro_title}
                 </p>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-2xl z-[-1]"></div>
        </div>

        {/* Bio Content - Two Column Editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Timeline / Stats */}
            <div className="lg:col-span-4 relative">
                <div className="sticky top-48 space-y-8 h-fit">
                    <div className="p-8 bg-white dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/10 shadow-lg dark:shadow-none">
                        <Award className="text-gold w-8 h-8 mb-4" />
                        <h3 className="text-lg font-serif text-slate-900 dark:text-white mb-2">{t.edu_title}</h3>
                        <p className="text-sm text-slate-500 dark:text-gray-400">{t.edu_desc}</p>
                    </div>
                    <div className="p-8 bg-white dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/10 shadow-lg dark:shadow-none">
                        <Globe className="text-gold w-8 h-8 mb-4" />
                        <h3 className="text-lg font-serif text-slate-900 dark:text-white mb-2">{t.exp_title}</h3>
                        <p className="text-sm text-slate-500 dark:text-gray-400">{t.exp_desc}</p>
                    </div>
                    <div className="p-8 bg-white dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/10 shadow-lg dark:shadow-none">
                        <BookOpen className="text-gold w-8 h-8 mb-4" />
                        <h3 className="text-lg font-serif text-slate-900 dark:text-white mb-2">{t.spec_title}</h3>
                        <p className="text-sm text-slate-500 dark:text-gray-400">{t.spec_desc}</p>
                    </div>
                </div>
            </div>

            {/* Right Column: The Text */}
            <div className="lg:col-span-8 prose prose-lg dark:prose-invert max-w-none">
                <div className="space-y-12 text-slate-600 dark:text-gray-300 font-light leading-loose text-lg text-justify">
                    
                    {/* Render paragraphs dynamically */}
                    {t.bio_paragraphs.map((paragraph, index) => {
                       // First paragraph with big letter styling
                       if (index === 0) {
                           return (
                               <div key={index} className="relative pl-0 md:pl-8 border-l-0 md:border-l border-gold/30">
                                   <p>
                                       <span className="float-left text-7xl font-serif text-gold leading-[0.8] mr-4 mt-2">{t.title.charAt(0)}</span>
                                       {paragraph}
                                   </p>
                               </div>
                           );
                       }
                       // Middle paragraph quote highlight
                       if (index === 3) { // Approximate position for the quote
                           return (
                               <React.Fragment key={index}>
                                   <div className="bg-slate-100 dark:bg-white/5 p-8 rounded-2xl border-l-4 border-gold my-8 italic text-slate-700 dark:text-gray-200">
                                        {t.highlight}
                                   </div>
                                   <p>{paragraph}</p>
                               </React.Fragment>
                           );
                       }
                       
                       return <p key={index}>{paragraph}</p>;
                    })}

                    {/* Footer CTA */}
                    <div className="mt-16 pt-16 border-t border-black/10 dark:border-white/10 flex flex-col items-center justify-center text-center">
                        <p className="text-slate-500 dark:text-gray-500 mb-8 max-w-xl">
                            {t.cta_trust}
                        </p>
                        <Button onClick={() => window.location.href='#contact'} variant="gold">
                            {translations[language].nav.book}
                        </Button>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

interface ServiceDetailsProps {
  data: ProcedureDetail;
  onBack: () => void;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ data, onBack }) => {
  const [viewMode, setViewMode] = useState<'before' | 'after'>('before');
  const { language } = useLanguage();
  const t = translations[language].serviceDetails;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  const hasImages = data.images && data.images.length > 0;
  const currentImageSet = hasImages ? data.images![0] : null;
  const stepIcons = [Activity, Sparkles, Shield, Heart];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark text-slate-900 dark:text-white transition-colors duration-500 pt-52 pb-20 relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32 relative z-10">
        
        <div className="flex justify-center lg:justify-start mb-12">
            <button 
                onClick={onBack}
                className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest py-4 px-8 lg:pl-0 lg:pr-8 hover:-translate-x-2 transition-transform cursor-pointer"
            >
                <ArrowLeft size={16} /> {t.back}
            </button>
        </div>

        <div className="flex flex-col items-center mb-20">
             <h2 className="text-3xl md:text-5xl font-serif text-center mb-8 text-slate-900 dark:text-white">
                {t.results_title}
             </h2>

             {hasImages && currentImageSet ? (
                <div className="w-full max-w-4xl">
                    <div className="aspect-[4/3] md:aspect-[16/9] w-full rounded-[2rem] overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 relative group bg-white dark:bg-dark-lighter">
                         <img 
                            src={viewMode === 'before' ? currentImageSet.before : currentImageSet.after} 
                            alt={`${data.name} ${viewMode}`}
                            className="w-full h-full object-cover transition-all duration-500 transform"
                            key={viewMode}
                         />
                         <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">
                            {viewMode === 'before' ? t.before_badge : t.after_badge}
                         </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <div className="bg-slate-200 dark:bg-white/10 p-1 rounded-full flex relative">
                            <div 
                                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-gold rounded-full shadow-md transition-all duration-300 ease-out ${viewMode === 'before' ? 'left-1' : 'left-[calc(50%+2px)]'}`}
                            ></div>
                            
                            <button 
                                onClick={() => setViewMode('before')}
                                className={`relative z-10 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 w-32 text-center ${viewMode === 'before' ? 'text-slate-900 dark:text-black' : 'text-slate-500 dark:text-white/50'}`}
                            >
                                {t.before}
                            </button>
                            <button 
                                onClick={() => setViewMode('after')}
                                className={`relative z-10 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 w-32 text-center ${viewMode === 'after' ? 'text-slate-900 dark:text-black' : 'text-slate-500 dark:text-white/50'}`}
                            >
                                {t.after}
                            </button>
                        </div>
                    </div>
                </div>
             ) : (
                <div className="w-full max-w-4xl h-[400px] bg-slate-100 dark:bg-white/5 rounded-[2rem] flex flex-col items-center justify-center text-center p-8 border border-dashed border-black/10 dark:border-white/10">
                    <Sparkles className="w-12 h-12 text-gold opacity-50 mb-4" />
                    <p className="text-slate-500 dark:text-gray-500">{t.no_images}</p>
                </div>
             )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
            <div className="lg:col-span-7">
                <span className="text-gold-dim dark:text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">{t.process_title}</span>
                <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-8 text-slate-900 dark:text-white">
                    {data.name}
                </h1>

                {data.steps && data.steps.length > 0 && (
                    <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {data.steps.map((step, idx) => {
                            const Icon = stepIcons[idx % stepIcons.length];
                            return (
                            <div key={idx} className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-gold/30 transition-colors">
                            <div className="absolute -right-4 -top-4 text-9xl font-serif text-slate-100 dark:text-white/5 pointer-events-none select-none group-hover:text-gold/5 transition-colors">
                                {idx + 1}
                            </div>
                            <div className="relative z-10">
                                <Icon className="w-6 h-6 text-gold mb-4" />
                                <h4 className="font-bold text-sm uppercase tracking-wide mb-2 text-slate-900 dark:text-white">{step.title}</h4>
                                <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">{step.description}</p>
                            </div>
                            </div>
                        )})}
                    </div>
                    </div>
                )}

                <div className="relative pl-6 border-l-2 border-gold/30">
                    <p className="text-lg md:text-xl font-light text-slate-600 dark:text-gray-300 leading-relaxed mb-4 text-justify">
                        {data.description}
                    </p>
                </div>
            </div>

            <div className="lg:col-span-5">
                 <div className="sticky top-48 space-y-6">
                     <span className="text-gold-dim dark:text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2 block">{t.expectations}</span>
                     
                     <div className="bg-white/50 dark:bg-white/5 p-8 rounded-3xl border border-black/5 dark:border-white/10">
                        <h3 className="text-lg font-serif mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                            <Sparkles className="text-gold" size={20} /> {translations[language].servicesPage.benefits}
                        </h3>
                        <ul className="flex flex-col gap-4">
                            {data.benefits.map((benefit, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check size={10} className="text-gold" />
                                    </span>
                                    <span className="text-slate-700 dark:text-gray-300 text-sm">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white/50 dark:bg-white/5 p-8 rounded-3xl border border-black/5 dark:border-white/10">
                        <h3 className="text-lg font-serif mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                            <AlertTriangle className="text-gold" size={20} /> {t.complications}
                        </h3>
                        <p className="text-slate-700 dark:text-gray-300 leading-relaxed text-sm text-justify">
                            {data.complications || 'Information provided during consultation.'}
                        </p>
                    </div>

                    <div className="bg-white/50 dark:bg-white/5 p-8 rounded-3xl border border-black/5 dark:border-white/10">
                        <h3 className="text-lg font-serif mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                            <Clock className="text-gold" size={20} /> {translations[language].servicesPage.recovery}
                        </h3>
                        <p className="text-slate-700 dark:text-gray-300 leading-relaxed text-sm">
                            {data.recovery}
                        </p>
                    </div>
                 </div>
            </div>
        </div>

        <div className="bg-slate-900 dark:bg-white/5 p-12 rounded-[3rem] text-center border border-black/5 dark:border-white/10 relative overflow-hidden mb-12">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
            <h3 className="text-3xl font-serif text-white mb-4">{t.interested}</h3>
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">{t.interested_desc}</p>
            <div className="flex justify-center">
                <Button variant="gold" className="min-w-[200px] justify-center" onClick={() => window.location.href='#contact'}>
                    {translations[language].nav.book}
                </Button>
            </div>
        </div>

        <div className="flex justify-center pb-8">
            <button 
                onClick={onBack}
                className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest py-4 px-8 hover:-translate-x-2 transition-transform cursor-pointer"
            >
                <ArrowLeft size={16} /> {t.back}
            </button>
        </div>

      </div>
    </div>
  );
};

interface BlogProps {
    onNavigate: (view: 'blog-post', post: BlogPost) => void;
}

const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
    const { language } = useLanguage();
    const t = translations[language].blog;
    const posts = getBlogPosts(language);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-52 pb-20 bg-slate-50 dark:bg-dark min-h-screen text-slate-900 dark:text-white transition-colors duration-500 relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
            <div className="absolute top-0 right-0 w-1/3 h-screen bg-gradient-to-l from-gold/5 to-transparent pointer-events-none"></div>

            <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32 relative z-10">
                <SectionTitle title={t.title} subtitle={t.subtitle} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {posts.map((post) => (
                        <div 
                            key={post.id}
                            className="group flex flex-col h-full bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden hover:border-gold/50 hover:shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_40px_rgb(var(--color-gold)/0.1)] transition-all duration-500 cursor-pointer"
                            onClick={() => onNavigate('blog-post', post)}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={post.image} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-gold text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/10">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-gray-400 mb-4">
                                    <span className="flex items-center gap-1"><Calendar size={12} className="text-gold" /> {post.date}</span>
                                    <span className="flex items-center gap-1"><User size={12} className="text-gold" /> {post.readTime}</span>
                                </div>

                                <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-4 group-hover:text-gold-dim dark:group-hover:text-gold transition-colors leading-tight">
                                    {post.title}
                                </h3>

                                <p className="text-slate-600 dark:text-gray-400 text-sm font-light leading-relaxed mb-8 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white group-hover:text-gold transition-colors">
                                        {t.read_more}
                                    </span>
                                    <div className="w-8 h-8 rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:text-black transition-all">
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface BlogPostProps {
    post: BlogPost;
    onBack: () => void;
}

const BlogPostView: React.FC<BlogPostProps> = ({ post, onBack }) => {
    const { language } = useLanguage();
    const t = translations[language].blog;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [post]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-dark text-slate-900 dark:text-white transition-colors duration-500 pt-52 pb-20 relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
            
            <div className="fixed top-0 left-0 w-full h-1 z-50 bg-white/10">
                 <div className="h-full bg-gold w-full origin-left animate-[scaleX_1s_ease-out]"></div>
            </div>

            <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32 relative z-10">
                
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest mb-12 hover:-translate-x-2 transition-transform cursor-pointer"
                >
                    <ArrowLeft size={16} /> {t.back}
                </button>

                <div className="max-w-4xl mx-auto mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="px-3 py-1 bg-gold/10 text-gold-dim dark:text-gold border border-gold/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
                            {post.category}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                            {post.date} • {post.readTime}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-serif text-slate-900 dark:text-white leading-tight mb-8">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                             <img 
                                src="https://kbenetatos.gr/wp-content/uploads/CV-s1-p1-768x555.jpg" 
                                alt={post.author}
                                className="w-full h-full object-cover"
                             />
                        </div>
                        <div>
                            <span className="block text-sm font-bold text-slate-900 dark:text-white">{post.author}</span>
                            <span className="text-xs text-slate-500 dark:text-gray-400">Plastic Surgeon</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto mb-20">
                    <div className="aspect-[21/9] w-full rounded-[2rem] overflow-hidden shadow-2xl relative">
                        <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    <div className="hidden lg:block lg:col-span-2">
                        <div className="sticky top-48">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 block">{t.share}</span>
                            <div className="flex flex-col gap-4">
                                <button className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white hover:bg-gold hover:border-gold hover:text-black transition-all">
                                    <Facebook size={16} />
                                </button>
                                <button className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white hover:bg-gold hover:border-gold hover:text-black transition-all">
                                    <Twitter size={16} />
                                </button>
                                <button className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white hover:bg-gold hover:border-gold hover:text-black transition-all">
                                    <Linkedin size={16} />
                                </button>
                                <button className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white hover:bg-gold hover:border-gold hover:text-black transition-all">
                                    <Share2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            {post.content.map((paragraph, idx) => {
                                if (idx === 0) {
                                    return (
                                        <p key={idx} className="text-xl md:text-2xl font-serif leading-relaxed text-slate-800 dark:text-gray-200 mb-8 first-letter:text-5xl first-letter:font-serif first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
                                            {paragraph}
                                        </p>
                                    );
                                }
                                return (
                                    <p key={idx} className="text-lg font-light leading-loose text-slate-600 dark:text-gray-300 mb-6 text-justify">
                                        {paragraph}
                                    </p>
                                )
                            })}
                        </div>
                        
                        <div className="mt-16 pt-16 border-t border-black/10 dark:border-white/10">
                            <div className="bg-slate-100 dark:bg-white/5 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                                <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-gold">
                                    <img src="https://kbenetatos.gr/wp-content/uploads/CV-s1-p1-768x555.jpg" alt="Author" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif text-slate-900 dark:text-white mb-2">{post.author}</h3>
                                    <p className="text-sm text-slate-500 dark:text-gray-400 mb-4 max-w-lg">
                                        Εξειδικευμένος Πλαστικός Χειρουργός με πολυετή εμπειρία στην επανορθωτική και αισθητική χειρουργική.
                                    </p>
                                    <Button variant="outline" onClick={() => window.location.href='#contact'} className="py-2 px-6 text-xs">
                                        {translations[language].nav.book}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block lg:col-span-2"></div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP CONTENT ---

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'services' | 'faq' | 'doctor-bio' | 'service-details' | 'blog' | 'blog-post'>('home');
  const [selectedService, setSelectedService] = useState<ProcedureDetail | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [isDark, setIsDark] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  useEffect(() => {
      if (selectedService) {
          const tree = getServiceTree(language);
          const findService = (id: string): ProcedureDetail | undefined => {
              for (const cat of tree) {
                  if (cat.items) {
                      const found = cat.items.find(i => i.id === id);
                      if (found) return found;
                  }
                  if (cat.subCategories) {
                      for (const sub of cat.subCategories) {
                          const found = sub.items.find(i => i.id === id);
                          if (found) return found;
                      }
                  }
              }
              return undefined;
          };
          const updatedService = findService(selectedService.id);
          if (updatedService) {
              setSelectedService(updatedService);
          }
      }
  }, [language]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleNavigate = (view: 'home' | 'services' | 'faq' | 'doctor-bio' | 'service-details' | 'blog' | 'blog-post', data?: any) => {
    if (view === 'service-details' && data) {
        setSelectedService(data);
        setCurrentView('service-details');
        window.scrollTo(0, 0);
    } else if (view === 'blog-post' && data) {
        setSelectedPost(data);
        setCurrentView('blog-post');
        window.scrollTo(0, 0);
    } else if (view === 'services') {
        setCurrentView('services');
        window.scrollTo(0, 0);
        
        const validCategories = ['face', 'body', 'breast', 'non-invasive', 'reconstructive', 'skin', 'combined', 'men'];

        if (typeof data === 'string' && validCategories.includes(data)) {
             setSelectedCategory(data as ServiceCategory);
        } else {
             setSelectedCategory(null);
        }
    } else {
        setCurrentView(view);
        if (typeof data === 'string' && view === 'home') {
             setTimeout(() => {
                const element = document.getElementById(data);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
             }, 10);
        } else {
            window.scrollTo(0, 0);
        }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark font-sans text-slate-900 dark:text-white transition-colors duration-500">
        <CustomCursor />
        <NavigationBar currentView={currentView} onNavigate={handleNavigate} toggleTheme={toggleTheme} isDark={isDark} />
        
        <main>
          {currentView === 'home' && (
            <div key="home" className="animate-page-enter">
              <Hero onNavigate={handleNavigate} />
              <About />
              <Doctor onNavigate={handleNavigate} />
              <Distinctions />
              <Services onNavigate={handleNavigate} />
              <Testimonials />
              <Contact />
            </div>
          )}

          {currentView === 'services' && (
             <div key="services" className="animate-page-enter">
               <ServicesPage onNavigate={handleNavigate} initialCategory={selectedCategory} />
               <Contact />
             </div>
          )}

          {currentView === 'service-details' && selectedService && (
              <div key={`service-details-${selectedService.id}`} className="animate-page-enter">
                  <ServiceDetails data={selectedService} onBack={() => handleNavigate('services')} />
                  <Contact />
              </div>
          )}

          {currentView === 'faq' && (
             <div key="faq" className="animate-page-enter">
               <FAQ />
               <Contact />
             </div>
          )}

          {currentView === 'doctor-bio' && (
             <div key="doctor-bio" className="animate-page-enter">
               <DoctorBio onBack={() => handleNavigate('home', 'doctor')} />
               <Contact />
             </div>
          )}

          {currentView === 'blog' && (
              <div key="blog" className="animate-page-enter">
                  <Blog onNavigate={handleNavigate} />
                  <Contact />
              </div>
          )}

          {currentView === 'blog-post' && selectedPost && (
              <div key={`post-${selectedPost.id}`} className="animate-page-enter">
                  <BlogPostView post={selectedPost} onBack={() => handleNavigate('blog')} />
                  <Contact />
              </div>
          )}
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;