function addItem(item:string, price:number){
    let comps = JSON.parse(sessionStorage.getItem("comps") || "[]");
    let itName = JSON.parse(sessionStorage.getItem("itName") || "[]");
    let items = {it:item,
                pr:price};
    let itemName = {it: item};
    comps.push(items);
    itName.push(itemName);

    var totalPeaches:number=0, totalBasketballs:number=0, totalRoses:number=0, totalASGuns:number=0;
    var peachPrice:number = 0, basketballPrice:number=0, rosePrice:number=0, asGunPrice:number=0;

    comps.forEach(element => {
        if(element.it == "Peach"){
            totalPeaches++;
            peachPrice += +element.pr;
        }
        else if(element.it == "Basketball"){
            totalBasketballs++;
            basketballPrice += +element.pr;
        }
        else if(element.it == "Rose"){
            totalRoses++;
            rosePrice += +element.pr;
        }
        else if(element.it == "Airsoft Gun"){
            
            asGunPrice += +element.pr;
            totalASGuns++;
        }
    });

    let totalP = <HTMLParagraphElement>document.getElementById("totalPeach");
    if(totalP){
        totalP.innerHTML = "x"+totalPeaches;
    }
    let totalB = <HTMLParagraphElement>document.getElementById("totalBasketball");
    if(totalB){
        totalB.innerHTML = "x"+totalBasketballs;
    }
    let totalR = <HTMLParagraphElement>document.getElementById("totalRose");
    if(totalR){
        totalR.innerHTML = "x"+totalRoses;
    }
    let totalA = <HTMLParagraphElement>document.getElementById("totalASGun");
    if(totalA){
        totalA.innerHTML = "x"+totalASGuns;
    }

    sessionStorage.setItem("comps", JSON.stringify(comps));
    sessionStorage.setItem("itName", JSON.stringify(itName));
    console.log("Data stored in sessionStorage");
}

// function onlyUnique(value){
//     return self.indexOf(value) === index;
// }

function removeItem(itemName:string){
    let comps = JSON.parse(sessionStorage.getItem("comps") || "[]");
    // let filtered;
    // console.log(comps);
    // for(let i:number=0; i<comps.length;i++){
    //     comps = comps.filter(o => (o.it.indexOf("Peach")));
    // }
    // //comps = filtered;
    // console.log(comps);
    // sessionStorage.setItem("comps", JSON.stringify(comps));
    // console.log(comps);
    // let indexFound:number;
    // for(let i:number=0; i<comps.length;i++){
    //     if(comps[i].it === itemName){
    //         console.log(comps[i]);
    //         indexFound = comps.findIndex(a=>(a.it === itemName))
    //         // comps.splice(i, 1);
    //         return false;
    //     }
    // }
    // comps.splice(indexFound,1);
    // console.log(comps);
    for(var i = 0; i < comps.length; i++){
        if(comps[i].it == itemName){
            comps.splice(i, 1);
            break;
        }
    }
    var totalPeaches:number=0, totalBasketballs:number=0, totalRoses:number=0, totalASGuns:number=0;
    var peachPrice:number = 0, basketballPrice:number=0, rosePrice:number=0, asGunPrice:number=0;

    comps.forEach(element => {
        if(element.it == "Peach"){
            totalPeaches++;
            peachPrice += +element.pr;
        }
        else if(element.it == "Basketball"){
            totalBasketballs++;
            basketballPrice += +element.pr;
        }
        else if(element.it == "Rose"){
            totalRoses++;
            rosePrice += +element.pr;
        }
        else if(element.it == "Airsoft Gun"){
            
            asGunPrice += +element.pr;
            totalASGuns++;
        }
    });

    let totalP = <HTMLParagraphElement>document.getElementById("totalPeach");
    if(totalP){
        totalP.innerHTML = "x"+totalPeaches;
    }
    let totalB = <HTMLParagraphElement>document.getElementById("totalBasketball");
    if(totalB){
        totalB.innerHTML = "x"+totalBasketballs;
    }
    let totalR = <HTMLParagraphElement>document.getElementById("totalRose");
    if(totalR){
        totalR.innerHTML = "x"+totalRoses;
    }
    let totalA = <HTMLParagraphElement>document.getElementById("totalASGun");
    if(totalA){
        totalA.innerHTML = "x"+totalASGuns;
    }

    sessionStorage.setItem("comps", JSON.stringify(comps));
    // for(let i:number=0; i<comps.length;i++){
    //     var unique = comps.filter(onlyUnique());
    // }
    // console.log(unique);
    // console.log(comps);
}

function displayData(){
    let comps = JSON.parse(sessionStorage.getItem("comps") || "[]");
    let itName = JSON.parse(sessionStorage.getItem("itName") || "[]");
    var unique = {};
    comps.forEach(function(item) {
        var name = unique[item.it] = unique[item.it] || {};
        name[item.pr] = true;
    });
    var outputList = [];
    for(var name in unique){
        for(var priceTag in unique[name]){
            outputList.push({it: name, pr: priceTag});
        }
    }
    let uniqueJSON = JSON.stringify(outputList, null, 4);
    console.log(uniqueJSON);
    let obj = JSON.parse(uniqueJSON);
    console.log(obj);
    // console.log(itName);
    // console.log(itName[0].it);
    var tableContent = "";
    var startTable = "<table border=1><tr><th>Item Name</th><th>Price</th></tr>"
    var total = 0;
    var totalPeaches:number=0, totalBasketballs:number=0, totalRoses:number=0, totalASGuns:number=0;
    var peachPrice:number = 0, basketballPrice:number=0, rosePrice:number=0, asGunPrice:number=0;
    comps.forEach(element => {
        if(element.it == "Peach"){
            totalPeaches++;
            peachPrice += +element.pr;
        }
        else if(element.it == "Basketball"){
            totalBasketballs++;
            basketballPrice += +element.pr;
        }
        else if(element.it == "Rose"){
            totalRoses++;
            rosePrice += +element.pr;
        }
        else if(element.it == "Airsoft Gun"){
            
            asGunPrice += +element.pr;
            totalASGuns++;
        }
        total += +element.pr;
    });
    obj.forEach(elem=>{
        
        if(elem.it == "Peach")
        {
            console.log("Peach Price: "+ peachPrice + "\ttotal Peaches: " + totalPeaches);
            tableContent += "<tr><td id = \"peach\">" + elem.it + " x"+totalPeaches+ "</td><td>$" + peachPrice.toFixed(2) + "</td></tr>";          
        }
        else if(elem.it == "Basketball")
        {
            tableContent += "<tr><td>" + elem.it + " x" + totalBasketballs + "</td><td>$" + basketballPrice.toFixed(2) + "</td></tr>";
        }
        else if(elem.it == "Rose")
        {
            tableContent += "<tr><td>" + elem.it + " x"+ totalRoses+ "</td><td>$" + rosePrice.toFixed(2) + "</td></tr>";
        }
        else if(elem.it == "Airsoft Gun")
        {
            tableContent += "<tr><td>" + elem.it + " x"+ totalASGuns+ "</td><td>$" + asGunPrice.toFixed(2) + "</td></tr>";
        }
    })
    var endTable = "</table><br>Total Price: $" + total.toFixed(2);
    tableContent = startTable + tableContent + endTable;
    let table = <HTMLDivElement>document.getElementById("table");
    if(table){
        table.innerHTML = tableContent;
    }
}