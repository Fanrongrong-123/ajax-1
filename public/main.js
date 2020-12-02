console.log('我是main')
let n = 1;
getPage.onclick = () => {
    const request = new XMLHttpRequest() //readyState===0
    request.open("GET", `/page${n + 1}`) //readyState===1
    request.onreadystatechange = () => { //对应的readyState有四个值 
        if (request.readyState === 4 && request.status === 200) {
            const array = JSON.parse(request.response)
            array.forEach(item => {
                const li = document.createElement("li")
                li.textContent = item.id
                xxx.appendChild(li) //将li插入<ul id="xxx"></ul>
            })
            n++
        }
    }
    request.send() //readyState===2
    //开始下载===3、下载完成===4
}

getJSON.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/1.json')
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status >= 200) {
            const object = JSON.parse(request.response) //parse用来解析json代码
            myName.textContent = object.name

        }
    }
    request.send()
}

getXML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/1.xml')
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status >= 200) {
            const dom = request.responseXML
            const text = dom.getElementsByTagName('warning')[0].textContent
            const div = document.createElement('div')
            div.innerHTML = text
            console.log(text.trim()) //清除空格换行
            document.body.appendChild(div)
        }
    }
    request.send()
}


getHTML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/3.html')
    request.onload = () => {
        console.log(request.response)
        const div = document.createElement('div')
        div.innerHTML = request.response
        document.body.appendChild(div)
    }
    request.onerror = () => {
        console.log('失败了')
    }
    request.send()

}


getJS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/2.js')
    request.onload = () => {
        console.log(request.response)
        console.log('成功了')

        const script = document.createElement('script')
        script.innerHTML = request.response
        document.body.appendChild(script)
    }
    request.onerror = () => {
        console.log('失败了')
    }
    request.send()
}

getCSS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', "/style.css")
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                console.log(request.status)
                const style = document.createElement('style')
                style.innerHTML = request.response
                document.head.appendChild(style)
            } else {
                alert('css加载失败')
            }
        }
    }
    request.onerror = () => {
        console.log('请求失败')
    }
    request.send()

}