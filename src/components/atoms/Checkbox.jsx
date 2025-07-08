import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'

const Checkbox = React.forwardRef(({ 
  className, 
  checked, 
  onCheckedChange,
  ...props 
}, ref) => {
  return (
    <motion.button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={checked}
      className={cn(
        'peer h-5 w-5 shrink-0 rounded border-2 border-gray-300 bg-white',
        'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-all duration-200',
        checked && 'bg-gradient-to-r from-purple-600 to-purple-700 border-purple-600',
        className
      )}
      onClick={() => onCheckedChange?.(!checked)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={checked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      {...props}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center w-full h-full"
        >
          <ApperIcon name="Check" className="h-3 w-3 text-white" />
        </motion.div>
      )}
    </motion.button>
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox