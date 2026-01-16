# 🎬 Film Manager

Une application web moderne pour gérer votre collection de films, développée avec React.js et Redux Toolkit.

## ✨ Fonctionnalités

### 🎯 Gestion des Films
- **Parcourir les films populaires** depuis l'API TMDb
- **Rechercher des films** par titre
- **Voir les détails** complets des films (acteurs, synopsis, notes)
- **Ajouter des films personnalisés** à votre collection locale

### ❤️ Système de Favoris
- **Ajouter/retirer des favoris** en un clic
- **Persistance automatique** dans localStorage
- **Collection personnelle** accessible depuis la page "Favoris"

### 🎨 Interface Moderne
- **Design responsive** et élégant
- **Thème beige et blanc** harmonieux
- **Animations fluides** et transitions
- **Interface intuitive** et facile à utiliser

## 🛠️ Technologies Utilisées

### Frontend
- **React.js** - Framework JavaScript moderne
- **Redux Toolkit** - Gestion d'état centralisée
- **React Router** - Navigation entre les pages

### API
- **TMDb API** - Base de données de films
- **LocalStorage** - Persistance des données locales

## 📁 Structure du Projet

```
film-manager/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation principale
│   │   ├── LoadingSpinner.jsx  # Spinner de chargement
│   │   └── MovieCard.jsx       # Carte de film
│   ├── pages/
│   │   ├── AddMovie.jsx        # Formulaire d'ajout
│   │   ├── Favorites.jsx       # Page des favoris
│   │   ├── Home.jsx            # Page d'accueil
│   │   ├── MovieDetails.jsx    # Détails du film
│   │   └── Search.jsx          # Page de recherche
│   ├── store/
│   │   └── movieSlice.js       # Redux store
│   ├── App.jsx                 # Application principale
│   └── index.js                # Point d'entrée
├── package.json
└── README.md
```

## 🚀 Installation

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

### Étapes

1. **Cloner le projet**
```bash
git clone <repository-url>
cd film-manager
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer l'application**
```bash
npm start
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 📖 Utilisation

### Navigation
- **Accueil** : Découvrir les films populaires
- **Recherche** : Trouver des films spécifiques
- **Favoris** : Voir votre collection personnelle
- **Ajouter** : Ajouter un film personnalisé

### Ajouter un Film Personnalisé
1. Cliquez sur "Ajouter" dans la navigation
2. Remplissez le formulaire :
   - **Titre** (obligatoire)
   - **Description** (obligatoire)
   - **Date de sortie** (optionnel)
3. Cliquez sur "Ajouter le film"

### Gestion des Favoris
- **Ajouter aux favoris** : Cliquez sur le cœur 🤍 sur une carte de film
- **Retirer des favoris** : Cliquez sur le cœur ❤️ sur une carte de film
- **Vider tout** : Bouton "Vider tout" sur la page des favoris

## 🎨 Personnalisation

### Thème
L'application utilise un thème beige et blanc moderne. Les couleurs principales sont :
- **Beige** : `#faf8f5`, `#f7f3e9`, `#e8dcc6`
- **Brun** : `#8b7355`, `#a0826d`
- **Vert** : `#10b981` (notes élevées)
- **Jaune** : `#eab308` (notes moyennes)
- **Rouge** : `#ef4444` (notes basses)

### Responsive Design
L'application est entièrement responsive :
- **Desktop** : Mise en page complète avec sidebar
- **Tablet** : Adaptation automatique
- **Mobile** : Interface optimisée pour tactile

## 🔧 Configuration

### TMDb API
L'application utilise l'API TMDb gratuite. Aucune configuration requise.

### Persistance
Les favoris sont automatiquement sauvegardés dans le localStorage du navigateur.

## 🐛 Dépannage

### Problèmes Communs
1. **Films ne s'affichent pas** : Vérifiez votre connexion internet
2. **Favoris disparus** : Vérifiez que le localStorage n'est pas vidé
3. **Recherche ne fonctionne pas** : Essayez avec des termes plus simples

### Console Errors
Ouvrez la console (F12) pour voir les erreurs détaillées.

## 🤝 Contribuer

Développé  par **Saad**

### Améliorations Possibles
- [ ] Ajouter des catégories/genres
- [ ] Système de notation personnalisé
- [ ] Partage de collections
- [ ] Mode sombre
- [ ] Application mobile



---

**Développé par Saad**  
*Application de gestion de films moderne et élégante* 🎬✨
