import React, {useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import styles from "/styles/jss/nextjs-material-kit/pages/components.js";

const useStyles = makeStyles((styles));

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
  const [currentSlide, setCurrentSlide] = useState(0)
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
                backgroundColor: i === currentSlide ? 'black' : 'white',
                padding: "5px"
            }}
        >
        </div>
      ),
      afterChange: (current) => setCurrentSlide(current), 
  };
  return (
    <div>
      <Header
        brand="Cods Land"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax image="/img/brandon-morgan.png" className={classes.homeheaderImg}>
        <div className={classes.overlay}></div>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title} style={{color: 'white'}}>We Are Healers. We Share Our Healings and Methods with our Members. Join US!</h1>
                <h3 className={classes.subtitle}>
                    Reverend Dr Dean Howell has developed NeuroCranial Restructuring and Howelling. Reverend Rebecca Hart has dramatically revised Body Electronics. Reverend Peter Radatti has created Magic Flour and has improved Radionics machine designs.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
        <img src="/img/CoDS_Black_Logo_Big.png" alt="..." style={{position: 'absolute', bottom: '-100px', left: '50%', transform: 'translateX(-50%)', zIndex: '2'}}></img>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.sections}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6}>            
                <h4 className={classes.title} style={{color: '#2E3192'}}>coDS HEALING</h4>
                <h1 className={classes.title}>Who <span style={{color: '#2E3192'}}>We Are </span></h1>
                <Carousel {...settings}>
                <div>
                  <p>The Church of Divine Structure is a worldwide healing community with its headquarters in Okanogan County, Washington. We are affiliated with the Eastern Orthodox Catholic Church. </p>
                  <p>Our Church is, first and foremost, a healing organization. We have been a private membership association since 2001. We believe in healing rather than to simply offer treatments. We hope that we will raise enough money o that some day we can have We do not believe that medicine should be practiced as a form of commerce.</p>
                </div>
                <div>
                <p>The Church of Divine Structure is a worldwide healing community with its headquarters in Okanogan County, Washington. We are affiliated with the Eastern Orthodox Catholic Church. </p>
                  <p>Our Church is, first and foremost, a healing organization. We have been a private membership association since 2001. We believe in healing rather than to simply offer treatments. We hope that we will raise enough money o that some day we can have We do not believe that medicine should be practiced as a form of commerce.</p>
                </div>
              </Carousel>
            </GridItem>
            <GridItem xs={12} sm={6}>
                <img src="/img/sixteen-miles.png" alt="..." style={{width: '100%', height: '100%'}}></img>
            </GridItem>
          </GridContainer>
        </div>   
        </div> 
      </div>
      <Footer />
    </div>
  );
}
