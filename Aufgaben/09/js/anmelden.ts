namespace AnmeldeSeite {
    document.querySelector("#htmlButton")?.addEventListener("click", htmlAnmeldung);
    document.querySelector("#jsonButton")?.addEventListener("click", jsonAnmeldung);

    async function htmlAnmeldung(): Promise<void> {
        //Erstellt eine neue Formdata aus dem ersten Element im Formulararray
        let formData: FormData = new FormData(document.forms[0]);

        //Meine URL auf Heroku html
        let url: URL = new URL("https://gissose.herokuapp.com/html");


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

    async function jsonAnmeldung(): Promise<void> {
        //Erstellt eine neue Formdata aus dem ersten Element im Formulararray
        let formData: FormData = new FormData(document.forms[0]);
        
        //Meine URL auf Heroku json
        let url: URL = new URL("https://gissose.herokuapp.com/json");
        

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
                console.log(data);
            });
    }

}