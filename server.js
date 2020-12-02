var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/
    if (path === '/index.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        // response.write(fs.readFileSync('public/index.html')) //添加index.html的路由
        let string = fs.readFileSync('public/index.html').toString()
        const page1 = fs.readFileSync('bd/page1.json').toString()
        // string = string.replace('{{page}}', page1)
        const array = JSON.parse(page1)
        const result = array.map(item => `<li>${item.id}</li>`).join('')
        string = string.replace('{{page}}', `<ul id="xxx"> ${result}</ul>`)
        response.write(string)
        response.end()
    } else if (path === '/main.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/main.js'))
        response.end()
    } else if (path === '/style.css') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(fs.readFileSync('public/style.css'))
        response.end()
    } else if (path === '/2.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/js;charset=utf-8')
        response.write(fs.readFileSync('public/2.js'))
        response.end()
    } else if (path === '/3.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(fs.readFileSync('public/3.html'))
        response.end()
    } else if (path === '/1.xml') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/xml;charset=utf-8')
        response.write(fs.readFileSync('public/1.xml'))
        response.end()
    } else if (path === '/1.json') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'application/json;charset=utf-8')
        response.write(fs.readFileSync('public/1.json'))
        response.end()
    } else if (path === '/page2') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.write(fs.readFileSync('bd/page2.json'))
        response.end()
    } else if (path === '/page3') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.write(fs.readFileSync('bd/page3.json'))
        response.end()
    } else {
        response.statusCode = 404
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


