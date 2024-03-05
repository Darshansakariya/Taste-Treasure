import express from "express";

const app = express();
const port = 3030;

app.get("/", (req, res) => {
  res.send("Deep Shah");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
