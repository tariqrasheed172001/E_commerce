import { Grid, IconButton,InputAdornment, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React from 'react'

const Input = ({half,name,label,type,handleChange,handleShowpassword,autoFocus}) => {
  return (
    <Grid item xs={12} sm={half?6:12} >
        <TextField
            name={name}
            onChange={handleChange}
            label={label}
            variant="outlined"
            required
            fitContent
            autoFocus={autoFocus}
            type={type}
            fullWidth
            InputProps={name === 'password' && {
                endAdornment:(
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowpassword}>
                            {type === 'password'?<Visibility/>:<VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    </Grid>
  )
}

export default Input;