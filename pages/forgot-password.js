import React from "react";
import { useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import LockOutlinedIcon from '@material-ui/icons/Lock';
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
import { useDispatch } from 'react-redux';
import actions from '../redux/actions';

import styles from "/styles/jss/nextjs-material-kit/pages/loginPage.js";
import imageStyles from "../styles/jss/nextjs-material-kit/imagesStyles.js";
import axios from "axios";
import { BACKEND_URL } from "../AppConfigs";
import { useSnackbar } from "notistack";
import Router from "next/router";


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
  LockIconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100px",
    height: "100px",
  },
  cursor: {
    cursor: 'pointer'
  },
  ...imageStyles
  // Other styles
}));

export default function ForgotPasswordPage(props) {
  const snackbar = useSnackbar();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const matchesSm = useMediaQuery('(max-width:600px)');
  const handleSubmit = e => {
    console.log(email);
    e.preventDefault();

    
    // dispatch(actions.savestring(email));
    // Router.push("/reset-password");

    axios.post(`${BACKEND_URL}/auth/forgot-password`,{
      email:email,
    }).then(response=>{
      if(response.data.status=="error") return snackbar.enqueueSnackbar(response.data.error?response.data.error:"Error",{variant:"error"});
      snackbar.enqueueSnackbar("Success",{variant:"success"});

      dispatch(actions.savestring(email));
      return Router.push("/reset-password")
    });
  };
  return (
    <GridContainer sm={12}>
      { !matchesSm ? (
        <GridItem sm={6}>
          <div className={classes.authlogoNavigation}>
            <div className={classes.overlay}></div>
          </div>
        </GridItem>
      ) : null }
      <GridItem sm={6}>
        <GridContainer direction="row" alignItems="center">
          <KeyboardBackspaceOutlinedIcon onClick={() => {Router.push("/")}} className={classes.cursor} />
          <h4 onClick={() => {Router.push("/")}} className={classes.cursor} >&nbsp;Back</h4>
        </GridContainer>
        <GridContainer justify="center" alignItems="center" style={{height: '100%'}}>
          <GridItem md={9} lg={7} xl={7}>
          <Card className={classes[cardAnimaton]}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <GridContainer justify="center" alignItems="center" direction="column">
                  <div className={
                        classes.imgRaised +
                        " " +
                        classes.imgRoundedCircle +
                        " " +
                        classes.LockIconWrapper
                      }>
                    <LockOutlinedIcon style={{width: "40%", height: "40%"}} />
                  </div>
                </GridContainer>
                    {/* <img
                      src="/img/auth-logo.png"
                      alt="..."
                      className={
                        classes.imgRaised +
                        " " +
                        classes.imgRoundedCircle +
                        " " +
                        classes.imgFluid
                      }
                    /> */}
                <h3>Forgot password</h3>
                <h4>Enter Your Email To Reset Password</h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="Email..."
                  id="email"
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

              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button type="submit" round color="primary" size="lg">
                  Send
                </Button>
                <Link href="/login">Back To Login</Link>
              </CardFooter>
            </form>
          </Card>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
);
}
