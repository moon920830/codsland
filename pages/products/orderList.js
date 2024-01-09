import React, { useState, useEffect } from "react";
//components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import Badge from "/components/Badge/Badge.js";
//icon
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
//@material-ui/core components
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
//custom
import Rating from '@material-ui/lab/Rating';
import { Divider } from '@material-ui/core';
import { BACKEND_URL } from "../../AppConfigs";
import axios from 'axios';

import styles from "/styles/jss/nextjs-material-kit/pages/components.js";
const useStyles = makeStyles(theme => {
  return {
    ...styles,
    cursor: {
      cursor: 'pointer'
    },
    price: {
      fontSize: '18px',
      fontFamily: 'satoshi',
      fontWeight: '700',
      lineHeight: '34px'
    }
  }
});

export default function ProductList(props) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(props.count);
  }, []);

  const handleQuantityChange = (e) => {
    axios
      .post(`${BACKEND_URL}/shop/cart/${props.product._id}/count`, {
        count: (e.target.value*1)
      }, {}) //, {headers: {token:redux_token}}
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
        setQuantity(e.target.value*1);
      });
  }

  const handleMinus = (e) => {
    let q = quantity;
    let new_q = (q-1 >= 1 ? (q-1) : 1);
    props.handleTotalChange((new_q-q)*props.product.price);

    axios
      .post(`${BACKEND_URL}/shop/cart/${props.product._id}/count`, {
        count: new_q
      }, {}) //, {headers: {token:redux_token}}
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
        setQuantity(new_q);
      });
  }

  const handlePlus = (e) => {
    let q = quantity;
    let new_q = q+1;
    props.handleTotalChange((new_q-q)*props.product.price);

    axios
      .post(`${BACKEND_URL}/shop/cart/${props.id}/count`, {
        count: new_q
      }, {}) //, {headers: {token:redux_token}}
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
        setQuantity(new_q);
      });
  }

  return (
    <div>
      <Divider />
      <GridContainer>
        <GridItem sm={2}>
          <div style={{height: '15vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
            <img src={`${BACKEND_URL}/shop/products/${props.product._id}/image`} alt="..." style={{ width: "auto", height: "12vh"}}></img>
            {/* <img src="/img/airbuds.png" alt="..." style={{ width: "auto", height: "25vh"}}></img> */}
          </div>
        </GridItem>
        <GridItem sm={6}>
          <GridContainer direction="column" justify="space-between" style={{height: '100%'}}>
            <div>
              <h3 className={classes.title} style={{ color: "#2E3192" }}>{props.product.title}</h3>
              <p>{props.product.description}</p>
            </div>
            <Rating name="read-only" value={4} readOnly />
          </GridContainer>
          
        </GridItem>
        <GridItem sm={2} style={{paddingRight: '30px', paddingTop: '10px', paddingBottom: '10px'}}>
          <GridContainer direction="column" justify="space-between" style={{height: '100%', paddingRight: '15px'}}>
            <div style={{display:'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
              <h4 className={classes.price} style={{ color: "#2E3192" }}>${props.product.price}</h4>
              <h4 className={classes.price} style={{ color: "#2E3192" }}>(${(props.product.price*quantity).toFixed(2)})</h4>
            </div>
          </GridContainer>
        </GridItem>
        <GridItem sm={2} style={{paddingRight: '30px', paddingTop: '10px', paddingBottom: '10px'}}>
          <GridContainer direction="column" justify="space-between" style={{height: '100%', paddingRight: '15px'}}>
            <div style={{display:'flex', justifyContent: 'flex-end'}}>
              <Badge color="warning" size="medium">canceled</Badge>
            </div>
            <div style={{display:'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
              <h4 className={classes.price} style={{ color: "#2E3192" }}>${props.product.price}</h4>
              <h4 className={classes.price} style={{ color: "#2E3192" }}>(${(props.product.price*quantity).toFixed(2)})</h4>
            </div>
          </GridContainer>
        </GridItem>
      </GridContainer>
      <Divider style={{marginBottom: '10px'}} />
    </div>
  )
}
