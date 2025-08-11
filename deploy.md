# Guide de Déploiement - Budget App

## 🚀 Déploiements Supportés

### 1. Vercel (Recommandé)
```bash
# Installation de Vercel CLI
npm i -g vercel

# Déploiement
vercel --prod
```

### 2. Netlify
```bash
# Build
npm run build

# Glissez-déposez le dossier dist/ sur https://drop.netlify.com
# Ou utilisez Netlify CLI:
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### 3. GitHub Pages
```bash
# Build
npm run build

# Copiez le contenu de dist/ dans votre repo GitHub Pages
# Assurez-vous que l'option "GitHub Pages" est activée dans les paramètres du repo
```

### 4. Firebase Hosting
```bash
# Installation
npm i -g firebase-tools

# Initialisation
firebase init hosting

# Configuration dans firebase.json:
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{"source": "**", "destination": "/index.html"}]
  }
}

# Déploiement
firebase deploy
```

## 📱 Configuration PWA

L'application est déjà configurée comme PWA :
- Service Worker automatique
- Manifest.json généré
- Cache offline
- Installable sur mobile

## 🔧 Variables d'Environnement

Aucune variable d'environnement requise - l'app utilise le localStorage.

## ✅ Checklist avant déploiement

- [ ] `npm run build` réussit
- [ ] Testez l'application en local avec `npm run preview`
- [ ] Vérifiez que toutes les fonctionnalités marchent
- [ ] Testez l'installation PWA sur mobile
- [ ] Vérifiez le mode offline

## 📊 Optimisations

L'application est optimisée pour :
- Bundle splitting automatique
- Tree shaking
- Compression gzip
- Cache des assets
- Lazy loading des composants

## 🐛 Dépannage

### Build échoue
- Vérifiez Node.js >= 18
- `rm -rf node_modules && npm install`
- `npm run build`

### PWA ne s'installe pas
- Vérifiez HTTPS (requis pour PWA)
- Ouvrez les DevTools > Application > Manifest
- Vérifiez que le Service Worker est enregistré

### Performance lente
- Activez la compression gzip sur votre serveur
- Vérifiez que les assets sont mis en cache
- Utilisez un CDN si nécessaire

L'application est maintenant prête pour le déploiement ! 🎉