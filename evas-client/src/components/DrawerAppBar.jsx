import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { instance } from '../interceptors/axios';

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import AuthServices from '../services/authServices';

const drawerWidth = 240;
//let navItems = ['Sign Out', 'About', 'Contact'];
let navItems = ['Sign Out'];

function DrawerAppBar(props) {
  const { window } = props;

  const [mobileOpen, setMobileOpen] = useState(false);


  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleSignOut = () => {
    console.log(AuthServices.API_URL);
    axios.post(AuthServices.API_URL + "/logout", {
      loginId: props.loginId,
    }).then((response) => {
      console.log("logout response : ", response);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    navigate('/');
    }).catch((error) => {
      console.log(error);
    });
    
  }

  const handleChangeToAdminOrUser = () => {
    props.adminComp ? navItems[0] = 'Change To Admin' : navItems[0] = 'Change To User';
    props.setAdminComp(!props.adminComp);
    instance.post('/admin', {
    }).then((response) => {
      console.log("changeToAdminOrUser response : ", response);
    }).catch((error) => {
      console.log(error);
    });
    
  }


  const navToFunc = (navItem) => {
    switch (navItem.toLowerCase()) {
      case 'change to admin':
      case 'change to user':
        handleChangeToAdminOrUser();
        break;
      case 'sign out':
        handleSignOut();
        break;
      default: break;
    }
  }
  useEffect(() => {
    if (props.isAdmin) {
      if (navItems.length === 1) navItems.splice(0, 0, "Change To Admin");
      else if (navItems[0] == "Change To User") navItems[0] = "Change To Admin";
    }
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            NLEVAS
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button onClick={() => { navToFunc(item) }} key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 1 }}>
        <Toolbar />
        <Typography>

        </Typography>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;