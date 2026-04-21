import React, { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import FormCard from "./components/FormCard";
import PosterPreview from "./components/PosterPreview";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
    "6 saylı Çərçiboğan seçki dairəsi",
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
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("vetendas-poster-data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch(e) {}
    }
    return {
      deputyName: "",
      city: "", // rayon / şəhər
      district: "", // seçki dairəsi (tam mətn)
      voters: "",
      address: "",
      date: "",
      time: "",
      mode: "Səyyar", // "Səyyar" | "Əyani"
    };
  });

  const [showPoster, setShowPoster] = useState(false);
  const canvasRef = useRef(null);
  const textCanvasRef = useRef(null);
  const bgImgRef = useRef(null);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem("vetendas-poster-data", JSON.stringify(formData));
  }, [formData]);

  // Live preview effect (debounce)
  useEffect(() => {
    if (showPoster) {
      const timer = setTimeout(() => {
        generatePoster();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [formData, showPoster]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "city") {
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
      bgImgRef.current = img;

      // Text Canvas üçün ayrıca layer (Video üçün lazımdır)
      const textCanvas = document.createElement("canvas");
      textCanvas.width = img.width;
      textCanvas.height = img.height;
      const tCtx = textCanvas.getContext("2d");

      tCtx.fillStyle = "#FFFFFF";
      tCtx.textAlign = "center";

      const centerX = textCanvas.width / 2;

      const districtLine = formData.district
        ? formData.district.replace("seçki dairəsi", "seçki dairəsindən")
        : "";

      const line2 = "Naxçıvan Muxtar Respublikası Ali Məclisinin deputatı";
      const line3 = `${formData.deputyName} ${formData.voters} sakinlərini qəbul edəcək`;

      const maxWidth = textCanvas.width * 0.9;

      function wrapTextToLines(text, maxWidth, fontSize) {
        tCtx.font = `bold ${fontSize}px "Poppins", sans-serif`;
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';

        for (let word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const metrics = tCtx.measureText(testLine);
          
          if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) lines.push(currentLine);
        return lines;
      }

      function needsWrapping(texts, maxWidth, fontSize) {
        for (let text of texts) {
          const lines = wrapTextToLines(text, maxWidth, fontSize);
          if (lines.length > 1) return true;
        }
        return false;
      }

      let optimalFontSize = 100;

      if (needsWrapping([districtLine, line2, line3], maxWidth, 100)) {
        optimalFontSize = 90;
        let totalLinesAt90 = 0;
        for (let text of [districtLine, line2, line3]) {
          totalLinesAt90 += wrapTextToLines(text, maxWidth, 90).length;
        }
        
        if (totalLinesAt90 > 6) {
          for (let fontSize = 85; fontSize >= 50; fontSize -= 5) {
            let totalLines = 0;
            for (let text of [districtLine, line2, line3]) {
              totalLines += wrapTextToLines(text, maxWidth, fontSize).length;
            }
            if (totalLines <= 6) {
              optimalFontSize = fontSize;
              break;
            }
          }
        }
      }

      tCtx.font = `bold ${optimalFontSize}px "Poppins", sans-serif`;
      const lineHeight = optimalFontSize * 1.2;
      const baseY = textCanvas.height * 0.34;
      let currentY = baseY;

      const lines1 = wrapTextToLines(districtLine, maxWidth, optimalFontSize);
      lines1.forEach(line => { tCtx.fillText(line, centerX, currentY); currentY += lineHeight; });

      const lines2 = wrapTextToLines(line2, maxWidth, optimalFontSize);
      lines2.forEach(line => { tCtx.fillText(line, centerX, currentY); currentY += lineHeight; });

      const lines3 = wrapTextToLines(line3, maxWidth, optimalFontSize);
      lines3.forEach(line => { tCtx.fillText(line, centerX, currentY); currentY += lineHeight; });

      const addressMaxWidth = textCanvas.width * 0.40;
      function wrapAddress(text, maxWidth, fontSize) {
        tCtx.font = `${fontSize}px "Poppins", sans-serif`;
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';

        for (let word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const metrics = tCtx.measureText(testLine);
          if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine); currentLine = word;
          } else { currentLine = testLine; }
        }
        if (currentLine) lines.push(currentLine);
        return lines;
      }

      let addressFontSize = 80;
      tCtx.font = `${addressFontSize}px "Poppins", sans-serif`;
      const addressLinesAt80 = wrapAddress(formData.address, addressMaxWidth, 80);

      if (addressLinesAt80.length > 1) {
        addressFontSize = 70;
        const addressLinesAt70 = wrapAddress(formData.address, addressMaxWidth, 70);
        if (addressLinesAt70.length > 2) {
          for (let fontSize = 65; fontSize >= 50; fontSize -= 5) {
            const lines = wrapAddress(formData.address, addressMaxWidth, fontSize);
            if (lines.length <= 2) { addressFontSize = fontSize; break; }
          }
        }
      }

      const addressLines = wrapAddress(formData.address, addressMaxWidth, addressFontSize);
      const finalAddressLines = addressLines.slice(0, 2);

      tCtx.font = `${addressFontSize}px "Poppins", sans-serif`;
      tCtx.textAlign = "center";
      const addressY = textCanvas.height * 0.5075;

      if (finalAddressLines.length === 1) {
        tCtx.fillText(finalAddressLines[0], textCanvas.width * 0.7, addressY);
      } else {
        const lineSpacing = addressFontSize * 1.1;
        tCtx.fillText(finalAddressLines[0], textCanvas.width * 0.7, addressY - lineSpacing/2);
        tCtx.fillText(finalAddressLines[1], textCanvas.width * 0.7, addressY + lineSpacing/2);
      }

      tCtx.font = 'bold 73px "Poppins", sans-serif';
      tCtx.textAlign = "left";

      const rawDate = formData.date.trim();
      let dateMain = rawDate;
      let yearPart = "";

      const parts = rawDate.split(" ");
      const last = parts[parts.length - 1];
      if (/^\d{4}$/.test(last)) {
        yearPart = last;
        dateMain = parts.slice(0, -1).join(" ");
      }

      const dateX = textCanvas.width * 0.325;
      const timeX = textCanvas.width * 0.4865;
      const modeX = textCanvas.width * 0.575;

      const mainY = textCanvas.height * 0.94; 
      const tarixy = textCanvas.height * 0.93;
      const ily = textCanvas.height * 0.95;
      const qebuly = textCanvas.height * 0.94;

      tCtx.fillText(dateMain, dateX, tarixy);
      if (yearPart) tCtx.fillText(yearPart, dateX, ily);
      tCtx.fillText(formData.time, timeX, mainY);

      tCtx.font = 'bold 82px "Poppins", sans-serif';
      const isSeyyar = formData.mode === "Səyyar";
      const modeText = isSeyyar ? "Səyyar Qəbul" : "Qəbul";
      const modeX_final = isSeyyar ? modeX : modeX + 140; 
      
      tCtx.fillText(modeText, modeX_final, qebuly);

      // Ana canvasa rəsm edirik (Statik versiya)
      ctx.drawImage(img, 0, 0);
      ctx.drawImage(textCanvas, 0, 0);
      textCanvasRef.current = textCanvas;
    };
  };

  const handleSubmit = () => {
    const { deputyName, city, district, address, date, time, voters } = formData;

    if (!deputyName || !city || !district || !address || !date || !time || !voters) {
      toast.error("Zəhmət olmasa bütün xanaları doldurun.");
      return;
    }

    if (!showPoster) {
      toast.loading("Poster yaradılır...", { id: "generating" });
      setShowPoster(true);
      setTimeout(() => {
        generatePoster();
        toast.success("Poster uğurla yaradıldı!", { id: "generating" });
      }, 600);
    } else {
      toast.success("Poster yeniləndi!");
      generatePoster();
    }
  };

  const downloadPoster = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "vetendas-qebulu.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast.success("Poster uğurla yükləndi!");
  };

  const sharePoster = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], "vetendas-qebulu.png", { type: "image/png" });
      
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: "Vətəndaş Qəbulu Posteri",
            text: "Ali Məclis deputatının vətəndaş qəbulu elanı."
          });
          toast.success("Poster uğurla paylaşıldı!");
        } catch (error) {
          if (error.name !== 'AbortError') {
            toast.error("Paylaşarkən xəta baş verdi.");
          }
        }
      } else {
        toast.error("Cihazınız birbaşa şəkil paylaşımını dəstəkləmir. Yükləyib paylaşın.");
      }
    });
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
      voters: ""
    });
    localStorage.removeItem("vetendas-poster-data");
  };

  return (
    <div className="text-white relative">
      <Header />

      <main className="relative z-10 px-4 py-6 md:py-10 lg:grid lg:grid-cols-12 lg:gap-8 max-w-[1400px] mx-auto items-start">
        <div className="lg:col-span-5 xl:col-span-5">
          <FormCard
            formData={formData}
            cities={cities}
            districtsByCity={districtsByCity}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            showPoster={showPoster}
          />
        </div>

        <div className="lg:col-span-7 xl:col-span-7 lg:sticky lg:top-8 mt-8 lg:mt-0">
          <PosterPreview
            showPoster={showPoster}
            canvasRef={canvasRef}
            onDownload={downloadPoster}
            onShare={sharePoster}
            onReset={resetPoster}
          />
        </div>
      </main>
    </div>
  );
}
