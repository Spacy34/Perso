# Perso Life OS

Un tableau de bord personnel (desktop-first) pour piloter :
- tes priorités quotidiennes,
- tes tâches/routines,
- ta planification,
- tes finances,
- ton état maison (Home Assistant-ready).

## Stack
- Next.js 14
- React 18
- TypeScript

## Lancer le projet en local

### 1) Prérequis
- Node.js 20+
- npm 10+

### 2) Installer les dépendances
```bash
npm install
```

### 3) Démarrer en mode développement
```bash
npm run dev
```

Puis ouvre :
- `http://localhost:3000`

## Commandes utiles

```bash
npm run dev     # serveur de dev
npm run build   # build de production
npm run start   # lance le build
npm run lint    # vérification lint
```


## Fonctionnalités déjà fonctionnelles
- **Tasks**: ajout, suppression, toggle done, organisation Inbox/Today/Upcoming (persisté en localStorage).
- **Finances**: ajout/suppression de transactions, filtre par catégorie, KPIs calculés en direct (persisté en localStorage).
- **Home**: toggles mode/sécurité et journal d’actions.
- **Notes**: création/suppression de notes persistées.
- **Reviews**: métriques calculées depuis les données locales Tasks/Finances.


## Résoudre le message "This branch has conflicts that must be resolved"

Si GitHub refuse le push/merge à cause de conflits:

1. Récupère la branche de base (souvent `main`)
```bash
git fetch origin
```

2. Rebase ta branche dessus
```bash
git rebase origin/main
```

3. Résous chaque conflit (fichiers marqués `<<<<<<<`, `=======`, `>>>>>>>`), puis:
```bash
git add <fichier_resolu>
git rebase --continue
```

4. Une fois le rebase terminé:
```bash
git push --force-with-lease
```

Tu peux aussi utiliser le script helper inclus:
```bash
./scripts/rebase-main.sh
```

## Structure principale
- `app/` : routes/pages Next.js
- `components/` : composants UI partagés
- `lib/mock-data.ts` : données mock pour l'UI

## Prochaine étape recommandée
Connecter un vrai backend (Postgres + Prisma) pour remplacer les données mock.
