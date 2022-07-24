var http = require('http'),url = require('url'),fs = require('fs'),qs = require('querystring')
var server = http.createServer()
server.listen('8000',()=>{
    console.log('http://127.0.0.1:8000')
})
server.on('request',(req,res)=>{
    urls =  url.parse(req.url,true)
    method = req.method
    console.log(method)
    if(method == 'GET'){
        if(urls.pathname == '/'){
            res.end('index')
        }else if(urls.pathname == '/get'){
            res.end('天天喝可乐不学习')
        }else if(urls.pathname == '/get1'){
            res.end('好好学习')
        }else if(urls.pathname == '/name'){
            console.log(1)
            var name = urls.query.name
            // console.log(name)
            if(name == 'admin'){
                res.end('用户名已经被占用')
            }else{
                res.end('恭喜,可以使用')
            }
        }
        else{
            fs.readFile('.'+urls.pathname,(err,data)=>{
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