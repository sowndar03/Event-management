import express from "express";
import cors from "cors";
import {router} from './src/routes/routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  res.send("App is running");
});

export default app;