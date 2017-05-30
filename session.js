/**
 * Created by Huangkunsong on 2017/5/29.
 */
const express = require("express");
/**
 * 1.15版本后不在依赖cookie-parser
 * @type {session}
 */
const session = require("express-session");
/**
 * 用于将session持久化到mongoDB数据库
 */
const MongoStore = require("connect-mongo")(session);


const app = express();
app.use(session({
    //session ID加密密匙
    secret : "12345",
    //这是cookie 默认值
    /*cookie : { path: '/', httpOnly: true, secure: false, maxAge: null }*/
    cookie : {
        maxAge : 60000, //session 有效期
    },
    name : "aaa",  //设置cookie名称,默认connect.sid
    genid : function (request) {
        return "123123";
    }, //用于生成sessionId,默认使用UUID
    //指定session存储的地方,默认是MemoryStore,即内存中。可以在这指定数据库存储
    store : new MongoStore({
        url : "mongodb://localhost:27017/examples",
    }),
}));

app.get("/", function (request, response){
    //session保存在request.session
    console.dir(request.session.count);
    //设置session内容
    request.session.count++;
    /**
     * 销毁session
     * request.session.destroy();
     */
    response.end("hello Word");
});

app.listen(80);
