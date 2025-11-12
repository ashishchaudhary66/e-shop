import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

/**
 * A reusable confirmation dialog.
 *
 * Props:
 * - open (boolean): controls visibility
 * - title (string): dialog title
 * - message (string): confirmation message
 * - confirmText (string): text for confirm button
 * - onConfirm (function): callback when confirmed
 * - onClose (function): callback when canceled/closed
 * - confirmColor (string): MUI color ("primary" | "error" | etc.)
 */
function ConfirmDialog({
  open,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  confirmColor = "primary",
  onConfirm,
  onClose,
}) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="confirm-dialog">
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={confirmColor}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
