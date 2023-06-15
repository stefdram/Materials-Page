import React, { useState } from "react";
import MaterialHeader from "../components/MaterialHeader";
import { Button } from "@mui/material";
import DisplayComp from "../components/DisplayComp"; //The box for each material type-specific

const MaterialScreen = () => {
  const handleDelete = (idArr: string) => {
    setBasicDisplay((prevDisplay) => {
      const updatedDisplay = prevDisplay.filter(
        (disp) => disp.props.idArr !== idArr
      );
      return updatedDisplay;
    });
  };

  const [basicDisplay, setBasicDisplay] = useState<JSX.Element[]>([
    <DisplayComp idArr={Math.random().toString()} onDelete={handleDelete} />,
  ]);

  const handleAddButtonClick = () => {
    const randomInt = Math.random().toString();
    setBasicDisplay([
      ...basicDisplay,
      <DisplayComp idArr={randomInt} onDelete={handleDelete} />,
    ]);
  };

  return (
    <div>
      <MaterialHeader />
      {basicDisplay.map((display) => (
        <React.Fragment key={display.props.idArr}>{display}</React.Fragment>
      ))}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleAddButtonClick}
          style={{ marginTop: "10px", marginBottom: "30px" }}
        >
          Add Material
        </Button>
      </div>
    </div>
  );
};

export default MaterialScreen;
