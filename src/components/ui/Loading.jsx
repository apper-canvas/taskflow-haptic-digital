import React from 'react'
import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 pt-1">
              <div className="w-5 h-5 bg-gray-200 rounded shimmer" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded shimmer w-3/4" />
                <div className="w-6 h-6 bg-gray-200 rounded shimmer" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 bg-gray-200 rounded-full shimmer w-16" />
                <div className="h-4 bg-gray-200 rounded shimmer w-12" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Loading