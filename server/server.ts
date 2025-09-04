import express, { Application } from "express";
import { loginUser } from "./login.route";

import bodyParser from "body-parser";
import cors from "cors";

const app: Application = express();

// app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: true }));

app.route("/api/login").post(loginUser);

const httpServer = app.listen(9000, () => {
  const addr = httpServer.address();
  const port = typeof addr === "object" && addr !== null ? addr.port : 9000;
  console.log("HTTP REST API Server running at http://localhost:" + port);
});
