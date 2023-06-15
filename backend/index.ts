import express from "express";
import router from "./routes/index.router";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(router);


app.listen(4000);
console.log("Server on port", 4000);
