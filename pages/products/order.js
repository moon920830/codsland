import React, { useState, useEffect, useRef } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import { Dialog, DialogContent, DialogTitle, DialogActions, Divider } from "@material-ui/core";
import { List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
// @material-ui/icons
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
// import Badge from '@material-ui/core/Badge';
import Badge from '../../components/Badge/Badge.js';
import { Container, IconButton, Typography } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
// components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
// sections for this page
import Card from "/components/Card/Card.js";
import ElevateAppBar from "/components/General/layouts/NavBar.js";
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
//redux
import { useSelector, useDispatch } from "react-redux";
import actions from '../../redux/actions';
import axios from 'axios';
import { BACKEND_URL } from "../../AppConfigs";
//other
import { useSnackbar } from "notistack";
//style
import modalStyle from "../../styles/jss/nextjs-material-kit/modalStyle.js";
import styles from "/styles/jss/nextjs-material-kit/pages/components.js";
import basicStyles from "/styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";
//next
import Router from "next/router";
//table
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import FilterListIcon from '@material-ui/icons/FilterList';
//custom
import ShipRates from "./cart/ShipRates.js";
import VerticalLinearStepper from "./order/VerticalLinearStepper.js";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PayComponent from "./PayComponent.js";

const stripePromise = loadStripe('pk_test_51OVOQtFhFnxnoDMRquya5UT74vYR3BcJFVk79wFhtcXg3hgvyM44n9papYedTEXyoIqqYZWFKBGkfxTampbb7sG400RmgjkKoR');

function createData(id, date, number, price, status, products, shipping_rate) {
  return { id, date, number, price, status, products, shipping_rate};
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'quantity', numeric: true, disablePadding: false, label: 'Number Of Products' },
  { id: 't_price', numeric: true, disablePadding: false, label: 'Total Price' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Order
        </Typography>
      )}

      {numSelected > 0 ? (
        <div style={{display: 'flex'}}>
          <Tooltip title="Cancel">
            <IconButton aria-label="cancel" onClick={props.handleCancel}>
              <CancelIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={props.handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


const useStyles = makeStyles(theme => {
  return {
    ...styles,
    ...basicStyles,
    ...modalStyle,
    fabButton: {
      marginTop: '20px',
      position: 'fixed',
      bottom: theme.spacing(2),
      borderRadius: theme.spacing(2),  // Adjust the border radius as needed
      paddingLeft: theme.spacing(2),   // Adjust the padding as needed
      paddingRight: theme.spacing(2),  // Adjust the padding as needed
      position: 'relative',
      overflow: 'hidden',
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: 0,
        width: '50%',
        height: '100%',
        borderTopRightRadius: theme.spacing(2),  // Adjust the border radius as needed
        borderBottomRightRadius: theme.spacing(2),  // Adjust the border radius as needed
        background: theme.palette.primary.main,
        zIndex: -1,
      },
      '&:after': {
        right: 0,
        left: 'auto',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: theme.spacing(2),  // Adjust the border radius as needed
        borderBottomLeftRadius: theme.spacing(2),  // Adjust the border radius as needed
      },
    },
    slideCard: {
      backgroundColor: "#F5F5F5",
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    greyBackground: {
      backgroundColor: "#EEE"
    },
    cardPadding: {
      padding: "20px"
    },
    cardPaddingNoTop: {
      paddingBottom: "20px",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    cardSubTitle: {
      opacity:"0.5",
      fontSize: "13px"
    },
    cursor: {
      cursor: "pointer"
    },
    reportPost: {
      width: "146px",
      height: "49px",
      borderRadius: "18px",
      background: "#FFF",
      boxShadow: "0px 6px 16.6px 0px rgba(0, 0, 0, 0.25)",
    },
    textCenter: {
      textAlign: 'center'
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
    outlinedStyle: {
      '& .MuiOutlinedInput-input' : {
        padding: '9px'
      }
    },
  }
});


export default function Order (props) {
  //snackbar
  const snackbar = useSnackbar();
  //redux
  const dispatch = useDispatch();
  const redux_token = useSelector((state) => state.authentication.token);
  const redux_email = useSelector((state) => state.authentication.email);
  const redux_fullname = useSelector((state) => state.authentication.fullname);
  //other
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [displayType, setDisplayType] = useState("All");
  const [rows, setRows] = useState([]);
  const [showOrder, setShowOrder] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [isInCompletionProgress, setIsInCompletionProgress] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [total, setTotal] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const getStatus = (order) => {
    if (order.paid === false)
      return "UNPAID";
    if (order.accepted === true)
      return "ACCEPTED";
    if (order.paid === true)
      return "PAID";
    return "UNKNOWN";
  }

  //component mount
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/shop/orders`, {headers: {token:redux_token}}) //, {headers: {token:redux_token}}
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
        const dummy_rows = response.data.data;
        const result_rows = [];
        dummy_rows.forEach(row => {
          result_rows.push(createData(row._id, row.createdAt, row.products.length, row.price.toFixed(2), getStatus(row), row.products, row.shipping_rate));
        });
        setRows(result_rows);
      });
  }, []);


  const handleCancel = () => {
    
  }

  const handleDelete = () => {
    const dummy_selected = selected.map(item => item.split('*')[0]);
    const dummy_rows = rows;
    dummy_rows = dummy_rows.filter(row => {
      const flag = dummy_selected.includes(row.image);
      return !flag;
    });
    setRows(dummy_rows);
    setSelected([]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleShowOrder = (row) => {
    setShowOrder(true);
    setSelectedOrder(row);
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelect = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDisplayByType = (type) => {
    setDisplayType(type);
    axios
      .get(`${BACKEND_URL}/shop/orders`, {headers: {token:redux_token}}) //, {headers: {token:redux_token}}
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
        const dummy_rows = response.data.data;
        const result_rows = [];
        dummy_rows.forEach(row => {
          if(type === "Unpaid" && row.paid === true)
            return ;
          if(type === "Paid" && row.paid === false)
            return ;
          if(type === "Accepted" && row.accepted === false)
            return ;  
          result_rows.push(createData(row._id, row.createdAt, row.products.length, row.price.toFixed(2), getStatus(row), row.products, row.shipping_rate));
        });
        setRows(result_rows);
      });
  }

  const refreshTotal = () => {
    axios
      .get(`${BACKEND_URL}/shop/orders/${selectedOrder.id}`, {headers: {token:redux_token}}) //, {headers: {token:redux_token}}
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
        

        const data = response.data.data;
        
        const products_price = data.products.reduce((sum, value) => {
          if(value.product && value.product.price)
            return sum + value.product.price*value.count;
        }, 0);
        let shipping_price = data.shipping_rate.amount;
        let result_price = products_price * 1.0 + shipping_price * 1.0;
        setTotal(result_price.toFixed(2));
      });
  }

  const handleOrderComplete = () => {
    setShowOrder(false);
    setIsInCompletionProgress(true);
    refreshTotal();
  }

  const handleCurrentStepChange = (step) => {
    if (step === 1) {
      axios.post(`${BACKEND_URL}/test/create-payment-intent`,{amount: total*100} , {headers: {token:redux_token}})
      .then(response=>{
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
        setClientSecret(response.data.clientSecret)
      })
    }
    setCurrentStep(step);
  }

  const handlePay = (result) => {
    axios
      .post(`${BACKEND_URL}/shop/orders/purchase`, {
        result,
        order: selectedOrder.id
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
        Router.push("/dummy-success");
      });
  }

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


  return (
    <div>
      <ElevateAppBar />
      <div className={classNames(classes.mainRaised, classes.greyBackground)}>
        <div className={classes.sections}>
          <Container maxWidth={false} style={{ maxWidth: "80%", paddingTop: "30px" }} >
            <GridContainer direction="row" alignItems="center" style={{paddingLeft: '15px'}}>
              <KeyboardBackspaceOutlinedIcon  onClick={() => {Router.push("/products")}} className={classes.cursor} />
              <h5 onClick={() => {Router.push("/products")}} className={classes.cursor} >&nbsp;Back</h5>
            </GridContainer>
              {isInCompletionProgress ? (
                <GridContainer>
                  <GridItem xs={9} sm={9} md={9} lg={9}>
                    <Card style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                      <GridContainer>
                        <GridItem  xs={1} sm={1} md={1} lg={1}></GridItem>
                        <GridItem  xs={10} sm={10} md={10} lg={10}>
                          {currentStep === 0 ? (
                            <ShipRates id={selectedOrder.id} refreshTotal={refreshTotal}  />
                          ) : (
                            <GridContainer>
                              <GridItem>
                                {clientSecret && (
                                  <Elements
                                    stripe={stripePromise}
                                    options={{ clientSecret: clientSecret }}
                                  >
                                    <PayComponent
                                      handlePay={handlePay}
                                    />
                                  </Elements>
                                )}
                              </GridItem>
                            </GridContainer>
                          )}
                        </GridItem>
                        <GridItem  xs={1} sm={1} md={1} lg={1}></GridItem>
                      </GridContainer>
                    </Card>
                  </GridItem>
                  <GridItem xs={3} sm={3} md={3} lg={3}>
                    <Card className={classes.cardPaddingNoTop} style={{minHeight: '233px'}}>
                      <VerticalLinearStepper handleCurrentStepChange={handleCurrentStepChange} />
                      <GridContainer justify="center">
                        <h3 className={classes.title} style={{ color: "#2E3192" }}>
                          Total :
                        </h3>
                        <h3 className={classes.title} style={{ color: "#2E3192" }}>
                          &nbsp;${total}
                        </h3>
                      </GridContainer>
                      
                    </Card>
                  </GridItem>
                </GridContainer>
              ) : (
                <GridContainer>
                  <GridItem sm={3}>
                    <Card style={{ padding: '20px' }}>
                    <Button color="primary" variant={displayType === "All" ? "contained" : 'text'} className={classes.fabButton} onClick={() => {handleDisplayByType("All")}}>
                      <p style={{fontFamily: '', fontSize: '12px'}}>All</p>
                    </Button>
                    <Button color="primary" variant={displayType === "Unpaid" ? "contained" : 'text'} className={classes.fabButton} onClick={() => {handleDisplayByType("Unpaid")}}>
                      <p style={{fontFamily: '', fontSize: '12px'}}>Unpaid</p>
                    </Button>
                    <Button color="primary" variant={displayType === "Paid" ? "contained" : 'text'} className={classes.fabButton} onClick={() => {handleDisplayByType("Paid")}}>
                      <p style={{fontFamily: '', fontSize: '12px'}}>Paid</p>
                    </Button>
                    <Button color="primary" variant={displayType === "Accepted" ? "contained" : 'text'} className={classes.fabButton} onClick={() => {handleDisplayByType("Accepted")}}>
                      <p style={{fontFamily: '', fontSize: '12px'}}>Accepted</p>
                    </Button>
                    </Card>
                  </GridItem>
                  <GridItem sm={9}>
                    <Card>
                      <div className={classes.root}>
                        <Paper className={classes.paper}>
                          <EnhancedTableToolbar handleCancel={handleCancel} handleDelete={handleDelete} numSelected={selected.length} />
                          <TableContainer>
                            <Table
                              className={classes.table}
                              aria-labelledby="tableTitle"
                              size={dense ? 'small' : 'medium'}
                              aria-label="enhanced table"
                            >
                              <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                              />
                              <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                  .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                      <TableRow
                                        hover
                                        onClick={(event) => {handleShowOrder(row)}}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        className={classes.cursor}
                                      >
                                        <TableCell padding="checkbox">
                                          <Checkbox
                                            onClick={(event) => {event.stopPropagation();handleSelect(event, row.id)}}
                                            checked={isItemSelected}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                          />
                                        </TableCell>
                                        <TableCell align="left">{new Date(row.date).toLocaleString()}</TableCell>
                                        <TableCell align="left">{row.number}</TableCell>
                                        <TableCell align="left">${row.price}</TableCell>
                                        <TableCell align="left"><Badge color="warning" size="medium"><p style={{fontSize: '12px', margin: '0px'}}>{row.status}</p></Badge></TableCell>
                                      </TableRow>
                                    );
                                  })}
                                {emptyRows > 0 && (
                                  <TableRow style={{ height: (dense ? 33 : 53) * (emptyRows === rowsPerPage ? 5 : emptyRows) }}>
                                    <TableCell colSpan={6} />
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                          />
                        </Paper>
                      </div>
                      </Card>
                  </GridItem>
                </GridContainer>
              )}

            {/* Footer start */}
            <GridContainer justify="space-between" style={{ marginTop: "100px" }}>
              <GridItem sm={6}>
                <img src="/img/CoDS_Black_Logo.png"></img>
                <p>Lorem ipsum dolor sit amet consectetur adipising elit aliquam</p>
                <GridContainer style={{ color: "#2E3192", width: "50%" }} justify="space-between">
                  <GridItem>
                    <IconButton color="primary" ><TwitterIcon /></IconButton>
                    <IconButton color="primary" ><InstagramIcon /></IconButton>
                    <IconButton color="primary" ><FacebookIcon /></IconButton>
                    <IconButton color="primary" ><LinkedInIcon /></IconButton>
                    <IconButton color="primary" ><YouTubeIcon /></IconButton>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem sm={2}>
                <h4 className={classes.title} style={{ color: "#170F49" }}>Product</h4>
                <p><Link href="/" >Features</Link></p>
                <p><Link href="/" >Pricing</Link></p>
                <p><Link href="/" >Case studies</Link></p>
                <p><Link href="/" >Reviews</Link></p>
                <p><Link href="/" >Updates</Link></p>
              </GridItem>
              <GridItem sm={2}>
                <h4 className={classes.title} style={{ color: "#170F49" }}>Company</h4>
                <p><Link href="/" >About</Link></p>
                <p><Link href="/" >Contact Us</Link></p>
                <p><Link href="/" >Careers</Link></p>
                <p><Link href="/" >Culture</Link></p>
                <p><Link href="/" >Blog</Link></p>
              </GridItem>

              <GridItem sm={2}>
                <h4 className={classes.title} style={{ color: "#170F49" }}>Support</h4>
                <p><Link href="/" >Getting Started</Link></p>
                <p><Link href="/" >Helper center</Link></p>
                <p><Link href="/" >Server status</Link></p>
                <p><Link href="/" >Report a bug</Link></p>
                <p><Link href="/" >Chat support</Link></p>
              </GridItem>
            </GridContainer>
            {/* Footer end */}
          </Container>
        </div>
      </div>
      <Grid container>
        <Grid item xs={4} style={{display:"flex",justifyContent:'center'}}>
          <Typography>Copyright © 2023 CODS</Typography>
        </Grid>
        <Grid item xs={7} >
          <p style={{float:"right"}} ><Link href="/" >All Rights Reserved</Link> | <Link href="/" >Terms Condition</Link> | <Link href="/" >Privacy Policy</Link></p>
        </Grid>
        <Grid item xs={1} ></Grid>
      </Grid>





      {/* dialog start */}
      <Dialog
        open={showOrder?true:false}
        onClose={e=>setShowOrder(null)}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <GridContainer justify="space-between">
            <p style={{fontSize: '20px'}}>Order Detail</p>
            {
              selectedOrder.status === "UNPAID" && (
                <Button variant="outlined" color="primary" onClick={handleOrderComplete}>Complete Order</Button>
              )
            }
          </GridContainer>
        </DialogTitle>
        <DialogContent style={{marginBottom: '32px'}}>
          {showOrder&&(
            <>
              <List>
                {selectedOrder.products && selectedOrder.products.map((oneProduct,index)=>{
                  return oneProduct.product&&(
                    <ListItem key={index} >
                      <ListItemAvatar>
                        <img style={{width:"10vh"}} src={oneProduct.product.image_url?oneProduct.product.image_url:`${BACKEND_URL}/shop/products/${oneProduct.product._id}/image`} />
                      </ListItemAvatar>
                      <ListItemText style={{marginLeft: '20px'}} primary={oneProduct.product.title+" X "+oneProduct.count} secondary={
                        oneProduct.product.price.toFixed(2)+" X "+oneProduct.count+" = "+((Number(oneProduct.product.price)*Number(oneProduct.count)).toFixed(2)+" USD $")
                        } >
                      </ListItemText>
                    </ListItem>
                  )
                })}
                <Divider/>
                {selectedOrder.shipping_rate&&(
                  <ListItem  >
                    <ListItemAvatar>
                      <img style={{width:"10vh"}} src={selectedOrder.shipping_rate.provider_image_75} />
                    </ListItemAvatar>
                    <ListItemText style={{marginLeft:'20px'}} primary={`${selectedOrder.shipping_rate.provider} : ${selectedOrder.shipping_rate.servicelevel.display_name}`} secondary={
                      Number(selectedOrder.shipping_rate.amount).toFixed(2)+" USD $"
                      } >
                    </ListItemText>
                  </ListItem>
                )}
              </List>
            </>
          )}
        </DialogContent>
      </Dialog>
      {/* dialog end */}
    </div>
  );
}
