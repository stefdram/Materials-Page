import React from "react";
import { Box, Typography } from "@mui/material";

const HomeScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "78vh",
        background: "linear-gradient(to bottom, #f0f0f0, #d8d8d8)", // Background gradient for the home screen
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold", mb: 4 }}>
        Home screen
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 4, textAlign: "center", maxWidth: 500 }}
      >
        Please login to gain access to the material data page.
      </Typography>
    </Box>
  );
};

export default HomeScreen;
