'use client';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Input from '../shared/input/input';
import Label from '../shared/label/label';
import FormRow from '../Checkout/form-row/form-row';
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
  const handleChange = <T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
    e: React.ChangeEvent<T>
  ) => {
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
      <FormRow className=''>
        <Input
          value={formData.name}
          type="text"
          name="firstName"
          className='full-width'
          id="name"
          required
          onChange={handleChange}
          onBlur={async () => { }}
        />
        <Label htmlFor="name" value={formData.name}>
          your name
        </Label>
      </FormRow>

      <FormRow>
        <Form.Control
          className='input-background p-3 border border-dark text-lg font-medium'
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <Input
          value={formData.email}
          id="email"
          type="email"
          name="email"
          required
          onChange={handleChange}
        />
        <Label htmlFor="email" value={formData.email}>
          your email
        </Label>
      </FormRow>

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

      <Button type="submit" className="primary-button uppercase mt-5 mb-5">
        Submit Enquiry
      </Button>
    </Form>
  );
};

export default ContactForm;
