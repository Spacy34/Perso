import {
  financePulse,
  homePulse,
  priorities,
  routines,
  todayTasks
} from "@/lib/mock-data";

export default function TodayPage() {
  return (
    <section className="grid-two">
      <div className="stack">
        <article className="card">
          <h2>Top 3 priorités</h2>
          <ul>
            {priorities.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h2>Tasks du jour</h2>
          <ul>
            {todayTasks.map((task) => (
              <li key={task.title}>
                <span>{task.done ? "✅" : "⬜"}</span> {task.title}
              </li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h2>Routine checklist</h2>
          <ul>
            {routines.map((r) => (
              <li key={r}>• {r}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className="stack">
        <article className="card">
          <h2>Money pulse</h2>
          <p>Entrées: {financePulse.cashIn} €</p>
          <p>Sorties: {financePulse.cashOut} €</p>
          <p>Factures à venir: {financePulse.dueBills}</p>
          <p>Prochaine facture: {financePulse.nextBillAmount} €</p>
        </article>

        <article className="card">
          <h2>Home pulse</h2>
          <p>{homePulse.status}</p>
          <p>Température: {homePulse.temperature}</p>
          <p>Énergie: {homePulse.energy}</p>
          <ul>
            {homePulse.alerts.map((alert) => (
              <li key={alert}>⚠️ {alert}</li>
            ))}
          </ul>
        </article>

        <article className="card highlight">
          <h2>Decide now</h2>
          <p>1) Fermer la fenêtre chambre</p>
          <p>2) Catégoriser 5 transactions en attente</p>
          <p>3) Bloquer 90 min focus demain 9h</p>
        </article>
      </div>
    </section>
  );
}
