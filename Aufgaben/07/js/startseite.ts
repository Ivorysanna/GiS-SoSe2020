namespace AlpakaShop {
    if (!localStorage.getItem("warenkorb")){
        localStorage.setItem("warenkorb", "[]");
    }

    let artikelArray: Artikel[] = [

    ];

    let produktIntZaehler: number = 0;
    let produktAnzahlSpan: HTMLSpanElement = <HTMLSpanElement>document.querySelector("#produktAnzahl");
    let summeProdukte: number = 0;

    function artikelWarenkorbClick(_event: Event): void {
        produktIntZaehler++;

        produktAnzahlSpan.innerHTML = produktIntZaehler.toString();

        let target: HTMLElement = <HTMLElement>_event.target;
        let artikelInt: number = parseInt(target.getAttribute("articleIndex")!);
        let artikel: Artikel = artikelArray[artikelInt];


        summeProdukte += artikel.preis;
        console.log(summeProdukte);

        //In den Warenkorb hinzufügen
        let aktuellerWarenkorb: Artikel[] = JSON.parse(localStorage.getItem("warenkorb")!);
        aktuellerWarenkorb.push(artikel);
        localStorage.setItem("warenkorb", JSON.stringify(aktuellerWarenkorb));
    }



    async function kategorienAnzeigen(kategoriename: string): Promise<void> {

        document.querySelector("#Produkte")!.innerHTML = " ";

        await communicate("https://ivorysanna.github.io/GiS-SoSe2020/Aufgaben/07/produkte.json");

        for (let index: number = 0; index < artikelArray.length; index++) {
            if (artikelArray[index].kategorie == kategoriename || "Alle" == kategoriename) {
                let newDiv: HTMLDivElement = document.createElement("div");
                newDiv.classList.add("produkt");
                newDiv.innerHTML = `
                <img src="${artikelArray[index].bild}">
                <p>${artikelArray[index].name} <b>${artikelArray[index].preis} €</b>, ${artikelArray[index].bezeichnung}</p>
                <button type="button">In den Warenkorb</button>`;

                document.querySelector("#Produkte")?.appendChild(newDiv);

                let selectorButton: HTMLButtonElement = <HTMLButtonElement>newDiv.querySelector("button");
                selectorButton?.addEventListener("click", artikelWarenkorbClick);
                selectorButton?.setAttribute("articleIndex", index.toString());
            }
        }
    }

    //Array zugreifen in Json
    async function communicate(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        artikelArray = await response.json();
    }

    document.querySelector("#AlpakasTitel")?.addEventListener("click", function (): void {
        kategorienAnzeigen("alpaka");

    });

    document.querySelector("#ZubehörTitel")?.addEventListener("click", function (): void {
        kategorienAnzeigen("zubehör");

    });

    document.querySelector("#AllesTitel")?.addEventListener("click", function (): void {
        kategorienAnzeigen("Alle");

    });

    kategorienAnzeigen("Alle");


}
