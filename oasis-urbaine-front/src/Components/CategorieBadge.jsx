import React from 'react'
import Badge from 'react-bootstrap/Badge';

function CategorieBadge({name}) {
  return (
    <Badge pill bg="primary">{name}</Badge>
  )
}

export default CategorieBadge
