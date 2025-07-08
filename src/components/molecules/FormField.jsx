import React from 'react'
import { cn } from '@/utils/cn'
import Label from '@/components/atoms/Label'
import Input from '@/components/atoms/Input'

const FormField = React.forwardRef(({ 
  label, 
  error, 
  className,
  id,
  ...props 
}, ref) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={id} className="block">
          {label}
        </Label>
      )}
      <Input
        ref={ref}
        id={id}
        className={cn(
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
})

FormField.displayName = 'FormField'

export default FormField