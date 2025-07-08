import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from './TaskCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const TaskList = ({ 
  tasks, 
  loading, 
  error, 
  onTaskUpdate, 
  onTaskDelete, 
  onRetry,
  focusedTaskId,
  onTaskFocus
}) => {
  const [draggedTask, setDraggedTask] = useState(null)

  if (loading) return <Loading />
  if (error) return <Error error={error} onRetry={onRetry} />
  if (!tasks || tasks.length === 0) return <Empty />

  const handleDragStart = (e, task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = () => {
    setDraggedTask(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetTask) => {
    e.preventDefault()
    if (draggedTask && draggedTask.Id !== targetTask.Id) {
      // Handle reordering logic here
      console.log('Reorder:', draggedTask.Id, 'to position of', targetTask.Id)
    }
    setDraggedTask(null)
  }

  const completedTasks = tasks.filter(task => task.completed)
  const incompleteTasks = tasks.filter(task => !task.completed)

  return (
    <div className="space-y-6">
      {/* Incomplete Tasks */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {incompleteTasks.map((task, index) => (
            <motion.div
              key={task.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, task)}
              className={`
                cursor-move transition-all duration-200
                ${focusedTaskId && focusedTaskId !== task.Id ? 'opacity-30 blur-sm' : ''}
                ${focusedTaskId === task.Id ? 'task-focused' : ''}
                ${draggedTask?.Id === task.Id ? 'opacity-50 scale-95' : ''}
              `}
            >
              <TaskCard
                task={task}
                onUpdate={onTaskUpdate}
                onDelete={onTaskDelete}
                onFocus={onTaskFocus}
                isFocused={focusedTaskId === task.Id}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">
              Completed ({completedTasks.length})
            </h3>
          </div>
          <AnimatePresence mode="popLayout">
            {completedTasks.map((task, index) => (
              <motion.div
                key={task.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="opacity-75"
              >
                <TaskCard
                  task={task}
                  onUpdate={onTaskUpdate}
                  onDelete={onTaskDelete}
                  onFocus={onTaskFocus}
                  isFocused={false}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default TaskList