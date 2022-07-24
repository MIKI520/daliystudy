var http = require('http'),fs = require('fs'),url = require('url'),qs = require('querystring')
var server = http.createServer()
server.listen('9000',function(){
    console.log('http://127.0.0.1:9000')
})
server.on('request',(req,res)=>{
    var method = req.method
    var urls = url.parse(req.url,true)
    //如果是简单请求这一条就行
    res.setHeader('Access-Control-Allow-Origin','*')
    //预检请求（这些第一个是请求方法第二个是请求头）
    res.setHeader('Access-Control-Allow-Methods','PUT,DELETE')
    // res.setHeader('Access-Control-Allow-Headers','xxx')

    if(method == 'GET'){
        if(urls.path=='/'){
            res.end('index')
        }else{
            fs.readFile('.'+urls.pathname,(err,data)=> {
                res.end(data)
            })
        }
    }else if(method == 'POST'){
        if(urls.pathname == '/name'){
            var s = ''
            req.on('data',(d)=>{
                s+=d
            })
            req.on('end',()=>{
                let name = qs.parse(s).name
                console.log(name)
                if(name == 'admin'){
                    res.end('此名称被占用')
                }else{
                    res.end('恭喜！此名称可以使用')
                }
            })
        }
    }
})