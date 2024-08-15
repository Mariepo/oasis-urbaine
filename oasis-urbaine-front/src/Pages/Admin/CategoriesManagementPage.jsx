import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
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

  useEffect(() => {
    fetchCategories();
  }, [])

  return (
  <Container className='py-5'>
    <HeaderCategoryManagement textH1={"Gestion des catégories"} textButton={"Ajouter une catégorie"} onChange={handleChange} onClick={addNewCategory} value={categoryName} />
    <Row className='col-12 col-lg-8 mx-auto py-4'>
      {categories.map((category) => (
        <CategoryList key={category.id} name={category.name}/>
      ))}
    </Row>
  </Container>
  )
}

export default CategoriesManagementPage

