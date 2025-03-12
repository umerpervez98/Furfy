'use client';
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { submitContactForm } from '@/services/contact-us-service';
import Input from '../shared/input/input';
import Label from '../shared/label/label';
import FormRow from '../Checkout/form-row/form-row';
import {
  GreenTick,
} from '@/components/Checkout/index.checkout';
import styles from './contact-form.module.scss';
import HeadingSecondary from '../shared/heading-secondary/heading-secondary';

const ContactForm = () => {
  // Single state object to manage all form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    order: '',
    message: ''
  });
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // Handle form field changes
  const handleChange = <T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
    e: React.ChangeEvent<T>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    const response = await submitContactForm(formData);
    if (response.error) {
      setError(true);
    } else {
      setShowSuccessMessage(true);
    }
  };


  useEffect(() => {
    if (showSuccessMessage) {


      const timerId = setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          order: '',
          message: ''
        });
        setShowSuccessMessage(false);
      }, 4000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [showSuccessMessage]);

  return (
    <Form onSubmit={handleSubmit} className="relative">
      <FormRow >
        <Input
          value={formData.name}
          type="text"
          name="name"
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
      <FormRow>
        <Input
          value={formData.phone}
          id="phone"
          type="tel"
          name="phone"
          required
          onChange={handleChange}
        />
        <Label extraStyles={{ opacity: 1 }} htmlFor="phone" value={formData.phone}>
          your number
        </Label>
      </FormRow>
      <FormRow >
        <Input
          value={formData.order}
          type="text"
          name="order"
          id="order"
          onChange={handleChange}
          onBlur={async () => { }}
        />
        <Label htmlFor="order" value={formData.order}>
          Order Number (optional)
        </Label>
      </FormRow>
      <FormRow className='mb-3'>
        <Input
          value={formData.message}
          type="textarea"
          name="message"
          id="message"
          required
          onChange={handleChange}
          onBlur={async () => { }}
        />
        <Label htmlFor="message" value={formData.message}>
          Provide a detailed description here
        </Label>
      </FormRow>
      {showSuccessMessage && (
        <div className={styles['success-message']}>
          <GreenTick style={{ backgroundColor: '#000' }} />
          <HeadingSecondary>
            Thanks for your message!
          </HeadingSecondary>
          <p className='medium-text text-md'>
            Our customer care team will respond within 24-48 business hours.
          </p>
        </div>
      )}
      {error && <p className='text-danger medium-text text-md  position-absolute'>Error submiting your request, try again later</p>}
      <Button type="submit" className="primary-button uppercase mt-5 mb-5">
        Submit Enquiry
      </Button>
    </Form>
  );
};

export default ContactForm;
