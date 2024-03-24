import React, { useState, useEffect } from 'react'
import styles from "/styles/jss/nextjs-material-kit/pages/components.js";
import basicStyles from "/styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";
// @material-ui/core components
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
// redux
import axios from 'axios';
import { BACKEND_URL } from "../../../AppConfigs";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => {
  return {
    ...styles,
    ...basicStyles,
    noPadding: {
      padding: '0px'
    },
    selectedPlan: {
      padding: '0px',
      marginLeft: '0px',
      marginRight: '0px',
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    unselectedPlan: {
      padding: '0px',
      marginLeft: '0px',
      marginRight: '0px',
    },
    selectedPlanItem: {
      paddingTop: '10px',
      paddingBottom: '10px',
    },
  }
});

export default function ShipRates(props) {
  const classes = useStyles();
  const [shipment, setShipment] = useState({});
  const [rate, setRate] = useState({});
  const [currentPlan, setCurrentPlan] = useState(0);
  const redux_token = useSelector((state) => state.authentication.token);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/shop/orders/${props.id}`, {headers: {token:redux_token}}) //, {headers: {token:redux_token}}
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
        
        // const total = response.data.data.reduce((sum, value) => {
        //   if(value.product && value.product.price)
        //     return sum + value.product.price*value.count;
        // }, 0)
        // setTotal(total);
        const data = response.data.data;
        let rate_from_back;
        setShipment(data.shipping_info);
        if (data.shipping_rate !== null) {
          rate_from_back = data.shipping_rate;
        } else {
          rate_from_back = data.shipping_info.rates[0];
          handleSelectRate(rate_from_back);
        }
        setRate(rate_from_back);
      });
  }, []);

  const handleSelectRate = (param_rate) => {
    // if (handleCheckDetails() !== "valid")
    //   return ;
    axios
      .put(`${BACKEND_URL}/shop/orders/shipment`, {
        order_id: props.id,
        rate: param_rate,
      }, {headers: {token:redux_token}}) //, {headers: {token:redux_token}}
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
        props.refreshTotal();
        // Router.push("/dummy-success");
        // snackbar.enqueueSnackbar("Purchase Success", { variant: "success" });
      });
  }

  return (
    <GridContainer>
      <GridItem>
        <GridContainer alignItems="center" className={classes.title} style={{backgroundColor:"#2E3192", borderRadius: "26px 26px 0px 0px", color: "white", marginBottom: '0px'}}>
          <GridItem sm={2}>No</GridItem>
          <GridItem sm={2}>Price</GridItem>
          <GridItem sm={4}>Provider Icon</GridItem>
          <GridItem sm={1}>Provider Name</GridItem>
          <GridItem sm={2}>Duration Terms</GridItem>
          <GridItem sm={1}>Estimated Days</GridItem>
        </GridContainer>
      </GridItem>
      <GridItem className={classes.title} style={{margin: '0px'}}>
        {shipment && shipment.rates && shipment.rates.map((item, index) => (
          <React.Fragment key={index}>
            <GridContainer onClick={() => {setRate(item), setCurrentPlan(index), handleSelectRate(item)}} className={index === currentPlan ? classes.selectedPlan : classes.unselectedPlan}>
              <GridItem className={classes.selectedPlanItem} sm={2}>{index+1}</GridItem>
              <GridItem className={classes.selectedPlanItem} sm={2}>${item.amount}</GridItem>
              <GridItem className={classes.selectedPlanItem} sm={4}>
                <img src={item.provider_image_75} />
              </GridItem>
              <GridItem className={classes.selectedPlanItem} sm={1}>{item.provider}</GridItem>
              <GridItem className={classes.selectedPlanItem} sm={2}>{item.duration_terms}</GridItem>
              <GridItem className={classes.selectedPlanItem} sm={1}>{item.estimated_days}</GridItem>
            </GridContainer>
            {index !== shipment.rates.length && <Divider />}
          </React.Fragment>
        ))}
      </GridItem>
    </GridContainer>
  )
}
