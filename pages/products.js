import React, { useState, useEffect, useRef } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import NavigationIcon from "@material-ui/icons/Navigation";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import BlockIcon from "@material-ui/icons/Block";
// core components
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Badge from "@material-ui/core/Badge";
// components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import ProductCard from "../pages/products/productCard.js";
// sections for this page
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Card from "/components/Card/Card.js";
import ElevateAppBar from "/components/General/layouts/NavBar.js";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";
//redux
import { useSelector, useDispatch } from "react-redux";
import actions from "../redux/actions";
import axios from "axios";
import { BACKEND_URL } from "../AppConfigs";
//other
import { useSnackbar } from "notistack";
import Router from "next/router";
//style
import modalStyle from "../styles/jss/nextjs-material-kit/modalStyle.js";
import styles from "/styles/jss/nextjs-material-kit/pages/components.js";
import basicStyles from "/styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";

import { Container, IconButton, Typography } from "@material-ui/core";
import CustomPaginationActionsTable from "./products/CustomPaginationActionsTable.js";

const useStyles = makeStyles((theme) => {
  return {
    ...styles,
    ...basicStyles,
    ...modalStyle,
    slideCard: {
      backgroundColor: "#F5F5F5",
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    greyBackground: {
      backgroundColor: "#EEE",
    },
    cardPadding: {
      padding: "20px",
    },
    cardPaddingNoTop: {
      paddingBottom: "20px",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    minHeightForCard: {
      minHeight: "80vh",
    },
    cardSubTitle: {
      opacity: "0.5",
      fontSize: "13px",
    },
    cursor: {
      cursor: "pointer",
    },
    reportPost: {
      width: "146px",
      height: "49px",
      borderRadius: "18px",
      background: "#FFF",
      boxShadow: "0px 6px 16.6px 0px rgba(0, 0, 0, 0.25)",
    },
    textCenter: {
      textAlign: "center",
    },
    enterReason: {
      marginTop: "21px",
    },
    formControl: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  };
});

export default function Products(props) {
  //snackbar
  const snackbar = useSnackbar();
  //redux
  const dispatch = useDispatch();
  const redux_token = useSelector((state) => state.authentication.token);
  const redux_membership = useSelector((state) => state.authentication.membership);
  //other
  const classes = useStyles();
  const { ...rest } = props;
  const [selectedEnabled, setSelectedEnabled] = React.useState("All");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  //component mount
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/shop/categories`, {
        headers: { token: redux_token },
      })
      .then((response) => {
        //error handler
        if (response.data.status == "error") {
          const { error } = response.data;
          dispatch(actions.createError(error));

          if (response.data.error == "NOT_MEMBER") {
            snackbar.enqueueSnackbar("Purchase membership please", {
              variant: "error",
            });
            Router.push("/home");
          } else if (response.data.error == "EXPIRED") {
            snackbar.enqueueSnackbar(
              "Membership expired. Please purchase membership again.",
              { variant: "error" }
            );
            Router.push("/home");
          } else {
            snackbar.enqueueSnackbar(
              response.data.error ? response.data.error : "Error",
              { variant: "error" }
            );
          }
        } else {
          setCategories(response.data.data);
        }
      });
    axios
      .get(`${BACKEND_URL}/shop/cart/count`, {
        headers: { token: redux_token },
      }) //, {headers: {token:redux_token}}
      .then((response) => {
        //error handler
        if (response.data.status == "error") {
          const { error } = response.data;
          dispatch(actions.createError(error));

          if (
            !(
              response.data.error == "NOT_MEMBER" ||
              response.data.error == "EXPIRED"
            )
          ) {
            snackbar.enqueueSnackbar(
              response.data.error ? response.data.error : "Error",
              { variant: "error" }
            );
          }
        } else {
          setCartCount(response.data.data);
        }
      });
    axios
      .post(
        `${BACKEND_URL}/shop/products/page`,
        {
          page: page,
          pagesize: rowsPerPage,
        },
        { headers: { token: redux_token } }
      )
      .then((response) => {
        //error handler
        if (response.data.status == "error") {
          const { error } = response.data;
          dispatch(actions.createError(error));
          if (
            !(
              response.data.error == "NOT_MEMBER" ||
              response.data.error == "EXPIRED"
            )
          ) {
            snackbar.enqueueSnackbar(
              response.data.error ? response.data.error : "Error",
              { variant: "error" }
            );
          }
        } else {
          setProducts(response.data.data.pagedata);
          setTotalCount(response.data.data && response.data.data.totalNumbers);
        }
      });
  }, []);

  function handleAddToCart(product) {
    axios
      .post(
        `${BACKEND_URL}/shop/cart`,
        {
          product: product,
        },
        { headers: { token: redux_token } }
      ) //, {headers: {token:redux_token}}
      .then((response) => {
        //error handler
        if (response.data.status == "error") {
          const { error } = response.data;
          dispatch(actions.createError(error));
          return snackbar.enqueueSnackbar(
            response.data.error ? response.data.error : "Error",
            { variant: "error" }
          );
        }

        axios
          .get(`${BACKEND_URL}/shop/cart/count`, {
            headers: { token: redux_token },
          }) //, {headers: {token:redux_token}}
          .then((response) => {
            //error handler
            if (response.data.status == "error") {
              const { error } = response.data;
              dispatch(actions.createError(error));
              return snackbar.enqueueSnackbar(
                response.data.error ? response.data.error : "Error",
                { variant: "error" }
              );
            }
            setCartCount(response.data.data);
          });
      });
  }

  const handleDisplayAll = () => {
    setPage(0);
    setRowsPerPage(6);
    axios
      .post(
        `${BACKEND_URL}/shop/products/page`,
        {
          page: 0,
          pagesize: 6,
        },
        { headers: { token: redux_token } }
      )
      .then((response) => {
        //error handler
        if (response.data.status == "error") {
          const { error } = response.data;
          dispatch(actions.createError(error));
          return snackbar.enqueueSnackbar(
            response.data.error ? response.data.error : "Error",
            { variant: "error" }
          );
        }
        setProducts(response.data.data.pagedata);
        setTotalCount(response.data.data && response.data.data.totalNumbers);
      });
    setSelectedEnabled("All");
  };

  const handleDisplayByCategory = (id, title) => {
    setPage(0);
    setRowsPerPage(6);
    axios
      .post(
        `${BACKEND_URL}/shop/categories/${id}/products/page`,
        {
          page: 0,
          pagesize: 6,
        },
        { headers: { token: redux_token } }
      )
      .then((response) => {
        //error handler
        if (response.data.status == "error") {
          const { error } = response.data;
          dispatch(actions.createError(error));
          return snackbar.enqueueSnackbar(
            response.data.error ? response.data.error : "Error",
            { variant: "error" }
          );
        }
        setProducts(response.data.data.pagedata);
        setTotalCount(response.data.data && response.data.data.totalNumbers);
      });
    setSelectedEnabled(title);
  };

  const handlePageChange = (new_page) => {
    setPage(new_page);
    axios
      .post(
        `${BACKEND_URL}/shop/products/page`,
        {
          page: new_page,
          pagesize: rowsPerPage,
        },
        { headers: { token: redux_token } }
      )
      .then((response) => {
        //error handler
        if (response.data.status == "error") {
          const { error } = response.data;
          dispatch(actions.createError(error));
          return snackbar.enqueueSnackbar(
            response.data.error ? response.data.error : "Error",
            { variant: "error" }
          );
        }
        setProducts(response.data.data.pagedata);
      });
  };

  const handleRowsPerPageChange = (new_rows_per_page) => {
    if (new_rows_per_page === -1)
      new_rows_per_page = cartCount;
    setRowsPerPage(new_rows_per_page);
    axios
      .post(
        `${BACKEND_URL}/shop/products/page`,
        {
          page: page,
          pagesize: new_rows_per_page,
        },
        { headers: { token: redux_token } }
      )
      .then((response) => {
        //error handler
        if (response.data.status == "error") {
          const { error } = response.data;
          dispatch(actions.createError(error));
          return snackbar.enqueueSnackbar(
            response.data.error ? response.data.error : "Error",
            { variant: "error" }
          );
        }
        setProducts(response.data.data.pagedata);
      });
  };

  return (
    <div>
      <ElevateAppBar />
      <div className={classNames(classes.mainRaised, classes.greyBackground)}>
        <div className={classes.sections}>
          <Container
            maxWidth={false}
            style={{ maxWidth: "80%", paddingTop: "30px" }}
          >
            <GridContainer>
              {categories && categories.length == 0 ? (
                <GridItem
                  md={3}
                  lg={3}
                  xl={3}
                  className={classes.minHeightForCard}
                >
                  <GridContainer
                    style={{ height: "100%" }}
                    justify="center"
                    alignItems="center"
                    direction="column"
                  >
                    <div
                      style={{
                        backgroundColor: "green",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                        width: "120px",
                        height: "120px",
                      }}
                    >
                      <BlockIcon
                        style={{ width: "40%", height: "40%", color: "white" }}
                      />
                    </div>
                    <h3 style={{ textAlign: "center" }}>
                      No categories to display
                    </h3>
                  </GridContainer>
                </GridItem>
              ) : (
                <GridItem xs={3} sm={3} md={3} lg={3}>
                  <Card className={classes.minHeightForCard}>
                    <GridContainer
                      direction="column"
                      style={{ paddingLeft: "15px" }}
                    >
                      <GridItem>
                        <FormControlLabel
                          control={
                            <Radio
                              checked={selectedEnabled === "All"}
                              onChange={() => handleDisplayAll()}
                              value="All"
                              name="radio button enabled"
                              aria-label="B"
                              icon={
                                <FiberManualRecord
                                  className={classes.radioUnchecked}
                                />
                              }
                              checkedIcon={
                                <FiberManualRecord
                                  className={classes.radioChecked}
                                />
                              }
                              classes={{
                                checked: classes.radio,
                                root: classes.radioRoot,
                              }}
                            />
                          }
                          classes={{
                            label: classes.label,
                            root: classes.labelRoot,
                          }}
                          label="All"
                        />
                      </GridItem>
                      {categories.map((value) => (
                        <GridItem key={value._id}>
                          <FormControlLabel
                            control={
                              <Radio
                                checked={selectedEnabled === value.title}
                                onChange={() =>
                                  handleDisplayByCategory(
                                    value._id,
                                    value.title
                                  )
                                }
                                value={value.title}
                                name="radio button enabled"
                                aria-label="B"
                                icon={
                                  <FiberManualRecord
                                    className={classes.radioUnchecked}
                                  />
                                }
                                checkedIcon={
                                  <FiberManualRecord
                                    className={classes.radioChecked}
                                  />
                                }
                                classes={{
                                  checked: classes.radio,
                                  root: classes.radioRoot,
                                }}
                              />
                            }
                            classes={{
                              label: classes.label,
                              root: classes.labelRoot,
                            }}
                            label={value.title}
                          />
                        </GridItem>
                      ))}
                    </GridContainer>
                  </Card>
                </GridItem>
              )}

              {products && products.length == 0 ? (
                <GridItem
                  md={9}
                  lg={9}
                  xl={9}
                  className={classes.minHeightForCard}
                >
                  <GridContainer
                    style={{ height: "100%" }}
                    justify="center"
                    alignItems="center"
                    direction="column"
                  >
                    <div
                      style={{
                        backgroundColor: "green",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                        width: "120px",
                        height: "120px",
                      }}
                    >
                      <BlockIcon
                        style={{ width: "40%", height: "40%", color: "white" }}
                      />
                    </div>
                    <h3 style={{ textAlign: "center" }}>
                      No products to display
                    </h3>
                  </GridContainer>
                </GridItem>
              ) : (
                <GridItem xs={9} sm={9} md={9} lg={9}>
                  <Card
                    className={
                      classes.cardPaddingNoTop + " " + classes.minHeightForCard
                    }
                  >
                    <GridContainer>
                      {products.map((value) => (
                        <ProductCard
                          key={value._id}
                          title={value.title}
                          value={value}
                          description={value.description}
                          price={value.price}
                          category={value.category}
                          id={value._id}
                          handleAddToCart={handleAddToCart}
                          image={value.image}
                        />
                      ))}
                    </GridContainer>
                    <CustomPaginationActionsTable
                      handleRowsPerPageChangeFromParent={
                        handleRowsPerPageChange
                      }
                      handlePageChangeFromParent={handlePageChange}
                      row_length={totalCount}
                    />
                  </Card>
                </GridItem>
              )}
            </GridContainer>
            {/* Fab Icons start */}
            <Link href="/products/order">
              <Fab
                color="primary"
                aria-label="add"
                style={{ position: "fixed", bottom: 100, right: 60 }}
              >
                <NavigationIcon />
              </Fab>
            </Link>
            <Badge
              badgeContent={cartCount}
              color="secondary"
              style={{ position: "fixed", bottom: 20, right: 60 }}
            >
              <Link href="/products/cart">
                <Fab color="primary" aria-label="add">
                  <ShoppingCartOutlinedIcon />
                </Fab>
              </Link>
            </Badge>
            {/* Fab Icons end */}

            {/* Footer start */}
            <GridContainer
              justify="space-between"
              style={{ marginTop: "100px" }}
            >
              <GridItem sm={6}>
                <img src="/img/CoDS_Black_Logo.png"></img>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipising elit aliquam
                </p>
                <GridContainer
                  style={{ color: "#2E3192", width: "50%" }}
                  justify="space-between"
                >
                  <GridItem>
                    <IconButton color="primary">
                      <TwitterIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <InstagramIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <FacebookIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton color="primary">
                      <YouTubeIcon />
                    </IconButton>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem sm={2}>
                <h4 className={classes.title} style={{ color: "#170F49" }}>
                  Product
                </h4>
                <p>
                  <Link href="/">Features</Link>
                </p>
                <p>
                  <Link href="/">Pricing</Link>
                </p>
                <p>
                  <Link href="/">Case studies</Link>
                </p>
                <p>
                  <Link href="/">Reviews</Link>
                </p>
                <p>
                  <Link href="/">Updates</Link>
                </p>
              </GridItem>
              <GridItem sm={2}>
                <h4 className={classes.title} style={{ color: "#170F49" }}>
                  Company
                </h4>
                <p>
                  <Link href="/">About</Link>
                </p>
                <p>
                  <Link href="/">Contact Us</Link>
                </p>
                <p>
                  <Link href="/">Careers</Link>
                </p>
                <p>
                  <Link href="/">Culture</Link>
                </p>
                <p>
                  <Link href="/">Blog</Link>
                </p>
              </GridItem>

              <GridItem sm={2}>
                <h4 className={classes.title} style={{ color: "#170F49" }}>
                  Support
                </h4>
                <p>
                  <Link href="/">Getting Started</Link>
                </p>
                <p>
                  <Link href="/">Helper center</Link>
                </p>
                <p>
                  <Link href="/">Server status</Link>
                </p>
                <p>
                  <Link href="/">Report a bug</Link>
                </p>
                <p>
                  <Link href="/">Chat support</Link>
                </p>
              </GridItem>
            </GridContainer>
            {/* Footer end */}
          </Container>
        </div>
      </div>
      <Grid container>
        <Grid item xs={4} style={{ display: "flex", justifyContent: "center" }}>
          <Typography>Copyright © 2023 CODS</Typography>
        </Grid>
        <Grid item xs={7}>
          <p style={{ float: "right" }}>
            <Link href="/">All Rights Reserved</Link> |{" "}
            <Link href="/">Terms Condition</Link> |{" "}
            <Link href="/">Privacy Policy</Link>
          </p>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}
