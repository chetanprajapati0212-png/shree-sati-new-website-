import Image from "next/image";
import { Eye, HandHelping, Target, TestTube2 } from "lucide-react";
import { site } from "@/lib/site";

export default function AboutPage() {
  return (
    <>
      <section className="page-title">
        <div className="container">
          <h1>हमारे बारे में</h1>
          <p>पशुपालन को लाभकारी और सम्मानजनक व्यवसाय बनाने हेतु समर्पित प्रशिक्षण संस्थान।</p>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div className="card" style={{ display: "grid", placeItems: "center" }}>
            <Image src="/images/logo.jpeg" alt={site.name} width={420} height={420} style={{ maxWidth: "100%", height: "auto", borderRadius: 16 }} />
          </div>
          <div>
            <h2>लाइवस्टॉक प्रशिक्षण के बारे में</h2>
            <p className="hint" style={{ fontSize: "1.05rem" }}>
              {site.name}, {site.location} किसानों, युवाओं और पशुपालन में रुचि
              रखने वाले सभी लोगों के लिए एक विश्वसनीय प्रशिक्षण मंच है।
            </p>
            <p className="hint" style={{ fontSize: "1.05rem", marginTop: 14 }}>
              हमारे प्रशिक्षण कार्यक्रम बकरी पालन एवं डेयरी फार्मिंग पर केंद्रित
              हैं, जिसमें पशु खरीद से लेकर पोषण, स्वास्थ्य, प्रजनन और बाजार तक
              की जानकारी दी जाती है।
            </p>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container grid-3">
          <div className="card">
            <HandHelping color="#0f4b24" size={34} />
            <h3>व्यावहारिक प्रशिक्षण</h3>
            <p className="hint">फार्म पर सीधे काम करके आहार, स्वच्छता और प्रबंधन सीखें।</p>
          </div>
          <div className="card">
            <Target color="#0f4b24" size={34} />
            <h3>हमारा लक्ष्य</h3>
            <p className="hint">हर प्रशिक्षणार्थी को अपना पशुपालन व्यवसाय चलाने योग्य बनाना।</p>
          </div>
          <div className="card">
            <TestTube2 color="#0f4b24" size={34} />
            <h3>वैज्ञानिक विधियाँ</h3>
            <p className="hint">नस्ल चयन, पोषण, रोग प्रबंधन और उत्पादकता बढ़ाने की तकनीकें।</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div className="card">
            <Target color="#c49a2f" size={36} />
            <h3>हमारा उद्देश्य</h3>
            <p className="hint">ग्रामीण परिवारों को पशुपालन से स्थायी आय और आत्मनिर्भरता की दिशा में आगे बढ़ाना।</p>
          </div>
          <div className="card">
            <Eye color="#c49a2f" size={36} />
            <h3>हमारी दृष्टि</h3>
            <p className="hint">राजस्थान में वैज्ञानिक पशुपालन को सरल, सुलभ और भरोसेमंद बनाना।</p>
          </div>
        </div>
      </section>
    </>
  );
}
