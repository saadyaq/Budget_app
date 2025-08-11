# Budget App 💰

Une application moderne de gestion de budget personnel construite avec React, TypeScript et Tailwind CSS.

## ✨ Fonctionnalités

### Core
- **Dashboard** avec métriques clés et graphiques interactifs
- **Gestion des transactions** : CRUD complet avec filtrage et recherche
- **Catégories dynamiques** : système de catégorisation flexible
- **Budgets intelligents** : suivi avec alertes de dépassement
- **Mode sombre/clair** avec persistance

### Fonctionnalités avancées
- **PWA** : Installation sur mobile et mode offline
- **Responsive design** : parfaitement optimisé mobile-first
- **Animations fluides** : micro-interactions et transitions
- **Stockage local** : synchronisation automatique
- **Import/Export** : sauvegarde des données

## 🚀 Installation et lancement

### Prérequis
- Node.js 20+ 
- npm ou yarn

### Installation
```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build pour production
npm run build

# Prévisualiser la build
npm run preview
```

## 📱 Utilisation mobile

Cette application est conçue comme une PWA (Progressive Web App) :

1. **Installation sur mobile** :
   - Ouvrez l'app dans votre navigateur mobile
   - Appuyez sur "Ajouter à l'écran d'accueil"
   - L'app s'installera comme une app native

2. **Mode offline** :
   - Toutes les données sont stockées localement
   - L'app fonctionne sans connexion internet
   - Synchronisation automatique au retour en ligne

## 🏗️ Architecture

```
src/
├── components/
│   ├── ui/           # Composants réutilisables
│   ├── charts/       # Graphiques et visualisations
│   └── layout/       # Layout et navigation
├── features/
│   ├── transactions/ # Logique métier transactions
│   ├── budgets/      # Logique métier budgets
│   └── dashboard/    # Logique métier dashboard
├── hooks/            # Custom hooks
├── stores/           # État global Zustand
├── utils/            # Utilitaires et helpers
└── types/            # Types TypeScript
```

## 🛠️ Technologies

- **Frontend** : React 18 + TypeScript + Vite
- **Styling** : Tailwind CSS
- **État** : Zustand
- **Stockage** : localStorage
- **Icons** : Lucide React
- **PWA** : Vite PWA Plugin
- **Formulaires** : React Hook Form

## 🎯 Utilisation

### Première utilisation
1. Ajoutez vos premières transactions via le bouton "+"
2. Créez des budgets pour vos catégories principales
3. Consultez le dashboard pour voir vos métriques
4. Installez l'app sur votre mobile pour un accès rapide

### Gestion quotidienne
- Ajoutez vos transactions au fil de la journée
- Consultez vos budgets pour éviter les dépassements
- Analysez vos habitudes via le dashboard
- Exportez vos données pour sauvegarde

## 📊 Métriques disponibles

- Revenus/Dépenses du mois
- Solde mensuel et total
- Répartition par catégorie
- Historique des transactions
- Suivi des budgets avec alertes

## 🚀 Déploiement

### GitHub Pages
```bash
npm run build
# Déployez le contenu de dist/ sur GitHub Pages
```

### Vercel
```bash
# Connectez votre repo à Vercel
# Le déploiement se fait automatiquement
```

### Netlify
```bash
# Glissez-déposez le dossier dist/ sur Netlify
# Ou connectez votre repo pour un déploiement automatique
```

## 📱 Support mobile

Optimisé pour :
- iOS Safari
- Android Chrome
- Mode portrait/paysage
- Interactions tactiles
- Performance mobile

Installez l'application sur votre téléphone pour la meilleure expérience !

---

Développé avec ❤️ et Claude Code
