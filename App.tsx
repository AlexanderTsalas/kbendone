import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { ServicesPage } from './components/ServicesPage';
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
import { ProcedureDetail, ServiceCategory, BlogPost } from './types';
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