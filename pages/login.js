import React from "react";
import { useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutlined from '@material-ui/icons/LockOutlined'
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
  // Other styles
}));

export default function LoginPage(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = (e) => {
    console.log('Email changed:', e.target.value);
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
  const handleSubmit = e => {
    console.log(password + email);
    e.preventDefault();
    dispatch(actions.authenticate({ email, password }, 'login'));
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
                <a>Forget Password?</a>
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
