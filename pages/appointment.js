import React, { useState, useEffect, useRef } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/icons
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
// core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "/components/CustomButtons/Button.js";
import Fab from '@material-ui/core/Fab';
// components
import CustomBadge from '../components/Badge/Badge.js';
import NavPills from "/components/NavPills/NavPills.js";
import ElevateAppBar from "/components/General/layouts/NavBar.js";
// icon
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
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
import { useSnackbar } from "notistack";
import Router from "next/router";
import axios from 'axios';
import { BACKEND_URL } from "../AppConfigs";
import { isWithinInterval, subDays } from "date-fns";
import {Elements,PaymentElement,useElements,useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import { Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Input, Typography } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

import Close from "@material-ui/icons/Close";
import AutocompleteInput from "./appointment/AutocompleteInput.js";

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
    detailOutlinedStyle: {
      marginTop: '30px',
      '& .MuiOutlinedInput-input' : {
        paddingTop: '9px',
        paddingBottom: '9px',
      },
      '& .MuiInputLabel-outlined' : {
        marginTop: '-9px',
      },
      '& .MuiInputLabel-shrink' : {
        marginTop: '0px',
      }
    },
    tooltipStyle: {
      maxWidth: 500,
      fontSize: '14px'
    }
  }
});

function isWithinXDays(date1, date2, x) {
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  const xDaysAgo = subDays(secondDate, x);

  return isWithinInterval(firstDate, { start: xDaysAgo, end: secondDate });
}
const stripePromise = loadStripe('pk_test_51OVOQtFhFnxnoDMRquya5UT74vYR3BcJFVk79wFhtcXg3hgvyM44n9papYedTEXyoIqqYZWFKBGkfxTampbb7sG400RmgjkKoR');


export default function Appointment(props) {
  const snackbar = useSnackbar();
  const dispatch = useDispatch();
  //redux
  const redux_fullname = useSelector((state) => state.authentication.fullname);
  const redux_token = useSelector((state) => state.authentication.token);
  const redux_membership = useSelector((state) => state.authentication.membership);
  //other
  const classes = useStyles();
  const { ...rest } = props;
  const [selectTimeModal, setSelectTimeModal] = React.useState(false);
  const [enterDetailsModal, setEnterDetailsModal] = React.useState(false);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);
  const [successModal, setSuccessModal] = React.useState(false);
  const [payModal, setPayModal] = React.useState(false);
  const [choiceModal, setChoiceModal] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [membership, setMembership] = useState({});
  const [treatType, setTreatType] = useState("One");
  const [suggestions, setSuggestions] = useState([]);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState([]);
  const [tooltipText, setTooltipText] = useState("");
  const [time, setTime] = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [address, setAddress] = useState("");
  const [detail, setDetail] = useState("");
  const [events, setEvent] = useState([]);
  const [etitle, setEtitle] = useState("");
  const [elocation, setElocation] = useState("");
  const [edescription, setEdescription] = useState("");
  const [estarttime, setEstarttime] =  useState("");
  const [eendtime, setEendtime] = useState(0);
  const [startHour, setStartHour] = useState();
  const [startMin, setStartMin] =  useState(0);
  const [endHour, setEndHour] = useState(0);
  const [endMin, setEndMin] = useState(0);
  const [PaymentIntent,setPaymentIntent]=useState(null);
  const [appointstate, setAppointstate] = useState(true)


  const CheckoutForm=()=>{
    const stripe=useStripe();
    const elements=useElements();
    const handlePayment=async (e)=>{
        e.preventDefault();
        if(!stripe||!elements) return;
        console.log(elements)
        const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        redirect:"if_required"
        });
        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
            console.log(result)
            setAppointstate(false)
        }
    }
    return (
        <>
        <form onSubmit={handlePayment} style={{marginTop: '20px'}}>
            <PaymentElement/>
            <Button
            round
            sx={{margin:1}}
            type='submit'
            variant='outlined'
            color="primary"
            >Pay</Button>
        </form>
        </>
    )
  }
  //component did mount
  useEffect(() => {
    // if(redux_membership == "null" || redux_membership == "undefined" || redux_membership == null || redux_membership == undefined || checkExpired(redux_membership)) {
    //   snackbar.enqueueSnackbar("Your membership is not valid", { variant: "info" });
    //   Router.push("/home");
    // }
    // const range = ['2023/1/1', '2024/12/31'];
    const firstDay = new Date(2023, 0, 1);
    const lastDay = new Date(2024, 11, 31);
    const range = {start :firstDay, end:lastDay};
    console.log(range.length)
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
          setAppointmentTypes(response.data.data);
          if(response.data.data && response.data.data.length) {
            const currentTreatType = response.data.data[0];
            setTreatType(currentTreatType._id);
            setTooltipText("Price: $" + currentTreatType.price + " Time: " + currentTreatType.length + "minutes");
          }
        }
      });
    axios
      .get(`${BACKEND_URL}/appointments/my`, {headers: {token:redux_token}})
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
          // console.log(response.data.data)
          setAppointments(response.data.data);
        }
      });

    axios
      .post(`${BACKEND_URL}/appointments/calendar`, {range}, {headers: {token:redux_token}})
      .then((response) => {
        console.log(response.data)
        setEvent(response.data.data.events)
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);
  const startSaving=()=>{
    axios.post(`${BACKEND_URL}/appointments/start-payment`,{
        price:15000
    })
    .then(response=>{
        if(response.data.status=="success"){
            setPaymentIntent(response.data.data)
        }
    })
}
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

  const time_values = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19
  ];

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  }

  const handleAddressContainerChange = (change) => {
    setAddress(change.address);
    console.log(change);
  }

  const handleActionAppointment = (index) => {
    setChoiceModal(true);
    setCurrentIndex(index);
  }

  const convertHumanString = (stamp) => {
    const minute = stamp / 60000;
    return minute + 'minutes';
  }
  function convertTimeToHoursAndMinutes(time) {
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return { hours, minutes };
  }
  function handleSetAppointment(date) {
    const saveDate = date;
    // check whether there are already appointments
    date = new Date(date);
    date.setHours(0, 0, 0, 0);
    date = date.getTime();

    let flag = 1;
    let appointmentArray = [];

    appointments.map(appointment => {
      const time = new Date(appointment.time).getTime();
      const from = time;
      const to = from + appointment.type.length;

      if (from > date && from < (date + 86400000))
      {
        const timeFrom = TimeDisplay(from);
        const timeTo = TimeDisplay(to);
        appointmentArray.push({ time: timeFrom + ' - ' + timeTo, title: appointment.type.title });
        flag = 0;
      }
    });
    if (flag == 0)
    {
      setCurrentAppointment([...appointmentArray]);
      setShowDetailsModal(true);
      return ;
    }


    date = saveDate;
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    // display save appointment
    if (today > date)
      return ;
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setSelectedDate(formattedDate);
    // setEnterDetailsModal(true);
    
    events.map(event => {
      const start_date = new Date(event.start_date);
      const end_date = new Date(event.end_date)
      // setEtitle(event.title)
      // setElocation(event.location)
      if(start_date <= date && date <= end_date ) {
        setEtitle(event.title);
        setElocation(event.location);
        console.log(event)
        setEdescription(event.description);
        setEstarttime(event.start_time);
        const {hours: startHours, minutes: startMinutes } = convertTimeToHoursAndMinutes(estarttime);
        setStartHour(startHours)
        setStartMin(startMinutes)
        setEendtime(event.end_time);
        const {hours: endHours, minutes: endMinutes } = convertTimeToHoursAndMinutes(eendtime);
        setEndHour(endHours)
        setEndMin(endMinutes)
        setEnterDetailsModal(true);
      }
    })
  }

  const handleSetTime = (index) => {
    setTime(index);
  }

  function handleSelectTime() {
    if (time == -1) {
      return snackbar.enqueueSnackbar(
        "Select time please.",
        { variant: "error" }
      );
    }
    setSelectTimeModal(false);

    const today = new Date(selectedDate);
    today.setHours(0, 0, 0, 0);
    let timeStamp = today.getTime();
    timeStamp += 8 * 3600000 + time_values[time] * 1800000;

    axios
      .post(`${BACKEND_URL}/appointments/save`, {appointmenttype: treatType, time: timeStamp, address: address, location: "", detail: detail}, {headers: {token:redux_token}})
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
          axios
          .get(`${BACKEND_URL}/appointments/my`, {headers: {token:redux_token}})
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
              setAppointments(response.data.data);
              renderCell(selectedDate);
              setSuccessModal(true);
              snackbar.enqueueSnackbar(
                "Successfly saved.",
                { variant: "success" }
              );
              window.location.reload();
            }
          });
        }
      });    
  }

  function handleEnterDetails() {
    if (address == "" || address == null || address == undefined)
      return snackbar.enqueueSnackbar(
        "Enter location please.",
        { variant: "error" }
      );
    setEnterDetailsModal(false);
    setSelectTimeModal(true);
  }

  function TimeDisplay(stamp) {
    const date = new Date(stamp);
    const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return timeString;
  }

  function getTodoList(date) {
    date = new Date(date);
    date.setHours(0, 0, 0, 0);
    date = date.getTime();

    let returnValue = [];

    appointments.map(appointment => {
      const time = new Date(appointment.time).getTime();
      const from = time;
      const to = time + appointment.type.length;

      if (from > date && from < (date + 86400000))
      {
        const timeFrom = TimeDisplay(from);
        const timeTo = TimeDisplay(to);
        returnValue.push({ time: timeFrom + ' - ' + timeTo, title: appointment.type.title });
      }
    });
    return returnValue;
  }

  // function getLocationList(date) {
  //   let returnValue = [];
  //   events.map(event => {
  //     const start_date = new Date(event.start_date);
  //     const end_date = new Date(event.end_date)
  //     // setEtitle(event.title)
  //     // setElocation(event.location)
  //     if(start_date <= date && date <= end_date ) {
  //       returnValue.push({date: date});
  //       setEtitle(event.title);
  //       setElocation(event.location);
  //       console.log(event)
  //       setEdescription(event.description);
  //       setEstarttime(event.start_time);
  //       const {hours: startHours, minutes: startMinutes } = convertTimeToHoursAndMinutes(estarttime);
  //       setStartHour(startHours)
  //       setStartMin(startMinutes)
  //       setEendtime(event.end_time);
  //       const {hours: endHours, minutes: endMinutes } = convertTimeToHoursAndMinutes(eendtime);
  //       setEndHour(endHours)
  //       setEndMin(endMinutes)
  //     }
  //   })
  //   return returnValue
  // }

  function renderCell(date) {
    const displayList = getTodoList(date);
    // const EventLocationList = getLocationList(date);
    // console.log(EventLocationList)
    let location = "";
    events.map(event => {
      const start_date = new Date(event.start_date);
      const end_date = new Date(event.end_date)
      // setEtitle(event.title)
      // setElocation(event.location)
      if(start_date <= date && date <= end_date ) {
        location = event.location
      }
    })
      return (
        (displayList.length === 0) ?
        ((location === "") ? (<div></div>) : 
        (<div style={{marginTop:"5px"}}>
          location: {location}
        </div>))
        :
        (<ul className="calendar-todo-list" style={{paddingLeft: '0px',color: "black"}}>
          <li>
            <div style={{marginTop: '5px'}}>location: {location}</div>
          </li>
          {
            displayList.map(display => {
              return (
                <li key={display.time} style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', color: 'black'}}>
                  {/* <Badge /> <b>{display.time}&nbsp;{display.title}</b> */}
                  <Badge />
                </li>
              )
            })
            
          }
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

  const checkDay = (date) => {
    let value = false;
    events.map(event => {
      const start_date = new Date(event.start_date);
      const end_date = new Date(event.end_date)
      if(start_date < date && date < end_date ) {
        value = true
      }
    })
    return value
  }
  return (
    <>
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
                                <Fab variant="extended" color={time == index ? "primary" : "default"} onClick={() => {handleSetTime(index)}}>
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
                        <h6 style={{marginTop: '20px', fontWeight: 700}}>Event Details</h6>
                      </GridItem>
                      <GridItem sm={6}>
                        <TextField
                          label="Event Title"
                          className={classes.outlinedStyle}
                          placeholder="Event Title"
                          fullWidth
                          variant="outlined"
                          value= {etitle}
                          InputProps={{
                            readOnly: true,
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
                      </GridItem>
                      <GridItem sm={6}>
                        <TextField
                          label="Location"
                          className={classes.outlinedStyle}
                          placeholder="Location"
                          fullWidth
                          variant="outlined"
                          value={elocation}
                          InputProps={{
                            readOnly: true,
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
                      </GridItem>
                      <GridItem>
                        <TextField
                          label="Detail"
                          className={classes.detailOutlinedStyle}
                          placeholder="Detail"
                          fullWidth
                          multiline
                          rows={4}
                          variant="outlined"
                          value={edescription}
                          onChange={handleDetailChange}
                          InputProps={{
                            readOnly: true,
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
                      </GridItem>
                      <GridItem style={{marginTop: "20px"}}>
                        { startHour != 0 && (
                          <>
                          <span style={{fontSize: "16px", fontWeight: "500"}}>Time: </span>
                          <span>{startHour}h {startMin}min ~ {endHour}h {endMin}min</span> </>)
                        }                
                      </GridItem>
                    </GridContainer>
                    <Divider style={{marginTop: '30px'}}/>
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
                            readOnly: true,
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
                            readOnly: true,
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
                                <MenuItem key={item._id} value={item._id}><p>{item.title}</p></MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Tooltip>
                        <TextField
                          label="Detail"
                          className={classes.detailOutlinedStyle}
                          placeholder="Detail"
                          fullWidth
                          multiline
                          rows={4}
                          variant="outlined"
                          value={detail}
                          onChange={handleDetailChange}
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
                        <AutocompleteInput handleAddressContainerChange={handleAddressContainerChange} />
                        {/* <ul>
                          {suggestions.map((suggestion) => (
                            <li key={suggestion.place_id} style={{cursor: 'pointer'}} onClick={() => handleLocationClick(suggestion.display_name)}>{suggestion.display_name}</li>
                          ))}
                        </ul> */}
                        {
                        !PaymentIntent?(
                        <Button
                        variant='outlined'
                        color="primary"
                        onClick={startSaving}
                        round
                        >
                            Prepay for the Book
                        </Button>
                    ):(
                        <Elements stripe={stripePromise} options={PaymentIntent}>
                            <CheckoutForm/>
                        </Elements>
                    )}
                      </GridItem>
                    </GridContainer>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Grid container justify="center">
                        <Grid item>
                          <Button round onClick={() => setEnterDetailsModal(false)}>
                            Cancel
                          </Button>
                          <Button round color="primary" disabled={appointstate} onClick={handleEnterDetails}>
                            Get Appointment
                          </Button>
                        </Grid>
                      </Grid>
                  </DialogActions>
                </Dialog>
                {/* end of details modal */}
                {/* start of show details modal */}
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={showDetailsModal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setShowDetailsModal(false)}
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
                      onClick={() => setShowDetailsModal(false)}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <GridContainer justify="center" alignItems="center" direction="column">
                      <ul>
                        {currentAppointment.map(appointment => {
                          return (
                            <li>
                              <h3 style={{fontWeight: 'bold', color: 'purple'}}>{appointment.time}</h3>
                              <h4>{appointment.title}</h4>
                            </li>
                          )
                        })}
                      </ul>
                    </GridContainer>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Grid container justify="center">
                        <Grid item>
                          <Button round color="primary" onClick={() => {setShowDetailsModal(false);}}>
                            Close
                          </Button>
                        </Grid>
                      </Grid>
                  </DialogActions>
                </Dialog>
                {/* end of show details modal */}
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
                          <Button round color="primary" onClick={() => {setSuccessModal(false);}}>
                            View
                          </Button>
                        </Grid>
                      </Grid>
                  </DialogActions>
                </Dialog>
                {/* end of success modal */}
                {/* start of pay modal */}
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={payModal}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setPayModal(false)}
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
                      onClick={() => setPayModal(false)}
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
                        <h3>PayModal</h3>
                    </GridContainer>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Grid container justify="center">
                        <Grid item>
                          <Button round color="primary" onClick={() => {setSuccessModal(false);}}>
                            Pay
                          </Button>
                        </Grid>
                      </Grid>
                  </DialogActions>
                </Dialog>
                {/* end of pay modal */}
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
                          {appointments && 
                            (<Calendar bordered onSelect={handleSetAppointment} cellClassName={date => {
                              // const checkday = checkDay(date.getDate(), date.getMonth());
                              const checkday = checkDay(date)
                              if(checkday == true) return 'bg-blue'
                              else return 'bg-white'
                            }}  
                              renderCell={renderCell} />)
                          } 
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
                              <GridItem sm={3}>Date of appointment</GridItem>
                              <GridItem sm={4}>Event name</GridItem>
                              <GridItem sm={2}>Length of appointment</GridItem>
                              <GridItem sm={1}>Status</GridItem>
                            </GridContainer>
                          </GridItem>
                          <GridItem>
                            {appointments.map((item, index) => (
                              <React.Fragment key={index}>
                                <GridContainer className={classes.title}>
                                  <GridItem sm={3}>{new Date(item.time).toLocaleString()}</GridItem>
                                  <GridItem sm={4}>{item.type.title}</GridItem>
                                  <GridItem sm={2}>{convertHumanString(item.type.length)}</GridItem>
                                  <GridItem sm={1}><CustomBadge color="warning" size="small"><p style={{fontSize: '12px'}}>{item.status}</p></CustomBadge></GridItem>
                                </GridContainer>
                                <Divider />
                              </React.Fragment>
                            ))}
                          </GridItem>
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
    </>
  );
}
