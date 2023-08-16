import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import DrawerAppBar from "./components/app-bar/AppBar";
import { Stack } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login/Login";
import PublicRoutes from "./router/Public.route";
import Router from "./router/Router";

const withoutNavRoute = ["/auth/login", "/auth/register", "/not-found"];

export function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  const location = useLocation();
  const withoutNav = withoutNavRoute.includes(location.pathname);

  return (
    <>
      <Stack margin={4} justifyContent="space-between" spacing={5}>
        {withoutNav ? (
          <>
            <Router />
          </>
        ) : (
          <>
            <Box>
              <DrawerAppBar>
                <Router />
              </DrawerAppBar>
            </Box>
            <Box>
              <Copyright />
            </Box>
          </>
        )}
      </Stack>
    </>
  );
}
