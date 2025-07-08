import categoriesData from '@/services/mockData/categories.json'
import { taskService } from './taskService'

let categories = [...categoriesData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const categoryService = {
  async getAll() {
    await delay(200)
    const tasks = await taskService.getAll()
    
    return categories.map(category => ({
      ...category,
      taskCount: tasks.filter(task => task.categoryId === category.id && !task.completed).length
    }))
  },

  async getById(id) {
    await delay(150)
    const category = categories.find(cat => cat.Id === parseInt(id))
    if (!category) return null
    
    const tasks = await taskService.getAll()
    return {
      ...category,
      taskCount: tasks.filter(task => task.categoryId === category.id && !task.completed).length
    }
  },

  async create(categoryData) {
    await delay(200)
    const newCategory = {
      Id: Math.max(...categories.map(c => c.Id)) + 1,
      ...categoryData,
      taskCount: 0
    }
    categories.push(newCategory)
    return newCategory
  },

  async update(id, updates) {
    await delay(150)
    const index = categories.findIndex(cat => cat.Id === parseInt(id))
    if (index === -1) throw new Error('Category not found')
    
    categories[index] = { ...categories[index], ...updates }
    return categories[index]
  },

  async delete(id) {
    await delay(150)
    const index = categories.findIndex(cat => cat.Id === parseInt(id))
    if (index === -1) throw new Error('Category not found')
    
    categories.splice(index, 1)
    return true
  }
}