import React, { useState, useEffect } from "react";
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import goPartyLocation from '../../images/goParty.png'
import makePartyLocation from '../../images/createParty.png'
import { Redirect, withRouter } from 'react-router-dom';

const theme = createTheme();

export const PartySelectionNew = () => {
    const [goParty, setGoParty] = useState(false);
    const [createParty, setCreateParty] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                {goParty &&
                    <Redirect to="/go-party" />
                }
                {createParty &&
                    <Redirect to="/create-party" />
                }
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
                    onClick={() => setGoParty(true)}

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
                    onClick={() => setCreateParty(true)}
                >
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
export default withRouter(PartySelectionNew);
