'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Users,
  Download,
  Search,
  Filter,
  RefreshCw,
  ArrowLeft,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  XCircle,
  UserCheck,
  UserX,
  Eye,
  Trash2,
  Sparkles,
  AlertCircle,
  Calendar
} from 'lucide-react'

interface Preinscription {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string
  dateNaissance: string
  universite: string
  filiere: string
  niveauEtudes: string
  matricule: string | null
  status: string
  createdAt: string
}

const universities: Record<string, string> = {
  'ujkz': 'Université Joseph Ki-Zerbo (Ouagadougou)',
  'unb': 'Université Nazi Boni (Bobo-Dioulasso)',
  'upb': 'Université Polytechnique de Bobo-Dioulasso',
  'uds': 'Université de Dédougou',
  'unk': 'Université Norbert Zongo (Koudougou)',
  'uae': 'Université Aboubacar Maiga (Fada)',
  'udn': 'Université de Dori',
  'uga': 'Université de Gaoua',
  'autres': 'Autre établissement',
}

const studyLevels: Record<string, string> = {
  'l1': 'Licence 1',
  'l2': 'Licence 2',
  'l3': 'Licence 3',
  'm1': 'Master 1',
  'm2': 'Master 2',
  'doctorat': 'Doctorat',
}

const statusColors: Record<string, string> = {
  'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'confirmed': 'bg-green-100 text-green-800 border-green-200',
  'rejected': 'bg-red-100 text-red-800 border-red-200',
}

const statusLabels: Record<string, string> = {
  'pending': 'En attente',
  'confirmed': 'Confirmé',
  'rejected': 'Refusé',
}

const statusIcons: Record<string, React.ElementType> = {
  'pending': Clock,
  'confirmed': CheckCircle2,
  'rejected': XCircle,
}

export default function AdminPage() {
  const [preinscriptions, setPreinscriptions] = useState<Preinscription[]>([])
  const [filteredData, setFilteredData] = useState<Preinscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedItem, setSelectedItem] = useState<Preinscription | null>(null)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    rejected: 0,
  })

  // Fetch preinscriptions
  const fetchPreinscriptions = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/preinscription')
      const data = await response.json()
      setPreinscriptions(data.preinscriptions || [])
      
      // Calculate stats
      const total = data.preinscriptions?.length || 0
      const pending = data.preinscriptions?.filter((p: Preinscription) => p.status === 'pending').length || 0
      const confirmed = data.preinscriptions?.filter((p: Preinscription) => p.status === 'confirmed').length || 0
      const rejected = data.preinscriptions?.filter((p: Preinscription) => p.status === 'rejected').length || 0
      setStats({ total, pending, confirmed, rejected })
    } catch (error) {
      console.error('Erreur lors du chargement:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPreinscriptions()
  }, [])

  // Filter data
  useEffect(() => {
    let filtered = preinscriptions

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.nom.toLowerCase().includes(term) ||
          p.prenom.toLowerCase().includes(term) ||
          p.email.toLowerCase().includes(term) ||
          p.telephone.includes(term)
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((p) => p.status === statusFilter)
    }

    setFilteredData(filtered)
  }, [searchTerm, statusFilter, preinscriptions])

  // Update status
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch('/api/preinscription', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })
      fetchPreinscriptions()
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
    }
  }

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Nom', 'Prénom', 'Email', 'Téléphone', 'Date de naissance', 'Université', 'Filière', 'Niveau', 'Matricule', 'Statut', 'Date de préinscription']
    
    const rows = filteredData.map((p) => [
      p.nom,
      p.prenom,
      p.email,
      p.telephone,
      p.dateNaissance,
      universities[p.universite] || p.universite,
      p.filiere,
      studyLevels[p.niveauEtudes] || p.niveauEtudes,
      p.matricule || '',
      statusLabels[p.status] || p.status,
      new Date(p.createdAt).toLocaleDateString('fr-FR'),
    ])

    const csvContent = [
      headers.join(';'),
      ...rows.map((row) => row.join(';')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `preinscriptions_munaseb_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  // Delete preinscription
  const deletePreinscription = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette préinscription ?')) return
    
    try {
      await fetch(`/api/preinscription?id=${id}`, { method: 'DELETE' })
      fetchPreinscriptions()
      setSelectedItem(null)
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au site
              </Button>
            </Link>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <Image
                src="/images/cenou-logo.jpg"
                alt="CENOU Logo"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-orange-500">MUNASEB</span>
              <Badge variant="secondary" className="ml-2">Admin</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchPreinscriptions}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              size="sm"
              onClick={exportToCSV}
              disabled={filteredData.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Exporter CSV
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <Users className="w-10 h-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">En attente</p>
                  <p className="text-3xl font-bold">{stats.pending}</p>
                </div>
                <Clock className="w-10 h-10 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Confirmés</p>
                  <p className="text-3xl font-bold">{stats.confirmed}</p>
                </div>
                <UserCheck className="w-10 h-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-pink-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Refusés</p>
                  <p className="text-3xl font-bold">{stats.rejected}</p>
                </div>
                <UserX className="w-10 h-10 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Rechercher par nom, email, téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="confirmed">Confirmés</SelectItem>
              <SelectItem value="rejected">Refusés</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-xl overflow-hidden">
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                Liste des préinscriptions ({filteredData.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
                </div>
              ) : filteredData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                  <AlertCircle className="w-12 h-12 mb-4 text-slate-300" />
                  <p className="text-lg font-medium">Aucune préinscription trouvée</p>
                  <p className="text-sm">Les nouvelles préinscriptions apparaîtront ici</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50/50">
                        <TableHead className="font-semibold">Nom complet</TableHead>
                        <TableHead className="font-semibold">Contact</TableHead>
                        <TableHead className="font-semibold">Université</TableHead>
                        <TableHead className="font-semibold">Filière</TableHead>
                        <TableHead className="font-semibold">Statut</TableHead>
                        <TableHead className="font-semibold">Date</TableHead>
                        <TableHead className="font-semibold text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((item, index) => {
                        const StatusIcon = statusIcons[item.status] || Clock
                        return (
                          <motion.tr
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-slate-50/50 cursor-pointer border-b"
                            onClick={() => setSelectedItem(item)}
                          >
                            <TableCell>
                              <div className="font-medium text-slate-900">
                                {item.prenom} {item.nom}
                              </div>
                              {item.matricule && (
                                <div className="text-xs text-slate-500">
                                  Mat: {item.matricule}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1 text-sm">
                                  <Mail className="w-3 h-3 text-slate-400" />
                                  {item.email}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-slate-500">
                                  <Phone className="w-3 h-3" />
                                  {item.telephone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="max-w-48 truncate text-sm">
                                {universities[item.universite] || item.universite}
                              </div>
                              <div className="text-xs text-slate-500">
                                {studyLevels[item.niveauEtudes]}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{item.filiere}</span>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={statusColors[item.status]}
                              >
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusLabels[item.status]}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm text-slate-500">
                                <Calendar className="w-3 h-3" />
                                {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                {item.status === 'pending' && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        updateStatus(item.id, 'confirmed')
                                      }}
                                    >
                                      <CheckCircle2 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        updateStatus(item.id, 'rejected')
                                      }}
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedItem(item)
                                  }}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </motion.tr>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-auto"
            >
              <div className="p-6 border-b bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">
                    {selectedItem.prenom} {selectedItem.nom}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`${statusColors[selectedItem.status]} border-white/20`}
                  >
                    {statusLabels[selectedItem.status]}
                  </Badge>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-500">Email</label>
                    <p className="font-medium">{selectedItem.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-slate-500">Téléphone</label>
                    <p className="font-medium">{selectedItem.telephone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-slate-500">Date de naissance</label>
                    <p className="font-medium">
                      {new Date(selectedItem.dateNaissance).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-slate-500">Matricule</label>
                    <p className="font-medium">{selectedItem.matricule || 'Non renseigné'}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-500">Université</label>
                  <p className="font-medium">
                    {universities[selectedItem.universite] || selectedItem.universite}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-500">Filière</label>
                    <p className="font-medium">{selectedItem.filiere}</p>
                  </div>
                  <div>
                    <label className="text-sm text-slate-500">Niveau</label>
                    <p className="font-medium">{studyLevels[selectedItem.niveauEtudes]}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-500">Date de préinscription</label>
                  <p className="font-medium">
                    {new Date(selectedItem.createdAt).toLocaleString('fr-FR')}
                  </p>
                </div>
              </div>
              <div className="p-6 border-t bg-slate-50 rounded-b-2xl flex flex-wrap gap-2 justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateStatus(selectedItem.id, 'confirmed')}
                    disabled={selectedItem.status === 'confirmed'}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Confirmer
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateStatus(selectedItem.id, 'rejected')}
                    disabled={selectedItem.status === 'rejected'}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Refuser
                  </Button>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deletePreinscription(selectedItem.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
