/**
 * Created by Huangkunsong on 2017/5/30.
 */
const express = require("express");
const directory = require("serve-index");
const path = require("path");


const app = express();
/**
 * static为express4唯一保留的中间件
 * 用于设置请求静态文件时,直接返回。
 * 请求时不必加上的静态文件目录
 * 也可以为静态文件目录指定一个虚拟目录,用于请求
 * 直接请求目录时会返回目录下的index.html文件
 * index = false 设置请求目录不返回index.html
 */
app.use(express.static(path.join(__dirname, "public"), {index : false}));
app.use("/static", express.static(path.join(__dirname, "public"), {index : false}));

/**
 * 设置请求路径为/static时,可以显示public文件夹下的所有文件
 * 点击文件显示文件内容需要和static配合使用
 * icons：目录下的文件显示图标
 * filter ： 函数,返回boolean控制显示的文件
 */
app.use("/static", directory(path.join(__dirname, "public"), {
    icons : true,
    filter : function (fileName, index, files, dir) {
        console.log(arguments);
        return index < 1;
    }
}));

app.use(function (err, request, response, next) {
    console.log("aaaaa")
    response.end(err.message);
});

app.listen(80);
