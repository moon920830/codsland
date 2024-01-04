/*eslint-disable*/
import React from "react";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

// core components
import CustomDropdown from "/components/CustomDropdown/CustomDropdown.js";
import Button from "/components/CustomButtons/Button.js";

//redux
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import actions from '../../redux/actions';

//noti
import { useSnackbar } from "notistack";
import Router from "next/router";
import styles from "/styles/jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

function HeaderLinks(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const snackbar = useSnackbar();

  const handleDashboard = () => {
    if(props.token==null || props.token==undefined)
    {
      return snackbar.enqueueSnackbar("Sign in first", { variant: "info" });
    } else {
      return Router.push("/home-feed");
    }
  }

  const handleProducts = () => {
    if(props.token==null || props.token==undefined)
    {
      return snackbar.enqueueSnackbar("Sign in first", { variant: "info" });
    } else {
      return Router.push("/products");
    }
  }

  const handleLogin = () => {
    if(!(props.token==null || props.token==undefined))
    {
      return snackbar.enqueueSnackbar("Already signed in. Click dashboard", { variant: "info" });
    } else {
      return Router.push("/login");
    }
  }

  const handleLogout = () => {
    dispatch(actions.deauthenticate());
    // return Router.push("");
  }

  return (
    <List className={classes.list}>
      {/* <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          buttonText="Components"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link href="/components">
              <a className={classes.dropdownLink}>All components</a>
            </Link>,
            <a
              href="https://creativetimofficial.github.io/nextjs-material-kit/#/documentation?ref=njsmk-navbar"
              target="_blank"
              className={classes.dropdownLink}
            >
              Documentation
            </a>
          ]}
        />
      </ListItem> */}
      <ListItem className={classes.listItem}>
        <Button
          // href="https://www.creative-tim.com/product/nextjs-material-kit-pro?ref=njsmk-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        >
          Home
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <a
            href="#about_section"
            style={{color:"inherit"}}
            >
          About</a>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          // href="https://www.creative-tim.com/product/nextjs-material-kit-pro?ref=njsmk-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <a
            href="#service_section"
            style={{color:"inherit"}}
            >
            Services
          </a>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>        
        <Button
          href=""
          color="transparent"
          target="_blank"
          className={classes.navLink}
          onClick={handleProducts}
        >
          Products
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          // href="https://www.creative-tim.com/product/nextjs-material-kit-pro?ref=njsmk-navbar"
          color="transparent"
          target="_blank"
          style={{color:"inherit"}}
        >
          <a
            href="#contact_section"
            style={{color:"inherit"}}
          >
          Contact
          </a>
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href=""
          color="transparent"
          target="_blank"
          className={classes.navLink}
          onClick={handleDashboard}
        >
          Dashboard
        </Button>
      </ListItem>
      {props.token == null ? <ListItem className={classes.listItem}>
        <Button
          href=""
          color="transparent"
          target="_blank"
          className={classes.navLink}
          onClick={handleLogin}
        >
          Log In
        </Button>
      </ListItem> : <ListItem className={classes.listItem}>
        <Button
          href=""
          color="transparent"
          target="_blank"
          className={classes.navLink}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </ListItem>}
      {/* <ListItem className={classes.listItem}>
        <Button
          href="https://www.creative-tim.com/product/nextjs-material-kit?ref=njsmk-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> Download
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={"top"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={"top"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={"top"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem> */}
    </List>
  );
}




const mapStateToProps = (state) => {
  return {
    token: state.authentication.token,
  };
};

export default connect(mapStateToProps)(HeaderLinks);