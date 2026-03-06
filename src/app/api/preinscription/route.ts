import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

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

interface UpdateStatusData {
  id: string
  status: string
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
    const existingPreinscription = await db.preinscription.findFirst({
      where: { email: data.email }
    })

    if (existingPreinscription) {
      return NextResponse.json(
        { error: 'Une préinscription existe déjà avec cet email' },
        { status: 409 }
      )
    }

    // Create preinscription
    const preinscription = await db.preinscription.create({
      data: {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone,
        dateNaissance: data.dateNaissance,
        universite: data.universite,
        filiere: data.filiere,
        niveauEtudes: data.niveauEtudes,
        matricule: data.matricule || null,
        accepteConditions: data.accepteConditions,
        status: 'pending',
      }
    })

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

    const where = status ? { status } : {}

    const preinscriptions = await db.preinscription.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
    })

    return NextResponse.json({ preinscriptions })

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
    const data: UpdateStatusData = await request.json()

    if (!data.id || !data.status) {
      return NextResponse.json(
        { error: 'ID et statut requis' },
        { status: 400 }
      )
    }

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'rejected']
    if (!validStatuses.includes(data.status)) {
      return NextResponse.json(
        { error: 'Statut invalide' },
        { status: 400 }
      )
    }

    const updated = await db.preinscription.update({
      where: { id: data.id },
      data: { status: data.status }
    })

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

    await db.preinscription.delete({
      where: { id }
    })

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
