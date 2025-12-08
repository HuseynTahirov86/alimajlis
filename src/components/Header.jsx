import React from "react";

const Header = () => {
  return (
    <header className="bg-slate-950/90 border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-7 flex flex-col items-center">
        <img
          src="/ali-meclis-logo.png"
          alt="Naxçıvan Muxtar Respublikasının Ali Məclisi"
          className="w-40 md:w-52 mb-3 drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
        />
        <p className="text-[0.7rem] md:text-xs font-semibold uppercase tracking-[0.28em] text-slate-300 text-center">
          Naxçıvan Muxtar Respublikasının Ali Məclisi
        </p>
        <p className="text-sm md:text-lg font-semibold text-slate-50 text-center">
          Deputat Poster Generatoru
        </p>
      </div>
    </header>
  );
};

export default Header;
