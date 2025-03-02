'use client'
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { submitOrder } from '@services/api';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });
  const [orderData, setOrderData] = useState({
    paymentMethodData: {
      method: "creditcard",
      lastFour: "1111",
      cardType: "visa",
      expiry: "11/2033",
      email: "",
    },
    nonce: "tokencc_bf_563gkn_jxd3wg_ngpz98_qbvfrr_wc5",
    state: "NSW",
    postcode: 2026,
    country: "AU",
    email: "takuho+10@excede.com.au",
    phone: "+818015296124",
    firstName: "Takuho",
    lastName: "Miyata",
    city: "BONDI BEACH",
    address1: "Unit 16",
    address2: "5 Campbell Parade",
    deliveryNote: "Deliver to the front of my property",
  });

  useEffect(() => {
    // Fetch cart items from API
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => {
        setCartItems(data.items);
        setTotalPrice(data.total);
      })
      .catch(err => console.error('Error fetching cart items:', err));
  }, []);

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    // API call to submit order
    const data = await submitOrder(orderData)
    console.log("data===>",data)
  };

  return (
    <Container className='page-width my-5'>
      <Row>
        <Col md={8}>
          <h2>Checkout</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' name='name' value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' name='email' value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control type='text' name='address' value={formData.address} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control type='text' name='city' value={formData.city} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId='zip'>
              <Form.Label>ZIP Code</Form.Label>
              <Form.Control type='text' name='zip' value={formData.zip} onChange={handleChange} required />
            </Form.Group>
            <Button type='submit' className='mt-3'>Place Order</Button>
          </Form>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              {/* {cartItems.map(item => (
                <div key={item.id} className='d-flex justify-content-between'>
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>
              ))} */}
              <hr />
              <h5>Total: ${totalPrice}</h5>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
