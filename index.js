var express = require('express');
var app = express();

app.set("view engine", "ejs");
app.use("/assets", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.render("hallo");
});

app.listen(3000);
