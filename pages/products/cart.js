import React, { useState, useEffect, useRef } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import BlockIcon from "@material-ui/icons/Block";
import PhoneIcon from '@material-ui/icons/Phone';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
// core components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Container, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
// components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
// sections for this page
import Card from "/components/Card/Card.js";
import ElevateAppBar from "/components/General/layouts/NavBar.js";
//redux
import { useSelector, useDispatch } from "react-redux";
import actions from '../../redux/actions';
import axios from 'axios';
import { BACKEND_URL } from "../../AppConfigs";
//other
import Datetime from "react-datetime";
import { useSnackbar } from "notistack";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PayComponent from './PayComponent.js';
import ProductList from "./productList.js";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { payment_key } from "../../utils/config.js";
//children
import AutocompleteInput from './cart/AutocompleteInput.js';
import NoProduct from "./cart/NoProduct.js";
import NotValid from "./cart/NotValid.js";
import VerticalLinearStepper from "./cart/VerticalLinearStepper.js";
//style
import modalStyle from "../../styles/jss/nextjs-material-kit/modalStyle.js";
import styles from "/styles/jss/nextjs-material-kit/pages/components.js";
import basicStyles from "/styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";
//next
import Router from "next/router";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

import Close from "@material-ui/icons/Close";
import ShipRates from "./cart/ShipRates.js";

const stripePromise = loadStripe(payment_key);

const useStyles = makeStyles(theme => {
  return {
    ...styles,
    ...basicStyles,
    ...modalStyle,
    slideCard: {
      backgroundColor: "#F5F5F5",
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    greyBackground: {
      backgroundColor: "#EEE"
    },
    cardPadding: {
      padding: "20px"
    },
    cardPaddingNoTop: {
      paddingBottom: "20px",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    cardSubTitle: {
      opacity:"0.5",
      fontSize: "13px"
    },
    cursor: {
      cursor: "pointer"
    },
    reportPost: {
      width: "146px",
      height: "49px",
      borderRadius: "18px",
      background: "#FFF",
      boxShadow: "0px 6px 16.6px 0px rgba(0, 0, 0, 0.25)",
    },
    textCenter: {
      textAlign: 'center'
    },
    enterReason: {
      marginTop: "21px",
    },
    formControl: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    outlinedStyle: {
      '& .MuiOutlinedInput-input' : {
        padding: '9px'
      }
    },
    smallFont: {
      fontFamily: 'Apple-System,Arial,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,STXihei,sans-serif',
      fontSize: '14px',
      cursor: 'pointer'
    },
    noPadding: {
      padding: '0px'
    },
    selectedPlan: {
      padding: '0px',
      marginLeft: '0px',
      marginRight: '0px',
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    unselectedPlan: {
      padding: '0px',
      marginLeft: '0px',
      marginRight: '0px',
    },
    selectedPlanItem: {
      paddingTop: '10px',
      paddingBottom: '10px',
    },
  }
});

export default function Cart(props) {
  //snackbar
  const snackbar = useSnackbar();
  //redux
  const dispatch = useDispatch();
  const redux_token = useSelector((state) => state.authentication.token);
  const redux_email = useSelector((state) => state.authentication.email);
  const redux_fullname = useSelector((state) => state.authentication.fullname);
  //other
  const classes = useStyles();
  const { ...rest } = props;
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [addressContainer, setAddressContainer] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [shipment, setShipment] = useState({});
  const [disabled, setDisabled] = useState(false);
  

  const renderInput = (props, openCalendar, closeCalendar) => (
    <div className="input-container">
      <input {...props} />
      {/* <CalendarTodayIcon className="calendar-icon" onClick={openCalendar} /> */}
    </div>
  );

  const handleDisabledChange = () => {
    setDisabled(false);
  }

  const handleAddressContainerChange = (addressObject) => {
    setAddressContainer(addressObject);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleDateChange = (e) => {
    const selectedDate = e._d;
    if (selectedDate === undefined || selectedDate === "" || selectedDate === null)
      return ;
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // Adding 1 because months are zero-indexed
    const day = selectedDate.getDate();
    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
    setDate(formattedDate);
  };

  const handleCurrentStepChange = (step) => {
    step = step > 3 ? 3 : step;
    //create dummy order
    if (step === 2) {
      handlePurchase();
    }
    //get stripe info
    if (step === 3) {
      axios.post(`${BACKEND_URL}/test/create-payment-intent`,{amount: total*100} , {headers: {token:redux_token}})
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
        setClientSecret(response.data.clientSecret)
      })
    }
    setCurrentStep(step);
  }

  const handlePay = (result) => {
    axios
      .post(`${BACKEND_URL}/shop/orders/purchase`, {
        result,
        order: shipment.order_id
      }, {headers: {token:redux_token}}) //, {headers: {token:redux_token}}
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
        Router.push("/dummy-success");
      });
  }

  //component mount
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/shop/cart`, {headers: {token:redux_token}}) //, {headers: {token:redux_token}}
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
        setProducts(response.data.data);
        
        const total = response.data.data.reduce((sum, value) => {
          if(value.product && value.product.price)
            return sum + value.product.price*value.count;
        }, 0)
        setTotal(total);
      });

    
    // axios.get(`${BACKEND_URL}/test/payment-intent`, {headers: {token:redux_token}})
    //   .then(response=>{
    //     if (response.data.status == "error") {
    //       const {
    //         error
    //       } = response.data;
    //       dispatch(actions.createError(error));
    //       return snackbar.enqueueSnackbar(
    //         response.data.error ? response.data.error : "Error",
    //         { variant: "error" }
    //       );
    //     }
    //     setClientSecret(response.data.clientSecret)
    //   })
    
    // setShipment(ship.data);
  }, []);

  const handleDeleteProduct = (id, index, change) => {
    axios
      .delete(`${BACKEND_URL}/shop/cart/${id}`, {headers: {token:redux_token}}) //, {headers: {token:redux_token}}
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

        let dummy_products = [...products];
        dummy_products.splice(index, 1);
        setProducts(dummy_products);
        handleTotalChange(change*(-1));
      });
  }

  const handleTotalChange = (change) => {
    let result = total*1.0+change*1.0;
    setTotal(result.toFixed(2));
  }

  const refreshTotal = () => {
    axios
      .get(`${BACKEND_URL}/shop/orders/${shipment.order_id}`, {headers: {token:redux_token}}) //, {headers: {token:redux_token}}
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
        

        const data = response.data.data;
        
        const products_price = data.products.reduce((sum, value) => {
          if(value.product && value.product.price)
            return sum + value.product.price*value.count;
        }, 0);
        let shipping_price = data.shipping_rate.amount;
        let result_price = products_price * 1.0 + shipping_price * 1.0 - total * 1.0;
        handleTotalChange(result_price.toFixed(2));
      });
  }

  const handleCheckDetails = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email === "")
      return snackbar.enqueueSnackbar("Enter email please", { variant: "error" });
    if(!emailRegex.test(email))
      return snackbar.enqueueSnackbar("Enter valid email please", { variant: "error" });
    if(phone === "")
      return snackbar.enqueueSnackbar("Enter phone number please", { variant: "error" });
    if (phone.match(/12345/)) {
      return snackbar.enqueueSnackbar("Enter valid phone number please", { variant: "error" });
    } else if (phone.match(/1234/)) {
      return snackbar.enqueueSnackbar("Enter valid phone number please", { variant: "error" });
    }
    if(date == '' || date == undefined)
      return snackbar.enqueueSnackbar("Enter shipping date please", { variant: "error" });
    if(addressContainer == {} || !addressContainer.hasOwnProperty('address') || addressContainer.address == "" || addressContainer.address == undefined)
      return snackbar.enqueueSnackbar("Enter shipping address please", { variant: "error" });
    return "valid";
  }

  const handlePurchase = () => {
    // if (handleCheckDetails() !== "valid")
    //   return ;
    axios
      .post(`${BACKEND_URL}/shop/orders/save`, {
        email,
        phone,
        date,
        location: addressContainer.address,
        street: addressContainer.street,
        city: addressContainer.city,
        state: addressContainer.state,
        country: addressContainer.country,
        zip: addressContainer.zip_code,
      }, {headers: {token:redux_token}}) //, {headers: {token:redux_token}}
      .then((response) => {
        //error handler
        if (response.data.status == "error") {
          const {
            error
          } = response.data;
          dispatch(actions.createError(error));
          setDisabled(true);
          return snackbar.enqueueSnackbar(
            response.data.error ? response.data.error : "Error",
            { variant: "error" }
          );
        }
        setShipment(response.data.data);
        // Router.push("/dummy-success");
        // snackbar.enqueueSnackbar("Purchase Success", { variant: "success" });
      });
  }

  return (
    <div>
      <ElevateAppBar />
      <div className={classNames(classes.mainRaised, classes.greyBackground)}>
        <div className={classes.sections}>
          <Container
            maxWidth={false}
            style={{ maxWidth: "80%", paddingTop: "30px" }}
          >
            <GridContainer
              direction="row"
              alignItems="center"
              style={{ paddingLeft: "15px" }}
            >
              <KeyboardBackspaceOutlinedIcon
                onClick={() => {
                  Router.push("/products");
                }}
                className={classes.cursor}
              />
              <h5
                onClick={() => {
                  Router.push("/products");
                }}
                className={classes.cursor}
              >
                &nbsp;Back
              </h5>
            </GridContainer>
            <GridContainer>
              <GridItem xs={9} sm={9} md={9} lg={9}>
                <Card style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                  <GridContainer>
                    <GridItem  xs={1} sm={1} md={1} lg={1}></GridItem>
                    <GridItem  xs={10} sm={10} md={10} lg={10}>
                      {currentStep === 0 && (products && products.length == 0 ? (
                        <NoProduct />
                      ) : (
                        products.map((value, index) => {
                          return (
                            <ProductList
                              count={value.count}
                              handleTotalChange={handleTotalChange}
                              id={value._id}
                              key={value._id}
                              product={value.product}
                              handleDeleteProduct={handleDeleteProduct}
                              index={index}
                            />
                          );
                        })
                      ))}

                      {currentStep === 1 && <GridContainer direction="row">
                        <GridItem  xs={3} sm={3} md={3} lg={3}></GridItem>
                        <GridItem  xs={6} sm={6} md={6} lg={6}>
                          <TextField
                            className={classes.outlinedStyle}
                            onChange={handleEmailChange}
                            placeholder="Email"
                            fullWidth
                            variant="outlined"
                            InputProps={{
                              style: {
                                // Control font or other styles here
                                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                                fontSize: "14px",
                                marginTop: "30px",
                                "::placeholder": {
                                  display: "none",
                                },
                              },
                            }}
                          />
                          <PhoneInput
                            isValid={(value, country) => {
                              if (value.match(/12345/)) {
                                return "Invalid value: " + value + ", " + country.name;
                              } else if (value.match(/1234/)) {
                                return false;
                              } else {
                                return true;
                              }
                            }}
                            style={{ marginTop: "30px" }}
                            country={"us"}
                            value={phone}
                            onChange={(phone, data) => {
                              setPhone(phone);
                            }}
                            inputStyle={{ width: "100%" }}
                            placeholder="Phone"
                            inputProps={{
                              type: "",
                              endAdornment: (
                                <PhoneIcon className={classes.inputIconsColor} />
                              ),
                              autoComplete: "off",
                            }}
                          />
                          <Datetime
                            inputProps={{
                              placeholder: "Shipping Date",
                              style: {
                                width: "100%",
                                padding: "9px", // Adjust padding as needed
                                borderTop: "1px solid #ced4da", // Border color for top
                                borderLeft: "1px solid #ced4da", // Border color for left
                                borderRight: "1px solid #ced4da", // Border color for right
                                borderBottom: "none", // Omit bottom border
                                borderRadius: "4px", // Border radius
                                outline: "none",
                                fontSize: "16px", // Font size
                                marginTop: "30px",
                                color: "#333",
                                "::placeholder": {
                                  color: "rgba(255, 0, 0, 1)", // Color and transparency of the placeholder
                                },
                                placeholderStyle: {
                                  color: "rgba(255, 0, 0, 0.5)", // Color and transparency of the placeholder
                                },
                              },
                            }}
                            value={date}
                            dateFormat={"YYYY-MM-DD"}
                            timeFormat={false}
                            onChange={handleDateChange}
                            renderInput={renderInput}
                          />
                          <AutocompleteInput
                            handleAddressContainerChange={handleAddressContainerChange}
                            noPadding={classes.noPadding}
                            smallFont={classes.smallFont}
                            outlinedStyle={classes.outlinedStyle}
                          />
                        </GridItem>
                      </GridContainer>}

                      {currentStep === 2 && ((Object.keys(shipment).length !== 0 && disabled ===false) ?
                      <ShipRates id={shipment.order_id} refreshTotal={refreshTotal}  /> : (
                        <GridContainer>
                          <GridItem style={{paddingTop: '50px', paddingBottom: '50px', }}>
                            <NotValid />
                          </GridItem>
                        </GridContainer>
                      ))}

                      {currentStep === 3 &&
                      <GridContainer>
                        <GridItem>
                          {clientSecret && (
                            <Elements
                              stripe={stripePromise}
                              options={{ clientSecret: clientSecret }}
                            >
                              <PayComponent
                                handlePay={handlePay}
                                email={email}
                                phone={phone}
                                date={date}
                                location={addressContainer}
                              />
                            </Elements>
                          )}
                        </GridItem>
                      </GridContainer>}
                    </GridItem>
                    <GridItem  xs={3} sm={3} md={3} lg={3}></GridItem>
                  </GridContainer>
                </Card>
              </GridItem>
              <GridItem xs={3} sm={3} md={3} lg={3}>
                <Card className={classes.cardPaddingNoTop} style={{minHeight: '233px'}}>
                  {(products && products.length === 0 && currentStep === 0) ?
                  <div></div>
                  : <VerticalLinearStepper handleCurrentStepChange={handleCurrentStepChange} handleCheckDetails={handleCheckDetails} disabled={disabled} handleDisabledChange={handleDisabledChange} />}
                  <GridContainer justify="center">
                    <h3 className={classes.title} style={{ color: "#2E3192" }}>
                      Total :
                    </h3>
                    <h3 className={classes.title} style={{ color: "#2E3192" }}>
                      &nbsp;${total}
                    </h3>
                  </GridContainer>
                  
                </Card>
              </GridItem>
            </GridContainer>
            {/* Membership */}

            {/* Footer */}

            <GridContainer
              justify="space-between"
              style={{ marginTop: "100px" }}
            >
              <GridItem sm={6}>
                <img src="/img/CoDS_Black_Logo.png"></img>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipising elit aliquam
                </p>
                <GridContainer
                  style={{ color: "#2E3192", width: "50%" }}
                  justify="space-between"
                >
                  <GridItem>
                    <IconButton color="primary">
                      <TwitterIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <InstagramIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <FacebookIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <YouTubeIcon />
                    </IconButton>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem sm={2}>
                <h4 className={classes.title} style={{ color: "#170F49" }}>
                  Product
                </h4>
                <p>
                  <Link href="/">Features</Link>
                </p>
                <p>
                  <Link href="/">Pricing</Link>
                </p>
                <p>
                  <Link href="/">Case studies</Link>
                </p>
                <p>
                  <Link href="/">Reviews</Link>
                </p>
                <p>
                  <Link href="/">Updates</Link>
                </p>
              </GridItem>
              <GridItem sm={2}>
                <h4 className={classes.title} style={{ color: "#170F49" }}>
                  Company
                </h4>
                <p>
                  <Link href="/">About</Link>
                </p>
                <p>
                  <Link href="/">Contact Us</Link>
                </p>
                <p>
                  <Link href="/">Careers</Link>
                </p>
                <p>
                  <Link href="/">Culture</Link>
                </p>
                <p>
                  <Link href="/">Blog</Link>
                </p>
              </GridItem>

              <GridItem sm={2}>
                <h4 className={classes.title} style={{ color: "#170F49" }}>
                  Support
                </h4>
                <p>
                  <Link href="/">Getting Started</Link>
                </p>
                <p>
                  <Link href="/">Helper center</Link>
                </p>
                <p>
                  <Link href="/">Server status</Link>
                </p>
                <p>
                  <Link href="/">Report a bug</Link>
                </p>
                <p>
                  <Link href="/">Chat support</Link>
                </p>
              </GridItem>
            </GridContainer>

            {/* Footer */}
            {/* </div> */}
          </Container>
        </div>
      </div>
      <Grid container>
        <Grid item xs={4} style={{ display: "flex", justifyContent: "center" }}>
          <Typography>Copyright © 2023 CODS</Typography>
        </Grid>
        <Grid item xs={7}>
          <p style={{ float: "right" }}>
            <Link href="/">All Rights Reserved</Link> |{" "}
            <Link href="/">Terms Condition</Link> |{" "}
            <Link href="/">Privacy Policy</Link>
          </p>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}
