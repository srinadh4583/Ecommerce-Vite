import React from 'react';
import { FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa'; 
import '../../App.css'
import {  useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../../services/graphql';
import { useCart } from '../context/CartContext';

function Payment() {
  const {state:cartState}=useCart()
  const{user}=cartState
  const {state}=useOrder();
   const {selectedProducts}=state
   //console.log(selectedProducts);
    const navigate=useNavigate();
    const [createOrderMutation] = useMutation(CREATE_ORDER);

    const handleSubmit = async (event) => {
      event.preventDefault();
      
      // Call the mutation function with the necessary variables
      try {
        
        selectedProducts.forEach(async (ele) => {
          let productId;
          ele.forEach(ele1=>{
            productId=ele1.productId;
          })
          if(productId&&user.userId){
            
          try {
            const { data } = await createOrderMutation({
              variables: {
                userId: user.userId, // Assuming user is defined and has userId
                productId: productId
              }
            });
            console.log(data);
            
          } catch (error) {
            console.error(`Error creating order for product ${ele}:`, error);
            // Handle error accordingly
          }
          }
        });
        navigate("/paymentSuccess");
      } catch (error) {
        console.error('Error creating order:', error);
        // Handle error accordingly
      }
    }
  return (
    <div className="modal">
      <form className="form" onSubmit={handleSubmit}>
        <div className="payment--options">
          <button name="paypal" type="button">
            <FaPaypal />
          </button>
          <button name="apple-pay" type="button">
            <FaApplePay />
          </button>
          <button name="google-pay" type="button">
            <FaGooglePay />
          </button>
        </div>
        <div className="separator">
          <hr className="line" />
          <p>or pay using credit card</p>
          <hr className="line" />
        </div>
        <div className="credit-card-info--form">
          <div className="input_container">
            <label htmlFor="password_field" className="input_label">
              Card holder full name
            </label>
            <input
              id="password_field"
              className="input_field"
              type="text"
              name="input-name"
              title="Input title"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="password_field" className="input_label">
              Card Number
            </label>
            <input
              id="password_field"
              className="input_field"
              type="number"
              name="input-name"
              title="Input title"
              placeholder="0000 0000 0000 0000"
              required
              pattern='[0-9]{3}'
            />
          </div>
          <div className="input_container">
            <label htmlFor="password_field" className="input_label">
              Expiry Date / CVV
            </label>
            <div className="split">
              <input
                id="password_field"
                className="input_field"
                type="text"
                name="input-name"
                title="Expiry Date"
                placeholder="01/23"
                required
              />
              <input
                id="password_field"
                className="input_field"
                type="number"
                name="cvv"
                title="CVV"
                placeholder="CVV"
                required
                pattern='[0-9]{3}'
              />
            </div>
          </div>
        </div>
        <button className="purchase--btn">Pay</button>
      </form>
    </div>
  );
}

export default Payment;
