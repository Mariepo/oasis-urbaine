import React from 'react'
import { Container, Row, Button, Modal, Form } from 'react-bootstrap'

function EditCategoryModal({show, handleClose, selectedCategoryName, handleCategoryChange, editCategory}) {
  return (
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>Modifier la catégorie</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Group className="flex-fill" controlId="category">
        <Form.Control type="text" placeholder="Nom de la catégorie" name="name" value={selectedCategoryName} onChange={handleCategoryChange} />
      </Form.Group>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outlinesecondary" onClick={handleClose}>
        Annuler
      </Button>
      <Button variant="primary" onClick={editCategory}>Modifier</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default EditCategoryModal
