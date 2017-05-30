/**
 * Created by Huangkunsong on 2017/5/28.
 */
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path")

const app = express();
//使用cookieParser读取cookie,解析后的cookie保存在request.cookies中
app.use(cookieParser());

//若需要使用签名，需要指定一个secret,字符串,否者会报错.读取的cookie保存在request.signedCookies
/*app.use(cookieParser("签名"));*/

app.get("/",function (request,response,next) {
	//打印读取到的cookie
	console.dir(request.cookies);
	/**
	 * 设置cookie
	 * cookie(key,value,options)
	 * options :　｛
	 *      domain : 指定cookie在什么域名下有用,默认是当前网站域名
	 *      expires :　设置cookie过期日期,0为浏览器关闭就失效
	 *      httpOnly : boolean值,只能在web使用
	 *      maxAga：与expires一样
	 *      path：指定cookie在什么路径下有用
	 *      secure：只能被https使用
	 *      signed：使用签名,默认false`express会使用req.secret来完成签名，需要cookie-parser配合使用`
	 * ｝
	 */
	response.cookie("name","张三",{maxAge : new Date()});
	/**
	 * 删除cookie
	 */
	/*response.clearCookie("name");*/
	response.sendFile(path.join(__dirname,"index.html"));
});

app.listen(80,"localhost");