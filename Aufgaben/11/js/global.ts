namespace AlpakaShop {

    export interface Artikel {
        name: string;
        preis: number;
        bezeichnung: string;
        bild: string;
        kategorie: string;
    }

    export function artikelSumme(): number {
        let aktuellerWarenkorb: Artikel[] = JSON.parse(localStorage.getItem("warenkorb")!);
        
        let summeArtikel: number = 0;
        for (let index: number = 0; index < aktuellerWarenkorb.length; index++) {
            summeArtikel += aktuellerWarenkorb[index].preis;
        }
        return summeArtikel;
    }

}