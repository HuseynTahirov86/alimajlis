import React from "react";

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

  return (
    <section className="max-w-3xl mx-auto w-full">
      {/* Başlıq */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-[0.7rem] font-medium text-blue-200 ring-1 ring-blue-500/40">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          Vətəndaş qəbulu posteri
        </div>
        <h1 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight text-slate-50">
          VƏTƏNDAŞ QƏBULU ÜÇÜN {" "}
          <span className="text-blue-400">POSTER HAZIRLA</span>
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-300 max-w-3xl mx-auto">
          Ali Məclis deputatının qəbulu haqqında elanını hazırlamaq üçün sahələrə məlumatlarınızı daxil edin.
        </p>
      </div>

      {/* Form kartı */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 shadow-[0_24px_70px_rgba(15,23,42,0.95)] backdrop-blur-xl px-5 py-6 md:px-7 md:py-7">
        <div className="space-y-4 md:space-y-5">
          {/* Deputat adı */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Deputatın adı, soyadı
            </label>
            <input
              type="text"
              name="deputyName"
              value={formData.deputyName}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-600/70 bg-slate-950/70 px-4 py-2.5 text-sm md:text-base text-slate-50 placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
              placeholder="Məs: Əli Vəliyev"
            />
          </div>

          {/* Rayon + Seçki dairəsi */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Rayon / şəhər */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Rayon / şəhər
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={onChange}
                className="w-full rounded-xl border border-slate-600/70 bg-slate-950/70 px-4 py-2.5 text-sm md:text-base text-slate-50 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
              >
                <option value="">Seçin...</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Seçki dairəsi */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Seçki dairəsi
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={onChange}
                disabled={!formData.city}
                className="w-full rounded-xl border border-slate-600/70 bg-slate-950/70 px-4 py-2.5 text-sm md:text-base text-slate-50 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-60"
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

          {/* Ünvan */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Qəbul ünvanı
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={onChange}
              className="w-full rounded-xl border border-slate-600/70 bg-slate-950/70 px-4 py-2.5 text-sm md:text-base text-slate-50 placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
              placeholder="Məs: Naxçıvan şəhəri, 52-ci məhəllə"
            />
          </div>

          {/* Tarix + vaxt + növ */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Tarix
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={onChange}
                className="w-full rounded-xl border border-slate-600/70 bg-slate-950/70 px-4 py-2.5 text-sm md:text-base text-slate-50 placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
                placeholder="Məs: 15 DEKABR 2025"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Saat
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={onChange}
                className="w-full rounded-xl border border-slate-600/70 bg-slate-950/70 px-4 py-2.5 text-sm md:text-base text-slate-50 placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
                placeholder="Məs: 16:00"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Qəbul forması
              </label>
              <select
                name="mode"
                value={formData.mode}
                onChange={onChange}
                className="w-full rounded-xl border border-slate-600/70 bg-slate-950/70 px-4 py-2.5 text-sm md:text-base text-slate-50 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
              >
                <option value="Səyyar">Səyyar qəbul</option>
                <option value="Əyani">Qəbul</option>
              </select>
            </div>
          </div>

          {/* Düymə */}
          <button
            onClick={onSubmit}
            className="mt-4 w-full rounded-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 py-3.5 text-sm md:text-base font-semibold text-white shadow-[0_20px_45px_rgba(37,99,235,0.8)] transition-all hover:brightness-110 hover:shadow-[0_24px_55px_rgba(37,99,235,0.95)] active:scale-[0.99]"
          >
            {showPoster ? "Posteri yenilə" : "Poster yarat"}
          </button>

          <p className="pt-1 text-[11px] text-slate-400">
            Daxil edilən məlumatlar yalnız posterin generasiyası üçün istifadə
            olunur və serverdə saxlanılmır.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FormCard;
