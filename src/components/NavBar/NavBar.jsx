import { AppBar, Badge, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import {Link,useLocation,useNavigate} from "react-router-dom";
import React, { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';

import logo from "../../assets/images/logo.jpeg";
import useStyles from "./styles";
import decode from "jwt-decode";
import { LoginOutlined } from '@mui/icons-material';



const NavBar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logOut = () =>{
        dispatch({type:'LOGOUT'});
        
        navigate('/');

        setUser(null);
    }

    useEffect(()=>{
        
        const token = user?.token;

        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()){
                logOut();
            }
        }
        
        setUser(JSON.parse(localStorage.getItem('profile')))

    },[location]);

    return (
        <div>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to="./" exact variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt='logo' height="25px" className={classes.image} />
                        E-store
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname==="/"&&(
                        
                        user && <div className={classes.button}>
                            <IconButton component={Link} to="cart" exact aria-label='Show cart items' color="inherit">
                             <Badge badgeContent={totalItems} color='secondary'>
                                  <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                    {
                        user?(
                            
                            <div className={classes.rightnav}>
                                <Typography className={classes.userName} variant='title'><b>{user.result.name}</b> </Typography>
                                <Button className={classes.logout} variant='outlined' color="secondary" onClick={logOut}> Logout <LoginOutlined color='primary'></LoginOutlined>  </Button>
                            </div>
                        ):(<Button color="grey" component={Link} to="./auth" exact variant="outlined" > <b>Sign in / Sign up</b>  </Button>)
                    }

                    
                </Toolbar>
            </AppBar>
        </div>
        
    )
};

export default NavBar;
