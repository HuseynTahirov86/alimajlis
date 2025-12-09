import React, { useState, useRef } from "react";
import Header from "./components/Header";
import FormCard from "./components/FormCard";
import PosterPreview from "./components/PosterPreview";

// Hər rayon üçün fon şəkli (public qovluğundan)
const cityBackgrounds = {
  "Naxçıvan şəhəri": "/Nakhchivan.png",
  "Ordubad rayonu": "/ordubad.png",
  "Culfa rayonu": "/culfa.png",
  "Şahbuz rayonu": "/shahbuz.png",
  "Babək rayonu": "/babek.png",
  "Kəngərli rayonu": "/kangarli.png",
  "Şərur rayonu": "/sharur.png",
  "Sədərək rayonu": "/sederak.png",
};

// Rayonların siyahısı
const cities = [
  "Naxçıvan şəhəri",
  "Ordubad rayonu",
  "Culfa rayonu",
  "Şahbuz rayonu",
  "Babək rayonu",
  "Kəngərli rayonu",
  "Şərur rayonu",
  "Sədərək rayonu",
];

// Rayon → seçki dairələri
const districtsByCity = {
  "Sədərək rayonu": ["1 saylı Sədərək seçki dairəsi", "2 saylı Dəmirçi seçki dairəsi"],

  "Şərur rayonu": [
    "3 saylı Maxta seçki dairəsi",
    "4 saylı Yengicə seçki dairəsi",
    "5 saylı Çomaxtur seçki dairəsi",
    "7 saylı Xanlıqlar seçki dairəsi",
    "8 saylı Düdəngə seçki dairəsi",
    "9 saylı Mahmudkənd seçki dairəsi",
    "10 saylı Şərur şəhər seçki dairəsi",
    "11 saylı Aşağı Yaycı seçki dairəsi",
    "12 saylı İbadulla seçki dairəsi",
    "13 saylı Püsyan seçki dairəsi",
  ],

  "Kəngərli rayonu": [
    "14 saylı Qarabağlar seçki dairəsi",
    "15 saylı Qıvraq seçki dairəsi",
    "16 saylı Xok seçki dairəsi",
  ],

  "Babək rayonu": [
    "6 saylı Çərçiboğan seçki dairəsi",
    "17 saylı Nehrəm seçki dairəsi",
    "18 saylı Nehrəm seçki dairəsi",
    "19 saylı Babək şəhər seçki dairəsi",
    "20 saylı Zeynəddin seçki dairəsi",
    "21 saylı Sirab seçki dairəsi",
    "22 saylı Şıxmahmud seçki dairəsi",
    "23 saylı Cəhri seçki dairəsi",
  ],

  "Naxçıvan şəhəri": [
    "24 saylı Naxçıvan şəhər seçki dairəsi",
    "25 saylı Naxçıvan şəhər seçki dairəsi",
    "26 saylı Naxçıvan şəhər seçki dairəsi",
    "27 saylı Naxçıvan şəhər seçki dairəsi",
    "28 saylı Naxçıvan şəhər seçki dairəsi",
    "29 saylı Naxçıvan şəhər seçki dairəsi",
    "30 saylı Naxçıvan şəhər seçki dairəsi",
    "31 saylı Naxçıvan şəhər seçki dairəsi",
    "32 saylı Naxçıvan şəhər seçki dairəsi",
    "33 saylı Naxçıvan şəhər seçki dairəsi",
  ],

  "Şahbuz rayonu": [
    "34 saylı Şahbuz şəhər seçki dairəsi",
    "35 saylı Kolanı seçki dairəsi",
    "36 saylı Badamlı seçki dairəsi",
  ],

  "Culfa rayonu": [
    "37 saylı Culfa şəhər seçki dairəsi",
    "38 saylı Yaycı seçki dairəsi",
    "39 saylı Bənəniyar seçki dairəsi",
    "40 saylı Saltaq seçki dairəsi",
  ],

  "Ordubad rayonu": [
    "41 saylı Ordubad şəhər seçki dairəsi",
    "42 saylı Aşağı Əndəmic seçki dairəsi",
    "43 saylı Vənənd seçki dairəsi",
    "44 saylı Dəstə seçki dairəsi",
    "45 saylı Sabirkənd seçki dairəsi",
  ],
};

export default function PosterGenerator() {
  const [formData, setFormData] = useState({
    deputyName: "",
    city: "", // rayon / şəhər
    district: "", // seçki dairəsi (tam mətn)
    voters: "",
    address: "",
    date: "",
    time: "",
    mode: "Səyyar", // "Səyyar" | "Əyani"
  });

  const [showPoster, setShowPoster] = useState(false);
  const canvasRef = useRef(null);

  const handleInputChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => {
    if (name === "city") {
      // Rayon dəyişəndə avtomatik 1-ci seçki dairəsini seç
      const firstDistrict = (districtsByCity[value] || [])[0] || "";
      return {
        ...prev,
        city: value,
        district: firstDistrict,
      };
    }

    return {
      ...prev,
      [name]: value,
    };
  });
};


  const generatePoster = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.src = cityBackgrounds[formData.city] || "/Nakhchivan.png";

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const centerX = canvas.width / 2;

      ctx.fillStyle = "#FFFFFF";

      // ===================== YUXARI BLOK (100px) =====================
      ctx.textAlign = "center";
      ctx.font = 'bold 100px "Poppins", sans-serif';

      // "32 saylı Naxçıvan şəhər seçki dairəsindən"
      const districtLine = formData.district
        ? formData.district.replace("seçki dairəsi", "seçki dairəsindən")
        : "";

      const line2 = "Naxçıvan Muxtar Respublikası Ali Məclisinin deputatı";
      const line3 = `${formData.deputyName} ${formData.voters} sakinlərini qəbul edəcək`;

      const baseY = canvas.height * 0.34;
      const lh = 110; // 100px font üçün line height

      ctx.fillText(districtLine, centerX, baseY);
      ctx.fillText(line2, centerX, baseY + lh);
      ctx.fillText(line3, centerX, baseY + lh * 2);

      // ===================== ÜNVAN (ŞƏHƏRSİZ, 100px) =====================
      ctx.font = '80px "Poppins", sans-serif';
      ctx.textAlign = "center";
      ctx.fillText(
        formData.address, // yalnız ünvan
        canvas.width * 0.7,
        canvas.height * 0.5075
      );

      // ===================== ALT PANEL: TARİX, İL, SAAT, NÖV =====================
      ctx.font = 'bold 73px "Poppins", sans-serif';
      ctx.textAlign = "left";

      const rawDate = formData.date.trim();
      let dateMain = rawDate;
      let yearPart = "";

      // Inputda son söz 4 rəqəmdirsə, onu il kimi götürürük
      const parts = rawDate.split(" ");
      const last = parts[parts.length - 1];
      if (/^\d{4}$/.test(last)) {
        yearPart = last;
        dateMain = parts.slice(0, -1).join(" ");
      }

      const dateX = canvas.width * 0.325;
      const timeX = canvas.width * 0.4865;
      const modeX = canvas.width * 0.575;

      const mainY = canvas.height * 0.94; // tarixin əsas sətri
      const yearY = mainY + 110; // il – 1 sətir altına
      const tarixy = canvas.height * 0.93;
      const ily = canvas.height * 0.95
      const qebuly = canvas.height * 0.94

      // Tarix – soldan düzülmüş
      ctx.fillText(dateMain, dateX, tarixy);
      if (yearPart) {
        ctx.fillText(yearPart, dateX, ily);
      }

      // Saat
      ctx.fillText(formData.time, timeX, mainY);

      ctx.font = 'bold 82px "Poppins", sans-serif';

      // Qəbul növü
      const isSeyyar = formData.mode === "Səyyar";
      const modeText = isSeyyar ? "Səyyar Qəbul" : "Qəbul";

      // Ayrı koordinatlar
      const modeX_final = isSeyyar ? modeX : modeX + 140;  // Qəbul üçün sola çək
      const modeY_final = isSeyyar ? qebuly : qebuly; // Qəbul üçün y-ı dəyiş

      ctx.fillText(modeText, modeX_final, modeY_final);
    };
  };

  const handleSubmit = () => {
    const { deputyName, city, district, address, date, time, voters } = formData;

    if (!deputyName || !city || !district || !address || !date || !time || !voters) {
      alert("Zəhmət olmasa bütün xanaları doldurun.");
      return;
    }

    setShowPoster(true);
    setTimeout(generatePoster, 150);
  };


  const downloadPoster = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "vetendas-qebulu.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const resetPoster = () => {
    setShowPoster(false);
    setFormData({
      deputyName: "",
      city: "",
      district: "",
      address: "",
      date: "",
      time: "",
      mode: "Səyyar",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,#1e3a8a_1px,transparent_0)] [background-size:40px_40px]" />

      <Header />

      <main className="relative z-10 px-4 py-8 md:py-10 space-y-4 md:space-y-6">
        <FormCard
          formData={formData}
          cities={cities}
          districtsByCity={districtsByCity}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          showPoster={showPoster}
        />

        <PosterPreview
          showPoster={showPoster}
          canvasRef={canvasRef}
          onDownload={downloadPoster}
          onReset={resetPoster}
        />
      </main>
    </div>
  );
}
