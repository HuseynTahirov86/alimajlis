import React from "react";
import PosterGenerator from "./PosterGenerator";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="flex-grow">
        <PosterGenerator />
      </div>

      <footer className="text-center text-xs text-slate-500 mb-6 tracking-wide">
        <p>Naxçıvan Muxtar Respublikasının Ali Məclisi — 2026</p>
        <p className="mt-1">
          Texniki icra:{" "}
          <a
            href="https://www.instagram.com/huseyntahirov_/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition"
          >
            Hüseyn Tahirov
          </a>
        </p>
      </footer>

    </div>
  );
}
