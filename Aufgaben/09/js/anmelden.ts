namespace AnmeldeSeite {
    document.querySelector("#absendeButton")?.addEventListener("click", anmeldung);

    async function anmeldung(): Promise<void> {
        //Erstellt eine neue Formdata aus dem ersten Element im Formulararray
        let formData: FormData = new FormData(document.forms[0]);

        //Meine URL auf Heroku
        let url: URL = new URL("localhost:8100");

        //let url: URL = new URL("https://gissose.herokuapp.com");


        //Iteriert über die Einträge der FormData
        for (let entry of formData) {
            //Fügt die FormData entrys zur URL hinzu als Suchparameter hinzu
            url.searchParams.append(entry[0], entry[1].toString());
        }
        
        //Schickt Anfrage an die URL mit den Suchparamtern
        let response: Response = await fetch(url.href);
        console.log(response);
    }

}