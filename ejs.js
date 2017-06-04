/**
 * Created by Huangkunsong on 2017/6/3.
 */
const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "ejsViews"));

app.get("/", function (request, response) {
    response.render("index", {name : 123123123});
});

app.listen(80);
