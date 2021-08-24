let fs = require("fs");
let origJson = [];
fs.readFile("originals.json", (err,data)=>{
    if(!err){
        let origString = data.toString();
        origJson = JSON.parse(origString);
        for(let x = 0; x < origJson.length; x++){
            console.log("Original's Name is: " + origJson[x].fn + " " + origJson[x].ln);
            console.log("Original's Gender is: " + origJson[x].gen);
            console.log("Original's Email is: " + origJson[x].email);
            console.log("Original Object's Creation Date is: " + origJson[x].dateTime +"\n");
        }
    }
})