import React from 'react';
import { Quotes, Star } from '@phosphor-icons/react';

const Testimonials = () => {
  const reviews = [
    { text: "The silence here is as premium as the coffee. Truly a minimalist's dream.", author: "Arjun V.", rating: 5 },
    { text: "Modern, clean, and warm. It's the only place I can truly focus.", author: "Priya S.", rating: 5 },
    { text: "Every detail is considered. From the light to the latte art. Perfect.", author: "Ishaan K.", rating: 4 },
    { text: "A sanctuary for creators. The ambiance is meticulously curated.", author: "Ananya R.", rating: 5 },
    { text: "Best roast profiles in the city. The sensory experience is unparalleled.", author: "Rohan M.", rating: 5 },
    { text: "The minimalist design helps me breathe and focus on my craft.", author: "Meera G.", rating: 4 },
    { text: "An architectural masterpiece paired with a perfect espresso.", author: "Kabir D.", rating: 5 },
    { text: "The hospitality is as warm as their signature lattes.", author: "Zara H.", rating: 5 }
  ];

  // Double the reviews for seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-12 md:py-16 bg-off-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-heading mb-3">Guest Experiences</h2>
        <p className="text-mocha/60 max-w-2xl mx-auto uppercase tracking-widest text-[10px]">Stories from our minimalist community</p>
      </div>
      
      <div className="relative">
        <div className="marquee-container py-4">
          {duplicatedReviews.map((review, idx) => (
            <div 
              key={idx} 
              className="w-[320px] flex-shrink-0 px-6 border-r border-latte/10 text-center"
            >
              <div className="text-mocha/10 mb-4">
                <Quotes size={40} weight="fill" className="mx-auto" />
              </div>
              
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    weight={i < review.rating ? "fill" : "regular"} 
                    className={i < review.rating ? "text-caramel" : "text-latte/30"} 
                  />
                ))}
              </div>

              <p className="text-dark/80 text-lg font-heading italic leading-relaxed mb-4 h-20 flex items-center justify-center">
                "{review.text}"
              </p>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-latte">
                {review.author}
              </p>
            </div>
          ))}
        </div>
        
        {/* Gradient overlays for smooth fading at edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-off-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-off-white to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
};

export default Testimonials;
