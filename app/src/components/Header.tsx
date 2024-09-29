import { AppBar, Link as MuiLink, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <MuiLink
          component={RouterLink}
          to="/"
          color="inherit"
          underline="none"
          sx={{ marginRight: 2 }}
        >
          <Typography variant="h6" component="div">
            SQL
          </Typography>
        </MuiLink>
        <MuiLink
          component={RouterLink}
          to="/users"
          color="inherit"
          sx={{ marginRight: 2 }}
        >
          Users
        </MuiLink>
      </Toolbar>
    </AppBar>
  );
};
