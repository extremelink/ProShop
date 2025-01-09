import { Row, Col, Container } from 'react-bootstrap' 
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productApiSlice'
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <> 
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
            {error?.data?.message || error.error }
        </Message>
      ) : (
        <>
        <h1>Latest Products</h1>
        <Row className='m-2'>
            {products.map(product => (
                <Col key={product._id} xs={12} sm={6} md={4} className="d-flex justify-content-center">
                    <Product product={ product } />
                </Col>
            ))}
        </Row></>
      )
      
      }

      {/* { isLoading? <h1>Loading...</h1> : isError? <h1>Error</h1> : <>
      
    <h1>Latest Products</h1>
    <Row className='m-2'>
        {products.map(product => (
            <Col key={product._id} xs={12} sm={6} md={4} className="d-flex justify-content-center">
                <Product product={ product } />
            </Col>
        ))}
    </Row></>} */}
    </>
    
  )
}

export default HomeScreen
