import React, {useState, useEffect} from 'react'
import useStyles from './style'
import { Typography,Container, Grid, Card, CardMedia, CardContent,InputBase, TextField, Box, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import { useParams } from "react-router-dom";
import axios from '../../../../../utils/axios'
import moment from 'moment'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers'

function StocksDetail() {
    const classes = useStyles();
    const params = useParams();
    const [product, setProduct] = useState({})
    const [category, setCategory] = useState('')
    const [stocks, setStocks] = useState([])
    const [detailedStocks, setDetailedStocks] = useState([])
    const [log, setLog] = useState([])
    const [sort, setSort] = useState('')
    const [selectedDateFrom, setSelectedDateFrom] = useState( (`2021-04-04`))
    const [selectedDateTo, setSelectedDateTo] = useState( new Date())
    const [detailedData, setDetailedData] = useState([{total_stock_in: 0, total_stock_out:0 }, {total_bought: 0}])
    const [filter, setFilter] = useState('')
    const [image ,setImage] = useState('https://pharmanewsintel.com/images/site/article_headers/_normal/Medicine.png')
    
  console.log(product);

    useEffect(() => {
        if (product.productIMG) {
            setImage(product.productIMG)
        }
    },[])

 

    const selectSortHandler = (e) => {
        setSort(e.target.value);
      };
    const selectFilterHandler = (e) => {
        setFilter(e.target.value)
    }

    const handleDateChangeFrom = (date) => {
        setSelectedDateFrom(date)
    }
    const handleDateChangeTo = (date) => {
        setSelectedDateTo(date)
    }

    const onClickSearch = () => {
        fetchStocks();
    }

   
    const fetchProducts = async () => {
        try {
            const res = await axios.get(`/products/${params.productId}`,{ params: {  id: params.productId } } )
            const {data} = res
            setCategory(data.category[0].categoryName);
            setProduct(data.result[0]);
            
        } catch (err) {
        console.log({ err });       
        }
    }

    const fetchStocks = async () => {
        const setDateFrom = moment(selectedDateFrom).utc().format('YYYY-MM-DD')
        const setDateTo = moment(selectedDateTo).utc().format('YYYY-MM-DD')
        const date = `and created_at between '${setDateFrom}' and '${setDateTo} 23:59:59'`
        try {
            const res = await axios.get(`/stocks/detail/${params.productId}`,{ params: { date, filter, sort, id: params.productId } } );
            const { data } = res;
            if (data.detail[0]) {
                setDetailedData([data.detail[0]])
            }
            setLog(data.data);
            setDetailedStocks(data.result[0]);
            setStocks(data.calculatedStock);
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchStocks();
    },[sort, filter])


    const columns = [
        { id:'id', label: 'Data Id',align: 'right', minWidth: 70},
        { id:'status', label: 'Status',align: 'right', minWidth: 70},
        { id:'stock_in', label: 'Stock In', align: 'right', minWidth: 70},
        { id:'stock_out', label: 'Stock Out', align: 'right', minWidth: 70},
        { id:'username', label: 'Username', align: 'right', minWidth: 70},
        { id:'created_at', label: 'Date', align: 'right', minWidth: 100},
    ]

  return (
    <Container>
        <Paper className={classes.content}>
            <Card className={classes.card}>
            <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Typography>Product Id</Typography>
                                <Typography>Product Name </Typography>
                                <Typography>Product Category </Typography>
                                <Typography>Product Description</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>: {product.id} </Typography>
                                <Typography>: {product.productName}</Typography>
                                <Typography>: {category} </Typography>
                                <Typography>: {product.productDetails}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <CardMedia
                            component="img"
                            height = "200"
                            src={image}
                            alt="product image"
                        />
                    </Grid>
                </Grid>
            </Card>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Card>
                            { product.isLiquid === 0 ? 
                                 <CardContent>
                                 <Typography sx={{ fontSize: 15 }} color="textSecondary" gutterBottom>
                                     Box Available : {detailedStocks.qtyBoxAvailable}
                                 </Typography>
                                 <Typography sx={{ fontSize: 15 }} color="textSecondary" gutterBottom>
                                     Strips Available : {detailedStocks.qtyStripsavailable}
                                 </Typography>
                                 <Typography sx={{ fontSize: 15 }} color="textSecondary" gutterBottom>
                                     Total Strips Available : {stocks.stockNonLiquid}
                                 </Typography>
                                </CardContent>   
                                :
                                 <CardContent>
                                    <Typography sx={{ fontSize: 15 }} color="textSecondary" gutterBottom>
                                     Box Available : {detailedStocks.qtyBoxAvailable}
                                    </Typography>
                                    <Typography sx={{ fontSize: 15 }} color="textSecondary" gutterBottom>
                                     Bottle Available : {detailedStocks.qtyBottleAvailable}
                                    </Typography>
                                    <Typography sx={{ fontSize: 15 }} color="textSecondary" gutterBottom>
                                     Total Bottle Available : {stocks.stockLiquid}
                                    </Typography>
                                </CardContent> 
                        }
                           
                        </Card>  
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            { product.isLiquid === 0 ? 
                            <CardContent>
                                <Typography sx={{ fontSize: 15 }} color="textSecondary" gutterBottom>
                                 Total Stock In :  {detailedData[0].total_stock_in ? detailedData[0].total_stock_in : 0} Strips
                                </Typography>
                                <Typography sx={{ fontSize: 15 }} color="textSecondary" gutterBottom>
                                 Total Stock Out : {detailedData[0].total_stock_out ? detailedData[0].total_stock_out : 0 } Strips
                                </Typography>
                            </CardContent>
                            : 
                            <CardContent>
                                <Typography sx={{ fontSize: 15 }} color="textSecondary" gutterBottom>
                                 Total Stock In : {detailedData[0].total_stock_in ? detailedData[0].total_stock_in : 0} Bottle
                                </Typography>
                                <Typography sx={{ fontSize: 15 }} color="textSecondary" gutterBottom>
                                 Total Stock Out : {detailedData[0].total_stock_out ? detailedData[0].total_stock_out : 0 } Bottle
                                </Typography>
                            </CardContent> }
                            
                        </Card>
                    </Grid>
                   
                    <Grid 
                        container direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-end" item xs={6}>
                   
                        <MuiPickersUtilsProvider   MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item xs={5}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant='inline'
                                    format='yyyy/MM/dd'
                                    margin='normal'
                                    id='date-picker'
                                    label='Select From'
                                    value={selectedDateFrom}
                                    onChange={handleDateChangeFrom}
                                />   
                            </Grid>                      
                            <Grid item xs={5}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant='inline'
                                    format='yyyy/MM/dd'
                                    margin='normal'
                                    id='date-picker'
                                    label='To'
                                    value={selectedDateTo}
                                    onChange={handleDateChangeTo}
                                /> 
                            </Grid>
                            
                            <Grid item xs={2}>
                                <Button onClick={onClickSearch}> Search </Button>
                            </Grid>
                        </MuiPickersUtilsProvider>
                       
                    </Grid>
                   
                    <Grid item xs={1}>
                        <FormControl sx={{ m: 3, minWidth: 200 }}>
                            <InputLabel id="sort-by" >Sort By</InputLabel>
                                <Select
                                    labelId="sort-by"
                                    id="1"
                                    defaultValue=""
                                    name="sortBy"
                                    onChange={selectSortHandler}    
                                >
                                    <MenuItem key={0} value="" > Default </MenuItem>
                                    <MenuItem key={1} value="order by created_at desc" > Latest </MenuItem>
                                    <MenuItem key={2} value="order by created_at asc" > Oldest </MenuItem>
                                    <MenuItem key={3} value="order by stock_in desc" > Stock In </MenuItem>
                                    <MenuItem key={4} value="order by stock_in asc" > Stock Out</MenuItem>
                                </Select>   
                        </FormControl>   
                    </Grid>
                    <Grid item xs={1}>
                        <FormControl sx={{ m: 3, minWidth: 200 }}>
                            <InputLabel id="filter-by" >Filter By</InputLabel>
                                <Select
                                    labelId="filter-by"
                                    id="1"
                                    defaultValue=""
                                    name="filterBy"
                                    onChange={selectFilterHandler}    
                                >
                                    <MenuItem key={0} value="" > All </MenuItem>
                                    <MenuItem key={1} value="and status = 'edit'" > Edit </MenuItem>
                                    <MenuItem key={2} value="and status = 'bought'" > Bought </MenuItem>
                                    <MenuItem key={3} value="and status = 'add'" > Add </MenuItem>
                                    <MenuItem key={4} value="and status = 'custom'" > Custom </MenuItem>
                                </Select>   
                        </FormControl>  
                    </Grid>
                    <Grid item xs={8}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table" >
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{minWidth: column.minWidth}}
                                            >
                                            {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {log
                                    .map((item) => {
                                        return (
                                            <TableRow hover role ="checkbox" key={item.id}>
                                                {columns.map((column) => {
                                                    const value = item[column.id];
                                                    if (column.id === "created_at" ) {
                                                        const date =  moment(value).utc().format('DD/MM/YYYY')
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {date}
                                                            </TableCell>     
                                                        )  
                                                    } else {
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                            {value}
                                                        </TableCell>                                                                                                             
                                                        )    
                                                    }
                                                    
                                                })}
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>
                </Grid>
            </Paper>
        </Paper>
    </Container>
  )
}

export default StocksDetail