import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import Button from "/components/CustomButtons/Button.js";
import { useSnackbar } from "notistack";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function CheckoutForm(props) {
  const snackbar = useSnackbar();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
            console.log(paymentIntent)
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('***');
    // alert(1);

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(props.email === "")
      return snackbar.enqueueSnackbar("Enter email please", { variant: "error" });
    if(!emailRegex.test(props.email))
      return snackbar.enqueueSnackbar("Enter valid email please", { variant: "error" });
    if (props.phone.match(/12345/)) {
      return snackbar.enqueueSnackbar("Enter valid phone number please", { variant: "error" });
    } else if (props.phone.match(/1234/)) {
      return snackbar.enqueueSnackbar("Enter valid phone number please", { variant: "error" });
    }
    if(props.date == '' || props.date == undefined)
      return snackbar.enqueueSnackbar("Enter shipping date please", { variant: "error" });
    if(props.location == '')
      return snackbar.enqueueSnackbar("Enter shipping address please", { variant: "error" });
      

    setIsLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      // confirmParams: {
      //   // Make sure to change this to your payment completion page
      //   return_url: "http://localhost:3000",
      // },
      redirect:"if_required"
    }); 

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if(result.hasOwnProperty('error')) {
      const { error } = result;
      if (error.type === "card_error" || error.type === "validation_error") {
        snackbar.enqueueSnackbar(error.message, { variant: "error" });
      } else {
        snackbar.enqueueSnackbar("An unexpected error occurred.", { variant: "error" });
      }
    } else {
      snackbar.enqueueSnackbar("Purchase Success", { variant: "success" });
      props.handlePurchase(result);
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
        <Button type="submit" style={{marginTop: '40px'}} round color="primary" onClick={() => {}} fullWidth disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <CircularProgress size={24} /> : "Pay now"}
          </span>
        </Button>
    </form>
  );
}