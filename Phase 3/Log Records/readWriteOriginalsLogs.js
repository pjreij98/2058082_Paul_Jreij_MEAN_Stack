function storeValues(){
    let fs = require("fs");
    let readline = require("readline-sync");
    let firstName = readline.question("Enter your Original's first name: ")
    let lastName = readline.question("Enter your Original's last name: ");
    let gender = readline.question("Enter your Original's gender [M/F]: ")
    let emailID = readline.questionEMail("Enter your Original's email id: ")

    let timestamp = Date().toString();
    console.log(timestamp);

    console.log("\nYour Original object's name is: " + firstName + " " + lastName);
    debugger;
    console.log("Your Original's gender is: " + gender);
    debugger;
    console.log("Your Original's email ID is: "+ emailID);
    debugger;
    console.log("The date when your Original was created was: " + timestamp);
    debugger;



    let jsonValuesFile = JSON.parse(fs.readFileSync("originals.json").toString());
    jsonValuesFile.push({fn: firstName, ln: lastName, gen: gender, email:emailID, dateTime: timestamp});
    fs.writeFileSync("originals.json", JSON.stringify(jsonValuesFile));
}

storeValues();