/**
 * Created by Huangkunsong on 2017/6/4.
 */
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");
const fs = require("fs");

const server = http.createServer(function (request, response){
    response.writeHead(200, {"Content-type" : "text/html"});
    response.end(fs.readFileSync(path.join(__dirname, "../socket.html")));
});

server.listen(80);

const io = socketIO.listen(server);
let startDate;
io.on("connection", function (socket) {
    console.log("客户端建立连接.");
    startDate = new Date();
    socket.on("message", function (msg) {
        console.log("服务端收到消息：" + msg);
        socket.send("服务端发送消息：hello");
    });

    socket.on("disconnect", function () {
        console.log("客户端断开连接");
        console.log((new Date()).getTime() - startDate.getTime());
    });

    socket.on("news", function (data, callback) {
        console.log("服务端news事件,数据:" + data);
    });

    socket.emit("news", JSON.stringify(["张三", {a : "李四"}]), function (data) {
        console.log("客户端回调：" + data);
    });
});


