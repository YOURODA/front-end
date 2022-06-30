import React, { useState, useEffect } from "react";
import {
    Button, TextField, DialogActions, DialogContent, DialogContentText, DialogTitle,
    List, ListItem, ListItemText, ListItemAvatar, Avatar, Dialog, ListItemButton, Checkbox
} from '@mui/material';
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import APIService from '../../Components/Services/APIServices'
import Logo from '../../images/odaLogoBlack.png'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { Redirect, withRouter } from 'react-router-dom';
export const PopupIoT = (props) => {
    const { createUserPopup, odaUser, setCreateUserPopup, odaName, setOdaName } = props
    const [open, setOpen] = useState(false);
    // const [odaName, setOdaName] = useState();
    const [defaultOdaName, setDefaultOdaName] = useState('');
    const [ipList, setIpList] = useState([]);
    const [checked, setChecked] = useState([1]);
    const [alertMessage, setAlertMessage] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [newUserResponse, setNewUserResponse] = useState(false)

    const apiServices = new APIService()

    useEffect(() => {
        console.log("odaUser59: ", odaUser)
        const getOda = apiServices.myOdas(odaUser);
        getOda.then(response => {
            console.log("response.data.myodas", response.data)
            if (response.data.odas) {
                // setOdaName(response.data.odas.odaName)
                setDefaultOdaName(response.data.odas.odaName);
                setNewUserResponse(true)
            }
        })
        apiServices.loginRaspi(setIpList, ipList);
    }, [])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };
    const sendOdaName = async (raspiIp, defaultOdaName) => {
        await apiServices.recognizeRaspi(raspiIp, defaultOdaName).then(response => {
            if (response && response.status === 200) {
                localStorage.setItem('odaName', response.data);
                setOdaName(response.data);
                setRedirect(true)
            }
        })
    }
    const handleClose = () => {
        setOpen(false);
        setCreateUserPopup(open)
    };
    const getOdaName = (e) => {
        setOdaName(e.target.value);
        localStorage.setItem('odaName', e.target.value);
    };
    const createNewUserAPI = () => {
        const resp = apiServices.newUser(props.user.email, odaName);
        if (resp.data.status === 200) {
            setNewUserResponse(true)
        }
    }

    return (
        <ThemeProvider>
            {alertMessage &&
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert variant="filled" severity="error">{alertMessage}</Alert>
                </Stack>
            }
            {redirect &&
                < Redirect to="/party-selection" />
            }
            <Dialog onClose={handleClose} open={createUserPopup}>
                <CssBaseline />
                <DialogTitle id="form-dialog-title">ODA NICK</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your ODA name for conneciton with your ODABOX.
                    </DialogContentText>
                    {defaultOdaName &&
                        <TextField
                            onChange={e => getOdaName(e)}

                            // autoFocus
                            defaultValue={defaultOdaName}
                            margin="dense"
                            id="name"
                            label="ODA Name"
                            type="odaName"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    }
                    {!defaultOdaName &&
                        <>
                            <TextField
                                onChange={e => getOdaName(e)}

                                // autoFocus
                                margin="dense"
                                id="name"
                                label="ODA Name"
                                type="odaName"
                                fullWidth
                            />
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                        </Button>
                                <Button onClick={createNewUserAPI} color="primary">
                                    Save
                        </Button>
                            </DialogActions>
                        </>
                    }
                </DialogContent>
                {ipList.length > 0 && newUserResponse &&
                    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {ipList.map((value) => {
                            const labelId = `checkbox-list-secondary-label-${value}`;
                            return (
                                <ListItem
                                    key={value}
                                    secondaryAction={
                                        <Checkbox
                                            edge="end"
                                            onChange={handleToggle(value)}
                                            checked={checked.indexOf(value) !== -1}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    }
                                    disablePadding
                                >
                                    <ListItemButton onClick={() => sendOdaName(checked, defaultOdaName)}>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={Logo}
                                                src={Logo}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={labelId} primary={`${value.localIp}`} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                }
            </Dialog>
        </ThemeProvider>
    );
}
const mapStateToProps = state => {
    return {
        odaName: state.odaName,
        createUserPopup: state.createUserPopup,
        odaUser: state.odaUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCreateUserPopup: createUserPopup => dispatch({ type: actionTypes.CREATE_USER_POPUP, createUserPopup }),
        setOdaName: odaName => dispatch({ type: actionTypes.SET_ODANAME, odaName })

    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)((PopupIoT)));
