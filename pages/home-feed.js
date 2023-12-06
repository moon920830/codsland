import React, { useState } from "react";
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
// core components
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
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
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Avatar from '@material-ui/core/Avatar';

import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

import modalStyle from "../styles/jss/nextjs-material-kit/modalStyle.js";
import styles from "/styles/jss/nextjs-material-kit/pages/components.js";

import { Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from "@material-ui/core";
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
    }
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

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
  const [selectTimeModal, setSelectTimeModal] = React.useState(false);
  const [enterDetailsModal, setEnterDetailsModal] = React.useState(false);
  const [successModal, setSuccessModal] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState(Date());
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

  return (
    <div>
      <ElevateAppBar />
      <div className={classNames(classes.mainRaised, classes.greyBackground)}>
        <div className={classes.sections}>
          <Container maxWidth={false} style={{ maxWidth: "80%", paddingTop: "30px" }} >
            <GridContainer>
              <GridItem xs={3} sm={3} md={3} lg={3} >
                <Card>
                  <GridContainer justify="center" style={{marginTop: "20px"}}>
                    <GridItem sm={4}>
                      <Avatar src='/img/avatar2.jpg' className={classes.logoAvatar} style={{width: "100%", height: "100%"}}  />
                    </GridItem>
                  </GridContainer>
                  <GridContainer justify="center">
                    <h4>Reinhard Van Zry</h4>
                  </GridContainer>
                  <GridContainer justify="center">
                    <h5>@Reinhard...</h5>
                  </GridContainer>
                  <GridContainer style={{marginTop: "10px"}}>
                    <GridItem sm={1}></GridItem>
                    <GridItem sm={10} style={{backgroundColor: "#F2F2F2", borderRadius: "17px"}}>
                      <GridContainer>
                        <GridItem sm={4}>
                          <h5 style={{textAlign: "center", marginTop: "10px"}}>250</h5>
                          <h6 style={{textAlign: "center", marginBottom: "10px"}}>Past</h6>
                        </GridItem>
                        <GridItem sm={4}>
                          <h5 style={{textAlign: "center", marginTop: "10px"}}>2022</h5>
                          <h6 style={{textAlign: "center", marginBottom: "10px"}}>Followers</h6>
                        </GridItem>
                        <GridItem sm={4}>
                          <h5 style={{textAlign: "center", marginTop: "10px"}}>590</h5>
                          <h6 style={{textAlign: "center", marginBottom: "10px"}}>Friends</h6>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                  <GridContainer style={{marginTop: "10px", marginBottom: "10px"}}>
                    <GridItem sm={1}></GridItem>
                    <GridItem sm={10}>
                      <GridContainer direction="column" spacing={2}>
                        <GridItem>
                          <Divider />
                        </GridItem>
                        <GridItem>
                          <Link href="/">
                            <h5>My Profile</h5>
                          </Link>
                        </GridItem>
                        <GridItem>
                          <Link href="/appointment">
                            <h5 className={classes.cursor}>Appointments</h5>
                          </Link>
                        </GridItem>
                        <GridItem>
                          <Link href="/">
                            <h5>Events</h5>
                          </Link>
                        </GridItem>
                        <GridItem>
                          <Link href="/">
                            <h5>Community Groups</h5>
                          </Link>
                        </GridItem>
                        <GridItem>
                          <Link href="/">
                            <h5>Find Friends</h5>
                          </Link>
                        </GridItem>
                        <GridItem>
                          <Divider />
                        </GridItem>
                        <GridItem>
                            <h5 style={{fontWeight: "bold"}}>Important links</h5>
                        </GridItem>
                        <GridItem>
                          <Link href="/">
                            <h5>Privacy Policy</h5>
                          </Link>
                        </GridItem>
                        <GridItem>
                          <Link href="/">
                            <h5>Terms & Condition</h5>
                          </Link>
                        </GridItem>
                        <GridItem>
                          <Link href="/">
                            <h5>Membership</h5>
                          </Link>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </Card>
              </GridItem>
              <GridItem xs={6} sm={6} md={6} lg={6}>
                <Card className={classes.cardPaddingNoTop}>
                  <GridContainer>
                    <GridItem sm={2}>
                      <Avatar src='/img/avatar2.jpg' className={classes.logoAvatar} style={{width: "45px", height: "45px", marginTop: "27px"}}  />
                    </GridItem>
                    <GridItem sm={10}>
                      <CustomInput
                        labelText="share something"
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <SentimentSatisfiedOutlinedIcon className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                          name: "email"
                        }}
                      />
                      <GridContainer alignItems="center">
                        <GridItem sm={6}>
                          <GridContainer spacing={1} direction="row">
                            <GridItem sm={2}>
                              <WallpaperOutlinedIcon />
                            </GridItem>
                            <GridItem sm={4}>
                              <h5>Image</h5>
                            </GridItem>
                            <GridItem sm={2}>
                              <VideocamOutlinedIcon />
                            </GridItem>
                            <GridItem sm={4}>
                              <h5>Video</h5>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                        <GridItem sm={3}>
                        </GridItem>
                        <GridItem sm={3}>
                          <Button round color="primary" size="md">
                            Post
                          </Button>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </Card>
                <GridContainer alignItems="center">
                  <GridItem sm={2}>
                    <h3>Feed</h3>
                  </GridItem>
                  <GridItem sm={10}>
                    <Divider />
                  </GridItem>
                </GridContainer>
                <Card className={classes.cardPadding}>
                  <GridContainer direction="column" spacing={2}>
                    <GridItem>
                      <GridContainer alignItems="center">
                        <GridItem sm={1}>
                          <Avatar src='/img/avatar1.jpg' className={classes.logoAvatar} style={{width: "45px", height: "45px"}}  />
                        </GridItem>
                        <GridItem sm={4}>
                          <h5>Briansky Alex</h5>
                          <h6 className={classes.cardSubTitle}>12 minutes ago</h6>
                        </GridItem>
                        <GridItem sm={6}>
                        </GridItem>
                        <GridItem sm={1}>
                          <MoreVertOutlinedIcon />
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem>
                      <GridContainer>
                        <GridItem>
                          <h5>I am grateful for the welcoming and spiritually enriching experience at your church.</h5>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem>
                      <GridContainer>
                        <GridItem>
                          <img src="/img/cross.png" style={{width: "100%", height: "100%"}} />
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem>
                      <GridContainer alignItems="center">
                        <GridItem sm={2}>
                          <GridContainer alignItems="center">
                            <GridItem sm={3}>
                              <FavoriteOutlinedIcon />
                            </GridItem>
                            <GridItem sm={9}>320k</GridItem> 
                          </GridContainer>
                        </GridItem>
                        <GridItem sm={2}>
                          <GridContainer alignItems="center">
                            <GridItem sm={3}>
                              <FavoriteOutlinedIcon />
                            </GridItem>
                            <GridItem sm={9}>120</GridItem> 
                          </GridContainer>
                        </GridItem>
                        <GridItem sm={2}>
                          <GridContainer alignItems="center">
                            <GridItem sm={3}>
                              <FavoriteOutlinedIcon />
                            </GridItem>
                            <GridItem sm={9}>148</GridItem> 
                          </GridContainer>
                        </GridItem>
                        <GridItem sm={5}></GridItem>
                        <GridItem sm={1}>
                          <FavoriteOutlinedIcon />
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem>
                      <GridContainer>
                        <GridItem sm={1}>
                          <Avatar src='/img/avatar2.jpg' className={classes.logoAvatar} style={{width: "45px", height: "45px", marginTop: "27px"}}  />
                        </GridItem>
                        <GridItem sm={11}>
                          <CustomInput
                            labelText="Write your comment"
                            id="comment"
                            formControlProps={{
                              fullWidth: true,
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </Card>
              </GridItem>
              <GridItem xs={3} sm={3} md={3} lg={3}>
                {/* start of suggested groups */}
                <Card className={classes.cardPadding}>
                  <GridContainer direction="column" spacing={3}>
                    <GridItem>
                      <GridContainer justify="space-between">
                        <GridItem sm={8}>
                          <h6 style={{fontWeight: "bold"}}>Suggested Groups</h6>
                        </GridItem>
                        <GridItem sm={3}>
                          <h6>See all</h6>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem>
                      <GridContainer direction="row" justify="space-between">
                        <GridItem sm={8}>
                          <GridContainer>
                            <GridItem sm={4}>
                              <Avatar src='/img/icons/Ellipse1.png' className={classes.logoAvatar} style={{width: "45px", height: "45px"}}  />
                            </GridItem>
                            <GridItem sm={8}>
                              <h5>Group Name</h5>
                              <h6 className={classes.cardSubTitle}>Join by Dims</h6>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                        <GridItem sm={2}>
                          <GridContainer alignItems="center" style={{height: "100%"}}>
                            <Link href="/">Join</Link>
                          </GridContainer>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem>
                      <GridContainer direction="row" justify="space-between">
                        <GridItem sm={8}>
                          <GridContainer>
                            <GridItem sm={4}>
                              <Avatar src='/img/icons/Ellipse2.png' className={classes.logoAvatar} style={{width: "45px", height: "45px"}}  />
                            </GridItem>
                            <GridItem sm={8}>
                              <h5>Group Name</h5>
                              <h6 className={classes.cardSubTitle}>Suggested for you</h6>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                        <GridItem sm={2}>
                          <GridContainer alignItems="center" style={{height: "100%"}}>
                            <Link href="/">Join</Link>
                          </GridContainer>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem>
                      <GridContainer direction="row" justify="space-between">
                        <GridItem sm={8}>
                          <GridContainer>
                            <GridItem sm={4}>
                              <Avatar src='/img/icons/Ellipse3.png' className={classes.logoAvatar} style={{width: "45px", height: "45px"}}  />
                            </GridItem>
                            <GridItem sm={8}>
                              <h5>Group Name</h5>
                              <h6 className={classes.cardSubTitle}>Suggested for you</h6>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                        <GridItem sm={2}>
                          <GridContainer alignItems="center" style={{height: "100%"}}>
                            <Link href="/">Join</Link>
                          </GridContainer>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem>
                      <GridContainer direction="row" justify="space-between">
                        <GridItem sm={8}>
                          <GridContainer>
                            <GridItem sm={4}>
                              <Avatar src='/img/icons/Ellipse4.png' className={classes.logoAvatar} style={{width: "45px", height: "45px"}}  />
                            </GridItem>
                            <GridItem sm={8}>
                              <h5>Group Name</h5>
                              <h6 className={classes.cardSubTitle}>Followed by Andrea</h6>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                        <GridItem sm={2}>
                          <GridContainer alignItems="center" style={{height: "100%"}}>
                            <Link href="/">Join</Link>
                          </GridContainer>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem>
                      <GridContainer justify="center">
                        <a href="#">View More</a>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </Card>
                {/* end of suggested groups */}
                {/* start of upcoming events */}
                <Card className={classes.cardPadding}>
                  <GridContainer direction="column" spacing={3}>
                    <GridItem>
                      <GridContainer justify="space-between">
                        <GridItem sm={8}>
                          <h6 style={{fontWeight: "bold"}}>Upcoming Event</h6>
                        </GridItem>
                        <GridItem sm={3}>
                          <h6>See all</h6>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem>
                      <GridContainer direction="row" justify="space-between">
                        <GridItem sm={8}>
                          <GridContainer>
                            <GridItem sm={4}>
                              <Avatar src='/img/icons/Ellipse1.png' className={classes.logoAvatar} style={{width: "45px", height: "45px"}}  />
                            </GridItem>
                            <GridItem sm={8}>
                              <h5>Event Name</h5>
                              <h6 className={classes.cardSubTitle}>12 Dec to 19 Dec</h6>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                        <GridItem sm={2}>
                          <GridContainer alignItems="center" style={{height: "100%"}}>
                            <Link href="/">Join</Link>
                          </GridContainer>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem>
                      <GridContainer direction="row" justify="space-between">
                        <GridItem sm={8}>
                          <GridContainer>
                            <GridItem sm={4}>
                              <Avatar src='/img/icons/Ellipse2.png' className={classes.logoAvatar} style={{width: "45px", height: "45px"}}  />
                            </GridItem>
                            <GridItem sm={8}>
                              <h5>Group Name</h5>
                              <h6 className={classes.cardSubTitle}>12 Dec to 19 Dec</h6>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                        <GridItem sm={2}>
                          <GridContainer alignItems="center" style={{height: "100%"}}>
                            <Link href="/">Join</Link>
                          </GridContainer>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem>
                      <GridContainer direction="row" justify="space-between">
                        <GridItem sm={8}>
                          <GridContainer>
                            <GridItem sm={4}>
                              <Avatar src='/img/icons/Ellipse3.png' className={classes.logoAvatar} style={{width: "45px", height: "45px"}}  />
                            </GridItem>
                            <GridItem sm={8}>
                              <h5>Group Name</h5>
                              <h6 className={classes.cardSubTitle}>12 Dec to 19 Dec</h6>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                        <GridItem sm={2}>
                          <GridContainer alignItems="center" style={{height: "100%"}}>
                            <Link href="/">Join</Link>
                          </GridContainer>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem>
                      <GridContainer direction="row" justify="space-between">
                        <GridItem sm={8}>
                          <GridContainer>
                            <GridItem sm={4}>
                              <Avatar src='/img/icons/Ellipse4.png' className={classes.logoAvatar} style={{width: "45px", height: "45px"}}  />
                            </GridItem>
                            <GridItem sm={8}>
                              <h5>Group Name</h5>
                              <h6 className={classes.cardSubTitle}>12 Dec to 19 Dec</h6>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                        <GridItem sm={2}>
                          <GridContainer alignItems="center" style={{height: "100%"}}>
                            <Link href="/">Join</Link>
                          </GridContainer>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem>
                      <GridContainer justify="center">
                        <a href="#">View More</a>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </Card>
                {/* end of upcoming events */}
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
