export default function HomePage() {
  return (
    <section className="stack">
      <h2>Home Assistant</h2>
      <article className="card grid-inline">
        <div>
          <p>Mode</p>
          <strong>Away</strong>
        </div>
        <div>
          <p>Sécurité</p>
          <strong>Armée</strong>
        </div>
        <div>
          <p>Temp. salon</p>
          <strong>24.1°C</strong>
        </div>
        <div>
          <p>Énergie du jour</p>
          <strong>2.7 kWh</strong>
        </div>
      </article>

      <article className="card">
        <h3>Actions rapides</h3>
        <div className="actions-row">
          <button className="button-secondary" type="button">Scene: Good Night</button>
          <button className="button-secondary" type="button">All Lights Off</button>
          <button className="button-secondary" type="button">Refresh States</button>
        </div>
      </article>

      <article className="card">
        <h3>Alertes maison</h3>
        <ul>
          <li>⚠️ Fenêtre chambre ouverte depuis 2h</li>
          <li>⚠️ Capteur cuisine batterie faible</li>
        </ul>
      </article>
    </section>
  );
}
