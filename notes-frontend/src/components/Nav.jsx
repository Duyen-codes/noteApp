import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Button sx={{ flexGrow: 1 }} color="inherit" href="/">
            Notes
          </Button>
          <Button color="inherit" href="/login">
            Login
          </Button>
          <Button color="inherit" href="/register">
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
