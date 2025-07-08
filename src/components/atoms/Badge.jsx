import React from 'react'
import { cn } from '@/utils/cn'

const Badge = React.forwardRef(({ 
  className, 
  variant = 'default',
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-purple-100 text-purple-800 border-purple-200',
    secondary: 'bg-gray-100 text-gray-800 border-gray-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    outline: 'border-2 border-purple-200 text-purple-700 bg-transparent'
  }

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        'transition-colors duration-200',
        variants[variant],
        className
      )}
      {...props}
    />
  )
})

Badge.displayName = 'Badge'

export default Badge