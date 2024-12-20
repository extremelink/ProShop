import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import {
    Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const { id: productId } = useParams();
  console.log(productId);
  const [product,setProduct] = useState({});

  useEffect(()=>{
    const fetchProduct = async () =>{
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
      console.log(data);
    }
    fetchProduct();
  },[productId]);
  return (
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
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating value={product.rating} text={product.numReviews} />
            </ListGroupItem>

            <ListGroupItem>{product.price} Rs</ListGroupItem>
            <ListGroupItem className="mt-5 fs-5">
               Description: {product.description}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                    <Col>Price:</Col>
                    <Col><strong>${product.price}</strong></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                    <Col>Status:</Col>
                    <Col><strong>{product.countInStock > 0 ? 'In Stock!' : 'Out Of Stock'}</strong></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                    className="btn-block"
                    type="button"
                    variant="outline-dark"
                    disabled={Button.countInStock === 0}
                >Add To Cart
                    </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
