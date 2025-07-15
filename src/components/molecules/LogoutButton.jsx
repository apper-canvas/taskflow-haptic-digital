import React, { useContext } from 'react'
import { AuthContext } from '@/App'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const LogoutButton = () => {
  const { logout } = useContext(AuthContext)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleLogout}
      className="hidden sm:flex"
      title="Logout"
    >
      <ApperIcon name="LogOut" className="h-5 w-5" />
    </Button>
  )
}

export default LogoutButton