import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Navigate} from 'react-router-dom';
import {HomeRounded, ReportOutlined, MenuRounded, CloseRounded, ShoppingCart, People, EmailSharp, SubjectOutlined, AddCircleOutlineOutlined, AccountBalanceOutlined} from '@material-ui/icons'
import { AppBar, Drawer, ListItem, Button, Paper, Toolbar, List, ListItemText, Typography, Avatar, ListItemIcon} from '@material-ui/core';
import {format} from 'date-fns'
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../../../store/actions";
import useStyles from './style'
import { WindowSharp } from '@mui/icons-material';

function DrawerBar() {
    const { username, photo } = useSelector((state) => {
        return state.auth;
      });
  
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();


    const onLogoutClick = () => {
        
        dispatch(logoutAction());
        <Navigate to="/" replace />
        
      };


  

    const menuItems =[
        {
            text: 'Home User',
            icon: <People color="primary"/>,
            path: '/'
        },
        {
            text: 'Add / Edit Product',
            icon: <AddCircleOutlineOutlined color="primary"/>,
            path: '/homeadmin'
        },
        {
            text: 'Financial',
            icon: <AccountBalanceOutlined color="primary"/>,
            path: '/financial'
        },
        {
            text: 'Orders',
            icon: <EmailSharp color="primary"/>,
            path: '/orders'
        },
        {
            text: 'Products Stock',
            icon: <ReportOutlined color="primary"/>,
            path: '/stocks'

        },
        {
            text: 'User Cart',
            icon: <ShoppingCart color="primary"/>,
            path: '/userscart'

        }
    ]
  return (
    <div className={classes.root}>
        {/* App Bar */}
        <AppBar 
            className={classes.appbar}
            color="inherit"
        >
            <Toolbar>
                <Typography className={classes.date}>
                    Today is the {format(new Date(), 'do MMM Y')}
                </Typography>
                <Typography>
                   Hi {username}
                </Typography>
                <Avatar alt="Admin Photo" src={photo} className={classes.avatar}/>
            </Toolbar>

        </AppBar>
        {/* drawer */}
        <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{ paper: classes.drawerPaper }}
        >
            <div>
                <Typography variant="h5" className={classes.title}>
                    Admin Dashboard
                </Typography>
            </div>
            {/* list/link */}
            <List>
                {menuItems.map((item) => (
                   <ListItem
                    button
                    key={item.text}
                    onClick={() =>{ navigate(item.path)}}
                    className={location.pathname == item.path ? classes.active : null}
                   >
                    <ListItemIcon>{item.icon} </ListItemIcon>
                    <ListItemText primary={item.text}></ListItemText>
                   </ListItem> 
                ))}
            </List>
            <Paper>
                <Button fullWidth component={Link} to={`/`} onClick={onLogoutClick}>Log Out</Button>
            </Paper>      
        </Drawer>
    </div>
  )
}

export default DrawerBar