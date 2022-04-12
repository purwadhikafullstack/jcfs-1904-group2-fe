import React,{useState, useEffect} from 'react'
import useStyles from './styles'
import axios from '../../../../utils/axios'
import { Typography,Container, Grid, Card, CardContent,InputBase, TextField, Box, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import {Link} from 'react-router-dom'

function PendingOrder() {
    const classes = useStyles();
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [ordersPerPage, setOrdersPerPage] = useState(10);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

      const handleChangeOrdersPerPage = (event) => {
        setOrdersPerPage(+event.target.value);
        setPage(0);
      };



    const fetchOrders = async () => {
        try {
            const res = await axios.get("/customorders")
            const { data } = res;
           setOrders(data)
           console.log(data);
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    useEffect(() => {
        fetchOrders();
    },[]);

    const columns = [
        { id:'id', label: 'Id', align: 'right', minWidth: 100},
        { id:'user_id', label: 'User Id', align: 'right', minWidth: 100},
        { id:'status', label: 'Status',align: 'right', minWidth: 100},
        { id:'notes', label: 'Notes',align: 'right', minWidth: 280},
        { id:'created_at', label: 'Order Date', align: 'right', minWidth: 100},
    ]


  return (
    <Container>
        <div className={classes.toolbar}/>
        <Typography>Pending orders </Typography>
        <Paper>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.slice(page * ordersPerPage, page * ordersPerPage + ordersPerPage)
                            .map((order) => {
                                return (
                                    <TableRow  component={Link} to={`/orders/${order.id}`} hover role="checkbox" key={order.id}>
                                        {columns.map((column) => {
                                            const value = order[column.id];
                                            return(
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={orders.length}
                rowsPerPage={ordersPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeOrdersPerPage}
            />
        </Paper>
    </Container>
  )
}

export default PendingOrder 