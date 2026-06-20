export const admin = {
  mobile: "8529552449",
  email: "Shree.sati.livestock.training@gmail.com",
  whatsappUrl:
    "https://wa.me/918529552449?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87%2C%20%E0%A4%AE%E0%A5%81%E0%A4%9D%E0%A5%87%20%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A4%A4%E0%A5%80%20%E0%A4%B2%E0%A4%BE%E0%A4%87%E0%A4%B5%E0%A4%B8%E0%A5%8D%E0%A4%9F%E0%A5%89%E0%A4%95%20%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A5%87%E0%A4%A8%E0%A4%BF%E0%A4%82%E0%A4%97%20%E0%A4%B8%E0%A5%87%E0%A4%82%E0%A4%9F%E0%A4%B0%20%E0%A4%95%E0%A5%80%20%E0%A4%9C%E0%A4%BE%E0%A4%A8%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%9A%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%8F%E0%A5%A4"
};

export const site = {
  name: "श्री सती लाइवस्टॉक ट्रेनिंग सेंटर",
  shortName: "श्री सती लाइवस्टॉक",
  location: "नागौर, राजस्थान",
  description:
    "बकरी पालन एवं डेयरी फार्मिंग का व्यावहारिक, वैज्ञानिक और सरल प्रशिक्षण।",
  registrationPrefix: "SSLTC"
};

export const courses = [
  {
    id: "goat-farming",
    title: "बकरी पालन प्रशिक्षण",
    shortTitle: "बकरी पालन",
    description:
      "आधुनिक एवं वैज्ञानिक तरीके से बकरी पालन का सम्पूर्ण व्यावहारिक प्रशिक्षण।",
    points: [
      "उन्नत नस्लों का चयन एवं प्रबंधन",
      "संतुलित आहार एवं पोषण व्यवस्था",
      "रोग पहचान, टीकाकरण एवं रोकथाम",
      "शेड डिजाइन एवं स्वच्छता प्रबंधन",
      "बिक्री और लाभ बढ़ाने की जानकारी"
    ]
  },
  {
    id: "dairy-farming",
    title: "डेयरी फार्मिंग प्रशिक्षण",
    shortTitle: "डेयरी फार्मिंग",
    description:
      "दुधारू पशुओं के पालन, दूध उत्पादन और डेयरी व्यवसाय का सम्पूर्ण प्रशिक्षण।",
    points: [
      "उन्नत दुधारू नस्लों का चयन",
      "वैज्ञानिक आहार एवं चारा प्रबंधन",
      "स्वच्छ दूध उत्पादन",
      "पशु स्वास्थ्य एवं प्रजनन प्रबंधन",
      "डेयरी व्यवसाय और बिक्री की जानकारी"
    ]
  }
];

export function getAppsScriptUrl() {
  return process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "";
}
