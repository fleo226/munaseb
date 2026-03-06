'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  User,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Upload,
  IdCard,
  X,
  FileCheck,
  MessageCircle,
} from 'lucide-react'

// Form data type - SIMPLIFIED
interface FormData {
  // Step 1: Personal Info
  nom: string
  prenom: string
  email: string
  telephone: string
  dateNaissance: string
  lieuNaissance: string
  sexe: string
  adresse: string
  
  // Step 2: Identity Document
  typePiece: string
  numeroPiece: string
  dateDelivrancePiece: string
  fichierPiece: File | null
  
  // Step 3: University Info
  universite: string
  filiere: string
  niveauEtudes: string
  attestationFile: File | null
  
  // Confirmation
  accepteConditions: boolean
}

const initialFormData: FormData = {
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  dateNaissance: '',
  lieuNaissance: '',
  sexe: '',
  adresse: '',
  typePiece: '',
  numeroPiece: '',
  dateDelivrancePiece: '',
  fichierPiece: null,
  universite: '',
  filiere: '',
  niveauEtudes: '',
  attestationFile: null,
  accepteConditions: false,
}

const universities = [
  { value: 'ujkz', label: 'Université Joseph Ki-Zerbo (Ouagadougou)' },
  { value: 'unb', label: 'Université Nazi Boni (Bobo-Dioulasso)' },
  { value: 'upb', label: 'Université Polytechnique de Bobo-Dioulasso' },
  { value: 'uds', label: 'Université de Dédougou' },
  { value: 'unk', label: 'Université Norbert Zongo (Koudougou)' },
  { value: 'uae', label: 'Université Aboubacar Maiga (Fada)' },
  { value: 'udn', label: 'Université de Dori' },
  { value: 'uga', label: 'Université de Gaoua' },
  { value: 'autres', label: 'Autre établissement' },
]

const studyLevels = [
  { value: 'l1', label: 'Licence 1' },
  { value: 'l2', label: 'Licence 2' },
  { value: 'l3', label: 'Licence 3' },
  { value: 'm1', label: 'Master 1' },
  { value: 'm2', label: 'Master 2' },
  { value: 'doctorat', label: 'Doctorat' },
]

const pieceTypes = [
  { value: 'cni', label: 'Carte Nationale d\'Identité (CNI)' },
  { value: 'passeport', label: 'Passeport' },
  { value: 'carte_consulaire', label: 'Carte Consulaire' },
  { value: 'carte_sejour', label: 'Carte de Séjour' },
  { value: 'autre', label: 'Autre pièce officielle' },
]

// Step icons and titles - 4 STEPS ONLY
const steps = [
  { title: 'Informations personnelles', icon: User, description: 'Identité et coordonnées' },
  { title: 'Pièce d\'identité', icon: IdCard, description: 'Document officiel' },
  { title: 'Informations universitaires', icon: GraduationCap, description: 'Établissement' },
  { title: 'Confirmation', icon: CheckCircle2, description: 'Validation' },
]

export default function PreinscriptionPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const progress = (currentStep / 4) * 100

  // File handling
  const handleFileChange = (field: 'fichierPiece' | 'attestationFile', file: File | null) => {
    setFormData({ ...formData, [field]: file })
  }

  // Validation functions
  const validateStep1 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis'
    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis'
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Veuillez entrer un email valide'
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le téléphone est requis'
    }
    if (!formData.dateNaissance) newErrors.dateNaissance = 'La date de naissance est requise'
    if (!formData.sexe) newErrors.sexe = 'Le sexe est requis'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    
    if (!formData.typePiece) newErrors.typePiece = 'Le type de pièce est requis'
    if (!formData.numeroPiece.trim()) newErrors.numeroPiece = 'Le numéro de pièce est requis'
    if (!formData.dateDelivrancePiece) newErrors.dateDelivrancePiece = 'La date de délivrance est requise'
    if (!formData.fichierPiece) newErrors.fichierPiece = 'Le fichier de la pièce est requis'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    
    if (!formData.universite) newErrors.universite = 'Veuillez sélectionner votre université'
    if (!formData.filiere.trim()) newErrors.filiere = 'La filière est requise'
    if (!formData.niveauEtudes) newErrors.niveauEtudes = 'Veuillez sélectionner votre niveau'
    if (!formData.attestationFile) newErrors.attestationFile = 'L\'attestation pédagogique est requise'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep4 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    
    if (!formData.accepteConditions) {
      newErrors.accepteConditions = 'Vous devez accepter les conditions'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Navigation handlers
  const handleNext = () => {
    let isValid = false
    
    if (currentStep === 1) isValid = validateStep1()
    else if (currentStep === 2) isValid = validateStep2()
    else if (currentStep === 3) isValid = validateStep3()
    
    if (isValid) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
    setErrors({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Form submission
  const handleSubmit = async () => {
    if (!validateStep4()) return
    
    setIsSubmitting(true)
    
    try {
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          submitData.append(key, value)
        } else if (typeof value === 'boolean') {
          submitData.append(key, String(value))
        } else if (value !== null && value !== undefined) {
          submitData.append(key, value as string)
        }
      })

      const response = await fetch('/api/preinscription', {
        method: 'POST',
        body: submitData,
      })
      
      if (response.ok) {
        setIsSuccess(true)
      } else {
        const data = await response.json()
        setErrors({ email: data.error || 'Une erreur est survenue' })
      }
    } catch (error) {
      setErrors({ email: 'Erreur de connexion. Veuillez réessayer.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Update form data
  const updateFormData = (field: keyof FormData, value: string | boolean | File | null) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  // File upload component
  const FileUpload = ({ 
    label, 
    field, 
    accept = '.pdf,.jpg,.jpeg,.png', 
    required = true,
    description = '' 
  }: { 
    label: string
    field: 'fichierPiece' | 'attestationFile'
    accept?: string
    required?: boolean
    description?: string
  }) => (
    <div className="space-y-2">
      <Label className="flex items-center gap-1">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center gap-4">
        <label className="flex-1 cursor-pointer">
          <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all hover:border-orange-400 hover:bg-orange-50/50 ${
            errors[field] ? 'border-red-400 bg-red-50' : 'border-slate-200'
          }`}>
            <input
              type="file"
              accept={accept}
              className="hidden"
              onChange={(e) => handleFileChange(field, e.target.files?.[0] || null)}
            />
            {formData[field] ? (
              <div className="flex items-center justify-center gap-2 text-green-600">
                <FileCheck className="w-6 h-6" />
                <span className="font-medium">{formData[field]?.name}</span>
              </div>
            ) : (
              <div className="text-slate-500">
                <Upload className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Cliquez pour télécharger</p>
                <p className="text-sm text-slate-400">{description}</p>
              </div>
            )}
          </div>
        </label>
        {formData[field] && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleFileChange(field, null)}
            className="text-red-500 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      {errors[field] && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors[field]}
        </p>
      )}
    </div>
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/cenou-logo.jpg"
              alt="CENOU Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-orange-500">MUNASEB</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Success State */}
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Préinscription enregistrée !
            </h1>
            <p className="text-lg text-slate-600 mb-4 max-w-md mx-auto">
              Votre demande a été enregistrée avec succès. Pour finaliser votre adhésion, contactez-nous via WhatsApp.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 max-w-md mx-auto">
              <p className="text-green-800 font-medium mb-2">
                📱 Étape suivante : Paiement de 5 000 FCFA
              </p>
              <p className="text-green-700 text-sm">
                Cliquez sur le bouton ci-dessous pour nous contacter sur WhatsApp et procéder au paiement via Orange Money ou Moov Money.
              </p>
            </div>
            
            <Card className="max-w-lg mx-auto border-0 shadow-lg mb-8">
              <CardContent className="p-6 text-left">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-green-600" />
                  Récapitulatif de votre demande
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">Nom complet</p>
                    <p className="font-medium">{formData.prenom} {formData.nom}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Email</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Téléphone</p>
                    <p className="font-medium">{formData.telephone}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Pièce d&apos;identité</p>
                    <p className="font-medium">{pieceTypes.find(p => p.value === formData.typePiece)?.label}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Université</p>
                    <p className="font-medium">{universities.find(u => u.value === formData.universite)?.label}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Niveau</p>
                    <p className="font-medium">{studyLevels.find(l => l.value === formData.niveauEtudes)?.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  Retour à l&apos;accueil
                </Button>
              </Link>
              <a
                href={`https://wa.me/22606541388?text=${encodeURIComponent(`Bonjour MUNASEB, je viens de faire ma préinscription. Voici mes informations :\n\nNom: ${formData.prenom} ${formData.nom}\nEmail: ${formData.email}\nTéléphone: ${formData.telephone}\nUniversité: ${universities.find(u => u.value === formData.universite)?.label}\nFilière: ${formData.filiere}\nNiveau: ${studyLevels.find(l => l.value === formData.niveauEtudes)?.label}\n\nJe souhaite finaliser mon adhésion et payer les 5000 FCFA.`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contacter sur WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-4">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          currentStep > index + 1
                            ? 'bg-green-500 text-white'
                            : currentStep === index + 1
                            ? 'bg-orange-500 text-white shadow-lg'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {currentStep > index + 1 ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <step.icon className="w-5 h-5" />
                        )}
                      </div>
                      <span
                        className={`mt-2 text-xs font-medium text-center hidden sm:block ${
                          currentStep >= index + 1 ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 mt-5 rounded-full transition-all ${
                          currentStep > index + 1 ? 'bg-green-500' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-center text-sm text-slate-600 mt-2">
                Étape {currentStep} sur 4
              </p>
            </div>

            {/* Form Card */}
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <AnimatePresence mode="wait" custom={currentStep}>
                  <motion.div
                    key={currentStep}
                    custom={currentStep}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                            <User className="w-5 h-5 text-orange-500" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-slate-900">Informations personnelles</h2>
                            <p className="text-sm text-slate-600">Vos informations de base</p>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nom">Nom <span className="text-red-500">*</span></Label>
                            <Input
                              id="nom"
                              value={formData.nom}
                              onChange={(e) => updateFormData('nom', e.target.value)}
                              placeholder="Votre nom"
                              className={errors.nom ? 'border-red-500' : ''}
                            />
                            {errors.nom && <p className="text-sm text-red-500">{errors.nom}</p>}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="prenom">Prénom <span className="text-red-500">*</span></Label>
                            <Input
                              id="prenom"
                              value={formData.prenom}
                              onChange={(e) => updateFormData('prenom', e.target.value)}
                              placeholder="Votre prénom"
                              className={errors.prenom ? 'border-red-500' : ''}
                            />
                            {errors.prenom && <p className="text-sm text-red-500">{errors.prenom}</p>}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => updateFormData('email', e.target.value)}
                                placeholder="votre@email.com"
                                className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                              />
                            </div>
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="telephone">Téléphone <span className="text-red-500">*</span></Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <Input
                                id="telephone"
                                type="tel"
                                value={formData.telephone}
                                onChange={(e) => updateFormData('telephone', e.target.value)}
                                placeholder="+226 XX XX XX XX"
                                className={`pl-10 ${errors.telephone ? 'border-red-500' : ''}`}
                              />
                            </div>
                            {errors.telephone && <p className="text-sm text-red-500">{errors.telephone}</p>}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="dateNaissance">Date de naissance <span className="text-red-500">*</span></Label>
                            <Input
                              id="dateNaissance"
                              type="date"
                              value={formData.dateNaissance}
                              onChange={(e) => updateFormData('dateNaissance', e.target.value)}
                              className={errors.dateNaissance ? 'border-red-500' : ''}
                            />
                            {errors.dateNaissance && <p className="text-sm text-red-500">{errors.dateNaissance}</p>}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="lieuNaissance">Lieu de naissance</Label>
                            <Input
                              id="lieuNaissance"
                              value={formData.lieuNaissance}
                              onChange={(e) => updateFormData('lieuNaissance', e.target.value)}
                              placeholder="Ville de naissance"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Sexe <span className="text-red-500">*</span></Label>
                            <Select
                              value={formData.sexe}
                              onValueChange={(value) => updateFormData('sexe', value)}
                            >
                              <SelectTrigger className={errors.sexe ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Sélectionnez" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="masculin">Masculin</SelectItem>
                                <SelectItem value="feminin">Féminin</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.sexe && <p className="text-sm text-red-500">{errors.sexe}</p>}
                          </div>

                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="adresse">Adresse</Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                              <Textarea
                                id="adresse"
                                value={formData.adresse}
                                onChange={(e) => updateFormData('adresse', e.target.value)}
                                placeholder="Quartier, Ville..."
                                className="pl-10"
                                rows={2}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Identity Document */}
                    {currentStep === 2 && (
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <IdCard className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-slate-900">Pièce d&apos;identité</h2>
                            <p className="text-sm text-slate-600">Votre document officiel</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Type de pièce <span className="text-red-500">*</span></Label>
                              <Select
                                value={formData.typePiece}
                                onValueChange={(value) => updateFormData('typePiece', value)}
                              >
                                <SelectTrigger className={errors.typePiece ? 'border-red-500' : ''}>
                                  <SelectValue placeholder="Sélectionnez" />
                                </SelectTrigger>
                                <SelectContent>
                                  {pieceTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors.typePiece && <p className="text-sm text-red-500">{errors.typePiece}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label>Numéro de la pièce <span className="text-red-500">*</span></Label>
                              <Input
                                value={formData.numeroPiece}
                                onChange={(e) => updateFormData('numeroPiece', e.target.value)}
                                placeholder="Numéro sur la pièce"
                                className={errors.numeroPiece ? 'border-red-500' : ''}
                              />
                              {errors.numeroPiece && <p className="text-sm text-red-500">{errors.numeroPiece}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label>Date de délivrance <span className="text-red-500">*</span></Label>
                              <Input
                                type="date"
                                value={formData.dateDelivrancePiece}
                                onChange={(e) => updateFormData('dateDelivrancePiece', e.target.value)}
                                className={errors.dateDelivrancePiece ? 'border-red-500' : ''}
                              />
                              {errors.dateDelivrancePiece && <p className="text-sm text-red-500">{errors.dateDelivrancePiece}</p>}
                            </div>
                          </div>

                          <FileUpload
                            label="Copie de la pièce d'identité"
                            field="fichierPiece"
                            accept=".pdf,.jpg,.jpeg,.png"
                            description="PDF, JPG ou PNG"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 3: University Information */}
                    {currentStep === 3 && (
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-slate-900">Informations universitaires</h2>
                            <p className="text-sm text-slate-600">Votre établissement</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Université <span className="text-red-500">*</span></Label>
                            <Select
                              value={formData.universite}
                              onValueChange={(value) => updateFormData('universite', value)}
                            >
                              <SelectTrigger className={errors.universite ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Sélectionnez votre université" />
                              </SelectTrigger>
                              <SelectContent>
                                {universities.map((uni) => (
                                  <SelectItem key={uni.value} value={uni.value}>
                                    {uni.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.universite && <p className="text-sm text-red-500">{errors.universite}</p>}
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Filière <span className="text-red-500">*</span></Label>
                              <Input
                                value={formData.filiere}
                                onChange={(e) => updateFormData('filiere', e.target.value)}
                                placeholder="Ex: Informatique, Droit..."
                                className={errors.filiere ? 'border-red-500' : ''}
                              />
                              {errors.filiere && <p className="text-sm text-red-500">{errors.filiere}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label>Niveau d&apos;études <span className="text-red-500">*</span></Label>
                              <Select
                                value={formData.niveauEtudes}
                                onValueChange={(value) => updateFormData('niveauEtudes', value)}
                              >
                                <SelectTrigger className={errors.niveauEtudes ? 'border-red-500' : ''}>
                                  <SelectValue placeholder="Sélectionnez" />
                                </SelectTrigger>
                                <SelectContent>
                                  {studyLevels.map((level) => (
                                    <SelectItem key={level.value} value={level.value}>
                                      {level.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors.niveauEtudes && <p className="text-sm text-red-500">{errors.niveauEtudes}</p>}
                            </div>
                          </div>

                          <FileUpload
                            label="Attestation d'inscription pédagogique"
                            field="attestationFile"
                            accept=".pdf,.jpg,.jpeg,.png"
                            description="Justificatif de votre statut étudiant"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 4: Confirmation */}
                    {currentStep === 4 && (
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-slate-900">Confirmation</h2>
                            <p className="text-sm text-slate-600">Vérifiez vos informations</p>
                          </div>
                        </div>

                        {/* Récapitulatif */}
                        <div className="bg-slate-50 rounded-xl p-6 mb-6 space-y-4">
                          <h3 className="font-semibold text-slate-900">Récapitulatif de vos informations</h3>
                          
                          <div className="grid sm:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-slate-500">Nom complet</p>
                              <p className="font-medium">{formData.prenom} {formData.nom}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Email</p>
                              <p className="font-medium">{formData.email}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Téléphone</p>
                              <p className="font-medium">{formData.telephone}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Date de naissance</p>
                              <p className="font-medium">{formData.dateNaissance ? new Date(formData.dateNaissance).toLocaleDateString('fr-FR') : '-'}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Pièce d&apos;identité</p>
                              <p className="font-medium">{pieceTypes.find(p => p.value === formData.typePiece)?.label} - {formData.numeroPiece}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Université</p>
                              <p className="font-medium">{universities.find(u => u.value === formData.universite)?.label}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Filière</p>
                              <p className="font-medium">{formData.filiere}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Niveau</p>
                              <p className="font-medium">{studyLevels.find(l => l.value === formData.niveauEtudes)?.label}</p>
                            </div>
                          </div>

                          <div className="flex gap-4 flex-wrap">
                            {formData.fichierPiece && (
                              <div className="flex items-center gap-2 text-sm text-green-600">
                                <FileCheck className="w-4 h-4" />
                                Pièce d&apos;identité jointe
                              </div>
                            )}
                            {formData.attestationFile && (
                              <div className="flex items-center gap-2 text-sm text-green-600">
                                <FileCheck className="w-4 h-4" />
                                Attestation jointe
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Conditions */}
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="conditions"
                            checked={formData.accepteConditions}
                            onChange={(e) => updateFormData('accepteConditions', e.target.checked)}
                            className="mt-1 w-4 h-4 text-orange-500"
                          />
                          <label htmlFor="conditions" className="text-sm text-slate-600">
                            J&apos;accepte les <Link href="#" className="text-orange-500 hover:underline">conditions d&apos;adhésion</Link> à MUNASEB et j&apos;atteste l&apos;exactitude des informations fournies.
                          </label>
                        </div>
                        {errors.accepteConditions && (
                          <p className="text-sm text-red-500 mt-2">{errors.accepteConditions}</p>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  {currentStep > 1 ? (
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Retour
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <Button
                      onClick={handleNext}
                      className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
                    >
                      Suivant
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Valider ma préinscription
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </main>
  )
}
