
/**
 * Created by Huangkunsong on 2017/5/28.
 */
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");

const app = express();
const logFile = fs.createWriteStream(path.join(__dirname,"logFile.log"),{flag : 'a'});

/**
 * 设置记录请求内容
 * morgan(format,options)
 *  format：指定日志输出格式
 *  options：
 *          stream：指定日志的输出,默认为process.stdout
 *          skip：跳过日志记录
 *          immediate：布尔值,true,收到请求就记录日志,false,返回日志后再记录
 * morgan提供了各种预定于的格式
 *      combined：标准的Apache组合日志输出
 *      common：标准Apache常用日志输出
 *      dev：开发，添加了色彩，
 *      short：简短的输出，包含响应时间
 *      tiny：最小输出
 * 自定义输出格式
 *      :date[format]   日期[格式],clf,iso,web。ISO比较类似yyyy-mm-ddT hh:mi:ss格式
 *      :http-version   http版本
 *      :method     请求方式
 *      :referrer
 *      :remote-addr     请求的IP地址
 *      :remote-user
 *      :req[header]
 *      :response-time  请求耗时
 *      :status
 *      :url
 *      :user-agent
 *      @example
 *          morgan(':method :url :status :res[content-length] - :response-time ms')
 *  format：定义输出格式morgan.format('zdy',":date[iso] :method")
 *          使用:app.use(morgan('zdy'));
 *  token：即自定义一种输出格式如：
 *          morgan.token('from', function(req, res){
 *			    return req.query.from || '-';
 *			});
 *		   使用：morgan(":date[iso] :from");
 */

//使用morgan设定的格式
/*app.use(morgan("combined"));*/
//自定义输出格式
/*app.use(morgan(":date[iso] :remote-addr  :method :remote-user :status :url :referrer"));*/
//输出到文件
/*app.use(morgan('combined',{stream : logFile}));*/

/**
 * 按日期,文件大小控制输出的日志文件,如每天打包一次日志文件
 */
/*
const stream = rfs('logFile.log',{
	size : "10M",
	interval : "1d",
	compress : "gzip",
	path : __dirname + "/log/"
});
*/
function pad(num) {
	return (num > 9 ? "" : "0") + num;
}

/**
 * 控制log文件名,根据日期归类文件夹和文件名
 */
function generatorFileName(time,index = 1){
	time = time ||  new Date();
	const month  = time.getFullYear() + "" + pad(time.getMonth() + 1);
	const day    = pad(time.getDate());
	const hour   = pad(time.getHours());
	const minute = pad(time.getMinutes());
	
	return  month + "/" + month +
			day + "-" + hour + minute + "-" + index + "-file.log";
}
const stream = rfs(generatorFileName,{
	size : "10M",
	interval : "1d",
	compress : "gzip",
	path : path.join(__dirname,"log")
});

app.use(morgan("combined",{stream : stream}));

app.get("/",function (request,response,next) {
	response.sendFile(__dirname +  "/index.html");
});



app.listen(80,"localhost")