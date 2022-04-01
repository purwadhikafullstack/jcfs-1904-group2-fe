import React from 'react'
import { Paper, Typography, Button} from '@material-ui/core'
import useStyles from './styles'
import AddProduct from './AddProduct/AddProduct'

import Products from '../../HomeUser/components/Products/Products'


function EditProduct(props) {
    const { paginationState, products } = props;
    const classes = useStyles();
  return (
    <>
        <div className={classes.toolbar}/>
          <main className={classes.layout}>
              <AddProduct/>
          </main>
        <Typography variant="h4" align="center"> Edit Product </Typography>
        <Products
          products={products}
          paginationState={paginationState}
        />
    </>
  )
}

export default EditProduct