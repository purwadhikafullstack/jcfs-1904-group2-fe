import React from 'react'
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form'

function CustomTextField({name, label, handleChange}) {
    const { control } = useFormContext();

  return (
    <Grid item  xs={12} sm={6} >
        <Controller
            control={control}
            name={name}
            render = {({field}) => (
                <TextField
                fullWidth
                label={label}
                onChange={handleChange}
                />
            )}    
        />
    </Grid>
  )
}

export default CustomTextField