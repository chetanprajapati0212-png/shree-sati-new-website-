import { Mail, Phone } from "lucide-react";
import { admin } from "@/lib/site";

export function SupportBox() {
  return (
    <div className="support-box">
      <strong>सहायता हेतु संपर्क करें:</strong>
      <p><Phone size={16} aria-hidden="true" /> मोबाइल: <a href={`tel:${admin.mobile}`}>{admin.mobile}</a></p>
      <p><Mail size={16} aria-hidden="true" /> ईमेल: <a href={`mailto:${admin.email}`}>{admin.email}</a></p>
    </div>
  );
}
