import React from "react";
import { motion } from "framer-motion";
import { User, Map, MapPin, Users, Calendar, Clock, Sparkles } from "lucide-react";

const FormCard = ({
  formData,
  cities,
  districtsByCity,
  onChange,
  onSubmit,
  showPoster,
}) => {
  const availableDistricts = formData.city
    ? districtsByCity[formData.city] || []
    : [];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-3xl mx-auto w-full"
    >
      {/* Başlıq */}
      <div className="mb-6 text-center">
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-[0.7rem] font-medium text-blue-200 ring-1 ring-blue-500/40"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          Vətəndaş qəbulu posteri
        </motion.div>
        <motion.h1 variants={itemVariants} className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight text-slate-50">
          VƏTƏNDAŞ QƏBULU ÜÇÜN {" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">POSTER HAZIRLA</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="mt-2 text-sm md:text-base text-slate-300 max-w-3xl mx-auto">
          Ali Məclis deputatının qəbulu haqqında elanını hazırlamaq üçün sahələrə məlumatlarınızı daxil edin.
        </motion.p>
      </div>

      {/* Form kartı */}
      <motion.div 
        variants={itemVariants}
        className="relative rounded-3xl border border-white/10 bg-slate-900/60 shadow-[0_24px_70px_rgba(15,23,42,0.95)] backdrop-blur-xl px-5 py-6 md:px-7 md:py-7 overflow-hidden"
      >
        {/* Glow effect inside form card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        
        <div className="space-y-4 md:space-y-5 relative z-10">
          {/* Deputat adı */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Deputatın adı, soyadı
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                name="deputyName"
                value={formData.deputyName}
                onChange={onChange}
                className="w-full rounded-xl border border-slate-700/50 bg-slate-950/50 pl-11 pr-4 py-3 text-base text-slate-50 placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:bg-slate-900/80"
                placeholder="Məs: Əli Vəliyev"
              />
            </div>
          </div>

          {/* Rayon + Seçki dairəsi */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Rayon / şəhər */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Rayon / şəhər
              </label>
              <div className="relative">
                <Map className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                <select
                  name="city"
                  value={formData.city}
                  onChange={onChange}
                  className="w-full appearance-none rounded-xl border border-slate-700/50 bg-slate-950/50 pl-11 pr-4 py-3 text-base text-slate-50 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:bg-slate-900/80"
                >
                  <option value="">Seçin...</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seçki dairəsi */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Seçki dairəsi
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                <select
                  name="district"
                  value={formData.district}
                  onChange={onChange}
                  disabled={!formData.city}
                  className="w-full appearance-none rounded-xl border border-slate-700/50 bg-slate-950/50 pl-11 pr-4 py-3 text-base text-slate-50 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:bg-slate-900/80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {!formData.city && (
                    <option value="">Əvvəl rayon / şəhər seçin</option>
                  )}
                  {formData.city &&
                    availableDistricts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Seçicilər</label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                name="voters"
                value={formData.voters}
                onChange={onChange}
                placeholder="Məs: Cəhri qəsəbə"
                className="w-full rounded-xl border border-slate-700/50 bg-slate-950/50 pl-11 pr-4 py-3 text-base text-slate-50 placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:bg-slate-900/80"
              />
            </div>
          </div>

          {/* Ünvan */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Qəbul ünvanı
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={onChange}
                className="w-full rounded-xl border border-slate-700/50 bg-slate-950/50 pl-11 pr-4 py-3 text-base text-slate-50 placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:bg-slate-900/80"
                placeholder="Məs: Naxçıvan şəhəri, 52-ci məhəllə"
              />
            </div>
          </div>

          {/* Tarix + vaxt + növ */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Tarix
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={onChange}
                  className="w-full rounded-xl border border-slate-700/50 bg-slate-950/50 pl-11 pr-4 py-3 text-base text-slate-50 placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:bg-slate-900/80"
                  placeholder="15 DEKABR 2025"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Saat
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={onChange}
                  className="w-full rounded-xl border border-slate-700/50 bg-slate-950/50 pl-11 pr-4 py-3 text-base text-slate-50 placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:bg-slate-900/80"
                  placeholder="16:00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Qəbul forması
              </label>
              <div className="relative">
                <select
                  name="mode"
                  value={formData.mode}
                  onChange={onChange}
                  className="w-full appearance-none rounded-xl border border-slate-700/50 bg-slate-950/50 px-4 py-3 text-base text-slate-50 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 focus:bg-slate-900/80"
                >
                  <option value="Səyyar">Səyyar qəbul</option>
                  <option value="Əyani">Qəbul</option>
                </select>
              </div>
            </div>
          </div>

          {/* Düymə */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSubmit}
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 py-3.5 text-base font-semibold text-white shadow-[0_15px_30px_rgba(37,99,235,0.4)] transition-all hover:brightness-110"
          >
            <Sparkles className="w-5 h-5" />
            {showPoster ? "Posteri yenilə" : "Poster yarat"}
          </motion.button>

          <p className="pt-2 text-center text-[11px] text-slate-500">
            Daxil edilən məlumatlar yalnız posterin generasiyası üçün istifadə
            olunur.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default FormCard;
