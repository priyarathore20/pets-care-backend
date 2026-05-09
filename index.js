import cors from "cors";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import router from "./src/routes/index.js";

dotenv.config();

const URL = process.env.DB_URL;
const PORT = process.env.PORT || 8000;

const app = express();
app.use(json());
app.use(urlencoded({ extends: true }));

app.use(cors());

app.use(helmet());

app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "The page is connected." });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.use(router);

mongoose
  .connect(URL)
  .then(() => {
    console.log("App connected to database");

    if (PORT) {
      app.listen(PORT, () => {
        console.log("app is listening to port ", PORT);
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
