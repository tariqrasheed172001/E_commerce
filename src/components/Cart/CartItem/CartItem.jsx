import React from 'react';
import { Button, Card, CardContent, CardMedia, Typography, CardActions } from '@material-ui/core';

import useStyles from "./styles";

const CartItem = ({item,onUpdateCartQty,onRemoveFromCart}) => {
    const classes = useStyles();
    
  return (<div className={classes.card}>
      <Card >
        <CardMedia image={item.image.url} alt="image" className={classes.media} />
        <CardContent className={classes.cardContent} >
            <Typography variant='h4' >{item.name}</Typography>
            <Typography variant='h4' >{item.price.formatted_with_symbol}</Typography>
        </CardContent>
        <CardActions className={classes.cartActions} >
            <div className={classes.buttons} >
                <Button type='button' size='small' onClick={()=> onUpdateCartQty(item.id,item.quantity-1)}>-</Button>
                <Typography>{item.quantity}</Typography>
                <Button type='button' size='small' onClick={()=> onUpdateCartQty(item.id,item.quantity+1)}>+</Button>
            </div>
            <Button variant='contained' type='button' color="secondary" onClick={()=>onRemoveFromCart(item.id)} >Remove</Button>
        </CardActions>
      </Card>
  </div>);
};

export default CartItem;
