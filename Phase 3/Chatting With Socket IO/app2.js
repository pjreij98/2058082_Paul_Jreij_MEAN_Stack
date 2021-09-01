let express = require("express");

let app = express();

let http = require("http").Server(app);

let io = require("socket.io")(http);

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

io.on("connection", (socket)=>{
    // console.log("Client connected");

    socket.on("chat-msg", (msg)=>{
        console.log(msg);
        // var item = document.createElement('li');
        // item.textContent = msg;
        // document.getElementById('messages').appendChild(item);
    })

    let randomMsg = ["Hi how are you?", "I was looking for the nearest doctor", "Can you help me figure this code out?", "Is there anything you need?", "Please let me know how I can help.", "If you are struggling with something, please select a topic."]
    let randomNumber = Math.floor(Math.random()*randomMsg.length);
    socket.emit("obj1", randomMsg[randomNumber]);
})

http.listen(4545, ()=>console.log("Server running on port #4545"));

