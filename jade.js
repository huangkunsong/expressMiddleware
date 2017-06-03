/**
 * Created by Huangkunsong on 2017/6/1.
 */
const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "jade");

app.set("views", path.join(__dirname, "jadeViews"));

app.get("/", function (request, response, next) {
    response.render("index", {pageTiele : "JADE"});
});

app.listen(80);
