import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { UrgencyLevel } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUrgencyConfig(level: UrgencyLevel) {
  const configs = {
    emergency: {
      label: 'Immediate Emergency',
      shortLabel: 'Emergency',
      color: 'text-error',
      bg: 'bg-error-container',
      border: 'border-error/20',
      dot: 'bg-error',
      badge: 'badge-emergency',
      icon: '🚨',
      timeframe: 'Call 999 or go to ER immediately',
    },
    urgent: {
      label: 'Urgent Care Needed',
      shortLabel: 'Urgent',
      color: 'text-primary',
      bg: 'bg-primary-fixed',
      border: 'border-primary/20',
      dot: 'bg-secondary-container',
      badge: 'badge-urgent',
      icon: '⚠️',
      timeframe: 'See a doctor within 2–4 hours',
    },
    routine: {
      label: 'Routine / Self-Care',
      shortLabel: 'Routine',
      color: 'text-success-green',
      bg: 'bg-success-green-light',
      border: 'border-success-green/20',
      dot: 'bg-success-green',
      badge: 'badge-routine',
      icon: '✅',
      timeframe: 'Schedule an appointment or self-manage',
    },
  }
  return configs[level]
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatWaitTime(minutes: number | null) {
  if (minutes === null) return 'Unknown'
  if (minutes < 5) return '< 5 min'
  return `${minutes} min`
}
