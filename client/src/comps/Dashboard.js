import React, { useContext } from "react";
import clsx from "clsx";
import {
  BrowserRouter as Route,
  NavLink,
  Switch,
  useLocation,
} from "react-router-dom";
import Books from "./Books/Books";
import Products from "./Product/Products";
import Users from "./Users/Users";
import SoldPro from "./SoldPro";
import Exit from "../Auth/Exit";
import Category from "./Category";
import List from "@material-ui/core/List";
import Badge from "@material-ui/core/Badge";
import ProtectedRoute from "./ProtectedRoute";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import PeopleIcon from "@material-ui/icons/People";
import IconButton from "@material-ui/core/IconButton";
import CategoryIcon from "@material-ui/icons/Category";
import CssBaseline from "@material-ui/core/CssBaseline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import AdminPage from "./AdminData/AdminPage";
import { StoreG } from "../Store/Store";
import { ToastContainer } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import axios from "axios";
import SoldOutProducts from "./SoldOutProducts/SoldOutProducts";
import Statics from "./Statics/Statics";
import CategoryProducts from "./Category/CategoryProducts";
import NotFound from "./NotFound";
import UsersLocal from "./Users/UsersLocal";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarAuth: {
    display: "none",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerAuth: {
    display: "none",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const state = useContext(StoreG);
  const [open, setOpen] = React.useState(false);
  const [isAuth] = state.userAPI.isAdmin;
  const [urlLink] = React.useState([
    "/Statistika",
    "/Buyurtmalar",
    "/Foydalanuvchilar",
    "/Tovarlar",
    "/Tugagan-tovarlar",
    "/Kategoriya/:id",
    "/Kategoriya",
    "/Yetkazilganlar",
    "/personal",
  ]);

  let location = useLocation();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openD, setOpenD] = React.useState(false);

  const handleClickOpen = () => {
    setOpenD(true);
  };

  const handleClose = () => {
    setOpenD(false);
  };
  const goAuth = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firstLogin");
    localStorage.removeItem("admin");
    window.location.href = "/";
  };

  return (
    <React.Fragment>
      <Dialog
        open={openD}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Rostdan ham chiqmoqchimisiz?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Yo'q
          </Button>
          <Button onClick={goAuth} color="primary">
            Ha
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.root}>
        <ToastContainer />
        <CssBaseline />
        <AppBar
          position="fixed"
          style={state.notFound ? {display: "none"}:{}}
          className={
            location.pathname === "/" &&
            (location.pathname.split("/").length !== 3 ||
              !urlLink.includes(location.pathname))
              ? classes.appBarAuth
              : clsx(classes.appBar, {
                  [classes.appBarShift]: open,
                })
          }
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <div className="app-bar-items">
              <div className="title">
                <h2>Admin</h2>
              </div>
              <div className="items">
                <NavLink to="/Buyurtmalar">
                  <IconButton style={{ color: "#fff" }}>
                    <Badge
                      badgeContent={state.statics.statics[0].payments_number}
                      color="secondary"
                    >
                      <NotificationsActiveIcon />
                    </Badge>
                  </IconButton>
                </NavLink>
                <NavLink to="/Tugagan-tovarlar">
                  <IconButton style={{ color: "#fff" }}>
                    <AssignmentTurnedInIcon />
                  </IconButton>
                </NavLink>
                <NavLink to="/personal">
                  <IconButton style={{ color: "#fff" }}>
                    <AccountCircleIcon />
                  </IconButton>
                </NavLink>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          style={state.notFound ? {display: "none"}:{}}
          className={
            location.pathname === "/" &&
            (location.pathname.split("/").length !== 3 ||
              !urlLink.includes(location.pathname))
              ? classes.drawerAuth
              : clsx(classes.drawer, {
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
                })
          }
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {[
              "Statistika",
              "Buyurtmalar",
              "Foydalanuvchilar",
              "Tovarlar",
              "Tugagan-tovarlar",
              "Kategoriya",
            ].map((text, index) => (
              <NavLink to={`/${text}`} key={index}>
                <ListItem button>
                  <ListItemIcon>
                    {index === 0 ? (
                      <EqualizerIcon />
                    ) : index === 1 ? (
                      <NotificationsActiveIcon />
                    ) : index === 2 ? (
                      <PeopleIcon />
                    ) : index === 3 ? (
                      <ShoppingCartIcon />
                    ) : index === 4 ? (
                      <AssignmentTurnedInIcon />
                    ) : index === 5 ? (
                      <CategoryIcon />
                    ) : null}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </NavLink>
            ))}
          </List>
          <Divider />
          <List>
            {["Yetkazilganlar"].map((text, index) => (
              <NavLink to={`/${text}`} key={index}>
                <ListItem button>
                  <ListItemIcon>
                    {index % 2 === 0 ? <LocalOfferIcon /> : <ExitToAppIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </NavLink>
            ))}
          </List>
          <List>
            <ListItem button onClick={handleClickOpen}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Chiqish" style={{ color: "#757575" }} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/">
              <Exit />
            </Route>
            <ProtectedRoute
              path="/Statistika"
              component={Statics}
              isAuth={isAuth}
            />
            <ProtectedRoute
              path="/Buyurtmalar"
              component={Books}
              isAuth={isAuth}
            />
            <ProtectedRoute 
              path="/Foydalanuvchilar/:id"  
              component={Users} 
              isAuth={isAuth}
            />
            <ProtectedRoute
              path="/Foydalanuvchilar"
              component={UsersLocal}
              isAuth={isAuth}
            />
            <ProtectedRoute
              path="/Tovarlar"
              component={Products}
              isAuth={isAuth}
            />
            <ProtectedRoute
              path="/Tugagan-tovarlar"
              component={SoldOutProducts}
              isAuth={isAuth}
            />
            <ProtectedRoute
              path="/Yetkazilganlar"
              component={SoldPro}
              isAuth={isAuth}
            />
            <ProtectedRoute
              path="/Kategoriya/:id"
              component={CategoryProducts}
              isAuth={isAuth}
            />
            <ProtectedRoute
              path="/Kategoriya"
              component={Category}
              isAuth={isAuth}
            />
            <ProtectedRoute
              path="/personal"
              component={AdminPage}
              isAuth={isAuth}
            />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
      </div>
    </React.Fragment>
  );
}
