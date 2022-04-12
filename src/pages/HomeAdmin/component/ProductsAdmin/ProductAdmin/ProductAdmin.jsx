import React, {useState} from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, Button, useTheme} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import axios from '../../../../../utils/axios'


function ProductAdmin({product, deletedProducts}) {
  const [stock, setStock] = useState([])
  

  const id = {id: product.id}
 
  const deleteProduct = () => {
    axios
    .put("/products", id)
    .then((res) => {
      alert(res.data.message);
      window.location.reload(); 
     })
     .catch((error) => console.log({ error }));
  }

  const undeleteProduct = () => {
    console.log(id)
    axios
    .put("/products/undelete", id)
    .then((res) => {
      alert(res.data.message);
      window.location.reload(); 
     })
     .catch((error) => console.log({ error }));
  }


  return (
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia component="img"  height="140" image={product.productIMG} alt="product Image"/>
          <CardContent>
            <Typography variant="body2">
                  Rp.{product.price}
            </Typography>
            <Typography component={Link} to={`/products/${product.id}`} variant="subtitle2" gutterBottom>
                {product.productName}
            </Typography>
        </CardContent>
        <CardActions >
          <Button component={Link} to={`/editproducts/${product.id}`} size="small">Edit</Button>
            {deletedProducts === false ? 
          <Button onClick={deleteProduct} size="small">Delete</Button> :
          <Button onClick={undeleteProduct} size="small">Un-Delete</Button> }
        </CardActions>
    </Card>
  )
}

export default ProductAdmin