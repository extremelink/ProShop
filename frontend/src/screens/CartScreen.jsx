import React from 'react'
import { Button, Card, Col, Container, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { FaTrash } from 'react-icons/fa';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector( state => state.cart )
    const { cartItems } = cart;
    console.log('cartItems',cart);

    const addToCartHandler = async (item, qty) =>{
        dispatch(addToCart({...item, qty}));
    }

    const removeFromCartHandler = async (id) =>{
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    }

  return (
    <Container>
        <Row>
        <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>

        { cartItems.length === 0 ? (
            <Message variant='info'>
                Your cart is empty <Link to='/'>Go Back</Link>
            </Message>
        ):(
            <ListGroup variant='flush'>
                {
                    cartItems.map(item => (
                        <ListGroup.Item key={item._id}>
                            <Row>
                                <Col md={2}>
                                <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to ={`/product/${item._id}`}> {item.name} </Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={2}>    
                                
                                    <Form.Control
                                        as='select'
                                        value={item.qty}
                                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                    >
                                            {
                                                [...Array(item.countInStock).keys()].map(x => (
                                                    <option key = {x+1} value = {x+1}>
                                                        {x+1}
                                                    </option>

                                                ))

                                            }
                                    </Form.Control>
                                    </Col>
                                    
                                    <Col md={2}>
                                            <Button type='button' variant='light'  onClick ={()=>removeFromCartHandler(item._id)}>
                                                <FaTrash />
                                            </Button>
                                    </Col>
                            </Row>
                        </ListGroup.Item>

                    ))
                }
            </ListGroup>
        )
        }
        </Col>

        <Col md={4}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>
                    SubTotal ({ cartItems.reduce((acc,item)=> acc +  Number(item.qty),0) })
                    items
                    </h2>
                    ${ 
                    cartItems
                        .reduce((acc, item) => acc + item.qty * item.price,0)
                        .toFixed(2) }
                </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item className='d-flex justify-content-center'>
                <Button 
                    type='button' 
                    variant='light' 
                    className='btn-block' 
                    disabled={cartItems.length === 0}
                    onClick={() => checkoutHandler}
                    >
                    Proceed To Checkout
                </Button>
            </ListGroup.Item>
        </Card>
        </Col>

        </Row>
    </Container>
  )
}

export default CartScreen