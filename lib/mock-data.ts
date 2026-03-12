export const priorities = [
  "Bloquer 90 min de focus profond",
  "Clôturer 2 tâches admin en retard",
  "Revoir les dépenses du jour avant 20h"
];

export const todayTasks = [
  { title: "Appeler assurance habitation", done: false, priority: "High" },
  { title: "Importer relevé CB (CSV)", done: true, priority: "Medium" },
  { title: "Confirmer abonnement internet", done: false, priority: "Low" },
  { title: "Mettre à jour le budget alimentation", done: false, priority: "High" }
];

export const routines = [
  "Hydratation + vitamines",
  "5 minutes de reset planning",
  "Revue cash-flow rapide",
  "Check capteurs critiques maison"
];

export const financePulse = {
  cashIn: 3200,
  cashOut: 1870,
  dueBills: 2,
  nextBillAmount: 84,
  runwayDays: 41
};

export const homePulse = {
  status: "Away mode actif",
  alerts: ["Fenêtre chambre ouverte", "Batterie capteur cuisine < 20%"],
  temperature: "24.1°C",
  energy: "2.7 kWh (aujourd'hui)",
  occupancy: "0 personne à la maison"
};

export const kpiCards = [
  { label: "Score de journée", value: "78/100", trend: "+6 vs hier" },
  { label: "Tâches complétées", value: "9", trend: "3 restantes" },
  { label: "Cashflow MTD", value: "+1 330€", trend: "stable" },
  { label: "Alertes critiques", value: "2", trend: "à traiter" }
];
