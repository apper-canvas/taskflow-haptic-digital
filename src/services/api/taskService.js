import tasksData from '@/services/mockData/tasks.json'
import { format } from 'date-fns'

let tasks = [...tasksData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(300)
    return tasks.map(task => ({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
      createdAt: new Date(task.createdAt),
      completedAt: task.completedAt ? new Date(task.completedAt) : null
    }))
  },

  async getById(id) {
    await delay(200)
    const task = tasks.find(task => task.Id === parseInt(id))
    if (!task) return null
    return {
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
      createdAt: new Date(task.createdAt),
      completedAt: task.completedAt ? new Date(task.completedAt) : null
    }
  },

  async create(taskData) {
    await delay(250)
    const newTask = {
      Id: Math.max(...tasks.map(t => t.Id)) + 1,
      ...taskData,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    tasks.push(newTask)
    return {
      ...newTask,
      dueDate: newTask.dueDate ? new Date(newTask.dueDate) : null,
      createdAt: new Date(newTask.createdAt),
      completedAt: null
    }
  },

  async update(id, updates) {
    await delay(200)
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) throw new Error('Task not found')
    
    const updatedTask = {
      ...tasks[index],
      ...updates,
      completedAt: updates.completed && !tasks[index].completed ? new Date().toISOString() : 
                   !updates.completed && tasks[index].completed ? null : 
                   tasks[index].completedAt
    }
    
    tasks[index] = updatedTask
    return {
      ...updatedTask,
      dueDate: updatedTask.dueDate ? new Date(updatedTask.dueDate) : null,
      createdAt: new Date(updatedTask.createdAt),
      completedAt: updatedTask.completedAt ? new Date(updatedTask.completedAt) : null
    }
  },

  async delete(id) {
    await delay(200)
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index === -1) throw new Error('Task not found')
    
    tasks.splice(index, 1)
    return true
  },

  async reorder(taskId, newPriority) {
    await delay(150)
    const index = tasks.findIndex(task => task.Id === parseInt(taskId))
    if (index === -1) throw new Error('Task not found')
    
    tasks[index] = { ...tasks[index], priority: newPriority }
    return tasks[index]
  },

  async getByCategory(categoryId) {
    await delay(200)
    return tasks
      .filter(task => task.categoryId === categoryId)
      .map(task => ({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : null
      }))
  },

  async search(query) {
    await delay(200)
    return tasks
      .filter(task => 
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description?.toLowerCase().includes(query.toLowerCase())
      )
      .map(task => ({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : null
      }))
  }
}