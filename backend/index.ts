import express from "express";
import router from "./routes/login.router";
import cors from "cors";
import materialRouter from "./routes/material.router";

const app = express();

// Middleware for users
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(router);


app.listen(4000);
console.log("User server on port", 4000);


const appMaterial = express();

// Middleware for material data
appMaterial.use(express.json());
appMaterial.use(cors());
appMaterial.use(express.urlencoded({ extended: false }));
appMaterial.use(materialRouter);

appMaterial.listen(4001);
console.log('Material server on port', 4001);