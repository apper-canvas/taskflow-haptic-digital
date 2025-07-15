import { toast } from 'react-toastify'

const { ApperClient } = window.ApperSDK

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
})

export const categoryService = {
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      }
      
      const response = await apperClient.fetchRecords('category', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      if (!response.data || response.data.length === 0) {
        return []
      }
      
      // Add taskCount to each category (simplified for now)
      return response.data.map(category => ({
        ...category,
        id: category.Name?.toLowerCase(), // For compatibility with existing routing
        name: category.Name,
        color: '#8B5CF6', // Default color
        taskCount: 0 // Will be calculated by task service
      }))
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching categories:", error?.response?.data?.message)
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
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } }
        ]
      }
      
      const response = await apperClient.getRecordById('category', id, params)
      
      if (!response || !response.data) {
        return null
      }
      
      return {
        ...response.data,
        id: response.data.Name?.toLowerCase(),
        name: response.data.Name,
        color: '#8B5CF6',
        taskCount: 0
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching category with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  },

  async create(categoryData) {
    try {
      const params = {
        records: [
          {
            Name: categoryData.name || categoryData.Name,
            Tags: categoryData.Tags || '',
            Owner: categoryData.Owner
          }
        ]
      }
      
      const response = await apperClient.createRecord('category', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} categories:${JSON.stringify(failedRecords)}`)
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successfulRecords.length > 0) {
          const newCategory = successfulRecords[0].data
          return {
            ...newCategory,
            id: newCategory.Name?.toLowerCase(),
            name: newCategory.Name,
            color: '#8B5CF6',
            taskCount: 0
          }
        }
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating category:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  },

  async update(id, updates) {
    try {
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: updates.name || updates.Name,
            Tags: updates.Tags || '',
            Owner: updates.Owner
          }
        ]
      }
      
      const response = await apperClient.updateRecord('category', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} categories:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        if (successfulUpdates.length > 0) {
          const updatedCategory = successfulUpdates[0].data
          return {
            ...updatedCategory,
            id: updatedCategory.Name?.toLowerCase(),
            name: updatedCategory.Name,
            color: '#8B5CF6',
            taskCount: 0
          }
        }
      }
      
      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating category:", error?.response?.data?.message)
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
      
      const response = await apperClient.deleteRecord('category', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} categories:${JSON.stringify(failedDeletions)}`)
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        return successfulDeletions.length > 0
      }
      
      return false
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting category:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return false
    }
  }
}