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
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  ArrowRight,
  User,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  Mail,
  MapPin,
  FileText,
  Upload,
  IdCard,
  Users,
  X,
  FileCheck,
  Image as ImageIcon,
  Plus,
  Trash2,
  Heart
} from 'lucide-react'

// Form data type
interface FormData {
  // Step 1: Personal Info
  nom: string
  prenom: string
  email: string
  telephone: string
  dateNaissance: string
  lieuNaissance: string
  sexe: string
  nationalite: string
  adresse: string
  
  // Step 2: Identity Document
  typePiece: string
  numeroPiece: string
  dateDelivrancePiece: string
  dateExpirationPiece: string
  fichierPiece: File | null
  
  // Step 3: University Info
  universite: string
  filiere: string
  niveauEtudes: string
  matricule: string
  attestationFile: File | null
  photoFile: File | null
  
  // Step 4: Emergency Contact
  contactUrgenceNom: string
  contactUrgenceTelephone: string
  contactUrgenceLien: string
  
  // Step 5: Ayants-droit (optional)
  ajouterAyantsDroit: boolean
  ayantsDroit: Array<{
    nom: string
    prenom: string
    dateNaissance: string
    lien: string
    telephone?: string
  }>
  
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
  nationalite: 'Burkinabè',
  adresse: '',
  typePiece: '',
  numeroPiece: '',
  dateDelivrancePiece: '',
  dateExpirationPiece: '',
  fichierPiece: null,
  universite: '',
  filiere: '',
  niveauEtudes: '',
  matricule: '',
  attestationFile: null,
  photoFile: null,
  contactUrgenceNom: '',
  contactUrgenceTelephone: '',
  contactUrgenceLien: '',
  ajouterAyantsDroit: false,
  ayantsDroit: [],
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

const lienParente = [
  { value: 'pere', label: 'Père' },
  { value: 'mere', label: 'Mère' },
  { value: 'conjoint', label: 'Conjoint(e)' },
  { value: 'frere', label: 'Frère' },
  { value: 'soeur', label: 'Sœur' },
  { value: 'enfant', label: 'Enfant' },
  { value: 'tuteur', label: 'Tuteur/Tutrice' },
  { value: 'autre', label: 'Autre' },
]

const lienUrgence = [
  { value: 'pere', label: 'Père' },
  { value: 'mere', label: 'Mère' },
  { value: 'conjoint', label: 'Conjoint(e)' },
  { value: 'frere_soeur', label: 'Frère/Sœur' },
  { value: 'ami', label: 'Ami(e)' },
  { value: 'tuteur', label: 'Tuteur/Tutrice' },
  { value: 'autre', label: 'Autre' },
]

// Step icons and titles
const steps = [
  { title: 'Informations personnelles', icon: User, description: 'Identité et coordonnées' },
  { title: 'Pièce d\'identité', icon: IdCard, description: 'Document officiel' },
  { title: 'Informations universitaires', icon: GraduationCap, description: 'Établissement et documents' },
  { title: 'Contact d\'urgence', icon: Phone, description: 'Personne à joindre' },
  { title: 'Confirmation', icon: CheckCircle2, description: 'Validation finale' },
]

export default function PreinscriptionPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const progress = (currentStep / 5) * 100

  // File handling
  const handleFileChange = (field: 'fichierPiece' | 'attestationFile' | 'photoFile', file: File | null) => {
    setFormData({ ...formData, [field]: file })
    if (file && field === 'fichierPiece') {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  // Ayants-droit management
  const addAyantDroit = () => {
    setFormData({
      ...formData,
      ayantsDroit: [
        ...formData.ayantsDroit,
        { nom: '', prenom: '', dateNaissance: '', lien: '', telephone: '' }
      ]
    })
  }

  const removeAyantDroit = (index: number) => {
    const newAyantsDroit = formData.ayantsDroit.filter((_, i) => i !== index)
    setFormData({ ...formData, ayantsDroit: newAyantsDroit })
  }

  const updateAyantDroit = (index: number, field: string, value: string) => {
    const newAyantsDroit = [...formData.ayantsDroit]
    newAyantsDroit[index] = { ...newAyantsDroit[index], [field]: value }
    setFormData({ ...formData, ayantsDroit: newAyantsDroit })
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
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.telephone.replace(/\s/g, ''))) {
      newErrors.telephone = 'Veuillez entrer un numéro valide'
    }
    if (!formData.dateNaissance) newErrors.dateNaissance = 'La date de naissance est requise'
    if (!formData.lieuNaissance.trim()) newErrors.lieuNaissance = 'Le lieu de naissance est requis'
    if (!formData.sexe) newErrors.sexe = 'Le sexe est requis'
    if (!formData.adresse.trim()) newErrors.adresse = 'L\'adresse est requise'
    
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
    if (!formData.photoFile) newErrors.photoFile = 'La photo d\'identité est requise'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep4 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    
    if (!formData.contactUrgenceNom.trim()) newErrors.contactUrgenceNom = 'Le nom du contact est requis'
    if (!formData.contactUrgenceTelephone.trim()) newErrors.contactUrgenceTelephone = 'Le téléphone du contact est requis'
    if (!formData.contactUrgenceLien) newErrors.contactUrgenceLien = 'Le lien de parenté est requis'
    
    // Validate ayants-droit if added
    if (formData.ajouterAyantsDroit) {
      formData.ayantsDroit.forEach((ad, index) => {
        if (!ad.nom.trim()) newErrors[`ayantDroit_${index}_nom` as keyof FormData] = 'Nom requis'
        if (!ad.prenom.trim()) newErrors[`ayantDroit_${index}_prenom` as keyof FormData] = 'Prénom requis'
        if (!ad.dateNaissance) newErrors[`ayantDroit_${index}_dateNaissance` as keyof FormData] = 'Date requise'
        if (!ad.lien) newErrors[`ayantDroit_${index}_lien` as keyof FormData] = 'Lien requis'
      })
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep5 = (): boolean => {
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
    else if (currentStep === 4) isValid = validateStep4()
    
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
    if (!validateStep5()) return
    
    setIsSubmitting(true)
    
    try {
      // Create FormData for file upload
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'ayantsDroit') {
          submitData.append(key, JSON.stringify(value))
        } else if (value instanceof File) {
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
    field: 'fichierPiece' | 'attestationFile' | 'photoFile'
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
              Préinscription réussie !
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
              Merci pour votre préinscription. Notre équipe vous contactera sous 48h pour finaliser votre adhésion.
            </p>
            
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
                    <p className="text-slate-500">Pièce d'identité</p>
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
                {formData.ajouterAyantsDroit && formData.ayantsDroit.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-slate-500 text-sm">Ayants-droit ajoutés</p>
                    <p className="font-medium">{formData.ayantsDroit.length} personne(s)</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Retour à l&apos;accueil
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-4 overflow-x-auto pb-2">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${index < steps.length - 1 ? 'flex-1 min-w-[100px]' : 'min-w-[100px]'}`}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          currentStep > index + 1
                            ? 'bg-green-500 text-white'
                            : currentStep === index + 1
                            ? 'bg-orange-500 text-white shadow-lg'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {currentStep > index + 1 ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <step.icon className="w-6 h-6" />
                        )}
                      </div>
                      <span
                        className={`mt-2 text-xs font-medium text-center ${
                          currentStep >= index + 1 ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 mt-6 rounded-full transition-all ${
                          currentStep > index + 1 ? 'bg-green-500' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-center text-sm text-slate-600 mt-2">
                Étape {currentStep} sur 5
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
                            <p className="text-sm text-slate-600">Votre identité complète et coordonnées</p>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="nom" className="flex items-center gap-1">
                              Nom <span className="text-red-500">*</span>
                            </Label>
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
                            <Label htmlFor="prenom" className="flex items-center gap-1">
                              Prénom <span className="text-red-500">*</span>
                            </Label>
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
                            <Label htmlFor="email" className="flex items-center gap-1">
                              Email <span className="text-red-500">*</span>
                            </Label>
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
                            <Label htmlFor="telephone" className="flex items-center gap-1">
                              Téléphone <span className="text-red-500">*</span>
                            </Label>
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
                            <Label htmlFor="dateNaissance" className="flex items-center gap-1">
                              Date de naissance <span className="text-red-500">*</span>
                            </Label>
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
                            <Label htmlFor="lieuNaissance" className="flex items-center gap-1">
                              Lieu de naissance <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="lieuNaissance"
                              value={formData.lieuNaissance}
                              onChange={(e) => updateFormData('lieuNaissance', e.target.value)}
                              placeholder="Ville de naissance"
                              className={errors.lieuNaissance ? 'border-red-500' : ''}
                            />
                            {errors.lieuNaissance && <p className="text-sm text-red-500">{errors.lieuNaissance}</p>}
                          </div>

                          <div className="space-y-2">
                            <Label className="flex items-center gap-1">
                              Sexe <span className="text-red-500">*</span>
                            </Label>
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

                          <div className="space-y-2">
                            <Label htmlFor="nationalite">Nationalité</Label>
                            <Input
                              id="nationalite"
                              value={formData.nationalite}
                              onChange={(e) => updateFormData('nationalite', e.target.value)}
                              placeholder="Nationalité"
                            />
                          </div>

                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="adresse" className="flex items-center gap-1">
                              Adresse de résidence <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                              <Textarea
                                id="adresse"
                                value={formData.adresse}
                                onChange={(e) => updateFormData('adresse', e.target.value)}
                                placeholder="Quartier, Ville, Province..."
                                className={`pl-10 ${errors.adresse ? 'border-red-500' : ''}`}
                                rows={2}
                              />
                            </div>
                            {errors.adresse && <p className="text-sm text-red-500">{errors.adresse}</p>}
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
                            <p className="text-sm text-slate-600">Document officiel d&apos;identification</p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label className="flex items-center gap-1">
                                Type de pièce <span className="text-red-500">*</span>
                              </Label>
                              <Select
                                value={formData.typePiece}
                                onValueChange={(value) => updateFormData('typePiece', value)}
                              >
                                <SelectTrigger className={errors.typePiece ? 'border-red-500' : ''}>
                                  <SelectValue placeholder="Sélectionnez le type" />
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
                              <Label htmlFor="numeroPiece" className="flex items-center gap-1">
                                Numéro de la pièce <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="numeroPiece"
                                value={formData.numeroPiece}
                                onChange={(e) => updateFormData('numeroPiece', e.target.value)}
                                placeholder="Numéro inscrit sur la pièce"
                                className={errors.numeroPiece ? 'border-red-500' : ''}
                              />
                              {errors.numeroPiece && <p className="text-sm text-red-500">{errors.numeroPiece}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="dateDelivrancePiece" className="flex items-center gap-1">
                                Date de délivrance <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="dateDelivrancePiece"
                                type="date"
                                value={formData.dateDelivrancePiece}
                                onChange={(e) => updateFormData('dateDelivrancePiece', e.target.value)}
                                className={errors.dateDelivrancePiece ? 'border-red-500' : ''}
                              />
                              {errors.dateDelivrancePiece && <p className="text-sm text-red-500">{errors.dateDelivrancePiece}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="dateExpirationPiece">Date d&apos;expiration</Label>
                              <Input
                                id="dateExpirationPiece"
                                type="date"
                                value={formData.dateExpirationPiece}
                                onChange={(e) => updateFormData('dateExpirationPiece', e.target.value)}
                              />
                              <p className="text-xs text-slate-500">Laissez vide si la pièce n&apos;expire pas</p>
                            </div>
                          </div>

                          <FileUpload
                            label="Copie de la pièce d'identité"
                            field="fichierPiece"
                            accept=".pdf,.jpg,.jpeg,.png"
                            description="PDF, JPG ou PNG (max 5MB)"
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
                            <p className="text-sm text-slate-600">Votre établissement et justificatifs</p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label className="flex items-center gap-1">
                              Université <span className="text-red-500">*</span>
                            </Label>
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

                          <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="filiere" className="flex items-center gap-1">
                                Filière <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="filiere"
                                value={formData.filiere}
                                onChange={(e) => updateFormData('filiere', e.target.value)}
                                placeholder="Ex: Informatique, Droit, Médecine..."
                                className={errors.filiere ? 'border-red-500' : ''}
                              />
                              {errors.filiere && <p className="text-sm text-red-500">{errors.filiere}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label className="flex items-center gap-1">
                                Niveau d&apos;études <span className="text-red-500">*</span>
                              </Label>
                              <Select
                                value={formData.niveauEtudes}
                                onValueChange={(value) => updateFormData('niveauEtudes', value)}
                              >
                                <SelectTrigger className={errors.niveauEtudes ? 'border-red-500' : ''}>
                                  <SelectValue placeholder="Sélectionnez votre niveau" />
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

                          <div className="space-y-2">
                            <Label htmlFor="matricule">
                              Matricule étudiant <span className="text-slate-400 text-sm">(optionnel)</span>
                            </Label>
                            <Input
                              id="matricule"
                              value={formData.matricule}
                              onChange={(e) => updateFormData('matricule', e.target.value)}
                              placeholder="Votre matricule si vous en avez un"
                            />
                          </div>

                          <div className="grid sm:grid-cols-2 gap-6">
                            <FileUpload
                              label="Attestation d'inscription pédagogique"
                              field="attestationFile"
                              accept=".pdf"
                              description="Document PDF obligatoire"
                            />

                            <FileUpload
                              label="Photo d'identité"
                              field="photoFile"
                              accept=".jpg,.jpeg,.png"
                              description="Format JPG ou PNG"
                            />
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <p className="text-sm text-blue-800">
                              <strong>ℹ️ Important :</strong> L&apos;attestation pédagogique prouve votre statut d&apos;étudiant. 
                              Elle est délivrée par votre université après votre inscription administrative.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Emergency Contact & Ayants-droit */}
                    {currentStep === 4 && (
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                            <Phone className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-slate-900">Contact d&apos;urgence</h2>
                            <p className="text-sm text-slate-600">Personne à joindre en cas de besoin</p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="grid sm:grid-cols-3 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="contactUrgenceNom" className="flex items-center gap-1">
                                Nom complet <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="contactUrgenceNom"
                                value={formData.contactUrgenceNom}
                                onChange={(e) => updateFormData('contactUrgenceNom', e.target.value)}
                                placeholder="Nom et prénom"
                                className={errors.contactUrgenceNom ? 'border-red-500' : ''}
                              />
                              {errors.contactUrgenceNom && <p className="text-sm text-red-500">{errors.contactUrgenceNom}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="contactUrgenceTelephone" className="flex items-center gap-1">
                                Téléphone <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="contactUrgenceTelephone"
                                type="tel"
                                value={formData.contactUrgenceTelephone}
                                onChange={(e) => updateFormData('contactUrgenceTelephone', e.target.value)}
                                placeholder="+226 XX XX XX XX"
                                className={errors.contactUrgenceTelephone ? 'border-red-500' : ''}
                              />
                              {errors.contactUrgenceTelephone && <p className="text-sm text-red-500">{errors.contactUrgenceTelephone}</p>}
                            </div>

                            <div className="space-y-2">
                              <Label className="flex items-center gap-1">
                                Lien de parenté <span className="text-red-500">*</span>
                              </Label>
                              <Select
                                value={formData.contactUrgenceLien}
                                onValueChange={(value) => updateFormData('contactUrgenceLien', value)}
                              >
                                <SelectTrigger className={errors.contactUrgenceLien ? 'border-red-500' : ''}>
                                  <SelectValue placeholder="Sélectionnez" />
                                </SelectTrigger>
                                <SelectContent>
                                  {lienUrgence.map((lien) => (
                                    <SelectItem key={lien.value} value={lien.value}>
                                      {lien.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors.contactUrgenceLien && <p className="text-sm text-red-500">{errors.contactUrgenceLien}</p>}
                            </div>
                          </div>

                          {/* Ayants-droit Section */}
                          <div className="border-t pt-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <Heart className="w-5 h-5 text-pink-500" />
                                <h3 className="font-semibold text-slate-900">Ayants-droit</h3>
                                <span className="text-sm text-slate-500">(famille à couvrir)</span>
                              </div>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                  checked={formData.ajouterAyantsDroit}
                                  onCheckedChange={(checked) => updateFormData('ajouterAyantsDroit', checked as boolean)}
                                />
                                <span className="text-sm font-medium">Ajouter des ayants-droit</span>
                              </label>
                            </div>

                            <p className="text-sm text-slate-600 mb-4">
                              Vous pouvez ajouter votre conjoint(e) et/ou vos enfants pour qu&apos;ils bénéficient également de la couverture santé.
                            </p>

                            {formData.ajouterAyantsDroit && (
                              <div className="space-y-4">
                                {formData.ayantsDroit.map((ad, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-slate-50 rounded-xl p-4 relative"
                                  >
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeAyantDroit(index)}
                                      className="absolute top-2 right-2 text-red-500"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                    
                                    <p className="font-medium text-slate-700 mb-3">Ayant-droit #{index + 1}</p>
                                    
                                    <div className="grid sm:grid-cols-4 gap-4">
                                      <div className="space-y-2">
                                        <Label>Nom</Label>
                                        <Input
                                          value={ad.nom}
                                          onChange={(e) => updateAyantDroit(index, 'nom', e.target.value)}
                                          placeholder="Nom"
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label>Prénom</Label>
                                        <Input
                                          value={ad.prenom}
                                          onChange={(e) => updateAyantDroit(index, 'prenom', e.target.value)}
                                          placeholder="Prénom"
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label>Date de naissance</Label>
                                        <Input
                                          type="date"
                                          value={ad.dateNaissance}
                                          onChange={(e) => updateAyantDroit(index, 'dateNaissance', e.target.value)}
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label>Lien</Label>
                                        <Select
                                          value={ad.lien}
                                          onValueChange={(value) => updateAyantDroit(index, 'lien', value)}
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Sélectionnez" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {lienParente.map((lien) => (
                                              <SelectItem key={lien.value} value={lien.value}>
                                                {lien.label}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}

                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={addAyantDroit}
                                  className="w-full"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Ajouter un autre ayant-droit
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 5: Confirmation */}
                    {currentStep === 5 && (
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-slate-900">Confirmation</h2>
                            <p className="text-sm text-slate-600">Vérifiez vos informations et validez</p>
                          </div>
                        </div>

                        {/* Summary */}
                        <div className="space-y-4">
                          <div className="bg-slate-50 rounded-xl p-4">
                            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Informations personnelles
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-2 text-sm">
                              <div><span className="text-slate-500">Nom:</span> <span className="font-medium">{formData.prenom} {formData.nom}</span></div>
                              <div><span className="text-slate-500">Email:</span> <span className="font-medium">{formData.email}</span></div>
                              <div><span className="text-slate-500">Téléphone:</span> <span className="font-medium">{formData.telephone}</span></div>
                              <div><span className="text-slate-500">Né(e) le:</span> <span className="font-medium">{formData.dateNaissance && new Date(formData.dateNaissance).toLocaleDateString('fr-FR')}</span></div>
                            </div>
                          </div>

                          <div className="bg-slate-50 rounded-xl p-4">
                            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <IdCard className="w-4 h-4" />
                              Pièce d&apos;identité
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-2 text-sm">
                              <div><span className="text-slate-500">Type:</span> <span className="font-medium">{pieceTypes.find(p => p.value === formData.typePiece)?.label}</span></div>
                              <div><span className="text-slate-500">Numéro:</span> <span className="font-medium">{formData.numeroPiece}</span></div>
                            </div>
                          </div>

                          <div className="bg-slate-50 rounded-xl p-4">
                            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <GraduationCap className="w-4 h-4" />
                              Informations universitaires
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-2 text-sm">
                              <div><span className="text-slate-500">Université:</span> <span className="font-medium">{universities.find(u => u.value === formData.universite)?.label}</span></div>
                              <div><span className="text-slate-500">Filière:</span> <span className="font-medium">{formData.filiere}</span></div>
                              <div><span className="text-slate-500">Niveau:</span> <span className="font-medium">{studyLevels.find(l => l.value === formData.niveauEtudes)?.label}</span></div>
                            </div>
                          </div>

                          {formData.ajouterAyantsDroit && formData.ayantsDroit.length > 0 && (
                            <div className="bg-pink-50 rounded-xl p-4">
                              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                <Heart className="w-4 h-4 text-pink-500" />
                                Ayants-droit ({formData.ayantsDroit.length})
                              </h3>
                              {formData.ayantsDroit.map((ad, index) => (
                                <div key={index} className="text-sm">
                                  {ad.prenom} {ad.nom} - {lienParente.find(l => l.value === ad.lien)?.label}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Cotisation Info */}
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-6">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                              <span className="text-orange-600 font-bold">💰</span>
                            </div>
                            <div>
                              <p className="font-medium text-orange-900">Cotisation annuelle</p>
                              <p className="text-orange-700 text-sm">
                                Après validation, vous devrez régler <span className="font-bold">5 000 FCFA/an</span> pour la couverture individuelle.
                                {formData.ajouterAyantsDroit && formData.ayantsDroit.length > 0 && (
                                  <span> + <span className="font-bold">{formData.ayantsDroit.length * 2500} FCFA</span> pour les ayants-droit.</span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Conditions */}
                        <div className="mt-6 space-y-3">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="conditions"
                              checked={formData.accepteConditions}
                              onCheckedChange={(checked) => updateFormData('accepteConditions', checked as boolean)}
                              className={errors.accepteConditions ? 'border-red-500' : ''}
                            />
                            <Label htmlFor="conditions" className="text-sm text-slate-600 cursor-pointer leading-relaxed">
                              J&apos;atteste que les informations fournies sont exactes et j&apos;accepte les{' '}
                              <a href="#" className="text-orange-500 hover:underline">conditions d&apos;adhésion</a> de MUNASEB.
                            </Label>
                          </div>
                          {errors.accepteConditions && (
                            <p className="text-sm text-red-500 flex items-center gap-1 ml-8">
                              <AlertCircle className="w-4 h-4" />
                              {errors.accepteConditions}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="px-6"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Précédent
                  </Button>

                  {currentStep < 5 ? (
                    <Button
                      onClick={handleNext}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6"
                    >
                      Suivant
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Confirmer ma préinscription
                          <CheckCircle2 className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <div className="mt-8 text-center">
              <p className="text-slate-600 mb-4">Besoin d&apos;aide ?</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm">
                <a href="tel:+2262533739095" className="flex items-center justify-center gap-2 text-slate-700 hover:text-orange-500">
                  <Phone className="w-4 h-4" />
                  (+226) 25 33 73 90 95
                </a>
                <span className="hidden sm:inline text-slate-300">|</span>
                <a href="mailto:contact@munaseb.bf" className="flex items-center justify-center gap-2 text-slate-700 hover:text-orange-500">
                  <Mail className="w-4 h-4" />
                  contact@munaseb.bf
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
