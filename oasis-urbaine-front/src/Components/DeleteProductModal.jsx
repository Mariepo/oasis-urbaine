import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function DeleteProductModal({show, handleCloseModal, onClick}) {
return (
        <Modal show={show} onHide={handleCloseModal} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>Supprimer le produit</Modal.Title>
            </Modal.Header>
            <Modal.Body>Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleCloseModal}> Annuler</Button>
                <Button variant="danger" onClick={onClick}>Supprimer</Button>
            </Modal.Footer>
        </Modal>
    )
    }


export default DeleteProductModal
