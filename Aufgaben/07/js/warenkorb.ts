namespace AlpakaShop {
    //Warenkorb leeren Methode
    function warenkorbLeeren() {
        localStorage.setItem("warenkorb", "[]");
    }

    document.querySelector("#ResetButton")?.addEventListener("click", function (): void {
        warenkorbLeeren();
        document.querySelector("#Produkte")!.innerHTML = " ";
    });

    let aktuellerWarenkorb: Artikel[] = JSON.parse(localStorage.getItem("warenkorb")!);

    function artikelEntfernenClick(_event: Event): void {
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


    for (let index: number = 0; index < aktuellerWarenkorb.length; index++) {
        let newDiv: HTMLDivElement = document.createElement("div");
        newDiv.classList.add("produkt");
        newDiv.innerHTML = `
            <img src="${aktuellerWarenkorb[index].bild}">
            <p>${aktuellerWarenkorb[index].name} <b>${aktuellerWarenkorb[index].preis} €</b>, ${aktuellerWarenkorb[index].bezeichnung}</p>
            <button type="button">Artikel entfernen</button>`;

        document.querySelector("#Produkte")?.appendChild(newDiv);


        let selectorButton: HTMLButtonElement = <HTMLButtonElement>newDiv.querySelector("button");
        selectorButton?.addEventListener("click");
        selectorButton?.setAttribute("articleIndex", index.toString());

    }

}