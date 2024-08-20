import React, { useEffect, useState } from 'react'
import { Container, Row} from 'react-bootstrap'
import CategoriesService from '../../Services/CategoriesService';
import CategoryList from '../../Components/CategoryList';
import HeaderManagement from '../../Components/HeaderManagement';
import { toast } from 'react-toastify';
import EditCategoryModal from '../../Components/EditCategoryModal';
import DeleteCategoryModal from '../../Components/DeleteCategoryModal';

function CategoriesManagementPage() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [newCategory, setNewCategory] = useState({
    name: ""
  });
  // pour passer l'id de la catégorie cliquée
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [selectedCategoryName, setSelectedCategoryName] = useState();
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const handleCloseEditCategoryModal = () => setShowEditCategoryModal(false);
  const handleShowEditCategoryModal = (categoryId, categoryName) => {
    setShowEditCategoryModal(true);
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
  }
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const handleCloseDeleteCategoryModal = () => setShowDeleteCategoryModal(false);
  const handleShowDeleteCategoryModal = (categoryId, categoryName) => {
    setShowDeleteCategoryModal(true);
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

  const addNewCategory = async () => {
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
  const editCategory = async () => {
    try {
      await CategoriesService.editCategory(selectedCategoryId, {name : selectedCategoryName});
      setSelectedCategoryId(null);
      setSelectedCategoryName('');
      setShowEditCategoryModal(false);
      fetchCategories();
      toast.success('Catégorie modifiée avec succès !');
    } catch (error) {
      console.log(error);
      toast.error('Erreur lors de la modification de la catégorie');
    }
  }
  const deleteCategory = async () => {
    try {
      await CategoriesService.deleteCategory(selectedCategoryId);
      setSelectedCategoryId(null);
      setSelectedCategoryName('');
      setShowDeleteCategoryModal(false);
      fetchCategories();
      toast.success('Catégorie supprimée avec succès !');
    } catch (error) {
      console.log(error);
      toast.error('Erreur lors de la suppression de la catégorie');
    }
  }
  

  useEffect(() => {
    fetchCategories();
    document.body.classList.add('background-body-grey');
    return () => {
        document.body.classList.remove('background-body-grey');
    };
  }, [])

  return <>
  <Container className='py-5'>
    <HeaderManagement lg={8} textH1={"Gestion des catégories"} textButton={"Ajouter une catégorie"} onChange={handleChange} onClick={addNewCategory} value={categoryName} className={"col-12 col-md-4"} />
    <Row className='col-12 col-lg-8 mx-auto py-4'>
      {categories.map((category) => (
        <CategoryList key={category.id} name={category.name} onClickEdit={()=>{handleShowEditCategoryModal(category.id, category.name)}} onClickDelete={()=>handleShowDeleteCategoryModal(category.id, category.name)}/>
      ))}
    </Row>
  </Container>

  <EditCategoryModal show={showEditCategoryModal} handleClose={handleCloseEditCategoryModal} selectedCategoryName={selectedCategoryName} handleCategoryChange={handleCategoryChange} editCategory={editCategory} />
  <DeleteCategoryModal  show={showDeleteCategoryModal} handleClose={handleCloseDeleteCategoryModal} selectedCategoryName={selectedCategoryName} deleteCategory={deleteCategory} />

</>
}

export default CategoriesManagementPage

