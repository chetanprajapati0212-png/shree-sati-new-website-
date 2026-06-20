import { CertificateSearch } from "@/components/CertificateSearch";

export default function VerifyPage() {
  return (
    <>
      <section className="page-title">
        <div className="container">
          <h1>अपना प्रमाणपत्र डाउनलोड करें</h1>
          <p>अपना पंजीकरण क्रमांक दर्ज करके प्रमाणपत्र देखें और डाउनलोड करें।</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <CertificateSearch />
        </div>
      </section>
    </>
  );
}
