/**
 * Created by Huangkunsong on 2017/6/4.
 */
const app = require("express")();
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const server = http.createServer(app);

app.get("/", function (request, response) {
    response.sendFile(path.join(__dirname, "../socket.html"));
});
server.listen(80);
const io = socketIO.listen(server);
io.on("connection", function (socket) {
    //将消息进行存储,每一个socket都不相同
    const message = [];
    /**
     * 监听客户端news事件
     */
    socket.on("news", function (data) {
        /**
         * 发送news事件到客户端,参数值为asd。客户端端送到消息后触发第三个参数callback
         */
        socket.emit("news", "asd", function (data) {
            console.log(data);
        });
    });
    
    socket.on("showMessage", function () {
        console.log(message);
    });
    
    /**
     * 监听客户端发送消息
     */
    socket.on("message", function (data) {
        message.push(data);
        console.log("服务端收到消息：" + data);
        socket.send("Hello");
    });
    /**
     * 用于向其他客户端发送消息
     */
    socket.on("sendOtherClient", function (data) {
        socket.broadcast.send(data);
        //向其他客户端发送事件
        //socket.broadcast.emit("", "");
    });
    
    /**
     * 模拟服务端发送消息
     */
    setTimeout(function () {
        socket.send("Hello Word");
    }, 2000);
    
    //每隔5秒向所有连接的客户端推送消息
    setInterval(function () {
        //用于群发消息
        io.sockets.send(new Date());
        //触发所有客户端news事件，广播不支持第三个回调参数
        io.sockets.emit("news", "AAAA");
    }, 500000);
});

