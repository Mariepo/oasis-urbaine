import React from 'react'
import Badge from 'react-bootstrap/Badge';

function CategoryBadge({name, onClick, id, className}) {
  return (
    <Badge 
      pill 
      bg="" 
      onClick={onClick} 
      data-category-id={id} 
      className={className}>{name}
    </Badge>
  )
}

export default CategoryBadge
