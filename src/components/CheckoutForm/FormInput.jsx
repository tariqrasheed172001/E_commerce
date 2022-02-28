import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

const FormInput = ({name,label,required}) => {
    const { control } = useFormContext();

  return (
      <Grid item xs={12} sm={6}>
        <TextField 
          control={control} 
          defaultValue="" 
          name={name} 
          label={label} 
          required={required} 
        />
      </Grid> 
  );
};

export default FormInput;