import React from 'react'
import Badge from '@/components/atoms/Badge'
import { cn } from '@/utils/cn'

const CategoryBadge = ({ category, className, ...props }) => {
  const getVariantFromColor = (color) => {
    switch (color) {
      case '#5B21B6': return 'default'
      case '#F59E0B': return 'amber'
      case '#10B981': return 'success'
      case '#EF4444': return 'danger'
      default: return 'secondary'
    }
  }

  return (
    <Badge
      variant={getVariantFromColor(category.color)}
      className={cn(
        'text-xs font-medium px-2 py-1',
        className
      )}
      {...props}
    >
      {category.name}
    </Badge>
  )
}

export default CategoryBadge