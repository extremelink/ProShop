import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice";
import {
    Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Form
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import Rating from "../components/Rating";

import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const { data:product, isLoading, error }  = useGetProductDetailsQuery(productId)
  const addToCartHandler = () => {
    // call addToCart Action
    dispatch(addToCart({...product, qty}));
    navigate('/cart')
  }

  return (
    <Container className="col-md-10">
      {
        isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.message}
            </Message>
        ) : (
          <>
          <Link to="/" className="m-2">
        <IoIosArrowBack color="black" size={30} />
      </Link>
      <Row className="m-2">
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={product.numReviews} />
            </ListGroup.Item>

            <ListGroup.Item>{product.price} Rs</ListGroup.Item>
            <ListGroup.Item className="mt-5 fs-5">
               Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                    <Col>Price:</Col>
                    <Col><strong>${product.price}</strong></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                    <Col>Status:</Col>
                    <Col><strong>{product.countInStock > 0 ? 'In Stock!' : 'Out Of Stock'}</strong></Col>
                </Row>
              </ListGroup.Item>
                {product.countInStock > 0 && (
                    <ListGroup.Item>
                        <Row>
                            <Col>Qty</Col>
                            <Col>
                            <Form.Control
                                as = "select"
                                value = {qty}
                                onChange = {(e) => setQty(e.target.value)}>
                                  {[...Array(product.countInStock).keys()].map(x => (
                                    
                                    <option key = {x+1} value = {x+1}>
                                      {x+1}
                                    </option>
                                  ))}

                            </Form.Control>
                            </Col>

                        </Row>
                    </ListGroup.Item>
                )}
              <ListGroup.Item>
                <Button
                    className="btn-block"
                    type="button"
                    variant="outline-dark"
                    disabled={product.countInStock === 0}
                    onClick = {addToCartHandler}
                >Add To Cart
                    </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
          </>
        )
      }
    </Container>
  );
};

export default ProductScreen;
