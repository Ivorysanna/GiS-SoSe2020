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
        warenkorbSummeAnzeigen();
    });
    let aktuellerWarenkorb = JSON.parse(localStorage.getItem("warenkorb"));
    function artikelEntfernenClick(_event) {
        let target = _event.target;
        let artikelInt = parseInt(target.getAttribute("articleIndex"));
        let artikel = aktuellerWarenkorb[artikelInt];
        //Artikel einzeln aus Warenkorb entfernen
        let entfernenIndex = aktuellerWarenkorb.indexOf(artikel);
        if (entfernenIndex > -1) {
            aktuellerWarenkorb.splice(entfernenIndex, 1);
        }
        localStorage.setItem("warenkorb", JSON.stringify(aktuellerWarenkorb));
        target.parentNode?.parentNode?.removeChild(target.parentNode);
        warenkorbSummeAnzeigen();
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
        selectorButton?.addEventListener("click", artikelEntfernenClick);
        selectorButton?.setAttribute("articleIndex", index.toString());
    }
    warenkorbSummeAnzeigen();
    function warenkorbSummeAnzeigen() {
        document.querySelector("#summeArtikel").innerHTML = AlpakaShop.artikelSumme() + " €";
    }
})(AlpakaShop || (AlpakaShop = {}));
//# sourceMappingURL=warenkorb.js.map