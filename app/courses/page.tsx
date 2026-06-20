import Link from "next/link";
import { courses } from "@/lib/site";

export default function CoursesPage() {
  return (
    <>
      <section className="page-title">
        <div className="container">
          <h1>प्रशिक्षण पाठ्यक्रम</h1>
          <p>आधुनिक और वैज्ञानिक तरीकों पर आधारित व्यावहारिक प्रशिक्षण पाठ्यक्रम।</p>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          {courses.map((course) => (
            <article className="card course-card" key={course.id}>
              <span className="course-badge">{course.shortTitle}</span>
              <h2>{course.title}</h2>
              <p className="hint">{course.description}</p>
              <ul className="check-list">
                {course.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <Link className="btn btn-primary" href={`/register?course=${course.id}`} style={{ marginTop: 24 }}>
                इस पाठ्यक्रम हेतु पंजीकरण करें
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
