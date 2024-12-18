const http = require("http");

// Browser'da localhost:3000 portunu görüntülemek istediğimde, bu server'a istek atmış oluyorum.
// İstek gelince (request), bu fonksiyonu çalıştırıyor.
const server = http.createServer((req, res) => {
    // REQ = OBJECT = NODEJS GENERATED
    console.log(req);
    // process.exit(); // exits the Event Loop of Nodejs; closes the program and server.
});


server.listen(3000);

