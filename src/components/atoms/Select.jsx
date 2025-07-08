import React from 'react'
import { cn } from '@/utils/cn'

const Select = React.forwardRef(({ 
  className, 
  children,
  ...props 
}, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
        'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-all duration-200',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
})

Select.displayName = 'Select'

export default Select