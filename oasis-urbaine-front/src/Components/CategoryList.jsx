import React from 'react';
import { ListGroup, Button } from 'react-bootstrap'

function CategoryList({name}) {
  return (
    <ListGroup>
        <ListGroup.Item className='mt-2 d-flex justify-content-between align-items-center'>
        <span>{name}</span>
        <div className='d-flex gap-4'>
            <Button variant='outline-primary'>Modifier</Button>
            <Button variant='outline-danger'>Supprimer</Button>
        </div>
        </ListGroup.Item>
  </ListGroup>
  )
}

export default CategoryList
