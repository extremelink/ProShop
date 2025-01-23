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
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";

import { useCreateReviewMutation, useGetProductDetailsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";
import Meta from "../components/Meta";


const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('');
 
  const { data:product, isLoading, refetch, error }  = useGetProductDetailsQuery(productId)
  
  const [createReview , {isLoading:loadingProductReview}] = useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    // call addToCart Action
    dispatch(addToCart({...product, qty}));
    navigate('/cart')
  }
  const submitHandler =async (e) =>{
    e.preventDefault();
    if (!rating || !comment.trim()) {
      toast.error("Please provide both a rating and a comment before submitting.");
      return;
    }
    try{
      const res = await createReview({
        productId,
        rating,
        comment
      }).unwrap()
      refetch();
      console.log(res);
      toast.success(res.message);
      // toast.success('Review Submitted!');
      setComment('');
      setRating(0);
    }catch(err){
      toast.error(err?.data?.message || err.message)
    }
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

                  <Meta title={product.name} />
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
      <Row className="review">
        <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant="flush">
                    {
                      product.reviews.map((review)=>(
                        <ListGroup.Item key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} />
                          <p>{review.createdAt.substring(0,10)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      ))
                    }
                    <ListGroup.Item>
                      <h2>Write a Customer Review</h2>
                    {loadingProductReview && <Loader />}
                    {
                      userInfo ? (
                        <Form onSubmit={ submitHandler }>
                          <Form.Group controlId="comment" className="my-2">
                            <Form.Label>Add a Comment</Form.Label>
                            <Form.Control
                              as="textarea"
                              row='3'
                              value={comment}
                              onChange={(e)=>setComment(e.target.value)}
                            >
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="rating" className="my-2">
                            <Form.Label>Give Rating</Form.Label>
                            <Form.Control 
                            as='select'
                            value={rating}
                            onChange={(e)=>setRating(e.target.value)}>
                              <option value=''>Select...</option>
                              <option value='1'>1 - Poor</option>
                              <option value='2'>2 - Fair</option>
                              <option value='3'>3 - Good</option>
                              <option value='4'>4 - Very Good</option>
                              <option value='5'>5 - Excellent</option>
                            </Form.Control>
                            <Button
                            disabled={loadingProductReview}
                              type="submit"
                              variant="primary"
                              className="mt-2"
                            >
                              Enter Review
                            </Button>
                          </Form.Group>
                        </Form>
                      ) :(
                        <Message>
                          Please <Link to='/login'>sign in</Link> to write a reviw{' '}
                        </Message>
                      ) 
                    }

                    </ListGroup.Item>
                </ListGroup>
        </Col>

      </Row>
          </>
        )
      }
    </Container>
  );
};

export default ProductScreen;
