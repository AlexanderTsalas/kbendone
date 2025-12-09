import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
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
import { ProcedureDetail, ServiceCategory, BlogPost } from './types';
import { LanguageProvider } from './components/LanguageContext';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'services' | 'faq' | 'doctor-bio' | 'service-details' | 'blog' | 'blog-post'>('home');
  const [selectedService, setSelectedService] = useState<ProcedureDetail | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [isDark, setIsDark] = useState(true);

  // Toggle Body Class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

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
        
        // Define valid categories to prevent routing hashes from being treated as categories
        const validCategories = ['face', 'body', 'breast', 'non-invasive', 'reconstructive', 'skin', 'combined', 'men'];

        // Check if data is a category ID
        if (typeof data === 'string' && validCategories.includes(data)) {
             setSelectedCategory(data as ServiceCategory);
        } else {
             // Default to null, which ServicesPage interprets as 'all'
             setSelectedCategory(null);
        }
    } else {
        setCurrentView(view);
        // If navigation provides a hash string in data (legacy behavior for simple nav)
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
    <div className="min-h-screen bg-slate-50 dark:bg-dark font-sans text-slate-900 dark:text-white transition-colors duration-500 selection:bg-gold selection:text-white">
        <Header currentView={currentView} onNavigate={handleNavigate} toggleTheme={toggleTheme} isDark={isDark} />
        
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