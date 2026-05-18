import React, { useState, useEffect, Suspense, lazy } from 'react';
import Preloader from './Preloader';
import Hero from './Hero';
import SignatureSpecials from './SignatureSpecials';
import Gallery from './Gallery'; // Re-importing for the preview

// Lazy loading sections to improve initial paint performance
const About = lazy(() => import('./About'));
const Experience = lazy(() => import('./Experience'));
const Testimonials = lazy(() => import('./Testimonials'));
const Contact = lazy(() => import('./Contact'));

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reduced artificial delay for better UX
    const timer = setTimeout(() => setIsLoading(false), 1500);
    
    const reveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 100;
        if (revealTop < windowHeight - revealPoint) {
          reveals[i].classList.add('active');
        }
      }
    };
    window.addEventListener('scroll', reveal);
    reveal();
    return () => {
      window.removeEventListener('scroll', reveal);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isLoading && <Preloader />}
      <Hero isLoading={isLoading} />
      
      {/* Featured Preview Sections on Home Page */}
      <SignatureSpecials isPreview={true} />
      
      <Suspense fallback={<div className="h-20 bg-cream" />}>
        <About />
        
        {/* Gallery Preview on Home Page */}
        <Gallery isPreview={true} />
        
        <Experience />
        <Testimonials />
        <Contact />
      </Suspense>
    </>
  );
};

export default Home;
