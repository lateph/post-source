import React, { useState } from 'react';
import Fade from '@material-ui/core/Fade';
import ProductCardFront from './ProductCardFront';
import ProductCardBack from './ProductCardBack';
import ReviewCard from './ReviewCard';

const ProductCard = props => {
  const [showed, setShowed] = useState(false);
  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative', padding: '5px'}}
      onFocus={() => setShowed(true)}
      onMouseOver={() => setShowed(true)}
      onMouseLeave={() => setShowed(false)}
    >
      <ReviewCard {...props}/>
      {/* <Fade in={showed}>
        <ProductCardBack {...props} />
      </Fade> */}
    </div>
  );
};
export default ProductCard;
