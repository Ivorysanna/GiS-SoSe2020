import * as Http from "http";

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
        _response.write(_request.url);
        console.log(_request.url);

        //Beendet Response und schickt sie ab
        _response.end();
    }
}