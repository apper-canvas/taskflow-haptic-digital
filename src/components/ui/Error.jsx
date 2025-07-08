import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ error, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-sm border border-red-200 p-8 text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <ApperIcon name="AlertCircle" className="h-8 w-8 text-white" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-6">
        {error || 'An unexpected error occurred while loading your tasks.'}
      </p>
      
      <div className="flex justify-center gap-3">
        <Button
          onClick={onRetry}
          variant="amber"
          className="flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" className="h-4 w-4" />
          Try Again
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => window.location.reload()}
          className="flex items-center gap-2"
        >
          <ApperIcon name="RotateCcw" className="h-4 w-4" />
          Reload Page
        </Button>
      </div>
    </motion.div>
  )
}

export default Error