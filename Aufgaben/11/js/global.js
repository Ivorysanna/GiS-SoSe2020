"use strict";
var AlpakaShop;
(function (AlpakaShop) {
    function artikelSumme() {
        let aktuellerWarenkorb = JSON.parse(localStorage.getItem("warenkorb"));
        let summeArtikel = 0;
        for (let index = 0; index < aktuellerWarenkorb.length; index++) {
            summeArtikel += aktuellerWarenkorb[index].preis;
        }
        return summeArtikel;
    }
    AlpakaShop.artikelSumme = artikelSumme;
})(AlpakaShop || (AlpakaShop = {}));
//# sourceMappingURL=global.js.map