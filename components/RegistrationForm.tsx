"use client";

import { useSearchParams } from "next/navigation";
import { Copy, Loader2 } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { SupportBox } from "@/components/SupportBox";
import { admin, courses, getAppsScriptUrl } from "@/lib/site";

type FilePayload = {
  field: string;
  name: string;
  mimeType: string;
  data: string;
};

type RegistrationPayload = {
  action: "register";
  fullName: string;
  fatherName: string;
  mobile: string;
  email: string;
  dob: string;
  aadhaar: string;
  address: string;
  state: string;
  district: string;
  course: string;
  files: FilePayload[];
};

type RegisterResponse = {
  ok: boolean;
  registrationNumber?: string;
  message?: string;
};

const fileFields = [
  { name: "photo", label: "पासपोर्ट साइज फोटो" },
  { name: "aadhaarFront", label: "आधार फ्रंट फोटो" },
  { name: "aadhaarBack", label: "आधार बैक फोटो" }
];

function text(formData: FormData, name: string) {
  return String(formData.get(name) || "").trim();
}

function fileToPayload(file: File, field: string): Promise<FilePayload> {
  return new Promise((resolve, reject) => {
    if (file.size > 6 * 1024 * 1024) {
      reject(new Error("फोटो 6 MB से कम होनी चाहिए।"));
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      reject(new Error("फोटो JPG, PNG या WEBP में होनी चाहिए।"));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("फोटो पढ़ने में समस्या आई।"));
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve({
        field,
        name: file.name,
        mimeType: file.type,
        data: result.includes(",") ? result.split(",")[1] : result
      });
    };
    reader.readAsDataURL(file);
  });
}

export function RegistrationForm() {
  const searchParams = useSearchParams();
  const selectedCourseId = searchParams.get("course") || "";
  const selectedCourseTitle = courses.find((course) => course.id === selectedCourseId)?.title || "";
  const appsScriptUrl = getAppsScriptUrl();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const courseOptions = useMemo(() => courses, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const mobile = text(formData, "mobile");
    const email = text(formData, "email");
    const aadhaar = text(formData, "aadhaar");

    if (!appsScriptUrl) {
      setError("वेबसाइट में Apps Script लिंक सेट नहीं है। कृपया व्यवस्थापक से संपर्क करें।");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("कृपया सही ईमेल दर्ज करें।");
      return;
    }
    if (!/^\d{12}$/.test(aadhaar)) {
      setError("कृपया सही 12 अंकों का आधार नंबर दर्ज करें।");
      return;
    }

    setLoading(true);
    try {
      const files = await Promise.all(
        fileFields.map((field) => {
          const file = formData.get(field.name);
          if (!(file instanceof File) || !file.name) {
            throw new Error(`${field.label} अपलोड करें।`);
          }
          return fileToPayload(file, field.name);
        })
      );

      const payload: RegistrationPayload = {
        action: "register",
        fullName: text(formData, "fullName"),
        fatherName: text(formData, "fatherName"),
        mobile,
        email,
        dob: text(formData, "dob"),
        aadhaar,
        address: text(formData, "address"),
        state: text(formData, "state"),
        district: text(formData, "district"),
        course: text(formData, "course"),
        files
      };

      const response = await fetch(appsScriptUrl, {
        method: "POST",
        body: JSON.stringify(payload)
      });
      const data = (await response.json()) as RegisterResponse;
      if (!response.ok || !data.ok || !data.registrationNumber) {
        throw new Error(data.message || "पंजीकरण जमा नहीं हो पाया।");
      }
      setRegistrationNumber(data.registrationNumber);
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "कुछ समस्या आई। कृपया पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  }

  if (registrationNumber) {
    return (
      <div className="form card" style={{ textAlign: "center" }}>
        <div className="notice notice-success">
          <h2>पंजीकरण सफलतापूर्वक हो गया है।</h2>
          <p>आपका पंजीकरण क्रमांक:</p>
          <div className="success-number">
            <span>{registrationNumber}</span>
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => navigator.clipboard.writeText(registrationNumber)}
            >
              <Copy size={18} aria-hidden="true" />
              पंजीकरण क्रमांक कॉपी करें
            </button>
          </div>
          <p>कृपया इसे सुरक्षित रखें।</p>
          <p>भविष्य में प्रमाणपत्र डाउनलोड करने के लिए इसकी आवश्यकता होगी।</p>
        </div>
        <div style={{ marginTop: 18 }}>
          <SupportBox />
        </div>
        <button className="btn btn-primary" type="button" style={{ marginTop: 20 }} onClick={() => setRegistrationNumber("")}>
          नया पंजीकरण करें
        </button>
      </div>
    );
  }

  return (
    <form className="form card" onSubmit={handleSubmit}>
      {error ? <div className="notice notice-error" style={{ marginBottom: 18 }}>{error}</div> : null}
      <div className="form-grid">
        <div className="field">
          <label htmlFor="fullName">पूरा नाम <span className="required">*</span></label>
          <input id="fullName" name="fullName" required placeholder="जैसे: रमेश कुमार" />
        </div>
        <div className="field">
          <label htmlFor="fatherName">पिता का नाम <span className="required">*</span></label>
          <input id="fatherName" name="fatherName" required placeholder="पिता का पूरा नाम" />
        </div>
        <div className="field">
          <label htmlFor="mobile">मोबाइल नंबर <span className="required">*</span></label>
          <input id="mobile" name="mobile" type="tel" inputMode="numeric" maxLength={10} required placeholder="10 अंकों का नंबर" />
        </div>
        <div className="field">
          <label htmlFor="email">ईमेल</label>
          <input id="email" name="email" type="email" placeholder={admin.email} />
        </div>
        <div className="field">
          <label htmlFor="dob">जन्म तिथि <span className="required">*</span></label>
          <input id="dob" name="dob" type="date" required />
        </div>
        <div className="field">
          <label htmlFor="aadhaar">आधार नंबर <span className="required">*</span></label>
          <input id="aadhaar" name="aadhaar" inputMode="numeric" maxLength={12} required placeholder="12 अंकों का आधार नंबर" />
        </div>
        <div className="field">
          <label htmlFor="state">राज्य <span className="required">*</span></label>
          <input id="state" name="state" required placeholder="जैसे: राजस्थान" />
        </div>
        <div className="field">
          <label htmlFor="district">जिला <span className="required">*</span></label>
          <input id="district" name="district" required placeholder="जैसे: नागौर" />
        </div>
        <div className="field field-full">
          <label htmlFor="address">पूरा पता <span className="required">*</span></label>
          <textarea id="address" name="address" required placeholder="गाँव/शहर, तहसील, जिला, राज्य, पिन कोड" />
        </div>
        <div className="field field-full">
          <label htmlFor="course">प्रशिक्षण पाठ्यक्रम <span className="required">*</span></label>
          <select id="course" name="course" required defaultValue={selectedCourseTitle}>
            <option value="" disabled>पाठ्यक्रम चुनें</option>
            {courseOptions.map((course) => (
              <option key={course.id} value={course.title}>{course.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginTop: 26 }}>
        <h3>आवश्यक दस्तावेज़ अपलोड करें</h3>
        <p className="hint">सभी फोटो स्पष्ट और पढ़ने योग्य होने चाहिए।</p>
        <div className="grid-3" style={{ marginTop: 16 }}>
          {fileFields.map((field) => (
            <div className="field" key={field.name}>
              <label htmlFor={field.name}>{field.label} <span className="required">*</span></label>
              <input id={field.name} name={field.name} type="file" accept="image/png,image/jpeg,image/webp" required />
            </div>
          ))}
        </div>
      </div>

      <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", marginTop: 28 }}>
        {loading ? <Loader2 className="spin" size={18} aria-hidden="true" /> : null}
        {loading ? "जमा हो रहा है..." : "पंजीकरण जमा करें"}
      </button>
    </form>
  );
}
