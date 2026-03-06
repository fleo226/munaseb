# 🚀 GUIDE DE DÉPLOIEMENT MUNASEB

## 📌 ÉTAPE 1 : Créer un compte GitHub

1. Allez sur **https://github.com**
2. Cliquez sur **"Sign up"** (S'inscrire)
3. Créez votre compte gratuitement

---

## 📌 ÉTAPE 2 : Créer un nouveau repository

1. Une fois connecté, cliquez sur **"+"** en haut à droite
2. Sélectionnez **"New repository"**
3. Nommez-le : `munaseb`
4. Cochez **"Private"** ou **"Public"**
5. Cliquez sur **"Create repository"**

---

## 📌 ÉTAPE 3 : Télécharger le code du projet

Depuis cette interface, vous devez pouvoir :
- **Télécharger le projet** en fichier ZIP
- Ou utiliser une fonction **"Export to GitHub"** si disponible

### Option A : Télécharger en ZIP
1. Cherchez un bouton **"Download"** ou **"Export"**
2. Téléchargez le projet
3. Décompressez le fichier

### Option B : Export direct
1. Cherchez **"Share"** ou **"Publish to GitHub"**
2. Sélectionnez votre repository

---

## 📌 ÉTAPE 4 : Pousser le code sur GitHub

Si vous avez le code en local, ouvrez un terminal :

```bash
# Aller dans le dossier du projet
cd munaseb

# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Site MUNASEB - Préinscription étudiants"

# Ajouter votre repository GitHub
git remote add origin https://github.com/VOTRE-USERNAME/munaseb.git

# Pousser le code
git push -u origin main
```

---

## 📌 ÉTAPE 5 : Déployer sur Railway (GRATUIT)

### 5.1 Créer un compte Railway
1. Allez sur **https://railway.app**
2. Cliquez sur **"Start a Project"**
3. Connectez-vous avec **GitHub**

### 5.2 Déployer le projet
1. Cliquez sur **"New Project"**
2. Sélectionnez **"Deploy from GitHub repo"**
3. Autorisez Railway à accéder à vos repos
4. Sélectionnez le repository **"munaseb"**
5. Cliquez sur **"Deploy Now"**

### 5.3 Attendre le déploiement
- Railway installe automatiquement les dépendances
- Le déploiement prend 2-3 minutes
- Vous verrez "SUCCESS" quand c'est terminé

### 5.4 Obtenir l'URL du site
1. Dans Railway, allez dans **"Settings"**
2. Cliquez sur **"Generate Domain"**
3. Votre site est accessible à : `https://munaseb-xxx.up.railway.app`

---

## ✅ C'EST FINI !

Votre site MUNASEB est maintenant en ligne !

### URLs importantes :
- 🏠 **Site public** : `https://votre-site.railway.app`
- 📝 **Préinscription** : `https://votre-site.railway.app/preinscription`
- 🔧 **Admin** : `https://votre-site.railway.app/admin`

---

## 🔒 Sécurité (Important !)

Une fois en ligne, **protégez l'accès admin** :

1. Ajoutez une authentification
2. Ou utilisez un mot de passe dans les variables d'environnement

---

## ❓ Besoin d'aide ?

Si vous bloquez à une étape :
1. Envoyez-moi une capture d'écran
2. Dites-moi où vous êtes bloqué
3. Je vous aiderai !

---

**Bonne chance pour les inscriptions ! 🎓**
