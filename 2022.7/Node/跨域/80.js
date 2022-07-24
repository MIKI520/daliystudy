var http = require('http'),fs = require('fs'),url = require('url')
var server = http.createServer()
server.listen('8000',function(){
    console.log('http://127.0.0.1:8000')
})
server.on('request',(req,res)=>{
    var method = req.method
    var urls = url.parse(req.url,true)
    if(method == 'GET'){
        if(urls.path=='/'){
            res.end('index')
        }else{
            fs.readFile('.'+urls.pathname,(err,data)=> {
                res.end(data)
            })
        }
    }
})