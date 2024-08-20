import React from 'react';
import Card from 'react-bootstrap/Card';



function ValueCard({videoSource, title, description}) {
    return (
        <Card className='value-card'>
            <video autoPlay muted loop width="100%" height="300px"> 
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between'>{title}
                </Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ValueCard
