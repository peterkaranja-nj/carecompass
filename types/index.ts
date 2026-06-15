export type UrgencyLevel = 'emergency' | 'urgent' | 'routine'

export interface Clinic {
  id: string
  name: string
  type: 'hospital' | 'urgent-care' | 'clinic' | 'pharmacy'
  address: string
  area: string
  distance: string
  waitMinutes: number | null
  isOpen: boolean
  hours: string
  phone: string
  whatsapp?: string
  services: string[]
  acceptsUninsured: boolean
  costRange: 'free' | 'low' | 'moderate' | 'high'
  rating: number
  reviewCount: number
  coordinates: { lat: number; lng: number }
  verified: boolean
}

export interface SymptomCheck {
  id: string
  date: string
  symptoms: string[]
  urgency: UrgencyLevel
  summary: string
  recommendation: string
}

export interface TriageResult {
  urgency: UrgencyLevel
  title: string
  description: string
  actions: string[]
  timeframe: string
  nearbyClinics?: Clinic[]
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface AdminStats {
  totalChecks: number
  checksToday: number
  emergencyRate: number
  urgentRate: number
  routineRate: number
  avgResponseTime: number
  activeClinics: number
  newUsersThisWeek: number
}
