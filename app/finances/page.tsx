const transactions = [
  { date: "2026-03-10", merchant: "Carrefour", amount: "-62.40 €", category: "Alimentation" },
  { date: "2026-03-10", merchant: "Salaire", amount: "+2,800.00 €", category: "Revenu" },
  { date: "2026-03-09", merchant: "Netflix", amount: "-13.49 €", category: "Subscription" }
];

export default function FinancesPage() {
  return (
    <section className="stack">
      <h2>Finances</h2>
      <article className="card grid-inline">
        <div>
          <p>Cashflow mensuel</p>
          <strong>+1,330 €</strong>
        </div>
        <div>
          <p>Factures dues (7 jours)</p>
          <strong>2</strong>
        </div>
        <div>
          <p>Abonnements actifs</p>
          <strong>7</strong>
        </div>
      </article>

      <article className="card">
        <h3>Transactions récentes</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Libellé</th>
              <th>Montant</th>
              <th>Catégorie</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={`${tx.date}-${tx.merchant}-${tx.amount}`}>
                <td>{tx.date}</td>
                <td>{tx.merchant}</td>
                <td>{tx.amount}</td>
                <td>{tx.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
