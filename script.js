const divResult = document.getElementById("resultat"); // document.querySelector("#resultat");

var tabStart = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

var tabResult = createTabRandom();
var firstClick = [];
var cardsDisplay = 0;
var ready = true; // pour afficher le 2-e image meme s'il ne corresponds pas

displayTable()
function displayTable() {
    var txt = "";
    for(var i=0; i < tabStart.length ; i++) { //parcourir 1 line 
        txt += "<div>"; //afficher dans html
        for(var j=0; j < tabStart[i].length ; j++) { //parcourir tout les 4 lines
            if(tabStart[i][j] === 0) { //afficher les boutons
                txt += "<button class='btn btn-light m-2' style='width:90px;height:90px' onClick='matching(\""+ i +"-"+ j +"\")'>click</button>";
                // pour activer "" dans la function matching() il faut utiliser \" pour ouvrir et fermer les parametres, parce que "" deja commence avec button
            } else { // afficher un image a la place de bouton
                txt += "<img src='" + getImage(tabStart[i][j]) + "' style='width:90px;height:90px' class='m-2'>";
            }
        }
        txt += "</div>";
    }
    divResult.innerHTML = txt;
}
function getImage(valeur) {
    var imgTxt = "img/";
    switch(valeur){
        case 1 : imgTxt += "elephant.png";
        break;
        case 2 : imgTxt += "giraffe.png";
        break;
        case 3 : imgTxt += "hippo.png";
        break;
        case 4 : imgTxt += "monkey.png";
        break;
        case 5 : imgTxt += "panda.png";
        break;
        case 6 : imgTxt += "parrot.png";
        break;
        case 7 : imgTxt += "penguin.png";
        break;
        case 8 : imgTxt += "pig.png";
        break;
        default : console.log("cas n'existe pas")
    }
    return imgTxt;
}
function matching(clickButton) { // onClick pour element clické
    if(ready) {
        cardsDisplay++;

        var ligne = clickButton.substr(0,1); // decouper, recuperer le 1 valeur
        var colonne = clickButton.substr(2,1);
        tabStart[ligne][colonne] = tabResult[ligne][colonne]; 
        displayTable();
    
        if(cardsDisplay > 1) { // > 1 - deux images clickés - on fait matchingication
            ready = false;
            setTimeout(() => { // timer pour montres les images meme s'ils sont differons
                //verification
                if(tabStart[ligne][colonne] !== tabStart[firstClick[0]][firstClick[1]]) {
                    tabStart[ligne][colonne] = 0;
                    tabStart[firstClick[0]][firstClick[1]] = 0;
                }
                displayTable();
                ready = true;
                cardsDisplay = 0;
                firstClick = [ligne,colonne];
            },1000) // durée de timer
        } else {
            firstClick = [ligne,colonne];
        } 
    }
}
function createTabRandom() { // renouveler les images du tableau dans un ordre aléatoire
    var tab = []; // reenvoyer un tableau + retunr a la fin
    var nbImagePosition = [0,0,0,0,0,0,0,0]; // pour initialiser tableau au 0
    
    for(var i = 0 ; i < 4 ; i++) { // lignes
        var ligne = [];
        for(var j = 0 ; j < 4 ; j++) { // colonnes
            var fin = false;
            while(!fin) { // pour recommencer
                var randomImage = Math.floor(Math.random() * 8); // gerer les chiffres entre 0 et 7
                if(nbImagePosition[randomImage] < 2) { //pas plus que 2 images
                    ligne.push(randomImage + 1); // +1 parce que dans switch ça commence par 1, dans le tableau par 0
                    nbImagePosition[randomImage]++;
                    fin = true; // pou sortir boucle while
                }
            }
        }
        tab.push(ligne); // rajouter lines au tableau corresponds a boucle for
    }
    return tab; // pour var tab il faut faire retun
}