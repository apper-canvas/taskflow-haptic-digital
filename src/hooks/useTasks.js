import { useState, useEffect } from 'react'
import { taskService } from '@/services/api/taskService'
import { toast } from 'react-toastify'

export const useTasks = (categoryId = null) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      
      let data
      if (categoryId) {
        data = await taskService.getByCategory(categoryId)
      } else {
        data = await taskService.getAll()
      }
      
      setTasks(data)
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [newTask, ...prev])
      toast.success('Task created successfully')
      return newTask
    } catch (err) {
      toast.error('Failed to create task')
      throw err
    }
  }

  const updateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates)
      setTasks(prev => prev.map(task => 
        task.Id === parseInt(id) ? updatedTask : task
      ))
      
      if (updates.completed !== undefined) {
        toast.success(updates.completed ? 'Task completed!' : 'Task reopened')
      } else {
        toast.success('Task updated successfully')
      }
      
      return updatedTask
    } catch (err) {
      toast.error('Failed to update task')
      throw err
    }
  }

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id)
      setTasks(prev => prev.filter(task => task.Id !== parseInt(id)))
      toast.success('Task deleted successfully')
    } catch (err) {
      toast.error('Failed to delete task')
      throw err
    }
  }

  const reorderTasks = async (taskId, newPriority) => {
    try {
      await taskService.reorder(taskId, newPriority)
      setTasks(prev => prev.map(task => 
        task.Id === parseInt(taskId) ? { ...task, priority: newPriority } : task
      ))
    } catch (err) {
      toast.error('Failed to reorder tasks')
      throw err
    }
  }

  const searchTasks = async (query) => {
    try {
      setLoading(true)
      const results = await taskService.search(query)
      setTasks(results)
    } catch (err) {
      toast.error('Failed to search tasks')
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [categoryId])

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    reorderTasks,
    searchTasks,
    refetch: loadTasks
  }
}