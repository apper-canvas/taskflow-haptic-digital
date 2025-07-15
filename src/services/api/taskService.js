import { toast } from 'react-toastify'

const { ApperClient } = window.ApperSDK

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
})

export const taskService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category_id" } }
        ],
        orderBy: [
          {
            fieldName: "created_at",
            sorttype: "DESC"
          }
        ]
      }
      
      const response = await apperClient.fetchRecords('task', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      if (!response.data || response.data.length === 0) {
        return []
      }
      
      return response.data.map(task => ({
        ...task,
        dueDate: task.due_date ? new Date(task.due_date) : null,
        createdAt: task.created_at ? new Date(task.created_at) : new Date(),
        completedAt: task.completed_at ? new Date(task.completed_at) : null,
        categoryId: task.category_id
      }))
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return []
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category_id" } }
        ]
      }
      
      const response = await apperClient.getRecordById('task', id, params)
      
      if (!response || !response.data) {
        return null
      }
      
      const task = response.data
      return {
        ...task,
        dueDate: task.due_date ? new Date(task.due_date) : null,
        createdAt: task.created_at ? new Date(task.created_at) : new Date(),
        completedAt: task.completed_at ? new Date(task.completed_at) : null,
        categoryId: task.category_id
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  },

  async create(taskData) {
    try {
      const params = {
        records: [
          {
            title: taskData.title,
            description: taskData.description || '',
            priority: taskData.priority || 'Medium',
            due_date: taskData.dueDate ? taskData.dueDate.toISOString().split('T')[0] : null,
            completed: taskData.completed || '',
            created_at: new Date().toISOString(),
            completed_at: null,
            category_id: taskData.categoryId ? parseInt(taskData.categoryId) : null
          }
        ]
      }
      
      const response = await apperClient.createRecord('task', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} tasks:${JSON.stringify(failedRecords)}`)
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successfulRecords.length > 0) {
          const newTask = successfulRecords[0].data
          return {
            ...newTask,
            dueDate: newTask.due_date ? new Date(newTask.due_date) : null,
            createdAt: newTask.created_at ? new Date(newTask.created_at) : new Date(),
            completedAt: null,
            categoryId: newTask.category_id
          }
        }
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  },

  async update(id, updates) {
    try {
      const updateData = {
        Id: parseInt(id)
      }
      
      if (updates.title !== undefined) updateData.title = updates.title
      if (updates.description !== undefined) updateData.description = updates.description
      if (updates.priority !== undefined) updateData.priority = updates.priority
      if (updates.dueDate !== undefined) {
        updateData.due_date = updates.dueDate ? updates.dueDate.toISOString().split('T')[0] : null
      }
      if (updates.completed !== undefined) {
        updateData.completed = updates.completed ? 'completed' : ''
        updateData.completed_at = updates.completed ? new Date().toISOString() : null
      }
      if (updates.categoryId !== undefined) {
        updateData.category_id = updates.categoryId ? parseInt(updates.categoryId) : null
      }
      
      const params = {
        records: [updateData]
      }
      
      const response = await apperClient.updateRecord('task', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} tasks:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successfulUpdates.length > 0) {
          const updatedTask = successfulUpdates[0].data
          return {
            ...updatedTask,
            dueDate: updatedTask.due_date ? new Date(updatedTask.due_date) : null,
            createdAt: updatedTask.created_at ? new Date(updatedTask.created_at) : new Date(),
            completedAt: updatedTask.completed_at ? new Date(updatedTask.completed_at) : null,
            categoryId: updatedTask.category_id
          }
        }
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      }
      
      const response = await apperClient.deleteRecord('task', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} tasks:${JSON.stringify(failedDeletions)}`)
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        return successfulDeletions.length > 0
      }
      
      return false
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return false
    }
  },

  async reorder(taskId, newPriority) {
    try {
      return await this.update(taskId, { priority: newPriority })
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error reordering task:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  },

  async getByCategory(categoryId) {
    try {
      const params = {
        fields: [
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category_id" } }
        ],
        where: [
          {
            FieldName: "category_id",
            Operator: "EqualTo",
            Values: [categoryId]
          }
        ],
        orderBy: [
          {
            fieldName: "created_at",
            sorttype: "DESC"
          }
        ]
      }
      
      const response = await apperClient.fetchRecords('task', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      if (!response.data || response.data.length === 0) {
        return []
      }
      
      return response.data.map(task => ({
        ...task,
        dueDate: task.due_date ? new Date(task.due_date) : null,
        createdAt: task.created_at ? new Date(task.created_at) : new Date(),
        completedAt: task.completed_at ? new Date(task.completed_at) : null,
        categoryId: task.category_id
      }))
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by category:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return []
    }
  },

  async search(query) {
    try {
      const params = {
        fields: [
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "due_date" } },
          { field: { Name: "completed" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } },
          { field: { Name: "category_id" } }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "title",
                    operator: "Contains",
                    values: [query],
                    include: true
                  }
                ],
                operator: "OR"
              },
              {
                conditions: [
                  {
                    fieldName: "description",
                    operator: "Contains",
                    values: [query],
                    include: true
                  }
                ],
                operator: "OR"
              }
            ]
          }
        ],
        orderBy: [
          {
            fieldName: "created_at",
            sorttype: "DESC"
          }
        ]
      }
      
      const response = await apperClient.fetchRecords('task', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      if (!response.data || response.data.length === 0) {
        return []
      }
      
      return response.data.map(task => ({
        ...task,
        dueDate: task.due_date ? new Date(task.due_date) : null,
        createdAt: task.created_at ? new Date(task.created_at) : new Date(),
        completedAt: task.completed_at ? new Date(task.completed_at) : null,
        categoryId: task.category_id
      }))
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching tasks:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return []
    }
  }
}