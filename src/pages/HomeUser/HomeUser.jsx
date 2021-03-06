import React, { useState, useEffect } from "react";
import axios from '../../utils/axios'
import { Grid, Box, Container, Typography } from "@material-ui/core";
import Products from './components/Products/Products'
import ProductManager from './components/ProductManager'
import Spinner from './Spinner'
import { ClassNames } from "@emotion/react";
import useStyles from './styles.js'

function HomeUser() {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [ page, setPage ] = useState(1)
    const [ productPerPage, setProductPerPage] = useState(12)
    const [category, setCategory] = useState([{categoryName: "Default"}]);
    const [selectedCategory, setSelectedCategory] = useState ({})
    const [totalPage, setTotalPage] = useState(1)
    const [ sort, setSort ] = useState('')
    const [ keyword, setKeyword] = useState('')
    const [checked, setChecked] = useState(false)
    const fetchCategories = async () => {
      try {
          const res = await axios.get("/categories");
          const  categories = res
          const category = categories.data
          setCategory(category)
      } catch (error) {
          console.log(alert(error.message));
      }
  };


  useEffect(() => {
    fetchCategories();
  }, []);
  

    const fetchProducts = async () => {
        try {
            const res = await axios.get("/products", {params: { pages:(`limit ${productPerPage} offset ${(page - 1)*productPerPage}`), keyword, sort, category: selectedCategory.category_id}})
            .then((res=>{
              const { data } = res;
            setProducts(data.result);
            setTotalPage(Math.ceil(data.count[0].count / productPerPage ))
            setChecked(true)
            }));
        } catch (error) {
            console.log(alert(error.message));
        }
    };


    useEffect(() => {
      setChecked(false)
      
        fetchProducts();
      }, [selectedCategory, page, sort, keyword]);


  
  
  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <ProductManager
              setPage={setPage}
              setKeyword={setKeyword}
              category={category}
              setCategory={setCategory}
              setSelectedCategory={setSelectedCategory}
              setSort={setSort}
            />
          </Grid>
          <Grid item xs={9}>
            <Products 
              classNames={classes.product}
              products={products}
              setPage={setPage}
              page={page}
              setProductPerPage={setProductPerPage}
              totalPage={totalPage}
              checked={checked}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
      
        
  )
}

export default HomeUser