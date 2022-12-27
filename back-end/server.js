const express = require("express");
const cors = require("cors");
const fs = require("fs");
const util = require("util");
const stream = require("stream");
const path = require("path");
const { downloadFile } = require("./helper");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/upload", async (req, res) => {
  try {
    const fileName = "test-upload";
    const pipeline = util.promisify(stream.pipeline);
    await pipeline(req, fs.createWriteStream(fileName));
    res.status(200).json({ name: fileName });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/download", async (req, res) => {
  try {
    const fileName = "uploadTest.txt";
    const filePath = path.join(process.cwd(), fileName);

    res.setHeader("Content-Disposition", `attachment;filename=${fileName}`);

    downloadFile(filePath, res);
  } catch (error) {
    res.status(500).json({ error });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
