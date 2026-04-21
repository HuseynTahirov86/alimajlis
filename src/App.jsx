import React from "react";
import PosterGenerator from "./PosterGenerator";
import { Toaster } from "sonner";
import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-950">
      {/* Animated Orbs Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 -right-20 h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
            x: [0, 50, 0],
            y: [0, 150, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-indigo-600/20 blur-[100px]"
        />
      </div>

      <Toaster theme="dark" position="top-center" richColors />

      <div className="flex-grow z-10 relative">
        <PosterGenerator />
      </div>

      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 text-center py-8 pb-12"
      >
        <div className="w-full max-w-5xl mx-auto border-t border-slate-800/60 pt-8 flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent rounded-full mb-2"></div>
          <p className="text-xs md:text-sm font-medium tracking-[0.15em] text-slate-400/90 uppercase">
            Naxçıvan Muxtar Respublikasının Ali Məclisi
          </p>
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-slate-600/80">
            © 2026
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
