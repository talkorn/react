import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ROUTES from "../../routes/ROUTES";
import store from "../../store/theStore";
import NavLinkComponent from "./NavLinkComponent";
import { darkModeActions } from "../../store/darkMode";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import SearchFromNav from "../searchNavComponent";
import { authActions } from "../../store/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* const pages = [
  {
    label: "About",
    url: ROUTES.ABOUT,
  },
];*/
/* const usersPages = [
  {
    label: "Fav Cards",
    url: ROUTES.FAVCARDS,
  },
];
const isAdminorbiz = [
  {
    label: "SandBox",
    url: ROUTES.SANDBOX,
  },
];
const isBiz = [
  {
    label: "My Cards",
    url: ROUTES.MYCARDS,
  },
]; */

/* const pages = ["About", "Fav Card", "My Cards", "SandBox"]; */

const notAuthPages = [
  {
    label: "SignUp",
    url: ROUTES.SIGNUP,
  },
  {
    label: "Login",
    url: ROUTES.LOGIN,
  },
];
//logged in users
const authedPages = [
  {
    label: "Profile",
    url: ROUTES.PROFILE,
  },
  {
    label: "Logout",
    url: ROUTES.LOGOUT,
  },
];

function ResponsiveAppBar() {
  const payload = useSelector((store) => store.authSlice.payload);
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isDarkMode = useSelector((store) => store.darkModeSlice.isDarkMode);
  const dispatch = useDispatch();
  const changeMode = () => {
    dispatch(darkModeActions.changeMode());
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    toast.success("You've been signed out");
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={ROUTES.HOME}
            sx={{
              mr: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 300,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                color: "blue",
              },
            }}
          >
            Tal's Cards
          </Typography>

          <Checkbox
            edge="start"
            icon={<WbSunnyIcon color="secondary" />}
            checkedIcon={<ModeNightIcon color="warning" />}
            checked={isDarkMode}
            onClick={changeMode}
            /* sx={{ m: 1 }} */
          />
          {/*     <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              maxwidth: "100%",
            }} 
          >*/}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            ></IconButton>

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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/*  {pages.map((page) => (
                <MenuItem
                  key={page.url}
                  color="inherit"
                  onClick={handleCloseNavMenu}
                >
                  <Link to={page.url}></Link>
                </MenuItem> 
              ))}*/}

              <NavLinkComponent
                key={ROUTES.ABOUT}
                url={ROUTES.ABOUT}
                label="About"
              />
              {isLoggedIn && (
                <NavLinkComponent
                  key={ROUTES.FAVCARDS}
                  url={ROUTES.FAVCARDS}
                  label="Favorite"
                />
              )}
              {payload && (payload.isAdmin || payload.biz) && (
                <NavLinkComponent
                  key={ROUTES.SANDBOX}
                  url={ROUTES.SANDBOX}
                  label="Sandbox"
                />
              )}
              {payload && payload.biz && (
                <NavLinkComponent
                  key={ROUTES.MYCARDS}
                  url={ROUTES.MYCARDS}
                  label="MY Cards"
                />
              )}
              {/* {isLoggedIn &&
                usersPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))} */}
              {/*  {payload &&
                (payload.isAdmin || payload.biz) &&
                isAdminorbiz.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))} */}
              {/*  {payload &&
                payload.biz &&
                isBiz.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))} */}
              {isLoggedIn
                ? authedPages.map((settings) =>
                    settings.url === ROUTES.LOGOUT ? (
                      <MenuItem key={settings.url}>
                        <Link to={settings.url} onClick={logoutClick}>
                          <Typography
                            sx={{ textDecoration: "none", color: "pink" }}
                          >
                            {settings.label}
                          </Typography>
                        </Link>
                      </MenuItem>
                    ) : (
                      <MenuItem key={settings.url}>
                        <Link to={settings.url} onClick={logoutClick}>
                          <Typography
                            sx={{ textDecoration: "none", color: "pink" }}
                          >
                            {settings.label}
                          </Typography>
                        </Link>
                      </MenuItem>
                    )
                  )
                : notAuthPages.map((page) => (
                    <NavLinkComponent key={page.url} {...page} />
                  ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={ROUTES.HOME}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              /*  letterSpacing: ".1rem", */
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Tal's<br></br> Cards
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavLinkComponent
              key={ROUTES.ABOUT}
              url={ROUTES.ABOUT}
              label="About"
            />
            {isLoggedIn && (
              <NavLinkComponent
                key={ROUTES.FAVCARDS}
                url={ROUTES.FAVCARDS}
                label="Favorite"
              />
            )}
            {payload && (payload.isAdmin || payload.biz) && (
              <NavLinkComponent
                key={ROUTES.SANDBOX}
                url={ROUTES.SANDBOX}
                label="Sandbox"
              />
            )}
            {payload && payload.biz && (
              <NavLinkComponent
                key={ROUTES.MYCARDS}
                url={ROUTES.MYCARDS}
                label="MY Cards"
              />
            )}
            {/*  {isLoggedIn &&
              usersPages.map((page) => (
                <NavLinkComponent key={page.url} {...page} />
              ))}
            {payload &&
              (payload.isAdmin || payload.biz) &&
              isAdminorbiz.map((page) => (
                <NavLinkComponent key={page.url} {...page} />
              ))}
            {payload &&
              payload.biz &&
              isBiz.map((page) => (
                <NavLinkComponent key={page.url} {...page} />
              ))} */}
          </Box>
          <SearchFromNav />
          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {isLoggedIn
                ? authedPages.map((page) =>
                    page.url === ROUTES.LOGOUT ? (
                      <NavLinkComponent
                        key={page.url}
                        {...page}
                        to={page.url}
                        onClick={logoutClick}
                      />
                    ) : (
                      <NavLinkComponent key={page.url} {...page} />
                    )
                  )
                : notAuthPages.map((page) => (
                    <NavLinkComponent key={page.url} {...page} />
                  ))}
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://img.freepik.com/premium-vector/blue-green-circle-with-person-icon-it_816425-2573.jpg?w=826"
                />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>{" "}
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
