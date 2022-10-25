import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Navigate, useNavigate } from "react-router-dom";

export default function Nav(props) {
  const { user, handleLogout } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "rgb(81 117 255)" }}>
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

          {user && (
            <>
              <Button color="inherit" href="/mynotes">
                My notes
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Log out
              </Button>
            </>
          )}
          {!user && (
            <>
              <Button color="inherit" href="/login">
                Login
              </Button>
              <Button color="inherit" href="/users">
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
