import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BACKEND_URL } from "../AppConfigs";

export const useCheckTokenValidity = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authentication.token); // Replace with your actual reducer and token access

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      // console.log("&&&" + token);
      if(token === null) {
        const userToken = sessionStorage.getItem('userToken');
        // const formData = { token : userToken };
        axios
          .post(`${BACKEND_URL}/auth/verify`, {}, {headers:{
            token : userToken
          }})
          .then((response) => {
            console.log(response);
          });
      }
    } else {
      isMounted.current = true;
    }
  }, []);
};