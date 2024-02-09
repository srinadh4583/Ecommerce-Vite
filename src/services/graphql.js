import { gql } from 'graphql-tag';
// import { useQuery, useMutation } from '@apollo/client';
const GET_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    getProduct(productId: $productId) {
      productId
      productName
      price
      description
      productImage
      category
      images{
        productImage1
            productImage2
            productImage3
            productImage4
            productImage5
      }
    }
  }
`;

const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      productId
      productName
      price
      description
      productImage
      category
      images{
        productImage1
            productImage2
            productImage3
            productImage4
            productImage5
      }
    }
  }
`;

const GET_CART_ITEMS = gql`
  query GetCartItems($userId: ID!) {
    getCartItems(userId: $userId) {
      cartItemId
      product {
        productName
        productId
        price
        description
        productImage
        category
      }
      quantity
      user {
        userId
        userName
      }
    }
  }
`;

const GET_ORDER_HISTORY = gql`
  query GetOrderHistory($userId: ID!) {
    getOrderHistory(userId: $userId) {
      orderId
      orderDate
      orderItems{
        product{
            productName
            productId
            productImage
            description
            price
        }
    }
    }
  }
`;
const GET_USER = gql`
query GetUser($userName:String!,$password:String!){
  getUser(userName:$userName,password:$password){
      userName
      userId
      password
      cartItems{
          product{
              productId
              productName
              productImage
              description
              price
              category
          }
          quantity
      }
      orders{
        orderDate
        orderItems{
            product{
            productId
            productName
            productImage
            description
            price
            category
            }
        }
    }
  }
}
`;
const GET_USER_ADDRESSES = gql`
query GetUserAddresses($userId:ID!){
  getUserAddresses(userId:$userId){
      addressId
      postalCode
      street
      city
      houseNo
  }
}
`;

const ADD_PRODUCT = gql`
  mutation AddProduct($product: ProductInput!) {
    addProduct(product: $product) {
      productName
      productId
      price
      description
      productImage
      category
    }
  }
`;

const ADD_TO_CART = gql`
  mutation AddToCart($cartItem: AddToCartInput!) {
    addToCart(cartItem: $cartItem) {
      cartItemId
      product {
        productName
        productId
        price
        description
        productImage
        category
      }
      quantity
      user {
        userName
        userId
      }
    }
  }
`;

const PLACE_ORDER = gql`
  mutation PlaceOrder($userId: ID!) {
    placeOrder(order: { userId: $userId }) {
      orderDate
      orderId
      user {
        userId
        userName
      }
    }
  }
`;


const ADD_USER = gql`
  mutation AddUser($userName: String!, $password: String!) {
    addUser(user: { userName: $userName, password: $password }) {
      userName
    }
  }
`;

const DELETE_CART_ITEM = gql`
mutation DeleteCartitem($cartItemId:ID!){
  deleteCartItem(cartItemId:$cartItemId){
      cartItemId
      product{
        productId  
        productName
        productImage
        description
        price
        category
      }
      quantity
      user{
          userName
      }
  }
}
`;
const ADD_ADDRESS = gql`
mutation AddAddress($userId:ID!,$address:AddressInput!){
  addAddress(userId:$userId,address:$address){
      addressId
      houseNo
      street
      city
      postalCode
  }
}
`;
const CREATE_ORDER = gql`
mutation CreateOrder($userId: Int!, $productId: Int!) {
  createOrder(order: {
      userId: $userId
      orderItems: {
          productId: $productId
      }
  }) {
      orderDate
      orderId
      orderItems {
          product {
              productName
              productId
              productImage
              description
              price
              category
          }
      }
      user {
          userName
      }
  }
}

`;

export {
  GET_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_CART_ITEMS,
  GET_ORDER_HISTORY,
  GET_USER,
  GET_USER_ADDRESSES,
  ADD_PRODUCT,
  ADD_TO_CART,
  PLACE_ORDER,
  ADD_USER,
  DELETE_CART_ITEM,
  ADD_ADDRESS,
  CREATE_ORDER
};
