# 🚀 DÉPLOIEMENT GRATUIT : Vercel + Supabase

## Guide complet pour mettre MUNASEB en ligne gratuitement

---

## 📋 ÉTAPE 1 : Créer un compte Supabase (GRATUIT)

### 1.1 Aller sur Supabase
👉 **https://supabase.com**

### 1.2 Créer un compte
- Cliquez sur **"Start your project"**
- Connectez-vous avec **GitHub** (le plus simple)

### 1.3 Créer un nouveau projet
- Cliquez sur **"New Project"**
- Nommez-le : **`munaseb`**
- Choisissez une région proche (Europe de l'Ouest)
- Définissez un mot de passe de base de données (gardez-le !)
- Cliquez sur **"Create new project"**

---

## 📋 ÉTAPE 2 : Créer la table des préinscriptions

### 2.1 Aller dans SQL Editor
- Dans Supabase, cliquez sur **"SQL Editor"** dans le menu gauche
- Cliquez sur **"New query"**

### 2.2 Copiez et exécutez ce SQL :

```sql
CREATE TABLE preinscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telephone TEXT NOT NULL,
  date_naissance TEXT NOT NULL,
  universite TEXT NOT NULL,
  filiere TEXT NOT NULL,
  niveau_etudes TEXT NOT NULL,
  matricule TEXT,
  accepte_conditions BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer Row Level Security (sécurité)
ALTER TABLE preinscriptions ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion publique
CREATE POLICY "Permettre insertion publique" ON preinscriptions
  FOR INSERT WITH CHECK (true);

-- Politique pour permettre la lecture publique
CREATE POLICY "Permettre lecture publique" ON preinscriptions
  FOR SELECT USING (true);

-- Politique pour permettre la mise à jour
CREATE POLICY "Permettre mise à jour" ON preinscriptions
  FOR UPDATE USING (true);

-- Politique pour permettre la suppression
CREATE POLICY "Permettre suppression" ON preinscriptions
  FOR DELETE USING (true);
```

### 2.3 Cliquez sur **"Run"** (bouton vert)

---

## 📋 ÉTAPE 3 : Récupérer les clés API

### 3.1 Aller dans Settings
- Cliquez sur **"Settings"** ⚙️ (icône en bas à gauche)
- Puis sur **"API"**

### 3.2 Copiez ces valeurs :
1. **Project URL** → `https://xxxx.supabase.co`
2. **anon public key** → Commence par `eyJ...`

---

## 📋 ÉTAPE 4 : Déployer sur Vercel

### 4.1 Aller sur Vercel
👉 **https://vercel.com**

### 4.2 Se connecter avec GitHub
- Cliquez sur **"Sign Up"** → Choisissez **"Continue with GitHub"**

### 4.3 Importer le projet
1. Cliquez sur **"Add New..."** → **"Project"**
2. Sélectionnez le repository **"munaseb"**
3. Cliquez sur **"Import"**

### 4.4 Configurer les variables d'environnement
Avant de cliquer sur "Deploy", cliquez sur **"Environment Variables"** et ajoutez :

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` (votre clé anon) |

### 4.5 Déployer
- Cliquez sur **"Deploy"**
- Attendez 2-3 minutes
- 🎉 **Votre site est en ligne !**

---

## ✅ C'EST FINI !

### Votre site est accessible à :
- 🏠 **Site** : `https://munaseb.vercel.app`
- 📝 **Préinscription** : `https://munaseb.vercel.app/preinscription`
- 🔧 **Admin** : `https://munaseb.vercel.app/admin`

---

## 🔒 Sécuriser l'admin (IMPORTANT !)

Après le déploiement, ajoutez une protection à la page admin.

---

## 🆘 Besoin d'aide ?

Si vous bloquez à une étape, dites-moi laquelle et je vous aiderai !

---

**Bonne chance ! 🎓**
