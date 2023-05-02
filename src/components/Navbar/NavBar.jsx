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
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";

const pages = [
  {
    label: "About",
    url: ROUTES.ABOUT,
  },
  {
    label: "Fav Cards",
    url: ROUTES.FAVCARDS,
  },
  {
    label: "My Cards",
    url: ROUTES.MYCARDS,
  },
  {
    label: "SandBox",
    url: ROUTES.SANDBOX,
  },
];
/* const pages = ["About", "Fav Card", "My Cards", "SandBox"]; */
const settings = [
  {
    label: "Profile",
    url: ROUTES.PROFILE,
  },
  {
    label: "SignUp",
    url: ROUTES.SIGNUP,
  },
  {
    label: "Login",
    url: ROUTES.LOGIN,
  },
  {
    label: "Logout",
    url: ROUTES.LOGOUT,
  },
];

function ResponsiveAppBar() {
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
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Box sx={{ my: 2, p: 1 }}></Box>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={ROUTES.HOME}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 300,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              "&:hover": {
                color: "blue",
              },
            }}
          >
            Tal's Cards
          </Typography>
          <Typography sx={{ display: { xs: "none", md: "inline" }, m: 1 }}>
            {isDarkMode ? "Dark " : "Light "}Mode
          </Typography>
          <Checkbox
            edge="start"
            icon={<WbSunnyIcon color="secondary" />}
            checkedIcon={<ModeNightIcon color="warning" />}
            checked={isDarkMode}
            onClick={changeMode}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              {pages.map((page) => (
                <MenuItem
                  key={page.url}
                  color="inherit"
                  onClick={handleCloseNavMenu}
                >
                  <Link to={page.url}>
                    <Typography sx={{ textDecoration: "none", color: "pink" }}>
                      {page.label}{" "}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}

              {settings.map((settings) => (
                <MenuItem key={settings.url} onClick={handleCloseNavMenu}>
                  <Link to={settings.url}>
                    {" "}
                    <Typography sx={{ textDecoration: "none", color: "pink" }}>
                      {settings.label}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
            {pages.map((page) => (
              <NavLinkComponent key={page.url} {...page} />
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {settings.map((setting) => (
                <NavLinkComponent key={setting.url} {...setting} />
              ))}{" "}
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://img.freepik.com/premium-vector/blue-green-circle-with-person-icon-it_816425-2573.jpg?w=826"
                />
              </IconButton>
            </Box>

            {/*   <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.url} onClick={handleCloseUserMenu}>
                  {setting.label}
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
