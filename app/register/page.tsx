import { Suspense } from "react";
import { RegistrationForm } from "@/components/RegistrationForm";

export default function RegisterPage() {
  return (
    <>
      <section className="page-title">
        <div className="container">
          <h1>छात्र पंजीकरण</h1>
          <p>नीचे दिया गया फॉर्म भरकर प्रशिक्षण हेतु अपना पंजीकरण करें। सभी जानकारी सही भरें।</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Suspense fallback={<div className="card form">लोड हो रहा है...</div>}>
            <RegistrationForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
