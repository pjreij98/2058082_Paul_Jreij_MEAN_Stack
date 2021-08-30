let http = require("http");
let url = require("url");
let fs = require("fs");

let indexPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <title>Task Planner</title>
</head>
<body>
    <h2>Task Planner</h2><br>
    <h3>Add Task: </h3><br>
    <form action="addTask">
        <label>Emp ID: </label><input type="number" name = "emp"><br>
        <label>Task ID: </label><input type="number" name="taskID"><br>
        <label>Task: </label><input type="text" name="task"><br>
        <label>Deadline: </label><input type="date" name="dueDate"><br>
        <input type="submit" value="Submit">
        <input type="reset" value="Reset">
    </form>
    <h3>Delete Task</h3><br>
    <form action="deleteTask">
    <label>Task ID: </label><input type = "text" name = "delTaskByID">
    <input type="submit" value="Delete Task"><br>
    </form>
    <h3>List Tasks<h3>
    <form action="listAllTasks" >
    <input type="submit" value="List All Tasks"><br>
    </form>
</body>
</html>
`;

let tableShowing = true;
let server = http.createServer((req, res)=>{
    //url?key=value&key=value;
    let urlInfo = url.parse(req.url, true);
    // console.log("path"+urlInfo.path);           //path: path name with query
    // console.log("pathname:"+urlInfo.pathname)   //pathname: only path
    if(urlInfo.path != "/favicon.ico"){
        if(urlInfo.path=="/"){
            res.write(indexPage);
        }else if(urlInfo.pathname=="/addTask"){
            res.write(indexPage);
            let info = urlInfo.query;
            let isDuplicateTaskID = false;
            let jsonValuesFile = JSON.parse(fs.readFileSync("tasks.json").toString());
            jsonValuesFile.forEach(x=> {
                if(x.taskNum == info.taskID){
                isDuplicateTaskID=true;
                }
            })
            if(isDuplicateTaskID == true){
                res.write("Can't add Task with duplicate Task ID")
            }
            else{
                jsonValuesFile.push({empID: info.emp, taskNum: info.taskID, tsk: info.task, date:info.dueDate});
                console.log("Info: " + JSON.stringify(jsonValuesFile));
                fs.writeFileSync("tasks.json", JSON.stringify(jsonValuesFile));
            }
            
        }else if(urlInfo.pathname=="/deleteTask"){
            res.write(indexPage);
            let info = urlInfo.query;
            let jsonValuesFile = JSON.parse(fs.readFileSync("tasks.json").toString());
            let index = jsonValuesFile.findIndex(t=>t.taskNum==info.delTaskByID);
            if(index == -1){
                res.write("No Task found with that ID #...");
            }else{
                jsonValuesFile.splice(index, 1);
            }
            fs.writeFileSync("tasks.json", JSON.stringify(jsonValuesFile));
            // res.write(taskToAdd);
        }else if(urlInfo.pathname=="/listAllTasks"){
            // res.write(indexPage);
            let jsonValuesFile = JSON.parse(fs.readFileSync("tasks.json").toString());
            let midDiv = ``;
            let taskToAdd = `
            <table border=1>
                <tr>
                    <th>Emp. ID</th>
                    <th>Task ID</th>
                    <th>Task</th>
                    <th>Deadline</th>
                </tr>
            `
            jsonValuesFile.forEach(t=>midDiv+="<tr><td>"+ t.empID + "</td><td>"+ t.taskNum + "</td><td>"+ t.tsk + "</td><td>"+t.date+"</td></tr>")
            // for(let t of jsonValuesFile){
            //     taskToAdd+=`<tr><td>`+ t.empID+`</td><td>`+t.taskNum+`</td><td>`+t.tsk+`</td><td>`+t.date+`</td>`
            // }
            // fs.readFile("tasks.json", (err,data)=>{
            //     if(!err){
            //         let empString = data.toString();
            //         let empJson = JSON.parse(empString);
                    
            //         empJson.forEach(t => {
            //             tableShowing = !tableShowing;
            //             // document.getElementById("listTasks").disabled = true;
            //             midDiv += `
            //             <tr>
            //                 <td>${t.empID}</td>
            //                 <td>${t.taskNum}</td>
            //                 <td>${t.tsk}</td>
            //                 <td>${t.date}</td>
            //             </tr>
            //             `
            //         })
            //     }
            // })
            let tail = `</table>`
            res.write(indexPage + taskToAdd + midDiv + tail);
        }
        else{
            res.write(indexPage);
        }
        // console.log(urlInfo);
    }
    
    res.end("");
})

server.listen(4545, ()=>console.log("Server running on port number 4545"));