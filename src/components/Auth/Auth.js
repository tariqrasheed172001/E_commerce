import { Button, Container, Grid, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import useStyles from "./styles";
import { LockClockOutlined,LoginOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Input from './Input.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup,signin } from '../../actions/auth.js';
import GoogleLogin from 'react-google-login';
import  Icon  from './Icon.js';


const Auth = () => {
    const classes = useStyles();
    const [isSignUp,setSignUp] = useState(true);
    const [showPassword,setShowPassword] = useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem("profile"));
    const [formData,setFormData] = useState({
        firstname : '',
        lastname : '',
        email : '',
        password : '',
        confirmPassword : '',
    });

    
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        if (isSignUp) {
            dispatch(signup(formData,navigate));
        } else {
            dispatch(signin(formData,navigate));
            
        }
        
    }

    const handleChange = (event) =>{
        setFormData({ ...formData, [event.target.name]: event.target.value});
    }

    const handleShowPassword = () =>{
        setShowPassword((prevShowPasswpord) => !prevShowPasswpord);
    }

    const SwitchMode = () =>{
        setSignUp((prevSignUp) => !prevSignUp);
        handleShowPassword(false);
    }

    const googleSuccess = async (res) =>{
        const result = res?.profileObj; // cannot get property profileObj of undefined
        const token = res?.tokenId;

        try {
            dispatch({type:'AUTH', data:{result,token}});

            navigate('/');

        } catch (error) {
            console.log(error);
        }
        
    }

    const googleFailure = (error) =>{
        console.log(error);
        console.log('Google sign In was unsuccessful. Try again later');
    }

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
              
        <Paper className={classes.Paper} elevation={3}>
            <div className={classes.head}>
                    {isSignUp?(
                        <LockClockOutlined color='secondary' ></LockClockOutlined>):
                        (
                            <LoginOutlined color="secondary" ></LoginOutlined>
                        )}
                <Typography variant='h5' gutterBottom>{isSignUp?'Sign up':'Sign in'}</Typography>
            </div>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid Container spacing={1} >
                    {isSignUp && (
                        <>
                            <Input name='firstname'  label="First Name" autoFocus  handleChange={handleChange} fullWidth  ></Input>
                            <Input name='lastname' label="last Name"  handleChange={handleChange} fullWidth ></Input>
                        </>
                    )}
                    <Input name='email' label="Email" type="email" handleChange={handleChange} fullWidth ></Input>
                    <Input name='password' label="Password" type={showPassword?'text':'password'} handleChange={handleChange} handleShowpassword={handleShowPassword} fullWidth ></Input> 
                    {isSignUp && <Input name='confirmPassword' label="Repeat Password" type='password' handleChange={handleChange} fullWidth ></Input>  }
                </Grid>
                <Button type='submit'  variant='contained' color="primary" className={classes.submit}  >
                    {isSignUp?'Sign up':'Sign in'}
                </Button>


              

                <GoogleLogin 
                    clientId='388455900872-ujvedk4heqv02d1ervudc47mq9bu267k.apps.googleusercontent.com'
                    render={(renderProps) => (
                        <Button 
                              className={classes.googleButton}
                              color='primary'
                              fullwidth 
                              onClick={renderProps.onClick} 
                              display={renderProps.disabled}
                              startIcon = {<Icon />}  
                              variant='contained'>
                            Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy='single_host_origin'
                 />
                

                <Grid container >
                        <Grid item>
                            <Button onClick={SwitchMode} className={classes.already} >
                                {isSignUp?'Already have an account? sign in':"Don't have an account? sign up"}
                            </Button>
                        </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth;