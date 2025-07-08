import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No tasks yet", 
  description = "Create your first task to get started with organizing your work.",
  actionText = "Add Your First Task",
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
        <ApperIcon name="CheckSquare" className="h-10 w-10 text-white" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2 font-jakarta">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        {description}
      </p>
      
      <div className="flex justify-center gap-3">
        <Button
          onClick={onAction}
          variant="amber"
          className="flex items-center gap-2"
        >
          <ApperIcon name="Plus" className="h-4 w-4" />
          {actionText}
        </Button>
        
        <Button
          variant="ghost"
          className="flex items-center gap-2"
        >
          <ApperIcon name="HelpCircle" className="h-4 w-4" />
          Learn More
        </Button>
      </div>
    </motion.div>
  )
}

export default Empty