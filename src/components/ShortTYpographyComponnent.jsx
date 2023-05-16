import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ROUTES from "../routes/ROUTES";
import { Fragment } from "react";

const ShortTYpographyComponnent = () => {
  return (
    <Fragment>
      <Typography
        variant="h6"
        noWrap
        component={Link}
        to={ROUTES.HOME}
        sx={{
          mr: 1,
          /*  display: { xs: smallmedia, md: largemedia }, */
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
      {/*  <Checkbox
        edge="start"
        icon={<WbSunnyIcon color="secondary" />}
        checkedIcon={<ModeNightIcon color="warning" />}
        checked={isDarkMode}
        onClick={changeMode}
      /> */}
    </Fragment>
  );
};
export default ShortTYpographyComponnent;