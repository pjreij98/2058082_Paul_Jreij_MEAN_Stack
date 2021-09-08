let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/tcsMEAN";
let
mongoose.pluralize(null);

mongoose.connect(url).then(res=>console.log("Connected")).catch(err=>console.log(err));
let db = mongoose.connection;

let messageSchema = mongoose.Schema({
    name:String,
    message:String
});

let messageModel = mongoose.model("Chatlog", messageSchema);

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

io.on("connection",(socket)=>{
    socket.on("chat-msg", (msg)=>{
            
            messageModel.insertMany(msg, (err,result)=>{
                if(!err){
                    console.log(result);
                }else{
                    console.log(err);
                }
            })
    })
})

http.listen(4545, ()=>console.log("Server running on port #4545"));