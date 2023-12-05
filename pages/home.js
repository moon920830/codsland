import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Rating from '@material-ui/lab/Rating';
// @material-ui/icons
// core components
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Grid from '@material-ui/core/Grid';
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
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import Slider from "react-slick";
import NavPills from "/components/NavPills/NavPills.js";
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


import styles from "/styles/jss/nextjs-material-kit/pages/components.js";
import { Container, IconButton, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => {
  return {
    ...styles,
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

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
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
      <Header
      style={{
        fontFamily:"satoshi"
      }}
        brand={
          <>
            <div style={{width:"86px",height:"74px",backgroundColor:"white",borderRadius:"19px",display:"flex",justifyContent:"center", alignItems: "center"}} >
              <img src="/img/CoDS_Black_Logo_Big.png" style={{height:"70px",width:"124px"}} />
            </div>
          </>
        }
        rightLinks={<HeaderLinks/>}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax image="/img/brandon-morgan.png" className={classes.homeheaderImg}
       id="home_section">
        <div className={classes.overlay}></div>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title} style={{ color: 'white' }}>We Are Healers. We Share Our Healings and Methods with our Members. Join US!</h1>
                <h3 className={classes.subtitle}>
                  Reverend Dr Dean Howell has developed NeuroCranial Restructuring and Howelling. Reverend Rebecca Hart has dramatically revised Body Electronics. Reverend Peter Radatti has created Magic Flour and has improved Radionics machine designs.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
        <img src="/img/CoDS_Black_Logo_Big.png" alt="..." style={{ position: 'absolute', bottom: '-100px', left: '50%', transform: 'translateX(-50%)', zIndex: '2' }}></img>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)} id="about_section">
        <div className={classes.sections}>
          <Container maxWidth={false} style={{ maxWidth: "80%" }} >
            {/* <div className={classes.container}> */}
            <GridContainer justify="center">
              <GridItem xs={12} sm={6}>
                <h4 className={classes.title} style={{ color: '#2E3192' }}>coDS HEALING</h4>
                <h1 className={classes.title}>Who <span style={{ color: '#2E3192' }}>We Are </span></h1>
                <Carousel {...settings}>
                  <div  >
                    <p style={{ fontSize: "20px", lineHeight: "200%" }}>The Church of Divine Structure is a worldwide healing community with its headquarters in Okanogan County, Washington. We are affiliated with the Eastern Orthodox Catholic Church. </p>
                    <p style={{ fontSize: "20px", lineHeight: "200%" }}>Our Church is, first and foremost, a healing organization. We have been a private membership association since 2001. We believe in healing rather than to simply offer treatments. We hope that we will raise enough money o that some day we can have We do not believe that medicine should be practiced as a form of commerce.</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "20px", lineHeight: "200%" }}>The Church of Divine Structure is a worldwide healing community with its headquarters in Okanogan County, Washington. We are affiliated with the Eastern Orthodox Catholic Church. </p>
                    <p style={{ fontSize: "20px", lineHeight: "200%" }}>Our Church is, first and foremost, a healing organization. We have been a private membership association since 2001. We believe in healing rather than to simply offer treatments. We hope that we will raise enough money o that some day we can have We do not believe that medicine should be practiced as a form of commerce.</p>
                  </div>
                </Carousel>
              </GridItem>
              <GridItem xs={12} sm={6}>
                <GridContainer justify="center">
                  <div style={{position: "absolute", width: "684px", height: "209px", marginTop: "68px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="684" height="209" viewBox="0 0 684 209" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M143.16 125.504H95.4146L94.8075 122.765C93.4723 116.74 91.0206 112.682 87.6578 110.085C84.2777 107.476 79.5499 106.013 73.0328 106.013C65.3579 106.013 59.2687 108.851 55.0455 113.774C50.7727 118.756 48.1561 126.181 48.1561 135.712C48.1561 145.727 50.6184 153.205 54.7123 158.115C58.7324 162.937 64.6462 165.674 72.5021 165.674C79.1409 165.674 84.0893 164.151 87.6199 161.482C91.1179 158.837 93.6021 154.784 94.7964 148.974L95.3703 146.183L143.172 146.183L142.871 149.948C140.049 185.233 111.181 209 72.5021 209C50.7405 209 32.5378 201.804 19.775 188.855C7.02001 175.914 0 157.533 0 135.712C0 93.3309 29.5921 62.6876 71.4408 62.6876C91.7041 62.6876 108.872 68.1961 121.376 78.4693C133.918 88.7742 141.479 103.643 142.871 121.75L143.16 125.504ZM138.994 153.161C134.783 184.437 108.333 205.511 72.5021 205.511C30.5788 205.511 3.5144 177.855 3.5144 135.712C3.5144 95.1495 31.6402 66.1763 71.4408 66.1763C109.37 66.1763 134.922 86.0788 139.014 118.527C139.159 119.674 139.277 120.837 139.367 122.016H98.2399C95.3212 108.846 87.0957 102.525 73.0328 102.525C55.7859 102.525 44.6417 115.431 44.6417 135.712C44.6417 156.784 54.9899 169.163 72.5021 169.163C86.8304 169.163 95.5865 162.578 98.2399 149.672L139.367 149.672C139.273 150.848 139.148 152.011 138.994 153.161ZM178.171 83.0645C191.905 70.1967 211.112 62.951 233.12 62.951C255.001 62.951 274.143 70.2001 287.841 83.0676C301.557 95.9521 309.603 114.274 309.603 135.976C309.603 157.678 301.556 175.938 287.834 188.758C274.132 201.559 254.992 208.737 233.12 208.737C211.122 208.737 191.915 201.563 178.178 188.761C164.42 175.94 156.373 157.679 156.373 135.976C156.373 114.274 164.419 95.9499 178.171 83.0645ZM212.431 157.389C217.333 162.426 224.409 165.411 233.12 165.411C241.686 165.411 248.696 162.436 253.57 157.396C258.455 152.347 261.447 144.962 261.447 135.712C261.447 126.606 258.462 119.287 253.577 114.266C248.701 109.253 241.687 106.277 233.12 106.277C224.408 106.277 217.328 109.262 212.424 114.273C207.513 119.292 204.529 126.606 204.529 135.712C204.529 144.962 207.52 152.342 212.431 157.389ZM336.612 205.576V3.6875L414.421 3.6875C444.054 3.6875 469.394 14.0052 487.331 31.9824C505.266 49.9573 515.579 75.3683 515.579 105.158C515.579 134.41 505.54 159.547 488.085 177.388C470.623 195.238 445.941 205.576 417.074 205.576L336.612 205.576ZM383.111 46.6852H410.175C445.73 46.6852 466.692 68.2834 466.692 105.158C466.692 141.243 446.792 162.578 412.828 162.578L383.111 162.578V46.6852ZM386.625 159.09L412.828 159.09C429.047 159.09 441.5 154.017 449.923 145.025C458.378 135.998 463.178 122.586 463.178 105.158C463.178 87.3635 458.129 73.7045 449.232 64.5104C440.354 55.3349 427.226 50.1738 410.175 50.1738H386.625V159.09ZM680.816 67.031H631.068V63.5423C631.068 57.6379 628.876 53.1225 625.133 50.0221C621.318 46.8619 615.56 44.9059 608.048 44.9059C599.77 44.9059 593.41 46.7804 589.219 49.8037C585.145 52.7423 582.906 56.8996 582.906 62.2254C582.906 67.5272 584.25 70.9544 586.678 73.4142C589.219 75.9881 593.395 77.9653 600.014 79.3558C600.016 79.3562 600.018 79.3566 600.02 79.3569L629.449 85.4102C629.451 85.4105 629.452 85.4108 629.454 85.4112C647.323 89.04 661.043 95.1833 670.29 104.79C679.62 114.482 684 127.281 684 143.351C684 163.169 676.145 179.708 662.241 191.233C648.398 202.708 628.829 209 605.66 209C583.166 209 564.255 202.977 550.902 191.89C537.484 180.749 529.974 164.731 529.974 145.458V141.969H579.722V145.458C579.722 151.607 581.959 156.046 586.011 159.063C590.216 162.193 596.787 164.094 605.926 164.094C615.211 164.094 622.372 162.253 627.09 159.273C631.674 156.377 633.987 152.422 633.987 147.565C633.987 142.706 632.863 139.606 630.789 137.404C628.627 135.11 624.953 133.274 618.755 132.019L588.774 125.961L588.771 125.96C570.773 122.306 556.733 115.321 547.194 104.792C537.615 94.2188 532.893 80.4247 532.893 63.8057C532.893 26.0446 565.042 0 608.579 0C630.3 0 648.382 5.97039 661.083 17.0686C673.835 28.2108 680.816 44.2231 680.816 63.5423V67.031ZM619.458 128.6C632.459 131.234 637.501 136.766 637.501 147.565C637.501 159.944 625.295 167.583 605.926 167.583C586.821 167.583 576.208 159.681 576.208 145.458H533.489C533.489 146.634 533.518 147.797 533.576 148.946C535.329 183.552 563.287 205.511 605.66 205.511C650.768 205.511 680.486 181.016 680.486 143.351C680.486 112.533 663.769 95.9397 628.745 88.8281L599.292 82.7701C585.495 79.8727 579.392 74.0781 579.392 62.2254C579.392 49.3191 590.536 41.4173 608.048 41.4173C624.234 41.4173 634.582 49.8459 634.582 63.5423L677.302 63.5423C677.302 62.3654 677.274 61.2024 677.221 60.0537C675.592 25.2113 649.421 3.48865 608.579 3.48865C566.39 3.48865 536.407 28.511 536.407 63.8057C536.407 95.6763 554.45 115.431 589.475 122.542L619.458 128.6ZM233.12 66.4397C190.666 66.4397 159.887 94.3594 159.887 135.976C159.887 177.592 190.666 205.248 233.12 205.248C275.309 205.248 306.088 177.592 306.088 135.976C306.088 94.3594 275.309 66.4397 233.12 66.4397ZM233.12 168.9C214.016 168.9 201.015 155.73 201.015 135.712C201.015 115.958 214.016 102.788 233.12 102.788C251.959 102.788 264.961 115.958 264.961 135.712C264.961 155.73 251.959 168.9 233.12 168.9ZM417.074 202.087C473.06 202.087 512.065 162.051 512.065 105.158C512.065 47.2119 471.999 7.17616 414.421 7.17616L340.126 7.17616V202.087L417.074 202.087Z" fill="#AEAEAE"/>
                    </svg>
                  </div>
                </GridContainer>
                <GridContainer direction="column" style={{position: "absolute", marginTop: "323px", marginLeft: "24px"}}>
                  <GridItem>
                    <svg xmlns="http://www.w3.org/2000/svg" width="257" height="13" viewBox="0 0 257 13" fill="none">
                      <path d="M1.50478 11.9158H0V0.21047H1.50478V5.24555H7.00183V0.21047H8.50661V11.9158H7.00183V6.71883H1.50478V11.9158Z" fill="#2E3192"/>
                      <path d="M20.5625 11.9158H13.791V0.21047H20.5625V1.66757H15.2958V5.3265H20.0405V6.73502H15.2958V10.4425H20.5625V11.9158Z" fill="#2E3192"/>
                      <path d="M25.9134 11.9158H24.3472L28.4009 0.21047H30.0745L34.1436 11.9158H32.562L31.564 9.00162H26.8961L25.9134 11.9158ZM29.0458 2.7361L27.3567 7.62547H31.1187L29.4143 2.7361C29.3375 2.50944 29.2607 2.23421 29.23 2.05613C29.1993 2.21802 29.1225 2.49325 29.0458 2.7361Z" fill="#2E3192"/>
                      <path d="M39.8338 0.21047V10.4425H44.7167V11.9158H38.329V0.21047H39.8338Z" fill="#2E3192"/>
                      <path d="M50.5658 0.21047V11.9158H49.0611V0.21047H50.5658Z" fill="#2E3192"/>
                      <path d="M57.3692 11.9158H55.8644V0.21047H57.3692L63.0505 9.26066V0.21047H64.5553V11.9158H63.0505L57.3692 2.86562V11.9158Z" fill="#2E3192"/>
                      <path d="M74.6103 1.50567C72.215 1.50567 70.7716 3.36751 70.7716 6.136C70.7716 8.96924 72.3378 10.6044 74.6257 10.6044C76.5144 10.6044 78.0345 9.58446 78.0345 7.22072V6.88073H74.3186V5.47221H79.4471V11.932H78.188L78.0806 10.3454C77.4817 11.3654 76.1305 12.1101 74.5029 12.1101C71.3551 12.1101 69.1901 9.71398 69.1901 6.10362C69.1901 2.54182 71.3705 0.0161911 74.6411 0.0161911C77.0671 0.0161911 78.9558 1.48948 79.3243 3.73988H77.7274C77.3128 2.25041 76.0844 1.50567 74.6103 1.50567Z" fill="#2E3192"/>
                      <path d="M93.4512 11.9158L90.1499 0.21047H91.7161L93.743 7.36643C93.8965 7.98165 94.0501 8.59687 94.2036 9.48732C94.3879 8.5483 94.5568 7.98165 94.7257 7.36643L96.8293 0.21047H98.4569L100.545 7.36643C100.729 7.99784 100.883 8.61306 101.052 9.48732C101.236 8.49973 101.39 7.9007 101.543 7.38262L103.585 0.21047H105.121L101.774 11.9158H100.33L97.6431 2.65515L94.9253 11.9158H93.4512Z" fill="#2E3192"/>
                      <path d="M110.854 0.21047V11.9158H109.349V0.21047H110.854Z" fill="#2E3192"/>
                      <path d="M115.077 1.66757V0.21047H123.262V1.66757H119.93V11.9158H118.425V1.66757H115.077Z" fill="#2E3192"/>
                      <path d="M128.989 11.9158H127.484V0.21047H128.989V5.24555H134.486V0.21047H135.991V11.9158H134.486V6.71883H128.989V11.9158Z" fill="#2E3192"/>
                      <path d="M147.109 1.66757V0.21047H155.293V1.66757H151.961V11.9158H150.456V1.66757H147.109Z" fill="#2E3192"/>
                      <path d="M161.02 11.9158H159.515V0.21047H161.02V5.24555H166.517V0.21047H168.022V11.9158H166.517V6.71883H161.02V11.9158Z" fill="#2E3192"/>
                      <path d="M180.078 11.9158H173.306V0.21047H180.078V1.66757H174.811V5.3265H179.556V6.73502H174.811V10.4425H180.078V11.9158Z" fill="#2E3192"/>
                      <path d="M196.191 7.7388H193.381V11.9158H191.876V0.21047H196.191C198.371 0.21047 199.769 1.71614 199.769 3.96654C199.769 6.15219 198.356 7.7388 196.191 7.7388ZM195.93 1.63519H193.381V6.31409H195.869C197.358 6.31409 198.187 5.39126 198.187 3.95035C198.187 2.47706 197.343 1.63519 195.93 1.63519Z" fill="#2E3192"/>
                      <path d="M214.194 6.05505C214.194 9.61684 211.983 12.1101 208.835 12.1101C205.703 12.1101 203.523 9.61684 203.523 6.05505C203.523 2.50944 205.718 0 208.851 0C211.998 0 214.194 2.49325 214.194 6.05505ZM212.613 6.05505C212.613 3.33513 211.108 1.53805 208.851 1.53805C206.593 1.53805 205.104 3.33513 205.104 6.05505C205.104 8.77496 206.593 10.5882 208.851 10.5882C211.108 10.5882 212.613 8.75877 212.613 6.05505Z" fill="#2E3192"/>
                      <path d="M220.695 11.9158L217.394 0.21047H218.96L220.987 7.36643C221.141 7.98165 221.294 8.59687 221.448 9.48732C221.632 8.5483 221.801 7.98165 221.97 7.36643L224.074 0.21047H225.701L227.789 7.36643C227.974 7.99784 228.127 8.61306 228.296 9.48732C228.48 8.49973 228.634 7.9007 228.787 7.38262L230.83 0.21047H232.365L229.018 11.9158H227.574L224.887 2.65515L222.17 11.9158H220.695Z" fill="#2E3192"/>
                      <path d="M243.365 11.9158H236.593V0.21047H243.365V1.66757H238.098V5.3265H242.843V6.73502H238.098V10.4425H243.365V11.9158Z" fill="#2E3192"/>
                      <path d="M249.76 11.9158H248.255V0.21047H252.447C254.827 0.21047 256.239 1.53805 256.239 3.72369C256.239 5.34269 255.472 6.50837 254.09 6.97787L256.347 11.9158H254.673L252.6 7.28548H249.76V11.9158ZM249.76 1.63519V5.87696H252.462C253.859 5.87696 254.658 5.08365 254.658 3.73988C254.658 2.37992 253.829 1.63519 252.447 1.63519H249.76Z" fill="#2E3192"/>
                    </svg>
                  </GridItem>
                  <GridItem>
                    <svg xmlns="http://www.w3.org/2000/svg" width="262" height="159" viewBox="0 0 262 159" fill="none">
                      <path d="M50.4923 50.6789V37.7783C50.4923 32.9679 49.2695 29.2508 46.824 26.6269C44.3785 24.0031 40.998 22.6911 36.6824 22.6911C32.3669 22.6911 28.9863 24.0031 26.5408 26.6269C24.0953 29.2508 22.8726 32.9679 22.8726 37.7783V121.304C22.8726 126.115 24.0953 129.832 26.5408 132.456C28.9863 135.08 32.3669 136.391 36.6824 136.391C40.998 136.391 44.3785 135.08 46.824 132.456C49.2695 129.832 50.4923 126.115 50.4923 121.304V94.1911H36.6824V72.3257H73.3649V121.304C73.3649 132.383 69.9843 141.348 63.2232 148.199C56.4622 154.904 47.6152 158.257 36.6824 158.257C25.7496 158.257 16.9027 154.904 10.1416 148.199C3.38054 141.348 0 132.383 0 121.304V37.7783C0 26.6998 3.38054 17.8078 10.1416 11.1024C16.9027 4.25127 25.7496 0.825684 36.6824 0.825684C47.6152 0.825684 56.4622 4.25127 63.2232 11.1024C69.9843 17.8078 73.3649 26.6998 73.3649 37.7783V50.6789H50.4923Z" fill="#2E3192"/>
                      <path d="M130.243 158.257C119.31 158.257 110.463 154.904 103.702 148.199C96.941 141.348 93.5604 132.383 93.5604 121.304V37.7783C93.5604 26.6998 96.941 17.8078 103.702 11.1024C110.463 4.25127 119.31 0.825684 130.243 0.825684C141.176 0.825684 150.023 4.25127 156.784 11.1024C163.545 17.8078 166.925 26.6998 166.925 37.7783V121.304C166.925 132.383 163.545 141.348 156.784 148.199C150.023 154.904 141.176 158.257 130.243 158.257ZM130.243 136.391C134.558 136.391 137.939 135.08 140.384 132.456C142.83 129.832 144.053 126.115 144.053 121.304V37.7783C144.053 32.9679 142.83 29.2508 140.384 26.6269C137.939 24.0031 134.558 22.6911 130.243 22.6911C125.927 22.6911 122.547 24.0031 120.101 26.6269C117.656 29.2508 116.433 32.9679 116.433 37.7783V121.304C116.433 126.115 117.656 129.832 120.101 132.456C122.547 135.08 125.927 136.391 130.243 136.391Z" fill="#2E3192"/>
                      <path d="M190.116 3.01223H225.936C236.869 3.01223 245.572 6.36493 252.045 13.0703C258.518 19.63 261.755 28.449 261.755 39.5275V119.555C261.755 130.634 258.518 139.525 252.045 146.231C245.572 152.79 236.869 156.07 225.936 156.07H190.116V3.01223ZM224.857 134.205C229.316 134.205 232.769 132.966 235.214 130.488C237.66 128.01 238.883 124.511 238.883 119.992V39.0902C238.883 34.5713 237.66 31.0729 235.214 28.5948C232.769 26.1167 229.316 24.8777 224.857 24.8777H212.989V134.205H224.857Z" fill="#2E3192"/>
                    </svg>
                  </GridItem>
                  <GridItem>
                    <svg xmlns="http://www.w3.org/2000/svg" width="259" height="89" viewBox="0 0 259 89" fill="none">
                      <path d="M0.490234 0.871582H21.1572C27.4652 0.871582 32.4867 2.80081 36.2217 6.65926C39.9567 10.4338 41.8242 15.5085 41.8242 21.8834V67.9332C41.8242 74.308 39.9567 79.4247 36.2217 83.2831C32.4867 87.0577 27.4652 88.945 21.1572 88.945H0.490234V0.871582ZM20.5347 76.3631C23.1077 76.3631 25.0997 75.6501 26.5107 74.2241C27.9217 72.7982 28.6272 70.7851 28.6272 68.1848V21.6317C28.6272 19.0315 27.9217 17.0184 26.5107 15.5924C25.0997 14.1665 23.1077 13.4535 20.5347 13.4535H13.6872V76.3631H20.5347Z" fill="#2E3192"/>
                      <path d="M55.0805 0.871582H68.2775V88.945H55.0805V0.871582Z" fill="#2E3192"/>
                      <path d="M125.009 0.871582L110.568 88.945H92.8885L78.4466 0.871582H91.8925L101.853 70.0721L111.812 0.871582H125.009Z" fill="#2E3192"/>
                      <path d="M135.203 0.871582H148.4V88.945H135.203V0.871582Z" fill="#2E3192"/>
                      <path d="M162.802 0.871582H177.368L194.176 60.0066V0.871582H207.124V88.945H193.18L175.75 32.578V88.945H162.802V0.871582Z" fill="#2E3192"/>
                      <path d="M221.526 0.871582H259V13.4535H234.723V37.9882H254.02V50.5701H234.723V76.3631H259V88.945H221.526V0.871582Z" fill="#2E3192"/>
                    </svg>
                  </GridItem>
                  <GridItem>
                    <svg xmlns="http://www.w3.org/2000/svg" width="259" height="48" viewBox="0 0 259 48" fill="none">
                      <path d="M12.549 48.0001C10.1984 48.0001 8.10629 47.5179 6.2728 46.5536C4.4393 45.5893 3.00541 44.2524 1.97113 42.5429C0.983868 40.8334 0.490234 38.8829 0.490234 36.6912V35.0475L7.68318 34.3242V36.0337C7.68318 37.6994 8.10629 39.0144 8.95252 39.9787C9.79875 40.943 10.9741 41.4252 12.4785 41.4252C13.9359 41.4252 15.0877 41.0307 15.9339 40.2417C16.8272 39.4527 17.2738 38.3788 17.2738 37.02C17.2738 35.5297 16.8036 34.1051 15.8634 32.7463C14.9701 31.3874 13.1602 29.5026 10.4334 27.0918C6.76643 23.8482 4.25125 21.1525 2.88788 19.0047C1.57153 16.8569 0.913349 14.5118 0.913349 11.9695C0.913349 8.50672 1.92412 5.76717 3.94567 3.75086C5.96721 1.69072 8.74096 0.660645 12.2669 0.660645C15.7929 0.660645 18.5666 1.69072 20.5882 3.75086C22.6097 5.811 23.6205 8.57247 23.6205 12.0353V13.2187L16.4275 13.942V12.627C16.4275 10.8737 16.0749 9.53679 15.3698 8.6163C14.6646 7.69581 13.6538 7.23557 12.3374 7.23557C11.0211 7.23557 10.0103 7.60815 9.30512 8.3533C8.59993 9.09846 8.24733 10.1943 8.24733 11.6408C8.24733 13.0872 8.71746 14.4899 9.65771 15.8487C10.598 17.1637 12.408 19.0704 15.0877 21.5689C18.7547 24.9879 21.2463 27.7493 22.5627 29.8533C23.9261 31.9134 24.6078 34.1928 24.6078 36.6912C24.6078 38.8829 24.0906 40.8334 23.0563 42.5429C22.0691 44.2524 20.6587 45.5893 18.8252 46.5536C16.9917 47.5179 14.8996 48.0001 12.549 48.0001Z" fill="#2E3192"/>
                      <path d="M28.3645 1.31814H52.2V7.89306H44.0198V47.3426H36.5448V7.89306H28.3645V1.31814Z" fill="#2E3192"/>
                      <path d="M74.7479 47.3426L69.3179 28.3411H65.4394V47.3426H57.9644V1.31814H69.6705C73.2435 1.31814 76.0878 2.32629 78.2033 4.3426C80.3189 6.31508 81.3767 8.96696 81.3767 12.2983V17.361C81.3767 19.4649 80.9301 21.3278 80.0368 22.9496C79.1436 24.5714 77.8742 25.8426 76.2288 26.7631L82.505 47.3426H74.7479ZM65.4394 21.7661H69.3179C70.7753 21.7661 71.9036 21.3936 72.7029 20.6484C73.5021 19.9033 73.9017 18.8513 73.9017 17.4924V12.1668C73.9017 10.8079 73.5021 9.75595 72.7029 9.0108C71.9036 8.26564 70.7753 7.89306 69.3179 7.89306H65.4394V21.7661Z" fill="#2E3192"/>
                      <path d="M99.9634 48.0001C96.5315 48.0001 93.7342 47.0139 91.5717 45.0414C89.4091 43.0251 88.3278 40.417 88.3278 37.2172V1.31814H95.8028V37.2172C95.8028 38.5322 96.1789 39.5623 96.9311 40.3074C97.7303 41.0526 98.7411 41.4252 99.9634 41.4252C101.186 41.4252 102.173 41.0526 102.925 40.3074C103.724 39.5623 104.124 38.5322 104.124 37.2172V1.31814H111.458V37.2172C111.458 40.417 110.4 43.0251 108.285 45.0414C106.169 47.0139 103.395 48.0001 99.9634 48.0001Z" fill="#2E3192"/>
                      <path d="M130.396 48.0001C126.917 48.0001 124.096 46.9919 121.933 44.9756C119.771 42.9593 118.69 40.3293 118.69 37.0857V11.575C118.69 8.33139 119.771 5.70142 121.933 3.68511C124.096 1.6688 126.917 0.660645 130.396 0.660645C133.875 0.660645 136.695 1.6688 138.858 3.68511C141.021 5.70142 142.102 8.33139 142.102 11.575V16.9665H134.768V11.575C134.768 10.26 134.368 9.20805 133.569 8.41906C132.77 7.63006 131.736 7.23557 130.466 7.23557C129.197 7.23557 128.163 7.63006 127.363 8.41906C126.564 9.20805 126.165 10.26 126.165 11.575V37.0857C126.165 38.4007 126.564 39.4527 127.363 40.2417C128.163 41.0307 129.197 41.4252 130.466 41.4252C131.736 41.4252 132.77 41.0307 133.569 40.2417C134.368 39.4527 134.768 38.4007 134.768 37.0857V30.5108H142.102V37.0857C142.102 40.3293 141.021 42.9593 138.858 44.9756C136.695 46.9919 133.875 48.0001 130.396 48.0001Z" fill="#2E3192"/>
                      <path d="M146.815 1.31814H170.65V7.89306H162.47V47.3426H154.995V7.89306H146.815V1.31814Z" fill="#2E3192"/>
                      <path d="M187.768 48.0001C184.336 48.0001 181.539 47.0139 179.376 45.0414C177.214 43.0251 176.132 40.417 176.132 37.2172V1.31814H183.607V37.2172C183.607 38.5322 183.983 39.5623 184.736 40.3074C185.535 41.0526 186.546 41.4252 187.768 41.4252C188.99 41.4252 189.977 41.0526 190.73 40.3074C191.529 39.5623 191.929 38.5322 191.929 37.2172V1.31814H199.263V37.2172C199.263 40.417 198.205 43.0251 196.089 45.0414C193.974 47.0139 191.2 48.0001 187.768 48.0001Z" fill="#2E3192"/>
                      <path d="M223.912 47.3426L218.482 28.3411H214.604V47.3426H207.129V1.31814H218.835C222.408 1.31814 225.252 2.32629 227.368 4.3426C229.483 6.31508 230.541 8.96696 230.541 12.2983V17.361C230.541 19.4649 230.094 21.3278 229.201 22.9496C228.308 24.5714 227.039 25.8426 225.393 26.7631L231.669 47.3426H223.912ZM214.604 21.7661H218.482C219.94 21.7661 221.068 21.3936 221.867 20.6484C222.666 19.9033 223.066 18.8513 223.066 17.4924V12.1668C223.066 10.8079 222.666 9.75595 221.867 9.0108C221.068 8.26564 219.94 7.89306 218.482 7.89306H214.604V21.7661Z" fill="#2E3192"/>
                      <path d="M237.774 1.31814H259V7.89306H245.249V20.7142H256.18V27.2891H245.249V40.7677H259V47.3426H237.774V1.31814Z" fill="#2E3192"/>
                    </svg>
                  </GridItem>
                </GridContainer>

                <img src="/img/sixteen-miles.png" alt="..." style={{ width: '100%', height: '100%' }}></img>
              </GridItem>
            </GridContainer>
            {/*  Services */}
            <div style={{ backgroundColor: "#F8F8F8" }} id="service_section">
              <GridContainer justify="center" style={{ marginTop: "70px" }}>
                <img src="/img/CoDS_Black_Logo.png" alt="...."></img>
              </GridContainer>
              <GridContainer justify="center">
                <h4 className={classes.title} style={{ color: '#2E3192' }}>Our Services</h4>
              </GridContainer>
              <GridContainer justify="center">
                <h2 className={classes.title}>We Love Our Parish and Stay Together to <span style={{ color: '#2E3192' }}>Serve God</span></h2>
              </GridContainer>
              <GridContainer>
                <GridItem sm={6}>
                  <Card>
                    <CardBody>
                      <GridContainer>
                        <GridItem sm={8}>
                          <h3 className={classes.title}>Service</h3>
                          <p style={{ fontSize: "20px", lineHeight: "200%" }}>The Church of Divine Structure is a worldwide heading community with its headquarters in Okanogan Country. Washington. We are affiliated with the Eastern Orthodox Catholic Church</p>
                        </GridItem>
                        <GridItem sm={4}>
                          <GridContainer style={{ justifyContent: "end" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="140" height="103" viewBox="0 0 140 103" fill="none">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5756 14.8384C20.1646 5.74161 31.0049 0.48999 43.8655 0.48999C56.7262 0.48999 67.5664 5.74161 75.1554 14.8384C82.718 23.9035 86.9515 36.656 86.9515 51.5674C86.9515 66.4395 83.0553 79.0468 75.6336 87.9763C68.1736 96.9519 57.3134 102.011 43.8655 102.011C30.4176 102.011 19.5575 96.9519 12.0974 87.9763C4.67573 79.0468 0.779541 66.4395 0.779541 51.5674C0.779541 36.656 5.01301 23.9035 12.5756 14.8384ZM30.3607 73.0777C33.4662 77.5201 37.96 79.7699 43.8655 79.7699C49.771 79.7699 54.2649 77.5201 57.3704 73.0777C60.5563 68.5204 62.4276 61.4386 62.4276 51.5674C62.4276 41.3679 60.5523 34.1252 57.3616 29.4894C54.2557 24.9768 49.7674 22.7306 43.8655 22.7306C37.9636 22.7306 33.4754 24.9768 30.3694 29.4894C27.1788 34.1252 25.3035 41.3679 25.3035 51.5674C25.3035 61.4386 27.1748 68.5204 30.3607 73.0777ZM94.1108 24.8871V2.26586H139.311V100.362H115.421V24.8871H94.1108ZM117.535 22.7729V98.2474H137.197V4.37999H96.2249V22.7729H117.535ZM43.8655 2.60412C19.3839 2.60412 2.89367 22.5192 2.89367 51.5674C2.89367 80.6155 18.1154 99.8964 43.8655 99.8964C69.6156 99.8964 84.8374 80.6155 84.8374 51.5674C84.8374 22.5192 68.3472 2.60412 43.8655 2.60412ZM43.8655 81.884C30.8002 81.884 23.1893 71.7362 23.1893 51.5674C23.1893 30.7643 30.8002 20.6165 43.8655 20.6165C56.9309 20.6165 64.5417 30.7643 64.5417 51.5674C64.5417 71.7362 56.9309 81.884 43.8655 81.884Z" fill="#D5ECFD" />
                            </svg>
                          </GridContainer>
                          <GridContainer style={{ marginTop: "100px", justifyContent: "end" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="115" height="99" viewBox="0 0 115 99" fill="none">
                              <g clip-path="url(#clip0_1_610)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M106.177 92.7304L97.878 68.5826C97.5164 67.5273 96.9077 66.5366 95.8161 66.5366H91.1712L94.2843 60.2692H95.8161C98.4171 60.2692 100.38 61.3646 101.863 63.05C102.826 64.1432 103.446 65.3811 103.857 66.5744L115 99H0L9.96816 66.7459C10.4241 65.3009 11.1945 63.7958 12.3692 62.6314H12.3939C13.8472 61.1976 15.7047 60.2692 18.0586 60.2692H21.1447L24.5341 66.5366H18.0586C16.9647 66.5366 16.3134 67.554 15.9967 68.5826L8.53066 92.7304H106.177ZM40.0479 43.7558L54.7732 29.0058V24.3303H48.1203V19.1762H54.7732V13.1559H59.9729V19.1762H66.8797V24.3303H59.9729V28.7475L74.9544 43.7558L70.5633 47.4161L69.602 46.4342V56.4108H60.3728V48.2532H54.5531V56.4108H45.4003V46.4186L44.4412 47.4161L40.0479 43.7558ZM57.5 36.6536C59.4092 36.6536 60.9567 38.1898 60.9567 40.08C60.9567 41.9725 59.4092 43.5065 57.5 43.5065C55.5908 43.5065 54.0455 41.9725 54.0455 40.08C54.0455 38.1898 55.5908 36.6536 57.5 36.6536ZM62.3718 85.2697C61.2013 86.0917 59.8037 86.5364 58.3692 86.5432C57.0755 86.5454 55.7772 86.1981 54.634 85.479L54.616 85.4589C51.047 83.208 47.752 80.7278 44.7646 78.0872C41.6718 75.371 38.8866 72.4433 36.4384 69.3886C33.1254 65.272 30.4121 60.9126 28.3367 56.4776C26.2187 51.9379 24.7609 47.2758 24.0152 42.6671C23.2358 37.8781 23.2224 33.1826 24.013 28.7542C24.8081 24.3125 26.3983 20.1179 28.8219 16.3397C29.7967 14.8391 30.922 13.3697 32.1978 11.9692C33.4084 10.6133 34.7763 9.33538 36.2744 8.15538C39.648 5.49258 43.2867 3.44427 47.0467 2.07057C50.8561 0.676833 54.8227 -0.0267161 58.7982 9.13162e-07C62.7581 0.0289444 66.6686 0.779248 70.3926 2.28208C73.9953 3.76265 77.4296 5.89556 80.5606 8.72757C81.6635 9.71832 82.7169 10.8271 83.7029 12.0204C84.7069 13.2294 85.5964 14.4784 86.378 15.7497C88.9565 19.9777 90.5445 24.7222 91.2071 29.7272C91.8832 34.799 91.6182 40.1646 90.4996 45.5325C88.8128 53.6545 85.2864 61.496 80.4034 68.3511C75.5968 75.0994 69.429 80.9615 62.3718 85.2697ZM59.3306 80.3404C58.778 80.7411 58.0278 80.7946 57.4146 80.4049C50.7842 76.2215 45.2071 71.1965 40.834 65.744C34.7942 58.232 30.9871 49.903 29.6866 41.8812C28.3614 33.7481 29.599 25.9267 33.6824 19.5636C35.2929 17.0477 37.348 14.7567 39.8547 12.7819C45.6182 8.22662 52.2015 5.82654 58.7511 5.8733C65.0671 5.91783 71.2978 8.25557 76.6816 13.1247C78.5751 14.828 80.1676 16.7828 81.4681 18.9023C85.8592 26.0692 86.8048 35.2108 84.8709 44.4772C81.8611 58.9935 72.1895 72.6036 59.3306 80.3404Z" fill="#D5ECFD" />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_610">
                                  <rect width="115" height="99" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </GridContainer>
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem sm={6}>
                  <Card style={{ backgroundColor: "#D5ECFD" }}>
                    <CardBody>
                      <GridContainer>
                        <GridItem sm={8}>
                          <h3 className={classes.title}>Service</h3>
                          <p style={{ fontSize: "20px", lineHeight: "200%" }}>The Church of Divine Structure is a worldwide heading community with its headquarters in Okanogan Country. Washington. We are affiliated with the Eastern Orthodox Catholic Church</p>
                        </GridItem>
                        <GridItem sm={4}>
                          <GridContainer style={{ justifyContent: "end" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="167" height="103" viewBox="0 0 167 103" fill="none">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5711 14.8384C20.1601 5.74161 31.0004 0.48999 43.861 0.48999C56.7217 0.48999 67.5619 5.74161 75.1509 14.8384C82.7135 23.9035 86.947 36.656 86.947 51.5674C86.947 66.4395 83.0508 79.0468 75.6291 87.9763C68.169 96.9519 57.3089 102.011 43.861 102.011C30.4131 102.011 19.553 96.9519 12.0929 87.9763C4.67122 79.0468 0.775024 66.4395 0.775024 51.5674C0.775024 36.656 5.00849 23.9035 12.5711 14.8384ZM30.3561 73.0777C33.4616 77.5201 37.9555 79.7699 43.861 79.7699C49.7665 79.7699 54.2604 77.5201 57.3659 73.0777C60.5517 68.5204 62.4231 61.4386 62.4231 51.5674C62.4231 41.3679 60.5477 34.1252 57.3571 29.4894C54.2512 24.9768 49.7629 22.7306 43.861 22.7306C37.9591 22.7306 33.4708 24.9768 30.3649 29.4894C27.1743 34.1252 25.2989 41.3679 25.2989 51.5674C25.2989 61.4386 27.1703 68.5204 30.3561 73.0777ZM166.959 100.1L95.7553 100.37V82.0344L127.477 55.6429C137.414 47.4672 140.913 42.1805 140.913 35.4577C140.913 31.021 139.818 27.9542 138.065 26.0134C136.343 24.1069 133.712 22.9843 129.962 22.9843C126.098 22.9843 123.278 24.2785 121.384 26.5287C119.446 28.8313 118.25 32.4062 118.25 37.3604V39.4745H93.5989V37.3604C93.5989 26.3762 97.1141 17.1221 103.512 10.605C109.913 4.08395 119.018 0.48999 129.835 0.48999C140.917 0.48999 150.048 3.47615 156.427 9.32232C162.832 15.192 166.198 23.7021 166.198 34.1892C166.198 47.9559 157.855 58.8966 146.034 68.7902C146.034 68.7904 146.033 68.7907 146.033 68.7909L136.411 76.8524H166.959V100.1ZM130.596 78.9665L144.676 67.1697C156.346 57.4024 164.084 47.0009 164.084 34.1892C164.084 14.1473 151.272 2.60412 129.835 2.60412C109.859 2.60412 96.6322 15.3913 95.7591 35.2463C95.7285 35.9424 95.713 36.6472 95.713 37.3604H116.136C116.136 26.8321 121.209 20.8702 129.962 20.8702C138.334 20.8702 143.027 25.9441 143.027 35.4577C143.027 43.1954 138.841 49.0304 128.82 57.2755L97.8694 83.0257V98.2474L164.845 97.9937V78.9665H130.596ZM43.861 2.60412C19.3794 2.60412 2.88915 22.5192 2.88915 51.5674C2.88915 80.6155 18.1109 99.8964 43.861 99.8964C69.6111 99.8964 84.8329 80.6155 84.8329 51.5674C84.8329 22.5192 68.3426 2.60412 43.861 2.60412ZM43.861 81.884C30.7957 81.884 23.1848 71.7362 23.1848 51.5674C23.1848 30.7643 30.7957 20.6165 43.861 20.6165C56.9263 20.6165 64.5372 30.7643 64.5372 51.5674C64.5372 71.7362 56.9263 81.884 43.861 81.884Z" fill="white" fillOpacity="0.5" />
                            </svg>
                          </GridContainer>
                          <GridContainer style={{ marginTop: "100px", justifyContent: "end" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="114" height="99" viewBox="0 0 114 99" fill="none">
                              <g clip-path="url(#clip0_1_614)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M58.946 0V5.63531H65.3496V10.4573H58.946V17.2067L88.0093 39.9686C89.4454 41.0916 89.6992 43.1684 88.5771 44.6056C87.4571 46.0428 85.3819 46.2969 83.9458 45.176L81.9864 43.6408V51.1456L112.143 62.4541C113.619 63.0045 114.37 64.6467 113.82 66.1218C113.272 67.5992 111.631 68.3501 110.155 67.7997L108.665 67.2315V99H5.3348V67.2315L3.84523 67.7997C2.37124 68.3501 0.730267 67.5992 0.180306 66.1218C-0.369655 64.6467 0.380697 63.0045 1.85691 62.4541L31.0872 51.4932V43.8079L29.1412 45.3454C27.7118 46.4751 25.6388 46.2322 24.51 44.8017C23.3811 43.3711 23.6238 41.2944 25.0532 40.1646L54.1277 17.2134V10.4573H47.9579V5.63531H54.1277V0H58.946ZM19.9544 70.6029C18.899 70.6029 17.9371 71.0374 17.238 71.7348C16.8798 72.091 16.5955 72.5146 16.4014 72.9811C16.2073 73.4476 16.1072 73.948 16.1069 74.4533V83.4288H23.8019V74.4533C23.8019 73.3971 23.37 72.4323 22.6708 71.7348C21.9739 71.0374 21.012 70.6029 19.9544 70.6029ZM19.9544 68.3434C21.6355 68.3434 23.1629 69.0297 24.2673 70.1372C25.3739 71.2446 26.0619 72.7732 26.0619 74.4533V85.6883H13.8492V74.4533C13.8492 72.7754 14.535 71.2491 15.6416 70.1416V70.1372C16.7482 69.0297 18.2756 68.3434 19.9544 68.3434ZM7.59476 66.3714V96.7405H31.0872V57.4093L7.59476 66.3714ZM57.6657 62.073V96.7405H67.6095V73.0963C67.6095 70.0503 66.3626 67.2805 64.3565 65.2706C62.5998 63.5147 60.2619 62.3404 57.6657 62.073ZM55.408 96.7405V62.073C52.8118 62.3404 50.4739 63.5147 48.7194 65.2706C46.711 67.2805 45.4664 70.0503 45.4664 73.0963V96.7405H55.408ZM79.7265 41.8715L56.5435 23.7133L33.3472 42.0253V96.7405H43.2064V73.0963C43.2064 69.4263 44.7071 66.0906 47.1207 63.6729C49.5365 61.2553 52.8697 59.7556 56.5368 59.7556C60.204 59.7556 63.5371 61.2553 65.953 63.6729C68.3688 66.0906 69.8673 69.4263 69.8673 73.0963V96.7405H79.7265V41.8715ZM94.0455 68.3434C95.7243 68.3434 97.2517 69.0297 98.3584 70.1372V70.1416C99.465 71.2491 100.151 72.7754 100.151 74.4533V85.6883H87.938V74.4533C87.938 72.7732 88.626 71.2446 89.7327 70.1372C90.837 69.0297 92.3644 68.3434 94.0455 68.3434ZM94.0455 70.6029C92.9879 70.6029 92.026 71.0374 91.3291 71.7348C90.6322 72.4323 90.198 73.3971 90.198 74.4533V83.4288H97.893V74.4533C97.893 73.3949 97.461 72.4301 96.7641 71.7326C96.065 71.0374 95.1009 70.6029 94.0455 70.6029ZM81.9864 57.0572V96.7405H106.405V66.3714L81.9864 57.0572ZM56.5146 35.1666C58.632 35.1666 60.5513 36.029 61.9429 37.4216L61.9541 37.4305C63.3457 38.8232 64.2051 40.744 64.2051 42.8631C64.2051 44.9822 63.3457 46.9052 61.9541 48.2978L61.9429 48.3068C60.5513 49.6994 58.632 50.5618 56.5146 50.5618C54.3971 50.5618 52.4778 49.6994 51.084 48.3068L51.0751 48.2978C49.6835 46.9052 48.8218 44.9822 48.8218 42.8631C48.8218 40.744 49.6835 38.8232 51.0751 37.4305L51.084 37.4216C52.4778 36.029 54.3971 35.1666 56.5146 35.1666ZM58.5229 40.8554C58.0108 40.3451 57.3005 40.0287 56.5146 40.0287C55.7286 40.0287 55.0183 40.3451 54.5062 40.8554C54.2432 41.1192 54.0349 41.4323 53.8932 41.7768C53.7514 42.1214 53.679 42.4905 53.6801 42.8631C53.6801 43.6519 53.9963 44.3627 54.5062 44.873C55.0183 45.3833 55.7286 45.6997 56.5146 45.6997C57.3005 45.6997 58.0108 45.3833 58.5229 44.873C59.0328 44.3627 59.3468 43.6519 59.3468 42.8631C59.3468 42.0765 59.0328 41.3657 58.5229 40.8554Z" fill="#2E3192" />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_614">
                                  <rect width="114" height="99" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </GridContainer>
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem sm={6}>
                  <Card style={{ backgroundColor: "#D5ECFD" }}>
                    <CardBody>
                      <GridContainer>
                        <GridItem sm={8}>
                          <h3 className={classes.title}>Service</h3>
                          <p style={{ fontSize: "20px", lineHeight: "200%" }}>The Church of Divine Structure is a worldwide heading community with its headquarters in Okanogan Country. Washington. We are affiliated with the Eastern Orthodox Catholic Church</p>
                        </GridItem>
                        <GridItem sm={4}>
                          <GridContainer style={{ justifyContent: "end" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="164" height="103" viewBox="0 0 164 103" fill="none">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0902 14.9226C19.6793 5.82583 30.5195 0.574219 43.3802 0.574219C56.2408 0.574219 67.0811 5.82583 74.6701 14.9226C82.2327 23.9877 86.4661 36.7403 86.4661 51.6516C86.4661 66.5237 82.5699 79.131 75.1483 88.0605C67.6882 97.0361 56.8281 102.095 43.3802 102.095C29.9322 102.095 19.0721 97.0361 11.6121 88.0605C4.19038 79.131 0.294189 66.5237 0.294189 51.6516C0.294189 36.7403 4.52766 23.9877 12.0902 14.9226ZM29.8753 73.1619C32.9808 77.6043 37.4747 79.8541 43.3802 79.8541C49.2856 79.8541 53.7795 77.6043 56.885 73.1619C60.0709 68.6046 61.9422 61.5229 61.9422 51.6516C61.9422 41.4521 60.0669 34.2094 56.8763 29.5737C53.7703 25.061 49.2821 22.8149 43.3802 22.8149C37.4783 22.8149 32.99 25.061 29.8841 29.5737C26.6934 34.2094 24.8181 41.4521 24.8181 51.6516C24.8181 61.5229 26.6894 68.6046 29.8753 73.1619ZM108.847 56.3027V40.1207L109.466 39.5015C109.701 39.2664 109.932 39.094 110.055 39.0017L110.073 38.988C110.207 38.8878 110.221 38.8741 110.227 38.8676L110.277 38.8178L126.522 24.5907H94.6402V2.35008H160.009V21.7846L142.216 37.4103C153.986 42.1722 163.18 52.5629 163.18 68.1418C163.18 89.3842 145.942 102.095 126.056 102.095C116.507 102.095 107.572 99.1759 100.995 93.3317C94.3834 87.4568 90.3274 78.7753 90.3274 67.6344V65.5203H114.851V67.6344C114.851 71.8345 116.107 74.7948 118.044 76.7057C119.987 78.6233 122.861 79.7273 126.564 79.7273C130.065 79.7273 132.857 78.5424 134.774 76.5877C136.692 74.6304 137.895 71.7338 137.895 68.015C137.895 64.6646 136.934 61.7961 134.96 59.771C133.001 57.7615 129.771 56.3027 124.661 56.3027H108.847ZM140.426 38.9827C139.663 38.6996 138.89 38.4406 138.107 38.2057L157.895 20.8276V4.46422H96.7544V22.4766H132.145L111.722 40.3621C111.596 40.489 111.469 40.5841 111.342 40.6793C111.215 40.7744 111.088 40.8695 110.961 40.9964V54.1886H124.661C135.697 54.1886 140.009 60.531 140.009 68.015C140.009 76.3869 134.555 81.8414 126.564 81.8414C118.318 81.8414 112.737 76.8943 112.737 67.6344H92.4415C92.4415 68.3506 92.4591 69.0554 92.4937 69.7486C93.4827 89.56 108.408 99.9806 126.056 99.9806C145.083 99.9806 161.066 87.9301 161.066 68.1418C161.066 53.1454 152.021 43.286 140.426 38.9827ZM43.3802 2.68835C18.8985 2.68835 2.40832 22.6035 2.40832 51.6516C2.40832 80.6998 17.6301 99.9806 43.3802 99.9806C69.1303 99.9806 84.352 80.6998 84.352 51.6516C84.352 22.6035 67.8618 2.68835 43.3802 2.68835ZM43.3802 81.9682C30.3148 81.9682 22.704 71.8204 22.704 51.6516C22.704 30.8486 30.3148 20.7007 43.3802 20.7007C56.4455 20.7007 64.0564 30.8486 64.0564 51.6516C64.0564 71.8204 56.4455 81.9682 43.3802 81.9682Z" fill="white" fillOpacity="0.5" />
                            </svg>
                          </GridContainer>
                          <GridContainer style={{ marginTop: "100px", justifyContent: "end" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="114" height="99" viewBox="0 0 114 99" fill="none">
                              <g clip-path="url(#clip0_1_614)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M58.946 0V5.63531H65.3496V10.4573H58.946V17.2067L88.0093 39.9686C89.4454 41.0916 89.6992 43.1684 88.5771 44.6056C87.4571 46.0428 85.3819 46.2969 83.9458 45.176L81.9864 43.6408V51.1456L112.143 62.4541C113.619 63.0045 114.37 64.6467 113.82 66.1218C113.272 67.5992 111.631 68.3501 110.155 67.7997L108.665 67.2315V99H5.3348V67.2315L3.84523 67.7997C2.37124 68.3501 0.730267 67.5992 0.180306 66.1218C-0.369655 64.6467 0.380697 63.0045 1.85691 62.4541L31.0872 51.4932V43.8079L29.1412 45.3454C27.7118 46.4751 25.6388 46.2322 24.51 44.8017C23.3811 43.3711 23.6238 41.2944 25.0532 40.1646L54.1277 17.2134V10.4573H47.9579V5.63531H54.1277V0H58.946ZM19.9544 70.6029C18.899 70.6029 17.9371 71.0374 17.238 71.7348C16.8798 72.091 16.5955 72.5146 16.4014 72.9811C16.2073 73.4476 16.1072 73.948 16.1069 74.4533V83.4288H23.8019V74.4533C23.8019 73.3971 23.37 72.4323 22.6708 71.7348C21.9739 71.0374 21.012 70.6029 19.9544 70.6029ZM19.9544 68.3434C21.6355 68.3434 23.1629 69.0297 24.2673 70.1372C25.3739 71.2446 26.0619 72.7732 26.0619 74.4533V85.6883H13.8492V74.4533C13.8492 72.7754 14.535 71.2491 15.6416 70.1416V70.1372C16.7482 69.0297 18.2756 68.3434 19.9544 68.3434ZM7.59476 66.3714V96.7405H31.0872V57.4093L7.59476 66.3714ZM57.6657 62.073V96.7405H67.6095V73.0963C67.6095 70.0503 66.3626 67.2805 64.3565 65.2706C62.5998 63.5147 60.2619 62.3404 57.6657 62.073ZM55.408 96.7405V62.073C52.8118 62.3404 50.4739 63.5147 48.7194 65.2706C46.711 67.2805 45.4664 70.0503 45.4664 73.0963V96.7405H55.408ZM79.7265 41.8715L56.5435 23.7133L33.3472 42.0253V96.7405H43.2064V73.0963C43.2064 69.4263 44.7071 66.0906 47.1207 63.6729C49.5365 61.2553 52.8697 59.7556 56.5368 59.7556C60.204 59.7556 63.5371 61.2553 65.953 63.6729C68.3688 66.0906 69.8673 69.4263 69.8673 73.0963V96.7405H79.7265V41.8715ZM94.0455 68.3434C95.7243 68.3434 97.2517 69.0297 98.3584 70.1372V70.1416C99.465 71.2491 100.151 72.7754 100.151 74.4533V85.6883H87.938V74.4533C87.938 72.7732 88.626 71.2446 89.7327 70.1372C90.837 69.0297 92.3644 68.3434 94.0455 68.3434ZM94.0455 70.6029C92.9879 70.6029 92.026 71.0374 91.3291 71.7348C90.6322 72.4323 90.198 73.3971 90.198 74.4533V83.4288H97.893V74.4533C97.893 73.3949 97.461 72.4301 96.7641 71.7326C96.065 71.0374 95.1009 70.6029 94.0455 70.6029ZM81.9864 57.0572V96.7405H106.405V66.3714L81.9864 57.0572ZM56.5146 35.1666C58.632 35.1666 60.5513 36.029 61.9429 37.4216L61.9541 37.4305C63.3457 38.8232 64.2051 40.744 64.2051 42.8631C64.2051 44.9822 63.3457 46.9052 61.9541 48.2978L61.9429 48.3068C60.5513 49.6994 58.632 50.5618 56.5146 50.5618C54.3971 50.5618 52.4778 49.6994 51.084 48.3068L51.0751 48.2978C49.6835 46.9052 48.8218 44.9822 48.8218 42.8631C48.8218 40.744 49.6835 38.8232 51.0751 37.4305L51.084 37.4216C52.4778 36.029 54.3971 35.1666 56.5146 35.1666ZM58.5229 40.8554C58.0108 40.3451 57.3005 40.0287 56.5146 40.0287C55.7286 40.0287 55.0183 40.3451 54.5062 40.8554C54.2432 41.1192 54.0349 41.4323 53.8932 41.7768C53.7514 42.1214 53.679 42.4905 53.6801 42.8631C53.6801 43.6519 53.9963 44.3627 54.5062 44.873C55.0183 45.3833 55.7286 45.6997 56.5146 45.6997C57.3005 45.6997 58.0108 45.3833 58.5229 44.873C59.0328 44.3627 59.3468 43.6519 59.3468 42.8631C59.3468 42.0765 59.0328 41.3657 58.5229 40.8554Z" fill="#2E3192" />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_614">
                                  <rect width="114" height="99" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </GridContainer>
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem sm={6}>
                  <Card>
                    <CardBody>
                      <GridContainer>
                        <GridItem sm={8}>
                          <h3 className={classes.title}>Service</h3>
                          <p style={{ fontSize: "20px", lineHeight: "200%" }}>The Church of Divine Structure is a worldwide heading community with its headquarters in Okanogan Country. Washington. We are affiliated with the Eastern Orthodox Catholic Church</p>
                        </GridItem>
                        <GridItem sm={4}>
                          <GridContainer style={{ justifyContent: "end" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="174" height="102" viewBox="0 0 174 102" fill="none">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8319 14.5503C19.421 5.45352 30.2612 0.201904 43.1219 0.201904C55.9825 0.201904 66.8228 5.45352 74.4118 14.5503C81.9744 23.6154 86.2079 36.368 86.2079 51.2793C86.2079 66.1514 82.3117 78.7587 74.89 87.6882C67.4299 96.6638 56.5698 101.722 43.1219 101.722C29.6739 101.722 18.8138 96.6638 11.3538 87.6882C3.93208 78.7587 0.0358887 66.1514 0.0358887 51.2793C0.0358887 36.368 4.26936 23.6154 11.8319 14.5503ZM29.617 72.7896C32.7225 77.232 37.2164 79.4818 43.1219 79.4818C49.0273 79.4818 53.5212 77.232 56.6267 72.7896C59.8126 68.2323 61.6839 61.1505 61.6839 51.2793C61.6839 41.0798 59.8086 33.8371 56.618 29.2013C53.512 24.6887 49.0238 22.4426 43.1219 22.4426C37.22 22.4426 32.7317 24.6887 29.6258 29.2013C26.4351 33.8371 24.5598 41.0798 24.5598 51.2793C24.5598 61.1505 26.4311 68.2323 29.617 72.7896ZM173.45 83.4564H161.907V100.073H138.271V83.4564H91.5913V62.6767L133.054 1.97777H161.907V61.2157H173.45V83.4564ZM159.793 63.3298V4.0919H134.17L93.7054 63.3298V81.3422H140.385V97.9593H159.793V81.3422H171.336V63.3298H159.793ZM140.385 63.3298H115.523L140.385 26.7977V63.3298ZM138.271 33.6618L119.519 61.2157H138.271V33.6618ZM43.1219 2.31603C18.6402 2.31603 2.15002 22.2311 2.15002 51.2793C2.15002 80.3274 17.3718 99.6083 43.1219 99.6083C68.872 99.6083 84.0937 80.3274 84.0937 51.2793C84.0937 22.2311 67.6035 2.31603 43.1219 2.31603ZM43.1219 81.5959C30.0565 81.5959 22.4457 71.4481 22.4457 51.2793C22.4457 30.4763 30.0565 20.3284 43.1219 20.3284C56.1872 20.3284 63.7981 30.4763 63.7981 51.2793C63.7981 71.4481 56.1872 81.5959 43.1219 81.5959Z" fill="#D5ECFD" />
                            </svg>
                          </GridContainer>
                          <GridContainer style={{ marginTop: "100px", justifyContent: "end" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="115" height="99" viewBox="0 0 115 99" fill="none">
                              <g clip-path="url(#clip0_1_612)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M106.177 92.7304L97.878 68.5826C97.5164 67.5273 96.9077 66.5366 95.8161 66.5366H91.1712L94.2843 60.2692H95.8161C98.4171 60.2692 100.38 61.3646 101.863 63.05C102.826 64.1432 103.446 65.3811 103.857 66.5744L115 99H0L9.96816 66.7459C10.4241 65.3009 11.1945 63.7958 12.3692 62.6314H12.3939C13.8472 61.1976 15.7047 60.2692 18.0586 60.2692H21.1447L24.5341 66.5366H18.0586C16.9647 66.5366 16.3134 67.554 15.9967 68.5826L8.53066 92.7304H106.177ZM40.0479 43.7558L54.7732 29.0058V24.3303H48.1203V19.1762H54.7732V13.1559H59.9729V19.1762H66.8797V24.3303H59.9729V28.7475L74.9544 43.7558L70.5633 47.4161L69.602 46.4342V56.4108H60.3728V48.2532H54.5531V56.4108H45.4003V46.4186L44.4412 47.4161L40.0479 43.7558ZM57.5 36.6536C59.4092 36.6536 60.9567 38.1898 60.9567 40.08C60.9567 41.9725 59.4092 43.5065 57.5 43.5065C55.5908 43.5065 54.0455 41.9725 54.0455 40.08C54.0455 38.1898 55.5908 36.6536 57.5 36.6536ZM62.3718 85.2697C61.2013 86.0917 59.8037 86.5364 58.3692 86.5432C57.0755 86.5454 55.7772 86.1981 54.634 85.479L54.616 85.4589C51.047 83.208 47.752 80.7278 44.7646 78.0872C41.6718 75.371 38.8866 72.4433 36.4384 69.3886C33.1254 65.272 30.4121 60.9126 28.3367 56.4776C26.2187 51.9379 24.7609 47.2758 24.0152 42.6671C23.2358 37.8781 23.2224 33.1826 24.013 28.7542C24.8081 24.3125 26.3983 20.1179 28.8219 16.3397C29.7967 14.8391 30.922 13.3697 32.1978 11.9692C33.4084 10.6133 34.7763 9.33538 36.2744 8.15538C39.648 5.49258 43.2867 3.44427 47.0467 2.07057C50.8561 0.676833 54.8227 -0.0267161 58.7982 9.13162e-07C62.7581 0.0289444 66.6686 0.779248 70.3926 2.28208C73.9953 3.76265 77.4296 5.89556 80.5606 8.72757C81.6635 9.71832 82.7169 10.8271 83.7029 12.0204C84.7069 13.2294 85.5964 14.4784 86.378 15.7497C88.9565 19.9777 90.5445 24.7222 91.2071 29.7272C91.8832 34.799 91.6182 40.1646 90.4996 45.5325C88.8128 53.6545 85.2864 61.496 80.4034 68.3511C75.5968 75.0994 69.429 80.9615 62.3718 85.2697ZM59.3306 80.3404C58.778 80.7411 58.0278 80.7946 57.4146 80.4049C50.7842 76.2215 45.2071 71.1965 40.834 65.744C34.7942 58.232 30.9871 49.903 29.6866 41.8812C28.3614 33.7481 29.599 25.9267 33.6824 19.5636C35.2929 17.0477 37.348 14.7567 39.8547 12.7819C45.6182 8.22662 52.2015 5.82654 58.7511 5.8733C65.0671 5.91783 71.2978 8.25557 76.6816 13.1247C78.5751 14.828 80.1676 16.7828 81.4681 18.9023C85.8592 26.0692 86.8048 35.2108 84.8709 44.4772C81.8611 58.9935 72.1895 72.6036 59.3306 80.3404Z" fill="#D5ECFD" />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_612">
                                  <rect width="115" height="99" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </GridContainer>
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>

            {/* Services */}

            {/* Products */}

            <GridContainer justify="center" style={{ marginTop: "70px" }} id="product_section">
              <img src="/img/CoDS_Black_Logo.png" alt="...."></img>
            </GridContainer>
            <GridContainer justify="center">
              <h4 className={classes.title} style={{ color: '#2E3192' }}>OUR LATEST</h4>
            </GridContainer>
            <GridContainer justify="center">
              <h2 className={classes.title}>Featured  <span style={{ color: '#2E3192' }}>Products</span></h2>
            </GridContainer>
            <GridContainer  >
              <GridItem sm={4}>
                <Card style={{ backgroundColor: "#F8F8F8", marginTop: "150px" }}>
                  <CardBody>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                      <img src="/img/airbuds.png" alt="..." style={{ width: "auto", height: "25vh", marginTop: "-150px" }}></img>
                    </div>
                    <h3 className={classes.title} style={{ color: "#2E3192" }}>Air Buds</h3>
                    <p>Air Buds are designed to replace electronic ear buds.</p>
                    <Rating name="read-only" value={4} readOnly />
                    <Grid container direction="row" justify="space-around" alignItems="flex-end">
                      <h2 className={classes.title} style={{ color: "#2E3192" }}>$25</h2>
                      <h7 className={classes.title} style={{ display: "flex" }}><ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>Add to Cart</h7>
                      <h7 className={classes.title} style={{ display: "flex" }}><FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon> Save</h7>
                    </Grid>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem sm={4}>
                <Card style={{ backgroundColor: "#F8F8F8", marginTop: "150px" }}>
                  <CardBody>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                      <img src="img/bioprotein.png" alt="..." style={{ width: "auto", height: "25vh", marginTop: "-150px" }}></img>
                    </div>
                    <h3 className={classes.title} style={{ color: "#2E3192" }}>BioProtein-Plus</h3>
                    <p>Air Buds are designed to replace electronic ear buds.</p>
                    <Rating name="read-only" value={4} readOnly />
                    <Grid container direction="row" justify="space-around" alignItems="flex-end">
                      <h2 className={classes.title} style={{ color: "#2E3192" }}>$25</h2>
                      <h7 className={classes.title} style={{ display: "flex" }}><ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>Add to Cart</h7>
                      <h7 className={classes.title} style={{ display: "flex" }}><FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon> Save</h7>
                    </Grid>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem sm={4}>
                <Card style={{ backgroundColor: "#F8F8F8", marginTop: "150px" }}>
                  <CardBody>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
                      <img src="/img/grander.png" alt="..." style={{ width: "auto", height: "25vh", marginTop: "-150px" }}></img>
                    </div>
                    <h3 className={classes.title} style={{ color: "#2E3192" }}>Grander Penergizer</h3>
                    <p>Air Buds are designed to replace electronic ear buds.</p>
                    <Rating name="read-only" value={4} readOnly />
                    <Grid container direction="row" justify="space-around" alignItems="flex-end">
                      <h2 className={classes.title} style={{ color: "#2E3192" }}>$25</h2>
                      <h7 className={classes.title} style={{ display: "flex" }}><ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>Add to Cart</h7>
                      <h7 className={classes.title} style={{ display: "flex" }}><FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon> Save</h7>
                    </Grid>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>

            {/* Products */}

            {/* Our Story */}

            <GridContainer style={{ marginTop: "50px", backgroundColor: "#F8F8F8" }}>
              <GridItem sm={5}>
                <img src="/img/yellowdean.png" style={{ width: "100%" }}></img>
              </GridItem>
              <GridItem sm={1} >
                <div style={{
                  width: "20%",
                  backgroundColor: "#2E3192",
                  height: "8vh",
                  marginTop: "10vh",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: "10px"
                }} ></div>
                <div style={{
                  width: "20%",
                  backgroundColor: "#dddddd",
                  height: "50vh",
                  marginTop: "4vh",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderRadius: "10px"
                }} ></div>
              </GridItem>
              <GridItem sm={6}>
                <h1 className={classes.title}>OUR<span style={{ color: '#2E3192' }}> Story</span></h1>
                <h2 className={classes.title}>Our Journey</h2>
                <p style={{ lineHeight: "200%", fontSize: "18px" }} >
                  Our Church is, first and foremost, a healing organization. We have been a private membership association since 2001. We believe in healing rather than to simply offer treatments. We hope that we will raise enough money o that some day we can have We do not believe that medicine should be practiced as a form of commerce.
                  The healing services of the Church Of Divine Structure are delivered all over the world by our sanctified ministers and deacons. The main two healers, Rev Dr Howell and Rev Rebecca, come back for rest and recovery to the CoDS’ headquarters in the Okanogan highlands in north-central Washington.
                  Our Church is, first and foremost, a healing organization. We have been a private membership association since 2001. We believe in healing rather than to simply offer treatments. We hope that we will raise enough money o that some day we can have We do not believe that medicine should be practiced as a form of commerce.
                  The healing services of the Church Of Divine Structure are delivered all over the world by our sanctified ministers and deacons. The main two healers, Rev Dr Howell and Rev Rebecca, come back for rest and recovery to the CoDS’ headquarters in the Okanogan highlands in north-central Washington.
                </p>
                <Button color="primary" size="lg">
                  Explore
                </Button>
              </GridItem>
            </GridContainer>

            {/* Our Story */}

            {/* Testimonials */}

            <GridContainer justify="center" style={{ marginTop: "50px" }}>
              <h4 className={classes.title} style={{ color: '#2E3192' }}>Testimonials</h4>
            </GridContainer>
            <GridContainer justify="center">
              <h2 className={classes.title}>What Our Clients Say <span style={{ color: '#2E3192' }}>About Us  </span></h2>
            </GridContainer>
            <Slider spac {...testimonial_settings}>
              <div>
                <Card className={classes.slideCard}>
                  <CardBody>
                    <GridContainer>
                      <p>"It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text."</p>
                    </GridContainer>
                    <GridContainer justify="flex-start" alignItems="center" space="5px">
                      <GridItem sm={2}>
                        <img src="/img/avatar1.jpg" style={{ width: "70px", height: "70px", borderRadius: "50%" }}></img>
                      </GridItem>
                      <GridItem sm={7}>
                        <h6 className={classes.title} style={{ marginTop: "10px" }}>Elsi Hansdottir</h6>
                        <p style={{ marginTop: "-10px" }}>Meditation</p>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </div>
              <div>
                <Card className={classes.slideCard}>
                  <CardBody>
                    <GridContainer>
                      <p>"It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text."</p>
                    </GridContainer>
                    <GridContainer justify="flex-start" alignItems="center" space="5px">
                      <GridItem sm={2}>
                        <img src="/img/avatar2.jpg" style={{ width: "70px", height: "70px", borderRadius: "50%" }}></img>
                      </GridItem>
                      <GridItem sm={7}>
                        <h6 className={classes.title} style={{ marginTop: "10px" }}>Elsi Hansdottir</h6>
                        <p style={{ marginTop: "-10px" }}>Meditation</p>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </div>
              <div>
                <Card className={classes.slideCard}>
                  <CardBody>
                    <GridContainer>
                      <p>"It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text."</p>
                    </GridContainer>
                    <GridContainer justify="flex-start" alignItems="center" space="5px">
                      <GridItem sm={2}>
                        <img src="/img/avatar1.jpg" style={{ width: "70px", height: "70px", borderRadius: "50%" }}></img>
                      </GridItem>
                      <GridItem sm={7}>
                        <h6 className={classes.title} style={{ marginTop: "10px" }}>Elsi Hansdottir</h6>
                        <p style={{ marginTop: "-10px" }}>Meditation</p>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </div>
              <div>
                <Card className={classes.slideCard}>
                  <CardBody>
                    <GridContainer>
                      <p>"It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text."</p>
                    </GridContainer>
                    <GridContainer justify="flex-start" alignItems="center" space="5px">
                      <GridItem sm={2}>
                        <img src="/img/avatar2.jpg" style={{ width: "70px", height: "70px", borderRadius: "50%" }}></img>
                      </GridItem>
                      <GridItem sm={7}>
                        <h6 className={classes.title} style={{ marginTop: "10px" }}>Elsi Hansdottir</h6>
                        <p style={{ marginTop: "-10px" }}>Meditation</p>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </div>
            </Slider>
            {/* Testimonials */}

            {/* Membership */}

            <GridContainer justify="center" style={{ marginTop: "50px" }}>
              <h4 className={classes.title} style={{ color: '#2E3192' }}>CODS ISLAND</h4>
            </GridContainer>
            <GridContainer justify="center">
              <h2 className={classes.title}>Our <span style={{ color: '#2E3192' }}>Pricing & Membership</span></h2>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <NavPills
                  color="primary"
                  alignCenter={true}
                  tabs={[
                    {
                      tabButton: "Monthly",
                      tabContent: (
                        <GridContainer>
                          <GridItem sm={3}>
                            <Card>
                              <CardBody>
                                <GridContainer>
                                  <h3 className={classes.title} style={{ color: "#231D4F" }}>$2&nbsp; <span style={{ color: "black", fontSize: "15px" }}>/month</span></h3>
                                </GridContainer>
                                <GridContainer>
                                  <h3 className={classes.title} style={{ color: "#231D4F" }}>Intro</h3>
                                </GridContainer>
                                <GridContainer>
                                  <p>For most businesses that want to otpimize web queries</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;All limited links</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Own analytics platform</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Chat support</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Optimize hashtags</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Unlimited users</p>
                                </GridContainer>
                                <GridContainer justify="center">
                                  <Button round color="primary" size="md">
                                    Choose Plan
                                  </Button>
                                </GridContainer>
                              </CardBody>
                            </Card>
                          </GridItem>
                          <GridItem sm={3}>
                            <Card>
                              <CardBody>
                                <GridContainer>
                                  <h3 className={classes.title} style={{ color: "#231D4F" }}>$5&nbsp; <span style={{ color: "black", fontSize: "15px" }}>/month</span></h3>
                                </GridContainer>
                                <GridContainer>
                                  <h3 className={classes.title} style={{ color: "#231D4F" }}>Base</h3>
                                </GridContainer>
                                <GridContainer>
                                  <p>For most businesses that want to otpimize web queries</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;All limited links</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Own analytics platform</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Chat support</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Optimize hashtags</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Unlimited users</p>
                                </GridContainer>
                                <GridContainer justify="center">
                                  <Button round color="primary" size="md">
                                    Choose Plan
                                  </Button>
                                </GridContainer>
                              </CardBody>
                            </Card>
                          </GridItem>
                          <GridItem sm={3}>
                            <Card style={{ backgroundColor: "#5243C2", color: "white" }}>
                              <CardBody>
                                <GridContainer>
                                  <h3 className={classes.title} style={{ color: "white" }}>$100&nbsp; <span style={{ color: "white", fontSize: "15px" }}>/month</span></h3>
                                </GridContainer>
                                <GridContainer>
                                  <h3 className={classes.title} style={{ color: "white" }}>Pro</h3>
                                </GridContainer>
                                <GridContainer>
                                  <p>For most businesses that want to otpimize web queries</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                                    <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white" />
                                    <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;All limited links</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                                    <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white" />
                                    <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Own analytics platform</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                                    <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white" />
                                    <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Chat support</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                                    <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white" />
                                    <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Optimize hashtags</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                                    <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white" />
                                    <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Unlimited users</p>
                                </GridContainer>
                                <GridContainer justify="center">
                                  <Button round color="primary" size="md">
                                    Choose Plan
                                  </Button>
                                </GridContainer>
                              </CardBody>
                            </Card>
                          </GridItem>
                          <GridItem sm={3}>
                            <Card>
                              <CardBody>
                                <GridContainer>
                                  <h3 className={classes.title} style={{ color: "#231D4F" }}>$20&nbsp; <span style={{ color: "black", fontSize: "15px" }}>/month</span></h3>
                                </GridContainer>
                                <GridContainer>
                                  <h3 className={classes.title} style={{ color: "#231D4F" }}>Enterprise</h3>
                                </GridContainer>
                                <GridContainer>
                                  <p>For most businesses that want to otpimize web queries</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;All limited links</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Own analytics platform</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Chat support</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Optimize hashtags</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Unlimited users</p>
                                </GridContainer>
                                <GridContainer justify="center">
                                  <Button round color="primary" size="md">
                                    Choose Plan
                                  </Button>
                                </GridContainer>
                              </CardBody>
                            </Card>
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Yearly",
                      tabContent: (
                        <GridContainer>
                          <GridItem sm={3}>
                            <Card>
                              <CardBody>
                                <GridContainer>
                                  <h3 className={classes.title} style={{ color: "#231D4F" }}>$2&nbsp; <span style={{ color: "black", fontSize: "15px" }}>/year</span></h3>
                                </GridContainer>
                                <GridContainer>
                                  <h3 className={classes.title} style={{ color: "#231D4F" }}>Intro</h3>
                                </GridContainer>
                                <GridContainer>
                                  <p>For most businesses that want to otpimize web queries</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;All limited links</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Own analytics platform</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Chat support</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Optimize hashtags</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Unlimited users</p>
                                </GridContainer>
                                <GridContainer justify="center">
                                  <Button round color="primary" size="md">
                                    Choose Plan
                                  </Button>
                                </GridContainer>
                              </CardBody>
                            </Card>
                          </GridItem>
                          <GridItem sm={3}>
                            <Card>
                              <CardBody>
                                <GridContainer>
                                  <h3 className={classes.title} style={{ color: "#231D4F" }}>$5&nbsp; <span style={{ color: "black", fontSize: "15px" }}>/year</span></h3>
                                </GridContainer>
                                <GridContainer>
                                  <h3 className={classes.title} style={{ color: "#231D4F" }}>Base</h3>
                                </GridContainer>
                                <GridContainer>
                                  <p>For most businesses that want to otpimize web queries</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;All limited links</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Own analytics platform</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Chat support</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Optimize hashtags</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Unlimited users</p>
                                </GridContainer>
                                <GridContainer justify="center">
                                  <Button round color="primary" size="md">
                                    Choose Plan
                                  </Button>
                                </GridContainer>
                              </CardBody>
                            </Card>
                          </GridItem>
                          <GridItem sm={3}>
                            <Card style={{ backgroundColor: "#5243C2", color: "white" }}>
                              <CardBody>
                                <GridContainer>
                                  <h3 className={classes.title} style={{ color: "white" }}>$100&nbsp; <span style={{ color: "white", fontSize: "15px" }}>/year</span></h3>
                                </GridContainer>
                                <GridContainer>
                                  <h3 className={classes.title} style={{ color: "white" }}>Pro</h3>
                                </GridContainer>
                                <GridContainer>
                                  <p>For most businesses that want to otpimize web queries</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                                    <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white" />
                                    <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;All limited links</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                                    <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white" />
                                    <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Own analytics platform</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                                    <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white" />
                                    <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Chat support</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                                    <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white" />
                                    <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Optimize hashtags</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                                    <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white" />
                                    <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Unlimited users</p>
                                </GridContainer>
                                <GridContainer justify="center">
                                  <Button round color="primary" size="md">
                                    Choose Plan
                                  </Button>
                                </GridContainer>
                              </CardBody>
                            </Card>
                          </GridItem>
                          <GridItem sm={3}>
                            <Card>
                              <CardBody>
                                <GridContainer>
                                  <h3 className={classes.title} style={{ color: "#231D4F" }}>$20&nbsp; <span style={{ color: "black", fontSize: "15px" }}>/year</span></h3>
                                </GridContainer>
                                <GridContainer>
                                  <h3 className={classes.title} style={{ color: "#231D4F" }}>Enterprise</h3>
                                </GridContainer>
                                <GridContainer>
                                  <p>For most businesses that want to otpimize web queries</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;All limited links</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Own analytics platform</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Chat support</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Optimize hashtags</p>
                                </GridContainer>
                                <GridContainer>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                    <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693" />
                                    <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2" />
                                  </svg><p>&nbsp;&nbsp;&nbsp;Unlimited users</p>
                                </GridContainer>
                                <GridContainer justify="center">
                                  <Button round color="primary" size="md">
                                    Choose Plan
                                  </Button>
                                </GridContainer>
                              </CardBody>
                            </Card>
                          </GridItem>
                        </GridContainer>
                      )
                    },
                  ]}
                />
              </GridItem>
            </GridContainer>
            {/* Membership */}

            {/* Contact US */}

            <GridContainer justify="center" style={{ marginTop: "50px" }} id="contact_section">
              <h4 className={classes.title} style={{ color: '#2E3192' }}>CODS ISLAND</h4>
            </GridContainer>
            <GridContainer justify="center">
              <h2 className={classes.title}>Contact  <span style={{ color: '#2E3192' }}>Us </span></h2>
            </GridContainer>
            <GridContainer>
              <Card>
                <CardBody>
                  <GridContainer>
                    <GridItem sm={6} style={{ backgroundColor: "#1D1D1E", borderRadius: "5px", overflow: "hidden" }}>
                      <h3 className={classes.title} style={{ color: "white" }}>Contact Information</h3>
                      <h6 className={classes.title} style={{ color: "white" }}>Say something to start a live chat!</h6>
                      <GridContainer style={{ color: "white", marginLeft: "0px", marginTop: "100px" }}><PhoneIcon></PhoneIcon><p style={{ marginBottom: "10px" }}>&nbsp;&nbsp;+1012 3456 789</p></GridContainer>
                      <GridContainer style={{ color: "white", marginLeft: "0px" }}><MailIcon></MailIcon><p style={{ marginBottom: "10px" }}>&nbsp;&nbsp;demo@gmail.com</p></GridContainer>
                      <GridContainer style={{ color: "white", marginLeft: "0px" }}><RoomIcon></RoomIcon><p style={{ marginBottom: "10px" }}>&nbsp;&nbsp;132 Dartmouth Street Boston, Massachusetts 02156 United States</p></GridContainer>
                      <GridContainer justify="space-between" style={{ color: "white", marginLeft: "0px", marginTop: "150px", marginBottom: "50px", width: "20%" }}>
                        <TwitterIcon ></TwitterIcon>
                        <InstagramIcon></InstagramIcon>
                        <FacebookIcon></FacebookIcon>
                      </GridContainer>

                      {/* <div style={{width: "138px", height: "138px", backgroundColor: "#484848", borderRadius: "138px", left: "60%", top: "25%", position: "relative", opacity: "0.5", zIndex: "20"}}></div> */}
                      <GridContainer justify="flex-end" style={{position: "relative"}}>
                          <div style={{width: "138px", height: "138px", backgroundColor: "#484848", borderRadius: "138px", transform: "translateX(-50%) translateY(-150%)", position: "absolute", zIndex: "70", opacity: "0.5"}}></div>
                          <div style={{width: "269px", height: "269px", backgroundColor: "#0A0D84", borderRadius: "269px", transform: "translateX(30%) translateY(-70%)", position: "absolute", zIndex: "60"}}></div>
                      </GridContainer>
                    </GridItem>
                    <GridItem sm={6}>
                      <GridContainer>
                        <GridItem sm={6}>
                          <CustomInput
                            labelText="First Name..."
                            id="f_name"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "text",
                              endAdornment: (
                                <InputAdornment position="end">
                                </InputAdornment>
                              )
                            }}
                          />
                        </GridItem>
                        <GridItem sm={6}>
                          <CustomInput
                            labelText="Last Name..."
                            id="l_name"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "text",
                              endAdornment: (
                                <InputAdornment position="end">
                                </InputAdornment>
                              )
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem sm={6}>
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
                                </InputAdornment>
                              )
                            }}
                          />
                        </GridItem>
                        <GridItem sm={6}>
                          <CustomInput
                            labelText="Phone Number..."
                            id="phone"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: "phone",
                              endAdornment: (
                                <InputAdornment position="end">
                                </InputAdornment>
                              )
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem>
                          <h4 className={classes.title}>Select Subject?</h4>
                        </GridItem>
                      </GridContainer>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={selectedEnabled === "b"}
                            onChange={() => setSelectedEnabled("b")}
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
                        label="General Inquiry"
                      />
                      <GridContainer justify="flex-end" style={{ marginTop: "100px" }}>
                        <Button round color="primary" size="md">Send Message</Button>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridContainer>
            {/* Contact US */}

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
