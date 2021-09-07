let express = require("express");
let bodyParser = require("body-parser");
let app = express();
app.use(bodyParser.urlencoded({extended:true}));
let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/tcsMEAN";
mongoose.pluralize(null);
mongoose.connect(url).then(res=>console.log("Connected!")).catch(err=>console.log(err));
let courseSchema = mongoose.Schema({
    courseID:Number,
    courseName:String,
    description:String,
    amount:Number
});
let courseModel = mongoose.model("Course", courseSchema);
let db = mongoose.connection;

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.get("/addCourse", (req,res)=>{
    res.sendFile(__dirname+"/addCourse.html");
});

app.post("/add", (req,res)=>{
    
    let course = req.body;
    

    let c1 = new courseModel({courseID:course.courseID, courseName:course.courseName, description:course.description, amount:course.amount});
    courseModel.insertMany(c1, (err,result)=>{
        if(!err){
            console.log(result);
        }else{
            console.log(err);
        }
        
    });
    // mongoose.disconnect();

    // res.send(course.courseID);
    res.sendFile(__dirname+"/addCourse.html");
    
})

app.get("/updateCourse",(req,res)=>{
    res.sendFile(__dirname+"/updateCourse.html");
});

app.get("/update", (req,res)=>{
    let id = req.query["courseID"];
    let amtChanged = req.query["amount"];
    
    courseModel.updateOne({courseID:id},{$set:{amount:amtChanged}},(err,result)=>{
        if(!err){
            if(result.modifiedCount > 0 || result.matchedCount>0){
                if(result.matchedCount == result.modifiedCount){
                    console.log("Course amount updated based on ID successfully!");
                }else{
                    console.log("Course already has this amount. No changes made. ");
                }
            }else{
                console.log("Course ID not found, amount didn't update... Try again.");
            }
            // mongoose.disconnect();
        }else{
            console.log(err);
        }
    }) 

    res.sendFile(__dirname+"/updateCourse.html");
})

app.get("/deleteCourse",(req,res)=>{
    res.sendFile(__dirname+"/deleteCourse.html");
});

app.get("/delete", (req,res)=>{
    let id = req.query["courseID"];

    courseModel.deleteOne({courseID:id},(err,result)=>{
        if(!err){
            if(result.deletedCount>0){
                console.log("Record deleted successfully!");
            }else{
                console.log("Record not present, try again...");
            }
        }else{
            console.log(err);
        }
        // mongoose.disconnect();
    });

})

app.get("/fetchCourses",(req,res)=>{
    let tableContent='';
    let startTable = '<table border = 1><tr><th>Course ID</th><th>Course Name</th><th>Descripton</th><th>Amount</th></tr>';
    let endTable = '</table>';
    courseModel.find({},(err,data)=>{
        if(!err){
            data.forEach(c=>{
                tableContent+= '<tr><td>'+c.courseID+'</td><td>'+c.courseName+'</td><td>'+c.description+'</td><td>'+c.amount+'</td></tr>';
            })
            res.write(startTable+tableContent+endTable);
        }
    })
});

app.listen(9090, ()=>console.log("Server running on port number 9090"));