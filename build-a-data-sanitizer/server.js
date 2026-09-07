const path = require("path");
const express = require("express");
const { inputCleaner, inputValidator } = require("./middleware");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/form");
});

app.get("/form", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

app.use(express.static(path.join(__dirname, "public")));

app.post("/submit", inputCleaner, inputValidator, (req, res) => {
  res.send(
    `Username: ${req.body.username}, Comment: ${req.body.comment}`,
  );
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
