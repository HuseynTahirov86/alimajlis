import React from "react";
import PosterGenerator from "./PosterGenerator";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0b1120] via-[#0e1a2f] to-[#0b1120]">
      
      <div className="flex-grow">
        <PosterGenerator />
      </div>

      <footer className="relative text-center text-[11px] text-slate-400/60 py-8">
        <div className="w-full max-w-5xl mx-auto border-t border-slate-700/30 pt-5">
          
          <p className="tracking-wide">
            Naxçıvan Muxtar Respublikasının Ali Məclisi — 2026
          </p>

          <p className="mt-2">
            Texniki icra:{" "}
            <a
              href="https://www.instagram.com/huseyntahirov_/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                bg-gradient-to-r 
                from-cyan-400 
                via-sky-400 
                to-blue-400 
                bg-clip-text 
                text-transparent 
                font-semibold 
                transition 
                duration-300 
                hover:brightness-125 
                hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]
              "
            >
              Hüseyn Tahirov
            </a>
          </p>

        </div>
      </footer>

    </div>
  );
}
