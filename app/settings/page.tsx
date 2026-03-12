export default function SettingsPage() {
  return (
    <section className="stack">
      <h2>Settings & Rules</h2>
      <article className="card">
        <h3>Règles finance</h3>
        <p>Exemple: Si marchand contient "NETFLIX" → catégorie "Subscription".</p>
      </article>
      <article className="card">
        <h3>Intégrations</h3>
        <ul>
          <li>Home Assistant: connecté (token chiffré)</li>
          <li>Import CSV banque: actif</li>
          <li>Email alerts: actif</li>
        </ul>
      </article>
    </section>
  );
}
