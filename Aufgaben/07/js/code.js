"use strict";
var AlpakaShop;
(function (AlpakaShop) {
    let artikelArray = [];
    document.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log(_event);
    }
    let produktIntZaehler = 0;
    let produktAnzahlSpan = document.querySelector("#produktAnzahl");
    let summeProdukte = 0;
    function handleClick(_event) {
        produktIntZaehler++;
        produktAnzahlSpan.innerHTML = produktIntZaehler.toString();
        let target = _event.target;
        let artikelInt = parseInt(target.getAttribute("articleIndex"));
        let artikel = artikelArray[artikelInt];
        summeProdukte += artikel.preis;
        console.log(summeProdukte);
    }
    async function kategorienAnzeigen(kategoriename) {
        document.querySelector("#Produkte").innerHTML = " ";
        await communicate("https://ivorysanna.github.io/GiS-SoSe2020/Aufgaben/07/produkte.json");
        for (let index = 0; index < artikelArray.length; index++) {
            if (artikelArray[index].kategorie == kategoriename || "Alle" == kategoriename) {
                let newDiv = document.createElement("div");
                newDiv.classList.add("produkt");
                newDiv.innerHTML = `
                <img src="${artikelArray[index].bild}">
                <p>${artikelArray[index].name} <b>${artikelArray[index].preis} €</b>, ${artikelArray[index].bezeichnung}</p>
                <button type="button">In den Warenkorb</button>`;
                document.querySelector("#Produkte")?.appendChild(newDiv);
                let selectorButton = newDiv.querySelector("button");
                selectorButton?.addEventListener("click", handleClick);
                selectorButton?.setAttribute("articleIndex", index.toString());
            }
            // document.querySelector("a").innerText = "";
        }
    }
    //Array zugreifen in Json
    async function communicate(_url) {
        let response = await fetch(_url);
        artikelArray = await response.json();
    }
    document.querySelector("#AlpakasTitel")?.addEventListener("click", function () {
        kategorienAnzeigen("alpaka");
    });
    document.querySelector("#ZubehörTitel")?.addEventListener("click", function () {
        kategorienAnzeigen("zubehör");
    });
    document.querySelector("#AllesTitel")?.addEventListener("click", function () {
        kategorienAnzeigen("Alle");
    });
    kategorienAnzeigen("Alle");
})(AlpakaShop || (AlpakaShop = {}));
//# sourceMappingURL=code.js.map