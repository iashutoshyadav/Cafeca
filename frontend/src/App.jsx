import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { List, X } from '@phosphor-icons/react';
import './index.css';
import AIChatbot from './components/AIChatbot';
import Home from './components/Home';
import MenuPage from './components/MenuPage';
import GalleryPage from './components/GalleryPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

import axios from 'axios';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Join');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('...');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      await axios.post(`${apiUrl}/newsletter`, { email });
      setStatus('Done!');
      setEmail('');
      setTimeout(() => setStatus('Join'), 3000);
    } catch (err) {
      setStatus('Error');
      setTimeout(() => setStatus('Join'), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input 
        type="email" 
        placeholder="Email" 
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="text-sm py-2 px-4" 
      />
      <button 
        type="submit"
        className="bg-mocha text-cream px-4 py-2 rounded-xl text-xs uppercase tracking-widest font-bold min-w-[70px] transition-all active:scale-95"
      >
        {status}
      </button>
    </form>
  );
};

function App() {
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-cream selection:bg-beige selection:text-mocha">
        {/* Navbar */}
        <nav className={`fixed top-0 left-0 w-full flex justify-between items-center z-50 transition-all duration-500 px-6 md:px-16 ${isNavScrolled ? 'py-4 glass-nav shadow-soft' : 'py-8 bg-transparent'}`}>
          <Link to="/" className="font-heading text-3xl font-bold text-dark tracking-widest">CAFÉCA</Link>
          
          <ul className={`
            ${isMobileMenuOpen 
              ? 'fixed inset-0 bg-cream flex flex-col justify-center items-center gap-12 z-[100] animate-fade-in' 
              : 'hidden md:flex md:flex-row gap-10 items-center'} 
            transition-all duration-500
          `}>
            {isMobileMenuOpen && (
              <button className="absolute top-8 right-8 text-mocha p-4" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={32} />
              </button>
            )}
            
            <li>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="font-body text-2xl md:text-sm font-medium text-mocha hover:text-dark transition-all duration-300 relative group uppercase tracking-widest">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-dark transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)} className="font-body text-2xl md:text-sm font-medium text-mocha hover:text-dark transition-all duration-300 relative group uppercase tracking-widest">
                Menu
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-dark transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="font-body text-2xl md:text-sm font-medium text-mocha hover:text-dark transition-all duration-300 relative group uppercase tracking-widest">
                Gallery
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-dark transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="font-body text-2xl md:text-sm font-medium text-mocha hover:text-dark transition-all duration-300 relative group uppercase tracking-widest">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-dark transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-body text-2xl md:text-sm font-medium text-mocha hover:text-dark transition-all duration-300 relative group uppercase tracking-widest"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-dark transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>

          <button className="md:hidden text-mocha p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <List size={28} />
          </button>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-off-white border-t border-latte/10 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-1">
                <Link to="/" className="font-heading text-3xl font-bold text-dark tracking-widest mb-6">CAFÉCA</Link>
                <p className="text-mocha/70 text-sm leading-relaxed max-w-xs">
                  Brewed for comfort, crafted for moments. Every cup tells a story at CAFÉCA.
                </p>
              </div>
              <div>
                <h4 className="font-heading text-lg mb-6">Timings</h4>
                <p className="text-mocha/70 text-sm mb-2">Mon - Fri: 7am - 9pm</p>
                <p className="text-mocha/70 text-sm">Sat - Sun: 8am - 10pm</p>
              </div>
              <div>
                <h4 className="font-heading text-lg mb-6">Location</h4>
                <p className="text-mocha/70 text-sm leading-relaxed">
                  Hauz Khas Village,<br />
                  South Delhi,<br />
                  New Delhi, 110016
                </p>
              </div>
              <div>
                <h4 className="font-heading text-lg mb-6">Newsletter</h4>
                <NewsletterForm />
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-latte/10 gap-4">
              <p className="text-mocha/50 text-xs tracking-widest uppercase">&copy; 2026 CAFÉCA. All rights reserved.</p>
              <div className="flex gap-6 text-mocha/50 text-xs tracking-widest uppercase">
                <a href="#" className="hover:text-dark transition-colors">Instagram</a>
                <a href="#" className="hover:text-dark transition-colors">Pinterest</a>
                <a href="#" className="hover:text-dark transition-colors">Twitter</a>
              </div>
            </div>
          </div>
        </footer>

        <AIChatbot />
      </div>
    </Router>
  );
}

export default App;
