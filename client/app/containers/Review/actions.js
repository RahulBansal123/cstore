/*
 *
 * Review actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
  FETCH_REVIEWS,
  SET_REVIEWS_LOADING,
  ADD_REVIEW,
  REMOVE_REVIEW,
  FETCH_PRODUCT_REVIEWS,
  REVIEW_CHANGE,
  RESET_REVIEW,
  SET_REVIEW_FORM_ERRORS,
} from './constants';
import { allFieldsValidation } from '../../utils/validation';

export const reviewChange = (name, value) => {
  let formData = {};
  formData[name] = value;
  return {
    type: REVIEW_CHANGE,
    payload: formData,
  };
};

// fetch reviews api
export const fetchReviews = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_REVIEWS_LOADING, payload: true });

      const response = await axios.get(`/api/review`);

      dispatch({ type: FETCH_REVIEWS, payload: response.data.reviews });
    } catch (error) {
      console.log('error');
    } finally {
      dispatch({ type: SET_REVIEWS_LOADING, payload: false });
    }
  };
};

export const approveReview = (review) => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`/api/review/approve/${review._id}`);

      dispatch(fetchReviews());
    } catch (error) {
      console.log('error');
    }
  };
};

export const rejectReview = (review) => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`/api/review/reject/${review._id}`);

      dispatch(fetchReviews());
    } catch (error) {
      console.log('error');
    }
  };
};

// delete review api
export const deleteReview = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/api/review/delete/${id}`);

      const optionsS = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1,
      };

      if (response.data.success == true) {
        dispatch(success(optionsS));
        dispatch({
          type: REMOVE_REVIEW,
          payload: id,
        });
      }
    } catch (error) {
      console.log('error');
    }
  };
};

// fetch product reviews api
export const fetchProductReviews = (slug) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/api/review/${slug}`);

      const { ratingSummary, totalRatings, totalReviews, totalSummary } =
        getProductReviewsSummary(response.data.reviews);

      dispatch({
        type: FETCH_PRODUCT_REVIEWS,
        payload: {
          reviews: response.data.reviews,
          reviewsSummary: {
            ratingSummary,
            totalRatings,
            totalReviews,
            totalSummary,
          },
        },
      });
    } catch (error) {
      console.log('error');
    }
  };
};

export const addProductReview = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        title: 'required',
        stars: 'required|numeric|min:1',
      };

      const review = getState().review.reviewFormData;
      const product = getState().product.storeProduct;

      const newReview = {
        product: product._id,
        stars: review.stars,
        title: review.title,
      };

      const { isValid, errors } = allFieldsValidation(newReview, rules, {
        'required.title': 'Title is required.',
        'required.stars': 'Rating is required.',
        'min.stars': 'Rating is required.',
      });

      if (!isValid) {
        return dispatch({ type: SET_REVIEW_FORM_ERRORS, payload: errors });
      }

      const response = await axios.post(`/api/review/add`, newReview);

      const optionsS = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1,
      };

      if (response.data.success === true) {
        dispatch(success(optionsS));
        dispatch(fetchProductReviews(product.slug));

        // dispatch({
        //   type: ADD_REVIEW,
        //   payload: response.data.review
        // });
        dispatch({ type: RESET_REVIEW });
      }
    } catch (error) {
      console.log('error');
    }
  };
};

export const getProductReviewsSummary = (reviews) => {
  let ratingSummary = [{ 5: 0 }, { 4: 0 }, { 3: 0 }, { 2: 0 }, { 1: 0 }];
  let totalRatings = 0;
  let totalReviews = 0;
  let totalSummary = 0;

  if (reviews.length > 0) {
    reviews.map((item, i) => {
      totalRatings += item.stars;
      totalReviews += 1;

      switch (Math.round(item.stars)) {
        case 5:
          ratingSummary[0][5] += 1;
          totalSummary += 1;
          break;
        case 4:
          ratingSummary[1][4] += 1;
          totalSummary += 1;

          break;
        case 3:
          ratingSummary[2][3] += 1;
          totalSummary += 1;

          break;
        case 2:
          ratingSummary[3][2] += 1;
          totalSummary += 1;

          break;
        case 1:
          ratingSummary[4][1] += 1;
          totalSummary += 1;

          break;
        default:
          0;
          break;
      }
    });
  }

  return { ratingSummary, totalRatings, totalReviews, totalSummary };
};
