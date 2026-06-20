import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { admin, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand">
            <Image
              src="/images/logo.jpeg"
              alt={site.name}
              width={60}
              height={60}
              className="brand-logo"
            />
            <strong>{site.shortName}</strong>
          </div>
          <p style={{ color: "rgba(255,255,255,.82)", lineHeight: 1.7 }}>
            {site.name} — बकरी पालन एवं डेयरी फार्मिंग का व्यावहारिक और
            वैज्ञानिक प्रशिक्षण संस्थान।
          </p>
        </div>
        <div>
          <div className="footer-title">त्वरित लिंक</div>
          <ul className="footer-list">
            <li><Link href="/">होम</Link></li>
            <li><Link href="/about">हमारे बारे में</Link></li>
            <li><Link href="/courses">प्रशिक्षण पाठ्यक्रम</Link></li>
            <li><Link href="/register">छात्र पंजीकरण</Link></li>
            <li><Link href="/verify">प्रमाणपत्र डाउनलोड</Link></li>
            <li><Link href="/contact">संपर्क करें</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-title">सहायता हेतु संपर्क करें</div>
          <ul className="footer-list">
            <li><MapPin size={16} aria-hidden="true" /> {site.location}</li>
            <li>
              <a href={`tel:${admin.mobile}`}><Phone size={16} aria-hidden="true" /> {admin.mobile}</a>
            </li>
            <li>
              <a href={`mailto:${admin.email}`}><Mail size={16} aria-hidden="true" /> {admin.email}</a>
            </li>
            <li>
              <a href={admin.whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle size={16} aria-hidden="true" /> व्हाट्सऐप पर संदेश भेजें
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        © 2026 {site.name}. सर्वाधिकार सुरक्षित।
      </div>
    </footer>
  );
}
