"use strict";
var AlpakaShop;
(function (AlpakaShop) {
    let artikelArray = [
        { name: "Chuck", preis: 610, bezeichnung: "männlich, Junges Tier", bild: "Alpaka/GrauesAlpaka.jpg", kategorie: "alpaka" },
        { name: "Daisy", preis: 550, bezeichnung: "weiblich, jüngstes Tier", bild: "Alpaka/BabyAlpaka.jpg", kategorie: "alpaka" },
        { name: "Bolle", preis: 600, bezeichnung: "männlich, liegt gerne in der Sonne", bild: "Alpaka/braunesAlpaka2.jpg", kategorie: "alpaka" },
        { name: "Alwin", preis: 700, bezeichnung: "männlich, isst gerne Stroh", bild: "Alpaka/DunkelBraunAlpaka.jpg", kategorie: "alpaka" },
        { name: "Al Pacone", preis: 800, bezeichnung: "männlich, ist edler Herkunft", bild: "Alpaka/Weiß-SchwarzAlpaka.jpg", kategorie: "alpaka" },
        { name: "Hansi", preis: 450, bezeichnung: "männlich, langhaar Alpaka", bild: "Alpaka/langhaarAlpaka.jpg", kategorie: "alpaka" },
        { name: "Marie", preis: 580, bezeichnung: "weiblich, sehr zutraulich auch Kindern gegenüber", bild: "Alpaka/RotesAlpaka.jpg", kategorie: "alpaka" },
        { name: "Keira", preis: 660, bezeichnung: "weiblich, verspielt", bild: "Alpaka/weißesAlpaka.jpg", kategorie: "alpaka" },
        { name: "Lucy", preis: 650, bezeichnung: "weiblich, ein Geschwisterpaar, ihr Bruder: Loki", bild: "Alpaka/Alpakazwilling2.jpg", kategorie: "alpaka" },
        { name: "Loki", preis: 690, bezeichnung: "männlich, ein Geschwisterpaar, seine Schwester: Lucy", bild: "Alpaka/Alpakazwilling1.jpg", kategorie: "alpaka" },
        { name: "Milky", preis: 760, bezeichnung: "männlich, hat eine schöne Frisur", bild: "Alpaka/WeißerStreifenAlpaka.jpg", kategorie: "alpaka" },
        { name: "Mirri", preis: 1000, bezeichnung: "weiblich, leckt gerne Salzsteine", bild: "Alpaka/AlpakaOrange.jpg", kategorie: "alpaka" },
        { name: "Marstall Futter", preis: 12, bezeichnung: "Ausgewogenes Futter für junge und erwachsene Alpakas", bild: "Zubehör/Futter.jpg", kategorie: "zubehör" },
        { name: "Stroh", preis: 9, bezeichnung: "Futter, 5 Kilogramm", bild: "Zubehör/strohballen.jpg", kategorie: "zubehör" },
        { name: "Leckstein", preis: 7, bezeichnung: "Leckstein für Alpakas, Pferde, etc.", bild: "Zubehör/Leckstein.png", kategorie: "zubehör" },
        { name: "Kleiner Zaun", preis: 1500, bezeichnung: "5 Meter Radius, ausreichender Platz für ein Alpaka", bild: "Zubehör/Zaun.jpg", kategorie: "zubehör" },
        { name: "Futterspielzeug", preis: 25, bezeichnung: "Förderung der Alpakas", bild: "Zubehör/Spielzeug.jpg", kategorie: "zubehör" },
        { name: "Trinkstelle", preis: 200, bezeichnung: "Eine Trinkstelle für Alpakas, Pferde, etc.", bild: "Zubehör/trinkstelle.jpg", kategorie: "zubehör" },
        { name: "Stall für Alpakas", preis: 5.000, bezeichnung: "Stall wird auf Anfrage hergestellt.", bild: "Zubehör/AlpakaStall.jpg", kategorie: "zubehör" },
        { name: "Schafschere", preis: 20, bezeichnung: "aus purem Stahl, gut um Schafe und Alpakas zu scheren.", bild: "Zubehör/schere.png", kategorie: "zubehör" },
        { name: "Kissen in Alpakaform", preis: 15, bezeichnung: "2 verschiedene Farben, 50 % Alpakafell", bild: "Zubehör/AlpakaKissen.jpg", kategorie: "zubehör" },
        { name: "Alpaka Sticker", preis: 10, bezeichnung: "14 Stück", bild: "Zubehör/AlpakaSticker.png", kategorie: "zubehör" },
        { name: "Socken aus Alpakafell", preis: 40, bezeichnung: "3 Paar, 100 % Alpakafell", bild: "Zubehör/socken.jpg", kategorie: "zubehör" },
        { name: "Garn aus Alpakafell", preis: 17, bezeichnung: "Aus 100 % Alpakafell", bild: "Zubehör/alpakagarn.jpg", kategorie: "zubehör" }
    ];
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
    function kategorienAnzeigen(kategoriename) {
        document.querySelector("#Produkte").innerHTML = " ";
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