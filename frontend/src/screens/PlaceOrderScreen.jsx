import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
} from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { useCreateOrderMutation } from "../slices/orderApiSlice.js";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";
import { clearCartItems } from "../slices/cartSlice.js";


export const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [createOrder, {isLoading, error} ] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  const placeOrderHandler = async() =>{
    try{
        const res = await createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }).unwrap();
        dispatch(clearCartItems());
        navigate(`/order/${res._id}`);
    }catch(error){
        toast.error('Error Placing Order ',error)
    }
  }

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>{cart.paymentMethod}</strong>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message> Your cart is empty </Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                            <Link to={`/products/${item.product}`}>
                            {item.name}
                            </Link>
                        </Col>
                        <Col md={4}>
                        { item.qty } X { item.price} = ${ item.qty* item.price } 
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Items: </Col>
                        <Col>${cart.itemsPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping: </Col>
                        <Col>${cart.shippingPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Tax:</Col>
                        <Col>${cart.taxPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Total:</Col>
                        <Col>${cart.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    {error && <Message variant='danger'>{error.data?.message || error.status || 'An error Occurred'}</Message> }
                </ListGroup.Item>

                <ListGroup.Item>
                    <Button
                        type="button"
                        className="btn-block"
                        disabled={cart.cartItems.length===0}
                        onClick={placeOrderHandler}>
                            Place Order
                        </Button>
                        {isLoading && <Loader /> }
                </ListGroup.Item>

            </ListGroup>
        </Card>
        </Col>
      </Row>
    </Container>
  );
};
