/**
 * Created by Huangkunsong on 2017/5/24.
 */
const basicAuth = require('basic-auth');
const express = require('express');

const app = express();

app.use(function(request,response,next){
	var user = basicAuth(request) || {};
	if(user.name !== 'test' && user.passWord !== 123) {
		response.set('WWW-Authenticate', 'Basic realm=Input User&Password');
		return response.sendStatus(401);
	}else{
		next();
	}
});

app.get("/",function(request,response,next){
	response.end("Hello Word");
})

app.listen(80,'localhost');