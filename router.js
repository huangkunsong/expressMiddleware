/**
 * Created by Huangkunsong on 2017/5/29.
 */
const express = require("express");
const userRouter = require("./user/userRouter");
const app = express();
/**
 * 所有/user的请求都转发给user路由处理
 * 路由相当于一个mini app,app有的方法路由对象都有
 * 可以针对具体业务划分不同的路由
 */
app.use("/user",userRouter);

app.get("/a",function (request,response,next) {
	console.log(request.query);
	response.end("Hello Word!");
});

app.listen(80);