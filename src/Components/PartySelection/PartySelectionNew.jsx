import React, { useState, useEffect } from "react";
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import goPartyLocation from '../../images/goParty.png'
import createPartyLocation from '../../images/createParty.png'
import makePartyLocation from '../../images/livePeformance.png'

import { Redirect, withRouter } from 'react-router-dom';

const theme = createTheme();

export const PartySelectionNew = () => {
    const [goParty, setGoParty] = useState(false);
    const [createParty, setCreateParty] = useState(false);
    const [liveParty, setLiveParty] = useState(false);

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
                {liveParty &&
                    <Redirect to="/live-party" />
                }
                <Grid
                    item
                    xs={4}
                    sm={4}
                    md={4}
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
                    xs={4}
                    sm={4}
                    md={4}
                    sx={{
                        backgroundImage: `url(${createPartyLocation})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    onClick={() => setCreateParty(true)}
                >
                </Grid>
                <Grid
                    item
                    xs={4}
                    sm={4}
                    md={4}
                    sx={{
                        backgroundImage: `url(${makePartyLocation})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    onClick={() => setLiveParty(true)}
                >
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
export default withRouter(PartySelectionNew);
