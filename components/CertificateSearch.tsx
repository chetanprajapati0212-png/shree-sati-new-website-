"use client";

import { FormEvent, useState } from "react";
import { Download, ExternalLink, Loader2, Search } from "lucide-react";
import { SupportBox } from "@/components/SupportBox";
import { getAppsScriptUrl } from "@/lib/site";

type CertificateRecord = {
  registrationNumber: string;
  certificateUrl: string;
  downloadUrl: string;
  issueDate: string;
};

type CertificateResponse = {
  ok: boolean;
  found: boolean;
  record?: CertificateRecord;
  message?: string;
};

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "found"; record: CertificateRecord }
  | { status: "notfound" }
  | { status: "error"; message: string };

export function CertificateSearch() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });
  const appsScriptUrl = getAppsScriptUrl();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = registrationNumber.trim().toUpperCase();
    if (!appsScriptUrl) {
      setState({ status: "error", message: "वेबसाइट में Apps Script लिंक सेट नहीं है। कृपया व्यवस्थापक से संपर्क करें।" });
      return;
    }
    if (!/^SSLTC-\d{4}-\d{5,}$/.test(value)) {
      setState({ status: "error", message: "कृपया सही पंजीकरण क्रमांक दर्ज करें। उदाहरण: SSLTC-2026-00001" });
      return;
    }

    setState({ status: "loading" });
    try {
      const url = new URL(appsScriptUrl);
      url.searchParams.set("action", "certificate");
      url.searchParams.set("registrationNumber", value);
      const response = await fetch(url.toString(), { method: "GET" });
      const data = (await response.json()) as CertificateResponse;
      if (!response.ok || !data.ok) {
        throw new Error(data.message || "प्रमाणपत्र खोजने में समस्या आई।");
      }
      if (!data.found || !data.record) {
        setState({ status: "notfound" });
        return;
      }
      setState({ status: "found", record: data.record });
    } catch (err) {
      setState({ status: "error", message: err instanceof Error ? err.message : "कुछ समस्या आई। कृपया पुनः प्रयास करें।" });
    }
  }

  return (
    <div className="form">
      <form className="card" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="registrationNumber">पंजीकरण क्रमांक दर्ज करें</label>
          <input
            id="registrationNumber"
            value={registrationNumber}
            onChange={(event) => setRegistrationNumber(event.target.value.toUpperCase())}
            placeholder="जैसे: SSLTC-2026-00001"
            autoComplete="off"
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={state.status === "loading"} style={{ width: "100%", marginTop: 16 }}>
          {state.status === "loading" ? <Loader2 className="spin" size={18} aria-hidden="true" /> : <Search size={18} aria-hidden="true" />}
          {state.status === "loading" ? "खोज रहे हैं..." : "प्रमाणपत्र खोजें"}
        </button>
      </form>

      {state.status === "error" ? (
        <div className="notice notice-error" style={{ marginTop: 18 }}>{state.message}</div>
      ) : null}

      {state.status === "notfound" ? (
        <div className="card" style={{ marginTop: 18 }}>
          <div className="notice notice-error">
            <h2>आपका प्रमाणपत्र अभी उपलब्ध नहीं है।</h2>
            <p>कृपया कुछ समय बाद पुनः प्रयास करें।</p>
          </div>
          <div style={{ marginTop: 18 }}><SupportBox /></div>
        </div>
      ) : null}

      {state.status === "found" ? (
        <div className="card" style={{ marginTop: 18, textAlign: "center" }}>
          <div className="notice notice-success">
            <h2>प्रमाणपत्र उपलब्ध है।</h2>
            <p>पंजीकरण क्रमांक: <strong>{state.record.registrationNumber}</strong></p>
            {state.record.issueDate ? <p>जारी दिनांक: <strong>{state.record.issueDate}</strong></p> : null}
          </div>
          <div className="button-row" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href={state.record.certificateUrl} target="_blank" rel="noreferrer">
              <ExternalLink size={18} aria-hidden="true" />
              प्रमाणपत्र देखें
            </a>
            <a className="btn btn-accent" href={state.record.downloadUrl || state.record.certificateUrl} target="_blank" rel="noreferrer">
              <Download size={18} aria-hidden="true" />
              प्रमाणपत्र डाउनलोड करें
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
