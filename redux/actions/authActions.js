import Router from 'next/router';
import axios from 'axios';
import { AUTHENTICATE, DEAUTHENTICATE, SAVESTRING, SAVEOTP } from '../types/authTypes';
import { setCookie, removeCookie } from '../../utils/cookie';
import { createError, removeError } from './errorActions';
import {BACKEND_URL} from '../../AppConfigs'

// gets token from the api and stores it in the redux store and in a cookie
const authenticate = ({ email, password }, type) => {
  if (type !== 'login' && type !== 'register') {
    throw new Error('Wront API call!');
  }
  return async dispatch => {
    const formData = { email, password };
    try {
      const {
        data: { data: { token } },
      } = await axios.post(`${BACKEND_URL}/auth/signin`, formData);
      // const token = "djaojnhh234234";
      console.log(token);
      setCookie('token', token);
      Router.push('/');
      dispatch(removeError());
      dispatch({ type: AUTHENTICATE, payload: token });
    } catch (response) {
      const {
        status
      } = response;
      dispatch(createError(status));
    }
  };
};

// gets the token from the cookie and saves it in the store
const reauthenticate = token => {
  return dispatch => {
    dispatch({ type: AUTHENTICATE, payload: token });
  };
};

// removing the token
const deauthenticate = () => {
  return dispatch => {
    removeCookie('token');
    removeCookie('fullname');
    removeCookie('email');
    Router.push('/');
    dispatch({ type: DEAUTHENTICATE });
  };
};




// saves a simple string in store // used for email save
const savestring = stringValue => {
  return dispatch => {
    dispatch({ type: SAVESTRING, payload: stringValue });
  };
};

// saves a otp in store
const saveotp = otp => {
  return dispatch => {
    dispatch({ type: SAVEOTP, payload: otp });
  };
};

export default {
  authenticate,
  reauthenticate,
  deauthenticate,
  savestring,
  saveotp
};