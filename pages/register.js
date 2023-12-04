import React from "react";
import { useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutlined from '@material-ui/icons/LockOutlined'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import LanguageIcon from '@material-ui/icons/Language';
// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardFooter from "/components/Card/CardFooter.js";
import CustomInput from "/components/CustomInput/CustomInput.js";
import Link from 'next/link'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import axios from 'axios';
import Datetime from "react-datetime";
import {BACKEND_URL} from '../AppConfigs'
import {useSnackbar} from 'notistack'
import Router from 'next/router'
import { FormControl } from "@material-ui/core";
import { CalendarToday } from "@material-ui/icons";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
const useStyles = makeStyles((styles) => ({
  authlogoNavigation: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundImage: "url('/img/auth-bg.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  overlay: {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#2E3192',
    mixBlendMode: 'overlay',
    zIndex: 1,
    boxShadow: '1px 0px 1px 1px rgba(0,0,0,0.1)',
  },
  // Other styles
}));

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const matchesSm = useMediaQuery('(max-width:600px)');
  const [selectedEnabled, setSelectedEnabled] = React.useState("male");
  const snackbar=useSnackbar();
  const [date, setDate] = useState('');
  const handleDateChange = (e) => {
    const selectedDate =  e._d;
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // Adding 1 because months are zero-indexed
    const day = selectedDate.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`; 
    console.log(formattedDate);
    setDate(formattedDate);
  };
  const renderInput = (props, openCalendar, closeCalendar) => (
    <div className="input-container">
      <input {...props} />
      <CalendarTodayIcon className="calendar-icon" onClick={openCalendar} />
    </div>
  );
  const handleSubmit=(e)=>{
    e.preventDefault();
    const fullname=e.target.fullname.value;
    const email=e.target.email.value;
    const password=e.target.password.value;
    // const birthday=e.target.birthday.value;
    const city=e.target.city.value;
    const country=e.target.country.value;
    if(!fullname||!email||!password) return snackbar.enqueueSnackbar("Unvalid Input",{variant:"error"}) ;
    axios.post(`${BACKEND_URL}/auth/signup`,{
      fullname:fullname,
      email:email,
      password:password,
      city:city,
      birthday:date,
      country:country,
    }).then(response=>{
      if(response.data.status=="error") return snackbar.enqueueSnackbar(response.data.error?response.data.error:"Error",{variant:"error"});
      snackbar.enqueueSnackbar("Success",{variant:"success"});
      return Router.push("/")
    })
  }
  return (
    <GridContainer sm={12}>
      { !matchesSm ? (
        <GridItem sm={6}>
          <div className={classes.authlogoNavigation}>
            <div className={classes.overlay}></div>
          </div>
        </GridItem>
      ) : null }
      <GridItem sm={6}>
        <GridContainer justify="center" alignItems="center" style={{height: '100%'}}>
          <GridItem md={9} lg={7} xl={7}>
          <Card className={classes[cardAnimaton]} style={{marginBottom: "-30px"}}>
            <form className={classes.form} onSubmit={handleSubmit} >
              <CardHeader color="primary" className={classes.cardHeader}>
                <img
                  src="/img/auth-logo.png"
                  alt="..."
                  className={
                    classes.imgRaised +
                    " " +
                    classes.imgRoundedCircle +
                    " " +
                    classes.imgFluid
                  }
                />
                <h3>Sign Up</h3>
                <h4>Enter your personal Detail To register</h4>
              </CardHeader>
              <CardBody>
              <CustomInput
                  labelText="Full Name..."
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "",
                    endAdornment: (
                      <InputAdornment position="end">
                        <PersonOutlineIcon className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                    name:"fullname"
                  }}
                />
                <CustomInput
                  labelText="Email..."
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "email",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                    name:"email"
                  }}
                />
                <CustomInput
                  labelText="Password"
                  id="pass"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <LockOutlined className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                    autoComplete: "off",
                    name:"password"
                  }}
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedEnabled === "male"}
                      onChange={() => setSelectedEnabled("male")}
                      value="a"
                      name="radio button enabled"
                      aria-label="A"
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
                      color="primary"
                    />
                  }
                  classes={{
                    label: classes.label,
                    root: classes.labelRoot
                  }}
                  label="Male"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedEnabled === "female"}
                      onChange={() => setSelectedEnabled("female")}
                      value="b"
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
                      color="primary"
                    />
                  }
                  classes={{
                    label: classes.label,
                    root: classes.labelRoot
                  }}
                  label="Female"
                />
                <Datetime
                  inputProps={{ placeholder: "Datetime Picker Here" }}
                  dateFormat={"YYYY-MM-DD"}
                  timeFormat={false}
                  onChange={handleDateChange}
                  renderInput={renderInput}
                  // style={{display: "flex"}}
                />
                <CustomInput
                  labelText="City..."
                  id="city"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "",
                    endAdornment: (
                      <InputAdornment position="end">
                        <LocationCityIcon className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                    name:"city"
                  }}
                />
                <CustomInput
                  labelText="Country..."
                  id="country"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "",
                    endAdornment: (
                      <InputAdornment position="end">
                        <LanguageIcon className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                    name:"country"
                  }}
                />
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button type="submit" round color="primary" size="lg">
                  Sign Up
                </Button>
                <p>Already have an Account? <Link href="/login">Login</Link> </p>
              </CardFooter>
            </form>
          </Card>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
);
}
