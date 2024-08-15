import React from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';


function HeaderCategoryManagement({textH1, textButton, onChange, onClick, value, lg, buttonWidth}) {
  const location = useLocation();
  const isOnCategorieManagementPage = location.pathname === '/categories-management';
  
  return <>
    <Row>
      <Col lg={lg} className=" d-flex flex-column align-items-start gap-3 px-0 py-2 mx-auto">
        <h1>{textH1}</h1>
      </Col>
    </Row>
    <Row>
      <Col lg={lg} className='d-flex justify-content-start align-items-end flex-wrap my-2 gap-2 gap-md-0 mx-auto'>
        {isOnCategorieManagementPage && 
          <Col className='col-12 col-md-8 flex-fill pe-md-4'>
            <Form.Group  controlId="category">
            <Form.Label>Nom de la catégorie</Form.Label>
              <Form.Control type="text" placeholder="Nom de la catégorie" name="name" onChange={onChange} value={value} />
            </Form.Group>
          </Col>
        }
        <Col className='col-12 col-md-4 flex-fill'>
          <Button variant='primary' className={buttonWidth} onClick={onClick}>{textButton}</Button>
        </Col>
      </Col>
    </Row>
  </>
}

export default HeaderCategoryManagement
