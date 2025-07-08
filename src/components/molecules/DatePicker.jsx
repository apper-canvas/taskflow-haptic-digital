import React from 'react'
import { format } from 'date-fns'
import Input from '@/components/atoms/Input'
import { cn } from '@/utils/cn'

const DatePicker = React.forwardRef(({ 
  className, 
  value, 
  onChange,
  ...props 
}, ref) => {
  const handleChange = (e) => {
    const dateValue = e.target.value
    if (dateValue) {
      onChange?.(new Date(dateValue))
    } else {
      onChange?.(null)
    }
  }

  const formatForInput = (date) => {
    if (!date) return ''
    return format(date, 'yyyy-MM-dd')
  }

  return (
    <Input
      ref={ref}
      type="date"
      className={cn(className)}
      value={formatForInput(value)}
      onChange={handleChange}
      {...props}
    />
  )
})

DatePicker.displayName = 'DatePicker'

export default DatePicker