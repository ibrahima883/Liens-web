/* 
Activité 1
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
var listeLiens = [
    {
        titre: "So Foot",
        url: "http://sofoot.com",
        auteur: "yann.usaille"
    },
    {
        titre: "Guide d'autodéfense numérique",
        url: "http://guide.boum.org",
        auteur: "paulochon"
    },
    {
        titre: "L'encyclopédie en ligne Wikipedia",
        url: "http://Wikipedia.org",
        auteur: "annie.zette"
    }
];

// TODO : compléter ce fichier pour ajouter les liens à la page web

var contenuElt = document.getElementById("contenu");

// Fonction d'ajout d'un lien 
function ajouterLien(titre, url, auteur) {
    
    // Création d'un élément "a" contenant le titre du lien
    var titreElt = document.createElement("a");
    titreElt.textContent = titre; 
    titreElt.href = url; 
    titreElt.style = "color: #428bca; font-weight: bold; text-decoration-line: none;"; 
    
    // Création d'un élément "span" contenant l'url et l'auteur du lien
    var urlAuteurElt = document.createElement("span");
    
    // Ajout de le l'adresse du lien
    urlAuteurElt.appendChild(document.createTextNode(" " + url));
    
    // Ajout d'un retour à la ligne
    urlAuteurElt.appendChild(document.createElement("br"));
    
    // Ajout du nom de l'auteur
    urlAuteurElt.appendChild(document.createTextNode(" Ajouté par " + auteur));
    
    // Création d'un élément "div" contenant toutes les infos du lien
    var lienElt = document.createElement("div");
    lienElt.setAttribute("class", "lien");
    lienElt.appendChild(titreElt);
    lienElt.appendChild(urlAuteurElt);
    
    // Ajout du lien sur la page au dessus des autres
    contenuElt.insertBefore(lienElt, contenuElt.firstChild);
}

// Ajout des liens du tableau sur la page
for (var i = listeLiens.length - 1; i >= 0; i--) { 
    ajouterLien(listeLiens[i].titre, listeLiens[i].url, listeLiens[i].auteur);
}


/* 
Activité 2
*/

// Changement des titres
document.querySelector("title").textContent = "Activité 2";
document.querySelector("h1").textContent = "Activité 2";

// Création du boutton "Ajouter le lien"
var ajouterLienBtn = document.createElement("button");
ajouterLienBtn.textContent = "Ajouter un lien";

// Création du paragraphe contenant alternativement le bouton "Ajouter le lien" ou le formulaire
var pElt = document.createElement("p");
pElt.appendChild(ajouterLienBtn);

// Place le paragraphe avant les liens
document.body.insertBefore(pElt, contenuElt);

// Gestionnaire d'ajout d'un nouveau lien sur la page
ajouterLienBtn.addEventListener("click", function (e) {
    
    // Création du formulaire
    var formElt = document.createElement("form");
    
    // Création de la zone de saisie du nom de l'auteur
    var auteurElt = document.createElement("input");
    auteurElt.type = "text";
    auteurElt.name = "auteur";
    auteurElt.id = "auteur";
    auteurElt.required = true;
    auteurElt.placeholder = "Entrez votre nom";
    
    // Création de la zone de saisie du titre du lien
    var titreElt = document.createElement("input");
    titreElt.type = "text";
    titreElt.name = "titre";
    titreElt.id = "titre";
    titreElt.required = true;
    titreElt.placeholder = "Entrez le titre du lien";
    titreElt.setAttribute("style", "margin-left: 10px; width: 250px;");
    
    // Création de la zone de saisie de l'url du lien
    var urlElt = document.createElement("input");
    urlElt.type = "text";
    urlElt.name = "url";
    urlElt.id = "url";
    urlElt.required = true;
    urlElt.placeholder = "Entrez l'URL du lien";
    urlElt.setAttribute("style", "margin-left: 10px; width: 250px;");
    
    // Création du bouton d'ajout du lien aux autres liens de la page
    var ajouterBtn = document.createElement("input"); // button ou input
    //ajouterBtn.textContent = "Ajouter"; // si button
    ajouterBtn.type = "submit";
    ajouterBtn.value = "Ajouter";
    ajouterBtn.setAttribute("style", "margin-left: 10px;");
    
    // Ajout des éléments "input" et du nouveau boutton créés dans le formulaire
    formElt.appendChild(auteurElt);
    formElt.appendChild(titreElt);
    formElt.appendChild(urlElt)
    formElt.appendChild(ajouterBtn);
    
    // Fait disparaître le bouton "Ajouter le lien" et fait apparaître à sa place le formulaire
    pElt.replaceChild(formElt, ajouterLienBtn);        
        
    // Gestionnaire d'ajout du lien créé sur la page
    formElt.addEventListener("submit", function (e) { 
        
        e.preventDefault();
        
        // Les variables d'infos du lien
        var auteur = auteurElt.value;
        var titre = titreElt.value;
        var url = urlElt.value;

        // Ajoute "http://" au début de l'url si elle ne commence ni par "https://", "http://", "ftp://" ou "ftps://"
        if ( !(url.startsWith("http://")) && !(url.startsWith("https://")) && !(url.startsWith("ftp://")) && !(url.startsWith("ftps://")) ) {
            url = "http://" + url;
        }

        // Création d'un élément "p" pour le message d'information
        var infoMsg = document.createElement("p");

        // Expression régulière pour vérifier la validité de l'url
        var regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|ftp:\/\/|ftps:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

        // Ajout du lien ou non selon le résulatat de la vérification
        if (regex.test(url)) {

            // Ajout du nouveau lien sur la page
            ajouterLien(titre, url, auteur);

            // Message de confirmation de l'ajout du lien
            infoMsg.textContent = 'Le lien "' + titre + '" a bien été ajouté.';
            infoMsg.setAttribute("style", "background-color: rgb(214, 236, 246); padding: 20px 10px;"); 
            // color: rgba(0, 0, 0, 0.7); background-color: rgba(45, 154, 206, 0.2)

        } else {

            // Le message à afficher pour informer l'utilisateur
            infoMsg.textContent = 'Le lien "' + titre + " n'a pas été ajouté car l'url est invalide.";
            infoMsg.setAttribute("style", "background-color: rgba(237, 71, 104, 0.5); padding: 20px 10px;");

        }              

        // Fait réapparaître le bouton "Ajouter le lien " à la place du formulaire 
        pElt.replaceChild(ajouterLienBtn, formElt);             

        // Affiche le message d'information
        document.body.insertBefore(infoMsg, pElt);

        // Fait disparaître le message au bout de 2 secondes
        setTimeout(function () {
            document.body.removeChild(infoMsg);
        }, 2000);
    });  
});