import React from 'react'
import { motion } from 'framer-motion'
import Checkbox from '@/components/atoms/Checkbox'

const TaskCheckbox = ({ checked, onCheckedChange, ...props }) => {
  return (
    <motion.div
      animate={checked ? 'completed' : 'incomplete'}
      variants={{
        completed: { scale: 1 },
        incomplete: { scale: 1 }
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        {...props}
      />
    </motion.div>
  )
}

export default TaskCheckbox