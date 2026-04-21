import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-slate-950/40 border-b border-white/10 backdrop-blur-xl relative z-20"
    >
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-7 flex flex-col items-center">
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          src="/ali-meclis-logo.png"
          alt="Naxçıvan Muxtar Respublikasının Ali Məclisi"
          className="w-40 md:w-52 mb-3 drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[0.7rem] md:text-xs font-semibold uppercase tracking-[0.28em] text-slate-300 text-center"
        >
          Naxçıvan Muxtar Respublikasının Ali Məclisi
        </motion.p>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm md:text-lg font-semibold bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent text-center"
        >
          Deputat Poster Generatoru
        </motion.p>
      </div>
    </motion.header>
  );
};

export default Header;
