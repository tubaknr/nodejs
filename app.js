const http = require("http");
const fs = require("fs");
const { parse } = require("path");

// Browser'da localhost:3000 portunu görüntülemek istediğimde, bu server'a GET istek atmış oluyorum.
// İstek gelince (request), bu fonksiyonu çalıştırıyor.
const server = http.createServer((req, res) => {
    // REQ = OBJECT = NODEJS GENERATED
    console.log(req.url, req.method, req.headers);
    // process.exit(); // exits the Event Loop of Nodejs; closes the program and server.
    
    const url = req.url;
    const method = req.method;
    console.log("URRRLLLLLLLLLLLLLLLLL: ",url)
    console.log("METHOOOODDDDDD : ",method)
    
    if(url === "/"){
        res.write('<html>');
        // http://localhost:3000/title?title=testtttt SAYFASINA GÖTÜRDÜ! TITLE=FORMA YAZILIP SUBMIT EDİLEN KISIM
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"></input><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }

    if(url === '/message' && method === 'POST'){
           
        const body = [];
        req.on('data', (chunk) => {
            console.log("CHUNKKKKKKK : ", chunk);
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log("PARSED BODY: ", parsedBody);
            const message = parsedBody.split("=")[1];
            console.log("message: ",message);
            fs.writeFileSync("newtext.txt", message);
        });

        res.statusCode = 302; 
        res.setHeader('Location', '/'); // diğer sayfaya yönlendir
        return res.end();
    } 


    // server response:
    // url '/' değilse aşağıyı çalıştırır ekranda:
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body><h1>This is my first nodejs log!</h1></body>')
    res.write('</html>');
    res.end();

});


server.listen(3000);

