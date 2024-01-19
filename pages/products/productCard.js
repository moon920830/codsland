import React from 'react';
//components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import Button from "/components/CustomButtons/Button.js";
import Badge from "/components/Badge/Badge.js";
//icon
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
//@material-ui/core components
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
//other
import Rating from '@material-ui/lab/Rating';
import classNames from "classnames";
import { BACKEND_URL } from "../../AppConfigs";
import Router from "next/router";
const { convert } = require('html-to-text');


const useStyles = makeStyles(theme => {
  return {
    cursor: {
      cursor: 'pointer'
    },
    ellipsis: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2, // Adjust the number of lines to fit your desired height
      WebkitBoxOrient: 'vertical',
      height: '40px'
    },
    titleEllipsis: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 1, // Adjust the number of lines to fit your desired height
      WebkitBoxOrient: 'vertical',
      height: '40px'
    }
  }
});

export default function productCard(props) {
  const classes = useStyles();
  return (
      <GridItem sm={4}>
        <Card style={{ backgroundColor: "#F8F8F8"}}>
          <CardBody>
            <div style={{position:'absolute', right: '0', top: '0px'}}>
              {/* <Button color="warning">{props.categoryTitle}</Button> */}
              {props.category && props.category.title && <Badge color="warning" size="medium">{props.category.title}</Badge>}
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }} >
              {(props.value && props.value.image_url) ?
              (<img src={props.value.image_url} alt="..." style={{ width: "15vw", height: "25vh", cursor: 'pointer'}} onClick={() => { Router.push({pathname: '/products/productDetails', query: {id:props.id}}) }}></img>) : 
              (<img src={`${BACKEND_URL}/shop/products/${props.id}/image`} alt="..." style={{ width: "15vw", height: "25vh", cursor: 'pointer'}} onClick={() => { Router.push({pathname: '/products/productDetails', query: {id:props.id}}) }}></img>)}
            </div>
            <h3 className={classes.title + " " + classes.titleEllipsis} style={{ color: "#2E3192" }}>{props.title}</h3>
            <p className={classes.ellipsis}>{convert(props.description)}</p>
            <Rating name="read-only" value={4} readOnly />
            <Grid container direction="row" justify="space-between" alignItems="flex-end">
              <h2 className={classes.title} style={{ color: "#2E3192" }}>${props.price}</h2>
              <p className={classNames(classes.title, classes.cursor)} style={{ display: "flex" }} onClick={() => {props.handleAddToCart(props.id)}}><ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>Add to Cart</p>
            </Grid>
          </CardBody>
        </Card>
      </GridItem>
  )
}