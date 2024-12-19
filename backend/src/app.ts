import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./database/connectToDB";
//import { runScript } from "./services/insertJsonToDB";
import GTRouter from "./routes/GlobalTerrorismRoute";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;

connectToDB();

//runScript();

// Routes

app.use("/api/analysis", GTRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});