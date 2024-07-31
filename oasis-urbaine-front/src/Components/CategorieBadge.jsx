import React from 'react'
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';

function CategorieBadge({name, id}) {
  const navigate = useNavigate();
  const navigateToProducts = () => {
    navigate('/categories/'+id+'/products/')
}

  return (
    <Badge pill bg="primary" onClick={navigateToProducts} data-category-id={id}>{name}{id}</Badge>
  )
}

export default CategorieBadge
