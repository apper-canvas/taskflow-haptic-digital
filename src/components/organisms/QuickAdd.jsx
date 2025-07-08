import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import DatePicker from '@/components/molecules/DatePicker'
import ApperIcon from '@/components/ApperIcon'
import { useCategories } from '@/hooks/useCategories'
import { cn } from '@/utils/cn'

const QuickAdd = ({ onTaskCreate }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [dueDate, setDueDate] = useState(null)
  const [priority, setPriority] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { categories } = useCategories()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      toast.error('Please enter a task title')
      return
    }

    setIsSubmitting(true)
    
    try {
      await onTaskCreate({
        title: title.trim(),
        categoryId: categoryId || 'personal',
        dueDate,
        priority,
        completed: false
      })

      // Reset form
      setTitle('')
      setCategoryId('')
      setDueDate(null)
      setPriority(5)
      setIsExpanded(false)
    } catch (error) {
      console.error('Failed to create task:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setTitle('')
    setCategoryId('')
    setDueDate(null)
    setPriority(5)
    setIsExpanded(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Input
              placeholder="Add a new task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="border-none shadow-none focus:ring-0 text-base"
            />
          </div>
          
          {!isExpanded && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(true)}
            >
              <ApperIcon name="Plus" className="h-5 w-5" />
            </Button>
          )}
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <DatePicker
                  value={dueDate}
                  onChange={setDueDate}
                  placeholder="Due date"
                />
              </div>

              <div>
                <Select
                  value={priority}
                  onChange={(e) => setPriority(parseInt(e.target.value))}
                >
                  <option value={1}>High Priority</option>
                  <option value={5}>Medium Priority</option>
                  <option value={9}>Low Priority</option>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                type="submit"
                variant="amber"
                disabled={!title.trim() || isSubmitting}
                className="flex-1 sm:flex-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Plus" className="h-4 w-4" />
                    <span>Add Task</span>
                  </div>
                )}
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      </form>
    </motion.div>
  )
}

export default QuickAdd