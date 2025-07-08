import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCategories } from '@/hooks/useCategories'
import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Sidebar = ({ isOpen, onClose }) => {
  const { categories, loading } = useCategories()

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 }
  }

  const NavItem = ({ to, icon, label, count, exact = false }) => (
    <NavLink
      to={to}
      end={exact}
      className={({ isActive }) =>
        cn(
          'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
            : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
        )
      }
      onClick={onClose}
    >
      <div className="flex items-center gap-3">
        <ApperIcon name={icon} className="h-4 w-4" />
        <span>{label}</span>
      </div>
      {count !== undefined && (
        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
          {count}
        </span>
      )}
    </NavLink>
  )

  const CategoryItem = ({ category }) => (
    <NavLink
      to={`/category/${category.id}`}
      className={({ isActive }) =>
        cn(
          'flex items-center justify-between px-4 py-2 rounded-lg text-sm transition-all duration-200',
          isActive
            ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-900 border-l-4 border-purple-600'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        )
      }
      onClick={onClose}
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: category.color }}
        />
        <span>{category.name}</span>
      </div>
      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
        {category.taskCount}
      </span>
    </NavLink>
  )

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white/80 lg:backdrop-blur-lg">
      <div className="flex flex-col flex-1 min-h-0 pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center">
            <ApperIcon name="CheckSquare" className="h-5 w-5 text-white" />
          </div>
          <h1 className="ml-3 text-xl font-bold font-jakarta bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            TaskFlow
          </h1>
        </div>
        
        <nav className="flex-1 px-2 space-y-1">
          <NavItem to="/" icon="Home" label="All Tasks" exact />
          <NavItem to="/today" icon="Calendar" label="Today" />
          <NavItem to="/upcoming" icon="Clock" label="Upcoming" />
          <NavItem to="/completed" icon="CheckCircle" label="Completed" />
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <div className="flex items-center justify-between px-3 py-2 mb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Categories
              </h3>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ApperIcon name="Plus" className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="space-y-1">
              {loading ? (
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                categories.map((category) => (
                  <CategoryItem key={category.id} category={category} />
                ))
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  )

  // Mobile Sidebar
  const MobileSidebar = () => (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-lg lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center">
                    <ApperIcon name="CheckSquare" className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold font-jakarta bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                    TaskFlow
                  </h1>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <ApperIcon name="X" className="h-5 w-5" />
                </Button>
              </div>
              
              <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                <NavItem to="/" icon="Home" label="All Tasks" exact />
                <NavItem to="/today" icon="Calendar" label="Today" />
                <NavItem to="/upcoming" icon="Clock" label="Upcoming" />
                <NavItem to="/completed" icon="CheckCircle" label="Completed" />
                
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between px-3 py-2 mb-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Categories
                    </h3>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ApperIcon name="Plus" className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="space-y-1">
                    {loading ? (
                      <div className="space-y-2">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="h-8 bg-gray-200 rounded-lg animate-pulse" />
                        ))}
                      </div>
                    ) : (
                      categories.map((category) => (
                        <CategoryItem key={category.id} category={category} />
                      ))
                    )}
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}

export default Sidebar