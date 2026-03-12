"use client";

import { useEffect, useState } from "react";

type ReviewStats = {
  doneTasks: number;
  totalTasks: number;
  income: number;
  expense: number;
};

export default function ReviewsPage() {
  const [stats, setStats] = useState<ReviewStats>({
    doneTasks: 0,
    totalTasks: 0,
    income: 0,
    expense: 0
  });

  useEffect(() => {
    const rawTasks = window.localStorage.getItem("lifeos.tasks");
    const rawTransactions = window.localStorage.getItem("lifeos.transactions");

    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as { done: boolean }[]) : [];
    const parsedTx = rawTransactions ? (JSON.parse(rawTransactions) as { amount: number }[]) : [];

    const doneTasks = parsedTasks.filter((task) => task.done).length;
    const income = parsedTx.filter((tx) => tx.amount > 0).reduce((sum, tx) => sum + tx.amount, 0);
    const expense = parsedTx
      .filter((tx) => tx.amount < 0)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    setStats({
      doneTasks,
      totalTasks: parsedTasks.length,
      income,
      expense
    });
  }, []);

  const completionRate =
    stats.totalTasks === 0 ? 0 : Math.round((stats.doneTasks / stats.totalTasks) * 100);

  return (
    <section className="stack page-enter">
      <article className="card">
        <h2>Weekly Review</h2>
        <p className="muted-text">Rituel de reset hebdomadaire (20–30 min).</p>
      </article>

      <article className="card grid-inline">
        <div>
          <p className="mini-label">Tâches terminées</p>
          <p className="kpi-value">
            {stats.doneTasks}/{stats.totalTasks}
          </p>
        </div>
        <div>
          <p className="mini-label">Taux de complétion</p>
          <p className="kpi-value">{completionRate}%</p>
        </div>
        <div>
          <p className="mini-label">Entrées semaine</p>
          <p className="kpi-value">{stats.income.toFixed(2)} €</p>
        </div>
        <div>
          <p className="mini-label">Sorties semaine</p>
          <p className="kpi-value">{stats.expense.toFixed(2)} €</p>
        </div>
      </article>

      <article className="card">
        <h3>Checklist</h3>
        <ul className="list-clean">
          <li>{completionRate >= 60 ? "✅" : "⬜"} Tâches clôturées et reportées</li>
          <li>{stats.expense <= stats.income ? "✅" : "⬜"} Budget global sous contrôle</li>
          <li>⬜ Maintenance maison vérifiée</li>
          <li>⬜ Top 3 priorités semaine prochaine</li>
        </ul>
      </article>
    </section>
  );
}
