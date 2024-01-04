import React from 'react';
//components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
//icon
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
//@material-ui/core components
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
//custom
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(theme => {
  return {
  }
});

export default function productCard() {
  const classes = useStyles();
  return (
      <GridItem sm={4}>
        <Card style={{ backgroundColor: "#F8F8F8"}}>
          <CardBody>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
              <img src="/img/airbuds.png" alt="..." style={{ width: "auto", height: "25vh"}}></img>
            </div>
            <h3 className={classes.title} style={{ color: "#2E3192" }}>Air Buds</h3>
            <p>Air Buds are designed to replace electronic ear buds.</p>
            <Rating name="read-only" value={4} readOnly />
            <Grid container direction="row" justify="space-between" alignItems="flex-end">
              <h2 className={classes.title} style={{ color: "#2E3192" }}>$25</h2>
              <p className={classes.title} style={{ display: "flex" }}><ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>Add to Cart</p>
            </Grid>
          </CardBody>
        </Card>
      </GridItem>
  )
}