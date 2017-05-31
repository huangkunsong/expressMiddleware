/**
 * Created by Huangkunsong on 2017/5/31.
 */
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const limiter = require("express-limiter");

const app = express();
app.use(bodyParser())
app.use(multer)
app.listen(80);
