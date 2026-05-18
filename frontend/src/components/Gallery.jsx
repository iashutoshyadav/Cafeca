import React from 'react';
import { Link } from 'react-router-dom';

const Gallery = ({ isPreview = false }) => {
  const images = [
    { img: '/images/gallery_interior_1.png', span: 'h-80' },
    { img: '/images/matcha_latte.png', span: 'h-96' },
    { img: '/images/gallery_detail_1.png', span: 'h-72' },
    { img: '/images/exterior_light.png', span: 'h-96' },
    { img: '/images/avocado_toast.png', span: 'h-72' },
    { img: '/images/berry_tart.png', span: 'h-80' },
  ];

  // In preview mode, we only show first 3 images
  const displayedImages = isPreview ? images.slice(0, 3) : images;

  return (
    <section id="gallery" className={`section-spacing reveal ${isPreview ? 'bg-cream' : 'bg-off-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="uppercase tracking-[0.5em] text-[10px] font-bold text-latte mb-4 block">
              {isPreview ? 'Visual Glimpse' : 'Aesthetic Moments'}
            </span>
            <h2 className="text-3xl md:text-4xl mb-4">
              {isPreview ? 'Inside CAFÉCA' : 'The Full Story'}
            </h2>
            <p className="text-mocha/60 font-light leading-relaxed text-sm">
              {isPreview ? 'A snapshot of our minimalist sanctuary.' : 'A visual journey through the silence and details of CAFÉCA.'}
            </p>
          </div>
          <Link 
            to="/gallery" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-[0.3em] font-bold text-dark border-b border-dark pb-2 hover:text-mocha hover:border-mocha transition-all"
          >
            {isPreview ? 'Explore Full Gallery' : 'Follow Instagram'}
          </Link>
        </div>

        <div className={`columns-1 ${isPreview ? 'md:columns-3' : 'sm:columns-2 lg:columns-3'} gap-8 space-y-8`}>
          {displayedImages.map((item, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-[2.5rem] cursor-pointer break-inside-avoid reveal active" style={{ transitionDelay: `${idx * 100}ms` }}>
              <img 
                src={item.img} 
                loading="lazy"
                className={`w-full ${item.span} object-cover transition-all duration-1000 grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105`} 
                alt="Gallery"
              />
              <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                <span className="text-[10px] uppercase tracking-[0.4em] text-cream font-bold border border-cream/30 px-6 py-2 backdrop-blur-sm rounded-full">View Moment</span>
              </div>
            </div>
          ))}
        </div>

        {isPreview && (
          <div className="mt-20 text-center reveal">
            <Link 
              to="/gallery" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-premium btn-premium-outline min-w-[250px] tracking-widest uppercase text-xs"
            >
              See All Moments
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
