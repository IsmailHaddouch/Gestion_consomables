import { ChevronLeft } from '@mui/icons-material';
import MuiDrawer from '@mui/material/Drawer';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import icon from '../icons/icon2.png'
import icon3 from '../icons/icon4.png'
import InventoryIcon from '@mui/icons-material/Inventory';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';



function SideListe({open,setOpen}) {
    const navigate = useNavigate()
    const drawerWidth = 240;
const [menudata,setMenudata]=useState('Home');
    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );
    const [userdata , setuserdata] = useState('')
    React.useEffect(()=>{
      const data = JSON.parse(localStorage.getItem('userdata'))
      setuserdata(data)
    })

    return (
        <>
            <Drawer variant="permanent" open={open} >
                <DrawerHeader style={{backgroundColor:'#001F3F'}}>
                <Typography variant="h7" noWrap sx={{ color: 'white' }}>
        Gestion de consomable
    </Typography>
                    {open ?  <IconButton onClick={() => setOpen(false)}>
                        <ChevronLeft />
                    </IconButton> : null}
                </DrawerHeader>
                {userdata === 'directeur' || userdata === 'directeur de complexe' ?
                <List sx={{ backgroundColor: '#001F3F' ,height:'100%'}}>
       
                    {['Graphiques','Utilisateures', 'Commandes','Livrables','voirconsomable','consomables','livrConso'].map((text, index) => (
                        <ListItem key={text}  onClick={()=>navigate("/"+text)} disablePadding sx={{ display: 'block', color: 'white' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                   
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: 'white',
                                    }}
                                >
{
  index === 0 ? <DashboardIcon /> :
  index === 1 ? <GroupIcon /> :
  index === 2 ? <img src={icon} alt="Icon" style={{ width: '25px' }} /> :
  index === 3 ? <DeliveryDiningIcon /> :
  index === 4 ? <RemoveRedEyeIcon /> :
  index === 5 ? <InventoryIcon /> :
  index === 6 ? <LocalGroceryStoreIcon  /> :


  null
}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} onClick={()=>setMenudata(text)} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    
                </List>
                 : userdata === 'formateur' ?




                <List sx={{ backgroundColor: '#001F3F' ,height:'100%'}}>
       
       {[ 'Commandes','Livrables','product'].map((text, index) => (
           <ListItem key={text}  onClick={()=>navigate("/"+text)} disablePadding sx={{ display: 'block', color: 'white' }}>
               <ListItemButton
                   sx={{
                       minHeight: 48,
                       justifyContent: open ? 'initial' : 'center',
                       px: 2.5,
                      
                   }}
               >
                   <ListItemIcon
                       sx={{
                           minWidth: 0,
                           mr: open ? 3 : 'auto',
                           justifyContent: 'center',
                           color: 'white',
                       }}
                   >
                       {index  === 0 ?   <img src={icon} alt="Icon" style={{width:'25px'}} /> : index  === 1 ? <DeliveryDiningIcon /> : index  === 2 ?  <ProductionQuantityLimitsIcon/>  : index  === 3 ?  <InventoryIcon />: <img src={icon3} alt="Icon" style={{width:'25px'}}/>}
                   </ListItemIcon>
                   <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} onClick={()=>setMenudata(text)} />
               </ListItemButton>
           </ListItem>
       ))}
       
   </List>:<List sx ={{ backgroundColor: '#001F3F' ,height:'100%'}}>
       
       {['Graphiques','Utilisateures', 'Livrables', 'Consomables','voirconsomable','livrConso'].map((text, index) => (
           <ListItem key={text}  onClick={()=>navigate("/"+text)} disablePadding sx={{ display: 'block', color: 'white' }}>
               <ListItemButton
                   sx={{
                       minHeight: 48,
                       justifyContent: open ? 'initial' : 'center',
                       px: 2.5,
                      
                   }}
               >
                   <ListItemIcon
                       sx={{
                           minWidth: 0,
                           mr: open ? 3 : 'auto',
                           justifyContent: 'center',
                           color: 'white',
                       }}
                   >
                       {index  === 0 ? <DashboardIcon /> : 
                       index  === 1 ? <GroupIcon /> : 
                       index  === 2 ?  <DeliveryDiningIcon /> :
                        index  === 3 ?  <InventoryIcon />:
                        index === 4 ?  <RemoveRedEyeIcon/>:
                        index === 5 ? <LocalGroceryStoreIcon/>:
                       
                       null
                       }
                   </ListItemIcon>
                   <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} onClick={()=>setMenudata(text)} />
               </ListItemButton>
           </ListItem>
       ))}
       
   </List>
}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
                <DrawerHeader />
              
            </Box>
        </>
    )
}

export default SideListe;

