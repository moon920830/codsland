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
//redux
import { useSelector } from "react-redux";
//rsuite
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

import modalStyle from "../styles/jss/nextjs-material-kit/modalStyle.js";
import styles from "/styles/jss/nextjs-material-kit/pages/components.js";

import { Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Input, Typography } from "@material-ui/core";
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

export default function Appointment(props) {
  //redux
  const redux_fullname = useSelector((state) => state.authentication.fullname);
  //other
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
          <Container maxWidth={false} style={{ maxWidth: "80%" }} >
            <GridContainer justify="center">
              <h2 className={classes.title}>Appointment</h2>
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={selectTimeModal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setSelectTimeModal(false)}
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
                      onClick={() => setSelectTimeModal(false)}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                    <h4 className={classes.modalTitle}>Select Time</h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <GridContainer direction="column" spacing={3}>
                      <GridItem>
                        <GridContainer justify="center">
                          <h5>{selectedDate}</h5>
                        </GridContainer>
                      </GridItem>
                      <GridItem>
                        <GridContainer justify="center">
                          <GridItem sm={2}>9:30</GridItem>
                          <GridItem sm={2}>9:30</GridItem>
                          <GridItem sm={2}>9:30</GridItem>
                          <GridItem sm={2}>9:30</GridItem>
                          <GridItem sm={2}>9:30</GridItem>
                        </GridContainer>
                      </GridItem>
                      <GridItem>
                        <GridContainer justify="center">
                          <GridItem sm={2}>9:30</GridItem>
                          <GridItem sm={2}>9:30</GridItem>
                          <GridItem sm={2}>9:30</GridItem>
                          <GridItem sm={2}>9:30</GridItem>
                          <GridItem sm={2}>9:30</GridItem>
                        </GridContainer>
                      </GridItem>
                      <GridItem>
                        <GridContainer justify="center">
                          <GridItem sm={2}>9:30</GridItem>
                          <GridItem sm={2}>9:30</GridItem>
                          <GridItem sm={2}>9:30</GridItem>
                          <GridItem sm={2}>9:30</GridItem>
                          <GridItem sm={2}>9:30</GridItem>
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Grid container justify="center">
                        <Grid item>
                          <Button round onClick={() => setSelectTimeModal(false)}>
                            Cancel
                          </Button>
                          <Button round color="primary" onClick={handleSelectTime}>
                            Get Appointment
                          </Button>
                        </Grid>
                      </Grid>
                  </DialogActions>
                </Dialog>
                {/* start of details modal */}
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={enterDetailsModal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setSelectTimeModal(false)}
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
                      onClick={() => setEnterDetailsModal(false)}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                    <h4 className={classes.modalTitle}>Enter Appointment Details</h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <GridContainer>
                      <GridItem sm={6}>
                        <h5>Patient Name</h5>
                        <CustomInput
                          labelText=""
                          id="name"
                          customValue={redux_fullname}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                      <GridItem sm={6}>
                        <h5>Length of appointment</h5>
                        
                        <TextField
                          id="standard-select-currency"
                          select
                          value="ONE"
                          style={{paddingTop:"27px"}}
                          // label="Select"
                          // onChange={handleChange}
                          // helperText="Please select your currency"
                        >
                          <MenuItem value="ONE">
                            10 Mins(brief introduction)
                          </MenuItem>
                          <MenuItem value="TWO">
                            20 Mins(child treatment, first visit)
                          </MenuItem>
                        </TextField>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem sm={6}>
                        <h5>Appointment at</h5>
                        <CustomInput
                          labelText=""
                          id="time"
                          customValue={selectedDate}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                      <GridItem sm={6}>
                        <h5>Payment Option</h5>
                        <TextField
                          id="standard-select-currency"
                          select
                          value="ONE"
                          style={{paddingTop:"27px"}}
                          // label="Select"
                          // onChange={handleChange}
                          // helperText="Please select your currency"
                        >
                          <MenuItem value="ONE">
                            Payment Now
                          </MenuItem>
                          <MenuItem value="TWO">
                            Divide Pay in 10 years
                          </MenuItem>
                        </TextField>
                      </GridItem>
                    </GridContainer>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Grid container justify="center">
                        <Grid item>
                          <Button round onClick={() => setEnterDetailsModal(false)}>
                            Cancel
                          </Button>
                          <Button round color="primary" onClick={handleEnterDetails}>
                            Get Appointment
                          </Button>
                        </Grid>
                      </Grid>
                  </DialogActions>
                </Dialog>
                {/* end of details modal */}
                {/* start of success modal */}
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={successModal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setSelectTimeModal(false)}
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
                      onClick={() => setSuccessModal(false)}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <GridContainer justify="center" alignItems="center" direction="column">
                        <div style={{backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", width: "120px", height: "120px"}}>
                          <CheckOutlinedIcon style={{width: "40%", height: "40%", color: "white"}} />
                        </div>
                        <h3>Appointment has been</h3>
                        <h3>booked successfully</h3>
                    </GridContainer>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Grid container justify="center">
                        <Grid item>
                          <Button round color="primary" onClick={() => setSuccessModal(false)}>
                            View
                          </Button>
                        </Grid>
                      </Grid>
                  </DialogActions>
                </Dialog>
                {/* end of success modal */}
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <NavPills
                  color="primary"
                  alignCenter={false}
                  tabs={[
                    {
                      tabButton: "Book an Appointment",
                      tabContent: (
                        <GridContainer>
                          <GridItem sm={12}>
                            <Calendar bordered onSelect={handleSetAppointment} />
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Booked Appointment",
                      tabContent: (
                        <GridContainer>
                          <GridItem>
                            <GridContainer alignItems="center" className={classes.title} style={{backgroundColor:"#2E3192", borderRadius: "26px 26px 0px 0px", color: "white"}}>
                              <GridItem sm={2}>Name of Patient</GridItem>
                              <GridItem sm={2}>Event name</GridItem>
                              <GridItem sm={4}>Length of appointment</GridItem>
                              <GridItem sm={1}>Status</GridItem>
                              <GridItem sm={2}>Date of appointment</GridItem>
                              <GridItem sm={1}>Action</GridItem>
                            </GridContainer>
                          </GridItem>
                          <GridItem>
                            {Array.from({length: 10}).map((item, index) => (
                              <React.Fragment key={index}>
                                <GridContainer className={classes.title}>
                                  <GridItem sm={2}>John Doe</GridItem>
                                  <GridItem sm={2}>Initial Consultation</GridItem>
                                  <GridItem sm={4}>20 Mins(Child Treatment, First Visit Consultation)</GridItem>
                                  <GridItem sm={1}>Pending</GridItem>
                                  <GridItem sm={2}>5 Dec 2023</GridItem>
                                  <GridItem sm={1}>Cancel</GridItem>
                                </GridContainer>
                                {index != 9 && <Divider />}
                              </React.Fragment>
                            ))}
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Uncompleted Booking",
                      tabContent: (
                        <GridContainer>
                          <GridItem>###</GridItem>
                        </GridContainer>
                      )
                    },
                  ]}
                />
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
