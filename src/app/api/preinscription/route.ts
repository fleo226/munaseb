import { NextRequest, NextResponse } from 'next/server'
import { supabase, updatePreinscriptionStatus, deletePreinscription } from '@/lib/supabase'

interface PreinscriptionData {
  nom: string
  prenom: string
  email: string
  telephone: string
  dateNaissance: string
  universite: string
  filiere: string
  niveauEtudes: string
  matricule?: string
  accepteConditions: boolean
}

// POST - Create new preinscription
export async function POST(request: NextRequest) {
  try {
    const data: PreinscriptionData = await request.json()

    // Validate required fields
    if (!data.nom || !data.prenom || !data.email || !data.telephone || !data.dateNaissance) {
      return NextResponse.json(
        { error: 'Tous les champs personnels sont requis' },
        { status: 400 }
      )
    }

    if (!data.universite || !data.filiere || !data.niveauEtudes) {
      return NextResponse.json(
        { error: 'Tous les champs universitaires sont requis' },
        { status: 400 }
      )
    }

    if (!data.accepteConditions) {
      return NextResponse.json(
        { error: 'Vous devez accepter les conditions' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('preinscriptions')
      .select('id')
      .eq('email', data.email)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Une préinscription existe déjà avec cet email' },
        { status: 409 }
      )
    }

    // Create preinscription
    const { data: preinscription, error } = await supabase
      .from('preinscriptions')
      .insert([{
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone,
        date_naissance: data.dateNaissance,
        universite: data.universite,
        filiere: data.filiere,
        niveau_etudes: data.niveauEtudes,
        matricule: data.matricule || null,
        accepte_conditions: data.accepteConditions,
        status: 'pending',
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(
      { 
        success: true, 
        message: 'Préinscription enregistrée avec succès',
        id: preinscription.id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Erreur lors de la préinscription:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la préinscription' },
      { status: 500 }
    )
  }
}

// GET - List preinscriptions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let query = supabase
      .from('preinscriptions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (status) {
      query = query.eq('status', status)
    }

    const { data: preinscriptions, error } = await query

    if (error) throw error

    // Transform to match previous format
    const transformed = preinscriptions?.map(p => ({
      id: p.id,
      nom: p.nom,
      prenom: p.prenom,
      email: p.email,
      telephone: p.telephone,
      dateNaissance: p.date_naissance,
      universite: p.universite,
      filiere: p.filiere,
      niveauEtudes: p.niveau_etudes,
      matricule: p.matricule,
      accepteConditions: p.accepte_conditions,
      status: p.status,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    })) || []

    return NextResponse.json({ preinscriptions: transformed })

  } catch (error) {
    console.error('Erreur lors de la récupération des préinscriptions:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}

// PATCH - Update preinscription status
export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.id || !data.status) {
      return NextResponse.json(
        { error: 'ID et statut requis' },
        { status: 400 }
      )
    }

    const validStatuses = ['pending', 'confirmed', 'rejected']
    if (!validStatuses.includes(data.status)) {
      return NextResponse.json(
        { error: 'Statut invalide' },
        { status: 400 }
      )
    }

    const { data: updated, error } = await supabase
      .from('preinscriptions')
      .update({ status: data.status, updated_at: new Date().toISOString() })
      .eq('id', data.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ 
      success: true, 
      message: 'Statut mis à jour',
      preinscription: updated 
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la mise à jour' },
      { status: 500 }
    )
  }
}

// DELETE - Delete preinscription
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID requis' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('preinscriptions')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ 
      success: true, 
      message: 'Préinscription supprimée' 
    })

  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la suppression' },
      { status: 500 }
    )
  }
}
