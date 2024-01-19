import React, { useState, useEffect, useRef } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Rating from '@material-ui/lab/Rating';
// @material-ui/icons
import NavigationIcon from '@material-ui/icons/Navigation';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import AddIcon from '@material-ui/icons/Add';
import BlockIcon from '@material-ui/icons/Block';

// import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// import LastPageIcon from '@mui/icons-material/LastPage';
import LastPageIcon from '@material-ui/icons/LastPage';
// core components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import MUIButton from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';
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
import ProductCard from "../pages/products/productCard.js";
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
import actions from '../redux/actions';
import axios from 'axios';
import { BACKEND_URL } from "../AppConfigs";
//other
import { useSnackbar } from "notistack";
import { formatDistanceToNow } from 'date-fns';
//rsuite
import { Calendar, Whisper, Popover } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
//style
import modalStyle from "../styles/jss/nextjs-material-kit/modalStyle.js";
import styles from "/styles/jss/nextjs-material-kit/pages/components.js";
import basicStyles from "/styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";

import { ButtonBase, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

import Close from "@material-ui/icons/Close";
import CustomPaginationActionsTable from "./products/CustomPaginationActionsTable.js";

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
    minHeightForCard: {
      minHeight: '80vh'
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

export default function Products(props) {
  //snackbar
  const snackbar = useSnackbar();
  //redux
  const dispatch = useDispatch();
  const redux_token = useSelector((state) => state.authentication.token);
  //other
  const classes = useStyles();
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const { ...rest } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedEnabled, setSelectedEnabled] = React.useState("All");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [createPostModal, setCreatePostModal] = React.useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [postPrice, setPostPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [postFile, setPostFile] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);


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


  //component mount
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/shop/categories`, {}) //, {headers: {token:redux_token}}
      .then((response) => {
        //error handler
        if (response.data.status == "error") {
          const {
            error
          } = response.data;
          dispatch(actions.createError(error));
          snackbar.enqueueSnackbar(
            response.data.error ? response.data.error : "Error",
            { variant: "error" }
          );
        } else {
          setCategories(response.data.data);
        }
      });
    axios
      .get(`${BACKEND_URL}/shop/cart/count`, {headers: {token:redux_token}}) //, {headers: {token:redux_token}}
      .then((response) => {
        //error handler
        if (response.data.status == "error") {
          const {
            error
          } = response.data;
          dispatch(actions.createError(error));
          snackbar.enqueueSnackbar(
            response.data.error ? response.data.error : "Error",
            { variant: "error" }
          );
        }
        else {
          setCartCount(response.data.data);
        }
      });
    axios
      .post(`${BACKEND_URL}/shop/products/page`, {
        page: page,
        pagesize: rowsPerPage
      }) //, {headers: {token:redux_token}}
      .then((response) => {
        //error handler
        if (response.data.status == "error") {
          const {
            error
          } = response.data;
          dispatch(actions.createError(error));
          snackbar.enqueueSnackbar(
            response.data.error ? response.data.error : "Error",
            { variant: "error" }
          );
        }
        else {
          setProducts(response.data.data.pagedata);
          setTotalCount(response.data.data && response.data.data.totalNumbers);
          console.log(response.data.data.pagedata);
        }
      });
  }, []);

  function handleAddToCart(product) {
    axios
      .post(`${BACKEND_URL}/shop/cart`, {
        product:product
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


        axios
          .get(`${BACKEND_URL}/shop/cart/count`, {headers: {token:redux_token}}) //, {headers: {token:redux_token}}
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
            setCartCount(response.data.data);
          });
      });
  }

  const handleDisplayAll = () => {
    setPage(0);
    setRowsPerPage(6);
    axios
      .post(`${BACKEND_URL}/shop/products/page`, {
        page:0,
        pagesize:6
      }) //, {headers: {token:redux_token}}
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
        setProducts(response.data.data.pagedata);
        setTotalCount(response.data.data && response.data.data.totalNumbers);
      });
    setSelectedEnabled("All");
  }

  const handleDisplayByCategory = (id, title) => {
    setPage(0);
    setRowsPerPage(6);
    axios
      .post(`${BACKEND_URL}/shop/categories/${id}/products/page`, {
        page:0,
        pagesize:6
      }) //, {headers: {token:redux_token}}
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
        setProducts(response.data.data.pagedata);
        setTotalCount(response.data.data && response.data.data.totalNumbers);
      });
    setSelectedEnabled(title);
  }
  
  const handleUpload = (e) => {
    imageInputRef.current.click();
  }

  const handleImageChange = (e) => {
    if (e.target.files) {
      setPostFile(e.target.files[0]);
    }
  }

  const handleProductUpload = () => {
    const formData = new FormData();
    if(postFile != null)
      formData.append('image', postFile);
    formData.append('title', postTitle);
    formData.append('description', postDescription);
    formData.append('category', postCategory);
    formData.append('price', postPrice);
    const config = {
      headers: {
        'content-type' : 'multipart/form-data',
        // 'token' : redux_token
      },
    };
    axios
      .post(`${BACKEND_URL}/shop/products`, formData, config)
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
        snackbar.enqueueSnackbar("Success", { variant: "success" });
        setCreatePostModal(false);
      });
  }

  const handlePageChange = (new_page) => {
    setPage(new_page);

    axios
      .post(`${BACKEND_URL}/shop/products/page`, {
        page: new_page,
        pagesize: rowsPerPage
      }) //, {headers: {token:redux_token}}
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
        setProducts(response.data.data.pagedata);
      });
  }

  const handleRowsPerPageChange = (new_rows_per_page) => {
    setRowsPerPage(new_rows_per_page);

    axios
      .post(`${BACKEND_URL}/shop/products/page`, {
        page: page,
        pagesize: new_rows_per_page
      }) //, {headers: {token:redux_token}}
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
        setProducts(response.data.data.pagedata);
      });
  }
 

  return (
    <div>
      <ElevateAppBar />
      <div className={classNames(classes.mainRaised, classes.greyBackground)}>
        <div className={classes.sections}>
          <Container maxWidth={false} style={{ maxWidth: "80%", paddingTop: "30px" }} >
            <GridContainer>
              {(categories && categories.length==0) ?
              (
                <GridItem md={3} lg={3} xl={3} className={classes.minHeightForCard}>
                  <GridContainer style={{height: '100%'}} justify="center" alignItems="center" direction="column">
                      <div style={{backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", width: "120px", height: "120px"}}>
                        <BlockIcon style={{width: "40%", height: "40%", color: "white"}} />
                      </div>
                      <h3 style={{textAlign: "center"}}>No categories to display</h3>
                  </GridContainer>
                </GridItem>
              )
              :
              (
                <GridItem xs={3} sm={3} md={3} lg={3} >
                  <Card className={classes.minHeightForCard}>
                    <GridContainer direction="column" style={{paddingLeft: '15px'}}>
                      <GridItem>
                        <FormControlLabel
                          control={
                            <Radio
                              checked={selectedEnabled === "All"}
                              onChange={() => handleDisplayAll()}
                              value="All"
                              name="radio button enabled"
                              aria-label="B"
                              icon={
                                <FiberManualRecord className={classes.radioUnchecked} />
                              }
                              checkedIcon={
                                <FiberManualRecord className={classes.radioChecked} />
                              }
                              classes={{
                                checked: classes.radio,
                                root: classes.radioRoot
                              }}
                            />
                          }
                          classes={{
                            label: classes.label,
                            root: classes.labelRoot
                          }}
                          label="All"
                        />
                      </GridItem>
                      {categories.map((value) => (
                        <GridItem key={value._id}>
                          <FormControlLabel
                            control={
                              <Radio
                                checked={selectedEnabled === value.title}
                                onChange={() => handleDisplayByCategory(value._id, value.title)}
                                value={value.title}
                                name="radio button enabled"
                                aria-label="B"
                                icon={
                                  <FiberManualRecord className={classes.radioUnchecked} />
                                }
                                checkedIcon={
                                  <FiberManualRecord className={classes.radioChecked} />
                                }
                                classes={{
                                  checked: classes.radio,
                                  root: classes.radioRoot
                                }}
                              />
                            }
                            classes={{
                              label: classes.label,
                              root: classes.labelRoot
                            }}
                            label={value.title}
                          />
                        </GridItem>
                      ))}
                    </GridContainer>
                  </Card>
                </GridItem>
              )
              }
              
              {(products && products.length==0) ? (
                <GridItem md={9} lg={9} xl={9} className={classes.minHeightForCard}>
                  <GridContainer style={{height: '100%'}} justify="center" alignItems="center" direction="column">
                      <div style={{backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", width: "120px", height: "120px"}}>
                        <BlockIcon style={{width: "40%", height: "40%", color: "white"}} />
                      </div>
                      <h3 style={{textAlign: "center"}}>No products to display</h3>
                  </GridContainer>
                </GridItem>
              ) : (
                <GridItem xs={9} sm={9} md={9} lg={9}>
                  <Card className={classes.cardPaddingNoTop + " " + classes.minHeightForCard}>
                    <GridContainer>
                      {products.map((value) => (
                        <ProductCard key={value._id} title={value.title} value={value} description={value.description} price={value.price} category={value.category} id={value._id} handleAddToCart={handleAddToCart} image={value.image} />
                      ))}
                    </GridContainer>
                    <CustomPaginationActionsTable handleRowsPerPageChangeFromParent={handleRowsPerPageChange} handlePageChangeFromParent={handlePageChange} row_length={totalCount} />
                  </Card>
                </GridItem>
              )}
            </GridContainer>
            {/* Membership */}
            <Link href="/products/order">
              <Fab color="primary" aria-label="add"  style={{position: 'fixed', bottom : 180, right : 60}}>
                <NavigationIcon />
              </Fab>
            </Link>
            <Fab color="secondary" aria-label="add"  style={{position: 'fixed', bottom : 100, right : 60}}>
                <AddIcon onClick={() => {setCreatePostModal(true)}} />
            </Fab>
            <Badge badgeContent={cartCount} color="secondary" style={{position: 'fixed', bottom : 20, right : 60}}>
              <Link href="/products/cart">
                <Fab color="primary" aria-label="add">
                    <ShoppingCartOutlinedIcon />
                    {/* onClick={() => {setCreatePostModal(true)}} */}
                </Fab>
              </Link>
            </Badge>


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
          <h4 className={classNames(classes.modalTitle, classes.title, classes.textCenter)}>Create Product</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <Divider />
          <GridContainer direction="column">
            <GridItem>
              <CustomInput
                labelText="Title"
                id="title"
                onChange={e => {setPostTitle(e.target.value)}}
                formControlProps={{
                  fullWidth: true
                }}
              />
              <CustomInput
                labelText="Price"
                id="price"
                onChange={e => {setPostPrice(e.target.value)}}
                formControlProps={{
                  fullWidth: true
                }}
              />
              <TextField
                id="standard-multiline-static"
                label=""
                multiline
                rows={6}
                placeholder="Description"
                className={classes.enterReason}
                fullWidth
                inputRef={refContentText}
                onChange={e => {setPostDescription(e.target.value)}}
              />
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Select Category</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={postCategory}
                  fullWidth
                  onChange={(e) => {setPostCategory(e.target.value)}}
                >
                  {Array.isArray(categories) && categories.map((item, index) => (
                    <MenuItem key={item._id} value={item._id}><p style={{fontSize: '16px'}}>{item.title}</p></MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div onClick={handleUpload} style={{width: '100%', height: '228px', backgroundColor:'#F3F3F3', borderRadius: '16px', marginTop: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', cursor: 'pointer'}}>
                {postFile == null && <WallpaperOutlinedIcon />}
                {postFile == null && <p>Upload Image</p>}

                
                {postFile && 
                <img src={URL.createObjectURL(postFile)} style={{width: "100%", height: "100%"}} />
                }
              </div>
              <input type="file" ref={imageInputRef} onChange={handleImageChange} accept="image/*" hidden />
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button round color="primary" onClick={() => {handleProductUpload()}} fullWidth>
            Post
          </Button>
        </DialogActions>
      </Dialog>
      <input type="file" ref={refContentUpload} hidden />
      <input type="file" hidden />
      {/* end of create post dialog */}
    </div>
  );
}
