import React,{useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogOutAction } from '../redux/actions/logoutaction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export const NavBar=()=> {
  
  const navigate= useNavigate();
  const dispatch = useDispatch();
 
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    navigate('/');
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //back to home
  const handleHome= ()=>{
    setAnchorElUser(null);
    navigate('/');
  }

  //go to user dashboard
  const handleUserDashboard= ()=>{
    setAnchorElUser(null);
    navigate('/userdashboard');
  }
  
  //go to admin dashboard
  const handleAdminDashboard= ()=>{
    setAnchorElUser(null);
    navigate('/admindashboard');
  }
  
  //log in user
  const handleLogIn = ()=>{
    setAnchorElUser(null);
    navigate('/login');
  }

  //sign up user
  const handleSignUp = ()=>{
    setAnchorElUser(null);
    navigate('/signup');
  }
  
  //log out for user
  const handleLogOut = () => {
    setAnchorElUser(null);
    dispatch(LogOutAction());
    window.location.reload();
  };

  //getting from saved loaclstorage
  let firstName;
  let role;
  let userInfo= JSON.parse(localStorage.getItem("userInfo"));
  if(userInfo !=null){
    firstName= userInfo.firstName;
    role= userInfo.role;
 
  }
  else {
     firstName= "N";
     role= null;
  }
  
  return (
    
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <WorkIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Job Portal
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem  onClick={handleCloseNavMenu}>
                  <HomeIcon/>
                  <Typography textAlign="center" sx={{ml:2}}>Home</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
          <WorkIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Job Portal
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button
               
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
         
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={firstName} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
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
              {
                 role ==null ?
                 
                 <div>
                 <MenuItem key='Home' onClick={handleHome}>
                   <HomeIcon/>
                   <Typography textAlign="center" sx={{ml:2}}>Home</Typography>
                 </MenuItem>
                 <MenuItem key='SignUp' onClick={handleSignUp}>
                   <LockOpenIcon />
                   <Typography textAlign="center" sx={{ml:2}}>Sign Up</Typography>
                 </MenuItem>
                 <MenuItem key='Login' onClick={handleLogIn}>
                   <LoginIcon />
                   <Typography textAlign="center" sx={{ml:2}}>Log In</Typography>
                 </MenuItem>
                 </div>
                 :
                 <div>
                    
                  {
                    role == 0 ?
                    <div> 
                    <MenuItem key='Profile Infos' onClick={handleUserDashboard}>
                       <InfoIcon />
                      <Typography textAlign="center" sx={{ml:2}}>Profile Infos</Typography>
                   </MenuItem>
                    <MenuItem key='User Dashboard' onClick={handleUserDashboard}>
                     <DashboardIcon />
                     <Typography textAlign="center" sx={{ml:2}}>User Dashboard</Typography>
                  </MenuItem>
                  
                  </div>
                  :
                 <MenuItem key='Admin Dashboard' onClick={handleAdminDashboard}>
                    <AdminPanelSettingsIcon />
                    <Typography textAlign="center" sx={{ml:2}}>Admin Dashboard</Typography>
                  </MenuItem>
                 }
                 <MenuItem key='Log Out' onClick={handleLogOut}>
                  <LogoutIcon/>
                  <Typography textAlign="center" sx={{ml:2}}>Log Out</Typography>
                </MenuItem>
                 </div>
              }
                
                 
                 
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
