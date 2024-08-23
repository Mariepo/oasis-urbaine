import React from 'react';
import { ListGroup, Button } from 'react-bootstrap'

function CategoryList({name, onClickEdit, onClickDelete}) {
  return (
    <ListGroup>
        <ListGroup.Item className='mt-2 d-flex flex-column flex-md-row  justify-content-md-between align-items-start align-items-md-center gap-2 '>
        <span className=''>{name}</span>
        <div className='d-flex gap-4'>
            <Button variant='outline-primary' onClick={onClickEdit}>Modifier</Button>
            <Button variant='outline-danger' onClick={onClickDelete}>Supprimer</Button>
        </div>
        </ListGroup.Item>
  </ListGroup>
  )
}

export default CategoryList
