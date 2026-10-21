const express = require("express");
const cors = require("cors");
const translateText = require("./models/translate");
const app = express();
const port = 3000;

const { Translate } = require("./models/translate");

Translate.getInstance().then(() => {
  console.log("Translation instance initialized");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/translate", async (req, res) => {
  const { text } = req.body;

  const translatedText = await Translate.translateText(text);

  res.send(translatedText[0].translation_text);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
