import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../../images/odaLogoBlack.png";
import OdaBox from "../../images/togetherParty.jpg";
import { useHistory, Redirect, withRouter } from "react-router-dom";
import APIServices from "../../Components/Services/APIServices";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import * as actionTypes from "../../store/actions/actionTypes";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © " + new Date().getFullYear()}
      <Link color="inherit" href="https://odaboxtech.com/">
        ODABOX Inc. All rights reserved
      </Link>
    </Typography>
  );
}

const theme = createTheme();

export function SignIn(props) {
  const { setCreateUserPopup, createUserPopup, setOdaUser, odaUser } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const history = useHistory();
  const apiService = new APIServices();
  let returnValue;
  const auth = async (e) => {
    setCreateUserPopup(false);
    e.preventDefault();
    returnValue = await apiService.login(email, password);
    if (returnValue.status == 200) {
      localStorage.setItem("odaUser", email);
      setOdaUser(email);
      setCreateUserPopup(true);
      //   history.push("/party-selection");

      window.open(`/party-selection`);
    } else {
      setAlertMessage(returnValue.data.message);
      history.push("/login");
    }
  };
  const logout = async (e) => {
    e.preventDefault();
    const returnValue = await apiService.logout();
    if (returnValue == 200) {
      history.push("/login");
    } else {
      history.push("/login");
    }
  };
  // const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     // eslint-disable-next-line no-console
  //     console.log({
  //         email: data.get('email'),
  //         password: data.get('password'),
  //     });
  // };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${OdaBox})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {alertMessage && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity="error">
                {alertMessage}
              </Alert>
            </Stack>
          )}
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              style={{
                height: "50px",
                width: "auto",
              }}
              src={Logo}
            />
            <Box sx={{ height: 100 }} />
            <Box component="form" noValidate onSubmit={auth} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={auth}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={logout}>
                    Forgot password?
                  </Link>
                </Grid>
                {/* <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid> */}
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      {createUserPopup && <Redirect to="/party-selection" />}
    </ThemeProvider>
  );
}
const mapStateToProps = (state) => {
  return {
    createUserPopup: state.createUserPopup,
    currentUser: state.current_user,
    odaUser: state.odaUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCreateUserPopup: (createUserPopup) =>
      dispatch({ type: actionTypes.CREATE_USER_POPUP, createUserPopup }),
    setCurrentUser: (current_user) =>
      dispatch({ type: actionTypes.SET_USER, current_user }),
    setOdaUser: (odaUser) =>
      dispatch({ type: actionTypes.SET_ODAUSER, odaUser }),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
