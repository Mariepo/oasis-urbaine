import React, { useEffect, useState } from 'react'
import { Container, Form, Button, InputGroup } from 'react-bootstrap'
import ProductsService from '../../Services/ProductsService';
import CategoriesService from '../../Services/CategoriesService';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function EditProductForm() {
  const {id} = useParams();
  const navigate = useNavigate();
  const navigateTo = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  }
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    dimension: '',
    image_thumbnail: '',
    image_large: '',
    care_exposure: '',
    care_watering: '',
    care_temperature: '',
    categories: []
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategoriesId, setSelectedCategoriesId] = useState([]);

  const fetchProductById = async () => {
    try {
      const response = await ProductsService.fetchProductsById(id);
      setProduct(response.data);

      setSelectedCategoriesId(response.data.categories.map((p)=> (p.id)));
    } catch (error) {
      console.log(error);
    }    
  }

  const handleChange = (event) => {
    const {name, value} = event.currentTarget;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };
  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      // Ajouter l'ID de la catégorie aux sélectionnées
      setSelectedCategoriesId([...selectedCategoriesId, parseInt(value)]);
    } else {
      // Supprimer l'ID de la catégorie desélectionnée
      setSelectedCategoriesId(selectedCategoriesId.filter(id => id !== parseInt(value)));
    }
  };


  const editProduct = async(event) => {
    event.preventDefault();
    try {
      const productWithCategories = {...product, 
        categories: selectedCategoriesId.map((id_category)=> ({
          id_category: id_category
        }))
      }
      await ProductsService.editProduct(id, productWithCategories)
      toast.success('Produit modifié avec succès !');
      navigateTo('/products-management')
    } catch (error) {
      toast.error("Erreur lors de la modification du produit")
      console.log(error);
    }
  }

  const fetchCategories = async() => {
    try {
      const response = await CategoriesService.fetchCategories();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProductById();
    fetchCategories();
    document.body.classList.add('background-body-grey');
    return () => {
      document.body.classList.remove('background-body-grey');
    }
}, []);  
  return (
    <Container fluid className=' py-5'>
      <Form  onSubmit={editProduct} method='post' className='col-12 col-md-10 col-lg-6 mx-auto d-flex flex-column'>
          <h1 className='text-center my-4'>Modifer un produit</h1>
          <fieldset className='mt-2'>
            <p className='form-title'>Description</p>
            <Form.Group className="mb-4" controlId="title">
              <Form.Label>Nom du produit</Form.Label>
              <Form.Control type="text" name="title" placeholder="Nom du produit" onChange={handleChange} value={product.title}/>
            </Form.Group>            
            <Form.Group className="mb-4" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={5} name="description" placeholder="Description" value={product.description} onChange={handleChange} />
            </Form.Group>            
            <Form.Group className="mb-4" controlId="price">
              <Form.Label>Prix (€)</Form.Label>
              <Form.Control type="number" name="price" min="0" step="0.01" placeholder="Prix du produit" value={product.price} onChange={handleChange} required/>
            </Form.Group>   
            <Form.Group>
              <Form.Label htmlFor="dimension">Taille en cm</Form.Label>
                <InputGroup className="mb-2">
                  <Form.Control id="dimension" type="text" name="dimension" placeholder="Exemple : 40-50" value={product.dimension} onChange={handleChange} />
                <InputGroup.Text>cm</InputGroup.Text>
              </InputGroup>
            </Form.Group>               
          </fieldset>     

          <fieldset>
            <p className='form-title mt-4'>Images</p>
            <Form.Group controlId="image_thumbnail">
              <Form.Label>Image miniature</Form.Label>
              <Form.Control type="text"name="image_thumbnail" placeholder="Entrez l'URL de l'image miniature du produit" value={product.image_thumbnail} onChange={handleChange}/>
              <Form.Text className="text-muted">Correspond à l'image qui sera affichée dans les listes de produits et les aperçus</Form.Text>
            </Form.Group>  
            <Form.Group controlId="image_large" className='mt-4'>
              <Form.Label>Image grand format</Form.Label>
              <Form.Control type="text" name="image_large" placeholder="Entrez l'URL de l'image grand format du produit" value={product.image_large} onChange={handleChange}/>
              <Form.Text className="text-muted">Correspond à l'image qui sera affichée sur la page du produit</Form.Text>
            </Form.Group>  
          </fieldset>        

          <fieldset>
            <p className='form-title mt-4'>Catégories</p>
            {categories.map((categorie) => (
              <Form.Group className="mb-4" controlId={categorie.name} key={categorie.id}>
                <Form.Check type="checkbox" label={categorie.name} id={categorie.name} name="categorie" value={categorie.id}  onChange={handleCategoryChange} 
                            checked={selectedCategoriesId.includes(categorie.id)} />
              </Form.Group>
            ))}
          </fieldset>      

          <fieldset>
            <p className='form-title mt-5'>Conseil d'entretien</p> 
            <Form.Group controlId="care_exposure" className="mb-4">
              <Form.Label>Exposition </Form.Label>
              <Form.Control as="textarea" rows={4} name="care_exposure" maxLength="500" placeholder="Décrivez les besoins en lumière du produit" value={product.care_exposure} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId='care_watering' className="mb-4">
              <Form.Label>Arrosage</Form.Label>
              <Form.Control as="textarea" name="care_watering" rows={4} maxLength="500" placeholder="Décrivez les besoins en arrosage du produit" value={product.care_watering} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId='care_temperature' className="mb-4">
              <Form.Label>Température</Form.Label>
              <Form.Control as="textarea" name='care_temperature' rows={4} maxLength="500" placeholder="Indiquez la plage de température idéale pour le produit" value={product.care_temperature} onChange={handleChange} />
            </Form.Group>            
          </fieldset>        
          <Button variant="primary" type="submit">Modifer</Button>
          <Button variant="link" onClick={() => {navigateTo('/products-management')}} className='py-4 text-decoration-underline'>Annuler</Button>
      </Form>
    </Container>
  )
}

export default EditProductForm
