import { Button, CircularProgress, CssBaseline, Divider, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {Link,useNavigate} from "react-router-dom";
import useStyles from "./styles";
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import { commerce } from '../../../lib/commerce';

const steps = ["shipping address","Payment details"];

const Checkout = ({cart,order,onCaptureCheckout,error}) => {
  const [activeStep,setActiveStep] = useState(0);
  const [checkoutToken,setCheckoutToken] = useState(null);
  const [shippingData,setShippingData] = useState({});
  const [isFinished,setISFinished] = useState(false);

  const classes = useStyles();
  const history = useNavigate();

  useEffect(()=>{
    const generateToken = async ()=>{
      try {
        const token = await commerce.checkout.generateToken(cart.id,{type:'cart'});   
        setCheckoutToken(token);
      } catch (error) {
        history('/');
      }
    }
    generateToken();
  },[cart])

  const nextStep = ()=> setActiveStep((prevActiveStep)=> prevActiveStep+1);
  const backStep = ()=> setActiveStep((prevActiveStep)=> prevActiveStep-1);

  const next = (data)=>{
    setShippingData(data);
    nextStep();
  }

  const timeout = () =>{
    setTimeout(()=>{
      setISFinished(true);
    },5000)
  }

  let Confirmation = () => order.customer ? (
    <>
      <div>
        <Typography variant='h5'>Thank you for purchase,{order.customer.firstname} {order.customer.lastname}</Typography>
        <Divider className={classes.divider} />
        <Typography variant='subtitle2'>Order ref:{order.customer_refrence}</Typography>
      </div>
      <br />
      <Button component={Link} to="/" variant='outlined' type="button">Back to Home</Button>
    </>
  ): isFinished ? (
    <>
      <div>
        <Typography variant='h5'>Thank you for purchase</Typography>
        <Divider className={classes.divider} />
      </div>
      <br />
      <Button component={Link} to="/" variant='outlined' type="button">Back to Home</Button>
    </>
  ):(
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );

  if(error){
    <>
      <Typography variant="h4">Error:{error}</Typography>
      <br />
      <Button component={Link} to="/" variant='outlined' type="button">Back to Home</Button>
    </>
  }

  const Form = ()=> activeStep === 0
    ?<AddressForm checkoutToken={checkoutToken} next={next} />
    :<PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} timeout={timeout}/>
  

  return (
    <>
      <CssBaseline />
      <div>
          <div className={classes.toolbar} />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography variant='h4' align='center' >Checkout</Typography>
              <Stepper activeStep={activeStep} className={classes.stepper} >
                  {steps.map((step)=>(
                    <Step key={step} >
                      <StepLabel>{step}</StepLabel>
                    </Step>
                  ))}
              </Stepper>
              {activeStep === steps.length? <Confirmation />: checkoutToken && <Form />}
            </Paper>
          </main>
        </div>
    </>
    )
};

export default Checkout;
        