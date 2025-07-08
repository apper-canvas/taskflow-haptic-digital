import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { format, isToday, isPast } from 'date-fns'
import { cn } from '@/utils/cn'
import TaskCheckbox from '@/components/molecules/TaskCheckbox'
import CategoryBadge from '@/components/molecules/CategoryBadge'
import PriorityIndicator from '@/components/molecules/PriorityIndicator'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { useCategories } from '@/hooks/useCategories'

const TaskCard = ({ 
  task, 
  onUpdate, 
  onDelete, 
  onFocus,
  isFocused 
}) => {
  const { categories } = useCategories()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)

  const category = categories.find(cat => cat.id === task.categoryId)

  const handleCompleteToggle = async () => {
    try {
      await onUpdate(task.Id, { completed: !task.completed })
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSaveEdit = async () => {
    if (editTitle.trim() && editTitle !== task.title) {
      try {
        await onUpdate(task.Id, { title: editTitle.trim() })
      } catch (error) {
        console.error('Failed to update task:', error)
      }
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditTitle(task.title)
    setIsEditing(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit()
    } else if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await onDelete(task.Id)
      } catch (error) {
        console.error('Failed to delete task:', error)
      }
    }
  }

  const handleFocus = () => {
    onFocus?.(isFocused ? null : task.Id)
  }

  const isOverdue = task.dueDate && isPast(task.dueDate) && !isToday(task.dueDate) && !task.completed
  const isDueToday = task.dueDate && isToday(task.dueDate) && !task.completed

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        'bg-white rounded-xl shadow-sm border border-gray-200 p-4 transition-all duration-200',
        'hover:shadow-md hover:border-gray-300',
        task.completed && 'bg-gray-50 opacity-75',
        isOverdue && 'border-red-300 bg-red-50',
        isDueToday && 'border-amber-300 bg-amber-50',
        isFocused && 'ring-2 ring-purple-500 ring-offset-2 shadow-lg',
        `task-priority-${task.priority <= 3 ? 'high' : task.priority <= 6 ? 'medium' : task.priority <= 9 ? 'low' : 'none'}`,
        'task-card'
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 pt-1">
          <TaskCheckbox
            checked={task.completed}
            onCheckedChange={handleCompleteToggle}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={handleKeyPress}
                  onBlur={handleSaveEdit}
                  className="w-full px-0 py-1 text-sm font-medium bg-transparent border-none focus:outline-none focus:ring-0"
                  autoFocus
                />
              ) : (
                <h3
                  className={cn(
                    'text-sm font-medium cursor-pointer hover:text-purple-600',
                    task.completed && 'line-through text-gray-500'
                  )}
                  onClick={handleEdit}
                >
                  {task.title}
                </h3>
              )}
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFocus}
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ApperIcon 
                  name={isFocused ? "EyeOff" : "Eye"} 
                  className="h-3 w-3" 
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
              >
                <ApperIcon name="Trash2" className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {category && (
                <CategoryBadge category={category} />
              )}
              <PriorityIndicator priority={task.priority} />
            </div>

            {task.dueDate && (
              <div className={cn(
                'flex items-center gap-1 text-xs',
                isOverdue && 'text-red-600',
                isDueToday && 'text-amber-600',
                !isOverdue && !isDueToday && 'text-gray-500'
              )}>
                <ApperIcon name="Calendar" className="h-3 w-3" />
                <span>
                  {isToday(task.dueDate) ? 'Today' : format(task.dueDate, 'MMM d')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard