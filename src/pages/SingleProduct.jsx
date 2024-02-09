import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT } from '../services/graphql';
import Spinner from '../components/Spinner';
import SomeThingWentWrong from '../components/Error/SomeThingWentWrong';
import ImageGallery from 'react-image-gallery'; // Import the ImageGallery component
import 'react-image-gallery/styles/css/image-gallery.css'; // Import the CSS for ImageGallery

const SingleProduct = () => {
  const { productId } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { productId: productId },
  });

  if (loading) return <Spinner />;
  if (error) return <SomeThingWentWrong />;

let imagesArray;
  if(data) imagesArray = data.getProduct.images && Object.values(data.getProduct.images)[0]; // Assuming this is your images array

  // Format images for react-image-gallery
  const formattedImages = Object.values(imagesArray).map((image, index) => {
  if (index > 0) {
    return {
      original: image,
      thumbnail: image,
      sizes: '100px',// You can set thumbnail to the same image or provide different thumbnails
      originalHeight:'300px',
      
    };
  } else {
    return {
      original: data.getProduct.productImage,
      originalHeight:'300px',
    };
  }
});

  return (
    <div>
     <h1>{data.getProduct.productName}</h1>
      {imagesArray && (
        <ImageGallery
          items={formattedImages}
          showFullscreenButton={false}
          showPlayButton={false}
          className="image-gallery-custom"
        />
      )}
      <p>{data.getProduct.description}</p>
    </div>
  );
};

export default SingleProduct;
