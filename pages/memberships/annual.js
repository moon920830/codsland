import React from "react";
import { useState, useEffect, useLayoutEffect } from 'react';
// @material-ui/core components
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Input, Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import useMediaQuery from '@material-ui/core/useMediaQuery';
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutlined from '@material-ui/icons/LockOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Icon from "@material-ui/core/Icon";
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PaymentIcon from '@material-ui/icons/Payment';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';
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
//redux
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/actions';
//others
import { useSnackbar } from "notistack";
import axios from 'axios';
import { BACKEND_URL } from "../../AppConfigs";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PayComponent from './PayComponent.js';
import { payment_key } from '../../utils/config.js';
// import { AUTHENTICATE } from '../redux/types/authTypes';
import Router from "next/router";
import Datetime from "react-datetime";

import styles from "/styles/jss/nextjs-material-kit/pages/loginPage.js";
import modalStyle from "../../styles/jss/nextjs-material-kit/modalStyle.js";
import { BackspaceOutlined } from "@material-ui/icons";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const stripePromise = loadStripe(payment_key);


const useStyles = makeStyles((styles) => {
  return {
    ...modalStyle,
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
    },
    outlinedStyle: {
      '& .MuiOutlinedInput-input' : {
        padding: '9px'
      }
    },
    asdf: {
      '::placeholder' : {
        color : 'rgba(0,0,0,0.2)'
      }
    }
  }
  // Other styles
});

export default function AnnualMembership(props) {
  const snackbar = useSnackbar();
  const dispatch = useDispatch();
  //redux
  const redux_email = useSelector((state) => state.authentication.email);
  const redux_fullname = decodeURI(useSelector((state) => state.authentication.fullname));
  const redux_member = decodeURI(useSelector((state) => state.authentication.member));
  const redux_token = useSelector((state) => state.authentication.token);
  //state
  const [phone, setPhone] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [date, setDate] = useState("");
  const [clientSecret, setClientSecret]=useState(null);
  //card
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  //component mount
  useEffect(() => {
    const formData = { email : redux_email };
    axios
      .post(`${BACKEND_URL}/members/check`, {}, {headers: {token:redux_token}})
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
        const membership = response.data.data;
        if(Array.isArray(membership) && membership.length != 0)
          Router.push('/already-purchased');
      });

    axios.post(`${BACKEND_URL}/members/start-payment`, {type: '2'})
      .then(response=>{
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
        setClientSecret(response.data.data.clientSecret);
      })
  }, []);


  const checkValidation = () => {
    if(phone === null || phone === undefined || phone === "")
    {
      snackbar.enqueueSnackbar("Phone field required", { variant: "error" });
      return false;
    }
    if (phone.match(/12345/)) {
      snackbar.enqueueSnackbar("Enter valid phone number please", { variant: "error" });
      return false;
    } else if (phone.match(/1234/)) {
      snackbar.enqueueSnackbar("Enter valid phone number please", { variant: "error" });
      return false;
    }

    
    if(date === null || date === undefined || date === "")
    {
      snackbar.enqueueSnackbar("Birthday field required", { variant: "error" });
      return false;
    }
    const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!regex.test(date)) {
      snackbar.enqueueSnackbar("Enter valid birthday please", { variant: "error" });
      return false;
    }
    return true;
  }
  
  const handleDateChange = (e) => {
    const selectedDate = e._d;
    if(selectedDate == "" || selectedDate == null || selectedDate == undefined)
      return ;
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // Adding 1 because months are zero-indexed
    const day = selectedDate.getDate();
    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
    setDate(formattedDate);
  };

  const handleExpireDateChange = (e) => {
    const selectedDate = e._d;
    if(selectedDate == "" || selectedDate == null || selectedDate == undefined)
      return ;
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // Adding 1 because months are zero-indexed
    const day = selectedDate.getDate();
    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
    setExpireDate(formattedDate);
  };

  const renderInput = (props, openCalendar, closeCalendar) => (
    <div className="input-container">
      <input {...props} style={{
        color: 'rgba(0, 0, 0, 0.2)',
        '::placeholder': {
          color: 'rgba(0, 0, 0, 0.2)', // Color and transparency of the placeholder
        },
      }} className={classes.asdf} />
    </div>

    
  );

  const renderExpireInput = (props, openCalendar, closeCalendar) => (
    <div className="input-container">
      <input {...props} />
      <ScheduleIcon className="calendar-icon" onClick={openCalendar} />
    </div>
  );

  const handlePurchase = e => {
    setConfirm(false);
    handleSubmit(e);
  }

  const handlePaymentSuccess = (result) => {
    setConfirm(true);
  }

  const handleSubmit = (e) => {
    const formData = { date, phone, type: 'annual', period: 365 };
    //validation
    if(phone === null || phone === undefined || phone === "")
      return snackbar.enqueueSnackbar("Phone field required", { variant: "error" });

    snackbar.enqueueSnackbar("Purchase Success", { variant: "success" });
    axios
      .post(`${BACKEND_URL}/members/save`, formData, {headers: {token:redux_token}})
      // .post(`/asdf`, formData)
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
        snackbar.enqueueSnackbar("Purchase Success", { variant: "success" });
        dispatch(actions.removeError());
        return Router.push("/home-feed");
      });
  };
  return (
    <GridContainer justify="center">
      <GridItem sm={6}>
        <GridContainer direction="row" alignItems="center">
          <KeyboardBackspaceOutlinedIcon  onClick={() => {Router.push("/")}} className={classes.cursor} />
          <h4 onClick={() => {Router.push("/")}} className={classes.cursor} >&nbsp;Back</h4>
        </GridContainer>
        {1 == 2 ?
        (<GridContainer justify="center" alignItems="center" style={{height: '100%'}}>
          <GridItem md={9} lg={7} xl={7}>
            <Card className={classes[cardAnimaton]}>
              <form className={classes.form}>
                <CardBody id="card_body_annual">
                  <GridContainer justify="center" alignItems="center">
                      <div style={{backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", width: "120px", height: "120px"}}>
                        <CheckOutlinedIcon style={{width: "40%", height: "40%", color: "white"}} />
                      </div>
                      <h3 style={{textAlign: "center"}}>You have already purchased membership</h3>
                  </GridContainer>
                </CardBody>
              </form>
            </Card>
          </GridItem>
        </GridContainer>) :
        (<GridContainer justify="center" alignItems="center" style={{height: '100%'}}>
          <GridItem md={9} lg={7} xl={7}>
          <Card className={classes[cardAnimaton]}>
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
                <h3>Membership</h3>
                <h4>You are about to purchase annual membership</h4>
              </CardHeader>
              <CardBody id="card_body_annual">
                <TextField
                  className={classes.outlinedStyle}
                  onChange={() => {return null;}}
                  placeholder="Name"
                  fullWidth
                  variant="outlined"
                  value={redux_fullname}
                  InputProps={{
                    style: {
                      // Control font or other styles here
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                      fontSize: '14px',
                    },
                    readOnly: true
                  }}
                  style={{marginTop:'30px'}}
                />
                <TextField
                  className={classes.outlinedStyle}
                  onChange={() => {return null;}}
                  placeholder="Email"
                  fullWidth
                  variant="outlined"
                  value={redux_email}
                  InputProps={{
                    style: {
                      // Control font or other styles here
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                      fontSize: '14px',
                    },
                    readOnly: true
                  }}
                  style={{marginTop:'30px'}}
                />
                <Datetime
                  id="birthday"
                  inputProps={{ placeholder: "Birthday", style: {
                    width: '100%',
                    padding: '10px 14px', // Adjust padding as needed
                    borderTop: '1px solid #ced4da', // Border color for top
                    borderLeft: '1px solid #ced4da', // Border color for left
                    borderRight: '1px solid #ced4da', // Border color for right
                    borderBottom: 'none', // Omit bottom border
                    borderRadius: '4px', // Border radius
                    outline: 'none',
                    fontSize: '16px', // Font size
                    marginTop: '30px',
                    color: '#333',
                    '::placeholder': {
                      color: 'rgba(255, 0, 0, 1)', // Color and transparency of the placeholder
                    },
                    placeholderStyle: {
                      color: 'rgba(255, 0, 0, 0.5)', // Color and transparency of the placeholder
                    }
                  }, }}
                  dateFormat={"YYYY-MM-DD"}
                  timeFormat={false}
                  onChange={handleDateChange}
                  // renderInput={renderInput}
                  // style={{display: "flex"}}
                />
                <PhoneInput
                  country={'us'}
                  value={phone}
                  onChange={phone => setPhone(phone)}
                  inputStyle={{width: '100%'}}
                  inputProps={{
                    type: "",
                    endAdornment: (
                      // <InputAdornment position="end">
                        <PhoneIcon className={classes.inputIconsColor} />
                      // </InputAdornment>
                    ),
                    autoComplete: "off"
                  }}
                  style={{marginTop:'30px', marginBottom:'30px'}}
                />
                {clientSecret&&(
                
                <Elements stripe={stripePromise} options={{clientSecret:clientSecret}} >
                  <PayComponent handlePurchase={handlePaymentSuccess} checkValidation={checkValidation} />
                </Elements>
                )}
              </CardBody>
          </Card>
          </GridItem>
        </GridContainer>)
        }
      </GridItem>

      {/* start of dialog */}
      <Dialog
        open={confirm}
        onClose={() => {setConfirm(false)}}
        aria-labelledby="responsive-dialog-title"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle id="responsive-dialog-title">
          <h4 className={classes.modalTitle}>Annual Membership</h4>
        </DialogTitle>
        <DialogContent>
          <h5>Are you ok to proceed?</h5>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => {setConfirm(false)}} color="default">
            Disagree
          </Button>
          <Button onClick={handlePurchase} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* end of dialog */}
    </GridContainer>
);
}
