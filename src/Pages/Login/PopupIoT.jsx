import React, { useState, useEffect } from "react";
import {
    Button, TextField, DialogActions, DialogContent, DialogContentText, DialogTitle,
    List, ListItem, ListItemText, ListItemAvatar, Avatar, Dialog, ListItemButton, Checkbox
} from '@mui/material';
import * as actionTypes from "../../store/actions/actionTypes";
import { connect } from "react-redux";
import APIService from '../../Components/Services/APIServices'
import Logo from '../../images/odaLogo.png'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


export const PopupIoT = (props) => {
    const { createUserPopup, user, setCreateUserPopup } = props
    const [open, setOpen] = useState(false);
    const [odaName, setOdaName] = useState();
    const [defaultOdaName, setDefaultOdaName] = useState('');
    const [ipList, setIpList] = useState([]);
    const [checked, setChecked] = useState([1]);
    const [newUserResponse, setNewUserResponse] = useState(false)
    const apiServices = new APIService()
    useEffect(() => {
        const getOda = apiServices.myOdas(user);
        getOda.then(response => {
            console.log("response.data", response.data)
            if (response.data.odas) {
                setDefaultOdaName(response.data.odas.odaName);
                setNewUserResponse(true)
                console.log("defaultOdaName", defaultOdaName)
            }
        })
        apiServices.loginRaspi(setIpList, ipList);
    }, [])
    console.log("ipList", ipList[0])

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
    const sendOdaName = (raspiIp, defaultOdaName) => {
        apiServices.recognizeRaspi(raspiIp, defaultOdaName).then(response => {
            console.log("response", response);
            if (response && response.status === 200) {
                console.log("raspii", response.data)
                window.location = "/party-selection"

            }
        })
    }

    const handleClose = () => {
        setOpen(false);
        setCreateUserPopup(open)
    };
    const getOdaName = (e) => {
        setOdaName(e.target.value)
    };
    const createNewUserAPI = () => {
        const resp = apiServices.newUser(props.user.email, odaName);
        if (resp.data.status === 200) {
            setNewUserResponse(true)
        }
    }

    return (
        <ThemeProvider>
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
                            console.log("value", value)
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
                                    <ListItemButton onClick={() => sendOdaName(value.localIp, defaultOdaName)}>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={Logo}
                                                src={Logo}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={labelId} primary={`Line item ${value.localIp}`} />
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
        createUserPopup: state.createUserPopup,
        user: state.current_user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCreateUserPopup: createUserPopup => dispatch({ type: actionTypes.CREATE_USER_POPUP, createUserPopup })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PopupIoT);
