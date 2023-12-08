import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import {
  Avatar,
  Grid,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import {
  Search,
  SmsOutlined,
  SmsRounded,
  HomeOutlined,
  HomeRounded,
  PeopleOutlined,
  NotificationsOutlined,
} from "@material-ui/icons";
import Badge from "@material-ui/core/Badge";
import Router from "next/router";
//redux
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../../AppConfigs.js";

const useStyles = makeStyles((theme) => {
  return {
    logoAvatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      marginLeft: theme.spacing(3),
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: `rgba(255,255,255,0.15)`,
      "&:hover": {
        backgroundColor: `rgba(255,255,255,0.25)`,
      },
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    userName: {
      // marginRight:theme.spacing(1)
    },
    avatar: {
      marginLeft: theme.spacing(1),
    },
  };
});
function ElevationScroll(props) {
  const { children } = props;
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
  const classes = useStyles();
  const fullname = useSelector((state) => state.authentication.fullname);
  const redux_email = useSelector((state) => state.authentication.email);
  return (
    <ElevationScroll {...props}>
      <AppBar color="inherit">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid
              container
              item
              xs={5}
              alignItems="center"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Avatar
                src="/img/auth-logo.png"
                className={classes.logoAvatar}
                onClick={() => {
                  Router.push("/");
                }}
                style={{ cursor: "pointer" }}
              />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon color="primary" style={{ opacity: 0.5 }} />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </Grid>
            <Grid item xs={2}>
              <div
                style={{
                  flexGrow: 1,
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={() => {
                    Router.push("/");
                  }}
                >
                  <HomeRounded />
                </IconButton>
                <IconButton
                  onClick={() => {
                    Router.push("/home-feed");
                  }}
                >
                  <DashboardOutlinedIcon />
                </IconButton>
                <IconButton>
                  <SmsOutlined />
                </IconButton>
                <IconButton>
                  <PeopleOutlined />
                </IconButton>
                <IconButton>
                  <Badge color="secondary" variant="dot" invisible={false}>
                    <NotificationsOutlined />
                  </Badge>
                </IconButton>
              </div>
            </Grid>
            <Grid item xs={5} style={{ display: "flex", flexDirection: "row" }}>
              <Grid container alignItems="center">
                <div style={{ flexGrow: 1 }}></div>
                <Typography>{fullname}</Typography>
                {/* <Avatar className={classes.avatar} src={`/img/avatar2.jpg`} /> */}
                <Avatar className={classes.avatar} src={`${BACKEND_URL}/auth/avatars/${redux_email}`} />
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
}
