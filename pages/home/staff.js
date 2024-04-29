import React from "react";
// core components
import GridContainer from "/components/Grid/GridContainer.js";
import { makeStyles } from "@material-ui/core/styles";
import { Container, IconButton, Typography } from "@material-ui/core";
// icons
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

const useStyles = makeStyles((theme) => ({
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 10, // Adjust the number of lines to fit your desired height
    WebkitBoxOrient: 'vertical',
    minHeight: '44px'
  },
}));

export default function Staff(props) {
  const classes = useStyles();

  return (
    <GridContainer alignItems="center" direction="column">
      <img src={props.image}></img>
      <h3 className={classes.title} style={{ color: 'black' }}>{props.title}</h3>
      {/* <h4 className={classes.title} style={{ color: '#5C8692', marginTop: '0px' }}>BEAUTYNESS EXPERT</h4> */}
      <h4 className={classes.ellipsis} style={{ color: 'black', textAlign: 'center', marginTop: '5px' }}>
        {props.children}
      </h4>
      <GridContainer>
        <IconButton color="default" ><FacebookIcon /></IconButton>
        <IconButton color="default" ><TwitterIcon /></IconButton>
        <IconButton color="default" ><InstagramIcon /></IconButton>
      </GridContainer>
    </GridContainer>
  );
}
