const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const items = require("./routes/api/items");
app.use(bodyParser.json());

//DB key
const db = require("./config/keys").mongoURI;

//connect to db
mongoose
  .connect(db)
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((err) => console.log(err));

app.use("/api/items", items);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("/client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
