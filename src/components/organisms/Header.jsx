import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Header = ({ onMenuToggle, isMobileMenuOpen }) => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-40"
    >
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center">
              <ApperIcon name="CheckSquare" className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold font-jakarta bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <ApperIcon name="Settings" className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <ApperIcon name="Bell" className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header