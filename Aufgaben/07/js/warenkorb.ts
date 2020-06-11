namespace AlpakaShop {
    //Warenkorb leeren Methode
    function warenkorbLeeren(): void {
        localStorage.setItem("warenkorb", "[]");
    }

    document.querySelector("#ResetButton")?.addEventListener("click", function (): void {
        warenkorbLeeren();
        document.querySelector("#Produkte")!.innerHTML = " ";
        warenkorbSummeAnzeigen();
    });

    let aktuellerWarenkorb: Artikel[] = JSON.parse(localStorage.getItem("warenkorb")!);

    function artikelEntfernenClick(_event: Event): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        let artikelInt: number = parseInt(target.getAttribute("articleIndex")!);
        let artikel: Artikel = aktuellerWarenkorb[artikelInt];

        //Artikel einzeln aus Warenkorb entfernen
        let entfernenIndex: number = aktuellerWarenkorb.indexOf(artikel);
        if (entfernenIndex > -1) {
            aktuellerWarenkorb.splice(entfernenIndex, 1);
        }

        localStorage.setItem("warenkorb", JSON.stringify(aktuellerWarenkorb));

        target.parentNode?.parentNode?.removeChild(target.parentNode);
        warenkorbSummeAnzeigen();
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
        selectorButton?.addEventListener("click", artikelEntfernenClick);
        selectorButton?.setAttribute("articleIndex", index.toString());
    }
    warenkorbSummeAnzeigen();

    function warenkorbSummeAnzeigen(): void {
        document.querySelector("#summeArtikel")!.innerHTML = artikelSumme() + " €";
    }

}