import React from "react";
import { useState, useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Email from "@material-ui/icons/Email";
import LockOutlined from "@material-ui/icons/LockOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import DateRangeIcon from "@material-ui/icons/DateRange";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LanguageIcon from "@material-ui/icons/Language";
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardFooter from "/components/Card/CardFooter.js";
import CustomInput from "/components/CustomInput/CustomInput.js";
import Link from "next/link";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import axios from "axios";
import Datetime from "react-datetime";
import { BACKEND_URL } from "../AppConfigs";
import { useSnackbar } from "notistack";
import Router from "next/router";
import { Avatar, Box, FormControl } from "@material-ui/core";
import { CalendarToday } from "@material-ui/icons";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
//redux
import { useDispatch } from 'react-redux';
import actions from '../redux/actions';
//others
import validator from "validator";

import modalStyle from "../styles/jss/nextjs-material-kit/modalStyle.js";
const useStyles = makeStyles((style) => ({
  authlogoNavigation: {
    position: "relative",
    width: "100%",
    height: "100vh",
    backgroundImage: "url('/img/auth-bg.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  overlay: {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#2E3192",
    mixBlendMode: "overlay",
    zIndex: 1,
    boxShadow: "1px 0px 1px 1px rgba(0,0,0,0.1)",
  },
  modalPersonIconWrapper: {
    marginTop: style.spacing(4),
    backgroundColor: "#F3F3F3",
    width: "136px",
    height: "136px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
  },
  modalPersonIcon: {
    width: "40%",
    height: "40%",
  },
  modalCustomTitle: {
    fontSize: "40px",
    fontWeight: "600",
    marginTop: style.spacing(4)
  },
  makecenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modalSkipButton: {
    marginTop: style.spacing(4),
    marginBottom: style.spacing(3)
  },
  cursor: {
    cursor: 'pointer'
  },
  ...modalStyle
  // Other styles
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function RegisterPage(props) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const matchesSm = useMediaQuery("(max-width:600px)");
  const [selectedEnabled, setSelectedEnabled] = React.useState("male");
  const snackbar = useSnackbar();
  const [date, setDate] = useState("");
  const [uploadModal, setUploadModal] = React.useState(false);
  const refForm =useRef(null);
  const refFullName=useRef(null);
  const refPassword=useRef(null);
  const refEmail=useRef(null);
  const refCity=useRef(null);
  const refCountry=useRef(null);
  const handleUploadClick = (e) => {
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    }
  }

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
  const renderInput = (props, openCalendar, closeCalendar) => (
    <div className="input-container">
      <input {...props} />
      <CalendarTodayIcon className="calendar-icon" onClick={openCalendar} />
    </div>
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // const birthday=e.target.birthday.value;
    const city = e.target.city.value;
    const country = e.target.country.value;
    if (!fullname || !email || !password)
      return snackbar.enqueueSnackbar("Unvalid Input", { variant: "error" });

    const formData = new FormData();
    if(profileImage != null)
      formData.append('upload', profileImage);
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('city', city);
    formData.append('birthday', date);
    formData.append('country', country);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post(`${BACKEND_URL}/auth/signup`, formData, config)
      .then((response) => {
        if (response.data.status == "error")
          return snackbar.enqueueSnackbar(
            response.data.error ? response.data.error : "Error",
            { variant: "error" }
          );
        snackbar.enqueueSnackbar("Success", { variant: "success" });
        return Router.push("/");
      });
  };
  const saveProfile=()=>{
    const fullname = refFullName.current.value;
    const email = refEmail.current.value;
    const password = refPassword.current.value;
    // const birthday=e.target.birthday.value;
    const city = refCity.current.value;
    const country = refCountry.current.value;
    // if (!fullname || !email || !password)
    //   return snackbar.enqueueSnackbar("Unvalid Input", { variant: "error" });
    if (!fullname)
      return snackbar.enqueueSnackbar("Enter your name", { variant: "error" });
    if (!email)
      return snackbar.enqueueSnackbar("Enter your email", { variant: "error" });
    if (!validator.isEmail(email))
      return snackbar.enqueueSnackbar("Enter valid email", { variant: "error" });
    if (!password)
      return snackbar.enqueueSnackbar("Enter your password", { variant: "error" });
    if (password.length < 6)
      return snackbar.enqueueSnackbar("Password must be longer than 6 characters", { variant: "error" });
    if (!city)
      return snackbar.enqueueSnackbar("Enter your city", { variant: "error" });
    if (!country)
      return snackbar.enqueueSnackbar("Enter your country", { variant: "error" });

    const formData = new FormData();
    if(profileImage != null)
      formData.append('upload', profileImage);
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('city', city);
    formData.append('birthday', date);
    formData.append('country', country);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post(`${BACKEND_URL}/auth/signup`, formData)
      .then((response) => {
        if (response.data.status == "error") {
          dispatch(actions.createError(response.data.error));
          return snackbar.enqueueSnackbar(
            response.data.error ? response.data.error : "Error",
            { variant: "error" }
          );
        }
        snackbar.enqueueSnackbar("Success", { variant: "success" });
        return Router.push("/login");
      });
  }
  return (
    <GridContainer>
      {!matchesSm ? (
        <GridItem sm={6}>
          <div className={classes.authlogoNavigation}>
            <div className={classes.overlay}></div>
          </div>
        </GridItem>
      ) : null}
      <GridItem sm={6}>
        <GridContainer direction="row" alignItems="center">
          <KeyboardBackspaceOutlinedIcon onClick={() => {Router.push("/")}} className={classes.cursor} />
          <h4 onClick={() => {Router.push("/")}} className={classes.cursor} >&nbsp;Back</h4>
        </GridContainer>
        <GridContainer
          justify="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <GridItem md={9} lg={7} xl={7}>
            <Card
              className={classes[cardAnimaton]}
              style={{ marginBottom: "-30px" }}
            >
              <form ref={refForm} className={classes.form} onSubmit={handleSubmit}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <Link href="/">
                    <a>
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
                    </a>
                  </Link>
                  <h3>Sign Up</h3>
                  <h4>Enter your personal Detail To register</h4>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Full Name..."
                    id="name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "",
                      endAdornment: (
                        <InputAdornment position="end">
                          <PersonOutlineIcon
                            className={classes.inputIconsColor}
                          />
                        </InputAdornment>
                      ),
                      name: "fullname",
                      inputRef:refFullName
                    }}
                  />
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    type="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "email",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                      name: "email",
                      inputRef:refEmail
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="pass"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <LockOutlined className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                      autoComplete: "off",
                      name: "password",
                      inputRef:refPassword
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
                          <FiberManualRecord
                            className={classes.radioUnchecked}
                          />
                        }
                        checkedIcon={
                          <FiberManualRecord className={classes.radioChecked} />
                        }
                        classes={{
                          checked: classes.radio,
                          root: classes.radioRoot,
                        }}
                        color="primary"
                      />
                    }
                    classes={{
                      label: classes.label,
                      root: classes.labelRoot,
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
                          <FiberManualRecord
                            className={classes.radioUnchecked}
                          />
                        }
                        checkedIcon={
                          <FiberManualRecord className={classes.radioChecked} />
                        }
                        classes={{
                          checked: classes.radio,
                          root: classes.radioRoot,
                        }}
                        color="primary"
                      />
                    }
                    classes={{
                      label: classes.label,
                      root: classes.labelRoot,
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
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "",
                      endAdornment: (
                        <InputAdornment position="end">
                          <LocationCityIcon
                            className={classes.inputIconsColor}
                          />
                        </InputAdornment>
                      ),
                      name: "city",
                      inputRef:refCity
                    }}
                  />
                  <CustomInput
                    labelText="Country..."
                    id="country"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "",
                      endAdornment: (
                        <InputAdornment position="end">
                          <LanguageIcon className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                      name: "country",
                      inputRef:refCountry
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button round color="primary" size="lg" onClick={() => setUploadModal(true)}>
                    Sign Up
                  </Button>

                  <Dialog
                    classes={{
                      root: classes.center,
                      paper: classes.modal
                    }}
                    open={uploadModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setUploadModal(false)}
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
                        onClick={() => setUploadModal(false)}
                      >
                        <Close className={classes.modalClose} />
                      </IconButton>
                    </DialogTitle>
                    <DialogContent
                      id="classic-modal-slide-description"
                      className={classes.modalBody}
                    >
                      <GridContainer justify="center" alignItems="center" direction="column">
                        <div className={classes.modalPersonIconWrapper} onClick={handleUploadClick}>
                          {!profileImage && <PersonOutlineIcon className={classes.modalPersonIcon} /> }

                          
                          {profileImage && <Avatar src={URL.createObjectURL(profileImage)} style={{width: "100%", height: "100%"}} />}
                        </div>
                        <div className={classes.modalCustomTitle}>Upload Profile</div>
                        {profileImage ? (
                          <Button onClick={saveProfile} className={classes.modalSkipButton} size="lg" color="primary" round type="submit">
                            Upload
                          </Button>
                        ) : (
                          <Button onClick={saveProfile} className={classes.modalSkipButton} size="lg" color="primary" round type="submit">
                            Skip Now
                          </Button>
                        )}
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" hidden />
                      </GridContainer>
                    </DialogContent>
                  </Dialog>


                  <p>
                    Already have an Account? <Link href="/login">Login</Link>{" "}
                  </p>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}
