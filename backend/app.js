const express = require("express");
const cors = require("cors");
const mintRoute = require("./routes/mintRoute");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/", mintRoute);

app.get("/", async (req, res) => {
  try {
    res.status(200).json({ message: "Server is Live!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
