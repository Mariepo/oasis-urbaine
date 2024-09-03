import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function DeleteCategoryModal({show, handleClose, selectedCategoryName, deleteCategory}) {
return (
        <Modal show={show} onHide={handleClose} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>Supprimer la catégorie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Êtes-vous sûr de vouloir supprimer la catégorie : {selectedCategoryName} ? Cette action est irréversible.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outlinesecondary" onClick={handleClose}>
                Annuler
                </Button>
                <Button variant="danger" onClick={deleteCategory}>Supprimer</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteCategoryModal
