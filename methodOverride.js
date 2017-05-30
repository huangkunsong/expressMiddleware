/**
 * Created by Huangkunsong on 2017/5/29.
 */
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
//读取请求头部X-开头的,将请求修改为指定值的请求。默认：X-HTTP-Method-Override
/*app.use(methodOverride("X-HTTP-Method-Override"));*/
//根据请求参数指定转换的请求
/*app.use(methodOverride("_method"));*/

app.get("/",function (request,response,next) {
	response.sendFile(path.join(__dirname,"methodOverride.html"))
});

app.put("/resource",function(request,response){
	console.log(request.body);
	response.end();
});

app.listen(80);