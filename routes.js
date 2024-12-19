const fs = require("fs");

const requestHandler = (req, res) => {
    
    const url = req.url;
    const method = req.method;

    if(url === "/"){
        res.write('<html>');
        // http://localhost:3000/title?title=testtttt SAYFASINA GÖTÜRDÜ! TITLE = FORMA YAZILIP SUBMIT EDİLEN KISIM.
        // forma yazılan şey, PAYLOAD olarak / sayfasına götürüldü.
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"></input><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }

    
    if(url === '/message' && method === 'POST'){
           
        const body = [];

        // 'DATA' EVENTİ VE LİSTENER'I:
        req.on('data', (chunk) => {
            // console.log("CHUNKKKKKKK : ", chunk);
            body.push(chunk);
        });

        // 'END' EVENT: NODEJS REQ'İ PARSE EDER, ONDAN SONRA İÇERİDEKİ FONKSİYONU ÇALIŞTIRIR:
        // İÇERİDEKİ FONKSY = O EVENT'İN LISTENER'I !!!
        // REQ İLE İŞİ BİTTİKTEN SONRA, "TAMAM ŞİMDİ RES.END()İ GÖNDEREBİLİRİM" DER VE İÇERİDEKİ FONKSU ÇALIŞTIRIR.
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            // console.log("PARSED BODY: ", parsedBody);
            const message = parsedBody.split("=")[0];
            // console.log("message: ",message);
            // fs.writeFileSync("newtext.txt", message); // bu kod, res gönderildikten sonra execute ediliyor.
            // Kodlar yazıldığı sırada execute etmiyor!!!!!
            fs.writeFile(`${message}.txt`, message, (err) => { //ASYNC İŞLEM!!!!
                // BURASI EVENT LISTENER! DOSYAYI OLUŞTURDUKTAN SONRA ÇALITIRILACAK KODLAR BURAYA GETİRİLİR.
                // DOSYAYI OLUŞTURDUKTAN SONRA RES GÖNDER:
                res.statusCode = 302; 
                // res.setHeader('Location', '/'); // diğer sayfaya yönlendir
                return res.end();
            })

        });

        // server response:
        // url '/' değilse aşağıyı çalıştırır ekranda:
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body><h1>This is my first nodejs log!</h1></body>')
        res.write('</html>');
        res.end(); // BURADA RES GÖNDERİLDİ ARTIK. BUNDAN SONRA RES.SETHEADER() VS OLURSA HATA VERİR. BAŞKA BİR RES.END() OLURSA HATA VERİR.
        // BURAYI ÇALIŞTIRP RESPONSE U GÖNDERDİKTEN SORNA EVENT LISTENER'LARI ÇALIŞTIRIR.
        // ÖNCE RES GÖNDERİR --> SONRA EVENT LINSTENER'LARI ÇALIŞTIRIR.
    } 
}

//global export
module.exports = {
    handler: requestHandler, // mutliple exports odluğu zaman
    someText: 'Some textssss',
};