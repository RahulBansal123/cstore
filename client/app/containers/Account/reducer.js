import { ACCOUNT_UPDATE, FETCH_PROFILE, DELETE_ACCOUNT } from './constants';

const initialState = {
  user: {
    name: '',
  },
  isLoading: false,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_UPDATE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case FETCH_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        user: {
          name: '',
        },
      };
    default:
      return state;
  }
};

export default accountReducer;
