import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../../images/odaLogo.png';
import APIServices from "../../Components/Services/APIServices";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { validEmail, validPassword } from '../../utils/regex/Regex'
import { LOGIN_FAIL_EMAIL, LOGIN_FAIL_PASSWORD } from '../../utils/alerts/AlertMessages'
import { connect } from "react-redux";
import { Redirect, withRouter } from 'react-router-dom';
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
      </Link>
            {new Date().getFullYear()}
        </Typography>
    );
}

const theme = createTheme();

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [goLogin, setGoLogin] = useState(false);
    const apiService = new APIServices();


    const register = async (e) => {
        e.preventDefault();

        if (!validEmail.test(email)) {
            setAlertMessage(LOGIN_FAIL_EMAIL);
        }
        if (!validPassword.test(password)) {
            setAlertMessage(LOGIN_FAIL_PASSWORD);
        }
        if (validPassword.test(password) && validEmail.test(email)) {
            const returnValue = await apiService.register(firstName, secondName, email, password, confPassword);
            if (returnValue.status == 200) {
               setGoLogin(true);
            } else {
                setAlertMessage(returnValue.data.message);
            }
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {goLogin &&
                <Redirect to="/login" />
                }
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img style={{
                        height: "50px",
                        width: "auto"
                    }} src={Logo} />
                    <Box sx={{ height: 100 }} />
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {alertMessage &&
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert variant="filled" severity="error">{alertMessage}</Alert>
                                </Stack>
                            }
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={secondName}
                                    onChange={(e) => setSecondName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confPassword"
                                    autoComplete="new-password"
                                    value={confPassword}
                                    onChange={(e) => setConfPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to join ODA family."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={register}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}

export default withRouter(SignUp);