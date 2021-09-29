function includeComponent() {
    // Trouver le "head" pour y insérer les link css
    let head = document.querySelector("head");
    // Trouver tout les components et boucler à travers
    let components = document.querySelectorAll("component");
    for (let component of components) {
        // Trouver le nom des components
        let componentName = component.getAttribute("name");
        if (componentName) {
            // Nom des fichiers à importer
            fileHTML = componentName + "/" + componentName + ".html";
            fileCss = componentName + "/" + componentName + ".css";
            // Créer et insère le lien pour le fichier css
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = fileCss;
            head.appendChild(link)
                // Fait une requete HTTP pour importer le fichier HTML
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        component.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        component.innerHTML = "Page not found.";
                    }
                    /*remove the attribute, and call this function once more:*/
                    component.removeAttribute("w3-include-html");
                    // Loop
                    // includeComponent();
                }
            }
            xhttp.open("GET", fileHTML, true);
            xhttp.send();
        }
    }
};

includeComponent();

function showSymptomes(chevron) {
    chevron.classList.toggle('up')
    chevron.classList.toggle('down')
    sympthomesContainer = chevron.parentNode.parentNode.lastElementChild
    if (chevron.classList.contains('up')) sympthomesContainer.style.display = "block"
    else sympthomesContainer.style.display = "none"
}