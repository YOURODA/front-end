// import React from 'react';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import * as actionTypes from "../../store/actions/actionTypes";
// import { connect } from "react-redux";
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import APIService from '../Services/APIServices'
// const odaName = "test2"
// function CreateUserPopUp(props) {
//     const [open, setOpen] = React.useState(false);
//     const [odaName, setOdaName] = React.useState();
//     const [odaNick, setOdaNick] = React.useState();
//     const apiServices = new APIService()

//     const handleClickOpen = () => {
//         setOpen(true);
//         props.setCreateUserPopup(open)
//     };

//     const handleClose = () => {
//         setOpen(false);
//         props.setCreateUserPopup(open)
//     };
//     const getOdaName = (e) => {
//         console.log(e.target.value)
//         setOdaName(e.target.value)
//     };
//     const getOdaNick = (e) => {
//         console.log(e.target.value)
//         setOdaNick(e.target.value)
//     };
//     const createNewUserAPI = () => {
//         apiServices.newUser(props.user.email, odaName, odaNick)
//     }

//     return (
//         <div>
//             <DialogTitle id="form-dialog-title">ODA NICK</DialogTitle>
//             <DialogContent>
//                 <DialogContentText>
//                     Please enter your ODA nick for signin.
//                 </DialogContentText>
//                 <TextField
//                     onChange={e => getOdaNick(e)}
//                     autoFocus
//                     margin="dense"
//                     id="name"
//                     label="ODA Nick"
//                     type="odaNick"
//                     fullWidth
//                 />
//                 <TextField
//                     onChange={e => getOdaName(e)}
//                     autoFocus
//                     margin="dense"
//                     id="name"
//                     label="ODA Name"
//                     type="odaName"
//                     fullWidth
//                 />
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={handleClose} color="primary">
//                     Cancel
//                     </Button>
//                 <Button onClick={createNewUserAPI} color="primary">
//                     Save
//                     </Button>
//             </DialogActions>
//         </div>
//     );
// }
// const mapStateToProps = state => {
//     return {
//         createUserPopup: state.createUserPopup,
//         user: state.current_user,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         setCreateUserPopup: createUserPopup => dispatch({ type: actionTypes.CREATE_USER_POPUP, createUserPopup })
//     };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(CreateUserPopUp);
