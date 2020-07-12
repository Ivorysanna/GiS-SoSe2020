import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

namespace Formular{
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

    let mongoClient: Mongo.MongoClient;
    let order: Mongo.Collection; 

    async function handleListen(): Promise <void> {
        console.log("Listening");
        mongoClient = new Mongo.MongoClient("mongodb+srv://testUser:12341234@gis-ist-geil.ohssx.mongodb.net/Test?retryWrites=true&w=majority");
        await mongoClient.connect();
            order = mongoClient.db("Test").collection("Students");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        //Setzen von Metadaten der Antowrt
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        //Inhalt von Response
        //_response.write(JSON.stringify(Url.parse(_request.url!, true).query));
        //In Antwort wird geschrieben(ein Json.in einen String umwandeln(In eine URL verwandeln(url von request liegt als String vor(?).erstellt ein Assoziatives Array)))
        let parsedURL: Url.UrlWithParsedQuery= Url.parse(_request.url!, true);

        if(parsedURL.pathname == "/read"){
            let orderArray: any[] =  await order.find().toArray();
            _response.write(JSON.stringify(orderArray));
            
        }else if(parsedURL.pathname =="/write") {
            order.insertOne(parsedURL.query);
        }else{
            _response.statusCode = 501;
        }


        //Beendet Response und schickt sie ab
        _response.end();
    }
}