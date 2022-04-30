import {
  F_ADDRESS,
  F_ADDRESSES,
  CHANGE_ADDRESS,
  ADDRESS_EDIT,
  SET_ADDRESS_FORM_ERRORS,
  SET_ADDRESS_FORM_EDIT_ERRORS,
  RESET_ADDRESS,
  ADD_ADDRESS,
  REMOVE_ADDRESS,
  SET_ADDRESS_LOADING,
} from './constants';

const initialState = {
  addresses: [],
  addressFormData: {
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  },
  address: {
    _id: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    isDefault: false,
  },
  formErrors: {},
  editFormErrors: {},
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case F_ADDRESSES:
      return {
        ...state,
        addresses: action.payload,
      };
    case F_ADDRESS:
      return {
        ...state,
        address: action.payload,
        editFormErrors: {},
      };
    case ADD_ADDRESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
      };
    case REMOVE_ADDRESS:
      const index = state.addresses.findIndex((b) => b._id === action.payload);
      return {
        ...state,
        addresses: [
          ...state.addresses.slice(0, index),
          ...state.addresses.slice(index + 1),
        ],
      };
    case CHANGE_ADDRESS:
      return {
        ...state,
        addressFormData: {
          ...state.addressFormData,
          ...action.payload,
        },
      };
    case ADDRESS_EDIT:
      return {
        ...state,
        address: {
          ...state.address,
          ...action.payload,
        },
      };
    case SET_ADDRESS_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload,
      };
    case SET_ADDRESS_FORM_EDIT_ERRORS:
      return {
        ...state,
        editFormErrors: action.payload,
      };
    case RESET_ADDRESS:
      return {
        ...state,
        addressFormData: {
          address: '',
          city: '',
          state: '',
          country: '',
          zipCode: '',
          isDefault: false,
        },
        formErrors: {},
      };
    case SET_ADDRESS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default addressReducer;
