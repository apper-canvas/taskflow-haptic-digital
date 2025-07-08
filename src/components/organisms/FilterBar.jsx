import React from 'react'
import { motion } from 'framer-motion'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import Select from '@/components/atoms/Select'
import ApperIcon from '@/components/ApperIcon'
import { useCategories } from '@/hooks/useCategories'

const FilterBar = ({ 
  searchQuery, 
  onSearchChange, 
  onSearchClear,
  sortBy,
  onSortChange,
  filterBy,
  onFilterChange,
  onToggleFocusMode,
  isFocusModeActive
}) => {
  const { categories } = useCategories()

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onClear={onSearchClear}
            placeholder="Search tasks..."
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full sm:w-auto"
          >
            <option value="priority">Sort by Priority</option>
            <option value="dueDate">Sort by Due Date</option>
            <option value="created">Sort by Created</option>
            <option value="title">Sort by Title</option>
          </Select>

          <Select
            value={filterBy}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full sm:w-auto"
          >
            <option value="all">All Tasks</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
            <option value="today">Due Today</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>

          <Button
            variant={isFocusModeActive ? "amber" : "ghost"}
            size="icon"
            onClick={onToggleFocusMode}
            title={isFocusModeActive ? "Exit Focus Mode" : "Enter Focus Mode"}
          >
            <ApperIcon name={isFocusModeActive ? "EyeOff" : "Eye"} className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default FilterBar