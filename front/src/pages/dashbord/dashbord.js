import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {  useState } from 'react';
import SideListe from '../dashbord/SideListe';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



export default function Dashbord(props) {
  const [open, setOpen] = useState(false);
 
const handleDrawerOpen = () => {
    setOpen(true);
  };

const navigate =useNavigate()
const [anchorElNav, setAnchorElNav] = React.useState(null);
const [anchorElUser, setAnchorElUser] = React.useState(null);

const handleCloseUserMenu = () => {
  setAnchorElUser(null);
navigate('/')

};

//
const handleOpenUserMenu = (event) => {
  setAnchorElUser(event.currentTarget);
};
  return (
   
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}  style={{backgroundColor:'#001F3F'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
        <Tooltip title='Back to Home '>
       <IconButton sx={{mr:1,color:'white'}} onClick={()=>navigate('/Graphiques')}>
       <HomeIcon/>
       </IconButton>
       
     

        </Tooltip>
          <Typography variant="h6" noWrap component="div" sx={{flexGrow:1}}>
            Dashboard
          </Typography>
        
        
          
          <IconButton><Avatar sx={{ bgcolor: '#FFA500' }}onClick={handleOpenUserMenu}  >IT</Avatar></IconButton>  
          {/* <Avatar {...stringAvatar('Ismail Haddouch')} /> */}
       
          <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
               <MenuItem  disabled >
              
              <Typography textAlign="center" >Ismail haddouch</Typography>
            </MenuItem>
          
                <MenuItem  onClick={handleCloseUserMenu} >
              
                  <Typography textAlign="center" >Log out</Typography>
                </MenuItem>
             
            </Menu>




        </Toolbar>
      </AppBar>
    
  <SideListe open={open} setOpen={setOpen} />
  <main style={{marginTop:"100px"}}>
    {props.children}
  </main>
    </Box>
  );
}
