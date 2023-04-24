//Get button that is on the first screen
let enterWebsiteButton = document.getElementById("entry-button")
//Get entry container
let enterContainer = document.getElementById("entry-container")

function enterWebsite(){
    enterContainer.setAttribute("data-state", "hidden")
    enterWebsiteButton.setAttribute("data-state", "hidden")
    console.log("Prout")
}