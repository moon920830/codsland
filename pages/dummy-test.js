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
// core components
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import MUIButton from '@material-ui/core/Button';
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
import actions from '../redux/actions';
import axios from 'axios';
import { BACKEND_URL } from "../AppConfigs";
//other
import { useSnackbar } from "notistack";
import { formatDistanceToNow } from 'date-fns';
//rsuite
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
//style
import modalStyle from "../styles/jss/nextjs-material-kit/modalStyle.js";
import styles from "/styles/jss/nextjs-material-kit/pages/components.js";

import { ButtonBase, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

import Close from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => {
  return {
    ...styles,
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

export default function HomeFeed(props) {
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
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
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
      <iframe src="https://slotslaunch.com/iframe/17700?token=Y4oSrR4AdMmBKJaxQbE7Pb12hIKgnkS4WayCaYhcq9H4VlCbAg" width="100%" height="600px"></iframe>
    </div>
  );
}
