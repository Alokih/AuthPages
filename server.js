const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `MongDB connected & server started at PORT: ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
