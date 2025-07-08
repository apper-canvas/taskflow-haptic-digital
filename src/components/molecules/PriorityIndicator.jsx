import React from 'react'
import { cn } from '@/utils/cn'

const PriorityIndicator = ({ priority, className }) => {
  const getPriorityLevel = (priority) => {
    if (priority <= 3) return 'high'
    if (priority <= 6) return 'medium'
    if (priority <= 9) return 'low'
    return 'none'
  }

  const level = getPriorityLevel(priority)
  
  const colors = {
    high: 'bg-red-500',
    medium: 'bg-amber-500',
    low: 'bg-green-500',
    none: 'bg-gray-300'
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className={cn('w-2 h-2 rounded-full', colors[level])} />
      <span className="text-xs text-gray-500 capitalize">{level}</span>
    </div>
  )
}

export default PriorityIndicator