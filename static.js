/**
 * Created by Huangkunsong on 2017/5/30.
 */
const express = require("express");
const path = require("path");

const app = express();
/**
 * static为express4唯一保留的中间件
 * 用于设置请求静态文件时,直接返回。
 * 请求时不必加上的静态文件目录
 * 也可以为静态文件目录指定一个虚拟目录,用于请求
 * 直接请求目录时会返回目录下的index.html文件
 */
app.use(express.static(path.join(__dirname, "public")));
app.use("/static", express.static(path.join(__dirname, "public")));
app.listen(80);
