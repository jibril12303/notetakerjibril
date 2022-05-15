const express = require("express");
const noteRouter = require('./routers/note')
const staticRouter = require("./routers/static");



const app = express();
app.use(express.json()) // for parsing application/json
//  to server static assets
app.use(express.static("public"));

// note routes GET,POST,DELETE
app.use(noteRouter)
app.use(staticRouter)

app.listen(9000, () => {
  console.log("app is running on port 4000");
});
