const http = require("http");

// custom file import
const routes = require('./routes');

const someText = routes.someText;
console.log(someText);

// Browser'da localhost:3000 portunu görüntülemek istediğimde, bu server'a GET istek atmış oluyorum.
// İstek gelince (request), bu fonksiyonu çalıştırıyor.
// createServer fonksiyonun içine başka bir fonksiyon verildi -> içe verilen bu fonk, SONRADAN çalıştırılacak. ASYNCHRONOUSLY!!!! 
const server = http.createServer(
    
    // (req, res) => {
    // REQ = OBJECT = NODEJS GENERATED
    // console.log(req.url, req.method, req.headers);
    // process.exit(); // exits the Event Loop of Nodejs; closes the program and server.

    // EXCUTE ROUTES FOR INCOMING REQUESTS:
    routes.handler //çağrılmaz! () konmaz!

// }
);


server.listen(5000);

