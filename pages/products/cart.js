import React, { useState, useEffect, useRef } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Rating from '@material-ui/lab/Rating';
// @material-ui/icons
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
// core components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import MUIButton from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';
import { ButtonBase, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
// components
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import CustomDropdown from "/components/CustomDropdown/CustomDropdown.js";
import Parallax from "/components/Parallax/Parallax.js";
import Info from "/components/Typography/Info.js";
// sections for this page
import SectionBasics from "/pages-sections/Components-Sections/SectionBasics.js";
import SectionNavbars from "/pages-sections/Components-Sections/SectionNavbars.js";
import SectionTabs from "/pages-sections/Components-Sections/SectionTabs.js";
import SectionPills from "/pages-sections/Components-Sections/SectionPills.js";
import SectionNotifications from "/pages-sections/Components-Sections/SectionNotifications.js";
import SectionTypography from "/pages-sections/Components-Sections/SectionTypography.js";
import SectionJavascript from "/pages-sections/Components-Sections/SectionJavascript.js";
import SectionCarousel from "/pages-sections/Components-Sections/SectionCarousel.js";
import SectionCompletedExamples from "/pages-sections/Components-Sections/SectionCompletedExamples.js";
import SectionLogin from "/pages-sections/Components-Sections/SectionLogin.js";
import SectionExamples from "/pages-sections/Components-Sections/SectionExamples.js";
import SectionDownload from "/pages-sections/Components-Sections/SectionDownload.js";
import Carousel from "react-slick";
import LocationOn from "@material-ui/icons/LocationOn";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import Slider from "react-slick";
import NavPills from "/components/NavPills/NavPills.js";
import ElevateAppBar from "/components/General/layouts/NavBar.js";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import RoomIcon from '@material-ui/icons/Room';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import CustomInput from "/components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Radio from "@material-ui/core/Radio";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Avatar from '@material-ui/core/Avatar';
//redux
import { useSelector, useDispatch } from "react-redux";
import actions from '../../redux/actions';
import axios from 'axios';
import { BACKEND_URL } from "../../AppConfigs";
//other
import Datetime from "react-datetime";
import { useSnackbar } from "notistack";
import { formatDistanceToNow } from 'date-fns';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PayComponent from './PayComponent.js';
import ProductList from "./productList.js";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
//rsuite
import { Calendar, Whisper, Popover } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
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

const stripePromise = loadStripe('pk_test_51OVOQtFhFnxnoDMRquya5UT74vYR3BcJFVk79wFhtcXg3hgvyM44n9papYedTEXyoIqqYZWFKBGkfxTampbb7sG400RmgjkKoR');

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
  }
});

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "100%",// Adjust the position as needed
        transform: "translateY(-50%)",
        cursor: "pointer",
        zIndex: "0",
        opacity: "1"
      }}
      onClick={onClick}
    >
      <ArrowForwardIcon></ArrowForwardIcon>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "100%",// Adjust the position as needed
        transform: "translateY(-50%)",
        cursor: "pointer",
        zIndex: "1",
        left: "80%"
      }}
      onClick={onClick}
    >
      <ArrowBackIcon></ArrowBackIcon>
    </div>
  );
}

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
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const { ...rest } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [createPostModal, setCreatePostModal] = React.useState(false);
  const [clientSecret, setClientSecret]=useState(null);



  const refContentText=React.useRef(null);
  const refContentUpload=React.useRef(null);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: dots => (
      <div
        style={{
          position: "absolute",
          top: "100%",
          width: "50%",
          left: "0",
          textAlign: "left",

        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div
        style={{
          width: i === currentSlide ? "20px" : "20px",
          height: i === currentSlide ? "20px" : "20px",
          border: "1px solid black",
          borderRadius: '100%',
          borderColor:"#2E3192",
          backgroundColor: i === currentSlide ? '#2E3192' : 'white',
          padding: "5px"
        }}
      >
      </div>
    ),
    afterChange: (current) => setCurrentSlide(current),
  };
  const testimonial_settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    dots: true,
    autoplay: true,
  };

  const renderInput = (props, openCalendar, closeCalendar) => (
    <div className="input-container">
      <input {...props} />
      {/* <CalendarTodayIcon className="calendar-icon" onClick={openCalendar} /> */}
    </div>
  );

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleLocationClick = (new_location) => {
    setLocation(new_location);
    setSuggestions([]);
  }

  const handleLocationChange = async (input) => {
    setLocation(input);

    // Fetch suggestions from your geocoding service
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${input}`
    );

    if (response.ok) {
      const data = await response.json();
      setSuggestions(data);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e._d;
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // Adding 1 because months are zero-indexed
    const day = selectedDate.getDate();
    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
    console.log(formattedDate);
    setDate(formattedDate);
  };

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
        console.log(response.data.data);
        const total = response.data.data.reduce((sum, value) => {
          if(value.product && value.product.price)
            return sum + value.product.price*value.count;
        }, 0)
        setTotal(total);
      });

    
    axios.get(`${BACKEND_URL}/test/payment-intent`)
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

  const handlePurchase = (result) => {
    setCreatePostModal(false);
    axios
      .post(`${BACKEND_URL}/shop/orders/save`, {
        result,
        email,
        phone,
        date,
        location
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
        // snackbar.enqueueSnackbar("Purchase Success", { variant: "success" });
      });
  }

  return (
    <div>
      <ElevateAppBar />
      <div className={classNames(classes.mainRaised, classes.greyBackground)}>
        <div className={classes.sections}>
          <Container maxWidth={false} style={{ maxWidth: "80%", paddingTop: "30px" }} >
            <GridContainer direction="row" alignItems="center" style={{paddingLeft: '15px'}}>
              <KeyboardBackspaceOutlinedIcon  onClick={() => {Router.push("/products")}} className={classes.cursor} />
              <h5 onClick={() => {Router.push("/products")}} className={classes.cursor} >&nbsp;Back</h5>
            </GridContainer>
            <GridContainer>
              <GridItem xs={9} sm={9} md={9} lg={9} >
                <Card style={{paddingTop: '10px',paddingBottom: '10px',}}>
                  {products.map((value, index) => {
                    return (<ProductList count={value.count} handleTotalChange={handleTotalChange} id={value._id} key={value._id} product={value.product} handleDeleteProduct={handleDeleteProduct} index={index} />)
                  })}
                </Card>
              </GridItem>
              <GridItem xs={3} sm={3} md={3} lg={3}>
                <Card className={classes.cardPaddingNoTop}>
                  <GridContainer justify="center">
                      <h3 className={classes.title} style={{ color: "#2E3192" }}>Total :</h3>
                      <h3 className={classes.title} style={{ color: "#2E3192" }}>&nbsp;${total}</h3>
                  </GridContainer>
                  <GridContainer justify="center" alignItems="center">
                    <Button round color="primary" onClick={() => {setCreatePostModal(true)}}>
                      Purchase
                    </Button>
                  </GridContainer>
                </Card>
              </GridItem>
            </GridContainer>
            {/* Membership */}

            {/* Footer */}

            <GridContainer justify="space-between" style={{ marginTop: "100px" }}>
              <GridItem sm={6}>
                <img src="/img/CoDS_Black_Logo.png"></img>
                <p>Lorem ipsum dolor sit amet consectetur adipising elit aliquam</p>
                <GridContainer style={{ color: "#2E3192", width: "50%" }} justify="space-between">
                  <GridItem>
                    <IconButton color="primary" ><TwitterIcon /></IconButton>
                    <IconButton color="primary" ><InstagramIcon /></IconButton>
                    <IconButton color="primary" ><FacebookIcon /></IconButton>
                    <IconButton color="primary" ><LinkedInIcon /></IconButton>
                    <IconButton color="primary" ><YouTubeIcon /></IconButton>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem sm={2}>
                <h4 className={classes.title} style={{ color: "#170F49" }}>Product</h4>
                <p><Link href="/" >Features</Link></p>
                <p><Link href="/" >Pricing</Link></p>
                <p><Link href="/" >Case studies</Link></p>
                <p><Link href="/" >Reviews</Link></p>
                <p><Link href="/" >Updates</Link></p>
              </GridItem>
              <GridItem sm={2}>
                <h4 className={classes.title} style={{ color: "#170F49" }}>Company</h4>
                <p><Link href="/" >About</Link></p>
                <p><Link href="/" >Contact Us</Link></p>
                <p><Link href="/" >Careers</Link></p>
                <p><Link href="/" >Culture</Link></p>
                <p><Link href="/" >Blog</Link></p>
              </GridItem>

              <GridItem sm={2}>
                <h4 className={classes.title} style={{ color: "#170F49" }}>Support</h4>
                <p><Link href="/" >Getting Started</Link></p>
                <p><Link href="/" >Helper center</Link></p>
                <p><Link href="/" >Server status</Link></p>
                <p><Link href="/" >Report a bug</Link></p>
                <p><Link href="/" >Chat support</Link></p>
              </GridItem>
            </GridContainer>

            {/* Footer */}
            {/* </div> */}
          </Container>
        </div>
      </div>
      <Grid container  >
        <Grid item xs={4} style={{display:"flex",justifyContent:'center'}}>
          <Typography>Copyright © 2023 CODS</Typography>
        </Grid>
        <Grid item xs={7} >
          <p style={{float:"right"}} ><Link href="/" >All Rights Reserved</Link> | <Link href="/" >Terms Condition</Link> | <Link href="/" >Privacy Policy</Link></p>
        </Grid>
        <Grid item xs={1} ></Grid>
      </Grid>

      {/* start of create post dialog */}
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={createPostModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setCreatePostModal(false)}
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setCreatePostModal(false)}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h4 className={classNames(classes.modalTitle, classes.title, classes.textCenter)}>Enter details</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <Divider />
          <GridContainer direction="column">
            <GridItem>
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
                    fontSize: '14px',
                    marginTop: '30px',
                    '::placeholder' : {
                      display: 'none'
                    },
                  },
                }}
              />
              <PhoneInput
                isValid={(value, country) => {
                  if (value.match(/12345/)) {
                    return 'Invalid value: '+value+', '+country.name;
                  } else if (value.match(/1234/)) {
                    return false;
                  } else {
                    return true;
                  }
                }}
                style={{marginTop: '30px'}}
                country={'us'}
                value={phone}
                onChange={(phone, data) => {setPhone(phone);}}
                inputStyle={{width: '100%'}}
                placeholder="Phone"
                inputProps={{
                  type: "",
                  endAdornment: (
                    // <InputAdornment position="end">
                      <PhoneIcon className={classes.inputIconsColor} />
                    // </InputAdornment>
                  ),
                  autoComplete: "off"
                }}
              />
              <Datetime
                inputProps={{ placeholder: "Shipping Date", style: {
                  width: '100%',
                  padding: '9px', // Adjust padding as needed
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
                value={date}
                dateFormat={"YYYY-MM-DD"}
                timeFormat={false}
                onChange={handleDateChange}
                renderInput={renderInput}
                // style={{display: "flex"}}
              />
              <TextField
                className={classes.outlinedStyle}
                onChange={(e) => handleLocationChange(e.target.value)}
                placeholder="Address"
                fullWidth
                value={location}
                variant="outlined"
                InputProps={{
                  style: {
                    // Control font or other styles here
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    fontSize: '14px',
                    marginTop: '30px',
                    '::placeholder' : {
                      display: 'none'
                    },
                  },
                }}
              />
              <ul>
                {suggestions.map((suggestion) => (
                  <li key={suggestion.place_id} style={{cursor: 'pointer'}} onClick={() => handleLocationClick(suggestion.display_name)}>{suggestion.display_name}</li>
                ))}
              </ul>
              {clientSecret&&(
                
              <Elements stripe={stripePromise} options={{clientSecret:clientSecret}} >
                <PayComponent handlePurchase={handlePurchase} email={email} phone={phone} date={date} location={location} />
              </Elements>
              )}
            </GridItem>
          </GridContainer>
        </DialogContent>
        {/* <DialogActions className={classes.modalFooter}>
          <Button round color="primary" onClick={() => {handlePurchase()}} fullWidth>
            Purchase
          </Button>
        </DialogActions> */}
      </Dialog>
      {/* end of create post dialog */}
    </div>
  );
}
