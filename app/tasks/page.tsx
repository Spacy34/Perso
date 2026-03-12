const tasks = [
  { section: "Inbox", items: ["Préparer déclaration impôts", "Commander filtre HVAC"] },
  { section: "Today", items: ["Payer facture eau", "Réviser budget alimentation"] },
  { section: "Upcoming", items: ["Contrôle voiture", "Planification semaine prochaine"] }
];

export default function TasksPage() {
  return (
    <section className="stack">
      <h2>Tasks & Routines</h2>
      {tasks.map((group) => (
        <article key={group.section} className="card">
          <h3>{group.section}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item}>⬜ {item}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
