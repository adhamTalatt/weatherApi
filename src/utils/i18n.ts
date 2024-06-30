import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      min: "الصغري",
      max: "الكبري",
      "clear sky": "سماء صافية",
      "few clouds": "قليل الغيوم",
      "scattered clouds": "غيوم متفرقة",
      "broken clouds": "غيوم متفرقة",
      "shower rain": "مطر دش",
      rain: "مطر",
      thunderstorm: "عاصفة رعدية",
      snow: "ثلج",
      mist: "شَبُّورَة",
      "Choose any city:": "اخطار المدينة:",
      Disagree: "اغلاق",
      Cairo: "القاهرة",
      Alexandria: "الإسكندرية",
      Luxor: "الأقصر",
      "Sheikh Zayed City": "مدينة الشيخ زايد",
      Sohag: "سوهاج",
      "Mersa Matruh": "مرسى مطروح",
      Medina: " المدينة المنورة",
      Mecca: "مكة المكرمة",
      Riyadh: " الرياض",
      Jeddah: " جدة",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ar",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
