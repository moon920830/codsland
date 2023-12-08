import React from "react";
import { useState, useEffect, useLayoutEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutlined from '@material-ui/icons/LockOutlined';
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardFooter from "/components/Card/CardFooter.js";
import CustomInput from "/components/CustomInput/CustomInput.js";
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/actions';
//others
import { useSnackbar } from "notistack";
import axios from 'axios';
import { BACKEND_URL } from "../AppConfigs";
import { setCookie, removeCookie } from '../utils/cookie';
import { AUTHENTICATE } from '../redux/types/authTypes';
import Router from "next/router";

import styles from "/styles/jss/nextjs-material-kit/pages/loginPage.js";
import { BackspaceOutlined } from "@material-ui/icons";

const useStyles = makeStyles((styles) => ({
  authlogoNavigation: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundImage: "url('/img/auth-bg.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  overlay: {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#2E3192',
    mixBlendMode: 'overlay',
    zIndex: 1,
    boxShadow: '1px 0px 1px 1px rgba(0,0,0,0.1)',
  },
  cursor: {
    cursor: 'pointer'
  }
  // Other styles
}));

export default function LoginPage(props) {
  const snackbar = useSnackbar();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = (e) => {
    console.log('Email changed:', e.target.value);
    setEmail(e.target.value)
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const matchesSm = useMediaQuery('(max-width:600px)');

  //redux
  const token = useSelector((state) => state.authentication.token);
  useLayoutEffect(() => {
    if(token != null)
      Router.push("/");
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    const formData = { email, password };
    //validation
    if(email === null || email === undefined)
      return snackbar.enqueueSnackbar("Email field required", { variant: "error" });
    if(password === null || password === undefined)
      return snackbar.enqueueSnackbar("Password field required", { variant: "error" });
    if(password.length < 6)
      return snackbar.enqueueSnackbar("Password must be longer than 6 characters", { variant: "error" });

    axios
      .post(`${BACKEND_URL}/auth/signin`, formData)
      .then((response) => {
        //error handler
        if (response.data.status == "error") {
          const {
            error
          } = response.data;
          dispatch(actions.createError(error));
          return snackbar.enqueueSnackbar(
            response.data.error ? response.data.error : "Error",
            { variant: "error" }
          );
        }
        //success
        snackbar.enqueueSnackbar("Login Success", { variant: "success" });
        
        const {
          data: {
            data: { token, fullname, email },
          },
        } = response;
        setCookie("token", token);
        setCookie("fullname", fullname);
        setCookie("email", email);
        sessionStorage.setItem('userToken', token);
        dispatch(actions.removeError());
        dispatch({ type: AUTHENTICATE, payload: { token, fullname, email } });
        return Router.push("/home-feed");
      });
    // dispatch(actions.authenticate({ email, password }, 'login'));
  };
  return (
    <GridContainer>
      { !matchesSm ? (
        <GridItem sm={6}>
          <div className={classes.authlogoNavigation}>
            <div className={classes.overlay}></div>
          </div>
        </GridItem>
      ) : null }
      <GridItem sm={6}>
        <GridContainer direction="row" alignItems="center">
          <KeyboardBackspaceOutlinedIcon  onClick={() => {Router.push("/")}} className={classes.cursor} />
          <h4 onClick={() => {Router.push("/")}} className={classes.cursor} >&nbsp;Back</h4>
        </GridContainer>
        <GridContainer justify="center" alignItems="center" style={{height: '100%'}}>
          <GridItem md={9} lg={7} xl={7}>
          <Card className={classes[cardAnimaton]}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <Link href="/" >
                  <a>
                    <img
                      src="/img/auth-logo.png"
                      alt="..."
                      className={
                        classes.imgRaised +
                        " " +
                        classes.imgRoundedCircle +
                        " " +
                        classes.imgFluid
                      }
                    />
                  </a>
                </Link>
                <h3>Sign In</h3>
                <h4>Enter your Detail To continue</h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="Email..."
                  id="email"
                  type="email"
                  onChange={handleEmailChange}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "email",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputIconsColor} />
                      </InputAdornment>
                    )
                  }}
                />

                <CustomInput
                  labelText="Password"
                  id="pass"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onChange={handlePasswordChange}
                  inputProps={{
                    type: "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <LockOutlined className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                    autoComplete: "off"
                  }}
                />
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button type="submit" round color="primary" size="lg">
                  Sign In
                </Button>
                <Link href="/forgot-password">Forget Password?</Link>
                <p>Don't have an Account? <Link href="/register">Register Now</Link> </p>
              </CardFooter>
            </form>
          </Card>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
);
}
