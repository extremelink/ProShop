import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
//   return (
//     <Card className="my-3 rounded product-card" style={{ width: '23rem', minHeight: '22rem', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
//         <Link to = {`/product/${product._id}`}>
//         <Card.Img variant='top' src={ product.image } style={{ height: '200px', objectFit: 'cover' }} />
//         </Link>
//         <Card.Body style={{ minHeight: '150px' }}>
//             <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
//                 <Card.Title as="div" >
//                     <strong>{ product.name } </strong>
//                 </Card.Title>            
//             </Link>
//             <Card.Text as='div'>
//                 <Rating value={ product.rating } text={ product.numReviews } />
//             </Card.Text>
//             <Card.Text as="h3">
//                 { product.price }
//             </Card.Text>
//         </Card.Body>

//     </Card>
//   )
return (
    <Card className='my-3 p-3 rounded product-card' style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
        <Link to ={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top'></Card.Img>
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`} className='link'>
            <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>    
            </Card.Title>
            </Link>

            <Card.Text as ='div'>
                <Rating 
                    value={product.Rating}
                    text={`${product.numReviews} reviews`}
                    />
            </Card.Text>

            <Card.Text as ='h3'>${product.price}</Card.Text>
        </Card.Body>

    
    </Card>
)
}

export default Product