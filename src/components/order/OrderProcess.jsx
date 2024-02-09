import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const ShippingInformation = ({ onSubmitShipping }) => {
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitShipping({ address, contactNumber });
  };

  return (
    <>
      <h2>Shipping Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>
        <label>
          Contact Number:
          <input type="tel" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
        </label>
        <button type="submit">Continue to Payment</button>
      </form>
    </>
  );
};

const PaymentInformation = ({ onSubmitPayment }) => {
  // Add payment-related state and input fields as needed

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitPayment(/* Add payment details here */);
  };

  return (
    <>
      <h2>Payment Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Add payment input fields */}
        <button type="submit">Submit Payment</button>
      </form>
    </>
  );
};

const ConfirmationPage = ({ orderDetails }) => {
  return (
    <>
      <h2>Order Confirmation</h2>
      {/* Display order details */}
      <div>Order placed successfully!</div>
    </>
  );
};




const Checkout = () => {
  const [step, setStep] = useState(2);
  const [shippingDetails, setShippingDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const { state } = useCart();
  const { cart } = state;


  const handleShippingSubmit = (shippingInfo) => {
    setShippingDetails(shippingInfo);
    setStep(3);
  };

  const handlePaymentSubmit = (paymentInfo) => {
    // Handle payment submission and order confirmation
    setPaymentDetails(paymentInfo);
    setStep(4);
  };


  return (
    <>
      {step === 2 && <ShippingInformation onSubmitShipping={handleShippingSubmit} />}
      {step === 3 && <PaymentInformation onSubmitPayment={handlePaymentSubmit} />}
      {step === 4 && <ConfirmationPage orderDetails={{ shippingDetails, paymentDetails, cart }} />}
    </>
  );
};

export default Checkout;
