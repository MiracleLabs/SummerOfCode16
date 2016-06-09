# Cheat Sheet : Deploying your first Node.js Application to IBM Bluemix

The below markdown file consists of commands, links and code snippets that will help you complete and understand Miracle Summer of Code Lab "Deploying your first Node.js Application to IBM Bluemix".

## Important Links

Access Bluemix - http://bluemix.net

Access c9 - http://c9.io

## Commands

To check node and npm versions from the command line,

```shell
node --version

npm --version
```
To create the directory and naviagate to the directory from the command line,

```shell
mkdir <Directory Name>

cd <Directory Name>
```

Initialize the package.json file for your application,

```shell
npm init
```

To add the Express Depency to your package.json file,

```shell
npm install --save express
```

To check out the package.json file,

```shell
cat package.json
```
To run the application in C9,

```shell
node server.js
```

To download the CloudFoundry CLI Tools,

```shell
curl -L "https://cli.run.pivotal.io/stable?release=linux64-binary&source=github" | tar -zx
```

To login to the CF Target and push your code,

```shell
./cf login
./cf push
```

Based on your region in Bluemix your API Endpoint will change as follows, 

```shell
•	For Sydney : cf api https://api.au-syd.bluemix.net

•	For US South : cf api https://api.ng.bluemix.net

•	For United Kingdom : cf api https://api.eu-gb.bluemix.net
```

## Code Snippets and Files

### index.html

```html
<!DOCTYPE html>
<html>
<meta http-equiv="Content-Type" Content="text/html;charset=utf-8" />
<meta content="utf-8" http-equiv="encoding">
<head>
    <body style="text-align:center">
        <div style="background-color:#2368a0; color:white;  padding:10px; width:40%; margin-left:30%;margin-top:10%; ">
            <h1><center>MIRACLE SOFTWARE SYSTEMS</center></h1>
        </div>
        <div style="background-color:#00aae7 ; color:white;  padding:10px; width:40%; margin-left:30%; text-align:center;  ">
            <p align="justify">Founded in 1994, Miracle Software Systems, Inc. is a private minority firm headquartered in Novi,MI(USA).For the past 2 decades teams at Miracle have helped numerous customers rapidly transition their IT to a Service Oriented Architecture.With
                over 1500 employees at Global Development Centers in 8 countries, Miracle has been able to carve a mark into niche IT Services.</p>
        </div>
    </body>
</head>
</html>
```

### server.js

```javascript
var express = require('express');
var app = express();

app.get("/htmlpage",function(req,res){
 res.sendFile(__dirname + "/" + "index.html");
});

app.listen(process.env.PORT, process.env.IP, function(){
 console.log("Server was started on Bluemix with your app @ /htmlpage");
 console.log("Your App is running at :https://<workspacename>-<username>.c9users.io/<applicationpath>");
});
```

### Manifest.yml

```yaml
applications:
- path: .
  memory: 256M
  instances: 1
  domain: mybluemix.net
  name: node-app
  host: node-app
  disk_quota: 1024M
```
