"use client";

import { useEffect, useMemo, useState } from "react";
import { financePulse, homePulse, kpiCards, priorities, routines, todayTasks } from "@/lib/mock-data";

type DashboardStats = {
  taskDone: number;
  taskTotal: number;
  txCount: number;
};

export default function TodayPage() {
  const [stats, setStats] = useState<DashboardStats>({ taskDone: 0, taskTotal: todayTasks.length, txCount: 0 });

  useEffect(() => {
    const storedTasks = window.localStorage.getItem("lifeos.tasks");
    const storedTx = window.localStorage.getItem("lifeos.transactions");

    const parsedTasks = storedTasks ? (JSON.parse(storedTasks) as { done: boolean }[]) : todayTasks;
    const parsedTx = storedTx ? (JSON.parse(storedTx) as unknown[]) : [];

    setStats({
      taskDone: parsedTasks.filter((task) => task.done).length,
      taskTotal: parsedTasks.length,
      txCount: parsedTx.length
    });
  }, []);

  const dashboardCards = useMemo(
    () =>
      kpiCards.map((card) => {
        if (card.label === "Tâches complétées") {
          return { ...card, value: `${stats.taskDone}/${stats.taskTotal}`, trend: "synchronisé" };
        }
        if (card.label === "Cashflow MTD") {
          return { ...card, trend: `${stats.txCount} transactions` };
        }
        return card;
      }),
    [stats.taskDone, stats.taskTotal, stats.txCount]
  );

  return (
    <section className="stack page-enter">
      <article className="grid-inline">
        {dashboardCards.map((kpi) => (
          <div key={kpi.label} className="card card-kpi">
            <p className="mini-label">{kpi.label}</p>
            <p className="kpi-value">{kpi.value}</p>
            <p className="kpi-trend">{kpi.trend}</p>
          </div>
        ))}
      </article>

      <section className="grid-two">
        <div className="stack">
          <article className="card">
            <h2>Top 3 priorités</h2>
            <ul className="list-clean">
              {priorities.map((p, index) => (
                <li key={p}>
                  <span className="pill">#{index + 1}</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="card">
            <div className="card-header-row">
              <h2>Tasks du jour</h2>
              <span className="pill">
                {stats.taskDone}/{stats.taskTotal} done
              </span>
            </div>
            <ul className="list-clean">
              {todayTasks.map((task) => (
                <li key={task.title}>
                  <span>{task.done ? "✅" : "⬜"}</span>
                  <span>{task.title}</span>
                  <span className="pill muted">{task.priority}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="card">
            <h2>Routine checklist</h2>
            <ul className="list-clean">
              {routines.map((r) => (
                <li key={r}>
                  <span>•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="stack">
          <article className="card">
            <h2>Money pulse</h2>
            <div className="metric-grid">
              <p>
                Entrées: <strong>{financePulse.cashIn} €</strong>
              </p>
              <p>
                Sorties: <strong>{financePulse.cashOut} €</strong>
              </p>
              <p>
                Factures à venir: <strong>{financePulse.dueBills}</strong>
              </p>
              <p>
                Prochaine facture: <strong>{financePulse.nextBillAmount} €</strong>
              </p>
              <p>
                Runway: <strong>{financePulse.runwayDays} jours</strong>
              </p>
            </div>
          </article>

          <article className="card">
            <h2>Home pulse</h2>
            <p>{homePulse.status}</p>
            <p>{homePulse.occupancy}</p>
            <p>Température: {homePulse.temperature}</p>
            <p>Énergie: {homePulse.energy}</p>
            <ul className="list-clean">
              {homePulse.alerts.map((alert) => (
                <li key={alert}>⚠️ {alert}</li>
              ))}
            </ul>
          </article>

          <article className="card highlight">
            <h2>Decide now</h2>
            <ul className="list-clean">
              <li>1) Fermer la fenêtre chambre</li>
              <li>2) Catégoriser 5 transactions en attente</li>
              <li>3) Bloquer 90 min focus demain à 09:00</li>
            </ul>
          </article>
        </div>
      </section>
    </section>
  );
}
