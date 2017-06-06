var http = require('http');
var fs = require('fs');

http.createServer(function(req,res){
  var content = "";
  res.writeHead(200, { 
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin':'*'
    });
  // console.log("URL--->",req.url)
  try{
    content = fs.readFileSync(__dirname+req.url);
  }catch(e){
    content = "";
  }
  res.write(content);
  res.end();
}).listen(8080);