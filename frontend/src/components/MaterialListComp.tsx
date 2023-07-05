import React, { useEffect, useState } from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CollectionsIcon from "@mui/icons-material/Collections";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MenuIcon from "@mui/icons-material/Menu";

type props = {
  id: string;
};

const MaterialListComp: React.FC<props> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [addList, setAddList] = useState(false);
  const [itemName, setItemName] = useState("");
  const [materialList, setMaterialList] = useState<string[]>([]);
  const [openMenuList, setOpenMenuList] = useState<(null | HTMLElement)[]>([]);
  const [openEdit, setOpenEdit] = useState(false);

  const listItems = async () => {
    const response = await fetch(
      `http://localhost:4001/materials/${Number(id)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    setMaterialList(data.map((item: any) => item.name));
  };

  useEffect(() => {
    listItems();
  }, [id]);

  const handleOpenClick = () => {
    setOpen(!open);
  };

  const handleCancelClick = () => {
    setAddList(!addList);
  };

  const handleOpenMenuList = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const newOpenMenuList = [...openMenuList];
    newOpenMenuList[index] = event.currentTarget;
    setOpenMenuList(newOpenMenuList);
  };

  const handleCloseMenuList = (index: number) => {
    const newOpenMenuList = [...openMenuList];
    newOpenMenuList[index] = null;
    setOpenMenuList(newOpenMenuList);
  };

  const handleOpenEdit = (index: number) => {
    setItemName(materialList[index]);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleEditItem = (index: number) => {
    if (itemName === "") {
      alert("Please enter a name for the item");
      return;
    }
    setMaterialList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index] = itemName.toLowerCase();
      return updatedList;
    });
    setItemName("");
    handleCloseEdit();
    handleCloseMenuList(index);
  };

  const handleDeleteItem = (index: number) => {
    setMaterialList((prevList) => {
      const updatedList = [...prevList];
      updatedList.splice(index, 1);
      return updatedList;
    });

    handleCloseMenuList(index);
  };

  const handleAddList = () => {
    if (itemName === "") {
      alert("Please enter a name for the item");
      return;
    }
    setMaterialList([...materialList, itemName.toLowerCase()]);
    setItemName("");
    setAddList(false);
  };

  const handleDialogKeyDown = (
    event: React.KeyboardEvent,
    action: Function,
    index?: number
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation(); // Stop event propagation
      if (index !== undefined) {
        action(index);
      } else {
        action();
      }
    }
  };

  return (
    <>
      <ListItemButton
        onClick={handleOpenClick}
        sx={{ backgroundColor: "white" }}
      >
        <ListItemIcon>
          <CollectionsIcon />
        </ListItemIcon>
        <ListItemText primary="Material List" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {materialList.length !== 0 && (
          <Typography
            variant="h6"
            sx={{ pl: 6.5, marginTop: "10px" }}
            component="ol"
          >
            {materialList.map((item, index) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: 20,
                }}
              >
                <li>{item}</li>
                <IconButton
                  size="small"
                  id={`menu-button-${index}`}
                  aria-haspopup="true"
                  onClick={(event) => handleOpenMenuList(event, index)}
                >
                  <MenuIcon fontSize="inherit" />
                </IconButton>
                <Menu
                  id={`menu-${index}`}
                  anchorEl={openMenuList[index]}
                  open={Boolean(openMenuList[index])}
                  onClose={() => handleCloseMenuList(index)}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={() => handleOpenEdit(index)}>
                    Edit
                  </MenuItem>
                  <Dialog
                    open={openEdit}
                    onClose={handleCloseEdit}
                    onKeyDown={(e) =>
                      handleDialogKeyDown(e, handleEditItem, index)
                    }
                  >
                    <DialogTitle>Edit Item</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        This edited item will be automatically updated in the
                        database.
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={materialList[index]}
                        onChange={(e) => setItemName(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent) => {
                          if (e.key === "Enter") {
                            handleEditItem(index);
                          } else {
                            e.stopPropagation();
                          }
                        }}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseEdit}>Cancel</Button>
                      <Button onClick={() => handleEditItem(index)}>
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <MenuItem onClick={() => handleDeleteItem(index)}>
                    Delete
                  </MenuItem>
                </Menu>
              </div>
            ))}
          </Typography>
        )}
        {materialList.length === 0 && (
          <Typography variant="h6" sx={{ marginTop: "10px" }} component="ol">
            No items in the list
          </Typography>
        )}

        <ListItemButton
          sx={{ pl: 4 }}
          onClick={handleCancelClick}
          color="success"
        >
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Add" />
        </ListItemButton>
        <Dialog
          open={addList}
          onClose={handleCancelClick}
          onKeyDown={(e) => handleDialogKeyDown(e, handleAddList)}
        >
          <DialogTitle>Enter name of Item</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Item entered will be added to the database.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setItemName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelClick}>Cancel</Button>
            <Button onClick={handleAddList}>Add</Button>
          </DialogActions>
        </Dialog>
      </Collapse>
    </>
  );
};

export default MaterialListComp;
