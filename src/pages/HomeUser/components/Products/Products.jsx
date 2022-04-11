import React from 'react'
import { Grid, Box} from '@material-ui/core';
import Pagination from "@material-ui/lab/Pagination";
import Product from './Product/Product'
import useStyles from './styles'

function Products(props) {
  const classes = useStyles();
  const { 
    // paginationState, 
    products, page, setPage, totalPage } = props;
  // const { page, itemsPerPage } = paginationState;


  const renderProducts = () => {
    // const startIndex = (page - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    const slicedProducts = products
    // .slice(startIndex, endIndex);

    return slicedProducts.map((product) => (
      <Grid item key={product.id} xs= {3} >
        <Product product={product}/>
      </Grid>
    ));
  };


  return (
    <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Grid container justifyContent="center" spacing ={2}>
          {renderProducts()}
        </Grid>
        <Box py={3} display="flex" justifyContent="center">
          <Pagination
            count={totalPage}
            color="primary"
            page={page}
            variant="outlined"
            onChange={(e, value) => setPage(value)}
          />
        </Box>
    </main>
  )
}

export default Products