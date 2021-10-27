import React, { useState } from "react";
import { Slide, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField, Button, InputAdornment, IconButton } from "@mui/material"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Signup({ open, setOpen }){
    const [ signupData, setSignupData ] = useState({
        email: '',
        name: '',
        password:'',
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        setSignupData({ ...signupData, [id] : value }) 
    }

    const signUp = () => {
        setOpen(false);
        setSignupData({ email: '', name: '', password:'' })
    }

    const goSignIn = () => {
        setOpen(false);
        setSignupData({ email: '', name: '', password:'' })
    }

    const handleClose = () => {
        setOpen(false);
        setSignupData({ email: '', name: '', password:'' })
    };

    return (
        <div>
        <Dialog sx={{ margin:0 }} open={open} TransitionComponent={Transition} onClose={handleClose}>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nickname"
                type="text"
                fullWidth
                variant="standard"
                color="warning"
                onChange={handleChange}
                value={signupData.name}
                sx={{ marginBottom:2 }}
            />
            <TextField
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                color="warning"
                value={signupData.email}
                onChange={handleChange}
                sx={{ marginBottom:2 }}
            />
            <TextField
                margin="dense"
                id="password"
                label="Password"
                type='password'
                value={signupData.password}
                onChange={handleChange}
                fullWidth
                variant="standard"
                color="warning"
            />
            {/* <TextInputField
                autoFocus
                margin="dense"
                id="passwordconfirm"
                label="Password Confirm"
                type="password"
                fullWidth
                type='password'
                value={signupData.passwordConfirm}
                onChange={handleChange}
                variant="standard"
                color="warning"
            /> */}
            </DialogContent>
            <DialogActions>
            <Button color="secondary" onClick={goSignIn}>Cancel</Button>
            <Button color="warning" onClick={signUp}>Sign Up</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}