'use client';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ContactForm = () => {
  // Single state object to manage all form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderNumber: '',
    message: ''
  });

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // You can integrate API call here
  };

  return (
    <Form onSubmit={handleSubmit} className="">
      <Form.Group className="mb-3">
        <Form.Control
          className='input-background p-3 border border-dark text-lg font-medium'
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
        className='input-background p-3 border border-dark text-lg font-medium'
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
        className='input-background p-3 border border-dark text-lg font-medium'
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your Number"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
        className='input-background p-3 border border-dark text-lg font-medium'
          type="text"
          name="orderNumber"
          value={formData.orderNumber}
          onChange={handleChange}
          placeholder="Order Number (if you are a customer)"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
        className='input-background p-3 border border-dark text-lg font-medium'
          as="textarea"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Provide a detailed description here"
          required
        />
      </Form.Group>

      <Button  type="submit" className="primary-button uppercase">
        Submit Enquiry
      </Button>
    </Form>
  );
};

export default ContactForm;
