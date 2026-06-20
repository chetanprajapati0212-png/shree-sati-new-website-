import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { admin, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} | नागौर, राजस्थान`,
  description: site.description,
  keywords: [
    "बकरी पालन प्रशिक्षण",
    "डेयरी फार्मिंग प्रशिक्षण",
    "नागौर",
    "राजस्थान",
    "पशुपालन प्रशिक्षण"
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <body>
        <div className="page">
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </div>
        <a
          className="floating-whatsapp"
          href={admin.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="व्हाट्सऐप पर सहायता लें"
        >
          <MessageCircle size={22} aria-hidden="true" />
          सहायता
        </a>
      </body>
    </html>
  );
}
