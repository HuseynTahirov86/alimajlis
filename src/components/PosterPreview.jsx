import React from "react";

const PosterPreview = ({ showPoster, canvasRef, onDownload, onReset }) => {
  return (
    <section className="max-w-4xl mx-auto w-full mt-8 md:mt-10">
      <div className="rounded-3xl border border-blue-500/25 bg-slate-900/75 backdrop-blur-xl px-5 py-6 md:px-7 md:py-7 shadow-[0_26px_70px_rgba(15,23,42,0.98)] flex flex-col items-center justify-center min-h-[420px]">
        {!showPoster ? (
          <p className="text-slate-300 text-sm md:text-base text-center max-w-md">
            Formu doldurduqdan sonra generasiya olunan poster burada
            görünəcək.
          </p>
        ) : (
          <div className="flex flex-col items-center gap-6 w-full">
            <div className="w-full flex justify-center">
              <canvas
                ref={canvasRef}
                className="w-full max-w-[640px] rounded-xl shadow-[0_18px_45px_rgba(0,0,0,0.8)]"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center">
              <button
                onClick={onDownload}
                className="px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition font-semibold text-white shadow-lg shadow-emerald-500/40 w-full sm:w-auto text-sm md:text-base"
              >
                Yüklə (PNG)
              </button>
              <button
                onClick={onReset}
                className="px-7 py-3 rounded-xl bg-slate-700 hover:bg-slate-800 transition font-semibold text-white shadow-lg w-full sm:w-auto text-sm md:text-base"
              >
                Yenidən başla
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PosterPreview;
