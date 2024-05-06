import React, { useState, useEffect, useRef } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Rating from '@material-ui/lab/Rating';
// @material-ui/icons
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
// core components
import Grid from '@material-ui/core/Grid';
// components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
// sections for this page
import Card from "/components/Card/Card.js";
import ElevateAppBar from "/components/General/layouts/NavBar.js";
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
//redux
import { useSelector, useDispatch } from "react-redux";
import actions from '../../redux/actions';
import axios from 'axios';
import { BACKEND_URL } from "../../AppConfigs";
//other
import { useSnackbar } from "notistack";
import Router, {useRouter} from "next/router";
const { convert } = require('html-to-text');
//rsuite
import 'rsuite/dist/rsuite.min.css';
//style
import modalStyle from "../../styles/jss/nextjs-material-kit/modalStyle.js";
import styles from "/styles/jss/nextjs-material-kit/pages/components.js";
import basicStyles from "/styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";

import { Container, IconButton, Typography } from "@material-ui/core";


const useStyles = makeStyles(theme => {
  return {
    ...styles,
    ...basicStyles,
    ...modalStyle,
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
      padding: "20px"
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
  }
});


export default function Products(props) {
  //snackbar
  const snackbar = useSnackbar();
  //redux
  const dispatch = useDispatch();
  const redux_token = useSelector((state) => state.authentication.token);
  //other
  const classes = useStyles();
  const { ...rest } = props;
  const [product, setProduct] = useState([]);

  const router = useRouter();

  const displayContentOrNull = (text) => {
    try {
      if(text === "" || text === undefined || text.length === 0)
        return "No Description To Display";
    } catch (e) {
      return "No Description To Display";
    }
    return text;
  }

  const displayPriceOrZero = (price) => {
    if(!price || price == 0)
      return 0;
    return price;
  }

  //component mount
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/shop/products/${router.query.id}`, {headers: {token:redux_token}})
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
        setProduct(response.data.data);
        console.log(response.data.data);
      });
    
      
    axios
      .get(`${BACKEND_URL}/shop/cart/count`, {headers: {token:redux_token}})
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
      });
  }, []);


  return (
    <div>
      <ElevateAppBar />
      <div className={classNames(classes.mainRaised, classes.greyBackground)}>
        <div className={classes.sections}>
          <Container maxWidth={false} style={{ maxWidth: "80%", paddingTop: "30px" }} >
            <GridContainer direction="row" alignItems="center" style={{paddingLeft: '10px'}}>
              <KeyboardBackspaceOutlinedIcon  onClick={() => {Router.push("/products")}} className={classes.cursor} />
              <h5 onClick={() => {Router.push("/products")}} className={classes.cursor} >&nbsp;Back</h5>
            </GridContainer>
            <GridContainer>
              <GridItem xs={3} sm={3} md={3} lg={3} >
                <Card style={{padding: '20px'}}>
                  {/* <img src={`${BACKEND_URL}/shop/products/${router.query.id}/image`} alt="..." style={{ width: "auto", height: "auto"}}></img> */}
                  <img src={router.query.url} alt="..." style={{ width: "auto", height: "auto"}}></img>
                </Card>
              </GridItem>
              <GridItem xs={9} sm={9} md={9} lg={9} >
                <Card style={{padding: '20px', minHeight: '40vh'}}>
                  <h4 style={{ color: "#170F49", fontSize: '40px' }}>{product.title}</h4>
                  <Rating name="read-only" value={4} readOnly  style={{marginTop: '15px'}} />
                  <p style={{ color: "#170F49", fontSize: '30px', marginTop: '20px' }}>${displayPriceOrZero(product.price)}</p>
                  <p style={{ color: "#170F49", fontSize: '20px', marginTop: '20px' }}>{displayContentOrNull(convert(product.description))}</p>
                </Card>
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
