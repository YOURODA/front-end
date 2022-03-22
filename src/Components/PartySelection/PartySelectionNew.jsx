import React, { useState, useEffect } from "react";
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import goPartyLocation from '../../images/goParty.png'
import makePartyLocation from '../../images/createParty.png'
import APIServices from "../Services/APIServices";

const theme = createTheme();

export const PartySelectionNew = () => {
    const [ipList, setIpList] = useState([]);
    const apiService = new APIServices();
    // useEffect(() => {
    //     apiService.loginRaspi(setIpList, ipList).then(response => {
    //         console.log(response.data)
    //     });
    // }, [])
    // console.log("ipList", ipList[0])

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    sx={{
                        backgroundImage: `url(${goPartyLocation})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    onClick={() => window.location = "/play-coreography"}
                >
                </Grid>

                <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    sx={{
                        backgroundImage: `url(${makePartyLocation})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    onClick={() => window.location = "/make-coreography"}
                >
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
export default PartySelectionNew;