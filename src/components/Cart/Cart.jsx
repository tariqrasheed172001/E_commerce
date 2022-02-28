import { Button, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import {Link} from "react-router-dom";
import CartItem from './CartItem/CartItem';
import useStyles from "./styles";

const Cart = ({cart,handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart}) => {
    const classes = useStyles();

    const EmptyCart = ()=>(
        <Typography variant='subtitle1'>You have no items in your shopping cart,
            <Link to="/" exact  className={classes.link}>start adding some!</Link>
        </Typography>   
    )
    const FilledCart=()=>(
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cartDetails} >
                <Typography variant='h4'>Subtotal:{cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size='large' type='button' variant='contained' color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button component={Link} to="/checkout" exact className={classes.checkoutbutton} size='large' type='button' variant='contained' color="primary">Checkout</Button>
                </div>
            </div>
        </>
    )
  
  return (
        <div>
            <Container>
                <div className={classes.toolbar}></div>
                <Typography className={classes.title} variant="h3" gutterBottom>Your ShoppingCart</Typography>
                {!cart.total_items?<EmptyCart />:<FilledCart />}
            </Container>
        </div>
    );
};

export default Cart;
