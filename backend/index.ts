import express from "express";
import router from "./routes/login.router";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(router);


app.listen(4000);
console.log("Server on port", 4000);


// const appFrontend = express();
// appFrontend.use(express.static('../frontend/src/index.tsx'));
// appFrontend.use(cors()); // Enable CORS for the frontend server
// appFrontend.listen(3000);
// console.log("Frontend on port", 3000);