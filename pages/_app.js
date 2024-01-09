import React from "react";
import App from "next/app";
import Head from "next/head";
import "/styles/scss/nextjs-material-kit.scss?v=1.2.0";
import { wrapper } from '../redux';
import { removeError } from '../redux/actions/errorActions';
import { SnackbarProvider } from 'notistack';
import '../styles/css/index.css'
import {ThemeProvider,createMuiTheme} from '@material-ui/core/styles'
import { CssBaseline } from "@material-ui/core";
import { getCookieFromBrowser,getCookie } from '../utils/cookie';
import { AUTHENTICATE } from '../redux/types/authTypes';
import 'leaflet/dist/leaflet.css';
// import DateFnsUtils from "@date-io/date-fns";
const theme=createMuiTheme({
  typography:{
    fontFamily:'satoshi'
  },
})
class MyApp extends App {
  constructor(props) {
   super(props);
  }
  componentDidMount() {
    let comment = document.createComment(`

=========================================================
* NextJS Material Kit v1.2.2 based on Material Kit Free - v2.0.2 (Bootstrap 4.0.0 Final Edition) and Material Kit React v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-kit
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-kit/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

`);
    document.insertBefore(comment, document.documentElement);
  }
  fetchToken() {
    return getCookieFromBrowser('token');
  }
  static async getInitialProps({ Component, ctx }) {
    let token, fullname, email;
    // Check if running on the server
    if (ctx.req) {
      // Access cookies from the request object on the server
      token = ctx.req.headers.cookie ? getCookie('token', ctx.req) : null;
      email = ctx.req.headers.cookie ? getCookie('email', ctx.req) : null;
      fullname = ctx.req.headers.cookie ? getCookie('fullname', ctx.req) : null;
    } else {
      // Access cookies from the document object on the client
      token = getCookieFromBrowser('token');
      email = getCookieFromBrowser('email');
      fullname = getCookieFromBrowser('fullname');
    }
    ctx.store.dispatch(removeError());
    fullname = decodeURIComponent(fullname);
    ctx.store.dispatch({
      type: AUTHENTICATE,
      payload: { token, fullname, email },
    });

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  
  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>CodsLand</title>
        </Head>
        <ThemeProvider theme={theme} >
        <SnackbarProvider anchorOrigin={{horizontal:"left",vertical:"top"}} >
        <Component {...pageProps} />
        </SnackbarProvider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default wrapper.withRedux(MyApp);