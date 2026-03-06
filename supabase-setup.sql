-- =====================================================
-- MUNASEB - Script SQL pour Supabase
-- Exécutez ce script dans SQL Editor de Supabase
-- =====================================================

-- Supprimer la table si elle existe (attention: efface les données)
-- DROP TABLE IF EXISTS preinscriptions;

-- Créer la table des préinscriptions
CREATE TABLE IF NOT EXISTS preinscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Informations personnelles
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telephone TEXT NOT NULL,
  date_naissance TEXT NOT NULL,
  lieu_naissance TEXT,
  sexe TEXT,
  nationalite TEXT DEFAULT 'Burkinabè',
  adresse TEXT,
  
  -- Pièce d'identité
  type_piece TEXT NOT NULL,
  numero_piece TEXT NOT NULL,
  date_delivrance_piece TEXT,
  date_expiration_piece TEXT,
  fichier_piece_url TEXT,
  
  -- Informations universitaires
  universite TEXT NOT NULL,
  filiere TEXT NOT NULL,
  niveau_etudes TEXT NOT NULL,
  matricule TEXT,
  attestation_url TEXT,
  photo_url TEXT,
  
  -- Contact d'urgence
  contact_urgence_nom TEXT,
  contact_urgence_telephone TEXT,
  contact_urgence_lien TEXT,
  
  -- Ayants-droit
  ajouter_ayants_droit BOOLEAN DEFAULT false,
  ayants_droit JSONB DEFAULT '[]',
  
  -- Conditions
  accepte_conditions BOOLEAN DEFAULT false,
  
  -- Statut
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected', 'awaiting_payment')),
  
  -- Dates
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer Row Level Security
ALTER TABLE preinscriptions ENABLE ROW LEVEL SECURITY;

-- Politiques de sécurité (permettre tout pour le moment)
CREATE POLICY "Permettre toutes les opérations" ON preinscriptions
  FOR ALL USING (true);

-- Créer un index pour les recherches par email
CREATE INDEX IF NOT EXISTS idx_preinscriptions_email ON preinscriptions(email);

-- Créer un index pour les recherches par statut
CREATE INDEX IF NOT EXISTS idx_preinscriptions_status ON preinscriptions(status);

-- Créer un index pour les recherches par date
CREATE INDEX IF NOT EXISTS idx_preinscriptions_created_at ON preinscriptions(created_at DESC);

-- =====================================================
-- CRÉER LE BUCKET DE STOCKAGE POUR LES DOCUMENTS
-- =====================================================

-- Insérer le bucket 'documents' s'il n'existe pas
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Politiques pour le bucket documents
CREATE POLICY "Permettre upload public" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Permettre lecture publique" ON storage.objects
  FOR SELECT USING (bucket_id = 'documents');

-- =====================================================
-- TERMINÉ !
-- =====================================================
-- Votre base de données MUNASEB est prête.
-- 
-- Prochaines étapes:
-- 1. Allez dans Settings > API pour récupérer vos clés
-- 2. Configurez les variables d'environnement dans Vercel
-- 3. Déployez !
-- =====================================================
