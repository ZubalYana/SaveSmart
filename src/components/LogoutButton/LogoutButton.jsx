import React, { useState } from "react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function LogoutButton({ onLogout }) {
  const [open, setOpen] = useState(false);

  function handleLogout() {
    if (onLogout) onLogout(); 
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<LogoutIcon />}
        onClick={() => setOpen(true)}
        color="error"
        className="px-4 py-2 rounded-lg hover:bg-red-100"
      >
        Log out
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} sx={{ "& .MuiDialog-paper": { padding: "10px" } }}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out? You will need to log in again to access your profile.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="error" variant="outlined" startIcon={<LogoutIcon />}>
            Log out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
