/**
 * Created by Huangkunsong on 2017/5/29.
 */
const express = require("express")
const responseTime = require("response-time");

const app = express();
/**
 * 在响应的头信息中添加X-Response-Time字段表示响应时间
 */
app.use(responseTime());

app.get("/", function (request, response) {
    response.end("hello word!");
});

app.listen(80);
