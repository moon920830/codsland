import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Avatar, Box, IconButton, TextField, Typography, makeStyles } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { Search,SmsOutlined,SmsRounded,HomeOutlined,HomeRounded, PeopleOutlined, NotificationsOutlined } from '@material-ui/icons';
const useStyles=makeStyles(theme=>{
    return {
        logoAvatar:{
            width:theme.spacing(10),
            height:theme.spacing(10),
            marginLeft:theme.spacing(3)
        },
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: `rgba(255,255,255,0.15)`,
            '&:hover': {
                backgroundColor: `rgba(255,255,255,0.25)`,
            },
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                width: '20ch',
                },
            },
        },
        userName:{
            // marginRight:theme.spacing(1)
        },
        avatar:{
            marginLeft:theme.spacing(1)
        }
    }
})
function ElevationScroll(props) {
  const { children} = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export default function ElevateAppBar(props) {
    const classes=useStyles();
  return (
      <ElevationScroll {...props}>
        <AppBar color='default' >
          <Toolbar>
            <div style={{flexGrow:1}} >
                <Avatar src='/img/auth-logo.png' className={classes.logoAvatar}  />
            </div>
            
            <div style={{flexGrow:1}} >
            <IconButton><HomeRounded/></IconButton>
            <IconButton><SmsOutlined/></IconButton>
            <IconButton><PeopleOutlined/></IconButton>
            <IconButton><NotificationsOutlined/></IconButton>
            </div>
                <Typography >Keil Vise</Typography>
                <Avatar className={classes.avatar} src={`/img/avatar2.jpg`} />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
  );
}