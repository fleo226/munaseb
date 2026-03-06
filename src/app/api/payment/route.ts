import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const MUNASEB_FEE = 5000 // 5000 FCFA

// Génère un ID de transaction unique
function generateTransactionId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `MNS${timestamp}${random}`.toUpperCase()
}

// Simulation de paiement Mobile Money (à remplacer par vraie API en production)
async function initiateMobileMoneyPayment(
  provider: string,
  phoneNumber: string,
  amount: number,
  transactionId: string
): Promise<{ success: boolean; message: string; providerRef?: string }> {
  
  // En production, ici vous feriez appel à l'API CinetPay, PayDunya ou Notch Pay
  // Pour la démo, on simule un paiement réussi
  
  // Validation du numéro de téléphone
  const cleanPhone = phoneNumber.replace(/\s/g, '')
  
  if (provider === 'orange_money') {
    // Orange Money Burkina: commence par 07
    if (!cleanPhone.startsWith('07') && !cleanPhone.startsWith('+22607')) {
      return { success: false, message: 'Numéro Orange Money invalide (doit commencer par 07)' }
    }
  } else if (provider === 'moov_money') {
    // Moov Money Burkina: commence par 70, 71, 72, 73, 76
    const validMoovPrefixes = ['70', '71', '72', '73', '76']
    const prefix = cleanPhone.startsWith('+226') ? cleanPhone.substring(4, 6) : cleanPhone.substring(0, 2)
    if (!validMoovPrefixes.includes(prefix)) {
      return { success: false, message: 'Numéro Moov Money invalide' }
    }
  }
  
  // Simuler l'envoi de la demande de paiement
  // En production: appel API vers CinetPay/PayDunya
  console.log(`[MOCK] Envoi demande ${provider} vers ${phoneNumber} pour ${amount} FCFA - Ref: ${transactionId}`)
  
  return { 
    success: true, 
    message: `Demande de paiement envoyée. Veuillez confirmer sur votre téléphone ${provider === 'orange_money' ? 'Orange Money' : 'Moov Money'}.`,
    providerRef: `REF${Date.now()}`
  }
}

// POST - Initier un paiement
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { preinscriptionId, provider, phoneNumber } = body
    
    // Validation
    if (!preinscriptionId || !provider || !phoneNumber) {
      return NextResponse.json({ error: 'Informations manquantes' }, { status: 400 })
    }
    
    if (!['orange_money', 'moov_money'].includes(provider)) {
      return NextResponse.json({ error: 'Mode de paiement non supporté' }, { status: 400 })
    }
    
    // Vérifier que la préinscription existe
    const { data: preinscription, error: fetchError } = await supabase
      .from('preinscriptions')
      .select('*')
      .eq('id', preinscriptionId)
      .single()
    
    if (fetchError || !preinscription) {
      return NextResponse.json({ error: 'Préinscription non trouvée' }, { status: 404 })
    }
    
    // Vérifier si déjà payé
    if (preinscription.payment_status === 'paid') {
      return NextResponse.json({ error: 'Cette préinscription a déjà été payée' }, { status: 400 })
    }
    
    // Générer l'ID de transaction
    const transactionId = generateTransactionId()
    
    // Initier le paiement Mobile Money
    const paymentResult = await initiateMobileMoneyPayment(
      provider,
      phoneNumber,
      MUNASEB_FEE,
      transactionId
    )
    
    if (!paymentResult.success) {
      return NextResponse.json({ error: paymentResult.message }, { status: 400 })
    }
    
    // Créer l'enregistrement de paiement
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert([{
        preinscription_id: preinscriptionId,
        amount: MUNASEB_FEE,
        provider,
        phone_number: phoneNumber,
        transaction_id: transactionId,
        provider_reference: paymentResult.providerRef,
        status: 'pending',
      }])
      .select()
      .single()
    
    if (paymentError) {
      console.error('Erreur création paiement:', paymentError)
      return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 })
    }
    
    // Mettre à jour le statut de paiement de la préinscription
    await supabase
      .from('preinscriptions')
      .update({
        payment_status: 'pending',
        payment_method: provider,
        payment_phone: phoneNumber,
        payment_reference: transactionId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', preinscriptionId)
    
    return NextResponse.json({
      success: true,
      message: paymentResult.message,
      transactionId,
      paymentId: payment.id,
      amount: MUNASEB_FEE,
    })
    
  } catch (error) {
    console.error('Erreur paiement:', error)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}

// GET - Vérifier le statut d'un paiement
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const transactionId = searchParams.get('transactionId')
    const preinscriptionId = searchParams.get('preinscriptionId')
    
    if (!transactionId && !preinscriptionId) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }
    
    let query = supabase
      .from('payments')
      .select('*, preinscription:preinscriptions(*)')
    
    if (transactionId) {
      query = query.eq('transaction_id', transactionId)
    } else {
      query = query.eq('preinscription_id', preinscriptionId)
    }
    
    const { data: payment, error } = await query.order('created_at', { ascending: false }).limit(1).single()
    
    if (error || !payment) {
      return NextResponse.json({ error: 'Paiement non trouvé' }, { status: 404 })
    }
    
    return NextResponse.json({ payment })
    
  } catch (error) {
    console.error('Erreur vérification:', error)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}

// PATCH - Confirmer un paiement (webhook ou validation manuelle)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { transactionId, status, providerReference, statusMessage } = body
    
    if (!transactionId || !status) {
      return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 })
    }
    
    // Récupérer le paiement
    const { data: payment, error: fetchError } = await supabase
      .from('payments')
      .select('*')
      .eq('transaction_id', transactionId)
      .single()
    
    if (fetchError || !payment) {
      return NextResponse.json({ error: 'Paiement non trouvé' }, { status: 404 })
    }
    
    // Mettre à jour le paiement
    const updateData: Record<string, unknown> = {
      status,
      status_message: statusMessage,
      updated_at: new Date().toISOString(),
    }
    
    if (status === 'success') {
      updateData.paid_at = new Date().toISOString()
      updateData.provider_reference = providerReference
    }
    
    await supabase
      .from('payments')
      .update(updateData)
      .eq('id', payment.id)
    
    // Si succès, mettre à jour la préinscription
    if (status === 'success') {
      await supabase
        .from('preinscriptions')
        .update({
          payment_status: 'paid',
          payment_date: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', payment.preinscription_id)
    }
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Erreur mise à jour:', error)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}
