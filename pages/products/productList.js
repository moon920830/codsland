import React, { useState } from "react";
//components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
//icon
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
//@material-ui/core components
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
//custom
import Rating from '@material-ui/lab/Rating';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => {
  return {
  }
});

export default function ProductList(props) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  return (
    <div>
      <Divider />
      <GridContainer>
        <GridItem sm={3}>
          <div style={{ }} >
            <img src="/img/airbuds.png" alt="..." style={{ width: "auto", height: "25vh"}}></img>
          </div>
        </GridItem>
        <GridItem sm={6}>
          <GridContainer direction="column" justify="space-between" style={{height: '100%'}}>
            <div>
              <h3 className={classes.title} style={{ color: "#2E3192" }}>Air Buds</h3>
              <p>Air Buds are designed to replace electronic ear buds.</p>
            </div>
            <Rating name="read-only" value={4} readOnly />
          </GridContainer>
          
        </GridItem>
        <GridItem sm={3}>
          <GridContainer direction="column" justify="space-between" style={{height: '100%', paddingRight: '15px'}}>
            <div style={{display:'flex', justifyContent: 'flex-end'}}>
              <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
            </div>
            <div style={{display:'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
              <h2 className={classes.title} style={{ color: "#2E3192" }}>${props.price}</h2>
              <h2 className={classes.title} style={{ color: "#2E3192" }}>(${props.price*quantity})</h2>
              <TextField
                // type="number"
                style={{width: '100px'}}
                value={quantity}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={() => {let q = quantity;setQuantity(q-1 >= 1 ? (q-1) : 1);}} edge="start" size="large">
                        <RemoveIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => {let q = quantity;setQuantity(q+1);}} edge="end" size="large">
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </GridContainer>
        </GridItem>
      </GridContainer>
      <Divider />
    </div>
  )
}
