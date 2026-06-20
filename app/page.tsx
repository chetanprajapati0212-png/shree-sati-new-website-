import Image from "next/image";
import Link from "next/link";
import { Award, CheckCircle2, GraduationCap, Sprout } from "lucide-react";
import { courses, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">नागौर, राजस्थान • भरोसेमंद प्रशिक्षण संस्थान</span>
            <h1 style={{ marginTop: 18 }}>{site.name}</h1>
            <p className="lead">
              बकरी पालन एवं डेयरी फार्मिंग का व्यावहारिक, वैज्ञानिक एवं सरल
              प्रशिक्षण। अपना सफल पशुपालन व्यवसाय शुरू करने की दिशा में पहला
              कदम बढ़ाएँ।
            </p>
            <div className="button-row">
              <Link className="btn btn-accent" href="/register">अभी पंजीकरण करें</Link>
              <Link className="btn btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,.45)" }} href="/verify">
                प्रमाणपत्र डाउनलोड करें
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div className="card" style={{ display: "grid", placeItems: "center" }}>
            <Image src="/images/logo.jpeg" alt={site.name} width={420} height={420} style={{ maxWidth: "100%", height: "auto", borderRadius: 16 }} />
          </div>
          <div>
            <span className="eyebrow">स्वागत है</span>
            <h2 style={{ marginTop: 16 }}>पशुपालन में आत्मनिर्भरता की ओर आपका साथी</h2>
            <p className="hint" style={{ fontSize: "1.05rem" }}>
              हमारा उद्देश्य किसानों, युवाओं और पशुपालन में रुचि रखने वाले
              ग्रामीण परिवारों को ऐसा प्रशिक्षण देना है जो सीधे काम में आए।
            </p>
            <ul className="check-list">
              <li>अनुभवी विशेषज्ञों द्वारा प्रत्यक्ष प्रशिक्षण</li>
              <li>फार्म पर व्यावहारिक कार्य अनुभव</li>
              <li>आधुनिक एवं वैज्ञानिक पशुपालन तकनीकें</li>
              <li>प्रशिक्षण के बाद प्रमाणपत्र सुविधा</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <h2 style={{ textAlign: "center" }}>हमारी विशेषताएँ</h2>
          <div className="grid-3">
            <div className="card">
              <GraduationCap color="#0f4b24" size={34} />
              <h3>सरल भाषा में सीखें</h3>
              <p className="hint">गाँव और खेत की जरूरत के अनुसार आसान हिंदी में जानकारी।</p>
            </div>
            <div className="card">
              <Sprout color="#0f4b24" size={34} />
              <h3>व्यवसाय मार्गदर्शन</h3>
              <p className="hint">कम खर्च, सही प्रबंधन और लाभ बढ़ाने की व्यावहारिक सलाह।</p>
            </div>
            <div className="card">
              <Award color="#0f4b24" size={34} />
              <h3>प्रमाणपत्र सुविधा</h3>
              <p className="hint">पंजीकरण क्रमांक से भविष्य में प्रमाणपत्र देखा और डाउनलोड किया जा सकता है।</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: "center" }}>हमारे प्रमुख प्रशिक्षण कार्यक्रम</h2>
          <div className="grid-2">
            {courses.map((course) => (
              <article className="card course-card" key={course.id}>
                <span className="course-badge">{course.shortTitle}</span>
                <h3>{course.title}</h3>
                <p className="hint">{course.description}</p>
                <ul className="check-list">
                  {course.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <Link className="btn btn-primary" href={`/register?course=${course.id}`} style={{ marginTop: "auto" }}>
                  इस पाठ्यक्रम हेतु पंजीकरण करें
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container card" style={{ textAlign: "center" }}>
          <CheckCircle2 color="#0f4b24" size={40} />
          <h2>आज ही अपना प्रशिक्षण आरक्षित करें</h2>
          <p className="hint">सीमित सीटें उपलब्ध हैं। पंजीकरण करें या सहायता के लिए संपर्क करें।</p>
          <div className="button-row" style={{ justifyContent: "center" }}>
            <Link className="btn btn-primary" href="/register">अभी पंजीकरण करें</Link>
            <Link className="btn btn-outline" href="/contact">संपर्क करें</Link>
          </div>
        </div>
      </section>
    </>
  );
}
