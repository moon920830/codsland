import { ERROR, REMOVE_ERROR } from '../types/errorTypes';
import { setCookie, removeCookie } from '../../utils/cookie';
import { AUTHENTICATE, DEAUTHENTICATE, SAVESTRING, SAVEOTP } from '../types/authTypes';
import Router from 'next/router';

export const createError = message => {
  return dispatch => {
    if (message == "AUTH_ERROR") {
      removeCookie('token');
      removeCookie('fullname');
      removeCookie('email');
      Router.push('/');
      dispatch({ type: DEAUTHENTICATE });
    }

    dispatch({ type: ERROR, payload: message });
  };
};

export const removeError = () => {
  return dispatch => {
    dispatch({ type: REMOVE_ERROR });
  };
};

export default {
  createError,
  removeError,
};