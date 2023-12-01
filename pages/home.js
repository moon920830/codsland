import React, {useState} from "react";
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
import Slider  from "react-slick";
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
import { Container } from "@material-ui/core";

const useStyles = makeStyles(theme=>{return{
  ...styles,
  slideCard:{
    backgroundColor:"#F5F5F5",
    width:"90%",
    marginLeft:"auto",
    marginRight:"auto"
  }
}});

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
                backgroundColor: i === currentSlide ? 'black' : 'white',
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
          <Container maxWidth={false} style={{maxWidth:"80%"}} >
        {/* <div className={classes.container}> */}
          <GridContainer justify="center">
            <GridItem xs={12} sm={6}>            
                <h4 className={classes.title} style={{color: '#2E3192'}}>coDS HEALING</h4>
                <h1 className={classes.title}>Who <span style={{color: '#2E3192'}}>We Are </span></h1>
                <Carousel {...settings}>
                <div  >
                  <p style={{fontSize:"20px",lineHeight:"200%"}}>The Church of Divine Structure is a worldwide healing community with its headquarters in Okanogan County, Washington. We are affiliated with the Eastern Orthodox Catholic Church. </p>
                  <p style={{fontSize:"20px",lineHeight:"200%"}}>Our Church is, first and foremost, a healing organization. We have been a private membership association since 2001. We believe in healing rather than to simply offer treatments. We hope that we will raise enough money o that some day we can have We do not believe that medicine should be practiced as a form of commerce.</p>
                </div>
                <div>
                  <p style={{fontSize:"20px",lineHeight:"200%"}}>The Church of Divine Structure is a worldwide healing community with its headquarters in Okanogan County, Washington. We are affiliated with the Eastern Orthodox Catholic Church. </p>
                  <p style={{fontSize:"20px",lineHeight:"200%"}}>Our Church is, first and foremost, a healing organization. We have been a private membership association since 2001. We believe in healing rather than to simply offer treatments. We hope that we will raise enough money o that some day we can have We do not believe that medicine should be practiced as a form of commerce.</p>
                </div>
              </Carousel>
            </GridItem>
            <GridItem xs={12} sm={6}>
                <img src="/img/sixteen-miles.png" alt="..." style={{width: '100%', height: '100%'}}></img>
            </GridItem>
          </GridContainer>
          {/*  Services */}
          <div style={{backgroundColor: "#F8F8F8"}}>
          <GridContainer justify="center" style={{marginTop: "70px"}}>
            <img src="/img/CoDS_Black_Logo.png" alt="...."></img>
          </GridContainer>
          <GridContainer justify="center">
            <h4 className={classes.title} style={{color: '#2E3192'}}>Our Services</h4>
          </GridContainer>
          <GridContainer justify="center">
            <h2 className={classes.title}>We Love Our Parish and Stay Together to <span style={{color: '#2E3192'}}>Serve God</span></h2>
          </GridContainer>
          <GridContainer>
            <GridItem sm={6}>
                <Card>
                    <CardBody>
                        <GridContainer>
                            <GridItem sm={8}>
                                <h3 className={classes.title}>Service</h3>
                                <p style={{fontSize:"20px",lineHeight:"200%"}}>The Church of Divine Structure is a worldwide heading community with its headquarters in Okanogan Country. Washington. We are affiliated with the Eastern Orthodox Catholic Church</p>
                            </GridItem>
                            <GridItem sm={4}>
                                <GridContainer style={{justifyContent: "end"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="140" height="103" viewBox="0 0 140 103" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5756 14.8384C20.1646 5.74161 31.0049 0.48999 43.8655 0.48999C56.7262 0.48999 67.5664 5.74161 75.1554 14.8384C82.718 23.9035 86.9515 36.656 86.9515 51.5674C86.9515 66.4395 83.0553 79.0468 75.6336 87.9763C68.1736 96.9519 57.3134 102.011 43.8655 102.011C30.4176 102.011 19.5575 96.9519 12.0974 87.9763C4.67573 79.0468 0.779541 66.4395 0.779541 51.5674C0.779541 36.656 5.01301 23.9035 12.5756 14.8384ZM30.3607 73.0777C33.4662 77.5201 37.96 79.7699 43.8655 79.7699C49.771 79.7699 54.2649 77.5201 57.3704 73.0777C60.5563 68.5204 62.4276 61.4386 62.4276 51.5674C62.4276 41.3679 60.5523 34.1252 57.3616 29.4894C54.2557 24.9768 49.7674 22.7306 43.8655 22.7306C37.9636 22.7306 33.4754 24.9768 30.3694 29.4894C27.1788 34.1252 25.3035 41.3679 25.3035 51.5674C25.3035 61.4386 27.1748 68.5204 30.3607 73.0777ZM94.1108 24.8871V2.26586H139.311V100.362H115.421V24.8871H94.1108ZM117.535 22.7729V98.2474H137.197V4.37999H96.2249V22.7729H117.535ZM43.8655 2.60412C19.3839 2.60412 2.89367 22.5192 2.89367 51.5674C2.89367 80.6155 18.1154 99.8964 43.8655 99.8964C69.6156 99.8964 84.8374 80.6155 84.8374 51.5674C84.8374 22.5192 68.3472 2.60412 43.8655 2.60412ZM43.8655 81.884C30.8002 81.884 23.1893 71.7362 23.1893 51.5674C23.1893 30.7643 30.8002 20.6165 43.8655 20.6165C56.9309 20.6165 64.5417 30.7643 64.5417 51.5674C64.5417 71.7362 56.9309 81.884 43.8655 81.884Z" fill="#D5ECFD"/>
                                </svg>
                                </GridContainer>
                                <GridContainer style={{marginTop:"100px", justifyContent: "end"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="115" height="99" viewBox="0 0 115 99" fill="none">
                                        <g clip-path="url(#clip0_1_610)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M106.177 92.7304L97.878 68.5826C97.5164 67.5273 96.9077 66.5366 95.8161 66.5366H91.1712L94.2843 60.2692H95.8161C98.4171 60.2692 100.38 61.3646 101.863 63.05C102.826 64.1432 103.446 65.3811 103.857 66.5744L115 99H0L9.96816 66.7459C10.4241 65.3009 11.1945 63.7958 12.3692 62.6314H12.3939C13.8472 61.1976 15.7047 60.2692 18.0586 60.2692H21.1447L24.5341 66.5366H18.0586C16.9647 66.5366 16.3134 67.554 15.9967 68.5826L8.53066 92.7304H106.177ZM40.0479 43.7558L54.7732 29.0058V24.3303H48.1203V19.1762H54.7732V13.1559H59.9729V19.1762H66.8797V24.3303H59.9729V28.7475L74.9544 43.7558L70.5633 47.4161L69.602 46.4342V56.4108H60.3728V48.2532H54.5531V56.4108H45.4003V46.4186L44.4412 47.4161L40.0479 43.7558ZM57.5 36.6536C59.4092 36.6536 60.9567 38.1898 60.9567 40.08C60.9567 41.9725 59.4092 43.5065 57.5 43.5065C55.5908 43.5065 54.0455 41.9725 54.0455 40.08C54.0455 38.1898 55.5908 36.6536 57.5 36.6536ZM62.3718 85.2697C61.2013 86.0917 59.8037 86.5364 58.3692 86.5432C57.0755 86.5454 55.7772 86.1981 54.634 85.479L54.616 85.4589C51.047 83.208 47.752 80.7278 44.7646 78.0872C41.6718 75.371 38.8866 72.4433 36.4384 69.3886C33.1254 65.272 30.4121 60.9126 28.3367 56.4776C26.2187 51.9379 24.7609 47.2758 24.0152 42.6671C23.2358 37.8781 23.2224 33.1826 24.013 28.7542C24.8081 24.3125 26.3983 20.1179 28.8219 16.3397C29.7967 14.8391 30.922 13.3697 32.1978 11.9692C33.4084 10.6133 34.7763 9.33538 36.2744 8.15538C39.648 5.49258 43.2867 3.44427 47.0467 2.07057C50.8561 0.676833 54.8227 -0.0267161 58.7982 9.13162e-07C62.7581 0.0289444 66.6686 0.779248 70.3926 2.28208C73.9953 3.76265 77.4296 5.89556 80.5606 8.72757C81.6635 9.71832 82.7169 10.8271 83.7029 12.0204C84.7069 13.2294 85.5964 14.4784 86.378 15.7497C88.9565 19.9777 90.5445 24.7222 91.2071 29.7272C91.8832 34.799 91.6182 40.1646 90.4996 45.5325C88.8128 53.6545 85.2864 61.496 80.4034 68.3511C75.5968 75.0994 69.429 80.9615 62.3718 85.2697ZM59.3306 80.3404C58.778 80.7411 58.0278 80.7946 57.4146 80.4049C50.7842 76.2215 45.2071 71.1965 40.834 65.744C34.7942 58.232 30.9871 49.903 29.6866 41.8812C28.3614 33.7481 29.599 25.9267 33.6824 19.5636C35.2929 17.0477 37.348 14.7567 39.8547 12.7819C45.6182 8.22662 52.2015 5.82654 58.7511 5.8733C65.0671 5.91783 71.2978 8.25557 76.6816 13.1247C78.5751 14.828 80.1676 16.7828 81.4681 18.9023C85.8592 26.0692 86.8048 35.2108 84.8709 44.4772C81.8611 58.9935 72.1895 72.6036 59.3306 80.3404Z" fill="#D5ECFD"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_1_610">
                                        <rect width="115" height="99" fill="white"/>
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
                <Card style={{backgroundColor: "#D5ECFD"}}>
                    <CardBody>
                        <GridContainer>
                            <GridItem sm={8}>
                                <h3 className={classes.title}>Service</h3>
                                <p style={{fontSize:"20px",lineHeight:"200%"}}>The Church of Divine Structure is a worldwide heading community with its headquarters in Okanogan Country. Washington. We are affiliated with the Eastern Orthodox Catholic Church</p>
                            </GridItem>
                            <GridItem sm={4}>
                                <GridContainer style={{justifyContent: "end"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="167" height="103" viewBox="0 0 167 103" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5711 14.8384C20.1601 5.74161 31.0004 0.48999 43.861 0.48999C56.7217 0.48999 67.5619 5.74161 75.1509 14.8384C82.7135 23.9035 86.947 36.656 86.947 51.5674C86.947 66.4395 83.0508 79.0468 75.6291 87.9763C68.169 96.9519 57.3089 102.011 43.861 102.011C30.4131 102.011 19.553 96.9519 12.0929 87.9763C4.67122 79.0468 0.775024 66.4395 0.775024 51.5674C0.775024 36.656 5.00849 23.9035 12.5711 14.8384ZM30.3561 73.0777C33.4616 77.5201 37.9555 79.7699 43.861 79.7699C49.7665 79.7699 54.2604 77.5201 57.3659 73.0777C60.5517 68.5204 62.4231 61.4386 62.4231 51.5674C62.4231 41.3679 60.5477 34.1252 57.3571 29.4894C54.2512 24.9768 49.7629 22.7306 43.861 22.7306C37.9591 22.7306 33.4708 24.9768 30.3649 29.4894C27.1743 34.1252 25.2989 41.3679 25.2989 51.5674C25.2989 61.4386 27.1703 68.5204 30.3561 73.0777ZM166.959 100.1L95.7553 100.37V82.0344L127.477 55.6429C137.414 47.4672 140.913 42.1805 140.913 35.4577C140.913 31.021 139.818 27.9542 138.065 26.0134C136.343 24.1069 133.712 22.9843 129.962 22.9843C126.098 22.9843 123.278 24.2785 121.384 26.5287C119.446 28.8313 118.25 32.4062 118.25 37.3604V39.4745H93.5989V37.3604C93.5989 26.3762 97.1141 17.1221 103.512 10.605C109.913 4.08395 119.018 0.48999 129.835 0.48999C140.917 0.48999 150.048 3.47615 156.427 9.32232C162.832 15.192 166.198 23.7021 166.198 34.1892C166.198 47.9559 157.855 58.8966 146.034 68.7902C146.034 68.7904 146.033 68.7907 146.033 68.7909L136.411 76.8524H166.959V100.1ZM130.596 78.9665L144.676 67.1697C156.346 57.4024 164.084 47.0009 164.084 34.1892C164.084 14.1473 151.272 2.60412 129.835 2.60412C109.859 2.60412 96.6322 15.3913 95.7591 35.2463C95.7285 35.9424 95.713 36.6472 95.713 37.3604H116.136C116.136 26.8321 121.209 20.8702 129.962 20.8702C138.334 20.8702 143.027 25.9441 143.027 35.4577C143.027 43.1954 138.841 49.0304 128.82 57.2755L97.8694 83.0257V98.2474L164.845 97.9937V78.9665H130.596ZM43.861 2.60412C19.3794 2.60412 2.88915 22.5192 2.88915 51.5674C2.88915 80.6155 18.1109 99.8964 43.861 99.8964C69.6111 99.8964 84.8329 80.6155 84.8329 51.5674C84.8329 22.5192 68.3426 2.60412 43.861 2.60412ZM43.861 81.884C30.7957 81.884 23.1848 71.7362 23.1848 51.5674C23.1848 30.7643 30.7957 20.6165 43.861 20.6165C56.9263 20.6165 64.5372 30.7643 64.5372 51.5674C64.5372 71.7362 56.9263 81.884 43.861 81.884Z" fill="white" fillOpacity="0.5"/>
                                </svg>
                                </GridContainer>
                                <GridContainer style={{marginTop:"100px", justifyContent: "end"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="114" height="99" viewBox="0 0 114 99" fill="none">
                                    <g clip-path="url(#clip0_1_614)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M58.946 0V5.63531H65.3496V10.4573H58.946V17.2067L88.0093 39.9686C89.4454 41.0916 89.6992 43.1684 88.5771 44.6056C87.4571 46.0428 85.3819 46.2969 83.9458 45.176L81.9864 43.6408V51.1456L112.143 62.4541C113.619 63.0045 114.37 64.6467 113.82 66.1218C113.272 67.5992 111.631 68.3501 110.155 67.7997L108.665 67.2315V99H5.3348V67.2315L3.84523 67.7997C2.37124 68.3501 0.730267 67.5992 0.180306 66.1218C-0.369655 64.6467 0.380697 63.0045 1.85691 62.4541L31.0872 51.4932V43.8079L29.1412 45.3454C27.7118 46.4751 25.6388 46.2322 24.51 44.8017C23.3811 43.3711 23.6238 41.2944 25.0532 40.1646L54.1277 17.2134V10.4573H47.9579V5.63531H54.1277V0H58.946ZM19.9544 70.6029C18.899 70.6029 17.9371 71.0374 17.238 71.7348C16.8798 72.091 16.5955 72.5146 16.4014 72.9811C16.2073 73.4476 16.1072 73.948 16.1069 74.4533V83.4288H23.8019V74.4533C23.8019 73.3971 23.37 72.4323 22.6708 71.7348C21.9739 71.0374 21.012 70.6029 19.9544 70.6029ZM19.9544 68.3434C21.6355 68.3434 23.1629 69.0297 24.2673 70.1372C25.3739 71.2446 26.0619 72.7732 26.0619 74.4533V85.6883H13.8492V74.4533C13.8492 72.7754 14.535 71.2491 15.6416 70.1416V70.1372C16.7482 69.0297 18.2756 68.3434 19.9544 68.3434ZM7.59476 66.3714V96.7405H31.0872V57.4093L7.59476 66.3714ZM57.6657 62.073V96.7405H67.6095V73.0963C67.6095 70.0503 66.3626 67.2805 64.3565 65.2706C62.5998 63.5147 60.2619 62.3404 57.6657 62.073ZM55.408 96.7405V62.073C52.8118 62.3404 50.4739 63.5147 48.7194 65.2706C46.711 67.2805 45.4664 70.0503 45.4664 73.0963V96.7405H55.408ZM79.7265 41.8715L56.5435 23.7133L33.3472 42.0253V96.7405H43.2064V73.0963C43.2064 69.4263 44.7071 66.0906 47.1207 63.6729C49.5365 61.2553 52.8697 59.7556 56.5368 59.7556C60.204 59.7556 63.5371 61.2553 65.953 63.6729C68.3688 66.0906 69.8673 69.4263 69.8673 73.0963V96.7405H79.7265V41.8715ZM94.0455 68.3434C95.7243 68.3434 97.2517 69.0297 98.3584 70.1372V70.1416C99.465 71.2491 100.151 72.7754 100.151 74.4533V85.6883H87.938V74.4533C87.938 72.7732 88.626 71.2446 89.7327 70.1372C90.837 69.0297 92.3644 68.3434 94.0455 68.3434ZM94.0455 70.6029C92.9879 70.6029 92.026 71.0374 91.3291 71.7348C90.6322 72.4323 90.198 73.3971 90.198 74.4533V83.4288H97.893V74.4533C97.893 73.3949 97.461 72.4301 96.7641 71.7326C96.065 71.0374 95.1009 70.6029 94.0455 70.6029ZM81.9864 57.0572V96.7405H106.405V66.3714L81.9864 57.0572ZM56.5146 35.1666C58.632 35.1666 60.5513 36.029 61.9429 37.4216L61.9541 37.4305C63.3457 38.8232 64.2051 40.744 64.2051 42.8631C64.2051 44.9822 63.3457 46.9052 61.9541 48.2978L61.9429 48.3068C60.5513 49.6994 58.632 50.5618 56.5146 50.5618C54.3971 50.5618 52.4778 49.6994 51.084 48.3068L51.0751 48.2978C49.6835 46.9052 48.8218 44.9822 48.8218 42.8631C48.8218 40.744 49.6835 38.8232 51.0751 37.4305L51.084 37.4216C52.4778 36.029 54.3971 35.1666 56.5146 35.1666ZM58.5229 40.8554C58.0108 40.3451 57.3005 40.0287 56.5146 40.0287C55.7286 40.0287 55.0183 40.3451 54.5062 40.8554C54.2432 41.1192 54.0349 41.4323 53.8932 41.7768C53.7514 42.1214 53.679 42.4905 53.6801 42.8631C53.6801 43.6519 53.9963 44.3627 54.5062 44.873C55.0183 45.3833 55.7286 45.6997 56.5146 45.6997C57.3005 45.6997 58.0108 45.3833 58.5229 44.873C59.0328 44.3627 59.3468 43.6519 59.3468 42.8631C59.3468 42.0765 59.0328 41.3657 58.5229 40.8554Z" fill="#2E3192"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_1_614">
                                    <rect width="114" height="99" fill="white"/>
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
                <Card  style={{backgroundColor: "#D5ECFD"}}>
                    <CardBody>
                        <GridContainer>
                            <GridItem sm={8}>
                                <h3 className={classes.title}>Service</h3>
                                <p style={{fontSize:"20px",lineHeight:"200%"}}>The Church of Divine Structure is a worldwide heading community with its headquarters in Okanogan Country. Washington. We are affiliated with the Eastern Orthodox Catholic Church</p>
                            </GridItem>
                            <GridItem sm={4}>
                                <GridContainer style={{justifyContent: "end"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="164" height="103" viewBox="0 0 164 103" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0902 14.9226C19.6793 5.82583 30.5195 0.574219 43.3802 0.574219C56.2408 0.574219 67.0811 5.82583 74.6701 14.9226C82.2327 23.9877 86.4661 36.7403 86.4661 51.6516C86.4661 66.5237 82.5699 79.131 75.1483 88.0605C67.6882 97.0361 56.8281 102.095 43.3802 102.095C29.9322 102.095 19.0721 97.0361 11.6121 88.0605C4.19038 79.131 0.294189 66.5237 0.294189 51.6516C0.294189 36.7403 4.52766 23.9877 12.0902 14.9226ZM29.8753 73.1619C32.9808 77.6043 37.4747 79.8541 43.3802 79.8541C49.2856 79.8541 53.7795 77.6043 56.885 73.1619C60.0709 68.6046 61.9422 61.5229 61.9422 51.6516C61.9422 41.4521 60.0669 34.2094 56.8763 29.5737C53.7703 25.061 49.2821 22.8149 43.3802 22.8149C37.4783 22.8149 32.99 25.061 29.8841 29.5737C26.6934 34.2094 24.8181 41.4521 24.8181 51.6516C24.8181 61.5229 26.6894 68.6046 29.8753 73.1619ZM108.847 56.3027V40.1207L109.466 39.5015C109.701 39.2664 109.932 39.094 110.055 39.0017L110.073 38.988C110.207 38.8878 110.221 38.8741 110.227 38.8676L110.277 38.8178L126.522 24.5907H94.6402V2.35008H160.009V21.7846L142.216 37.4103C153.986 42.1722 163.18 52.5629 163.18 68.1418C163.18 89.3842 145.942 102.095 126.056 102.095C116.507 102.095 107.572 99.1759 100.995 93.3317C94.3834 87.4568 90.3274 78.7753 90.3274 67.6344V65.5203H114.851V67.6344C114.851 71.8345 116.107 74.7948 118.044 76.7057C119.987 78.6233 122.861 79.7273 126.564 79.7273C130.065 79.7273 132.857 78.5424 134.774 76.5877C136.692 74.6304 137.895 71.7338 137.895 68.015C137.895 64.6646 136.934 61.7961 134.96 59.771C133.001 57.7615 129.771 56.3027 124.661 56.3027H108.847ZM140.426 38.9827C139.663 38.6996 138.89 38.4406 138.107 38.2057L157.895 20.8276V4.46422H96.7544V22.4766H132.145L111.722 40.3621C111.596 40.489 111.469 40.5841 111.342 40.6793C111.215 40.7744 111.088 40.8695 110.961 40.9964V54.1886H124.661C135.697 54.1886 140.009 60.531 140.009 68.015C140.009 76.3869 134.555 81.8414 126.564 81.8414C118.318 81.8414 112.737 76.8943 112.737 67.6344H92.4415C92.4415 68.3506 92.4591 69.0554 92.4937 69.7486C93.4827 89.56 108.408 99.9806 126.056 99.9806C145.083 99.9806 161.066 87.9301 161.066 68.1418C161.066 53.1454 152.021 43.286 140.426 38.9827ZM43.3802 2.68835C18.8985 2.68835 2.40832 22.6035 2.40832 51.6516C2.40832 80.6998 17.6301 99.9806 43.3802 99.9806C69.1303 99.9806 84.352 80.6998 84.352 51.6516C84.352 22.6035 67.8618 2.68835 43.3802 2.68835ZM43.3802 81.9682C30.3148 81.9682 22.704 71.8204 22.704 51.6516C22.704 30.8486 30.3148 20.7007 43.3802 20.7007C56.4455 20.7007 64.0564 30.8486 64.0564 51.6516C64.0564 71.8204 56.4455 81.9682 43.3802 81.9682Z" fill="white" fillOpacity="0.5"/>
                                </svg>
                                </GridContainer>
                                <GridContainer style={{marginTop:"100px", justifyContent: "end"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="114" height="99" viewBox="0 0 114 99" fill="none">
                                        <g clip-path="url(#clip0_1_614)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M58.946 0V5.63531H65.3496V10.4573H58.946V17.2067L88.0093 39.9686C89.4454 41.0916 89.6992 43.1684 88.5771 44.6056C87.4571 46.0428 85.3819 46.2969 83.9458 45.176L81.9864 43.6408V51.1456L112.143 62.4541C113.619 63.0045 114.37 64.6467 113.82 66.1218C113.272 67.5992 111.631 68.3501 110.155 67.7997L108.665 67.2315V99H5.3348V67.2315L3.84523 67.7997C2.37124 68.3501 0.730267 67.5992 0.180306 66.1218C-0.369655 64.6467 0.380697 63.0045 1.85691 62.4541L31.0872 51.4932V43.8079L29.1412 45.3454C27.7118 46.4751 25.6388 46.2322 24.51 44.8017C23.3811 43.3711 23.6238 41.2944 25.0532 40.1646L54.1277 17.2134V10.4573H47.9579V5.63531H54.1277V0H58.946ZM19.9544 70.6029C18.899 70.6029 17.9371 71.0374 17.238 71.7348C16.8798 72.091 16.5955 72.5146 16.4014 72.9811C16.2073 73.4476 16.1072 73.948 16.1069 74.4533V83.4288H23.8019V74.4533C23.8019 73.3971 23.37 72.4323 22.6708 71.7348C21.9739 71.0374 21.012 70.6029 19.9544 70.6029ZM19.9544 68.3434C21.6355 68.3434 23.1629 69.0297 24.2673 70.1372C25.3739 71.2446 26.0619 72.7732 26.0619 74.4533V85.6883H13.8492V74.4533C13.8492 72.7754 14.535 71.2491 15.6416 70.1416V70.1372C16.7482 69.0297 18.2756 68.3434 19.9544 68.3434ZM7.59476 66.3714V96.7405H31.0872V57.4093L7.59476 66.3714ZM57.6657 62.073V96.7405H67.6095V73.0963C67.6095 70.0503 66.3626 67.2805 64.3565 65.2706C62.5998 63.5147 60.2619 62.3404 57.6657 62.073ZM55.408 96.7405V62.073C52.8118 62.3404 50.4739 63.5147 48.7194 65.2706C46.711 67.2805 45.4664 70.0503 45.4664 73.0963V96.7405H55.408ZM79.7265 41.8715L56.5435 23.7133L33.3472 42.0253V96.7405H43.2064V73.0963C43.2064 69.4263 44.7071 66.0906 47.1207 63.6729C49.5365 61.2553 52.8697 59.7556 56.5368 59.7556C60.204 59.7556 63.5371 61.2553 65.953 63.6729C68.3688 66.0906 69.8673 69.4263 69.8673 73.0963V96.7405H79.7265V41.8715ZM94.0455 68.3434C95.7243 68.3434 97.2517 69.0297 98.3584 70.1372V70.1416C99.465 71.2491 100.151 72.7754 100.151 74.4533V85.6883H87.938V74.4533C87.938 72.7732 88.626 71.2446 89.7327 70.1372C90.837 69.0297 92.3644 68.3434 94.0455 68.3434ZM94.0455 70.6029C92.9879 70.6029 92.026 71.0374 91.3291 71.7348C90.6322 72.4323 90.198 73.3971 90.198 74.4533V83.4288H97.893V74.4533C97.893 73.3949 97.461 72.4301 96.7641 71.7326C96.065 71.0374 95.1009 70.6029 94.0455 70.6029ZM81.9864 57.0572V96.7405H106.405V66.3714L81.9864 57.0572ZM56.5146 35.1666C58.632 35.1666 60.5513 36.029 61.9429 37.4216L61.9541 37.4305C63.3457 38.8232 64.2051 40.744 64.2051 42.8631C64.2051 44.9822 63.3457 46.9052 61.9541 48.2978L61.9429 48.3068C60.5513 49.6994 58.632 50.5618 56.5146 50.5618C54.3971 50.5618 52.4778 49.6994 51.084 48.3068L51.0751 48.2978C49.6835 46.9052 48.8218 44.9822 48.8218 42.8631C48.8218 40.744 49.6835 38.8232 51.0751 37.4305L51.084 37.4216C52.4778 36.029 54.3971 35.1666 56.5146 35.1666ZM58.5229 40.8554C58.0108 40.3451 57.3005 40.0287 56.5146 40.0287C55.7286 40.0287 55.0183 40.3451 54.5062 40.8554C54.2432 41.1192 54.0349 41.4323 53.8932 41.7768C53.7514 42.1214 53.679 42.4905 53.6801 42.8631C53.6801 43.6519 53.9963 44.3627 54.5062 44.873C55.0183 45.3833 55.7286 45.6997 56.5146 45.6997C57.3005 45.6997 58.0108 45.3833 58.5229 44.873C59.0328 44.3627 59.3468 43.6519 59.3468 42.8631C59.3468 42.0765 59.0328 41.3657 58.5229 40.8554Z" fill="#2E3192"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_1_614">
                                        <rect width="114" height="99" fill="white"/>
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
                                <p style={{fontSize:"20px",lineHeight:"200%"}}>The Church of Divine Structure is a worldwide heading community with its headquarters in Okanogan Country. Washington. We are affiliated with the Eastern Orthodox Catholic Church</p>
                            </GridItem>
                            <GridItem sm={4}>
                                <GridContainer style={{justifyContent: "end"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="174" height="102" viewBox="0 0 174 102" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8319 14.5503C19.421 5.45352 30.2612 0.201904 43.1219 0.201904C55.9825 0.201904 66.8228 5.45352 74.4118 14.5503C81.9744 23.6154 86.2079 36.368 86.2079 51.2793C86.2079 66.1514 82.3117 78.7587 74.89 87.6882C67.4299 96.6638 56.5698 101.722 43.1219 101.722C29.6739 101.722 18.8138 96.6638 11.3538 87.6882C3.93208 78.7587 0.0358887 66.1514 0.0358887 51.2793C0.0358887 36.368 4.26936 23.6154 11.8319 14.5503ZM29.617 72.7896C32.7225 77.232 37.2164 79.4818 43.1219 79.4818C49.0273 79.4818 53.5212 77.232 56.6267 72.7896C59.8126 68.2323 61.6839 61.1505 61.6839 51.2793C61.6839 41.0798 59.8086 33.8371 56.618 29.2013C53.512 24.6887 49.0238 22.4426 43.1219 22.4426C37.22 22.4426 32.7317 24.6887 29.6258 29.2013C26.4351 33.8371 24.5598 41.0798 24.5598 51.2793C24.5598 61.1505 26.4311 68.2323 29.617 72.7896ZM173.45 83.4564H161.907V100.073H138.271V83.4564H91.5913V62.6767L133.054 1.97777H161.907V61.2157H173.45V83.4564ZM159.793 63.3298V4.0919H134.17L93.7054 63.3298V81.3422H140.385V97.9593H159.793V81.3422H171.336V63.3298H159.793ZM140.385 63.3298H115.523L140.385 26.7977V63.3298ZM138.271 33.6618L119.519 61.2157H138.271V33.6618ZM43.1219 2.31603C18.6402 2.31603 2.15002 22.2311 2.15002 51.2793C2.15002 80.3274 17.3718 99.6083 43.1219 99.6083C68.872 99.6083 84.0937 80.3274 84.0937 51.2793C84.0937 22.2311 67.6035 2.31603 43.1219 2.31603ZM43.1219 81.5959C30.0565 81.5959 22.4457 71.4481 22.4457 51.2793C22.4457 30.4763 30.0565 20.3284 43.1219 20.3284C56.1872 20.3284 63.7981 30.4763 63.7981 51.2793C63.7981 71.4481 56.1872 81.5959 43.1219 81.5959Z" fill="#D5ECFD"/>
                                </svg>
                                </GridContainer>
                                <GridContainer style={{marginTop:"100px", justifyContent: "end"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="115" height="99" viewBox="0 0 115 99" fill="none">
                                    <g clip-path="url(#clip0_1_612)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M106.177 92.7304L97.878 68.5826C97.5164 67.5273 96.9077 66.5366 95.8161 66.5366H91.1712L94.2843 60.2692H95.8161C98.4171 60.2692 100.38 61.3646 101.863 63.05C102.826 64.1432 103.446 65.3811 103.857 66.5744L115 99H0L9.96816 66.7459C10.4241 65.3009 11.1945 63.7958 12.3692 62.6314H12.3939C13.8472 61.1976 15.7047 60.2692 18.0586 60.2692H21.1447L24.5341 66.5366H18.0586C16.9647 66.5366 16.3134 67.554 15.9967 68.5826L8.53066 92.7304H106.177ZM40.0479 43.7558L54.7732 29.0058V24.3303H48.1203V19.1762H54.7732V13.1559H59.9729V19.1762H66.8797V24.3303H59.9729V28.7475L74.9544 43.7558L70.5633 47.4161L69.602 46.4342V56.4108H60.3728V48.2532H54.5531V56.4108H45.4003V46.4186L44.4412 47.4161L40.0479 43.7558ZM57.5 36.6536C59.4092 36.6536 60.9567 38.1898 60.9567 40.08C60.9567 41.9725 59.4092 43.5065 57.5 43.5065C55.5908 43.5065 54.0455 41.9725 54.0455 40.08C54.0455 38.1898 55.5908 36.6536 57.5 36.6536ZM62.3718 85.2697C61.2013 86.0917 59.8037 86.5364 58.3692 86.5432C57.0755 86.5454 55.7772 86.1981 54.634 85.479L54.616 85.4589C51.047 83.208 47.752 80.7278 44.7646 78.0872C41.6718 75.371 38.8866 72.4433 36.4384 69.3886C33.1254 65.272 30.4121 60.9126 28.3367 56.4776C26.2187 51.9379 24.7609 47.2758 24.0152 42.6671C23.2358 37.8781 23.2224 33.1826 24.013 28.7542C24.8081 24.3125 26.3983 20.1179 28.8219 16.3397C29.7967 14.8391 30.922 13.3697 32.1978 11.9692C33.4084 10.6133 34.7763 9.33538 36.2744 8.15538C39.648 5.49258 43.2867 3.44427 47.0467 2.07057C50.8561 0.676833 54.8227 -0.0267161 58.7982 9.13162e-07C62.7581 0.0289444 66.6686 0.779248 70.3926 2.28208C73.9953 3.76265 77.4296 5.89556 80.5606 8.72757C81.6635 9.71832 82.7169 10.8271 83.7029 12.0204C84.7069 13.2294 85.5964 14.4784 86.378 15.7497C88.9565 19.9777 90.5445 24.7222 91.2071 29.7272C91.8832 34.799 91.6182 40.1646 90.4996 45.5325C88.8128 53.6545 85.2864 61.496 80.4034 68.3511C75.5968 75.0994 69.429 80.9615 62.3718 85.2697ZM59.3306 80.3404C58.778 80.7411 58.0278 80.7946 57.4146 80.4049C50.7842 76.2215 45.2071 71.1965 40.834 65.744C34.7942 58.232 30.9871 49.903 29.6866 41.8812C28.3614 33.7481 29.599 25.9267 33.6824 19.5636C35.2929 17.0477 37.348 14.7567 39.8547 12.7819C45.6182 8.22662 52.2015 5.82654 58.7511 5.8733C65.0671 5.91783 71.2978 8.25557 76.6816 13.1247C78.5751 14.828 80.1676 16.7828 81.4681 18.9023C85.8592 26.0692 86.8048 35.2108 84.8709 44.4772C81.8611 58.9935 72.1895 72.6036 59.3306 80.3404Z" fill="#D5ECFD"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_1_612">
                                    <rect width="115" height="99" fill="white"/>
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

          <GridContainer justify="center" style={{marginTop: "70px"}}>
            <img src="/img/CoDS_Black_Logo.png" alt="...."></img>
          </GridContainer>
          <GridContainer justify="center">
            <h4 className={classes.title} style={{color: '#2E3192'}}>OUR LATEST</h4>
          </GridContainer>
          <GridContainer justify="center">
            <h2 className={classes.title}>Featured  <span style={{color: '#2E3192'}}>Products</span></h2>
          </GridContainer>
          <GridContainer  >
            <GridItem sm={4}>
                <Card style={{backgroundColor: "#F8F8F8", marginTop:"150px"}}>
                    <CardBody>
                      <div style={{width:"100%",display:"flex", justifyContent:"center"}} >
                        <img src="/img/airbuds.png" alt="..." style={{width:"auto",height:"25vh", marginTop: "-150px"}}></img>
                      </div>
                        <h3 className={classes.title} style={{color: "#2E3192"}}>Air Buds</h3>
                        <p>Air Buds are designed to replace electronic ear buds.</p>
                        <Rating name="read-only" value={4} readOnly />
                        <Grid container direction="row" justify="space-around" alignItems="flex-end">
                          <h2 className={classes.title} style={{color: "#2E3192"}}>$25</h2>
                          <h7 className={classes.title} style={{display:"flex"}}><ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>Add to Cart</h7>
                          <h7 className={classes.title} style={{display:"flex"}}><FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon> Save</h7>
                        </Grid>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem sm={4}>
                <Card style={{backgroundColor: "#F8F8F8", marginTop:"150px"}}>
                    <CardBody>
                      <div style={{width:"100%",display:"flex", justifyContent:"center"}} >
                        <img src="img/bioprotein.png" alt="..." style={{width:"auto",height:"25vh", marginTop: "-150px"}}></img>
                      </div>
                        <h3 className={classes.title} style={{color: "#2E3192"}}>BioProtein-Plus</h3>
                        <p>Air Buds are designed to replace electronic ear buds.</p>
                        <Rating name="read-only" value={4} readOnly />
                        <Grid container direction="row" justify="space-around" alignItems="flex-end">
                          <h2 className={classes.title} style={{color: "#2E3192"}}>$25</h2>
                          <h7 className={classes.title} style={{display:"flex"}}><ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>Add to Cart</h7>
                          <h7 className={classes.title} style={{display:"flex"}}><FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon> Save</h7>
                        </Grid>
                    </CardBody>
                </Card>
            </GridItem>
            <GridItem sm={4}>
                <Card style={{backgroundColor: "#F8F8F8", marginTop:"150px"}}>
                    <CardBody>
                        <div style={{width:"100%",display:"flex", justifyContent:"center"}} >
                          <img src="/img/grander.png" alt="..." style={{width:"auto",height:"25vh", marginTop: "-150px"}}></img>
                        </div>
                        <h3 className={classes.title} style={{color: "#2E3192"}}>Grander Penergizer</h3>
                        <p>Air Buds are designed to replace electronic ear buds.</p>
                        <Rating name="read-only" value={4} readOnly />
                        <Grid container direction="row" justify="space-around" alignItems="flex-end">
                          <h2 className={classes.title} style={{color: "#2E3192"}}>$25</h2>
                          <h7 className={classes.title} style={{display:"flex"}}><ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>Add to Cart</h7>
                          <h7 className={classes.title} style={{display:"flex"}}><FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon> Save</h7>
                        </Grid>
                    </CardBody>
                </Card>
            </GridItem>
          </GridContainer>

          {/* Products */}

          {/* Our Story */}

          <GridContainer style={{marginTop: "50px", backgroundColor:"#F8F8F8"}}>
            <GridItem sm={5}>
              <img src="/img/yellowdean.png" style={{width: "100%"}}></img>
            </GridItem>
            <GridItem sm={1} >
              <div style={{
                width:"20%",
                backgroundColor:"#2E3192",
                height:"8vh",
                marginTop:"10vh",
                marginLeft:"auto",
                marginRight:"auto",
                borderRadius:"10px"
              }} ></div>
              <div style={{
                width:"20%",
                backgroundColor:"#dddddd",
                height:"50vh",
                marginTop:"4vh",
                marginLeft:"auto",
                marginRight:"auto",
                borderRadius:"10px"
              }} ></div>
            </GridItem>
            <GridItem sm={6}>
              <h1 className={classes.title}>OUR<span style={{color: '#2E3192'}}> Story</span></h1>
              <h2 className={classes.title}>Our Journey</h2>
              <p style={{lineHeight:"200%",fontSize:"18px"}} >
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

          <GridContainer justify="center" style={{marginTop: "50px"}}>
            <h4 className={classes.title} style={{color: '#2E3192'}}>Testimonials</h4>
          </GridContainer>
          <GridContainer justify="center">
            <h2 className={classes.title}>What Our Clients Say <span style={{color: '#2E3192'}}>About Us  </span></h2>
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
                      <img src="/img/avatar1.jpg" style={{width: "70px", height: "70px", borderRadius: "50%"}}></img>
                    </GridItem>
                    <GridItem sm={7}>
                      <h6 className={classes.title} style={{marginTop:"10px"}}>Elsi Hansdottir</h6>
                      <p style={{marginTop:"-10px"}}>Meditation</p>
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
                      <img src="/img/avatar2.jpg" style={{width: "70px", height: "70px", borderRadius: "50%"}}></img>
                    </GridItem>
                    <GridItem sm={7}>
                      <h6 className={classes.title} style={{marginTop:"10px"}}>Elsi Hansdottir</h6>
                      <p style={{marginTop:"-10px"}}>Meditation</p>
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
                      <img src="/img/avatar1.jpg" style={{width: "70px", height: "70px", borderRadius: "50%"}}></img>
                    </GridItem>
                    <GridItem sm={7}>
                      <h6 className={classes.title} style={{marginTop:"10px"}}>Elsi Hansdottir</h6>
                      <p style={{marginTop:"-10px"}}>Meditation</p>
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
                      <img src="/img/avatar2.jpg" style={{width: "70px", height: "70px", borderRadius: "50%"}}></img>
                    </GridItem>
                    <GridItem sm={7}>
                      <h6 className={classes.title} style={{marginTop:"10px"}}>Elsi Hansdottir</h6>
                      <p style={{marginTop:"-10px"}}>Meditation</p>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </div>
          </Slider>
          {/* Testimonials */}

          {/* Membership */}

          <GridContainer justify="center" style={{marginTop: "50px"}}>
            <h4 className={classes.title} style={{color: '#2E3192'}}>coDS island</h4>
          </GridContainer>
          <GridContainer justify="center">
            <h2 className={classes.title}>Our <span style={{color: '#2E3192'}}>Pricing & Membership</span></h2>
          </GridContainer>
          <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12}>
              <NavPills
                color="primary"
                
                tabs={[
                  {
                    tabButton: "Monthly",
                    tabContent: (
                      <GridContainer>
                        <GridItem sm={3}>
                          <Card>
                            <CardBody>
                              <GridContainer>
                                <h3 className={classes.title} style={{color: "#231D4F"}}>$2&nbsp; <span style={{color:"black", fontSize:"15px"}}>/month</span></h3>                
                              </GridContainer>
                              <GridContainer>
                                <h3 className={classes.title} style={{color: "#231D4F"}}>Intro</h3>
                              </GridContainer>
                              <GridContainer>
                                <p>For most businesses that want to otpimize web queries</p>
                              </GridContainer>
                              <GridContainer>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                  <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                  <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                                </svg><p>&nbsp;&nbsp;&nbsp;All limited links</p>
                              </GridContainer>
                              <GridContainer>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                  <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                  <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                                </svg><p>&nbsp;&nbsp;&nbsp;Own analytics platform</p>
                              </GridContainer>
                              <GridContainer>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                  <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                  <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                                </svg><p>&nbsp;&nbsp;&nbsp;Chat support</p>
                              </GridContainer>
                              <GridContainer>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                  <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                  <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                                </svg><p>&nbsp;&nbsp;&nbsp;Optimize hashtags</p>
                              </GridContainer>
                              <GridContainer>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                  <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                  <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
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
                                <h3 className={classes.title} style={{color: "#231D4F"}}>$5&nbsp; <span style={{color:"black", fontSize:"15px"}}>/month</span></h3>                
                              </GridContainer>
                              <GridContainer>
                                <h3 className={classes.title} style={{color: "#231D4F"}}>Base</h3>
                              </GridContainer>
                              <GridContainer>
                                <p>For most businesses that want to otpimize web queries</p>
                              </GridContainer>
                              <GridContainer>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                  <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                  <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                                </svg><p>&nbsp;&nbsp;&nbsp;All limited links</p>
                              </GridContainer>
                              <GridContainer>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                  <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                  <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                                </svg><p>&nbsp;&nbsp;&nbsp;Own analytics platform</p>
                              </GridContainer>
                              <GridContainer>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                  <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                  <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                                </svg><p>&nbsp;&nbsp;&nbsp;Chat support</p>
                              </GridContainer>
                              <GridContainer>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                  <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                  <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                                </svg><p>&nbsp;&nbsp;&nbsp;Optimize hashtags</p>
                              </GridContainer>
                              <GridContainer>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                  <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                  <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
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
                          <Card style={{backgroundColor: "#5243C2", color: "white"}}>
                            <CardBody>
                              <GridContainer>
                                <h3 className={classes.title} style={{color: "white"}}>$100&nbsp; <span style={{color:"white", fontSize:"15px"}}>/month</span></h3>                
                              </GridContainer>
                              <GridContainer>
                                <h3 className={classes.title} style={{color: "white"}}>Pro</h3>
                              </GridContainer>
                              <GridContainer>
                                <p>For most businesses that want to otpimize web queries</p>
                              </GridContainer>
                              <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                              <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white"/>
                              <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white"/>
                              </svg><p>&nbsp;&nbsp;&nbsp;All limited links</p>
                              </GridContainer>
                              <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                              <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white"/>
                              <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white"/>
                              </svg><p>&nbsp;&nbsp;&nbsp;Own analytics platform</p>
                              </GridContainer>
                              <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                              <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white"/>
                              <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white"/>
                              </svg><p>&nbsp;&nbsp;&nbsp;Chat support</p>
                              </GridContainer>
                              <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                              <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white"/>
                              <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white"/>
                              </svg><p>&nbsp;&nbsp;&nbsp;Optimize hashtags</p>
                              </GridContainer>
                              <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                              <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white"/>
                              <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white"/>
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
                                <h3 className={classes.title} style={{color: "#231D4F"}}>$20&nbsp; <span style={{color:"black", fontSize:"15px"}}>/month</span></h3>                
                              </GridContainer>
                              <GridContainer>
                                <h3 className={classes.title} style={{color: "#231D4F"}}>Enterprise</h3>
                              </GridContainer>
                              <GridContainer>
                                <p>For most businesses that want to otpimize web queries</p>
                              </GridContainer>
                              <GridContainer>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                  <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                  <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                                </svg><p>&nbsp;&nbsp;&nbsp;All limited links</p>
                              </GridContainer>
                              <GridContainer>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                  <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                  <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                                </svg><p>&nbsp;&nbsp;&nbsp;Own analytics platform</p>
                              </GridContainer>
                              <GridContainer>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                  <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                  <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                                </svg><p>&nbsp;&nbsp;&nbsp;Chat support</p>
                              </GridContainer>
                              <GridContainer>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                  <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                  <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                                </svg><p>&nbsp;&nbsp;&nbsp;Optimize hashtags</p>
                              </GridContainer>
                              <GridContainer>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                  <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                  <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
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
                              <h3 className={classes.title} style={{color: "#231D4F"}}>$2&nbsp; <span style={{color:"black", fontSize:"15px"}}>/year</span></h3>                
                            </GridContainer>
                            <GridContainer>
                              <h3 className={classes.title} style={{color: "#231D4F"}}>Intro</h3>
                            </GridContainer>
                            <GridContainer>
                              <p>For most businesses that want to otpimize web queries</p>
                            </GridContainer>
                            <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                              </svg><p>&nbsp;&nbsp;&nbsp;All limited links</p>
                            </GridContainer>
                            <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                              </svg><p>&nbsp;&nbsp;&nbsp;Own analytics platform</p>
                            </GridContainer>
                            <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                              </svg><p>&nbsp;&nbsp;&nbsp;Chat support</p>
                            </GridContainer>
                            <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                              </svg><p>&nbsp;&nbsp;&nbsp;Optimize hashtags</p>
                            </GridContainer>
                            <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
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
                              <h3 className={classes.title} style={{color: "#231D4F"}}>$5&nbsp; <span style={{color:"black", fontSize:"15px"}}>/year</span></h3>                
                            </GridContainer>
                            <GridContainer>
                              <h3 className={classes.title} style={{color: "#231D4F"}}>Base</h3>
                            </GridContainer>
                            <GridContainer>
                              <p>For most businesses that want to otpimize web queries</p>
                            </GridContainer>
                            <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                              </svg><p>&nbsp;&nbsp;&nbsp;All limited links</p>
                            </GridContainer>
                            <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                              </svg><p>&nbsp;&nbsp;&nbsp;Own analytics platform</p>
                            </GridContainer>
                            <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                              </svg><p>&nbsp;&nbsp;&nbsp;Chat support</p>
                            </GridContainer>
                            <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                              </svg><p>&nbsp;&nbsp;&nbsp;Optimize hashtags</p>
                            </GridContainer>
                            <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
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
                        <Card style={{backgroundColor: "#5243C2", color: "white"}}>
                          <CardBody>
                            <GridContainer>
                              <h3 className={classes.title} style={{color: "white"}}>$100&nbsp; <span style={{color:"white", fontSize:"15px"}}>/year</span></h3>                
                            </GridContainer>
                            <GridContainer>
                              <h3 className={classes.title} style={{color: "white"}}>Pro</h3>
                            </GridContainer>
                            <GridContainer>
                              <p>For most businesses that want to otpimize web queries</p>
                            </GridContainer>
                            <GridContainer>
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                            <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white"/>
                            <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white"/>
                            </svg><p>&nbsp;&nbsp;&nbsp;All limited links</p>
                            </GridContainer>
                            <GridContainer>
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                            <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white"/>
                            <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white"/>
                            </svg><p>&nbsp;&nbsp;&nbsp;Own analytics platform</p>
                            </GridContainer>
                            <GridContainer>
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                            <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white"/>
                            <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white"/>
                            </svg><p>&nbsp;&nbsp;&nbsp;Chat support</p>
                            </GridContainer>
                            <GridContainer>
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                            <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white"/>
                            <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white"/>
                            </svg><p>&nbsp;&nbsp;&nbsp;Optimize hashtags</p>
                            </GridContainer>
                            <GridContainer>
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                            <path opacity="0.1" d="M11.7388 0.963379C5.64975 0.963379 0.713623 5.8995 0.713623 11.9885C0.713623 18.0775 5.64975 23.0137 11.7388 23.0137C17.8278 23.0137 22.7639 18.0775 22.7639 11.9885C22.7568 5.90244 17.8248 0.970467 11.7388 0.963379Z" fill="white"/>
                            <path d="M18.1031 8.49715L11.8141 17.0315C11.6641 17.2305 11.4405 17.3609 11.1934 17.3934C10.9464 17.4259 10.6966 17.3577 10.5003 17.2043L6.00939 13.6137C5.6131 13.2966 5.54893 12.7182 5.86606 12.322C6.1832 11.9257 6.76155 11.8615 7.15784 12.1786L10.9027 15.1747L16.6238 7.41025C16.8115 7.12874 17.1386 6.97309 17.4754 7.00511C17.8121 7.03714 18.1041 7.25165 18.2353 7.56348C18.3665 7.87531 18.3157 8.234 18.1031 8.49715Z" fill="white"/>
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
                              <h3 className={classes.title} style={{color: "#231D4F"}}>$20&nbsp; <span style={{color:"black", fontSize:"15px"}}>/year</span></h3>                
                            </GridContainer>
                            <GridContainer>
                              <h3 className={classes.title} style={{color: "#231D4F"}}>Enterprise</h3>
                            </GridContainer>
                            <GridContainer>
                              <p>For most businesses that want to otpimize web queries</p>
                            </GridContainer>
                            <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                              </svg><p>&nbsp;&nbsp;&nbsp;All limited links</p>
                            </GridContainer>
                            <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                              </svg><p>&nbsp;&nbsp;&nbsp;Own analytics platform</p>
                            </GridContainer>
                            <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                              </svg><p>&nbsp;&nbsp;&nbsp;Chat support</p>
                            </GridContainer>
                            <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
                              </svg><p>&nbsp;&nbsp;&nbsp;Optimize hashtags</p>
                            </GridContainer>
                            <GridContainer>
                              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                                <path d="M11.1258 0.0634766C5.03674 0.0634766 0.100616 4.9996 0.100616 11.0886C0.100616 17.1776 5.03674 22.1138 11.1258 22.1138C17.2148 22.1138 22.1509 17.1776 22.1509 11.0886C22.1438 5.00254 17.2118 0.0705646 11.1258 0.0634766Z" fill="#5243C2" fill-opacity="0.103693"/>
                                <path d="M17.49 7.59725L11.2011 16.1316C11.0511 16.3306 10.8275 16.461 10.5804 16.4935C10.3333 16.526 10.0836 16.4578 9.88727 16.3044L5.39636 12.7138C5.00007 12.3967 4.9359 11.8183 5.25303 11.4221C5.57017 11.0258 6.14852 10.9616 6.54481 11.2787L10.2897 14.2748L16.0108 6.51035C16.1984 6.22883 16.5256 6.07319 16.8623 6.10521C17.1991 6.13724 17.4911 6.35175 17.6222 6.66358C17.7534 6.97541 17.7026 7.3341 17.49 7.59725Z" fill="#5243C2"/>
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

          <GridContainer justify="center" style={{marginTop: "50px"}}>
            <h4 className={classes.title} style={{color: '#2E3192'}}>coDS island</h4>
          </GridContainer>
          <GridContainer justify="center">
            <h2 className={classes.title}>Contact  <span style={{color: '#2E3192'}}>Us </span></h2>
          </GridContainer>      
          <GridContainer>
            <Card>
              <CardBody>
                <GridContainer>
                  <GridItem sm={6} style={{backgroundColor: "#1D1D1E",borderRadius:"5px"}}>
                    <h3 className={classes.title} style={{color:"white"}}>Contact Information</h3>
                    <h6 className={classes.title} style={{color:"white"}}>Say something to start a live chat!</h6>
                    <GridContainer style={{color:"white", marginLeft: "0px", marginTop: "100px"}}><PhoneIcon></PhoneIcon><p style={{marginBottom: "10px"}}>&nbsp;&nbsp;+1012 3456 789</p></GridContainer>
                    <GridContainer style={{color:"white", marginLeft: "0px"}}><MailIcon></MailIcon><p style={{marginBottom: "10px"}}>&nbsp;&nbsp;demo@gmail.com</p></GridContainer>
                    <GridContainer style={{color:"white", marginLeft: "0px"}}><RoomIcon></RoomIcon><p style={{marginBottom: "10px"}}>&nbsp;&nbsp;132 Dartmouth Street Boston, Massachusetts 02156 United States</p></GridContainer>
                    <GridContainer justify="space-between" style={{color:"white", marginLeft: "0px", marginTop: "100px", marginBottom:"50px", width: "20%"}}>
                      <TwitterIcon ></TwitterIcon>
                      <InstagramIcon></InstagramIcon>
                      <FacebookIcon></FacebookIcon>
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
                      <GridContainer justify="flex-end" style={{marginTop: "100px"}}>
                        <Button round color="primary" size="md">Send Message</Button>
                      </GridContainer>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridContainer>
          {/* Contact US */}

          {/* Footer */}

          <GridContainer justify="space-between" style={{marginTop: "100px"}}>
            <GridItem sm={6}>
              <img src="/img/CoDS_Black_Logo.png"></img>
              <p>Lorem ipsum dolor sit amet consectetur adipising elit aliquam</p>
              <GridContainer style={{color: "#2E3192", width: "50%"}} justify="space-between">
                <GridItem>
                  <TwitterIcon ></TwitterIcon>
                  <InstagramIcon></InstagramIcon>
                  <FacebookIcon></FacebookIcon>
                  <LinkedInIcon></LinkedInIcon>
                  <YouTubeIcon></YouTubeIcon>
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem sm={2}>
              <h4 className={classes.title} style={{color: "#170F49"}}>Product</h4>
              <p>Features</p>
              <p>Pricing</p>
              <p>Case studies</p>
              <p>Reviews</p>
              <p>Updates</p>
            </GridItem>
            <GridItem sm={2}>
              <h4 className={classes.title} style={{color: "#170F49"}}>Company</h4>
              <p>About</p>
              <p>Contact Us</p>
              <p>Careers</p>
              <p>Culture</p>
              <p>Blog</p>
            </GridItem>

            <GridItem sm={2}>
              <h4 className={classes.title} style={{color: "#170F49"}}>Support</h4>
              <p>Getting Started</p>
              <p>Helper center</p>
              <p>Server status</p>
              <p>Report a bug</p>
              <p>Chat support</p>
            </GridItem>
          </GridContainer>

          {/* Footer */}
        {/* </div> */}
        </Container>   
        </div> 
      </div>
      <Footer />
    </div>
  );
}
