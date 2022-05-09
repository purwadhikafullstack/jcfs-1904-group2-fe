import React, { useContext } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
// import {  } from "@material-ui/core";
import Logo from "@mui/icons-material/HealingRounded";
import { ShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../store/actions";
import { CartContext } from "../../helper/Context";

function Navigation() {
  const dispatch = useDispatch();
  const { userId, setUserId, orderId, cart, setCart, change, setChange } =
    useContext(CartContext);
  const { username, role } = useSelector((state) => {
    return state.auth;
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = () => {
    dispatch(logoutAction());
    setUserId(0);
    setCart([]);
  };

  return (
    <Box>
      <AppBar color="inherit">
        <Toolbar className="navbar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 3 }}
            component="a"
            href="/"
          >
            <Logo fontSize="large" sx={{ mr: 1 }} />
            PHARMACY
          </IconButton>

          <div className="product-navbar">
            <Typography sx={{ mr: 3 }}> Products </Typography>
            <Typography component={Link} to="/customorders">
              {" "}
              Custom Products{" "}
            </Typography>
          </div>

          {username ? (
            <div>
              <Button component={Link} to="/cart">
                <Badge badgeContent={cart.length} color="secondary">
                  <ShoppingCart color="primary" />
                </Badge>
              </Button>

              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {username}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>
                  <Link to="/edit-profile-picture"> Profile Picture </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/edit-profile">Edit Profile</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/usertransactions">Transaction</Link>
                </MenuItem>
                <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="register-login-navbar">
              <Typography sx={{ mr: 3 }}>
                <Link to="/register">Register</Link>
              </Typography>
              <Typography>
                <Link to="/login">Login</Link>
              </Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navigation;
