"use strict";
var Client;
(function (Client) {
    document.querySelector("#absenden")?.addEventListener("click", absendenFunktion);
    document.querySelector("#serverdaten")?.addEventListener("click", serverdatenFunktion);
    function absendenFunktion() {
        console.log("Button wurde gedrückt");
        //Erstellt eine neue Formdata aus dem ersten Element im Formulararray
        let formData = new FormData(document.forms[0]);
        //Meine URL auf Heroku html
        let url = new URL("https://gissose.herokuapp.com/write");
        //Iteriert über die Einträge der FormData
        for (let entry of formData) {
            //Fügt die FormData entrys zur URL hinzu als Suchparameter hinzu
            url.searchParams.append(entry[0], entry[1].toString());
        }
        //Schickt Anfrage an die URL mit den Suchparamtern
        fetch(url.href)
            .then(function (response) {
            return response.text();
        });
    }
    function serverdatenFunktion() {
        //Erstellt eine neue Formdata aus dem ersten Element im Formulararray
        let formData = new FormData(document.forms[0]);
        //Meine URL auf Heroku html
        let url = new URL("https://gissose.herokuapp.com/read");
        //Iteriert über die Einträge der FormData
        for (let entry of formData) {
            //Fügt die FormData entrys zur URL hinzu als Suchparameter hinzu
            url.searchParams.append(entry[0], entry[1].toString());
        }
        //Schickt Anfrage an die URL mit den Suchparamtern
        fetch(url.href)
            .then(function (response) {
            return response.text();
        }).then(function (data) {
            document.querySelector("#serverAntwort").innerHTML = data;
        });
    }
})(Client || (Client = {}));
//# sourceMappingURL=client.js.map