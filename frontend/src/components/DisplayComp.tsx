import { TextField, Box } from "@mui/material";
import React, { useState } from "react";
import DialogComp from "./DialogComp";
import MaterialListComp from "./MaterialListComp";

type props = {
  idArr: string;
  onDelete: (idArr: string) => void;
};

const DisplayComp: React.FC<props> = ({ idArr, onDelete }) => {
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        marginTop: "20px",
      }}
    >
      <Box
        component="form"
        sx={{
          width: "800px",
          padding: "20px",
          border: "2px solid black",
          borderRadius: "5px",
          boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.1)",
          backgroundColor: "antiquewhite",
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ marginTop: "10px" }}>
          <TextField
            id="outlined-number"
            name="id"
            label="ID"
            type="number"
            value={id}
            size="small"
            onChange={handleIdChange}
            sx={{ backgroundColor: "white" }}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            onKeyDown={(evt) =>
              ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
            } // prevents e, E, +, - in input
          />
          <DialogComp idArr={idArr} onDelete={onDelete} />
        </div>
        <div style={{ marginTop: "13px", marginBottom: "10px" }}>
          <TextField
            id="outlined-multiline-static"
            name="description"
            label="Description"
            size="small"
            multiline
            rows={4}
            value={description}
            sx={{ width: "4in", backgroundColor: "white" }}
            onChange={handleDescriptionChange}
          />
        </div>
        <MaterialListComp />
      </Box>
    </div>
  );
};

export default DisplayComp;
