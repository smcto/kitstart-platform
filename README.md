# Konitys UI Kit (React) — Shell + Design System light/clean

Ce repository fournit un **socle UI cohérent** pour le Hub Konitys + l’ensemble des applications (micro-fronts ou apps séparées), avec une esthétique **claire / clean** et une ergonomie pensée “plateforme”.

Objectifs :
- **Cohérence visuelle** entre toutes les apps (mêmes patterns, mêmes tokens).
- **Navigation plateforme** simple : **Konitys / App ▾** (switcher global).
- **Navigation interne** claire et compréhensible : **sidebar option B** (icône + texte, repliable).
- **Templates réutilisables** : page liste (KPI + filtres + table), page hub, etc.

---

## Fonctionnalités principales

### 1) Topbar plateforme (générique)
- Switcher global **en 1 ligne** : `Konitys / <App> ▾`
- Boutons plateforme (ex : notifications, aide, compte)
- (Optionnel) action primaire contexte

> La topbar est volontairement **générique** et identique partout, afin de renforcer l’effet “plateforme”.

### 2) Switcher d’applications
- Accès à **Konitys Hub**
- **Recherche** (filtrage) d’app dans le switcher
- Sections : **Récentes**, **Favoris**, **Toutes les apps**
- Callback `onSelectApp(name)` pour brancher votre routing / domaines

### 3) Sidebar interne (Option B)
- **Ouverte par défaut** (icône + libellé) → compréhension immédiate
- **Repliable** (rail) pour gagner de la place
- État persisté via `localStorage` (`k_sidebar_collapsed`)

### 4) Templates de pages
- **Hub** : grille d’apps
- **Liste** : KPI + FilterBar + DataTable + StatusPill
- Composants prêts à dupliquer pour “Antennes”, “Stocks”, “Support”, etc.

---

## Stack technique

- React 18
- Vite
- TailwindCSS
- react-router-dom (routes de démo)
- lucide-react (icônes)

---

## Installation & démarrage

Pré-requis : Node.js 18+

```bash
npm install
npm run dev
