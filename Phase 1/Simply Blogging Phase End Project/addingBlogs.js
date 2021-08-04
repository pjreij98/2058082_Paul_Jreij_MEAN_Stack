function addBlog(){
    var title = document.getElementById("title").value;
    var article = document.getElementById("articles").value;
    var imgURL = document.getElementById("img").value;

    var myPTagContent = "<h3>"+ title+"</h3>" +"<br>"+article+"<br><img src = \"" + imgURL+"\">";
    
    document.getElementById("blog").innerHTML += myPTagContent;
}