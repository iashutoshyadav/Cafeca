import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-cream flex items-center justify-center overflow-hidden">
      <div className="text-center">
        <div className="font-heading text-4xl font-bold tracking-[0.5em] text-dark animate-pulse">CAFÉCA</div>
        <div className="mt-4 w-48 h-[1px] bg-latte/20 mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-mocha w-1/2 animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
