/* eslint-disable no-irregular-whitespace */
/**
 * Created by Huangkunsong on 2017/5/22.
 */
const express = require("express");
const bodyParser = require("body-parser");

/**
 * multer中间件只处理请求enctype="multipart/form-data"请求数据
 */
const multer = require("multer");

const app = express();

//设置请求后的文件保留地址，默认base64生成文件名且不带后缀
/*const upload = multer({ dest: 'uploads/' });*/

const storage = multer.diskStorage({
	//设置上传的保存路径
    destination : function (request, file, cb){
        cb(null, "./uploads");
    },
	//设置上传保存的文件名
    filename : function (request, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + "-" + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    },
});
var upload = multer({
    storage : storage,
});

//只处理上传单个文件的请求,且字段为file
app.use("/uploads", upload.single("file"));

//只处理上传多个文件的请求,且字段为files
app.use("/uploads", upload.array("files", 5));

/**
 * 解析application/x-www-form-urlencoded 媒体类型请求,如前端form表单
 * {
 *      extended : 设置解析URL参数的方式,false=querystring.true=qs
 *      limit :  限制请求数据的大小.默认100KB
 *      inflate : 默认true,对数据进行解压缩
 *      type ： 设置中间件解析的媒体类型,默认application/x-www-form-urlencoded
 *      parameterLimit : 设置URL中最大参数数量,最大1000,超过以413状态返回客户端
 * }
 */
app.use(bodyParser.urlencoded({ extended : false }));

/**
 * 解析application/json媒体类型
 * {
 *      inflate ：一样
 *      limit　：一样
 *      reviver :参数用于传入JSON.parse函数第二个参数
 *      strict ：如果设置为true,那么只会接受array或者
 *              object。false表示接受任何JSON.parse接受的参数
 *      encoding ：请求的编码类型
 * }
 */
app.use(bodyParser.json());//添加json解析器

app.get("/", function (request, response, next){
    response.sendFile(__dirname + "/index.html");
});

app.post("/uploads", function (request, response){
    response.send("上传成功");
});
//POST请求直接在request.body获取提交数据
app.post("/post", function (request, response){
    console.dir(request.body);
    response.end("Success");
});
//GET提交直接在request.query中可以获得提交的数据
app.get("/get", function (request, response){
    console.dir(request.query);
    response.end("AAAA");
});

app.listen(80, "localhost");
