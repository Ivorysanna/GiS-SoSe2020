import * as Http from "http";
//import { url } from "inspector";
import * as Url from "url";

export namespace A08Server {
    console.log("Starting server");

    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;
    //Server wird erstellt mit createServer
    let server: Http.Server = Http.createServer();

    //fügt Request-Listener hinzu
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    //Server beginnt auf Requests zu hören
    server.listen(port);

    function handleListen(): void {
        console.log("Listening");
    }


    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        //Setzen von Metadaten der Antowrt
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        //Inhalt von Response
        //_response.write(JSON.stringify(Url.parse(_request.url!, true).query));
        //In Antwort wird geschrieben(ein Json.in einen String umwandeln(In eine URL verwandeln(url von request liegt als String vor(?).erstellt ein Assoziatives Array)))
        let parsedURL: Url.UrlWithParsedQuery= Url.parse(_request.url!, true);

        if(parsedURL.pathname == "/html"){
            console.log(parsedURL.query);
            //https://stackoverflow.com/questions/7241878/for-in-loops-in-javascript-key-value-pairs
            for(let [key, value] of Object.entries(parsedURL.query)){
               let htmlAusgabe: string = key+ " : " + value + "<br/>";
               _response.write(htmlAusgabe);
            }
        }else if(parsedURL.pathname =="/json") {
            _response.write(JSON.stringify(parsedURL.query));

        }else{
            _response.statusCode = 501;
        }


        //Beendet Response und schickt sie ab
        _response.end();
    }
}