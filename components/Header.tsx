import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { admin, site } from "@/lib/site";

const links = [
  { href: "/", label: "होम" },
  { href: "/about", label: "हमारे बारे में" },
  { href: "/courses", label: "प्रशिक्षण पाठ्यक्रम" },
  { href: "/register", label: "छात्र पंजीकरण" },
  { href: "/verify", label: "प्रमाणपत्र डाउनलोड" },
  { href: "/contact", label: "संपर्क करें" }
];

export function Header() {
  return (
    <header className="header">
      <div className="container nav-wrap">
        <Link className="brand" href="/">
          <Image
            src="/images/logo.jpeg"
            alt={site.name}
            width={60}
            height={60}
            className="brand-logo"
            priority
          />
          <span>
            <span className="brand-title">{site.shortName}</span>
            <span className="brand-place">{site.location}</span>
          </span>
        </Link>
        <nav className="nav" aria-label="मुख्य मेन्यू">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <a className="header-action" href={`tel:${admin.mobile}`}>
          <Phone size={18} aria-hidden="true" />
          {admin.mobile}
        </a>
      </div>
    </header>
  );
}
