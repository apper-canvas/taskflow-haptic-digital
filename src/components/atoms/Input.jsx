import React from 'react'
import { cn } from '@/utils/cn'

const Input = React.forwardRef(({ 
  className, 
  type = 'text', 
  variant = 'default',
  ...props 
}, ref) => {
  const variants = {
    default: 'border-gray-300 focus:border-purple-500 focus:ring-purple-500',
    search: 'border-gray-200 focus:border-purple-400 focus:ring-purple-400 bg-gray-50 focus:bg-white',
    ghost: 'border-transparent bg-transparent focus:border-purple-500 focus:ring-purple-500'
  }

  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-lg border px-3 py-2 text-sm',
        'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-all duration-200',
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export default Input