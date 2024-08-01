import React from 'react'
import Badge from 'react-bootstrap/Badge';

function CategoryBadge({name, onClick, id}) {
  return (
    <Badge 
      pill 
      bg="primary" 
      onClick={onClick} 
      data-category-id={id} 
      className='category-badge'>{name}
    </Badge>
  )
}

export default CategoryBadge
