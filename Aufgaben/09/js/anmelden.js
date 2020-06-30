"use strict";
var AnmeldeSeite;
(function (AnmeldeSeite) {
    document.querySelector("#absendeButton")?.addEventListener("click", anmeldung);
    async function anmeldung() {
        //Erstellt eine neue Formdata aus dem ersten Element im Formulararray
        let formData = new FormData(document.forms[0]);
        //Meine URL auf Heroku
        let url = new URL("https://gissose.herokuapp.com/html");
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
            document.querySelector("#antwort").innerHTML = data;
        });
    }
})(AnmeldeSeite || (AnmeldeSeite = {}));
//# sourceMappingURL=anmelden.js.map