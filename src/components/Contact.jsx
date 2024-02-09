import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiMail, FiPhone, FiMapPin, FiCheckCircle } from 'react-icons/fi';

// Keyframe animation for form entrance
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled components
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-top:50px;
  
`;

const ContactContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-in;
  width: 400px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  resize: none;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ContactInfo = styled.div`
  margin-top: 30px;
`;

const IconWrapper = styled.span`
  margin-right: 10px;
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  color: #008000;
  margin-top: 10px;
`;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission success
    setTimeout(() => {
      setSuccessMessage('Form submitted successfully');
      resetForm();
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <CenteredContainer>
      <ContactContainer>
        <h2>Contact Us</h2>
        {successMessage && (
          <SuccessMessage>
            <IconWrapper>
              <FiCheckCircle />
            </IconWrapper>
            {successMessage}
          </SuccessMessage>
        )}
        <ContactForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Phone</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Message</Label>
            <TextArea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            ></TextArea>
          </FormGroup>
          <SubmitButton type="submit">Submit</SubmitButton>
        </ContactForm>
        <ContactInfo>
          <h3>Contact Information</h3>
          <div>
            <IconWrapper>
              <FiMail />
            </IconWrapper>
            srinadh739@gmail.com
          </div>
          <div>
            <IconWrapper>
              <FiPhone />
            </IconWrapper>
            +91 83099 86026
          </div>
          <div>
            <IconWrapper>
              <FiMapPin />
            </IconWrapper>
            Narayanapuram(V), Suryapet(D), India
          </div>
        </ContactInfo>
      </ContactContainer>
    </CenteredContainer>
  );
};

export default ContactUs;
