import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// POST - Create new preinscription with file uploads
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form fields
    const nom = formData.get('nom') as string
    const prenom = formData.get('prenom') as string
    const email = formData.get('email') as string
    const telephone = formData.get('telephone') as string
    const dateNaissance = formData.get('dateNaissance') as string
    const lieuNaissance = formData.get('lieuNaissance') as string
    const sexe = formData.get('sexe') as string
    const nationalite = formData.get('nationalite') as string
    const adresse = formData.get('adresse') as string
    
    const typePiece = formData.get('typePiece') as string
    const numeroPiece = formData.get('numeroPiece') as string
    const dateDelivrancePiece = formData.get('dateDelivrancePiece') as string
    const dateExpirationPiece = formData.get('dateExpirationPiece') as string
    
    const universite = formData.get('universite') as string
    const filiere = formData.get('filiere') as string
    const niveauEtudes = formData.get('niveauEtudes') as string
    const matricule = formData.get('matricule') as string
    
    const contactUrgenceNom = formData.get('contactUrgenceNom') as string
    const contactUrgenceTelephone = formData.get('contactUrgenceTelephone') as string
    const contactUrgenceLien = formData.get('contactUrgenceLien') as string
    
    const ajouterAyantsDroit = formData.get('ajouterAyantsDroit') === 'true'
    const ayantsDroitJson = formData.get('ayantsDroit') as string
    const ayantsDroit = ayantsDroitJson ? JSON.parse(ayantsDroitJson) : []
    
    const accepteConditions = formData.get('accepteConditions') === 'true'

    // Validate required fields
    if (!nom || !prenom || !email || !telephone || !dateNaissance) {
      return NextResponse.json({ error: 'Informations personnelles incomplètes' }, { status: 400 })
    }
    
    if (!typePiece || !numeroPiece) {
      return NextResponse.json({ error: 'Informations de pièce d\'identité incomplètes' }, { status: 400 })
    }
    
    if (!universite || !filiere || !niveauEtudes) {
      return NextResponse.json({ error: 'Informations universitaires incomplètes' }, { status: 400 })
    }
    
    if (!accepteConditions) {
      return NextResponse.json({ error: 'Vous devez accepter les conditions' }, { status: 400 })
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('preinscriptions')
      .select('id')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Une préinscription existe déjà avec cet email' }, { status: 409 })
    }

    // Upload files to Supabase Storage
    let fichierPieceUrl = null
    let attestationFileUrl = null
    let photoFileUrl = null

    // Upload piece d'identite
    const fichierPiece = formData.get('fichierPiece') as File
    if (fichierPiece) {
      const fileName = `pieces/${Date.now()}_${fichierPiece.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, fichierPiece)
      
      if (!uploadError && uploadData) {
        const { data: urlData } = supabase.storage.from('documents').getPublicUrl(fileName)
        fichierPieceUrl = urlData.publicUrl
      }
    }

    // Upload attestation
    const attestationFile = formData.get('attestationFile') as File
    if (attestationFile) {
      const fileName = `attestations/${Date.now()}_${attestationFile.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, attestationFile)
      
      if (!uploadError && uploadData) {
        const { data: urlData } = supabase.storage.from('documents').getPublicUrl(fileName)
        attestationFileUrl = urlData.publicUrl
      }
    }

    // Upload photo
    const photoFile = formData.get('photoFile') as File
    if (photoFile) {
      const fileName = `photos/${Date.now()}_${photoFile.name}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, photoFile)
      
      if (!uploadError && uploadData) {
        const { data: urlData } = supabase.storage.from('documents').getPublicUrl(fileName)
        photoFileUrl = urlData.publicUrl
      }
    }

    // Create preinscription
    const { data: preinscription, error } = await supabase
      .from('preinscriptions')
      .insert([{
        nom,
        prenom,
        email,
        telephone,
        date_naissance: dateNaissance,
        lieu_naissance: lieuNaissance,
        sexe,
        nationalite,
        adresse,
        type_piece: typePiece,
        numero_piece: numeroPiece,
        date_delivrance_piece: dateDelivrancePiece,
        date_expiration_piece: dateExpirationPiece,
        fichier_piece_url: fichierPieceUrl,
        universite,
        filiere,
        niveau_etudes: niveauEtudes,
        matricule,
        attestation_url: attestationFileUrl,
        photo_url: photoFileUrl,
        contact_urgence_nom: contactUrgenceNom,
        contact_urgence_telephone: contactUrgenceTelephone,
        contact_urgence_lien: contactUrgenceLien,
        ajouter_ayants_droit: ajouterAyantsDroit,
        ayants_droit: ayantsDroit,
        accepte_conditions: accepteConditions,
        status: 'pending',
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(
      { success: true, message: 'Préinscription enregistrée', id: preinscription.id },
      { status: 201 }
    )

  } catch (error) {
    console.error('Erreur lors de la préinscription:', error)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
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

    return NextResponse.json({ preinscriptions })

  } catch (error) {
    console.error('Erreur lors de la récupération:', error)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}

// PATCH - Update status
export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json({ error: 'ID et statut requis' }, { status: 400 })
    }

    const { error } = await supabase
      .from('preinscriptions')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}

// DELETE
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    const { error } = await supabase
      .from('preinscriptions')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}
