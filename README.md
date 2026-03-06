# 🏥 MUNASEB - Site Web de Préinscription

Site web de préinscription pour la **Mutuelle Nationale de Santé des Étudiants du Burkina Faso**.

---

## 📋 Fonctionnalités

- ✅ Page d'accueil professionnelle avec animations
- ✅ Formulaire de préinscription en 3 étapes
- ✅ Interface d'administration pour gérer les inscriptions
- ✅ Export des données en CSV
- ✅ Design responsive (mobile-first)
- ✅ Base de données SQLite

---

## 🚀 Déploiement

### Option 1 : Railway (Recommandé - Supporte SQLite)

Railway supporte SQLite nativement, c'est l'option la plus simple.

#### Étapes :

1. **Créer un compte Railway**
   - Allez sur [railway.app](https://railway.app)
   - Connectez-vous avec GitHub

2. **Pousser le code sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - MUNASEB"
   git branch -M main
   git remote add origin https://github.com/VOTRE-USERNAME/munaseb.git
   git push -u origin main
   ```

3. **Déployer sur Railway**
   - Cliquez "New Project"
   - Sélectionnez "Deploy from GitHub repo"
   - Choisissez votre repository
   - Railway détecte automatiquement Next.js

4. **Votre site est en ligne !**
   - Railway vous donne une URL type : `https://munaseb.up.railway.app`

---

### Option 2 : Vercel (Gratuit - Nécessite configuration DB)

Vercel est gratuit mais ne supporte pas SQLite. Il faut utiliser une DB externe.

#### Étapes :

1. **Créer un compte Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec GitHub

2. **Importer le projet**
   - Cliquez "New Project"
   - Importez votre repository GitHub

3. **Configurer la base de données**
   - Utilisez [Turso](https://turso.tech) (gratuit) pour SQLite dans le cloud
   - Ou utilisez [Vercel Postgres](https://vercel.com/storage/postgres)

4. **Déployer**
   - Cliquez "Deploy"
   - Votre site est en ligne !

---

## 🔧 Développement Local

```bash
# Installer les dépendances
bun install

# Générer le client Prisma
bunx prisma generate

# Lancer le serveur de développement
bun run dev
```

---

## 📁 Structure du Projet

```
munaseb/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Page d'accueil
│   │   ├── preinscription/   # Formulaire préinscription
│   │   ├── admin/            # Interface admin
│   │   └── api/              # API routes
│   └── components/           # Composants UI
├── prisma/
│   └── schema.prisma         # Schéma base de données
├── public/
│   └── images/               # Images du site
└── db/
    └── custom.db             # Base de données SQLite
```

---

## 📱 Pages

| Page | URL | Description |
|------|-----|-------------|
| Accueil | `/` | Page principale |
| Préinscription | `/preinscription` | Formulaire d'inscription |
| Admin | `/admin` | Gestion des préinscriptions |

---

## 🛠️ Technologies

- **Framework** : Next.js 15
- **Styling** : Tailwind CSS
- **UI** : shadcn/ui
- **Animations** : Framer Motion
- **Base de données** : SQLite (Prisma)
- **Runtime** : Bun

---

## 📞 Contact MUNASEB

- **Adresse** : 01 BP 1926 Ouagadougou, Burkina Faso
- **Téléphone** : (+226) 25 33 73 90 95

---

© 2024 MUNASEB - CENOU. Tous droits réservés.
