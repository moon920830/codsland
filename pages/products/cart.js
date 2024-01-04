import React, { useState, useEffect, useRef } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Rating from '@material-ui/lab/Rating';
// @material-ui/icons
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
import { useSnackbar } from "notistack";
import { formatDistanceToNow } from 'date-fns';
import ProductList from "./productList.js";
//rsuite
import { Calendar, Whisper, Popover } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
//style
import modalStyle from "../../styles/jss/nextjs-material-kit/modalStyle.js";
import styles from "/styles/jss/nextjs-material-kit/pages/components.js";
import basicStyles from "/styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";

import { ButtonBase, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

import Close from "@material-ui/icons/Close";

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
  const redux_email = useSelector((state) => state.authentication.email);
  const redux_fullname = useSelector((state) => state.authentication.fullname);
  //other
  const classes = useStyles();
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const { ...rest } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedEnabled, setSelectedEnabled] = React.useState("");
  const [selectTimeModal, setSelectTimeModal] = React.useState(false);
  const [enterDetailsModal, setEnterDetailsModal] = React.useState(false);
  const [reportPostModal, setReportPostModal] = React.useState(false);
  const [createPostModal, setCreatePostModal] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState(Date());
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [postFile, setPostFile] = useState(null);
  const [uploadEnabled, setUploadEnabled] = useState(0);
  const [categories, setCategories] = useState({});
  const [posts, setPosts] = useState({});


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

  const handleUpload = (e) => {
    if(postFile != null)
    {
      setPostFile(null);
      return ;
    }
    if(uploadEnabled === 1)
      imageInputRef.current.click();
    if(uploadEnabled === 2)
      videoInputRef.current.click();
  }
  
  const handleImageChange = (e) => {
    if (e.target.files) {
      setPostFile(e.target.files[0]);
    }
  }

  const handleVideoChange = (e) => {
    if (e.target.files) {
      setPostFile(e.target.files[0]);
    }
  }

  const saveContent=()=>{
    const formData = new FormData();
    if(postFile != null)
      formData.append('upload', postFile);
    formData.append('title', postTitle);
    formData.append('description', postDescription);
    if(uploadEnabled === 0 || postFile == null)
      formData.append('type', 'none');
    else if(uploadEnabled === 1)
      formData.append('type', 'image');
    else if(uploadEnabled === 2)
      formData.append('type', 'video');
    formData.append('content', '');
    formData.append('category', postCategory);
    const config = {
      headers: {
        'content-type' : 'multipart/form-data',
        'token' : redux_token
      },
    };
    axios
      .post(`${BACKEND_URL}/shared-contents/save`, formData, config)
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

  //component mount
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/shared-contents/categories`, {}, {headers: {token:redux_token}})
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
        setCategories(response.data.data);
      });

    axios
      .get(`${BACKEND_URL}/shared-contents/all`, {}, {headers: {token:redux_token}})
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
        // console.log(response.data.data);
        setPosts(response.data.data);
      });
  }, []);

  return (
    <div>
      <ElevateAppBar />
      <div className={classNames(classes.mainRaised, classes.greyBackground)}>
        <div className={classes.sections}>
          <Container maxWidth={false} style={{ maxWidth: "80%", paddingTop: "30px" }} >
            <GridContainer>
              <GridItem xs={9} sm={9} md={9} lg={9} >
                <Card style={{paddingTop: '10px',paddingBottom: '10px',}}>
                  <ProductList price={25} />
                  <ProductList price={25} />
                </Card>
              </GridItem>
              <GridItem xs={3} sm={3} md={3} lg={3}>
                <Card className={classes.cardPaddingNoTop}>
                  <GridContainer justify="center" alignItems="center">
                    <Button round color="primary">
                      Checkout
                    </Button>
                  </GridContainer>
                </Card>
              </GridItem>
            </GridContainer>
            {/* Membership */}
            <Badge badgeContent={4} color="secondary" style={{position: 'fixed', bottom : 20, right : 60}}>
              <Fab color="primary" aria-label="add">
                  <ShoppingCartOutlinedIcon />    
              </Fab>
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


      {/* start of report dialog */}
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={reportPostModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setReportPostModal(false)}
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
            onClick={() => setReportPostModal(false)}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h4 className={classNames(classes.modalTitle, classes.title, classes.textCenter)}>Report This Post</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <Divider />
          <GridContainer direction="row">
            <GridItem>
              <TextField
                id="standard-multiline-static"
                label=""
                multiline
                rows={8}
                placeholder="Enter reason Here"
                variant="filled"
                className={classes.enterReason}
                fullWidth
              />
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Grid>
              <Grid item>
                <Button round color="primary" onClick={() => {setReportPostModal(false)}}>
                  Post
                </Button>
              </Grid>
            </Grid>
        </DialogActions>
      </Dialog>
      {/* end of report dialog */}
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
          <h4 className={classNames(classes.modalTitle, classes.title, classes.textCenter)}>Create Post</h4>
        </DialogTitle>
        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <Divider />
          <GridContainer direction="column">
            <GridItem>
              <CustomInput
                labelText="Post Title"
                id="title"
                type="postTitle"
                onChange={e => {setPostTitle(e.target.value)}}
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
              {uploadEnabled !== 0 ? 
              <div onClick={handleUpload} style={{width: '100%', height: '228px', backgroundColor:'#F3F3F3', borderRadius: '16px', marginTop: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', cursor: 'pointer'}}>
                {postFile == null && <WallpaperOutlinedIcon />}
                {postFile == null && <p>Upload {uploadEnabled===1?'Photo':'Video'}</p>}

                
                {uploadEnabled === 1 && postFile && 
                <img src={URL.createObjectURL(postFile)} style={{width: "100%", height: "100%"}} />
                }
                {uploadEnabled === 2 && postFile && 
                <video controls width="100%" height="100%">
                  <source
                    src={URL.createObjectURL(postFile)}
                    // type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                }
              </div> : null }
              <input type="file" ref={imageInputRef} onChange={handleImageChange} accept="image/*" hidden />
              <input type="file" ref={videoInputRef} onChange={handleVideoChange} accept="video/*" hidden />
            </GridItem>
            <GridItem style={{marginTop: "12px"}}>
              <GridContainer>
                <GridItem sm={11}></GridItem>
                <GridItem sm={1}>
                  <SentimentSatisfiedOutlinedIcon />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
            <GridContainer direction="row" alignItems="center" style={{width:"100%",borderRadius: "26px", border: "1px solid #9A9A9A", marginLeft: "0px", marginRight: "0px", paddingTop: "16px", paddingBottom: "16px", marginTop: "24px"}}>
              <GridItem sm={3}>
                <p style={{fontSize: "16px"}}>Add To Post</p>
              </GridItem>
              <GridItem sm={5}>
              </GridItem>
              <GridItem sm={4}>
                <GridContainer spacing={1} direction="row">
                  <GridItem sm={2} onClick={() => {uploadEnabled!==1?(setUploadEnabled(1), setPostFile(null)):setUploadEnabled(0)}} style={{cursor: 'pointer'}}>
                    <WallpaperOutlinedIcon />
                  </GridItem>
                  <GridItem sm={4}>
                    <h5>Image</h5>
                  </GridItem>
                  <GridItem sm={2} onClick={() => {uploadEnabled!==2?(setUploadEnabled(2), setPostFile(null)):setUploadEnabled(0)}} style={{cursor: 'pointer'}}>
                    <VideocamOutlinedIcon />
                  </GridItem>
                  <GridItem sm={4}>
                    <h5>Video</h5>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
        </DialogContent>
        <DialogActions className={classes.modalFooter}>
          <Button round color="primary" onClick={() => {saveContent()}} fullWidth>
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
