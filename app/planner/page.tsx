export default function PlannerPage() {
  return (
    <section className="stack">
      <h2>Planner</h2>
      <article className="card">
        <h3>Semaine en cours</h3>
        <p>Lundi: Admin + finances</p>
        <p>Mardi: Focus projet personnel</p>
        <p>Mercredi: Maison et maintenance</p>
        <p>Jeudi: Learning</p>
        <p>Vendredi: Weekly review</p>
      </article>
      <article className="card">
        <h3>Time blocks recommandés</h3>
        <ul>
          <li>09:00–10:30 Focus principal</li>
          <li>12:30–12:45 Routine finances</li>
          <li>18:00–18:15 Revue maison</li>
        </ul>
      </article>
    </section>
  );
}
