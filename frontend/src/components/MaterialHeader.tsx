import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Box,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import {
  AccountCircle,
  Delete,
  Edit,
  ExitToApp,
  VisibilityOff,
  Visibility,
} from "@mui/icons-material";

// Refactoring might be needed
const MaterialHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [displayedName, setDisplayedName] = useState(
    localStorage.getItem("name")
  );
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("NIK");
    localStorage.removeItem("expiry");
    localStorage.removeItem("name");
    window.location.href = "/";
  };

  const handleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleEditUserDialog = () => {
    setIsEdit(!isEdit);
    setShowOldPassword(false);
    setShowNewPassword(false);
  };

  const handleDeleteUserDialog = () => {
    setIsDelete(!isDelete);
  };

  const handleShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleCancelEdit = () => {
    setError("");
    setName("");
    setOldPassword("");
    setNewPassword("");
    setIsEdit(false);
  };

  const handleConfirmEdit = async () => {
    if (name.trim() === "" || oldPassword === "" || newPassword === "") {
      setError("Please fill in all fields!");
      return;
    }
    const nik = localStorage.getItem("NIK");
    const userFetch = await fetch(`http://localhost:4000/users/${nik}`, {
      method: "GET",
    });
    const user = await userFetch.json();
    const currentPass = user.password;
    const isMatchFetch = await fetch("http://localhost:4000/compare-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inputPassword: oldPassword,
        userPassword: currentPass,
      }),
    });
    const isMatch = await isMatchFetch.json();
    if (!isMatch) {
      setError("Incorrect old password!");
      return;
    }
    await fetch(`http://localhost:4000/users/${nik}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        password: newPassword,
      }),
    });
    localStorage.setItem("name", name);
    setDisplayedName(name);
    setName("");
    setOldPassword("");
    setNewPassword("");
    setError("");
    setIsEdit(false);
  };

  const handleConfirmDelete = async () => {
    const nik = localStorage.getItem("NIK");
    await fetch (`http://localhost:4000/users/${nik}`, {
      method: "DELETE",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("NIK");
    localStorage.removeItem("expiry");
    localStorage.removeItem("name");
    setIsDelete(false);
    window.location.href = "/";
  };

  const drawerContent = (
    <Box>
      <List>
        <ListItem>
          <ListItemText primary="Name" secondary={displayedName} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="NIK" secondary={localStorage.getItem("NIK")} />
        </ListItem>
        <Divider />
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleEditUserDialog}
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary="Edit" />
            <Box component="span">
              <Edit />
            </Box>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={{ textAlign: "center" }}>
            <ListItemText primary="Logout" />
            <Box component="span">
              <ExitToApp />
            </Box>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleDeleteUserDialog}
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary="Delete" />
            <Box component="span">
              <Delete />
            </Box>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const editContent = (
    <>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your desired change in name and password along with your old
          password for verification
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Name"
          value={name}
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="old-password"
          name="old password"
          label="Old Password"
          value={oldPassword}
          type={showOldPassword ? "text" : "password"}
          fullWidth
          variant="standard"
          onChange={(e) => {
            setOldPassword(e.target.value);
            setError("");
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowOldPassword} edge="end">
                  {showOldPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="new-password"
          name="new password"
          label="New Password"
          type={showNewPassword ? "text" : "password"}
          fullWidth
          variant="standard"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setError("");
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowNewPassword} edge="end">
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <div>
        {error !== "" && (
          <p style={{ marginLeft: "2px", color: "red" }}>{error}</p>
        )}
        <DialogActions>
          <Button onClick={handleCancelEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmEdit} color="success">
            Confirm
          </Button>
        </DialogActions>
      </div>
    </>
  );

  const deleteTextContent = (
    <>
      <DialogTitle>Confirm Delete User</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this account?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteUserDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </>
  );

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/materials">Materials Page</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse> */}

          <IconButton
            edge="end"
            color="inherit"
            size="medium"
            aria-label="account"
            onClick={handleDrawer}
          >
            <AccountCircle />
          </IconButton>
        </Container>
      </Navbar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawer}
        variant="temporary"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawerContent}
      </Drawer>
      <Dialog open={isEdit} onClose={handleEditUserDialog}>
        {editContent}
      </Dialog>
      <Dialog open={isDelete} onClose={handleDeleteUserDialog}>
        {deleteTextContent}
      </Dialog>
    </>
  );
};

export default MaterialHeader;
