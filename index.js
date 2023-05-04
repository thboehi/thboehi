//Get button that is on the first screen
let enterWebsiteButton = document.getElementById("entry-button")
//Get entry container
let enterContainer = document.getElementById("entry-container")
//Get the html document
let htmlDoc = document.querySelector("html")
//Get all the projects elements
let projectsList, projectMax
let onPause = false
let lastClick
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

//Define different Regex needed for form validation
let regexNameSurname = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$/u;
let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let regexPhone = /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/;
let regexMessage = /(.|\s)*\S(.|\s)*/;

//Boolean to check if the input fields are corrects or not. By default on false
let nameCorrect = false
let phoneCorrect = false
let emailCorrect = false
let messageCorrect = false

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const goToPosition = urlParams.get('position')

const toTop = () => {
    setTimeout(function() {
        window.scrollTo(0, 0)
        console.log("Scrolled to top")
    }, 500)
}

const enterWebsite = () => {
    enterContainer.setAttribute("data-state", "hidden")
    enterWebsiteButton.setAttribute("data-state", "hidden")
    setTimeout(function() {
        htmlDoc.setAttribute("style", "overflow: none; overflow-x: hidden;")
    }, 2200);
}

window.addEventListener('keypress', (event) =>{
    if (event.key === "Enter"){
        enterWebsite()
    }
})

const nextProject = () => {
    currentProject++
    lastClick = Math.floor(new Date().getTime() / 1000)
    if(currentProject >= 4){
        currentProject = 1
    }
    let num = currentProject - 1
    projectTitle.innerHTML = projectsList[num].title
    projectDescription.innerHTML = projectsList[num].description
    projectImage.setAttribute("src", projectsList[num].img)
    projectContainer.setAttribute("onclick", "window.open(`" + projectsList[num].link + "`);")
}

const autoNextProject = () => {
    if (onPause){
        console.log("Abort mission! On pause.");
        return
    }
    if (((Math.floor(new Date().getTime() / 1000)) - lastClick) < 5){
        console.log("Abort mission! Clicked not long ago.");
        return
    }
    document.querySelector(".image-container").style.animation = "opacityMaxMinMax 1s ease-out"
    setTimeout(function(){
        currentProject++
        if(currentProject >= 4){
            currentProject = 1
        }
        let num = currentProject - 1
        projectTitle.innerHTML = projectsList[num].title
        projectDescription.innerHTML = projectsList[num].description
        projectImage.setAttribute("src", projectsList[num].img)
        projectContainer.setAttribute("onclick", "window.open(`" + projectsList[num].link + "`);")
    }, 400)
    setTimeout(function(){
        document.querySelector(".image-container").style.animation = ""
    }, 2000)
}

setInterval(() => {
    autoNextProject()
}, 5000);

const previousProject = () => {
    currentProject--
    lastClick = Math.floor(new Date().getTime() / 1000)
    if(currentProject <= 0){
        currentProject = projectMax
    }
    let num = currentProject - 1
    projectTitle.innerHTML = projectsList[num].title
    projectDescription.innerHTML = projectsList[num].description
    projectImage.setAttribute("src", projectsList[num].img)
    projectContainer.setAttribute("onclick", "window.open(`" + projectsList[num].link + "`);")
}

const pauseAuto = () => {
    if (onPause) {
        onPause = false
    } else {
        onPause = true
    }
}

const openForm = () => {
    if(closingForm){return}
    document.getElementById("form-container").setAttribute("data-state", "visible")
    window.scrollTo(0, 0)
    htmlDoc.setAttribute("style", "overflow: hidden; overflow-x: hidden;")
}

const closeForm = () => {
    closingForm = true
    document.getElementById("form-container").setAttribute("data-state", "hidden")
    setTimeout(function() {
        htmlDoc.setAttribute("style", "overflow: unset; overflow-x: hidden;")
        closingForm = false
    }, 2200);
}

const checkInput = (type) => {
    switch (type){
        case "name":
            setTimeout(function() {
                toTop()
            }, 10);
            if (regexNameSurname.test(document.getElementById(type).value)){
                console.log("ça passe")
                document.getElementById(`${type}-ok`).setAttribute("data-state", "visible")
                document.getElementById(`${type}-wrong`).setAttribute("data-state", "hidden")
                document.getElementById(type).setAttribute("data-missing", "false")
                nameCorrect = true
            } else {
                document.getElementById(`${type}-ok`).setAttribute("data-state", "hidden")
                document.getElementById(`${type}-wrong`).setAttribute("data-state", "visible")
                nameCorrect = false
            }
            break;
        case "phone":
            if (regexPhone.test(document.getElementById(type).value)){
                console.log("ça passe")
                document.getElementById(`${type}-ok`).setAttribute("data-state", "visible")
                document.getElementById(`${type}-wrong`).setAttribute("data-state", "hidden")
                document.getElementById(type).setAttribute("data-missing", "false")
                phoneCorrect = true
            } else {
                document.getElementById(`${type}-ok`).setAttribute("data-state", "hidden")
                document.getElementById(`${type}-wrong`).setAttribute("data-state", "visible")
                phoneCorrect = false
            }
            break;
        case "email":
            if (regexEmail.test(document.getElementById(type).value)){
                console.log("ça passe")
                document.getElementById(`${type}-ok`).setAttribute("data-state", "visible")
                document.getElementById(`${type}-wrong`).setAttribute("data-state", "hidden")
                document.getElementById(type).setAttribute("data-missing", "false")
                emailCorrect = true
            } else {
                document.getElementById(`${type}-ok`).setAttribute("data-state", "hidden")
                document.getElementById(`${type}-wrong`).setAttribute("data-state", "visible")
                emailCorrect = false
            }
            break;
        case "entreprise":
            break;
        case "message":
            if (regexMessage.test(document.getElementById(type).value)){
                messageCorrect = true
                document.getElementById("message").setAttribute("data-missing", "false")
            } else {
                messageCorrect = false
            }
            break;
        default:
            console.log(`Error:\nNo correct type defined\nType: ${type}`)
    }
}

const sendForm = () => {
    if (!nameCorrect){
        document.getElementById("name").setAttribute("data-missing", "true")
    }
    if (!phoneCorrect){
        document.getElementById("phone").setAttribute("data-missing", "true")
    }
    if (!emailCorrect){
        document.getElementById("email").setAttribute("data-missing", "true")
    }
    if (!messageCorrect){
        document.getElementById("message").setAttribute("data-missing", "true")
    }
    if (emailCorrect && phoneCorrect && emailCorrect){
        document.getElementById("form-error-message").setAttribute("data-state", "hidden")
    } else {
        document.getElementById("form-error-message").setAttribute("data-state", "visible")
    }
}

window.addEventListener("scroll", event => {
    console.log(htmlDoc.scrollTop)
} )

if (goToPosition === "form"){
    enterWebsite()
    setTimeout( function(){
        openForm()
    }, 1000)
} else if (goToPosition === "main"){
    enterWebsite()
}

window.addEventListener('keydown', (event) =>{
    switch (event.key) {
        case "Enter":
            enterWebsite();
            break;
        case "ArrowLeft":
            previousProject()
            break;
        case "ArrowRight":
            nextProject()
            break;
        default:
            break;
    }
})

//DEBUG, REMOVE FOR RELEASE
// enterWebsite()
// setTimeout(function(){
//     openForm()
// }, 1000)