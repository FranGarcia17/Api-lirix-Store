import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { MONGO_URI, PORT } from "./config.js";
import { router } from "./routes/app.js";
import { router as router1 } from "./routes/user.js";

const app = express();
app.use(cors());
app.use(express.json());

//Middlewares
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.get("/", (req, res) => {
  const message =
    '<h1 style="text-align: center">Welcome the most amazing API Lirix Store</h1>';
  return res.status(234).send(message);
});

app.use("/api", router);
app.use("/api", router1);

//connection to DB and run server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connect to DB");
    app.listen(PORT, () => {
      console.log(`App listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
