import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

type props = {
  idArr: string;
  onDelete: (idArr: string) => void;
};

const DialogComp: React.FC<props> = ({ idArr, onDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    // Perform deletion logic here
    onDelete(idArr);
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <IconButton
        onClick={handleDeleteClick}
        color="error" 
        sx={{ marginLeft: "490px", position: "sticky"}}  
      >
        <Delete />
      </IconButton>
      <Dialog open={showConfirmation} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this material?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogComp;
