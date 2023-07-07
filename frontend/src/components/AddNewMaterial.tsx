import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState, SyntheticEvent } from "react";
import DisplayComp from "./DisplayComp"; //The box for each material type-specific

type props = {
  basicDisplay: JSX.Element[];
  setBasicDisplay: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
  onDelete: (idArr: string) => void;
};

const AddNewMaterial: React.FC<props> = ({
  basicDisplay,
  setBasicDisplay,
  onDelete,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [id, setId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");

  const handleAddNewClick = () => {
    setShowConfirmation(true);
  };

  const handleCancelAdd = () => {
    setShowConfirmation(false);
  };

  const handleSubmitAdd = async (e: SyntheticEvent) => {
    e.preventDefault();
    const userNik = localStorage.getItem("NIK");
    if (id === "" || description === "" || itemName === "") {
      alert("Please fill in all fields.");
      return;
    }
    const responseOne = await fetch("http://localhost:4001/materials/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        id: id,
        name: itemName,
        user_nik: userNik,
      }),
    });
    if (responseOne.status === 400) {
      alert("ID already exists.");
      return;
    }
    await fetch("http://localhost:4001/materials/edit/description", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        id: id,
        description: description,
      }),
    });

    setBasicDisplay([
      ...basicDisplay,
      <DisplayComp idArr={id} onDelete={onDelete} />,
    ]);
    setShowConfirmation(false);

    setId("");
    setDescription("");
    setItemName("");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button
        variant="contained"
        color="success"
        onClick={handleAddNewClick}
        style={{ marginTop: "10px", marginBottom: "30px" }}
      >
        Add Material
      </Button>
      <Dialog open={showConfirmation} onClose={handleCancelAdd}>
        <DialogTitle>Add New Material</DialogTitle>
        <DialogContent>
          <DialogContentText
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") {
              handleSubmitAdd(e);
            } else {
              e.stopPropagation();
            }
          }}>
            This new item will be added to the database.
            <div/>
            <TextField
              id="id"
              name="id"
              label="ID"
              type="number"
              size="small"
              onChange={(e) => setId(e.target.value)}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx = {{marginTop: "13px"}}
              onKeyDown={(evt) =>
                ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
              } // prevents e, E, +, - in input
            />
            <TextField
              id="description"
              name="description"
              label="Description"
              type="text"
              size="small"
              multiline
              rows={4}
              sx={{ width: "4in", marginTop: "13px", marginBottom: "10px"}}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="itemName"
              name="itemName"
              label="Item Name"
              type="text"
              size="small"
              onChange={(e) => setItemName(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelAdd} color="error">
            Cancel
          </Button>
          <Button onClick={handleSubmitAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNewMaterial;
