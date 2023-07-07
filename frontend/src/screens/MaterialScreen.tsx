import React, { useEffect, useState } from "react";
import MaterialHeader from "../components/MaterialHeader";
import { Button } from "@mui/material";
import DisplayComp from "../components/DisplayComp"; //The box for each material type-specific
import AddNewMaterial from "../components/AddNewMaterial";

const MaterialScreen = () => {
  const [basicDisplay, setBasicDisplay] = useState<JSX.Element[]>([]);

  const handleDelete = (idArr: string) => {
    setBasicDisplay((prevDisplay) => {
      const updatedDisplay = prevDisplay.filter(
        (disp) => disp.props.idArr !== idArr
      );
      return updatedDisplay;
    });
  };

  const listIds = async (): Promise<Number[]> => {
    const response = await fetch("http://localhost:4001/materials/get/ids", {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchIds = async () => {
      try {
        const ids = await listIds();
        const displayComponents = ids.map((id) => (
          <DisplayComp idArr={id.toString()} onDelete={handleDelete} />
        ));
        setBasicDisplay(displayComponents);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchIds();
  }, []);

  return (
    <div>
      <MaterialHeader />
      {basicDisplay.map((display) => (
        <React.Fragment key={display.props.idArr}>{display}</React.Fragment>
      ))}
      <AddNewMaterial
        basicDisplay={basicDisplay}
        setBasicDisplay={setBasicDisplay}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MaterialScreen;
