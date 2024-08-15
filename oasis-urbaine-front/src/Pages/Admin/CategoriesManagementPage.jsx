import React, { useEffect, useState } from 'react'
import { Container, Row, Button, Modal, Form } from 'react-bootstrap'
import CategoriesService from '../../Services/CategoriesService';
import CategoryList from '../../Components/CategoryList';
import HeaderCategoryManagement from '../../Components/HeaderCategoryManagement';
import { toast } from 'react-toastify';

function CategoriesManagementPage() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [newCategory, setNewCategory] = useState({
    name: ""
  });
  // pour passer l'id de la catégorie cliquée
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [selectedCategoryName, setSelectedCategoryName] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (categoryId, categoryName) => {
    setShow(true);
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
  }

  const fetchCategories = async () => {
    try {
        const response = await CategoriesService.fetchCategories();
        setCategories(response.data);
    } catch (error) {
        console.log(error);
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.currentTarget;
    setCategoryName(value);
    setNewCategory({...newCategory, [name] : value});
  }
  const handleCategoryChange = (event) => {
    setSelectedCategoryName(event.target.value);
  }

  const addNewCategory = async (event) => {
    event.preventDefault();
    try {
      await CategoriesService.addCategory(newCategory);
      setCategoryName('');
      fetchCategories();
      toast.success('Catégorie ajoutée avec succès !');
    } catch (error) {
      console.log(error);
      toast.error('Erreur lors de l\'ajout de la catégorie');
    }
  }
  const editCategory = async (event) => {
    event.preventDefault();
    try {
      await CategoriesService.editCategory(selectedCategoryId, {name : selectedCategoryName});
      setSelectedCategoryId(null);
      setSelectedCategoryName('');
      setShow(false);
      fetchCategories();
      toast.success('Catégorie modifiée avec succès !');
    } catch (error) {
      console.log(error);
      toast.error('Erreur lors de la modification de la catégorie');
    }
  }
  

  useEffect(() => {
    fetchCategories();
  }, [])

  return <>
  <Container className='py-5'>
    <HeaderCategoryManagement textH1={"Gestion des catégories"} textButton={"Ajouter une catégorie"} onChange={handleChange} onClick={addNewCategory} value={categoryName} />
    <Row className='col-12 col-lg-8 mx-auto py-4'>
      {categories.map((category) => (
        <CategoryList key={category.id} name={category.name} onClickEdit={()=>{handleShow(category.id, category.name)}}/>
      ))}
    </Row>
  </Container>


  {/* Edit Modal */}
  <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
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
</>
}

export default CategoriesManagementPage

