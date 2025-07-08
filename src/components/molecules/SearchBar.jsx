import React from 'react'
import { cn } from '@/utils/cn'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = React.forwardRef(({ 
  className, 
  placeholder = 'Search tasks...',
  onClear,
  value,
  ...props 
}, ref) => {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="h-4 w-4 text-gray-400" />
      </div>
      <Input
        ref={ref}
        variant="search"
        className="pl-10 pr-10"
        placeholder={placeholder}
        value={value}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          <ApperIcon name="X" className="h-4 w-4" />
        </button>
      )}
    </div>
  )
})

SearchBar.displayName = 'SearchBar'

export default SearchBar