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
        curDate = new Date();
        console.log("("+curDate.toLocaleTimeString()+") Client Says: " + msg);
        let randomMsg = ["Hi how are you?", "I was looking for the nearest doctor", "Can you help me figure this code out?", "Is there anything you need?", "Please let me know how I can help.", "If you are struggling with something, please select a topic.","Let me know when you want to order food.", "If you want to go skydiving, type 1.", "What would you like to eat for dinner today? I will order and send it to you by drone.", "How ugly do you think I am for a robot?"]
        let randomNumber = Math.floor(Math.random()*randomMsg.length);
        socket.emit("obj1", randomMsg[randomNumber]);
        // var item = document.createElement('li');
        // item.textContent = msg;
        // document.getElementById('messages').appendChild(item);
    })

    
})

http.listen(4545, ()=>console.log("Server running on port #4545"));

