import { AUTHENTICATE, DEAUTHENTICATE, SAVESTRING, SAVEOTP } from '../types/authTypes';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.authentication };
    case SAVESTRING:
      return { ...state, stringValue : action.payload };
    case SAVEOTP:
      return { ...state, otp : action.payload };
    case AUTHENTICATE:
      return { ...state, token: action.payload.token, fullname: action.payload.fullname, email: action.payload.email };
    case DEAUTHENTICATE:
      return { ...state, token: null };
    default:
      return state;
  }
};