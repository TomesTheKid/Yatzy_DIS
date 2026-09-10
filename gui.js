/* ============================================================
   GUI-KODEN
   Denne fil binder HTML-siden sammen med reglerne i spil.js.
   Den lytter efter klik og skriver tal ud i felterne.
   Den regner ikke selv point ud - det gør spil.js.
   ============================================================ */

// Billedet til hvert øjental. terningeBilleder[3] er terningen med tre øjne.
// Plads nummer 0 er tom, så tallene passer med øjnene.
let terningeBilleder = [
    "",
    "dice-six-faces-one.png",
    "dice-six-faces-two.png",
    "dice-six-faces-three.png",
    "dice-six-faces-four.png",
    "dice-six-faces-five.png",
    "dice-six-faces-six.png"
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
    if (antalKast >= 3 || alleFelterErUdfyldt()) {
        return;
    }

    kastTerninger();
    opdaterSiden();
    
    // Man har tre kast i hver runde, og spillet skal ikke være slut

});


/* ---------- Klik på "Nyt spil" ---------- */

nytSpilKnap.addEventListener("click", function () {
    nytSpil();
    besked.textContent = "Nyt spil. Klik på \"Kast terningerne\" for at gå i gang.";
    opdaterSiden();

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
    
    if (antalKast === 0){
        return;
    }

    if (valgtePoint[felt] !== null) {
        return;
    }

    vælgfelt(felt);
    opdaterSiden();

    if (alleFelterErUdfyldt()) {
        spørgOmNytSpil();
    }


    // Man skal have kastet mindst én gang i runden


    // Et felt fra en tidligere runde er låst og kan ikke bruges igen.


    // Skriv point i feltet og slut runden

}


/* ---------- Spillet er slut: spørg om et nyt spil ---------- */

function spørgOmNytSpil() {
    besked.textContent = "Spillet er slut. Du fik " + beregnTotal() + " point.";
    if (window.confirm("Vil du starte et nyt spil?")) {
        nytSpil();
        opdaterSiden();
        besked.textContent = "Klik på \"Kast terningerne\" for at gå i gang.";
    }
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
// for alle 15 felter gem den nuværende i felt og gem element med det felt som id i feltboks
// Hvis dine valgte point 
function visFelter() {
    for(let i = 0; i < felter.length; i++){
        let felt = felter[i];
        let felteboks = document.getElementById(felt);

        if(valgtePoint[felt] !== null){
            // feltet er kåst med de point man valgte
            felteboks.value = valgtePoint[felt];
            felteboks.classList.add("låst");
            felteboks.classList.remove("forslag");
        } else if (måVælgeFelt() === true) {
            // feltet er tomt så viser hvad kastet ville give
            felteboks.value = beregnPoint(felt);
            felteboks.classList.add("forslag");
            felteboks.classList.remove("låst");
        } else {
            //Ny runde uden kast så felterne står tomme
            felteboks.value = "";
            felteboks.classList.remove("forslag");
            felteboks.classList.remove("låst");
        }
    }
    

}


/* ---------- Vis sum, bonus og total ---------- */
// element med "sum" som id skal vise resultatet af beregnSum()
// element med "bonus" som id skal vise resultatet af beregnBonus()
// element med "total" som id skal vise resultatet af beregnTotal()
function visSummer() {
    document.getElementById("sum").value = beregnSum();
    document.getElementById8("bonus").value = beregnBonus();
    document.getElementById("total").value = beregnTotal();
}

/* ---------- Vis teksten over knappen ---------- */
// hvis alle felter er udfyldt står der "spillet er slut"
// ellers hvis antal kast er 0 står der "Ny runde. Du har 3 kast"
// ellers hvis antal kast er under 3 står der "Kast nummer x af 3.  Klik på de terninger du vil beholde"
// ellers står der "Kast nummer 3 af 3. Vælg nu et felt på blokken"
function visTurtekst() {
    if(alleFelterErUdfyldt() === true){
        turtekst.textContent = "Spillet er slut";
    } else if (antalKast === 0) {
        turtekst.textContent = "Ny runde. Du har 3 kast"
    } else if (antalKast < 3) {
        turtekst.textContent = "Kast nummer " + antalKast + " af 3. Klik på de terninger du vil beholde"
    } else {
        turtekst.textContent = "Kast nummer 3 af 3. Vælg nu et felt på blokken.";
    }
}


/* ---------- Tænd og sluk for kaste-knappen ---------- */
// hvis antal kast er 3 eller alleFelter er udfyldt blir knap.disabled sat til true
// ellers blir den sat til false og man kan trykke på den
function visKnap() {
    if(antalKast == 3 || alleFelterErUdfyldt() === true){
        kastKnap.disapled = true;
    } else {
        kastKnap.disabled = false;
    }
}


/* ---------- Opdater hele siden på én gang ---------- */

function opdaterSiden() {
    visTernigner();
    visFelter();
    visSummer();
    visTurtletekst();
    visKnap();
}


/* ---------- Når siden åbnes ---------- */

opdaterSiden();
besked.textContent = "Klik på \"Kast terningerne\" knappen for at gå i gang";
