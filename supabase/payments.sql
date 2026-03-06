-- Ajouter les colonnes de paiement à la table preinscriptions
ALTER TABLE preinscriptions 
ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'unpaid',
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(20),
ADD COLUMN IF NOT EXISTS payment_reference VARCHAR(100),
ADD COLUMN IF NOT EXISTS payment_phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS payment_date TIMESTAMP WITH TIME ZONE;

-- Créer la table payments
CREATE TABLE IF NOT EXISTS payments (
  id VARCHAR(30) PRIMARY KEY DEFAULT 'pay_' || substr(md5(random()::text), 1, 20),
  preinscription_id VARCHAR(30) NOT NULL REFERENCES preinscriptions(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'XOF',
  provider VARCHAR(20) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  transaction_id VARCHAR(100),
  provider_reference VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending',
  status_message TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE
);

-- Index pour les recherches
CREATE INDEX IF NOT EXISTS idx_payments_preinscription ON payments(preinscription_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_transaction ON payments(transaction_id);

-- Index pour les paiements sur preinscriptions
CREATE INDEX IF NOT EXISTS idx_preinscriptions_payment_status ON preinscriptions(payment_status);
