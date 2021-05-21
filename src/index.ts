import express from "express";
import "dotenv/config";
import cors from "cors";
import { todoRouter } from "./routes/todo";
import mongoose from "mongoose";
import { userRouter } from "./routes/user";
import { clientRouter } from "./routes/client";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(todoRouter);
app.use(userRouter);
// app.use(clientRouter);

if (process.env.DEBUG === "nodejs-project") {
  mongoose.set("debug", true);
}

mongoose.set("useCreateIndex", true);
mongoose.connect(
  "mongodb://localhost/node-project",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error(
        "Unable to connect to the server. Please start the server. Error:",
        err
      );
    } else {
      console.log("Connected to Mongo Server");
    }
  }
);

app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}`)
);
