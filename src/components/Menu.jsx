import * as React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PhotoIcon from '@mui/icons-material/Photo';
import CommentIcon from '@mui/icons-material/Comment';
import AlbumIcon from '@mui/icons-material/Album';
import ListUsers from './ListUsers';
import PostList from './PostList';
import PhotoList from './PhotoList';
import Albums from './ListAlbums';
import CommentComponent from './CommentComponent';

const drawerWidth = 240;

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

// Array de objetos con los elementos de la lista y sus URLs asociadas
const menuItems = [
    { text: 'Users', url: '/users', icon: <PersonIcon /> },
    { text: 'Posts', url: '/posts', icon: <PostAddIcon /> },
    { text: 'Photo', url: '/photo', icon: <PhotoIcon /> },
    { text: 'Comments', url: '/comments', icon: <CommentIcon /> },
    { text: 'Albums', url: '/albums', icon: <AlbumIcon /> },
  ];

function Users() {
  return <div><ListUsers/></div>;
}

function Posts(){
    return <div><PostList/></div>;
}

function Photo(){
    return <div><PhotoList/></div>
}
function Comments(){
    return <div><CommentComponent/></div>
}
function ListAlbums(){
    return <div><Albums/></div>
}

export default function Menu() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
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
            <Typography variant="h6" noWrap component="div">
              C R U D
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <Link to={item.url} style={{ textDecoration: 'none', color: 'inherit' }}>
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
    }}
  >
    {item.icon} {/* Agrega el icono correspondiente aquí */}
  </ListItemIcon>
  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
</ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
            <Route path='/photo' element={<Photo/>}/>
            <Route path='/albums' element={<ListAlbums/>}/>
            <Route path='/Comments' element={<CommentComponent/>}/>
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}
