import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';

interface ProductRatingProps {
    rating: number;
}

const ProductRating: React.FC<ProductRatingProps> = ({ rating }) => {
    const [userRating, setUserRating] = useState(rating);

    const handleRatingChange = (newRating: number) => {
        setUserRating(newRating);
    };

    return (
        <div>
            <StarRatings
                rating={userRating}
                starRatedColor="gold"
                changeRating={handleRatingChange}
                numberOfStars={5}
                starDimension="20px"
                starSpacing="2px"
                isSelectable={true}
            />
        </div>
    );
};

export default ProductRating;
