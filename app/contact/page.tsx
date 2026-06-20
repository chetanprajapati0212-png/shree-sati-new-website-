import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { admin, site } from "@/lib/site";

export default function ContactPage() {
  return (
    <>
      <section className="page-title">
        <div className="container">
          <h1>संपर्क करें</h1>
          <p>किसी भी जानकारी, पंजीकरण या प्रमाणपत्र सहायता के लिए हमसे संपर्क करें।</p>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div className="card">
            <Phone color="#0f4b24" size={34} />
            <h3>मोबाइल नंबर</h3>
            <p><a style={{ color: "#0f4b24", fontSize: "1.45rem", fontWeight: 900 }} href={`tel:${admin.mobile}`}>{admin.mobile}</a></p>
            <p className="hint">कॉल करके प्रशिक्षण या प्रमाणपत्र की जानकारी प्राप्त करें।</p>
          </div>
          <div className="card">
            <Mail color="#0f4b24" size={34} />
            <h3>ईमेल</h3>
            <p><a style={{ color: "#0f4b24", fontWeight: 900, wordBreak: "break-word" }} href={`mailto:${admin.email}`}>{admin.email}</a></p>
            <p className="hint">जरूरी जानकारी ईमेल द्वारा भी भेज सकते हैं।</p>
          </div>
          <div className="card">
            <MessageCircle color="#0f4b24" size={34} />
            <h3>व्हाट्सऐप</h3>
            <p className="hint">जल्दी जवाब पाने के लिए संदेश भेजें।</p>
            <a className="btn btn-primary" href={admin.whatsappUrl} target="_blank" rel="noreferrer" style={{ marginTop: 16 }}>
              व्हाट्सऐप पर संदेश भेजें
            </a>
          </div>
          <div className="card">
            <MapPin color="#0f4b24" size={34} />
            <h3>पता</h3>
            <p><strong>{site.name}</strong></p>
            <p className="hint">{site.location}</p>
          </div>
          <div className="card">
            <Clock color="#0f4b24" size={34} />
            <h3>कार्य समय</h3>
            <p className="hint">सोमवार से शनिवार</p>
            <p><strong>सुबह 9:00 से शाम 6:00</strong></p>
          </div>
        </div>
      </section>
    </>
  );
}
