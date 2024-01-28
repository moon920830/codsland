import React, { useState, useEffect, useRef } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/icons
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
// core components
import { makeStyles } from "@material-ui/core/styles";
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "/components/CustomButtons/Button.js";
import CustomButton from "@material-ui/core/Button";
import Fab from '@material-ui/core/Fab';
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
import { useDispatch, useSelector } from "react-redux";
import actions from '../redux/actions';
//rsuite
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
//styles
import modalStyle from "../styles/jss/nextjs-material-kit/modalStyle.js";
import styles from "/styles/jss/nextjs-material-kit/pages/components.js";
//other
import Router from "next/router";
import { useSnackbar } from "notistack";
import axios from 'axios';
import { BACKEND_URL } from "../AppConfigs";
import { isWithinInterval, subDays } from "date-fns";
import LocationMap from './appointment/LocationMap.js';

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
    },
    selectOutlinedStyle: {
      '& .MuiOutlinedInput-input' : {
        padding: '9px',
      }
    },
    outlinedStyle: {
      marginTop: '30px',
      '& .MuiOutlinedInput-input' : {
        padding: '9px',
      }
    },
    tooltipStyle: {
      maxWidth: 500,
      fontSize: '14px'
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

function isWithinXDays(date1, date2, x) {
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  const xDaysAgo = subDays(secondDate, x);

  return isWithinInterval(firstDate, { start: xDaysAgo, end: secondDate });
}

export default function Appointment(props) {
  const snackbar = useSnackbar();
  const dispatch = useDispatch();
  //redux
  const redux_fullname = useSelector((state) => state.authentication.fullname);
  const redux_token = useSelector((state) => state.authentication.token);
  //other
  const classes = useStyles();
  const { ...rest } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
  const [selectTimeModal, setSelectTimeModal] = React.useState(false);
  const [selectLocationModal, setSelectLocationModal] = React.useState(false);
  const [enterDetailsModal, setEnterDetailsModal] = React.useState(false);
  const [successModal, setSuccessModal] = React.useState(false);
  const [choiceModal, setChoiceModal] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [membership, setMembership] = useState({});
  const [treatType, setTreatType] = useState("One");
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [tooltipText, setTooltipText] = useState("");

  
  const refSelectedDate=useRef("");


  //component did mount
  useEffect(() => {
    axios
      .post(`${BACKEND_URL}/members/check`, {}, {headers: {token:redux_token}})
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
          setMembership(response.data.data[0]);
        }
      });
    axios
      .get(`${BACKEND_URL}/appointments/appointment-types`, {headers: {token:redux_token}})
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
          console.log(response.data.data);
          setAppointmentTypes(response.data.data);
          if(response.data.data && response.data.data.length) {
            const currentTreatType = response.data.data[0];
            setTreatType(currentTreatType._id);
            setTooltipText("Price: $" + currentTreatType.price + " Time: " + currentTreatType.length + "minutes");
          }
        }
      });
  }, []);

  const times = [
    '8:00',
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
  ];

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
    // if(1) {

    //   const formattedDate = date.toLocaleDateString('en-US', {
    //     day: 'numeric',
    //     month: 'long',
    //     year: 'numeric',
    //   });
    //   setSelectedDate(formattedDate);
    //   return setChoiceModal(true);
    // }

    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    console.log(formattedDate);
    setSelectedDate(formattedDate);
    setEnterDetailsModal(true);
  }

  function handleSelectTime() {
    setSelectTimeModal(false);
    setSuccessModal(true);
  }

  function handleEnterDetails() {
    setEnterDetailsModal(false);
    setSelectTimeModal(true);
  }

  function getTodoList(date) {
    const day = date.getDate();
  
    switch (day) {
      case 10:
        return { time: '10:30 am - 11:00 am', title: 'Meeting' };
      case 15:
        return { time: '09:30 pm - 10:30 pm', title: 'Products Introduction Meeting' };
      default:
        return undefined;
    }
  }

  function renderCell(date) {
    const displayList = getTodoList(date);

    // <li>
    //   <Whisper
    //     placement="top"
    //     trigger="click"
    //     speaker={
    //       <Popover>
    //         {list.map((item, index) => (
    //           <p key={index}>
    //             <b>{item.time}</b> - {item.title}
    //           </p>
    //         ))}
    //       </Popover>
    //     }
    //   >
    //     <a>{moreCount} more</a>
    //   </Whisper>
    // </li>

      return (
        (displayList === undefined) ?
        (<div></div>)
        :
        (<ul className="calendar-todo-list" style={{paddingLeft: '0px'}}>
          <li style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
            <Badge /> <b>{displayList.time}</b>
          </li>
          <li style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
            <Badge /> {displayList.title}
          </li>
        </ul>)
      );

    return null;
  }

  const handleRescheduleAppointment = () => {
    if(Object.keys(membership).length != 0 && membership.type == 'annual') {
      // const date = new Date();
      // if(isWithinXDays(selectedDate, date, 5))
      //   return snackbar.enqueueSnackbar("You can only cancel until 5 days prior to service", { variant: "error" });
      setChoiceModal(false);
      return setSelectTimeModal(true);
    }
    setChoiceModal(false);
    return setSelectTimeModal(true);    // const date = new Date();
    // if(isWithinXDays(selectedDate, date, 7))
    //   return snackbar.enqueueSnackbar("You can only cancel until 7 days prior to service", { variant: "error" });
  }

  const handleCancelAppointment = () => {
    if(Object.keys(membership).length != 0 && membership.type == 'annual') {
      // const date = new Date();
      // if(isWithinXDays(selectedDate, date, 7))
      //   return snackbar.enqueueSnackbar("You can only cancel until 7 days prior to service", { variant: "error" });
      return setChoiceModal(false);
    }
    snackbar.enqueueSnackbar("You haven't purchased annual membership", { variant: "error" });
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

  const handleLocationClick = (new_location) => {
    setLocation(new_location);
    setSuggestions([]);
  }

  const handleSetTreatType = (type) => {
    setTreatType(type);

    const currentTreatType = appointmentTypes.find(item => item._id == type);
    setTooltipText("Price: $" + currentTreatType.price + " Time: " + currentTreatType.length + "minutes");
  }

  return (
    <div>
      <ElevateAppBar />
      <div className={classNames(classes.mainRaised)}>
        <div className={classes.sections}>
          <Container maxWidth={false} style={{ maxWidth: "80%" }} >
            <GridContainer justify="center">
              <h2 className={classes.title}>Appointment</h2>
                {/* start of select time modal */}
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
                        <GridContainer justify="space-between">
                          {times.map((value, index) => (
                            <GridItem key={"fab_"+index} sm={3} style={{marginBottom: '20px'}}>
                              <GridContainer justify="center">
                                <Fab variant="extended" color="default">
                                  <p style={{cursor:'pointer', textAlign: 'center', width: 'fit-content'}}>{value}</p>
                                </Fab>
                              </GridContainer>
                            </GridItem>
                          ))}
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Grid container justify="center">
                        <Grid item>
                          <Button round onClick={() => setSelectTimeModal(false)} style={{marginRight: '10px'}}>
                            Cancel
                          </Button>
                          <Button round color="primary" onClick={handleSelectTime}>
                            Select
                          </Button>
                        </Grid>
                      </Grid>
                  </DialogActions>
                </Dialog>
                {/* end of select time modal */}
                {/* start of details modal */}
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={enterDetailsModal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setEnterDetailsModal(false)}
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
                    <h4 className={classNames(classes.modalTitle, classes.title, classes.textCenter)}>Enter details</h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <Divider />
                    <GridContainer>
                      <GridItem>
                        <TextField
                          label="Patient Name"
                          className={classes.outlinedStyle}
                          placeholder="Patient Name"
                          fullWidth
                          variant="outlined"
                          defaultValue={redux_fullname}
                          InputProps={{
                            readOnly: "true",
                            style: {
                              // Control font or other styles here
                              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                              fontSize: '14px',
                              '::placeholder' : {
                                display: 'none'
                              },
                            },
                          }}
                        />
                        <TextField
                          label="Appointment Date"
                          className={classes.outlinedStyle}
                          placeholder="Appointment Date"
                          fullWidth
                          variant="outlined"
                          defaultValue={selectedDate}
                          InputProps={{
                            readOnly: "true",
                            value: selectedDate,
                            style: {
                              // Control font or other styles here
                              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                              fontSize: '14px',
                              // marginTop: '30px',
                              '::placeholder' : {
                                display: 'none'
                              },
                            },
                          }}
                        />
                        <Tooltip title={tooltipText} placement="bottom-end" classes={{ tooltip: classes.tooltipStyle }}>
                          <FormControl style={{marginTop: '30px'}} variant="outlined" className={classes.formControl} fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">Appointment Types</InputLabel>
                            <Select
                            className={classes.selectOutlinedStyle}
                              label="Appointment Type"
                              labelId="demo-simple-select-helper-label"
                              id="demo-simple-select-helper"
                              value={treatType}
                              fullWidth
                              
                              onChange={(e) => {handleSetTreatType(e.target.value)}}
                            >
                              {Array.isArray(appointmentTypes) && appointmentTypes.map((item, index) => (
                                <MenuItem key={item._id} value={item._id}><p style={{fontSize: '16px'}}>{item.title}</p></MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Tooltip>
                        <TextField
                          label="Address"
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
                  onClose={() => setSuccessModal(false)}
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
                {/* start of choice modal */}
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={choiceModal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setChoiceModal(false)}
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
                      onClick={() => setChoiceModal(false)}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                    <h4 className={classes.modalTitle}>Select Your Choice</h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <GridContainer justify="center" alignItems="center" direction="column">
                      <Button round color="primary" onClick={handleRescheduleAppointment}>
                        Reschedule
                      </Button>
                      <Button round color="primary" onClick={handleCancelAppointment}>
                        Cancel
                      </Button>
                    </GridContainer>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Grid container justify="center">
                        <Grid item>
                        </Grid>
                      </Grid>
                  </DialogActions>
                </Dialog>
                {/* end of choice modal */}
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
                            <Calendar bordered onSelect={handleSetAppointment} renderCell={renderCell} />
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
