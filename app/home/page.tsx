"use client";

import { useLocalStorage } from "@/lib/use-local-storage";

type HomeState = {
  mode: "Home" | "Away";
  security: "Armée" | "Désarmée";
  temperature: number;
  energyKwh: number;
  actionLog: string[];
};

const initialState: HomeState = {
  mode: "Away",
  security: "Armée",
  temperature: 24.1,
  energyKwh: 2.7,
  actionLog: ["Système initialisé"]
};

export default function HomePage() {
  const { value: state, setValue: setState, ready } = useLocalStorage<HomeState>("lifeos.home", initialState);

  function appendLog(prev: HomeState, message: string): HomeState {
    return {
      ...prev,
      actionLog: [`${new Date().toLocaleTimeString("fr-FR")} — ${message}`, ...prev.actionLog].slice(0, 8)
    };
  }

  function toggleMode() {
    setState((prev) => {
      const nextMode = prev.mode === "Away" ? "Home" : "Away";
      return appendLog({ ...prev, mode: nextMode }, `Mode changé: ${nextMode}`);
    });
  }

  function toggleSecurity() {
    setState((prev) => {
      const next = prev.security === "Armée" ? "Désarmée" : "Armée";
      return appendLog({ ...prev, security: next }, `Sécurité: ${next}`);
    });
  }

  function triggerScene(sceneName: string) {
    setState((prev) => appendLog(prev, `Scene exécutée: ${sceneName}`));
  }

  if (!ready) {
    return <section className="card">Chargement Home...</section>;
  }

  return (
    <section className="stack page-enter">
      <article className="card grid-inline">
        <div>
          <p className="mini-label">Mode</p>
          <strong className="kpi-value">{state.mode}</strong>
        </div>
        <div>
          <p className="mini-label">Sécurité</p>
          <strong className="kpi-value">{state.security}</strong>
        </div>
        <div>
          <p className="mini-label">Temp. salon</p>
          <strong className="kpi-value">{state.temperature.toFixed(1)}°C</strong>
        </div>
        <div>
          <p className="mini-label">Énergie du jour</p>
          <strong className="kpi-value">{state.energyKwh.toFixed(1)} kWh</strong>
        </div>
      </article>

      <article className="card card-header-row">
        <h3>Actions rapides</h3>
        <div className="actions-row">
          <button className="button-secondary" type="button" onClick={toggleMode}>
            Toggle mode
          </button>
          <button className="button-secondary" type="button" onClick={toggleSecurity}>
            Toggle sécurité
          </button>
          <button className="button-secondary" type="button" onClick={() => triggerScene("Good Night")}>
            Scene: Good Night
          </button>
          <button className="button-secondary" type="button" onClick={() => triggerScene("All Lights Off")}>
            All Lights Off
          </button>
        </div>
      </article>

      <section className="grid-two">
        <article className="card">
          <h3>Alertes maison</h3>
          <ul className="list-clean">
            <li>⚠️ Fenêtre chambre ouverte depuis 2h</li>
            <li>⚠️ Capteur cuisine batterie faible</li>
          </ul>
        </article>
        <article className="card">
          <h3>Historique actions</h3>
          <ul className="list-clean">
            {state.actionLog.map((log) => (
              <li key={log}>{log}</li>
            ))}
          </ul>
        </article>
      </section>
    </section>
  );
}
