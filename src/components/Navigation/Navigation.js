import React from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import EcoIcon from '@material-ui/icons/Eco';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import NavigationItem from "./NavigationItem";
import Thermostat from "../Thermostat/Thermostat";

const appBarHeight = '4rem';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    background: '#f2f7f7',
    [theme.breakpoints.up('sm')]: {
      height: appBarHeight,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    color: "#37dbdb",
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    color: 'black',
  },
  logoImage: {
    color: '#37dbdb',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    marginTop: appBarHeight,
  },
  content: {
    marginTop: appBarHeight,
    padding: theme.spacing(3),
    flexGrow: 1,
  },
  drawerText: {
    fontWeight: 700
  }
}));

export default function NavigationDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const units = [
    'Unit 100', 'Unit 200', 'Unit 300', 'Unit 400', 'Unit 500', 'Unit 600', 'Unit 700', 'Unit 800', 'Unit 900', 'Unit 1000'
  ];

  const drawer = (
    <div>
      <div className={classes.toolbar} style={{display: 'flex', alignItems: 'center', margin: '0 16px'}}>
        <div>
          <span className={classes.drawerText}>Building Units ({units.length})</span>
        </div>
      </div>
      <Divider />
      <List>
        {units.map(unit => (
          <NavigationItem
            key={unit}
            unit={unit}
          />
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.logo}>
            <EcoIcon className={classes.logoImage}/>
            <span className={classes.drawerText}>Thermostat</span>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="building units">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Thermostat/>
      </main>
    </div>
  );
}

NavigationDrawer.propTypes = {
  window: PropTypes.func,
};