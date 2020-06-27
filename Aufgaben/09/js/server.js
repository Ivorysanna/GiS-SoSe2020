"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A08Server = void 0;
const Http = require("http");
//import { url } from "inspector";
const Url = require("url");
var A08Server;
(function (A08Server) {
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
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        //Setzen von Metadaten der Antowrt
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        //Inhalt von Response
        _response.write(JSON.stringify(Url.parse(_request.url).query));
        //Beendet Response und schickt sie ab
        _response.end();
    }
})(A08Server = exports.A08Server || (exports.A08Server = {}));
//# sourceMappingURL=server.js.map