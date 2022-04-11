import React from 'react'
import { Paper, Typography, Button} from '@material-ui/core'
import useStyles from './styles'
import AddProduct from './AddProduct/AddProduct'
import ProductsAdmin from './ProductsAdmin/ProductsAdmin'
import ProductManager from './ProductManager'


function EditProducts(props) {
    const { 
      // paginationState, 
      // setPaginationState,
      products,
      sortProducts,filterProducts,deletedProducts, setDeletedProducts, setSelectedCategory } = props;
    const classes = useStyles();
  return (
    <>
      <div className={classes.toolbar}/>
        <AddProduct/>
      <Typography variant="h4" align="center"> Edit Product </Typography>
      <ProductManager
        filterProducts={filterProducts}
        // paginationState={paginationState}
        // setPaginationState={setPaginationState}
        sortProducts={sortProducts}
        deletedProducts={deletedProducts}
        setDeletedProducts={setDeletedProducts}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductsAdmin
        products={products}
        // paginationState={paginationState}
        deletedProducts={deletedProducts}
      />  
    </>
  )
}

export default EditProducts