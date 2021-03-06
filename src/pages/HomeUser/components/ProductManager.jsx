import React, { useEffect, useState } from "react";
import axios from '../../../utils/axios'
import { InputLabel, Select, Box, MenuItem, FormControl, InputBase, IconButton,  Grid, Divider, Card,Typography, Button, CardActions, TextField, Container, Paper, CardContent} from '@material-ui/core';
import {SearchOutlined} from '@material-ui/icons'

import useStyles from './styles';


function ProductManager(props) {
    const classes = useStyles();
    const { category, setSelectedCategory, setPage, setSort , setKeyword } = props;
    

    
      
   
      const handleSelectedCategory = (e) => {
        setSelectedCategory({[e.target.name]: e.target.value});
        setPage(1)
      }

    const handleChange = (e) => {
        setKeyword(`and productName like '%${e.target.value}%'`);
        setPage(1)
      };

    

    const selectSortHandler = (e) => {
        setSort(e.target.value);
      };

   

     
  return (
    
    <Container>
      <div className={classes.toolbar}/>
        {/* Filter */}
      <Paper variant="outlined" >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div" >
                Filter Products
            </Typography>
              <Grid container spacing={1}>
                <Grid item xs={9}>
                <InputBase     
                  placeholder="Search Pharmacy"
                  name="keyword"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleChange}
                />
                </Grid>
                <Grid item xs={3}>
                  <IconButton sx={{ p: '10px' }}>
                    <SearchOutlined />
                  </IconButton>
                </Grid>
              </Grid>
            <br />
            <FormControl sx={{ m: 1, minWidth: 420 }}>
                <InputLabel id="category-select">Category</InputLabel>
                  <Select
                    displayEmpty
                    labelId="category-select"
                    id="1"
                    defaultValue=""
                    name="category_id"
                    label="Age"
                    onChange={handleSelectedCategory}
                  >
                    <MenuItem key={1} value="">
                      Category
                    </MenuItem>
                    {category.map((category) => (
                    <MenuItem key={category.id}  value={category.id}>
                      {category.categoryName}
                    </MenuItem>
                    ))}
                  </Select>
              </FormControl>
          </CardContent>
          
        </Card>
        <Divider light />
        {/* Sort */}
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div" >
              Sort Products
            </Typography>
            <FormControl sx={{ m: 3, minWidth: 200 }}>
              <InputLabel id="sort-by" >Sort By</InputLabel>
                  <Select
                    displayEmpty
                    labelId="sort-by"
                    id="1"
                    defaultValue=""
                    name="sortBy"
                    onChange={selectSortHandler}
                  >
                    <MenuItem value="" > Sort By </MenuItem>
                    <MenuItem value="order by price ASC" > Lowest Price </MenuItem>
                    <MenuItem value="order by price DESC" > Highest Price </MenuItem>
                    <MenuItem value="order by productName ASC" > A - Z </MenuItem>
                    <MenuItem value="order by productName DESC" > Z - A</MenuItem>
              </Select>   
            </FormControl>
          </CardContent>
        </Card>
      </Paper>
    </Container>
    );
}

export default ProductManager