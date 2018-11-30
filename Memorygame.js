var fondcarte = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
var affichagecarte = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var carterecto = [];
var pairestrouvees = 0;


var imageCartes = document.getElementById("memory").getElementsByTagName("img");

for (var i = 0; i < imageCartes.length; i++) {
    imageCartes[i].noCarte = i; //Ajout de la propriété noCarte à l'objet image// Add the noCards property to the image object //
    imageCartes[i].onclick = function () {
        controleJeu(this.noCarte);
    }
}


reprogrammationCarte();

document.getElementById("pagescore").style.display = "none";


//Mélange des cartes//mixing cards//
function reprogrammationCarte() {
    for (var position = fondcarte.length - 1; position >= 1; position--) {

        var melangecarte = Math.floor(Math.random() * (position + 1));
        var sauver = fondcarte[position];
        fondcarte[position] = fondcarte[melangecarte];
        fondcarte[melangecarte] = sauver;
    }
}

function controleJeu(noCarte) {
    if (carterecto.length < 2) {

        if (affichagecarte[noCarte] === 0) {
            affichagecarte[noCarte] = 1;
            carterecto.push(noCarte);
            miseajourAffichage(noCarte);
        }
        if (carterecto.length === 2) {
            var nouveauEtat = 0;
            if (fondcarte[carterecto[0]] === fondcarte[carterecto[1]]) {
                nouveauEtat = -1;
                pairestrouvees++;
                document.getElementById("paire").innerHTML = pairestrouvees ;
            }

            affichagecarte[carterecto[0]] = nouveauEtat;
            affichagecarte[carterecto[1]] = nouveauEtat;

            setTimeout(function () {
                miseajourAffichage(carterecto[0]);
                miseajourAffichage(carterecto[1]);
                carterecto = [];
                if (pairestrouvees === 8) {

                    document.getElementById("pagescore").style.display = "inline-block";
                    document.getElementById("memory").style.display = "none";
                    clearTimeout(temps)
                }
            }, 700);
        }
    }

}

//Affichage des fond de carte et des images de carte//Showing background map and map images//
function miseajourAffichage(noCarte) {

    if (affichagecarte[noCarte] === 0) {


        imageCartes[noCarte].src = "doscarte.gif";
    }

    if (affichagecarte[noCarte] === 1) {
        imageCartes[noCarte].src = "photo" + fondcarte[noCarte] + ".gif";


    }

    if (affichagecarte[noCarte] === -1) {
        imageCartes[noCarte].style.visibility = "hidden";

    }
}

//compte a rebours//count down//
var secondes = document.getElementById("secondes");
var minutes = document.getElementById("minutes");
var s = 59;
var m = 1;
var temps;
var son = document.getElementById("alarme");


var countDown = function () {

    clearTimeout(temps);

    temps = setTimeout(countDown, 1000);

    if (s > 0) {
        secondes.innerHTML = (s = s - 1);
    }
    minutes.innerHTML = m;


    if (s == 0) {


        if (m > 0) {
            minutes.innerHTML = (m = m - 1);
            s = 59;
        }
        secondes.innerHTML = s;
    }
    if (s === 0 && m === 0) {
        document.getElementById("pagescore").style.display = "inline-block";
        document.getElementById("memory").style.display = "none";

    }
};


countDown();






function resett() {

    location.reload();

}



