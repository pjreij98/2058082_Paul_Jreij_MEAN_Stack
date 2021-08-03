function addProject(){
    clientName= document.getElementById("client").value;
    projectName= document.getElementById("project").value;
    budgetAmount= document.getElementById("budget").value;
    let comps = JSON.parse(localStorage.getItem("comps") || "[]");
    let emp = {cN: clientName, 
               pN: projectName, 
               bA: budgetAmount};
    comps.push(emp);
    localStorage.setItem("comps", JSON.stringify(comps));
    console.log("Data stored in localStorage");
}

function displayData(){
    let comps = JSON.parse(localStorage.getItem("comps") || "[]");
    var tableContent="";
    var startTable = "<table border=1><tr><th>Client Name</th><th>Project Name</th><th>Budget Amount: </th></tr>";
    var total=0;
    comps.forEach(element=>{
        tableContent += "<tr><td>" +element.cN+"</td><td>"+element.pN+"</td><td>$"+element.bA+"</td></tr>"
        total += +element.bA;
    })
    var endTable = "</table><br>Total budget: $" + total;
    tableContent = startTable + tableContent + endTable;
    document.getElementById("table").innerHTML=tableContent;
}

function removeData(){
    localStorage.removeItem("comps");
    alert("Data Removed");
}