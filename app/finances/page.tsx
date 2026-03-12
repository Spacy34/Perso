"use client";

import { FormEvent, useMemo, useState } from "react";
import { useLocalStorage } from "@/lib/use-local-storage";

type Tx = {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: string;
};

const defaultTransactions: Tx[] = [
  { id: "x1", date: "2026-03-10", merchant: "Carrefour", amount: -62.4, category: "Alimentation" },
  { id: "x2", date: "2026-03-10", merchant: "Salaire", amount: 2800, category: "Revenu" },
  { id: "x3", date: "2026-03-09", merchant: "Netflix", amount: -13.49, category: "Subscription" }
];

export default function FinancesPage() {
  const { value: transactions, setValue: setTransactions, ready } = useLocalStorage<Tx[]>(
    "lifeos.transactions",
    defaultTransactions
  );
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Divers");
  const [filter, setFilter] = useState("Toutes");

  const categories = useMemo(
    () => ["Toutes", ...new Set(transactions.map((tx) => tx.category))],
    [transactions]
  );

  const filtered = useMemo(
    () => transactions.filter((tx) => filter === "Toutes" || tx.category === filter),
    [filter, transactions]
  );

  const metrics = useMemo(() => {
    const income = transactions.filter((tx) => tx.amount > 0).reduce((a, b) => a + b.amount, 0);
    const expense = transactions
      .filter((tx) => tx.amount < 0)
      .reduce((a, b) => a + Math.abs(b.amount), 0);
    return {
      income,
      expense,
      cashflow: income - expense
    };
  }, [transactions]);

  function addTransaction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = Number(amount.replace(",", "."));
    if (!merchant.trim() || Number.isNaN(parsed) || parsed === 0) {
      return;
    }

    setTransactions([
      {
        id: `x-${Date.now()}`,
        merchant: merchant.trim(),
        amount: parsed,
        category,
        date: new Date().toISOString().slice(0, 10)
      },
      ...transactions
    ]);
    setMerchant("");
    setAmount("");
  }

  function removeTx(txId: string) {
    setTransactions(transactions.filter((tx) => tx.id !== txId));
  }

  if (!ready) {
    return <section className="card">Chargement des finances...</section>;
  }

  return (
    <section className="stack page-enter">
      <article className="card grid-inline">
        <div>
          <p className="mini-label">Entrées</p>
          <strong className="kpi-value">{metrics.income.toFixed(2)} €</strong>
        </div>
        <div>
          <p className="mini-label">Sorties</p>
          <strong className="kpi-value">{metrics.expense.toFixed(2)} €</strong>
        </div>
        <div>
          <p className="mini-label">Cashflow</p>
          <strong className="kpi-value">{metrics.cashflow.toFixed(2)} €</strong>
        </div>
        <div>
          <p className="mini-label">Transactions</p>
          <strong className="kpi-value">{transactions.length}</strong>
        </div>
      </article>

      <article className="card">
        <form className="form-grid" onSubmit={addTransaction}>
          <input
            className="search-input"
            placeholder="Libellé"
            value={merchant}
            onChange={(event) => setMerchant(event.target.value)}
          />
          <input
            className="search-input"
            placeholder="Montant (ex: -12.50)"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <input
            className="search-input"
            placeholder="Catégorie"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
          <button className="button-primary" type="submit">
            + Ajouter transaction
          </button>
        </form>
      </article>

      <article className="card card-header-row">
        <h3>Transactions récentes</h3>
        <select className="select-input" value={filter} onChange={(event) => setFilter(event.target.value)}>
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </article>

      <article className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Libellé</th>
              <th>Montant</th>
              <th>Catégorie</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.date}</td>
                <td>{tx.merchant}</td>
                <td className={tx.amount >= 0 ? "positive" : "negative"}>{tx.amount.toFixed(2)} €</td>
                <td>{tx.category}</td>
                <td>
                  <button className="danger-button" type="button" onClick={() => removeTx(tx.id)}>
                    Suppr.
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
