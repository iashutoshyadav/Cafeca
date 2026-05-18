import React, { useEffect } from 'react';
import { ArrowLeft, InstagramLogo, PinterestLogo } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const GalleryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryItems = [
    { id: 1, img: '/images/gallery_interior_1.png', title: 'Main Sanctuary', category: 'Interior', span: 'md:col-span-2 md:row-span-2' },
    { id: 2, img: '/images/matcha_latte.png', title: 'Morning Matcha', category: 'Brew', span: '' },
    { id: 3, img: '/images/avocado_toast.png', title: 'Artisan Toast', category: 'Food', span: '' },
    { id: 4, img: '/images/gallery_detail_1.png', title: 'Quiet Corner', category: 'Atmosphere', span: '' },
    { id: 5, img: '/images/exterior_light.png', title: 'Street View', category: 'Exterior', span: 'md:col-span-2' },
    { id: 6, img: '/images/berry_tart.png', title: 'Seasonal Berry', category: 'Dessert', span: '' },
    { id: 7, img: '/images/coffee_light.png', title: 'Classic Brew', category: 'Coffee', span: '' },
    { id: 8, img: '/images/cappuccino_froth.png', title: 'Cloud Foam', category: 'Detail', span: '' },
    { id: 9, img: '/images/earl_grey_mist.png', title: 'Earl Grey Mist', category: 'Tea', span: 'md:col-span-2' },
    { id: 10, img: '/images/truffle_fries.png', title: 'Truffle Crisp', category: 'Snacks', span: '' },
    { id: 11, img: '/images/hero_light.png', title: 'The Vibe', category: 'Lifestyle', span: '' },
    { id: 12, img: '/images/dessert_light.png', title: 'Sweet Treat', category: 'Dessert', span: '' },
  ];

  return (
    <div className="min-h-screen bg-cream pt-32 pb-20 px-6 md:px-16 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-24 text-center relative">
          <Link to="/" className="absolute left-0 top-0 hidden md:flex items-center gap-2 text-mocha/40 hover:text-mocha transition-all uppercase tracking-widest text-[10px] font-bold group">
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Sanctuary
          </Link>
          <span className="uppercase tracking-[0.5em] text-[10px] font-bold text-latte mb-6 block">The Visual Story</span>
          <h1 className="text-5xl md:text-7xl font-heading mb-8">CAFÉCA Gallery</h1>
          <div className="w-16 h-[1px] bg-mocha/20 mx-auto mb-8"></div>
          <p className="text-mocha/60 max-w-2xl mx-auto font-light leading-relaxed">
            Every corner, every cup, and every moment at CAFÉCA is designed with intention. Explore our minimalist sanctuary through the lens.
          </p>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[300px]">
          {galleryItems.map((item, idx) => (
            <div 
              key={item.id} 
              className={`relative group overflow-hidden rounded-[3rem] shadow-soft hover:shadow-soft-lg transition-all duration-700 animate-fade-in-up ${item.span}`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <img 
                src={item.img} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt={item.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                <span className="text-[10px] uppercase tracking-widest text-cream/70 mb-2">{item.category}</span>
                <h3 className="text-2xl text-cream font-heading">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Social CTA */}
        <div className="mt-32 text-center p-20 bg-off-white rounded-[5rem] border border-latte/5">
          <h2 className="text-3xl font-heading mb-8">Share the Moment</h2>
          <p className="text-mocha/50 mb-12 font-light">Tag us in your moments for a chance to be featured in our seasonal lookbook.</p>
          <div className="flex justify-center gap-8">
            <a href="#" className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-mocha hover:text-dark transition-colors">
              <InstagramLogo size={24} /> Instagram
            </a>
            <a href="#" className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-mocha hover:text-dark transition-colors">
              <PinterestLogo size={24} /> Pinterest
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
