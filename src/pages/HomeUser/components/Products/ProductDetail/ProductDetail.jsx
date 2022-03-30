import React, { useState, useEffect } from "react";
import {Card, Paper, CardMedia, Button, CardContent, CardActions, Typography, IconButton,} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons'
import axios from '../../../../../utils/axios'
import { useParams } from "react-router-dom";


import useStyles from './styles';

function ProductDetail() {
  const classes= useStyles();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [ stocks, setStocks] = useState({})
  const [ stock, setStock] = useState(5)
 

  useEffect(() => {
    axios
      .get(`/products/${params.productId}`,{ params: { id: params.productId } } )
      .then((res) => {

        setProduct(res.data[0]);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  const fetchStocks = async () => {
    try {
        const res = await axios.get(`/stocks/${params.productId}`,{ params: { id: params.productId } } );
        const { data } = res;
        
       
        setStocks(data[0]);
    } catch (error) {
        console.log(alert(error.message));
    }
};

useEffect (() => {
  fetchStocks();

  
}, []);



useEffect(() => {
  if (product.isLiquid) {
    let result = stocks.qtyBoxAvailable * stocks.qtyBottleAvailable
    console.log(stocks.qtyBoxAvailable * stocks.qtyBottleAvailable);
    console.log(stocks.qtyBoxAvailable * stocks.qtyBottleAvailable);
    setStock(parseInt(result))
    console.log(result);
  } else {

    let result = stocks.qtyBoxAvailable * stocks.qtyStripsavailable
    console.log(stocks.qtyBoxAvailable * stocks.qtyStripsavailable);
    console.log(result);
    setStock(parseInt(result))
    console.log(stocks.qtyBoxAvailable);
  }
},[])

console.log(product.isLiquid);
console.log(stock);

 

  const { category_id, productName, productDetails, productIMG, price } = product
  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
      <Card className={classes.root}>
        <CardMedia className={classes.media} image={product.productIMG} tittle={product.productName}/>
        <CardContent>
            <div className={classes.cardContent}>
                <Typography variant="h6" gutterBottom>
                    {productName}
                </Typography>
                <Typography variant="body2">
                       Rp.{price}
                </Typography>
            </div>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <Typography>{productDetails}</Typography>
        </CardActions>
      </Card>


      <CardActions disableSpacing className={classes.cardActions}>
          {quantity === 0 ? <Button type="button" size="small" > - </Button> : <Button type="button" size="small" onClick={() => setQuantity(quantity - 1)}>-</Button> }
            <Typography>{quantity}</Typography>

          {quantity === stock ? <Button type="button" size="small" >+</Button> : <Button type="button" size="small" onClick={() => setQuantity(quantity + 1)}>+</Button> }
            
            <IconButton aria-label='Add to Cart' >
                <AddShoppingCart/>
            </IconButton>
            
        </CardActions>
    </Paper>

    </main>
    
    
  )
}

export default ProductDetail