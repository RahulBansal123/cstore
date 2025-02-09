import React from 'react';

import ReactStars from 'react-rating-stars-component';

import { dateFormat } from '../../../helpers';
import { getColors } from '../../../helpers';

const List = (props) => {
  const { reviews } = props;

  const getAvatar = (review) => {
    const color = getColors();
    if (review.user.name) {
      return (
        <div
          className="d-flex flex-column justify-content-center align-items-center fw-1 text-white avatar"
          style={{ backgroundColor: color ? color : 'red' }}
        >
          {review.user.name.charAt(0)}
        </div>
      );
    }
  };

  return (
    <div className="review-list">
      {reviews.map((review, index) => (
        <div className="d-flex align-items-center mb-3 review-box" key={index}>
          <div className="mx-3">{getAvatar(review)}</div>
          <div className="p-3 p-lg-4 w-100">
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="mb-0 mr-2 one-line-ellipsis">{review.title}</h4>
              <ReactStars
                classNames="mr-2"
                size={16}
                edit={false}
                color={'#adb5bd'}
                activeColor={'#ffb302'}
                a11y={true}
                isHalf={true}
                emptyIcon={<i className="fa fa-star" />}
                halfIcon={<i className="fa fa-star-half-alt" />}
                filledIcon={<i className="fa fa-star" />}
                value={review.stars}
              />
            </div>
            <p className="mb-2 fs-12">{dateFormat(`${review?.created}`)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(List);
