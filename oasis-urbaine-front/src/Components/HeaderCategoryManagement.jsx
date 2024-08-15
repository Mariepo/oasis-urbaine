import React from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';


function HeaderCategoryManagement({textH1, textButton, onChange, onClick, value}) {

  return <>
    <Row className='col-12 col-lg-8 mx-auto'>
      <Col className="d-flex flex-column align-items-start gap-3 px-0 py-2">
        <h1>{textH1}</h1>
      </Col>
    </Row>
    <Row className='d-flex justify-content-center align-items-end my-2'>
      <Col className='col-6'>
        <Form.Group className="flex-fill" controlId="category">
        <Form.Label>Nom de la catégorie</Form.Label>
          <Form.Control type="text" placeholder="Nom de la catégorie" name="name" onChange={onChange} value={value} />
        </Form.Group>
      </Col>
      <Col className='col-2'>
        <Button variant='primary' className="w-100" onClick={onClick}>{textButton}</Button>
      </Col>
    </Row>
  </>
}

export default HeaderCategoryManagement
