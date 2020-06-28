namespace AnmeldeSeite {
    document.querySelector("#absendeButton")?.addEventListener("click", anmeldung);

    async function anmeldung(): Promise<void> {
        //Erstellt eine neue Formdata aus dem ersten Element im Formulararray
        let formData: FormData = new FormData(document.forms[0]);

        //Meine URL auf Heroku
        let url: URL = new URL("http://127.0.0.1:8100/html");

        //let url: URL = new URL("https://gissose.herokuapp.com");


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
                document.querySelector("#antwort")!.innerHTML = data;
            });
    }

}