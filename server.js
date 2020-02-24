const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(_dirname + "/dist/news"));
app.get("/*", function(req, res) {
  res.sendFile(path.join(_dirname + "/dist/news.html"));
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server started!");
});
