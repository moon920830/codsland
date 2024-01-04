import React, { useState, useEffect, useRef } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Grid from '@material-ui/core/Grid';
import Button from "/components/CustomButtons/Button.js";
// sections for this page
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Card from "/components/Card/Card.js";
import ElevateAppBar from "/components/General/layouts/NavBar.js";
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import CustomInput from "/components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
//other
import Avatar from '@material-ui/core/Avatar';
import MUIButton from '@material-ui/core/Button';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
//redux
import { useSelector } from "react-redux";
//rsuite
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

import modalStyle from "../styles/jss/nextjs-material-kit/modalStyle.js";
import styles from "/styles/jss/nextjs-material-kit/pages/components.js";

import { Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Input, Typography } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import { BACKEND_URL } from "../AppConfigs";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

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

export default function MyProfile(props) {
  //other
  const classes = useStyles();
  const { ...rest } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
  const [selectTimeModal, setSelectTimeModal] = React.useState(false);
  const [enterDetailsModal, setEnterDetailsModal] = React.useState(false);
  const [successModal, setSuccessModal] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState(Date());
  const [categories, setCategories] = useState({});
  //redux
  const redux_email = useSelector((state) => state.authentication.email);
  const redux_fullname = useSelector((state) => state.authentication.fullname);
  const redux_token = useSelector((state) => state.authentication.token);
  const [posts, setPosts] = useState({});
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

  function handleSetAppointment(date) {

    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setSelectedDate(formattedDate);
    setSelectTimeModal(true);
  }

  function handleSelectTime() {
    setSelectTimeModal(false);
    setEnterDetailsModal(true);
  }

  function handleEnterDetails() {
    setEnterDetailsModal(false);
    setSuccessModal(true);
  }

  return (
    <div>
      <ElevateAppBar />
      <div className={classNames(classes.mainRaised)}>
        <div className={classes.sections}>
          <Container maxWidth={false} style={{ maxWidth: "80%", backgroundColor: "#F2F2F3"}} >

            <GridContainer style={{minHeight: "60vh"}}>
              {/* <h2 className={classes.title}>MyProfile</h2> */}
              <GridItem sm={12}>
                <Card className={classes.cardPadding} style={{ backgroundColor: "#170F49", height: "150px" }}>
                  <GridContainer justify="flex-end" style={{marginRight: '0px'}}>
                    
                    <Link href="/editprofile">
                      <div className={classes.cursor} style={{borderRadius: '26px', border: '1px solid rgba(242, 242, 243, 0.37)', background: 'rgba(242, 242, 243, 0.22)', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <SettingsIcon style={{color: 'white'}} />
                      </div>
                    </Link>
                  </GridContainer>
                </Card>
                <GridContainer style={{ marginTop: "-110px"}}>
                  <GridItem sm={2}>
                    <Avatar src={`${BACKEND_URL}/auth/avatars/${redux_email}`} style={{width: "150px", height: "150px", marginLeft: "20px"}}></Avatar>
                  </GridItem>
                  <GridItem sm={10}>
                    <GridContainer>
                      <h3 style={{fontWeight: "bold", color: "white", marginTop: "20px", marginLeft: "10px"}}>{redux_fullname}</h3>
                    </GridContainer>
                    <GridContainer justify="space-between" style={{marginTop: "30px", marginLeft: "10px", paddingRight: "30px"}}>
                      <Button round style= {{color: "black"}}>
                        About
                      </Button>
                      <Button round color="primary" style= {{color: "black"}}>
                        Post(20)
                      </Button>
                      <Button round style= {{color: "black"}}>
                        Videos(2)
                      </Button>
                      <Button round style= {{color: "black"}}>
                        Friends(100)
                      </Button>
                      <Button round style= {{color: "black"}}>
                        Following(150)
                      </Button>
                      <Button round style= {{color: "black"}}>
                        Followers(150)
                      </Button>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
                
                {Array.isArray(posts) && posts.map((post) => {
                  return (
                  <Card className={classes.cardPadding}>
                    <GridContainer direction="column" spacing={2}>
                      <GridItem>
                        <GridContainer alignItems="center">
                          <GridItem sm={1}>
                            <Avatar src={`${BACKEND_URL}/auth/avatars/${post.author.email}`} className={classes.logoAvatar} style={{width: "45px", height: "45px"}}  />
                          </GridItem>
                          <GridItem sm={4}>
                            <h5>Briansky Alex</h5>
                            <h6 className={classes.cardSubTitle}>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</h6>
                          </GridItem>
                          <GridItem sm={1}>
                          </GridItem>
                          <GridItem sm={3}>
                          </GridItem>
                          <GridItem sm={3} style={{display: 'flex', direction: 'row', justifyContent: 'center', alignItems: 'center'}}>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                      <GridItem>
                        <GridContainer>
                          <GridItem>
                            <h5>{post.description}</h5>
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                      {post.type !== 'none' && post.media !== undefined && <GridItem>
                        <GridContainer>
                          <GridItem>
                            {post.type === "image" &&
                            <img src={`${BACKEND_URL}/shared-contents/media/${post._id}`} style={{width: "100%", height: "100%"}} />
                            }
                            {post.type === "video" &&
                              <video controls width="100%" height="100%">
                              <source
                                src={`${BACKEND_URL}/shared-contents/media/${post._id}`}
                                // type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>}
                          </GridItem>
                        </GridContainer>
                      </GridItem>}
                      <GridItem>
                        <GridContainer alignItems="center">
                          <GridItem sm={1}>
                            <GridContainer alignItems="center">
                              <GridItem sm={3}>
                                <IconButton color="secondary" style={{padding: '0px'}}>
                                  <FavoriteOutlinedIcon />
                                </IconButton>
                              </GridItem>
                              <GridItem sm={9}>0</GridItem> 
                            </GridContainer>
                          </GridItem>
                          <GridItem sm={1}>
                            <GridContainer alignItems="center">
                              <GridItem sm={3}>
                                <IconButton style={{padding: '0px'}}>
                                  <SmsOutlinedIcon />
                                </IconButton>
                              </GridItem>
                              <GridItem sm={9}>0</GridItem> 
                            </GridContainer>
                          </GridItem>
                          <GridItem sm={1}>
                            <GridContainer alignItems="center">
                              <GridItem sm={3}>
                                <IconButton style={{padding: '0px'}}>
                                  <SendOutlinedIcon />
                                </IconButton>
                              </GridItem>
                              <GridItem sm={9}>0</GridItem> 
                            </GridContainer>
                          </GridItem>
                          <GridItem sm={5}></GridItem>
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  </Card>)
                })
                }
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
    </div>
  );
}
