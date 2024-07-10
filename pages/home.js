import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
import Router from "next/router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
// @material-ui/icons
// core components
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Grid from "@material-ui/core/Grid";
import Button from "/components/CustomButtons/Button.js";
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
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import Slider from "react-slick";
import NavPills from "/components/NavPills/NavPills.js";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import RoomIcon from "@material-ui/icons/Room";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import CustomInput from "/components/CustomInput/CustomInput.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import styles from "/styles/jss/nextjs-material-kit/pages/components.js";
import { Container, IconButton, Typography } from "@material-ui/core";
//hook
import { useCheckTokenValidity } from "../redux/hooks.js";
//redux
import actions from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
//other
import { useSnackbar } from "notistack";
import CustomScroll from "react-custom-scroll";
import axios from "axios";
import { BACKEND_URL } from "../AppConfigs";
import { removeCookie } from "../utils/cookie";
import { DEAUTHENTICATE } from "../redux/types/authTypes";
import Staff from "./home/staff.js";

const useStyles = makeStyles((theme) => {
  return {
    ...styles,
    slideCard: {
      backgroundColor: "#F5F5F5",
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
  };
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
        top: "100%", // Adjust the position as needed
        transform: "translateY(-50%)",
        cursor: "pointer",
        zIndex: "0",
        opacity: "1",
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
        top: "100%", // Adjust the position as needed
        transform: "translateY(-50%)",
        cursor: "pointer",
        zIndex: "1",
        left: "80%",
      }}
      onClick={onClick}
    >
      <ArrowBackIcon></ArrowBackIcon>
    </div>
  );
}

export default function Home(props) {
  //snackbar
  const snackbar = useSnackbar();
  const dispatch = useDispatch();

  const classes = useStyles();
  const { ...rest } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [headerSlide, setHeaderSlide] = useState(0);
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
  const [abouthealing, setAboutHealing] = useState(true);
  const [storyhealing, setStoryHealing] = useState(true);
  const [aboutdean, setAboutDean] = useState(true);
  const [aboutrebecca, setAboutRebecca] = useState(true);
  const [aboutpeter, setAboutPeter] = useState(true);
  const [aboutpriory, setAboutPriory] = useState(true);

  const redux_token = useSelector((state) => state.authentication.token);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => (
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
    customPaging: (i) => (
      <div
        style={{
          width: i === currentSlide ? "20px" : "20px",
          height: i === currentSlide ? "20px" : "20px",
          border: "1px solid black",
          borderRadius: "100%",
          borderColor: "#2E3192",
          backgroundColor: i === currentSlide ? "#2E3192" : "white",
          padding: "5px",
        }}
      ></div>
    ),
    afterChange: (current) => setCurrentSlide(current),
  };
  const headerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    // nextArrow: <div></div>,
    // prevArrow: <div></div>,
    customPaging: (i) => (
      <div
        style={{
          width: i === headerSlide ? "20px" : "20px",
          height: i === headerSlide ? "20px" : "20px",
          border: "1px solid white",
          borderRadius: "100%",
          borderColor: "white",
          backgroundColor: i === headerSlide ? "white" : "transparent",
          padding: "5px",
          marginTop: "150px",
        }}
      ></div>
    ),
    afterChange: (current) => setHeaderSlide(current),
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

  const handleDailyMembership = () => {
    if (redux_token == null || redux_token == undefined) {
      return snackbar.enqueueSnackbar("Sign in first", { variant: "info" });
    } else {
      return Router.push("/memberships/daily");
    }
  };

  const handleAnnualMembership = () => {
    if (redux_token == null || redux_token == undefined) {
      return snackbar.enqueueSnackbar("Sign in first", { variant: "info" });
    } else {
      return Router.push("/memberships/annual");
    }
  };

  //component mount
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/auth/verify`, { headers: { token: redux_token } })
      .then((response) => {
        //error handler
        if (response.data.status == "error") {
          const { error } = response.data;
          if (error == "AUTH_ERROR") {
            removeCookie("token");
            removeCookie("fullname");
            removeCookie("email");
            removeCookie("membership");
            dispatch({ type: DEAUTHENTICATE });
          } else {
            dispatch(actions.createError(data));
            snackbar.enqueueSnackbar(
              response.data.data ? response.data.data : "Error",
              { variant: "error" }
            );
          }
        }
      });
  }, []);
  const handleAboutHealing = () => {
    // console.log("hello")
    setAboutHealing(!abouthealing);
  };
  const handleStoryHealing = () => {
    setStoryHealing(!storyhealing);
  };
  const handleAboutDean = () => {
    setAboutDean(!aboutdean);
  };
  const handleAboutRebecca = () => {
    setAboutRebecca(!aboutrebecca);
  };
  const handleAboutPeter = () => {
    setAboutPeter(!aboutpeter);
  };
  const handleAboutPriory = () => {
    setAboutPriory(!aboutpriory);
  };
  return (
    <div>
      <Header
        style={{
          fontFamily: "satoshi",
        }}
        brand=""
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      {/* <Parallax image="/img/brandon-morgan.png" className={classes.homeheaderImg}
       id="home_section">
        <div className={classes.overlay}></div>
        <div className={classes.container}>
          <Carousel {...headerSettings}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title} style={{ color: 'white' }}>Holistic Healing and Spiritual Ascendance</h1>
                  <h3 className={classes.subtitle}>
                    Experience Hands-On Healing & Divine Wellness Today!
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title} style={{ color: 'white' }}>Healing the Mind Body and Spirit</h1>
                  <h3 className={classes.subtitle}>
                    Your Journey to Bio-Energetic Healing Begins Here
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title} style={{ color: 'white' }}>Church of Divine Structure Awaits Your Transformation</h1>
                  <h3 className={classes.subtitle}>
                    Embrace Holistic Wellness
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
          </Carousel>
        </div>
        <img src="/img/CoDS_Black_Logo_Big.png" alt="..." style={{ position: 'absolute', bottom: '-100px', left: '50%', transform: 'translateX(-50%)', zIndex: '2' }}></img>
      </Parallax> */}
      <img
        src="/img/dean_lebecca.png"
        alt="img"
        style={{ marginTop: "70px", width: "100%" }}
      ></img>
      <div
        style={{
          backgroundColor: "#2E3192",
          paddingTop: "40px",
          paddingBottom: "40px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "48px", fontWeight: "700", color: "white", fontFamily: 'satoshi' }}>
          Welcome to the Home of True Healing!
        </div>
        <div
          style={{
            fontSize: "40px",
            fontWeight: "700",
            color: "white",
            marginTop: "40px",
            fontFamily: 'satoshi'
          }}
        >
          Join with us and gain access to
        </div>
        <div
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "white",
            marginTop: "40px",
            fontFamily: 'satoshi'
          }}
        >
          Hands-on Healing, Healing Guidance, Healing Training, Healing
          Products, Baked Health Foods
        </div>
      </div>
      <div style={{ width: "100%", textAlign: "center" }}>
        <img
          src="/img/CoDS_Black_Logo_Big.png"
          style={{ height: "160px", width: "286px", margin: "auto" }}
        />
      </div>
      <div
        className={classNames(classes.main, classes.mainRaised)}
        id="about_section"
        style={{ margin: "0px" }}
      >
        <div className={classes.sections}>
          <Container maxWidth={false} style={{ maxWidth: "80%" }}>
            {/* <div className={classes.container}> */}
            <GridContainer justify="center">
              <GridItem xs={12} sm={6}>
                <div style={{ position: "relative" }}>
                  <GridContainer justify="center">
                    <img
                      src="/img/cods.png"
                      style={{
                        width: "70%",
                        top: "50px",
                        position: "absolute",
                      }}
                    ></img>
                  </GridContainer>
                  <img
                    src="/img/Group 1000001813.png"
                    style={{
                      position: "absolute",
                      width: "35%",
                      bottom: "30px",
                      left: "15px",
                    }}
                  ></img>

                  <img
                    src="/img/sixteen-miles.png"
                    alt="..."
                    style={{ width: "100%" }}
                  ></img>
                </div>
              </GridItem>
              <GridItem xs={12} sm={6}>
                <h4
                  className={classes.title}
                  style={{ color: "#2E3192", fontSize: "20px", fontFamily: 'satoshi' }}
                >
                  Hands-on Healing, Intutive Cuidance and Unusual Healing
                  Products
                </h4>
                <h1 className={classes.title} style={{ fontSize: "36px" }}>
                  <span style={{ color: "#2E3192", fontFamily: 'satoshi' }}>Who We Are </span>
                </h1>
                <Carousel {...settings}>
                  <div>
                    <p style={{ fontSize: "18px", lineHeight: "200%", fontFamily: 'satoshi' }}>
                      Why are Rev Dr Howell and Rev Rebecca treating and healing
                      people as ministers of a Church rather than working as a
                      naturopathic physician and massage therapist? CODS (Church
                      of Divine Structure Priory 175 Inc.), first and foremost,
                      a healing organization. We have been organized as a
                      private membership association since 2001. We believe in
                      healing rather than to sell you treatments as a form of
                      commerce. (We hope that our Church will raise enough money
                      so that we can have a healing center and not always ask
                      for money for services.)
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: "18px", lineHeight: "200%", fontFamily: 'satoshi' }}>
                      The medical system utilizes fear to control you and the
                      therapists who treat you. The system insists on
                      determining the training and education of all
                      professionals, restrict people’s access to them with
                      professional licensing and insurance requirements, then
                      threaten the professionals with liability fears to control
                      their actions so that they will perform “legally” which is
                      rarely the best course for the people’s health. All of
                      these things are performed in the LEGAL world by our
                      corporate names (like on your driver’s license with YOUR
                      NAME IN CAPITALS), showing that our bodies are the surety
                      (paying fines and staying in jails) to enforce legal
                      behavior by the people (as corporations following
                      corporate laws). We are always “conducting commerce,” so
                      we always obey all corporate rules and pay all corporate
                      fines and fees. Yes, all of this is essential to help the
                      system to control us, but it also makes it unlikely that
                      you can be healed.
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: "18px", lineHeight: "200%", fontFamily: 'satoshi' }}>
                      Why do we mean? For example, in the 1980s Dr. Howell was
                      trained in naturopathic medical school to treat laboratory
                      diagnosed pernicious anemia with injections of vitamin
                      B-12. He had a few patients with anemia and treated them
                      with the injections. (Oral vitamin B-12 does not treat
                      pernicious anemia, only intramuscular vitamin injections.)
                      The State of Washington prosecuted him and revoked his
                      naturopathic medical license in 1991 for breaking the law.
                      Yet he was safely performing the medically appropriate
                      therapy as he was trained within the new laws that the
                      State had passed to confirm that naturopathic physicians
                      were well-trained. However, the new scope of practice
                      defined in the newly passed laws did not apply to past
                      actions, like B-12 injections he performed in 1986.{" "}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: "18px", lineHeight: "200%", fontFamily: 'satoshi'}}>
                      The State maintains that medical practice laws are to
                      protect the consumer, but there are many cases of
                      malpractice despite these laws. Statistically, it is said
                      that 98% of all malpractice is forgiven by the victims!
                      Then, because of these laws protecting 2% of the victims,
                      malpractice and practice laws give state bureaucrats an
                      ability to redefine and control what services that the
                      health care professionals can perform---regardless of
                      their training and experience. Instead, bureaucrats can
                      decide which treatments, therapies, foods, and herbs that
                      people can get access to. It often blocks the best choices
                      of the therapist. What has been happening lately, instead,
                      is that many useful treatments are banned, making useful
                      therapies unavailable, even to skilled doctors. Whenever a
                      licensed health practitioner goes to work, he/she must
                      only offer services that are within the scope of practice
                      as defined by the State, regardless of his/her training
                      background and expertise.{" "}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: "18px", lineHeight: "200%", fontFamily: 'satoshi' }}>
                      All of the ministers and deacons of CoDS are lawfully and
                      legally-recognized, sanctified healers, able to work
                      anywhere, worldwide. We are all members of the Sacred
                      Medical Order of the Knights of Hope (aka SMOKH). SMOKH is
                      the healing branch of the Knights of Saint John, the
                      knights who are healers and hospitalers for the Knights of
                      Malta. The Knights of St. John has only performed as
                      Hospitalers for centuries. Our Order joined with them to
                      provide healing services for them. Therefore, we are
                      healers for the Knights of Hope, the Knights of St. John,
                      and the Knights of Malta, and are accepted and recognized
                      by the UN and governments all over the world. We have many
                      goals for our Church community. There are online goals:
                      Our goal is to create a living community of Church members
                      to foster true healing.{" "}
                    </p>
                  </div>
                  {/* <div>
                    <p style={{ fontSize: "18px", lineHeight: "200%" }}>We find that true healing cannot occur with simple medicines. Instead, Dr. Howell and Dame Rebecca multifactorial approach must be taken to create a path to follow to true healing.
Our founders, through the misery of watching their patients die, have tried many methods, and almost all of them failed. Health on Earth is generally deplorable! They have discovered, though, that with the correct combination of body structural work, detoxification, parasite, yeast, and fungus protocols, radionics, Grander technology, lifestyle modification, home improvements, and generally saner living, that it is possible to heal!
But, because of the highly controlled Internet and social media, we are unable to openly talk about these health and healing issues on the “free” internet. We have already been banned from Facebook once for posting a video where the word “healed” was used (to describe Dr. Howell’s treatment results). Did you know that “heal” is an inappropriate, four-letter word to management at Facebook? To say “heal” there is the same to them as cursing with words such as fuck or shit (or worse) to us. But those swear words are all okay on Facebook! Other times our postings on YouTube and social media have simply disappeared! </p>
                  </div> */}
                  <div>
                    <p style={{ fontSize: "18px", lineHeight: "200%", fontFamily: 'satoshi' }}>
                      Frustrated with the informational political and technology
                      scene, we gave up trying to work within that system. We
                      decided that Church of Divine Structure should create a
                      paid members’ site with extensive articles, (an ever
                      increasing) video library, semi-monthly newsletter, access
                      to private label supplements outside the FDA system
                      (legitimized by being for members only), and a member
                      bulletin board. Website members will also have access to
                      the treatment schedule for Dr. Howell and Dame Rebecca, so
                      appointments can be made without needing interaction with
                      the front office. We call this new, safe digital space by
                      its Internet address: CoDS.Land{" "}
                    </p>
                  </div>
                </Carousel>
              </GridItem>
            </GridContainer>
            {/*  Services */}
            <div
              style={{ backgroundColor: "#C0C1DE", marginTop: "10px" }}
              id="service_section"
            >
              {/* <GridContainer justify="center" style={{ marginTop: "70px" }}>
                <img src="/img/CoDS_Black_Logo.png" alt="...."></img>
              </GridContainer> */}
              <GridContainer justify="center">
                <div
                  style={{
                    color: "#2E3192",
                    fontSize: "20px",
                    fontWeight: "700",
                    marginTop: "50px",
                    fontFamily: 'satoshi'
                  }}
                >
                  Spiritual Healer Near Me
                </div>
              </GridContainer>
              <GridContainer
                alignItems="center"
                direction="column"
                style={{ marginTop: "20px" }}
              >
                <div>
                  <span
                    style={{
                      color: "#2E3192",
                      fontSize: "45px",
                      fontWeight: "700",
                      fontFamily: 'satoshi'
                    }}
                  >
                    CODS is the Association for True Healing
                  </span>
                </div>
              </GridContainer>
              <GridContainer justify="center">
                <div
                  style={{
                    color: "#2E3192",
                    marginBottom: "0px",
                    fontSize: "21px",
                    fontWeight: "500",
                    marginTop: "20px",
                    fontFamily: 'satoshi'
                  }}
                >
                  At Church of Divine Structure, our healing services encompass
                  four fundamental categories, tailored to nurture true hand-on
                  healing.
                </div>
              </GridContainer>
            
              <GridContainer style={{ marginTop: "30px" }}>
                <GridItem xl={3} md={4}>
                  <img
                    src="/img/Rectangle 3847.png"
                    style={{ width: "100%", position: "relative" }}
                  ></img>
                  <img
                    src="/img/Frame.png"
                    style={{
                      width: "40%",
                      position: "absolute",
                      top: "70px",
                      left: "70px",
                    }}
                  ></img>
                  <img
                    src="/img/01.png"
                    style={{
                      width: "35%",
                      position: "absolute",
                      top: "85px",
                      right: "90px",
                    }}
                  ></img>
                  <GridContainer justify="center">
                    <div style={{ position: "absolute", top: "210px" }}>
                      <div
                        style={{
                          color: "#2E3192",
                          fontSize: "21px",
                          fontWeight: "600",
                          fontFamily: 'satoshi'
                        }}
                      >
                        Hands-On Healing
                      </div>
                    </div>
                  </GridContainer>
                  <GridContainer justify="center">
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "black",
                        position: "absolute",
                        top: "240px",
                        width: "70%",
                        textAlign: "center",
                        fontFamily: 'satoshi'
                      }}
                    >
                      Our skilled healers have developed unique and powerful
                      methods to treat new and chronic injuries and energy
                      blockages with accumulative, lasting benefits.
                    </div>
                  </GridContainer>
                  <GridContainer justify="center">
                    <a
                      href="www.drdeanhowell.com"
                      style={{
                        color: "#2E3192",
                        fontSize: "15px",
                        position: "absolute",
                        top: "350px",
                        fontFamily: 'satoshi'
                      }}
                    >
                      www.drdeanhowell.com
                    </a>
                  </GridContainer>
                </GridItem>
                <GridItem xl={3} md={4}>
                  <img
                    src="/img/Rectangle 3848.png"
                    style={{ width: "100%", position: "relative" }}
                  ></img>
                  <img
                    src="/img/Frame.png"
                    style={{
                      width: "40%",
                      position: "absolute",
                      top: "40px",
                      left: "70px",
                    }}
                  ></img>
                  <img
                    src="/img/02.png"
                    style={{
                      width: "35%",
                      position: "absolute",
                      top: "45px",
                      right: "90px",
                    }}
                  ></img>
                  <GridContainer justify="center">
                    <div style={{ position: "absolute", top: "190px" }}>
                      <div
                        style={{
                          color: "white",
                          fontSize: "21px",
                          fontWeight: "600",
                          fontFamily: 'satoshi'
                        }}
                      >
                        Intuitive Guidance
                      </div>
                    </div>
                  </GridContainer>
                  <GridContainer justify="center">
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "white",
                        position: "absolute",
                        top: "220px",
                        width: "70%",
                        textAlign: "center",
                        fontFamily: 'satoshi'
                      }}
                    >
                      Our expertise is to find the right course of bodily and
                      lifestyle corrections to guide you towards healing.
                    </div>
                  </GridContainer>
                  <GridContainer justify="center">
                    <a
                      href="www.angelreadings.live"
                      style={{
                        color: "white",
                        fontSize: "15px",
                        position: "absolute",
                        top: "310px",
                        fontFamily: 'satoshi'
                      }}
                    >
                      www.angelreadings.live
                    </a>
                  </GridContainer>
                </GridItem>
                <GridItem xl={3} md={4}>
                  <img
                    src="/img/Rectangle 3847.png"
                    style={{ width: "100%", position: "relative" }}
                  ></img>
                  <img
                    src="/img/Frame.png"
                    style={{
                      width: "40%",
                      position: "absolute",
                      top: "70px",
                      left: "70px",
                    }}
                  ></img>
                  <img
                    src="/img/03.png"
                    style={{
                      width: "35%",
                      position: "absolute",
                      top: "85px",
                      right: "90px",
                    }}
                  ></img>
                  <GridContainer justify="center">
                    <div style={{ position: "absolute", top: "210px" }}>
                      <div
                        style={{
                          color: "#2E3192",
                          fontSize: "21px",
                          fontWeight: "600",
                          fontFamily: 'satoshi'
                        }}
                      >
                        Natural remedies
                      </div>
                    </div>
                  </GridContainer>
                  <GridContainer justify="center">
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "black",
                        position: "absolute",
                        top: "240px",
                        width: "70%",
                        textAlign: "center",
                        fontFamily: 'satoshi'
                      }}
                    >
                      There are two ways to utilize supplementation: treat the
                      symptoms and side effects that you are suffering or
                      correct the causes of your problems.
                    </div>
                  </GridContainer>
                  <GridContainer justify="center">
                    <a
                      href="www.theessenceoflife.com"
                      style={{
                        color: "#2E3192",
                        fontSize: "15px",
                        position: "absolute",
                        top: "350px",
                        fontFamily: 'satoshi'
                      }}
                    >
                      www.theessenceoflife.com
                    </a>
                  </GridContainer>
                </GridItem>
                <GridItem xl={3} md={4}>
                  <img
                    src="/img/Rectangle 3848.png"
                    style={{ width: "100%", position: "relative" }}
                  ></img>
                  <img
                    src="/img/Frame.png"
                    style={{
                      width: "40%",
                      position: "absolute",
                      top: "40px",
                      left: "70px",
                    }}
                  ></img>
                  <img
                    src="/img/04.png"
                    style={{
                      width: "35%",
                      position: "absolute",
                      top: "45px",
                      right: "90px",
                    }}
                  ></img>
                  <GridContainer justify="center">
                    <div style={{ position: "absolute", top: "190px" }}>
                      <div
                        style={{
                          color: "white",
                          fontSize: "21px",
                          fontWeight: "600",
                          fontFamily: 'satoshi'
                        }}
                      >
                        Repair Your Environment
                      </div>
                    </div>
                  </GridContainer>
                  <GridContainer justify="center">
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "white",
                        position: "absolute",
                        top: "220px",
                        width: "70%",
                        textAlign: "center",
                        fontFamily: 'satoshi'
                      }}
                    >
                      We are inundated with bad things in our world! Here we
                      feature products to protect your body and your home and
                      office from some of them
                    </div>
                  </GridContainer>
                  <GridContainer justify="center">
                    <a
                      href="www.theessenceoflife.com/CODS.Energetics"
                      style={{
                        color: "white",
                        fontSize: "15px",
                        position: "absolute",
                        top: "320px",
                        fontFamily: 'satoshi'
                      }}
                    >
                      www.theessenceoflife.com
                    </a>
                  </GridContainer>
                </GridItem>
                <GridItem xl={3} md={4}>
                  <img
                    src="/img/Rectangle 3847.png"
                    style={{ width: "100%", position: "relative" }}
                  ></img>
                  <img
                    src="/img/Frame.png"
                    style={{
                      width: "40%",
                      position: "absolute",
                      top: "70px",
                      left: "70px",
                    }}
                  ></img>
                  <img
                    src="/img/05.png"
                    style={{
                      width: "35%",
                      position: "absolute",
                      top: "85px",
                      right: "90px",
                    }}
                  ></img>
                  <GridContainer justify="center">
                    <div
                      style={{
                        position: "absolute",
                        top: "210px",
                        textAlign: "center",
                        left: "50px",
                      }}
                    >
                      <div
                        style={{
                          color: "#2E3192",
                          fontSize: "21px",
                          fontWeight: "600",
                          width: "80%",
                          fontFamily: 'satoshi'
                        }}
                      >
                        Healing Training with the Developers
                      </div>
                    </div>
                  </GridContainer>
                  <GridContainer justify="center">
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "black",
                        position: "absolute",
                        top: "260px",
                        width: "70%",
                        textAlign: "center",
                        fontFamily: 'satoshi'
                      }}
                    >
                      We offer three healing trainings to CODS Members. We are
                      offering NCR Practitioner Training, Howelling
                      Methodologies, and Energy Healing with Rebecca courses in
                      2024 and 2025.
                    </div>
                  </GridContainer>
                  <GridContainer justify="center">
                    <a
                      href="www.theessenceoflife.com"
                      style={{
                        color: "#2E3192",
                        fontSize: "15px",
                        position: "absolute",
                        top: "380px",
                        fontFamily: 'satoshi'
                      }}
                    >
                      www.theessenceoflife.com
                    </a>
                  </GridContainer>
                </GridItem>
                <GridItem xl={3} md={4}>
                  <img
                    src="/img/Rectangle 3848.png"
                    style={{
                      width: "100%",
                      height: "531px",
                      position: "relative",
                    }}
                  ></img>
                  <img
                    src="/img/Frame.png"
                    style={{
                      width: "30%",
                      position: "absolute",
                      top: "40px",
                      left: "70px",
                    }}
                  ></img>
                  <img
                    src="/img/06.png"
                    style={{
                      width: "35%",
                      position: "absolute",
                      top: "45px",
                      right: "90px",
                    }}
                  ></img>
                  <GridContainer justify="center">
                    <div
                      style={{
                        position: "absolute",
                        top: "160px",
                        width: "75%",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: "white",
                          fontSize: "19px",
                          fontWeight: "600",
                          fontFamily: 'satoshi'
                        }}
                      >
                        Missing your bakery? Here's our unique solution!
                      </div>
                    </div>
                  </GridContainer>
                  <GridContainer justify="center">
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "white",
                        position: "absolute",
                        top: "210px",
                        width: "70%",
                        textAlign: "center",
                        fontFamily: 'satoshi'
                      }}
                    >
                      We offer three healing trainings to CODS Members. We are
                      offering NCR Practitioner Training, Howelling
                      Methodologies, and Energy Healing with Rebecca courses in
                      2024 and 2025.
                    </div>
                  </GridContainer>
                  <GridContainer justify="center">
                    <a
                      href="www.getncrtraining.com"
                      style={{
                        color: "white",
                        fontSize: "15px",
                        position: "absolute",
                        top: "330px",
                        fontFamily: 'satoshi'
                      }}
                    >
                      www.theessenceoflife.com
                    </a>
                  </GridContainer>
                </GridItem>
                <GridItem xl={3} md={4}>
                  <img
                    src="/img/Rectangle 3847.png"
                    style={{ width: "100%", position: "relative" }}
                  ></img>
                  <img
                    src="/img/Frame.png"
                    style={{
                      width: "40%",
                      position: "absolute",
                      top: "70px",
                      left: "70px",
                    }}
                  ></img>
                  <img
                    src="/img/07.png"
                    style={{
                      width: "35%",
                      position: "absolute",
                      top: "85px",
                      right: "90px",
                    }}
                  ></img>
                  <GridContainer justify="center">
                    <div
                      style={{
                        position: "absolute",
                        top: "210px",
                        textAlign: "center",
                        left: "40px",
                      }}
                    >
                      <div
                        style={{
                          color: "#2E3192",
                          fontSize: "21px",
                          fontWeight: "600",
                          width: "90%",
                          fontFamily: 'satoshi'
                        }}
                      >
                        Members can buy Radionics equipment and training courses
                      </div>
                    </div>
                  </GridContainer>
                  <GridContainer justify="center">
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "black",
                        position: "absolute",
                        top: "290px",
                        width: "70%",
                        textAlign: "center",
                        fontFamily: 'satoshi'
                      }}
                    >
                      Our equipment is all American made and designed by
                      world-renowned radionics inventor and author Peter
                      Radatti.
                    </div>
                  </GridContainer>
                  <GridContainer justify="center">
                    <a
                      href="www.theessenceoflife.com"
                      style={{
                        color: "#2E3192",
                        fontSize: "15px",
                        position: "absolute",
                        top: "380px",
                        fontFamily: 'satoshi'
                      }}
                    >
                      www.theessenceoflife.com
                    </a>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </div>
            <GridContainer
              justify="center"
              style={{ backgroundColor: "#F8F8F8", margin: "0px" }}
            >
              <GridItem
                sm={6}
                style={{ textAlign: "right", paddingTop: "60px" }}
              >
                <div
                  style={{
                    color: "#2E3192",
                    fontSize: "37px",
                    fontWeight: "700",
                    fontFamily: 'satoshi'
                  }}
                >
                  Our Journey to Dynamic
                </div>
                <div
                  style={{
                    color: "#2E3192",
                    fontSize: "37px",
                    fontWeight: "700",
                    marginTop: "15px",
                    fontFamily: 'satoshi'
                  }}
                >
                  Energetic Healing
                </div>
                <div
                  style={{
                    color: "#2E3192",
                    fontSize: "16px",
                    fontWeight: "700",
                    marginTop: "15px",
                    fontFamily: 'satoshi'
                  }}
                >
                  Unraveling the Path to Wellness
                </div>
                <div
                  style={{
                    marginTop: "50px",
                    height: "250px",
                    overflowY: "scroll",
                    fontSize: "18px",
                    textAlign: "left",
                    marginLeft: "190px",
                    fontFamily: 'satoshi'
                  }}
                >
                  In the heart of our shared history lies a transformative tale,
                  woven by the hands of healers and visionaries, Rev Dr. Dean
                  Howell and Rev Rebecca Hart Malter. With over four decades of
                  healing and counseling experience, Dr. Dean's expertise in
                  NeuroCranial Restructuring melds seamlessly with Rebecca's
                  profound skills in Body Electronics and medical psychic
                  abilities. Together, as life partners, they embarked on a
                  remarkable journey within the realm of holistic health. Dr.
                  Dean with 41 years of masterful expertise under his belt and
                  Rebecca, with illustrious
                </div>
                <Button
                  style={{ backgroundColor: "#2E3192", marginTop: "20px" }}
                >
                  Explore
                </Button>
              </GridItem>
              <GridItem sm={6} style={{ paddingTop: "30px" }}>
                <img
                  src="/img/dean_wedding.png"
                  style={{ width: "100%" }}
                ></img>
              </GridItem>
            </GridContainer>

            <GridContainer
              justify="center"
              style={{
                marginLeft: "0px",
                marginRight: "0px",
                marginTop: "50px",
                position: "relative",
                cursor: "pointer",
              }}
            >
              {/* <img src="/img/dean_video.png" style={{ width: "100%" }}></img>
              <img
                src="/img/logos_youtube-icon.png"
                style={{ position: "absolute", left: "45%", bottom: "45%" }}
              ></img> */}
              <iframe width="100%" height="800" src="https://www.youtube.com/embed/R3tVgmDPUh8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </GridContainer>
            <GridContainer
              justify="center"
              style={{
                marginTop: "70px",
                backgroundColor: "#F8F8F8",
                paddingBottom: "30px",
              }}
              id="product_section"
            >
              <GridItem style={{ textAlign: "center" }}>
                <img
                  src="/img/CoDS_Black_Logo.png"
                  alt="...."
                  style={{ width: "264px" }}
                ></img>
                <div
                  style={{
                    marginTop: "20px",
                    color: "#2E3192",
                    fontSize: "45px",
                    fontWeight: "700",
                    fontFamily: 'satoshi'
                  }}
                >
                  AT CoDS, WE ARE ALL ABOUT HEALING
                </div>
                <div
                  style={{
                    marginTop: "40px",
                    color: "#475569",
                    fontSize: "24px",
                    lineHeight: "55px",
                    maxHeight: abouthealing ? "210px" : "100%",
                    overflow: "hidden",
                    fontFamily: 'satoshi'
                  }}
                >
                  When people think of getting healthy, they think that they
                  need treatments. This is the commerce-based concept that we
                  have all accepted. Why? How can you be healed by therapists
                  who will only treat you? Rev Dr Howell and Rev Rebecca decided
                  to be healers instead. Dr Howell closed his practice years ago
                  and became Rev Dr Howell instead. Health centers and clinics
                  can be organized outside the US governmental system within
                  Churches. CoDS is a worldwide healing community with its
                  headquarters in Okanogan County, Washington. We are affiliated
                  with the Eastern Orthodox Catholic Church. The Catholic Church
                  meant the universal church, the church of the whole world. The
                  Eastern Orthodox Catholic Church was originally founded in
                  Rome by Saint Peter. Emperor Constantine decided that the
                  Roman churchmen were too corrupt to be true Christians, so he
                  moved the Catholic Church to Constantinople. Later the Church
                  was moved to Brazil, where it is located today. Another
                  “Catholic” church was started in Rome in the 400s AD, and that
                  is the Roman Catholic Church organization of today, even at
                  its beginnings it was the corrupt organization that it
                  remains. The Knights of St. John was founded in 1653 to serve
                  as the healers and hospitallers for the Knights of Malta. The
                  Church of Hope is only healing order that still remains in the
                  Knights of St. John. The Church of Divine Structure Priory No.
                  175 is an auxiliary of the Church of Hope. Ecclesiastically,
                  all of our ministers and deacons are members of the Sacred
                  Medical Order of the Knights and Dames of Hope. We are led by
                  our visionaries, Reverend Doctor Dean Howell and Reverend
                  Rebecca Hart Malter.
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    color: "rgba(71, 85, 105, 0.5)",
                    marginTop: "30px",
                    cursor: "pointer",
                  }}
                  onClick={handleAboutHealing}
                >
                  {abouthealing ? "Read More" : "Read Less"}
                </div>
                {abouthealing ? (
                  <img
                    src="/img/vector.png"
                    style={{ cursor: "pointer" }}
                  ></img>
                ) : (
                  ""
                )}
                <div style={{ marginTop: "100px" }}>
                  <GridContainer>
                    <GridItem sm={4}>
                      <img src="/img/Rectangle 3860.png"></img>
                    </GridItem>
                    <GridItem sm={8}>
                      <div
                        style={{
                          color: "#475569",
                          fontSize: "30px",
                          fontWeight: "800",
                          textAlign: "left",
                          fontFamily: 'satoshi'
                        }}
                      >
                        Reverend Dr Dean Howell
                      </div>
                      <div
                        style={{
                          color: "#475569",
                          fontSize: "24px",
                          fontWeight: "700",
                          textAlign: "left",
                          marginTop: "20px",
                          maxHeight: aboutdean ? "180px" : "100%",
                          overflow: "hidden",
                          lineHeight: "36px",
                          fontFamily: 'satoshi'
                        }}
                      >
                        became a naturopathic physician in 1982 because he was
                        determined to treat the causes of people’s ailments.
                        But, he discovered, almost all medical AND naturopathic
                        medical care was designed to bring the medical consumer
                        relief of symptoms. The naturopathic solutions were
                        slower and usually more effective than the others
                        available—but they were often not cures, either. Dr.
                        Howell worked for ten years at his naturopathic family
                        practice before he realized the folly of his commercial
                        naturopathic practice. Commerce and healing could not
                        co-exist, he decided. He closed his large family
                        practice clinic in Everett, WA and slowly began a
                        healing practice, developing... NeuroCranial
                        Restructuring, a bio-mechanical, accumulative
                        manipulation technique in the 1990s. He continued to
                        develop and improve his hands-on healing techniques and
                        has continued exploring healing methods that are
                        out-of-the- ordinary. Knowing that he had been targeted
                        and had his license revoked for administering vitamin
                        B-12, Dr Howell set up his healing business outside of
                        the commerce system where medical licensing boards
                        controlled everything. that he might become legally
                        targeted, he changed his healing practice into a private
                        membership association. He set this up as NCR-01, a
                        not-for-profit, private membership association in 2001.
                        More recently, Dr. Howell’s spiritual, healing path made
                        him realize the depth of his faith. He became religious
                        again. In order to legally demonstrate their
                        convictions, he and Reverend Rebecca joined the Church
                        of Hope as Ministers and Sanctified Healers. They were
                        ordained as Eastern Orthodox Catholic ministers in 2019.
                        NCR-01 legally transformed itself into the Church of
                        Divine Structure, Priory No. 175 of the Church of Hope.
                        As members of the Sacred Medical Order of the Knights of
                        Hope, their healing credentials are accepted by the
                        United Nations so that they are accepted as healers
                        anywhere they choose to go.
                      </div>
                      <div
                        style={{
                          fontSize: "24px",
                          color: "rgba(71, 85, 105, 0.5)",
                          marginTop: "30px",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                        onClick={handleAboutDean}
                      >
                        {aboutdean ? "Read More" : "Read Less"}
                      </div>
                    </GridItem>
                  </GridContainer>
                </div>
                <div style={{ marginTop: "50px" }}>
                  <GridContainer>
                    <GridItem sm={8}>
                      <div
                        style={{
                          color: "#475569",
                          fontSize: "30px",
                          fontWeight: "800",
                          textAlign: "right",
                          fontFamily: 'satoshi'
                        }}
                      >
                        Reverend Rebecca Hart Malter
                      </div>
                      <div
                        style={{
                          color: "#475569",
                          fontSize: "24px",
                          fontWeight: "700",
                          textAlign: "right",
                          marginTop: "20px",
                          maxHeight: aboutrebecca ? "180px" : "100%",
                          overflow: "hidden",
                          lineHeight: "36px",
                          fontFamily: 'satoshi'
                        }}
                      >
                        She was born and raised in Brooklyn. She always had
                        these odd “talents” that made her thought of as weird.
                        In college, her talents were more appreciated, and she
                        was recruited as a psychic by the UN and US government.
                        After they tested her skills, she began working with
                        them in unpleasant situations—crime scenes, accidents,
                        meetings in odd places surrounded by exotic technology.
                        This became overwhelming, and she turned to healing in
                        the 1990s. She showed exceptional aptitude in energy
                        healing techniques, so she developed her Brooklyn-based
                        practice specializing in massage with energy treatments.
                        She did this for 15 years, until she met Dr. Howell in
                        2013. When they began working together, they discovered
                        that their hands-on methods blended beautifully, and
                        their work progressed and became more dynamic, with
                        episodes of true healing and other notable results.
                        While Rev Dr Howell focused on the development of
                        Howelling, Rev Rebecca continued with her Body
                        Electronics and intuitively-based guidance—then, in her
                        free time, she focused on the development of the recipes
                        for Dame Rebecca’s Bakery where she utilized her
                        professional baking background to create amazingly
                        delicious bakery products with the Magic Flour developed
                        by Rev Peter Radatti.
                      </div>
                      <div
                        style={{
                          fontSize: "24px",
                          color: "rgba(71, 85, 105, 0.5)",
                          marginTop: "30px",
                          cursor: "pointer",
                          textAlign: "right",
                        }}
                        onClick={handleAboutRebecca}
                      >
                        {aboutrebecca ? "Read More" : "Read Less"}
                      </div>
                    </GridItem>
                    <GridItem sm={4}>
                      <img src="/img/Rectangle 3861.png"></img>
                    </GridItem>
                  </GridContainer>
                </div>
                <div style={{ marginTop: "50px" }}>
                  <GridContainer>
                    <GridItem sm={4}>
                      <img src="/img/Rectangle 3862.png"></img>
                    </GridItem>
                    <GridItem sm={8}>
                      <div
                        style={{
                          color: "#475569",
                          fontSize: "30px",
                          fontWeight: "800",
                          textAlign: "left",
                          fontFamily: 'satoshi'
                        }}
                      >
                        Minister of Healing Technologies Peter Radatti
                      </div>
                      <div
                        style={{
                          color: "#475569",
                          fontSize: "24px",
                          fontWeight: "700",
                          textAlign: "left",
                          marginTop: "20px",
                          maxHeight: aboutpeter ? "180px" : "100%",
                          overflow: "hidden",
                          lineHeight: "36px",
                          fontFamily: 'satoshi'
                        }}
                      >
                        Reverend Peter began as a physicist and worked for NASA
                        and other organizations as a scientist before founding
                        CyberSoft, the first anti-viral computer service company
                        over 30 years ago. As a side project, he developed an
                        alternative to baking flour. What is amazing about the
                        Magic Flour is that it is high in fiber content, has no
                        carbohydrates, will not feed insects or rodents, and
                        there is no way to become allergic to it. Is magic,
                        indeed! Rev Peter is also a developer of radionic
                        equipment, and he has written a series of radionic
                        textbooks that are best-sellers on Amazon. We have named
                        our Radionics Department is his honor. Members can buy
                        his amazing technology from the Members’ Store. Members
                        can also read Rev Peter’s writings….
                      </div>
                      <div
                        style={{
                          fontSize: "24px",
                          color: "rgba(71, 85, 105, 0.5)",
                          marginTop: "30px",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                        onClick={handleAboutPeter}
                      >
                        {aboutpeter ? "Read More" : "Read Less"}
                      </div>
                    </GridItem>
                  </GridContainer>
                </div>
                <img
                  src="/img/CoDS_Black_Logo.png"
                  alt="...."
                  style={{ width: "264px", marginTop: "100px" }}
                ></img>
                <div
                  style={{
                    marginTop: "20px",
                    color: "#2E3192",
                    fontSize: "45px",
                    fontWeight: "700",
                    fontFamily: 'satoshi'
                  }}
                >
                  Church of Divine Structure Priory 175 is also called CoDS
                </div>
                <div
                  style={{
                    marginTop: "40px",
                    color: "#475569",
                    fontSize: "24px",
                    lineHeight: "55px",
                    maxHeight: aboutpriory ? "100px" : "100%",
                    overflow: "hidden",
                    fontFamily: 'satoshi'
                  }}
                >
                  The Church of Divine Structure is dedicated to healing and
                  survival. We believe in the importance and sanctity of true
                  healing. It is the fundamental outreach of our organization.
                  We develop and maintain healing services to address the needs
                  of mankind. These are the talents, motivations, and intentions
                  of our group: we want to help all achieve spiritual ascendance
                  with our healing help. Commerce is not the aim of humanity,
                  and it is not an objective of our Church. In order to be of
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    color: "rgba(71, 85, 105, 0.5)",
                    marginTop: "30px",
                    cursor: "pointer",
                  }}
                  onClick={handleAboutPriory}
                >
                  {aboutpriory ? "Read More" : "Read Less"}
                </div>
                {aboutpriory ? (
                  <img
                    src="/img/vector.png"
                    style={{ cursor: "pointer" }}
                  ></img>
                ) : (
                  ""
                )}
                <div
                  style={{
                    marginTop: "100px",
                    color: "#2E3192",
                    fontSize: "45px",
                    fontWeight: "700",
                    fontFamily: 'satoshi'
                  }}
                >
                  WE HAVE EXPERIENCED HEALING! HERE IS OUR STORY
                </div>
                <div
                  style={{
                    marginTop: "40px",
                    color: "#475569",
                    fontSize: "24px",
                    lineHeight: "55px",
                    maxHeight: storyhealing ? "100px" : "100%",
                    overflow: "hidden",
                    fontFamily: 'satoshi'
                  }}
                >
                  The Church of Divine Structure is dedicated to healing and
                  survival. We believe in the importance and sanctity of true
                  healing. It is the fundamental outreach of our organization.
                  We develop and maintain healing services to address the needs
                  of mankind. These are the talents, motivations, and intentions
                  of our group: we want to help all achieve spiritual ascendance
                  with our healing help. Commerce is not the aim of humanity,
                  and it is not an objective of our Church. In order to be of
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    color: "rgba(71, 85, 105, 0.5)",
                    marginTop: "30px",
                    cursor: "pointer",
                  }}
                  onClick={handleStoryHealing}
                >
                  {storyhealing ? "Read More" : "Read Less"}
                </div>
                {storyhealing ? (
                  <img
                    src="/img/vector.png"
                    style={{ cursor: "pointer" }}
                  ></img>
                ) : (
                  ""
                )}

                <div
                  style={{
                    marginTop: "100px",
                    color: "#2E3192",
                    fontSize: "45px",
                    fontWeight: "700",
                    fontFamily: 'satoshi'
                  }}
                >
                  Articles
                </div>
                <GridContainer justify="center" style={{ marginTop: "30px" }}>
                  <GridItem sm={4}>
                    <Card style={{ height: "270px" }}>
                      <CardBody>
                        <div
                          style={{
                            color: "#2E3192",
                            fontSize: "29px",
                            lineHeight: "29px",
                            fontWeight: "700",
                            textAlign: "left",
                            fontFamily: 'satoshi'
                          }}
                        >
                          The Church of Hope's Holistic Approach
                        </div>
                        <div
                          style={{
                            color: "#828282",
                            fontSize: "23px",
                            lineHeight: "30px",
                            fontWeight: "400",
                            marginTop: "20px",
                            textAlign: "left",
                            fontFamily: 'satoshi'
                          }}
                        >
                          Rev Dr. Howell and Rev Rebecca offer holistic healing
                          through the Church of Hope.
                        </div>
                        <div style={{ textAlign: "left", marginTop: "20px" }}>
                          <Button color="primary" style={{ width: "100%", fontFamily: 'satoshi' }}>
                            Read More
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem sm={4}>
                    <Card style={{ height: "270px" }}>
                      <CardBody>
                        <div
                          style={{
                            color: "#2E3192",
                            fontSize: "29px",
                            lineHeight: "29px",
                            fontWeight: "700",
                            textAlign: "left",
                            fontFamily: 'satoshi'
                          }}
                        >
                          CODS (Church of Divine Structure Priory 175, Inc.)
                        </div>
                        <div
                          style={{
                            color: "#828282",
                            fontSize: "23px",
                            lineHeight: "30px",
                            fontWeight: "400",
                            marginTop: "20px",
                            textAlign: "left",
                            fontFamily: 'satoshi'
                          }}
                        >
                          A holistic approach to healing beyond commerce.
                        </div>
                        <div style={{ textAlign: "left", marginTop: "50px" }}>
                          <Button color="primary" style={{ width: "100%", fontFamily: 'satoshi' }}>
                            Read More
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>
                <GridContainer justify="center" style={{ marginTop: "50px" }}>
                  <h4 className={classes.title} style={{ color: "#2E3192", fontFamily: 'satoshi' }}>
                    Investment in Wellness
                  </h4>
                </GridContainer>
                <GridContainer justify="center">
                  <h2 className={classes.title}>
                    <span style={{ color: "#2E3192", fontFamily: 'satoshi' }}>
                      Our Membership Plans
                    </span>
                  </h2>
                </GridContainer>
                <GridContainer justify="center">
                  <h4 className={classes.title} style={{color: "#2E3192", fontFamily: 'satoshi'}}>
                    At Church of Divine Structure, we believe in making holistic
                    healing accessible to all.{" "}
                  </h4>
                  <h4 className={classes.title} style={{ marginTop: "0px", color: "#2E3192", fontFamily: 'satoshi' }}>
                    {" "}
                    Our pricing plans are designed to offer flexibility and
                    affordability, ensuring that the path to true well-being is
                    within reach for everyone.
                  </h4>
                </GridContainer>
                <Grid
                  container
                  spacing={4}
                  alignContent="center"
                  alignItems="center"
                  justify="center"
                >
                  {/* <Grid item xs={3}>
                    <Card elevation={4}>
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          Daily Member
                        </Typography>
                        <Typography variant="h5" component="h2">
                          7.5 $/day
                        </Typography>
                        <Typography
                          className={classes.pos}
                          color="textSecondary"
                        ></Typography>
                        <Typography
                          style={{ marginTop: "5vh" }}
                          variant="body2"
                          component="p"
                        >
                          Able to book an appointment
                          <br />
                          Able to cancel or reschedule with 7 or more days'
                          notice
                        </Typography>
                      </CardContent>
                      <CardActions
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button color="primary" onClick={handleDailyMembership}>
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid> */}
                  <Grid item xs={3}>
                    <Card
                      elevation={4}
                      style={{ backgroundColor: "#231D4F", color: "white" }}
                    >
                      <CardContent>
                        <Typography
                          className={classes.title}
                          style={{ color: "white", fontFamily: 'satoshi' }}
                          color="textSecondary"
                          gutterBottom
                        >
                          Annual Member
                        </Typography>
                        <Typography variant="h5" component="h2">
                          100 $/year
                        </Typography>
                        <Typography
                          className={classes.pos}
                          style={{ color: "white" }}
                          color="textSecondary"
                        ></Typography>
                        <Typography
                          style={{ marginTop: "5vh" }}
                          variant="body2"
                          component="p"
                        >
                          Able to post a sharing contents
                          <br />
                          Able to book an appointment
                          <br />
                          Able to cancel or reschedule appointments 7 or more
                          days in advance
                        </Typography>
                      </CardContent>
                      <CardActions
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          color="primary"
                          onClick={handleAnnualMembership}
                        >
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
                <GridContainer justify="center">
                  <h2 className={classes.title} style={{color: "#2E3192"}}>Special Price is ending soon!</h2>
                </GridContainer>
              </GridItem>
            </GridContainer>

            {/* Membership */}

            {/* Contact US */}
            <div style={{backgroundColor: '#0F172A'}}>
              <GridContainer justify="center">
                <h2 className={classes.title} style={{ marginTop: "50px" }}>
                  <span style={{ color: "white" }}>Personalized Support </span>
                </h2>
              </GridContainer>
              <GridContainer justify="center" id="contact_section">
                <h4 className={classes.title} style={{color: 'rgba(255, 255, 255, 0.5)'}}>
                  Discover the path to transformative healing. If you have
                  questions, need more information, or want to start your healing
                  journey with us,{" "}
                </h4>
                <h4 className={classes.title} style={{ marginTop: "0px", color: 'rgba(255, 255, 255, 0.5)' }}>
                  our dedicated team is here to assist you. Feel free to get in
                  touch; we are just a message away.
                </h4>
              </GridContainer>
              <GridContainer style={{margin: '0px'}}>
                <Card style={{backgroundColor: '#0F172A'}}>
                  <CardBody>
                    <GridContainer>
                      <GridItem
                        sm={4}
                        style={{
                          borderRadius: "5px",
                          overflow: "hidden",
                        }}
                      >
                        <h3 className={classes.title} style={{ color: "white" }}>
                          Contact Information
                        </h3>
                        <h6 className={classes.title} style={{ color: "white" }}>
                          Say something to start a live chat!
                        </h6>
                        <GridContainer
                          style={{
                            color: "white",
                            marginLeft: "0px",
                            marginTop: "100px",
                          }}
                        >
                          <PhoneIcon></PhoneIcon>
                          <p style={{ marginBottom: "10px" }}>
                            &nbsp;&nbsp;+1 (888) 252-0411
                          </p>
                        </GridContainer>
                        <GridContainer
                          style={{ color: "white", marginLeft: "0px" }}
                        >
                          <MailIcon></MailIcon>
                          <p style={{ marginBottom: "10px" }}>
                            {/* &nbsp;&nbsp;info@cods.land, info@drdeanhowell.com,
                            support@cods.land */}
                            &nbsp;&nbsp;info@cods.land
                          </p>
                        </GridContainer>
                        <GridContainer
                          style={{ color: "white", marginLeft: "0px" }}
                        >
                          <RoomIcon></RoomIcon>
                          <p style={{ marginBottom: "10px" }}>
                            &nbsp;&nbsp;185 Howell Canyon Road, Tonasket,
                            Washington 98855
                          </p>
                        </GridContainer>
                        <GridContainer
                          justify="space-between"
                          style={{
                            color: "white",
                            marginLeft: "0px",
                            marginTop: "150px",
                            marginBottom: "50px",
                            width: "20%",
                          }}
                        >
                          <TwitterIcon></TwitterIcon>
                          <InstagramIcon></InstagramIcon>
                          <FacebookIcon></FacebookIcon>
                        </GridContainer>

                        {/* <div style={{width: "138px", height: "138px", backgroundColor: "#484848", borderRadius: "138px", left: "60%", top: "25%", position: "relative", opacity: "0.5", zIndex: "20"}}></div> */}
                      </GridItem>
                      <GridItem sm={8} style={{backgroundColor: 'white'}}>
                        <GridContainer style={{padding: '10px'}}>
                          <GridItem sm={12} >
                            <CustomInput
                              labelText="Your Name..."
                              id="f_name"
                              formControlProps={{
                                fullWidth: true,
                              }}
                            />
                          </GridItem>
                          {/* <GridItem sm={6}>
                            <CustomInput
                              labelText="Last Name..."
                              id="l_name"
                              formControlProps={{
                                fullWidth: true,
                              }}
                            />
                          </GridItem> */}
                        </GridContainer>
                        <GridContainer style={{padding: '10px'}}>
                          <GridItem sm={12}>
                            <CustomInput
                              labelText="Your Email..."
                              id="email"
                              formControlProps={{
                                fullWidth: true,
                              }}
                            />
                          </GridItem>
                          {/* <GridItem sm={6}>
                            <CustomInput
                              labelText="Phone Number..."
                              id="phone"
                              formControlProps={{
                                fullWidth: true,
                              }}
                            />
                          </GridItem> */}
                        </GridContainer>
                        <GridContainer style={{padding: '10px'}}>
                          <GridItem sm={12}>
                          <div style={{marginBottom: '0px', fontSize: '14px',  fontWeight: '500', color: 'rgba(0,0,0,0.4)', fontFamily: 'sans-serif', marginTop: '20px'}}>Your Message</div>
                          <textarea id="w3review" name="w3review" rows="4" style={{width: '100%'}}>      
                          </textarea>
                          </GridItem>
                        </GridContainer>
                        {/* <GridContainer>
                          <GridItem>
                            <h4 className={classes.title}>Select Subject?</h4>
                          </GridItem>
                        </GridContainer> */}
                        {/* <FormControlLabel
                          control={
                            <Radio
                              checked={selectedEnabled === "b"}
                              onChange={() => setSelectedEnabled("b")}
                              value="b"
                              name="radio button enabled"
                              aria-label="B"
                              icon={
                                <FiberManualRecord
                                  className={classes.radioUnchecked}
                                />
                              }
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
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
                          label="General Inquiry"
                        />
                        <FormControlLabel
                          control={
                            <Radio
                              checked={selectedEnabled === "a"}
                              onChange={() => setSelectedEnabled("a")}
                              value="b"
                              name="radio button enabled"
                              aria-label="B"
                              icon={
                                <FiberManualRecord
                                  className={classes.radioUnchecked}
                                />
                              }
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
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
                          label="General Inquiry"
                        />
                        <FormControlLabel
                          control={
                            <Radio
                              checked={selectedEnabled === "c"}
                              onChange={() => setSelectedEnabled("c")}
                              value="b"
                              name="radio button enabled"
                              aria-label="B"
                              icon={
                                <FiberManualRecord
                                  className={classes.radioUnchecked}
                                />
                              }
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
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
                          label="General Inquiry"
                        /> */}
                        <GridContainer
                          justify="center"
                          style={{ marginTop: "100px", padding: '20px'}}
                        >
                          <Button round color="primary" style={{width: '100%'}}>
                            Send Message
                          </Button>
                        </GridContainer>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridContainer>
            </div>
            {/* Contact US */}
            
            {/* Footer */}

            <GridContainer
              justify="space-between"
              style={{ marginTop: "100px" }}
            >
              <GridItem sm={4}>
                <img src="/img/CoDS_Black_Logo.png"></img>
                <p style={{ fontSize: "18px", marginTop: "20px" }}>
                  About CoDS
                </p>
                <p>
                  Church of Divine Structure (CoDS) specializes in
                  transformative holistic healing, fostering spiritual growth,
                  and well-being through personalized, innovative practices and
                  ancient wisdom.
                </p>
                <GridContainer
                  style={{ color: "#2E3192", width: "50%" }}
                  justify="space-between"
                >
                  <GridItem>
                    <IconButton color="primary">
                      <TwitterIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <InstagramIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <FacebookIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <YouTubeIcon />
                    </IconButton>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem sm={2}>
               <h4 className={classes.title} style={{ color: "#170F49" }}>
                  More Link
                </h4>
                <p>
                  <Link href="/">Bemer</Link>
                </p>
                <p>
                  <Link href="/">Epic</Link>
                </p>
                <p>
                  <Link href="/">Nature's Sunshine</Link>
                </p>
              </GridItem>
              <GridItem sm={2}>
                <h4 className={classes.title} style={{ color: "#170F49" }}>
                  Product
                </h4>
                <p>
                  <Link href="/">Features</Link>
                </p>
                <p>
                  <Link href="/">Pricing</Link>
                </p>
                <p>
                  <Link href="/">Case studies</Link>
                </p>
                <p>
                  <Link href="/">Reviews</Link>
                </p>
                <p>
                  <Link href="/">Updates</Link>
                </p>
              </GridItem>
              <GridItem sm={2}>
                <h4 className={classes.title} style={{ color: "#170F49" }}>
                  Company
                </h4>
                <p>
                  <Link href="/">About</Link>
                </p>
                <p>
                  <Link href="/">Contact Us</Link>
                </p>
                <p>
                  <Link href="/">Newletters</Link>
                </p>
              </GridItem>

              <GridItem sm={2}>
                <h4 className={classes.title} style={{ color: "#170F49" }}>
                  Support
                </h4>
                <p>
                  <Link href="/">Getting Started</Link>
                </p>
                <p>
                  <Link href="/">Helper center</Link>
                </p>
                <p>
                  <Link href="/">Server status</Link>
                </p>
                <p>
                  <Link href="/">Report a bug</Link>
                </p>
              </GridItem>
            </GridContainer>

            {/* Footer */}
            {/* </div> */}
          </Container>
        </div>
      </div>
      <Grid container>
        <Grid item xs={4} style={{ display: "flex", justifyContent: "center" }}>
          <Typography>Copyright © 2023 CODS</Typography>
        </Grid>
        <Grid item xs={7}>
          <p style={{ float: "right" }}>
            <Link href="/">All Rights Reserved</Link> |{" "}
            <Link href="/">Terms Condition</Link> |{" "}
            <Link href="/">Privacy Policy</Link>
          </p>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}
