/**
 * Created by Huangkunsong on 2017/5/29.
 */
const express = require("express")
const router = express.Router();
/**
 * 所有请求为/user/getUser的请求都会被这个路由处理
 */
router.get("/getUser",function(request,response,next){
	response.end("User");
});
//所有请求为/user/user/xxxx的请求都会被这个路由处理
//值为保存在params中
router.get("/user/:id",function(request,response,next){
	console.log(request.params);
	response.end("User Id");
});
//所有路径中有:id的都会先经过这个路由处理,id为实际传的值
//router.param(["id",'name'],function(){})拦截id和name
router.param("id",function (request,response,next,id) {
	console.log(id);
	next();
});

module.exports = router;