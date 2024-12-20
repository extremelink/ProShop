import React, { useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap' 
// import products from '../products'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {

  const [products, setProducts] = useState([]);

  useEffect(()=>{

    const fetchProducts =async() =>{
      try{
        const { data } = await axios.get('/api/products');
        setProducts(data);
      }catch(error){
        console.log('Error Fetching products:',error.message);
      }
    };
    fetchProducts();
  },[])
  
  return (
    <Container className='fluid'>
    <h1>Latest Products</h1>
    <Row className='m-2'>
        {products.map(product => (
            <Col key={product._id} xs={12} sm={6} md={4} className="d-flex justify-content-center">
                <Product product={ product } />
            </Col>
        ))}
    </Row>

    </Container>
    
  )
}

export default HomeScreen
