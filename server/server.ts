import express, { Application } from "express";
import { loginUser } from "./login.route";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.route("/api/login").post(loginUser);

app.listen(9000, () => {
  console.log("HTTP REST API Server running at http://localhost:9000");
});
