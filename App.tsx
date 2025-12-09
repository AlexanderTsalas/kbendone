import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Sun, Moon, Globe, Sparkles, Check, Clock, ChevronDown, Layers, Filter } from 'lucide-react';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
// ServicesPage is now inlined
import { About } from './components/About';
import { Doctor } from './components/Doctor';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FAQ } from './components/FAQ';
import { DoctorBio } from './components/DoctorBio';
import { ServiceDetails } from './components/ServiceDetails';
import { Distinctions } from './components/Distinctions';
import { Blog } from './components/Blog';
import { BlogPostView } from './components/BlogPost';
import { CustomCursor } from './components/CustomCursor';
import { SectionTitle } from './components/SectionTitle';
import { Button } from './components/Button';
import { ProcedureDetail, ServiceCategory, BlogPost, CategoryData } from './types';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import { getServiceTree, translations } from './translations';

// --- INLINED NAVIGATION COMPONENT ---
type ViewType = 'home' | 'services' | 'faq' | 'doctor-bio' | 'blog' | 'service-details';

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

// --- INLINED SERVICES PAGE COMPONENT ---
// Inlined to prevent file resolution issues on Vercel
interface ServicesPageProps {
  onNavigate: (view: 'home' | 'services' | 'faq' | 'doctor-bio' | 'service-details', data?: any) => void;
  initialCategory?: ServiceCategory | null;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, initialCategory }) => {
  const { language } = useLanguage();
  const t = translations[language].servicesPage;
  
  // Memoize the service tree based on language to avoid re-renders
  const dynamicServiceTree = useMemo(() => getServiceTree(language), [language]);

  // Initialize 'all' as default
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [expandedProcedure, setExpandedProcedure] = useState<string | null>(null);
  const [showFilterFab, setShowFilterFab] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  // Force scroll to top on mount and set mounted
  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  // Handle initial category from navigation
  useEffect(() => {
    if (initialCategory) {
        setActiveCategory(initialCategory);
        // Find the category data to see if we need to open a sub-category
        const catData = dynamicServiceTree.find(c => c.id === initialCategory);
        if (catData && catData.subCategories && catData.subCategories.length > 0) {
            setActiveSubCategory(catData.subCategories[0].id);
        } else {
            setActiveSubCategory(null);
        }
    } else {
        // If no specific category is requested, default to all
        setActiveCategory('all');
        setActiveSubCategory(null);
        setExpandedProcedure(null);
    }
  }, [initialCategory, dynamicServiceTree]);

  // Intersection Observer for Floating Filter Button
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show button if filters are not intersecting and we have scrolled past them (top < 0)
        // We check top < 0 to ensure we are below the filters, not above them
        setShowFilterFab(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0, rootMargin: "-100px 0px 0px 0px" }
    );

    if (filtersRef.current) {
      observer.observe(filtersRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Determine what items to show
  const displayItems = React.useMemo(() => {
    if (activeCategory === 'all') {
        // Flatten all items from all categories and subcategories
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
    
    // If it has subcategories, use the activeSubCategory
    if (currentCategoryData.subCategories) {
      const sub = currentCategoryData.subCategories.find(s => s.id === activeSubCategory);
      return sub ? sub.items : [];
    }
    
    // Otherwise return direct items
    return currentCategoryData.items || [];
  }, [activeCategory, activeSubCategory, dynamicServiceTree]);

  const scrollToContent = () => {
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        if (contentRef.current) {
           const yOffset = -150; // Offset for header (increased)
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
    // If clicking "All"
    if (catId === 'all') {
        if (activeCategory === 'all') return;
        setActiveCategory('all');
        setActiveSubCategory(null);
        setExpandedProcedure(null);
        scrollToContent();
        return;
    }

    // Find category object
    const cat = dynamicServiceTree.find(c => c.id === catId);
    if (!cat) return;

    if (activeCategory === cat.id) {
        // Toggle off back to all
        setActiveCategory('all');
        setExpandedProcedure(null);
        setActiveSubCategory(null);
        return;
    }

    setActiveCategory(cat.id);
    setExpandedProcedure(null);
    
    // Check if the new category has subcategories
    const hasSubCategories = cat.subCategories && cat.subCategories.length > 0;
    
    if (hasSubCategories) {
      // If it has subcategories, select the first one by default but DO NOT scroll
      // This allows the user to see the sub-options
      setActiveSubCategory(cat.subCategories![0].id);
    } else {
      setActiveSubCategory(null);
      // If no subcategories, scroll to content immediately
      scrollToContent();
    }
  };

  const toggleProcedure = (name: string) => {
    setExpandedProcedure(expandedProcedure === name ? null : name);
  };

  return (
    <div className="pt-52 pb-20 bg-slate-50 dark:bg-dark min-h-screen text-slate-900 dark:text-white relative transition-colors duration-500">
       {/* Background glow */}
       <div className="fixed top-0 left-0 w-full h-screen bg-gradient-light dark:bg-gradient-dark z-0 pointer-events-none transition-colors duration-500"></div>

       <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32 relative z-10">
          
          <SectionTitle 
            title={t.title} 
            subtitle={t.subtitle}
            centered={false}
          />

          <div className="flex flex-col lg:flex-row gap-20 mt-8 lg:mt-16">
             
             {/* Sidebar Navigation */}
             <div ref={filtersRef} className="w-full lg:w-1/4 lg:sticky lg:top-48 lg:self-start space-y-4 lg:max-h-[calc(100vh-14rem)] lg:overflow-y-auto pr-2 custom-scrollbar">
                <nav className="flex flex-col space-y-4">
                   {dynamicServiceTree.map((cat) => {
                      const isActive = activeCategory === cat.id;
                      const hasSubCats = cat.subCategories && cat.subCategories.length > 0;

                      return (
                        <div key={cat.id} className="flex flex-col">
                           {/* Main Category Button */}
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
                              {/* Hover shimmer */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                           </button>

                           {/* Nested Sub-Categories (Dual Button Container) - Animated Expansion */}
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

                    {/* All Services Button - Last Option */}
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
                        {/* Hover shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </button>
                </nav>
             </div>

             {/* Content Area */}
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

                                {/* Expandable Content Wrapper */}
                                <div 
                                    className={`overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black/5 dark:border-white/5 pt-8 mt-2">
                                        
                                        {/* Benefits */}
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

                                        {/* Recovery */}
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
          
          {/* Mobile Filter FAB - Rendered via Portal to escape stacking contexts */}
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