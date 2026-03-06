import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validation des variables d'environnement
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Variables d\'environnement manquantes. Vérifiez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type pour les préinscriptions
export interface Preinscription {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string
  date_naissance: string
  universite: string
  filiere: string
  niveau_etudes: string
  matricule: string | null
  accepte_conditions: boolean
  status: 'pending' | 'confirmed' | 'rejected'
  created_at: string
  updated_at: string
}

// Fonctions CRUD
export async function createPreinscription(data: Omit<Preinscription, 'id' | 'status' | 'created_at' | 'updated_at'>) {
  const { data: result, error } = await supabase
    .from('preinscriptions')
    .insert([data])
    .select()
    .single()
  
  if (error) throw error
  return result
}

export async function getPreinscriptions(status?: string) {
  let query = supabase
    .from('preinscriptions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)
  
  if (status) {
    query = query.eq('status', status)
  }
  
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function updatePreinscriptionStatus(id: string, status: string) {
  const { data, error } = await supabase
    .from('preinscriptions')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function deletePreinscription(id: string) {
  const { error } = await supabase
    .from('preinscriptions')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}
