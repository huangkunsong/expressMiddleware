/**
 * Created by Huangkunsong on 2017/5/30.
 */
const express = require("express");
const errorHandler = require("errorhandler");
const notifier = require("node-notifier");
const app = express();

app.get("/index", function (req, res) {
    //s未定义会触发异常
    s;
    res.end("asdasd");
});

function errorNotification (err, str, req) {
    if (err){
        console.log(err);
    }
    var title = "Error in " + req.method + " " + req.url;
    notifier.notify({
        title : title,
        message : str,
    });
}

/*if (process.env.NODE_ENV === "development") {
    // only use in development
    app.use(errorHandler({log : errorNotification}));
}*/
/**
 * 触发异常时,将会触发该方法。需要写4个参数传会认定是异常处理方法
 * 与中间件使用方式一致,第一个参数为error对象
 */
app.use(function (err, request, response, next) {
    console.log(err);
    response.send("error");
});

app.listen(80);
