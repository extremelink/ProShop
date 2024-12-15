import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded" style={{ width: '18rem', minHeight: '20rem' }}>
        <Link to = {`/product/${product._id}`}>
        <Card.Img variant='top' src={ product.image } style={{ height: '200px', objectFit: 'cover' }} />
        </Link>
        <Card.Body style={{ minHeight: '150px' }}>
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                <Card.Title as="div" >
                    <strong>{ product.name } </strong>
                </Card.Title>            
            </Link>
            <Card.Text as='div'>
                <Rating value={ product.rating } text={ product.numReviews } />
            </Card.Text>
            <Card.Text as="h3">
                { product.price }
            </Card.Text>
        </Card.Body>

    </Card>
  )
}

export default Product