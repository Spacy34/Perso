const blocks = [
  ["09:00–10:30", "Focus principal", "Projet personnel"],
  ["12:30–12:45", "Routine finance", "Catégorisation dépenses"],
  ["18:00–18:15", "Home check", "Capteurs et alertes"],
  ["20:30–20:45", "Shutdown", "Préparation du lendemain"]
];

export default function PlannerPage() {
  return (
    <section className="stack page-enter">
      <h2>Planner hebdomadaire</h2>

      <article className="card">
        <h3>Thème des journées</h3>
        <div className="grid-three">
          <div className="card-soft"><strong>Lundi</strong><p>Admin + finances</p></div>
          <div className="card-soft"><strong>Mardi</strong><p>Deep work projet</p></div>
          <div className="card-soft"><strong>Mercredi</strong><p>Maison + maintenance</p></div>
          <div className="card-soft"><strong>Jeudi</strong><p>Learning</p></div>
          <div className="card-soft"><strong>Vendredi</strong><p>Weekly review</p></div>
          <div className="card-soft"><strong>Week-end</strong><p>Vie perso + reset</p></div>
        </div>
      </article>

      <article className="card">
        <h3>Time blocks recommandés</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Heure</th>
              <th>Bloc</th>
              <th>Objectif</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map(([hour, block, goal]) => (
              <tr key={hour}>
                <td>{hour}</td>
                <td>{block}</td>
                <td>{goal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
