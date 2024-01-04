import React, { useState, useEffect, useRef } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
// components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import NavPills from "/components/NavPills/NavPills.js";
// sections for this page
import Card from "/components/Card/Card.js";
import ElevateAppBar from "/components/General/layouts/NavBar.js";
import CustomInput from "/components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
//icons
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LanguageIcon from "@material-ui/icons/Language";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Email from "@material-ui/icons/Email";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import WallpaperOutlinedIcon from '@material-ui/icons/WallpaperOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
//other
import Datetime from "react-datetime";
import Avatar from '@material-ui/core/Avatar';
import MUIButton from '@material-ui/core/Button';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useSnackbar } from "notistack";
//redux
import { useSelector, useDispatch } from "react-redux";
import actions from '../redux/actions';
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
      paddingLeft: "15px",
      paddingRight: "15px"
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
    primaryFont: {
      color: '#000',
      fontSize: '22px',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: 'normal',
    },
    secondTitleFont: {
      color: '#000',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: 'normal',
    },
    secondaryFont: {
      color: '#000',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: 'normal',
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

export default function EditProfile(props) {
  //snackbar
  const snackbar = useSnackbar();
  //other
  const classes = useStyles();
  const { ...rest } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  //redux
  const dispatch = useDispatch();
  const redux_email = useSelector((state) => state.authentication.email);
  const redux_fullname = useSelector((state) => state.authentication.fullname);
  const redux_token = useSelector((state) => state.authentication.token);
  //state
  const [posts, setPosts] = useState({});
  const [membership, setMembership] = useState({});
  const [selectedEnabled, setSelectedEnabled] = React.useState("male");
  const [profileImage, setProfileImage] = useState(null);
  const [prevPassword, setPrevPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //ref
  const refFullName=useRef(null);
  const refEmail=useRef(null);
  const refCity=useRef(null);
  const refCountry=useRef(null);
  const fileInputRef = useRef(null);
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



  // mine
  const handlePrevPasswordChange = (e) => {
    setPrevPassword(e.target.value);
  };
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleChangePassword = () => {
    if(prevPassword === null || prevPassword === undefined || prevPassword === '')
      return snackbar.enqueueSnackbar("Please enter your current password", { variant: "error" });
    if(newPassword === null || newPassword === undefined || newPassword === '')
      return snackbar.enqueueSnackbar("Please enter your new password", { variant: "error" });
    if(confirmPassword === null || confirmPassword === undefined || confirmPassword === '')
      return snackbar.enqueueSnackbar("Please confirm your new password", { variant: "error" });
    if(newPassword !== confirmPassword)
      return snackbar.enqueueSnackbar("Please confirm correctly", { variant: "error" });
    if(newPassword.length < 8)
      return snackbar.enqueueSnackbar("Password must be longer than 8 characters", { variant: "error" });
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
  const handleFileChange = (e) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    }
  }


  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/members/check`, {headers: {token:redux_token}}) //, {headers: {token:redux_token}}
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
        console.log(response.data.data)
        setMembership(response.data.data);
      });
  }, []);

  return (
    <div>
      <ElevateAppBar />
      <div className={classNames(classes.mainRaised)}>
        <div className={classes.sections}>
          <Container maxWidth={false} style={{ maxWidth: "80%", backgroundColor: "#F2F2F3"}} >

            <GridContainer style={{minHeight: "60vh"}}>
              {/* <h2 className={classes.title}>MyProfile</h2> */}
              <GridItem sm={12}>
                  <Card className={classes.cardPadding}>
                    <p className={classes.primaryFont} style={{padding: '20px'}}>Setting</p>
                    <GridContainer>
                      <GridItem sm={12} style={{borderTop: '1px solid #D6D6D6'}}>
                        <NavPills
                          color="primary"
                          direction="column"
                          alignCenter={false}
                          horizontal={{
                            tabsGrid: { xs: 12, sm: 4, md: 4 },
                            contentGrid: { xs: 12, sm: 8, md: 8 }
                          }}
                          tabs={[
                            {
                              tabButton: "Profile Information",
                              tabContent: (
                                <GridContainer style={{marginBottom: '20px'}}>
                                  <GridItem sm={12}>
                                    <p className={classes.primaryFont}>Profile Information</p>
                                    <GridContainer style={{marginTop: '12px'}}>
                                      <GridItem sm={2}>
                                        {!profileImage && <Avatar src={`${BACKEND_URL}/auth/avatars/${redux_email}`} style={{width: "150px", height: "150px", cursor: 'pointer'}} onClick={() => {fileInputRef.current.click();}}>
                                        </Avatar>}
                                        
                                        {profileImage && <Avatar src={URL.createObjectURL(profileImage)}  style={{width: "150px", height: "150px", cursor: 'pointer'}} onClick={() => {fileInputRef.current.click();}} />}
                                      </GridItem>
                                      <GridItem sm={3}>
                                        <GridContainer alignItems="center" style={{height: '100%', marginLeft: '10px'}}>
                                          <p className={classes.secondaryFont}>Change Profile Image</p>
                                        </GridContainer>
                                      </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                      <GridItem sm={3}>
                                        <CustomInput
                                          labelText="Full Name"
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
                                            inputRef:refFullName,
                                            value: redux_fullname
                                          }}
                                        />
                                      </GridItem>
                                      <GridItem sm={3}
                                          style={{paddingTop: '27px'}}>
                                        <Datetime
                                          inputProps={{ placeholder: "Date Of Birth" }}
                                          dateFormat={"YYYY-MM-DD"}
                                          timeFormat={false}
                                          onChange={handleDateChange}
                                          renderInput={renderInput}
                                        />
                                      </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                      <GridItem sm={3}>
                                        <CustomInput
                                        labelText="Email"
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
                                          inputRef:refEmail,
                                          value: redux_email
                                        }}
                                      />
                                      </GridItem>
                                      <GridItem sm={3}>
                                        <CustomInput
                                          labelText="City"
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
                                      </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                      <GridItem sm={3}>
                                        <CustomInput
                                          labelText="Country"
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
                                      </GridItem>
                                      <GridItem sm={3} style={{paddingTop: '27px'}}>
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
                                      </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                      <GridItem sm={12}>
                                        <Button round color="primary">
                                          Save Changes
                                        </Button>
                                      </GridItem>
                                    </GridContainer>
                                  </GridItem>
                                </GridContainer>
                              )
                            },
                            {
                              tabButton: "Change Password",
                              tabContent: (
                                <GridContainer style={{marginBottom: '20px'}}>
                                  <GridItem sm={12}>
                                    <p className={classes.primaryFont}>Change Password</p>
                                    <GridContainer style={{marginTop: '12px'}}>
                                      <GridItem sm={6}>
                                        <CustomInput
                                          labelText="Prev Password"
                                          id="pass"
                                          formControlProps={{
                                            fullWidth: true
                                          }}
                                          onChange={handlePrevPasswordChange}
                                          inputProps={{
                                            type: "password",
                                            autoComplete: "off"
                                          }}
                                        />
                                        <CustomInput
                                          labelText="New Password"
                                          id="pass_new"
                                          formControlProps={{
                                            fullWidth: true
                                          }}
                                          onChange={handleNewPasswordChange}
                                          inputProps={{
                                            type: "password",
                                            autoComplete: "off"
                                          }}
                                        />
                                        <CustomInput
                                          labelText="Confirm Password"
                                          id="pass_confirm"
                                          formControlProps={{
                                            fullWidth: true
                                          }}
                                          onChange={handleConfirmPasswordChange}
                                          inputProps={{
                                            type: "password",
                                            autoComplete: "off"
                                          }}
                                        />
                                        <GridContainer>
                                          <GridItem sm={12}>
                                            <Button round color="primary" onClick={handleChangePassword}>
                                              Save Changes
                                            </Button>
                                          </GridItem>
                                        </GridContainer>
                                      </GridItem>
                                    </GridContainer>
                                  </GridItem>
                                </GridContainer>
                              )
                            },
                            {
                              tabButton: "Membership Plan",
                              tabContent: (
                                <GridContainer style={{marginBottom: '20px'}}>
                                  <GridItem sm={12}>
                                    <p style={{marginLeft: '10px'}} className={classes.primaryFont}>Membership Plan</p>

                                    <GridContainer style={{marginTop: '30px', marginLeft: '20px'}}>
                                      <GridItem sm={6}>
                                        <p className={classes.secondTitleFont}>Daily Membership (7.5$/day)</p>
                                        <p className={classes.secondaryFont}>Able to book an appointment, Able to cancel or reschedule with 7 or more days' notice</p>
                                        <p className={classes.secondaryFont}>(Exp Date: 25 Apr 2023 &middot; Last Purchased: 22 Mar 2023)</p>
                                      </GridItem>
                                      <GridItem sm={3}>
                                        <GridContainer alignItems="center" style={{height: '100%'}}>
                                          <Link href="/memberships/daily">
                                            <Button round color="primary">
                                              Upgrade
                                            </Button>
                                          </Link>

                                          {/* <Button round color="success">
                                            Active
                                          </Button> */}
                                        </GridContainer>
                                      </GridItem>
                                    </GridContainer>
                                    <Divider style={{marginTop: '40px'}} />

                                    <GridContainer style={{marginTop: '20px', marginLeft: '20px'}}>
                                      <GridItem sm={6}>
                                        <p className={classes.secondTitleFont}>Annual Membership (100$/year)</p>
                                        <p className={classes.secondaryFont}>Able to post a sharing contents, Able to book an appointment, Able to cancel or reschedule appointments 7 or more days in advance</p>
                                        <p className={classes.secondaryFont}>(Exp Date: 25 Apr 2023 &middot; Last Purchased: 22 Mar 2023)</p>
                                      </GridItem>
                                      <GridItem sm={3}>
                                        <GridContainer alignItems="center" style={{height: '100%'}}>
                                          <Link href="/memberships/annual">
                                            <Button round color="primary">
                                              Upgrade
                                            </Button>
                                          </Link>
                                        </GridContainer>
                                      </GridItem>
                                    </GridContainer>
                                    <Divider style={{marginTop: '40px'}} />
                                  </GridItem>
                                </GridContainer>
                              )
                            },
                          ]}
                        />
                      </GridItem>
                    </GridContainer>
                  </Card>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" hidden />
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
