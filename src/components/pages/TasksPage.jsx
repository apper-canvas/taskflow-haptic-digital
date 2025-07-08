import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { isToday, isPast, isFuture } from 'date-fns'
import { useTasks } from '@/hooks/useTasks'
import { useCategories } from '@/hooks/useCategories'
import QuickAdd from '@/components/organisms/QuickAdd'
import FilterBar from '@/components/organisms/FilterBar'
import TaskList from '@/components/organisms/TaskList'
import { cn } from '@/utils/cn'

const TasksPage = () => {
  const { categoryId } = useParams()
  const { tasks, loading, error, createTask, updateTask, deleteTask, refetch } = useTasks(categoryId)
  const { categories } = useCategories()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('priority')
  const [filterBy, setFilterBy] = useState('all')
  const [focusedTaskId, setFocusedTaskId] = useState(null)
  const [isFocusModeActive, setIsFocusModeActive] = useState(false)

  const currentCategory = categories.find(cat => cat.id === categoryId)

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return task.title.toLowerCase().includes(query) ||
               task.description?.toLowerCase().includes(query)
      }
      
      // Status filter
      switch (filterBy) {
        case 'incomplete':
          return !task.completed
        case 'completed':
          return task.completed
        case 'overdue':
          return task.dueDate && isPast(task.dueDate) && !isToday(task.dueDate) && !task.completed
        case 'today':
          return task.dueDate && isToday(task.dueDate)
        case 'all':
        default:
          return true
      }
    })

    // Sort tasks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return a.priority - b.priority
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate) - new Date(b.dueDate)
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return filtered
  }, [tasks, searchQuery, filterBy, sortBy])

  const handleTaskFocus = (taskId) => {
    setFocusedTaskId(taskId)
    setIsFocusModeActive(!!taskId)
  }

  const handleToggleFocusMode = () => {
    if (isFocusModeActive) {
      setIsFocusModeActive(false)
      setFocusedTaskId(null)
    } else {
      setIsFocusModeActive(true)
      if (filteredAndSortedTasks.length > 0) {
        setFocusedTaskId(filteredAndSortedTasks[0].Id)
      }
    }
  }

  const handleSearchClear = () => {
    setSearchQuery('')
  }

  const pageTitle = currentCategory ? currentCategory.name : 'All Tasks'
  const taskCount = filteredAndSortedTasks.length
  const completedCount = filteredAndSortedTasks.filter(task => task.completed).length

  return (
    <div className={cn(
      'min-h-full transition-all duration-300',
      isFocusModeActive && 'focus-mode'
    )}>
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold font-jakarta bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              {pageTitle}
            </h1>
            {currentCategory && (
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: currentCategory.color }}
              />
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{taskCount} tasks</span>
            {completedCount > 0 && (
              <span>• {completedCount} completed</span>
            )}
          </div>
        </motion.div>

        <QuickAdd onTaskCreate={createTask} />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchClear={handleSearchClear}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filterBy={filterBy}
          onFilterChange={setFilterBy}
          onToggleFocusMode={handleToggleFocusMode}
          isFocusModeActive={isFocusModeActive}
        />

        <TaskList
          tasks={filteredAndSortedTasks}
          loading={loading}
          error={error}
          onTaskUpdate={updateTask}
          onTaskDelete={deleteTask}
          onRetry={refetch}
          focusedTaskId={focusedTaskId}
          onTaskFocus={handleTaskFocus}
        />
      </div>
    </div>
  )
}

export default TasksPage