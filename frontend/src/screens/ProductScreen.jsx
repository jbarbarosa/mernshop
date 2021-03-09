import axios from 'axios';
import Rating from '../components/Rating';
import React, { useState, useEffect } from 'react';
import { Card, Col, Button, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({})
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
    }

    fetchProduct();
  }, [match.params.id])
  
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={ product.image } alt={ product.name } fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{ product.name }</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={ product.rating } text={`${ product.numReviews } reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${ product.price }
            </ListGroup.Item>
            <ListGroup.Item>
              { product.description }
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price:
                  </Col>
                  <Col>
                    <strong>${ product.price }</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>{ product.countInStock ? 'Availabe' : 'Out of Stock'}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="btn-block" type="button" disabled={ !product.countInStock }>
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen;
