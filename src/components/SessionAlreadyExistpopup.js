import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function SessionAlreadyExist({ isOpen, setIsOpen }) {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Session Already Exist"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your Session already exist in another browser. Do you want to
            continue your session here and logout from other session?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Nope</Button>
          <Button onClick={handleClose} autoFocus>
            Continue here
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
