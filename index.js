//Get button that is on the first screen
let enterWebsiteButton = document.getElementById("entry-button")
//Get entry container
let enterContainer = document.getElementById("entry-container")
//Get the html document
let htmlDoc = document.querySelector("html")
//Get all the projects elements
let projectsList, projectMax
let currentProject = 1
fetch('./assets/project.json')
  .then(response => response.json())
  .then(data => {
    projectsList = data
    projectMax = data.length
});
//Get elements for the project container
let projectImage = document.querySelector(".project-image")
let projectTitle = document.querySelector(".project-title")
let projectDescription = document.querySelector(".project-description")
let projectContainer = document.querySelector(".image-container")
//Boolean to prevent opening the form before it has finished closing it
let closingForm = false

function toTop(){
    setTimeout(function() {
        window.scrollTo(0, 0)
        console.log("Scrolled to top")
    }, 500)
}

function enterWebsite(){
    enterContainer.setAttribute("data-state", "hidden")
    enterWebsiteButton.setAttribute("data-state", "hidden")
    setTimeout(function() {
        htmlDoc.setAttribute("style", "overflow: none; overflow-x: hidden;")
    }, 2200);
}

function nextProject(){
    currentProject++
    if(currentProject >= 4){
        currentProject = 1
    }
    let num = currentProject - 1
    projectTitle.innerHTML = projectsList[num].title
    projectDescription.innerHTML = projectsList[num].description
    projectImage.setAttribute("src", projectsList[num].img)
    projectContainer.setAttribute("onclick", "window.open(`" + projectsList[num].link + "`);")
}

function previousProject(){
    currentProject--
    if(currentProject <= 0){
        currentProject = projectMax
    }
    let num = currentProject - 1
    projectTitle.innerHTML = projectsList[num].title
    projectDescription.innerHTML = projectsList[num].description
    projectImage.setAttribute("src", projectsList[num].img)
    projectContainer.setAttribute("onclick", "window.open(`" + projectsList[num].link + "`);")
}

function openForm(){
    if(closingForm){return}
    document.getElementById("form-container").setAttribute("data-state", "visible")
    window.scrollTo(0, 0)
    htmlDoc.setAttribute("style", "overflow: hidden; overflow-x: hidden;")
}

function closeForm(){
    closingForm = true
    document.getElementById("form-container").setAttribute("data-state", "hidden")
    setTimeout(function() {
        htmlDoc.setAttribute("style", "overflow: unset; overflow-x: hidden;")
        closingForm = false
    }, 2200);
}

//DEBUG, REMOVE FOR RELEASE
// enterWebsite()
// setTimeout(function(){
//     openForm()
// }, 1000)