"use strict";
var AlpakaShop;
(function (AlpakaShop) {
    //Warenkorb leeren Methode
    function warenkorbLeeren() {
        localStorage.setItem("warenkorb", "[]");
    }
    document.querySelector("#ResetButton")?.addEventListener("click", function () {
        warenkorbLeeren();
        document.querySelector("#Produkte").innerHTML = " ";
    });
    let aktuellerWarenkorb = JSON.parse(localStorage.getItem("warenkorb"));
    function artikelEntfernenClick(_event) {
        produktIntZaehler++;
        produktAnzahlSpan.innerHTML = produktIntZaehler.toString();
        let target = _event.target;
        let artikelInt = parseInt(target.getAttribute("articleIndex"));
        let artikel = artikelArray[artikelInt];
        summeProdukte += artikel.preis;
        console.log(summeProdukte);
        //In den Warenkorb hinzufügen
        let aktuellerWarenkorb = JSON.parse(localStorage.getItem("warenkorb"));
        aktuellerWarenkorb.push(artikel);
        localStorage.setItem("warenkorb", JSON.stringify(aktuellerWarenkorb));
    }
    for (let index = 0; index < aktuellerWarenkorb.length; index++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("produkt");
        newDiv.innerHTML = `
            <img src="${aktuellerWarenkorb[index].bild}">
            <p>${aktuellerWarenkorb[index].name} <b>${aktuellerWarenkorb[index].preis} €</b>, ${aktuellerWarenkorb[index].bezeichnung}</p>
            <button type="button">Artikel entfernen</button>`;
        document.querySelector("#Produkte")?.appendChild(newDiv);
        let selectorButton = newDiv.querySelector("button");
        selectorButton?.addEventListener("click");
        selectorButton?.setAttribute("articleIndex", index.toString());
    }
})(AlpakaShop || (AlpakaShop = {}));
//# sourceMappingURL=warenkorb.js.map