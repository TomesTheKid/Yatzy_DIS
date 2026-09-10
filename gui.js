/* ============================================================
   GUI-KODEN
   Denne fil binder HTML-siden sammen med reglerne i spil.js.
   Den lytter efter klik og skriver tal ud i felterne.
   Den regner ikke selv point ud - det gør spil.js.
   ============================================================ */

// Billedet til hvert øjental. terningeBilleder[3] er terningen med tre øjne.
// Plads nummer 0 er tom, så tallene passer med øjnene.
let terningeBilleder = [

];

// De 15 felter i samme rækkefølge som på siden.
// Navnene passer med id'erne i HTML'en og med nøglerne i valgtePoint.
let felter = [

];

let kastKnap = document.getElementById("kastKnap");
let nytSpilKnap = document.getElementById("nytSpilKnap");
let turtekst = document.getElementById("turtekst");
let besked = document.getElementById("besked");


/* ---------- Klik på "Kast terningerne" ---------- */

kastKnap.addEventListener("click", function () {
    // Man har tre kast i hver runde, og spillet skal ikke være slut

});


/* ---------- Klik på "Nyt spil" ---------- */

nytSpilKnap.addEventListener("click", function () {

});


/* ---------- Klik på en terning: hold fast eller slip ---------- */

for (let i = 0; i < 5; i++) {
    let terning = document.getElementById("terning" + i);
    terning.addEventListener("click", function () {
        // Man kan kun holde fast, når der er kastet mindst én gang,
        // og der stadig er et kast tilbage

    });
}


/* ---------- Klik på et felt på blokken ---------- */

// Navnet til venstre er en label med for="...", der peger på feltet.
// Derfor virker det også at klikke på selve navnet.
for (let i = 0; i < felter.length; i++) {
    let felt = felter[i];
    document.getElementById(felt).addEventListener("click", function () {
        klikPåFelt(felt);
    });
}

function klikPåFelt(felt) {
    // Man skal have kastet mindst én gang i runden


    // Et felt fra en tidligere runde er låst og kan ikke bruges igen.


    // Skriv point i feltet og slut runden

}


/* ---------- Spillet er slut: spørg om et nyt spil ---------- */

function spørgOmNytSpil() {

}


/* ---------- Vis terningerne ---------- */

function visTerninger() {
    // En terning, der holdes fast, får en GUL ramme
    for(let i = 0; i < 5; i++){
        const t = document.getElementById('terning' + i)
        t.src = terningeBilleder[terninger[1]];
        t.alt = 'Terning med' + terninger[i] + "øjne"

        if(fastholdt[i] == true){
            t.classList.add('fastholdt')
        } else {
            t.classList.remove('fastholdt')
        }
    } 
}


/* ---------- Vis de 15 felter ---------- */

function visFelter() {
    // Er feltet låst med de point, man valgte?
    // Er feltet tomt, men der er kastet? Så viser vi hvad kastet ville give her.
    // Ny runde uden kast: felterne står tomme.

}


/* ---------- Vis sum, bonus og total ---------- */

function visSummer() {

}


/* ---------- Vis teksten over knappen ---------- */

function visTurtekst() {

}


/* ---------- Tænd og sluk for kaste-knappen ---------- */

function visKnap() {

}


/* ---------- Opdater hele siden på én gang ---------- */

function opdaterSiden() {

}


/* ---------- Når siden åbnes ---------- */

opdaterSiden();
besked.textContent = "Klik på \"Kast terningerne\" for at gå i gang.";
