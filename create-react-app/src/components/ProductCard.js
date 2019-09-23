import React from 'react';
import ReviewCard from './ReviewCard';

const ProductCard = props => {
  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative', padding: '0px'}}
    >
      <ReviewCard {...props}/>
    </div>
  );
};
export default ProductCard;
