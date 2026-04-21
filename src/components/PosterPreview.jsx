import React from "react";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { Download, RefreshCw, Image as ImageIcon, Share2 } from "lucide-react";

const PosterPreview = ({ showPoster, canvasRef, onDownload, onReset, onShare }) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="max-w-4xl mx-auto w-full mt-8 md:mt-10"
    >
      <div className="relative rounded-3xl border border-blue-500/20 bg-slate-900/40 backdrop-blur-xl px-5 py-6 md:px-7 md:py-10 shadow-[0_26px_70px_rgba(15,23,42,0.98)] flex flex-col items-center justify-center min-h-[420px] overflow-hidden">
        
        {/* Background glow for preview section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          {!showPoster ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center space-y-4"
            >
              <div className="w-20 h-20 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-slate-500" />
              </div>
              <p className="text-slate-400 text-sm md:text-base text-center max-w-sm">
                Formu doldurduqdan sonra generasiya olunan poster burada görünəcək.
              </p>
            </motion.div>
          ) : (
            <motion.div 
              key="poster"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-8 w-full z-10"
            >
              <div className="w-full flex justify-center perspective-[1000px] relative rounded-xl">
                <Tilt 
                  tiltMaxAngleX={8} 
                  tiltMaxAngleY={8} 
                  perspective={1000} 
                  transitionSpeed={2000} 
                  scale={1.02}
                  gyroscope={true}
                  glareEnable={true}
                  glareMaxOpacity={0.4}
                  glareColor="#ffffff"
                  glarePosition="all"
                  glareBorderRadius="12px"
                  className="w-full max-w-[640px] rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(37,99,235,0.2)] overflow-hidden relative"
                >
                  <motion.div 
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "100%", opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                    className="absolute inset-0 z-50 pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  />
                  <canvas
                    ref={canvasRef}
                    className="w-full rounded-xl block relative z-10"
                  />
                </Tilt>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onDownload}
                  className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 transition-all font-semibold text-white shadow-[0_10px_25px_rgba(16,185,129,0.4)] w-full sm:w-auto text-sm md:text-base"
                >
                  <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                  Yüklə
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onShare}
                  className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all font-semibold text-white shadow-[0_10px_25px_rgba(37,99,235,0.4)] w-full sm:w-auto text-sm md:text-base"
                >
                  <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Paylaş
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onReset}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all font-semibold text-white shadow-lg w-full sm:w-auto text-sm md:text-base"
                >
                  <RefreshCw className="w-5 h-5" />
                  Yenidən
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default PosterPreview;
