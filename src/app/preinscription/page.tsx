'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
} from 'lucide-react'

// Form data type
interface FormData {
  // Step 1: Personal Info
  nom: string
  prenom: string
  email: string
  telephone: string
  dateNaissance: string
  // Step 2: University Info
  universite: string
  filiere: string
  niveauEtudes: string
  matricule: string
  // Step 3: Confirmation
  accepteConditions: boolean
}

const initialFormData: FormData = {
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  dateNaissance: '',
  universite: '',
  filiere: '',
  niveauEtudes: '',
  matricule: '',
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

// Step icons and titles
const steps = [
  { title: 'Informations personnelles', icon: User },
  { title: 'Informations universitaires', icon: GraduationCap },
  { title: 'Confirmation', icon: CheckCircle2 },
]

export default function PreinscriptionPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const progress = (currentStep / 3) * 100

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
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    
    if (!formData.universite) newErrors.universite = 'Veuillez sélectionner votre université'
    if (!formData.filiere.trim()) newErrors.filiere = 'La filière est requise'
    if (!formData.niveauEtudes) newErrors.niveauEtudes = 'Veuillez sélectionner votre niveau'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = (): boolean => {
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
    if (!validateStep3()) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/preinscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
  const updateFormData = (field: keyof FormData, value: string | boolean) => {
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
            
            <Card className="max-w-md mx-auto border-0 shadow-lg mb-8">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Récapitulatif</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Nom complet:</span>
                    <span className="font-medium">{formData.prenom} {formData.nom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Email:</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Téléphone:</span>
                    <span className="font-medium">{formData.telephone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Université:</span>
                    <span className="font-medium">
                      {universities.find(u => u.value === formData.universite)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Niveau:</span>
                    <span className="font-medium">
                      {studyLevels.find(l => l.value === formData.niveauEtudes)?.label}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Retour à l&apos;accueil
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSuccess(false)
                  setCurrentStep(1)
                  setFormData(initialFormData)
                }}
              >
                Nouvelle préinscription
              </Button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
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
                        className={`mt-2 text-xs sm:text-sm font-medium hidden sm:block ${
                          currentStep >= index + 1 ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-4 rounded-full transition-all ${
                          currentStep > index + 1 ? 'bg-green-500' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-center text-sm text-slate-600 mt-2">
                Étape {currentStep} sur 3
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
                            <p className="text-sm text-slate-600">Vos coordonnées pour vous contacter</p>
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
                              className={errors.nom ? 'border-red-500 focus:ring-red-500' : ''}
                            />
                            {errors.nom && (
                              <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.nom}
                              </p>
                            )}
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
                              className={errors.prenom ? 'border-red-500 focus:ring-red-500' : ''}
                            />
                            {errors.prenom && (
                              <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.prenom}
                              </p>
                            )}
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
                                className={`pl-10 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                              />
                            </div>
                            {errors.email && (
                              <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.email}
                              </p>
                            )}
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
                                className={`pl-10 ${errors.telephone ? 'border-red-500 focus:ring-red-500' : ''}`}
                              />
                            </div>
                            {errors.telephone && (
                              <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.telephone}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="dateNaissance" className="flex items-center gap-1">
                              Date de naissance <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="dateNaissance"
                              type="date"
                              value={formData.dateNaissance}
                              onChange={(e) => updateFormData('dateNaissance', e.target.value)}
                              className={errors.dateNaissance ? 'border-red-500 focus:ring-red-500' : ''}
                            />
                            {errors.dateNaissance && (
                              <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.dateNaissance}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: University Information */}
                    {currentStep === 2 && (
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-slate-900">Informations universitaires</h2>
                            <p className="text-sm text-slate-600">Votre établissement et filière d&apos;études</p>
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
                            {errors.universite && (
                              <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.universite}
                              </p>
                            )}
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
                                className={errors.filiere ? 'border-red-500 focus:ring-red-500' : ''}
                              />
                              {errors.filiere && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                  <AlertCircle className="w-4 h-4" />
                                  {errors.filiere}
                                </p>
                              )}
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
                              {errors.niveauEtudes && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                  <AlertCircle className="w-4 h-4" />
                                  {errors.niveauEtudes}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="matricule">
                              Matricule <span className="text-slate-400 text-sm">(optionnel)</span>
                            </Label>
                            <Input
                              id="matricule"
                              value={formData.matricule}
                              onChange={(e) => updateFormData('matricule', e.target.value)}
                              placeholder="Votre matricule étudiant"
                            />
                            <p className="text-xs text-slate-500">
                              Le matricule facilitera la vérification de votre statut d&apos;étudiant.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {currentStep === 3 && (
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
                        <div className="bg-slate-50 rounded-xl p-6 mb-6">
                          <h3 className="font-semibold text-slate-900 mb-4">Récapitulatif de vos informations</h3>
                          
                          <div className="grid sm:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-slate-500">Nom complet</p>
                              <p className="font-medium text-slate-900">{formData.prenom} {formData.nom}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Email</p>
                              <p className="font-medium text-slate-900">{formData.email}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Téléphone</p>
                              <p className="font-medium text-slate-900">{formData.telephone}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Date de naissance</p>
                              <p className="font-medium text-slate-900">
                                {new Date(formData.dateNaissance).toLocaleDateString('fr-FR', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-500">Université</p>
                              <p className="font-medium text-slate-900">
                                {universities.find(u => u.value === formData.universite)?.label}
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-500">Filière</p>
                              <p className="font-medium text-slate-900">{formData.filiere}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Niveau</p>
                              <p className="font-medium text-slate-900">
                                {studyLevels.find(l => l.value === formData.niveauEtudes)?.label}
                              </p>
                            </div>
                            {formData.matricule && (
                              <div>
                                <p className="text-slate-500">Matricule</p>
                                <p className="font-medium text-slate-900">{formData.matricule}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Cotisation Info */}
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                              <span className="text-orange-600 font-bold">💰</span>
                            </div>
                            <div>
                              <p className="font-medium text-orange-900">Cotisation annuelle</p>
                              <p className="text-orange-700">
                                Après validation de votre préinscription, vous devrez régler une cotisation de{' '}
                                <span className="font-bold">5 000 FCFA/an</span> pour bénéficier de la couverture santé.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Conditions */}
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="conditions"
                              checked={formData.accepteConditions}
                              onCheckedChange={(checked) => updateFormData('accepteConditions', checked as boolean)}
                              className={errors.accepteConditions ? 'border-red-500' : ''}
                            />
                            <Label htmlFor="conditions" className="text-sm text-slate-600 cursor-pointer leading-relaxed">
                              J&apos;accepte les{' '}
                              <a href="#" className="text-orange-500 hover:underline">
                                conditions d&apos;adhésion
                              </a>{' '}
                              et autorise MUNASEB à me contacter pour finaliser mon inscription.
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

                  {currentStep < 3 ? (
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
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="flex items-center justify-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4" />
                  01 BP 1926 Ouagadougou
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
