"use client";

import { FormEvent, useState } from "react";
import { useLocalStorage } from "@/lib/use-local-storage";

type Settings = {
  lowBalanceThreshold: number;
  criticalAlerts: boolean;
  dailyDigestHour: string;
};

const defaultSettings: Settings = {
  lowBalanceThreshold: 100,
  criticalAlerts: true,
  dailyDigestHour: "20:00"
};

export default function SettingsPage() {
  const { value: settings, setValue: setSettings, ready } = useLocalStorage<Settings>(
    "lifeos.settings",
    defaultSettings
  );
  const [saved, setSaved] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  if (!ready) {
    return <section className="card">Chargement des paramètres...</section>;
  }

  return (
    <section className="stack page-enter">
      <article className="card">
        <h2>Settings & Rules</h2>
        <p className="muted-text">Personnalise tes règles, alertes et intégrations.</p>
      </article>

      <article className="card">
        <form className="stack" onSubmit={onSubmit}>
          <label className="label-row">
            Seuil solde faible (€)
            <input
              className="search-input"
              type="number"
              value={settings.lowBalanceThreshold}
              onChange={(event) =>
                setSettings({ ...settings, lowBalanceThreshold: Number(event.target.value) })
              }
            />
          </label>

          <label className="label-row">
            Heure du digest quotidien
            <input
              className="search-input"
              type="time"
              value={settings.dailyDigestHour}
              onChange={(event) => setSettings({ ...settings, dailyDigestHour: event.target.value })}
            />
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={settings.criticalAlerts}
              onChange={(event) =>
                setSettings({ ...settings, criticalAlerts: event.target.checked })
              }
            />
            Activer les alertes critiques
          </label>

          <button className="button-primary" type="submit">
            Sauvegarder
          </button>
          {saved ? <p className="positive">Paramètres sauvegardés.</p> : null}
        </form>
      </article>
    </section>
  );
}
