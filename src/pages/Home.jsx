// Home.js

import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const HeroSection = styled.section`
  text-align: center;
  padding: 50px;
  background-color: #f0f0f0;
`;

const HeroImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
`;

const HeroHeadline = styled.h1`
  margin-top: 20px;
  font-size: 2.5rem;
  color: #333;
`;

const CTAButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #ff4500;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const FeaturedProductsSection = styled.section`
  padding: 50px;
  text-align: center;
`;

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const FeaturedProduct = styled.div`
  width: 300px;
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 5px;
`;

const ProductName = styled.h2`
  margin-top: 10px;
  font-size: 1.5rem;
  color: #333;
`;

const ProductDescription = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  color: #666;
`;

const Home = () => {
  return (
    <>
      <HeroSection>
        <HeroImage src="https://img.freepik.com/free-photo/arrangement-black-friday-shopping-carts-with-copy-space_23-2148667047.jpg?size=626&ext=jpg&ga=GA1.1.1621792241.1706171492&semt=ais" alt="Hero Image" />
        <HeroHeadline>Welcome to Our Store!</HeroHeadline>
        <NavLink to='/products'><CTAButton>Shop Now</CTAButton></NavLink>
      </HeroSection>

      <FeaturedProductsSection>
        <h2>Featured Products</h2>
        <ProductContainer>
          <FeaturedProduct>
            <ProductImage src="https://image01.realme.net/general/20230608/1686196034266e84391de43944a599cdec535212ef4f6.png?width=1440&height=1440&size=710277" alt="Product 1" />
            <ProductName>Product 1</ProductName>
            <ProductDescription>High-quality description of the product.</ProductDescription>
          </FeaturedProduct>

          <FeaturedProduct>
            <ProductImage src="https://image01.realme.net/general/20230718/16896509943742cfb61eae375450f947cdd15abdae7b1.png?width=1440&height=1440&size=477649" alt="Product 2" />
            <ProductName>Product 2</ProductName>
            <ProductDescription>Another compelling description for this product.</ProductDescription>
          </FeaturedProduct>
        </ProductContainer>
      </FeaturedProductsSection>
    </>
  );
};

export default Home;
