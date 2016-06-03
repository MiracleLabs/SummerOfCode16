var express = require('express');
var app = express();

app.get("/htmlpage",function(req,res){
 res.sendFile(__dirname + "/" + "index.html");
});

app.listen(process.env.PORT, process.env.IP, function(){
 console.log("Server was started on Bluemix with your app @ /htmlpage");
 console.log("Your App is running at :https://<workspacename>-<username>.c9users.io/<applicationpath>");
});