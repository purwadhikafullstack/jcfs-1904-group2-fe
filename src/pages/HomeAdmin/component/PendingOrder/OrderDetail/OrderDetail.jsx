import React,{useState, useEffect} from 'react'
import useStyles from './styles'
import { Typography,Container, Grid, Card, CardMedia, CardContent,InputBase, TextField, Box, Input, IconButton,  FormControl, InputLabel, MenuItem, Select, CardActions, Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import axios from '../../../../../utils/axios'
import { useParams } from "react-router-dom";
import { set } from 'date-fns/esm';
import { Link } from 'react-router-dom'
import { ProductManager} from '../../ProductManager'

function OrderDetail() {
    const classes = useStyles();
    const [order, setOrder] = useState({})
    const params = useParams();
    const [isApproved, setIsApproved] = useState(false)


 
    const isApprovedHandlerClick = () => {
        isApprovedMessage();
    }


    const fetchOrderById = async () => {
        try {
            const res = await axios.get(`/customorders/${params.orderId}`, {params: {id: params.orderId}});
            const  {data} = res
            setOrder(data[0])
           
            
        } catch (error) {
            console.log(alert(error.message));
        }
    };

    const isApprovedMessage = async () => {

        await axios
      .put(`/customorders/${params.orderId}`, {params: { isApproved, id: params.orderId } }  )
      .then((res) => {
       alert(res);
      })
      .catch((error) => console.log({ error }));
    }


    useEffect(() => {
        fetchOrderById();
    },[])

  return (
      <Container>
          <div className={classes.toolbar}/>
            <Paper>
                <Card>
                    <CardMedia
                        component="img"
                        alt="Doctor Prescription"
                        height="400"
                        image={order.image}
                    >

                    </CardMedia>
                        <Typography variant="h6" component="div">Notes</Typography>
                        <Typography variant="body1">{order.notes}</Typography>
                    <CardActions>
                        {isApproved ? <>
                        <Typography> Select Drugs </Typography>
                        <Button onClick={() => {setIsApproved(false)}}> Back </Button>
                        </> : <>
                        <Button onClick={() => {setIsApproved(true)}}>Approve</Button>
                        <Button onClick={isApprovedHandlerClick}>Reject</Button>
                        </>}
                        <Button> Open Image</Button>
                    </CardActions>
                </Card>
                {isApproved ? 
                <>
                
                </> 
                : null}


            </Paper>
      </Container>
    
  )
}

export default OrderDetail