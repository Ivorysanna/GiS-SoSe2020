"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Formular;
(function (Formular) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    //Server wird erstellt mit createServer
    let server = Http.createServer();
    //fügt Request-Listener hinzu
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    //Server beginnt auf Requests zu hören
    server.listen(port);
    let mongoClient;
    let order;
    async function handleListen() {
        console.log("Listening");
        mongoClient = new Mongo.MongoClient("mongodb+srv://testUser:12341234@gis-ist-geil.ohssx.mongodb.net/Test?retryWrites=true&w=majority");
        await mongoClient.connect();
        order = mongoClient.db("Test").collection("Students");
        // let orderArray: any[] = await order.find().toArray();
        // console.log(orderArray);
    }
    function handleRequest(_request, _response) {
        //Setzen von Metadaten der Antowrt
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        //Inhalt von Response
        //_response.write(JSON.stringify(Url.parse(_request.url!, true).query));
        //In Antwort wird geschrieben(ein Json.in einen String umwandeln(In eine URL verwandeln(url von request liegt als String vor(?).erstellt ein Assoziatives Array)))
        let parsedURL = Url.parse(_request.url, true);
        if (parsedURL.pathname == "/read") {
            console.log(parsedURL.query);
            //https://stackoverflow.com/questions/7241878/for-in-loops-in-javascript-key-value-pairs
            for (let [key, value] of Object.entries(parsedURL.query)) {
                let htmlAusgabe = key + " : " + value + "<br/>";
                _response.write(htmlAusgabe);
            }
        }
        else if (parsedURL.pathname == "/write") {
            order.insert(JSON.stringify(parsedURL.query));
        }
        else {
            _response.statusCode = 501;
        }
        //Beendet Response und schickt sie ab
        _response.end();
    }
})(Formular || (Formular = {}));
//# sourceMappingURL=server.js.map