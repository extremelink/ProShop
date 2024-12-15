import React from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Rating = ({ value, text }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(<FaStar key={i} />);
    } else if (value >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }
  return (
    <div className='rating'>
            <span>{ stars }</span>
            <span>{ text } reviews</span>
        </div>
  )
}

export default Rating