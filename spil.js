
// De fem terningers øjne. Hvert tal er mellem 1 og 6.
let terninger = [1, 1, 1, 1, 1];

// Holder vi fast i terning nummer i? Så bliver den ikke kastet igen.
let fastholdt = [false, false, false, false, false];

// Hvor mange gange har vi kastet i denne runde? 0, 1, 2 eller 3.
let antalKast = 0;

// Blokkens 15 felter. null betyder "feltet er ikke udfyldt endnu".
let valgtePoint = {
    enere: null,
    toere: null,
    treere: null,
    firere: null,
    femmere: null,
    seksere: null,
    etPar: null,
    toPar: null,
    treEns: null,
    fireEns: null,
    fuldtHus: null,
    lilleStraight: null,
    storStraight: null,
    chance: null,
    yatzy: null
};


/* ---------- Handlinger i spillet ---------- */

// Kaster de terninger, som ikke bliver holdt fast
function kastTerninger() {

    // Når man kaster, er sidste runde endeligt slut.
    for (let i = 0; i < 5; i++) {
        if (fastholdt[i] === false) {
            terninger[i] = Math.floor(Math.random() * 6) + 1;
        }
    }
    antalKast = antalKast + 1;
}

// Skifter mellem at holde fast i en terning og at slippe den igen
function vendFastholdt(i) {
    if (fastholdt[i] === true) {
        fastholdt[i] = false;
    } else {
        fastholdt[i] = true;
    }
}

// Runden er slut: vi starter forfra med tre nye kast
function afslutRunde() {
    antalKast = 0;
    fastholdt = [false, false, false, false, false];
}

// Nulstiller hele spillet
function nytSpil() {
    terninger = [1, 1, 1, 1, 1];
    fastholdt = [false, false, false, false, false];
    antalKast = 0;
    for (let felt in valgtePoint) {
        valgtePoint[felt] = null;
    }
}


/* ---------- Hjælpefunktion ---------- */

// Tæller hvor mange terninger der viser hvert øjental.
// Viser terningerne fx 3, 3, 3, 5, 5, bliver antal[3] = 3 og antal[5] = 2.
// Plads nummer 0 bruges ikke - så passer tallene med øjnene.
function tælØjne() {
    let antal = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 5; i++) {
        antal[terninger[i]] = antal[terninger[i]] + 1;
    }
    return antal;
}


/* ---------- Point for de seks øverste felter ---------- */

// pointForØjental(4) giver fx 8, hvis der ligger to firere
function pointForØjental(øjental) {
    let antal = tælØjne();
    return antal[øjental] * øjental;
}


/* ---------- Point for de nederste felter ---------- */

// Vi tæller nedad fra 6, fordi det højeste par giver flest point
function pointForEtPar() {
    let antal = tælØjne();
    for (let øjne = 6; øjne >= 1; øjne--) {
        if (antal[øjne] >= 2) {
            return øjne * 2;
        }
    }
    return 0;
}

// To par skal være to forskellige par, fx to femmere og to treere
function pointForToPar() {
    let antal = tælØjne();
    let førstePar = 0;
    let andetPar = 0;
    for (let øjne = 6; øjne >= 1; øjne--) {
        if (antal[øjne] >= 2) {
            if (førstePar === 0) {
                førstePar = øjne;
            } else if (andetPar === 0) {
                andetPar = øjne;
            }
        }
    }
    if (førstePar > 0 && andetPar > 0) {
        return førstePar * 2 + andetPar * 2;
    }
    return 0;
}

function pointForTreEns() {
    let antal = tælØjne();
    for (let øjne = 6; øjne >= 1; øjne--) {
        if (antal[øjne] >= 3) {
            return øjne * 3;
        }
    }
    return 0;
}

function pointForFireEns() {
    let antal = tælØjne();
    for (let øjne = 6; øjne >= 1; øjne--) {
        if (antal[øjne] >= 4) {
            return øjne * 4;
        }
    }
    return 0;
}

// Fuldt hus er præcis tre ens og to ens, fx 4, 4, 4, 2, 2
function pointForFuldtHus() {
    let antal = tælØjne();
    let treEns = 0;
    let toEns = 0;
    for (let øjne = 1; øjne <= 6; øjne++) {
        if (antal[øjne] === 3) {
            treEns = øjne;
        }
        if (antal[øjne] === 2) {
            toEns = øjne;
        }
    }
    if (treEns > 0 && toEns > 0) {
        return treEns * 3 + toEns * 2;
    }
    return 0;
}

// Lille straight er 1, 2, 3, 4, 5 og giver altid 15 point
function pointForLilleStraight() {
    let antal = tælØjne();
    if (antal[1] === 1 && antal[2] === 1 && antal[3] === 1 && antal[4] === 1 && antal[5] === 1) {
        return 15;
    }
    return 0;
}

// Stor straight er 2, 3, 4, 5, 6 og giver altid 20 point
function pointForStorStraight() {
    let antal = tælØjne();
    if (antal[2] === 1 && antal[3] === 1 && antal[4] === 1 && antal[5] === 1 && antal[6] === 1) {
        return 20;
    }
    return 0;
}

// Chance er bare alle fem terninger lagt sammen
function pointForChance() {
    let sum = 0;
    for (let i = 0; i < 5; i++) {
        sum = sum + terninger[i];
    }
    return sum;
}

// Fem ens giver 50 point
function pointForYatzy() {
    let antal = tælØjne();
    for (let øjne = 1; øjne <= 6; øjne++) {
        if (antal[øjne] === 5) {
            return 50;
        }
    }
    return 0;
}


/* ---------- Hvad giver terningerne i ét bestemt felt? ---------- */

function beregnPoint(felt) {
    if (felt === "enere") return pointForØjental(1);
    if (felt === "toere") return pointForØjental(2);
    if (felt === "treere") return pointForØjental(3);
    if (felt === "firere") return pointForØjental(4);
    if (felt === "femmere") return pointForØjental(5);
    if (felt === "seksere") return pointForØjental(6);
    if (felt === "etPar") return pointForEtPar();
    if (felt === "toPar") return pointForToPar();
    if (felt === "treEns") return pointForTreEns();
    if (felt === "fireEns") return pointForFireEns();
    if (felt === "fuldtHus") return pointForFuldtHus();
    if (felt === "lilleStraight") return pointForLilleStraight();
    if (felt === "storStraight") return pointForStorStraight();
    if (felt === "chance") return pointForChance();
    if (felt === "yatzy") return pointForYatzy();
    return 0;
}

// Skriver point ind i feltet og slutter runden.

function vælgFelt(felt) {
   valgtePoint[felt] = beregnPoint(felt);
    afslutRunde();
}

// Må man vælge et felt lige nu?
// Det må man, når der er kastet mindst én gang i runden.
function måVælgeFelt() {
    return antalKast > 0;
}


/* ---------- Sum, bonus og total ---------- */

// Sum af de seks øverste felter
function beregnSum() {
    let øverste = ["enere", "toere", "treere", "firere", "femmere", "seksere"];
    let sum = 0;
    for (let i = 0; i < øverste.length; i++) {
        let felt = øverste[i];
        if (valgtePoint[felt] !== null) {
            sum = sum + valgtePoint[felt];
        }
    }
    return sum;
}

// Er summen af de øverste felter mindst 63, giver det 50 point i bonus
function beregnBonus() {
    if (beregnSum() >= 63) {
        return 50;
    }
    return 0;
}

// Alle udfyldte felter lagt sammen, plus bonussen
function beregnTotal() {
    let total = beregnBonus();
    for (let felt in valgtePoint) {
        if (valgtePoint[felt] !== null) {
            total = total + valgtePoint[felt];
        }
    }
    return total;
}

// Er alle 15 felter udfyldt? Så er spillet slut.
function alleFelterErUdfyldt() {
    for (let felt in valgtePoint) {
        if (valgtePoint[felt] === null) {
            return false;
        }
    }
    return true;
}
