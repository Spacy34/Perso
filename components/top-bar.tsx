"use client";

import Link from "next/link";
import { useMemo } from "react";

export function TopBar() {
  const todayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("fr-FR", {
        weekday: "long",
        day: "2-digit",
        month: "long"
      }).format(new Date()),
    []
  );

  return (
    <header className="topbar">
      <div>
        <h1>Personal Life OS</h1>
        <p>{todayLabel} — Décide vite, exécute calmement.</p>
      </div>

      <div className="topbar-actions">
        <input
          className="search-input"
          placeholder="Rechercher une tâche, note, transaction..."
          aria-label="Recherche globale"
        />
        <button className="button-secondary" type="button">
          + Quick Add
        </button>
        <Link className="button-primary" href="/reviews">
          Weekly Review
        </Link>
      </div>
    </header>
  );
}
