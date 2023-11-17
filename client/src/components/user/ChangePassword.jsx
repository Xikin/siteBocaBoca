import { updatePassword } from "../../actions/user";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import { useValue } from "../../context/ContextProvider";

const ChangePasswordDialog = () => {
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const {state: { currentUser }, dispatch,} = useValue();
  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
  };

  const handleOpenPasswordDialog = () => {
    setOpenPasswordDialog(true);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    const newPassword = newPasswordRef.current.value;
    const confirmNewPassword = confirmNewPasswordRef.current.value;
    
    if(newPassword !== confirmNewPassword) {
      // handle error
      return;
    }
    
    updatePassword(currentUser.id, newPassword, dispatch);
  };

  return (
    <>
      <DialogActions sx={{ justifyContent: 'start', px: '19px' }}>
        <Button size="small" onClick={handleOpenPasswordDialog}>Esqueceu a senha?</Button>
      </DialogActions>

      <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog}>
        <DialogTitle>Esqueceu a Senha?</DialogTitle>
        <form onSubmit={handleSubmitPassword}>
          <DialogContent dividers>
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="newPassword"
              label="New Password"
              type="password"
              fullWidth
              inputRef={newPasswordRef}
              required
            />
            <TextField
              margin="normal"
              variant="standard"
              id="confirmNewPassword"
              label="Confirm New Password"
              type="password"
              fullWidth
              inputRef={confirmNewPasswordRef}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained">Update Password</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ChangePasswordDialog;