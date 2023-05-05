//Get button that is on the first screen
let enterWebsiteButton = document.getElementById("entry-button")
//Get entry container
let enterContainer = document.getElementById("entry-container")
//Status if entered on the website or not
let enteredWebsite = false
//Get the html document
let htmlDoc = document.querySelector("html")
//Get all the projects elements
let projectsList, projectMax
//Variable to let know if project player is on pause or not
let onPause = false
//Variable that save
let lastClick
let currentProject = 1
//Get the file project.json where all the projects are stored. Easy to add new projects
fetch('./assets/project.json')
  .then(response => response.json())
  .then(data => {
    //Save all the project to one variable
    projectsList = data
    //Save the number on projects in the file
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
//Allow to use any name from any country in world
let regexNameSurname = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$/u;
//Small regex for email validation that check if contain caracters, @, caracters, ., and caracters.
let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
//Accept only swiss numbers for the moment
let regexPhone = /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/;
//Check if message is not empty or not full of white spaces
let regexMessage = /(.|\s)*\S(.|\s)*/;

//Boolean to check if the input fields are corrects or not. By default on false
let nameCorrect = false
let phoneCorrect = false
let emailCorrect = false
let messageCorrect = false

//This get the attributes in the URL
const queryString = window.location.search;
//Create a new URLSearchParams list
const urlParams = new URLSearchParams(queryString);
//Get the position attribute/params
const goToPosition = urlParams.get('position')

//Function to get the user to the top/left page
const toTop = () => {
    //Timeout to launch the action after 500ms
    setTimeout(function() {
        //Set the position of the user to Top0 and Left0
        window.scrollTo(0, 0)
    }, 500)
}

//Function to enter the website when on "Welcome page"
const enterWebsite = () => {
    enterContainer.removeAttribute("style")
    //Change the attribute data-state to hidden to play the animation and hide the Welcome page
    enterContainer.setAttribute("data-state", "hidden")
    //Hide the welcome, it disapears before anything else
    enterWebsiteButton.setAttribute("data-state", "hidden")
    //Activate the overflow on the page to let the user go up and down, but prevent horizontal navigation
    htmlDoc.setAttribute("style", "overflow: none; overflow-x: hidden;")
    //Do the same to the body
    document.querySelector('body').setAttribute("style", "overflow: none; overflow-x: hidden;")
    //Change the enteredWebsite boolean to true, to prevent function to run again. Just to be sure.
    enteredWebsite = true
    setTimeout(() => {
        //Change the color of the theme at the end of the animation (Change the top bar on iOS). This is not important but it make the website far more enjoyable.
        document.querySelector('meta[name="theme-color"]').setAttribute("content", "#1d1d1d")
    }, 1500);
}

//Function to let the user go to the next project on the project container
const nextProject = () => {
    //Add one more to the current object
    lastClick = Math.floor(new Date().getTime() / 1000)
    //Check if the currentProject is at his maximum
    if(currentProject === projectMax){
        //If at maximum, go back to the first project
        currentProject = 1
    } else {
        //If not to the maximum, increment
        currentProject++
    }
    //Define a new var that let the index be currentProject minus 1, because it begins at 0
    let num = currentProject - 1
    //Change the title of the HTML element to the current project
    projectTitle.innerHTML = projectsList[num].title
    //Change the description of the HTML element to the current project
    projectDescription.innerHTML = projectsList[num].description
    //Change the source of the HTML element to the current project
    projectImage.setAttribute("src", projectsList[num].img)
    //Change the link of the HTML element to the current project
    projectContainer.setAttribute("onclick", "window.open(`" + projectsList[num].link + "`);")
}

//Function to change the project to the next one
const autoNextProject = () => {
    //Check if the auto is on pause
    if (onPause){
        //If yes, stop the function
        return
    }
    //Check if last time a user clicked is less than 5 seconds ago
    if (((Math.floor(new Date().getTime() / 1000)) - lastClick) < 5){
        //If yes, stop the function
        return
    }
    //Select the image-container that is in the project and add an animation that fade out the image and fade in again
    //This make the autochange smooth and better than only changes
    document.querySelector(".image-container").style.animation = "opacityMaxMinMax 1s ease-out"
    //After 400ms, launch the function to change image
    //This doesn't launch the function nextProject because it must not save lastClick. This could be made easier by
    // changing the minimum time to less than 5 seconds but I prefer when it's complicated. Enjoy. This webpage isn't
    // that fat and doing this sort of optimization isn't necessary
    setTimeout(function(){
        //Check if the currentProject is at his maximum
        if(currentProject === projectMax){
            //If at maximum, go back to the first project
            currentProject = 1
        } else {
            //If not to the maximum, increment
            currentProject++
        }
        //Define a new var that let the index be currentProject minus 1, because it begins at 0
        let num = currentProject - 1
        //Change the title of the HTML element to the current project
        projectTitle.innerHTML = projectsList[num].title
        //Change the description of the HTML element to the current project
        projectDescription.innerHTML = projectsList[num].description
        //Change the source of the HTML element to the current project
        projectImage.setAttribute("src", projectsList[num].img)
        //Change the link of the HTML element to the current project
        projectContainer.setAttribute("onclick", "window.open(`" + projectsList[num].link + "`);")
    }, 400)
    //After 2 seconds, remove the animation from the element
    setTimeout(function(){
        //Remove the style animation
        document.querySelector(".image-container").style.animation = ""
    }, 2000)
}

//This launch the autoNextProject every 5 seconds
setInterval(() => {
    //Call the function
    autoNextProject()
}, 5000);

//Function to go to the previous project
const previousProject = () => {
    //Save last click to now
    lastClick = Math.floor(new Date().getTime() / 1000)
    //If the current project is the first one, go to the last poject
    if(currentProject === 1){
        //Set the current project to the last project
        currentProject = projectMax
    } else {
        //Decrement project to go to previous 
        currentProject--
    }
    //Define a new var that let the index be currentProject minus 1, because it begins at 0
    let num = currentProject - 1
    //Change the title of the HTML element to the current project
    projectTitle.innerHTML = projectsList[num].title
    //Change the description of the HTML element to the current project
    projectDescription.innerHTML = projectsList[num].description
    //Change the source of the HTML element to the current project
    projectImage.setAttribute("src", projectsList[num].img)
    //Change the link of the HTML element to the current project
    projectContainer.setAttribute("onclick", "window.open(`" + projectsList[num].link + "`);")
}

//Function to pause or resume to autoPlay
const pauseAuto = () => {
    //If already on pause
    if (onPause) {
        //Then disable it
        onPause = false
        //And rename the element play-pause-button to PAUSE
        document.getElementById("play-pause-button").innerHTML = "PAUSE"
    } else { //If not on pause
        //Enable pause
        onPause = true
        //And rename the element play-pause-button to REPRENDRE
        document.getElementById("play-pause-button").innerHTML = "REPRENDRE"
    }
}

//Function to open the form page
const openForm = () => {
    //If the form is still closing, stop the function
    if(closingForm){return}
    //Remove the attribute style from the form-container to remove display: none
    document.getElementById("form-container").removeAttribute("style")
    //Go to the top of the screen if user was scrolling
    window.scrollTo(0, 0)
    //Block the vertical navigation for a moment
    htmlDoc.setAttribute("style", "overflow: hidden; overflow-x: hidden;")
    //This timeout is only here to prevent the animation from broking.
    //Without it, the animation couldn't run because of the display: none to display: flex
    setTimeout(() => {
        //Set the form-container to visible, which will run an animation and show the form page
        document.getElementById("form-container").setAttribute("data-state", "visible")
        //This timeout will launch after the animation is finish
        setTimeout(() => {
            //As the background was sometimes visible, this was added to make the background-color match the color of the form background. This works great and make the page nicer
            //And unlock the vertical scrolling
            htmlDoc.setAttribute("style", "background-color: #29335c;")
            //This will make the element form-container the correct format of the screen to prevent horizontal scrolling
            document.getElementById("form-container").setAttribute("style", "overflow: hidden;")
            //Change the theme of the page to the color of the background to match everything and make a cosy place where the user would want to spend the rest of his life
            document.querySelector('meta[name="theme-color"]').setAttribute("content", "#29335c")
            //Hide the main page
            document.getElementById("main-container").setAttribute("style", "display: none;")
        }, 2200);
    }, 10);
}

//Function to close the form page
const closeForm = () => {
    //This is to prevent the user opening again even if closing isn't finished
    closingForm = true
    //Go to the top of the screen if user was scrolling
    window.scrollTo(0, 0)
    //Block the vertical navigation for a moment
    htmlDoc.setAttribute("style", "overflow: hidden; overflow-x: hidden;")
    //Remove the attribute style from the main-container to remove display: none
    document.getElementById("main-container").removeAttribute("style")
    //Hide the form-container with a nice animation defined on CSS
    document.getElementById("form-container").setAttribute("data-state", "hidden")
    //Remove the overflow hidden to show the background round again
    document.getElementById("form-container").setAttribute("style", "overflow: unset;")
    //Set the color theme to black again
    document.querySelector('meta[name="theme-color"]').setAttribute("content", "#1d1d1d")
    //Timeout to launch specified action after 2,2 seconds
    setTimeout(function() {
        //Hide the form-container so it isn't visible when scrolling down.
        document.getElementById("form-container").setAttribute("style", "display: none;")
        //Disable closingForm, so the user can open it again
        closingForm = false
        //Remove the style of the htmlDoc to allow vertical navigation
        htmlDoc.removeAttribute("style")
    }, 2200);
}

//Function to check input on the form
const checkInput = (type) => {
    //Switch to check only if it's name, phone or other
    switch (type){
        //If it's the input[name]
        case "name":
            //Test the regex to see if it's valid or not
            if (regexNameSurname.test(document.getElementById(type).value)){
                //If the content is correct, show a green marker that tell the user that he is correct
                document.getElementById(`${type}-ok`).setAttribute("data-state", "visible")
                //In case the wrong marker was shown, hide it
                document.getElementById(`${type}-wrong`).setAttribute("data-state", "hidden")
                //In case the user had already clicked on Envoyer and the background was red, change it
                document.getElementById(type).setAttribute("data-missing", "false")
                //Change the boolean to let the user send his form
                nameCorrect = true
            } else { //If the regex didn't pass
                //Hide the green marker, in case it was shown
                document.getElementById(`${type}-ok`).setAttribute("data-state", "hidden")
                //Show the red cross to tell the user that the value isn't correct
                document.getElementById(`${type}-wrong`).setAttribute("data-state", "visible")
                //Change the boolean to prevent sending the form
                nameCorrect = false
            }
            break;
        case "phone":
            //Test the regex to see if it's valid or not
            if (regexPhone.test(document.getElementById(type).value)){
                //If the content is correct, show a green marker that tell the user that he is correct
                document.getElementById(`${type}-ok`).setAttribute("data-state", "visible")
                //In case the wrong marker was shown, hide it
                document.getElementById(`${type}-wrong`).setAttribute("data-state", "hidden")
                //In case the user had already clicked on Envoyer and the background was red, change it
                document.getElementById(type).setAttribute("data-missing", "false")
                //Change the boolean to let the user send his form
                phoneCorrect = true
            } else { //If the regex didn't pass
                //Hide the green marker, in case it was shown
                document.getElementById(`${type}-ok`).setAttribute("data-state", "hidden")
                //Show the red cross to tell the user that the value isn't correct
                document.getElementById(`${type}-wrong`).setAttribute("data-state", "visible")
                //Change the boolean to prevent sending the form
                phoneCorrect = false
            }
            break;
        case "email":
            //Test the regex to see if it's valid or not
            if (regexEmail.test(document.getElementById(type).value)){
                //If the content is correct, show a green marker that tell the user that he is correct
                document.getElementById(`${type}-ok`).setAttribute("data-state", "visible")
                //In case the wrong marker was shown, hide it
                document.getElementById(`${type}-wrong`).setAttribute("data-state", "hidden")
                //In case the user had already clicked on Envoyer and the background was red, change it
                document.getElementById(type).setAttribute("data-missing", "false")
                //Change the boolean to let the user send his form
                emailCorrect = true
            } else { //If the regex didn't pass
                //Hide the green marker, in case it was shown
                document.getElementById(`${type}-ok`).setAttribute("data-state", "hidden")
                //Show the red cross to tell the user that the value isn't correct
                document.getElementById(`${type}-wrong`).setAttribute("data-state", "visible")
                //Change the boolean to prevent sending the form
                emailCorrect = false
            }
            break;
        //Don't check entreprise because it isn't necessary
        case "entreprise":
            break;
        case "message":
            //Same as the others, test the regex
            if (regexMessage.test(document.getElementById(type).value)){
                //If true, messageCorrect is true
                messageCorrect = true
                //And remove the possible style for missing or wrong
                document.getElementById("message").setAttribute("data-missing", "false")
            } else {
                //If false, messageCorrect is false
                messageCorrect = false
            }
            break;
        default:
            //In case of error, show in the console
            console.log(`Error:\nNo correct type defined\nType: ${type}`)
    }
}

//Function to send the form
const sendForm = () => {
    //If nameCorrect is on false
    if (!nameCorrect){
        //then set attribute data-missing to true
        document.getElementById("name").setAttribute("data-missing", "true")
    }
    //If phoneCorrect is on false
    if (!phoneCorrect){
        //then set attribute data-missing to true
        document.getElementById("phone").setAttribute("data-missing", "true")
    }
    //If emailCorrect is on false
    if (!emailCorrect){
        //then set attribute data-missing to true
        document.getElementById("email").setAttribute("data-missing", "true")
    }
    //If messageCorrect is on false
    if (!messageCorrect){
        //then set attribute data-missing to true
        document.getElementById("message").setAttribute("data-missing", "true")
    }
    //If all three are on true
    if (emailCorrect && phoneCorrect && emailCorrect){
        //Hide the error message
        document.getElementById("form-error-message").setAttribute("data-state", "hidden")
        //Hide the info message
        document.getElementById("form-info-message").setAttribute("data-state", "hidden")
        //Show the confirmation message
        document.getElementById("form-confirm-message").setAttribute("data-state", "visible")
        //Hide the form container
        document.getElementById("form").setAttribute("data-state", "hidden")
        //Hide the send button
        document.getElementById("form-button-submit").setAttribute("data-state", "hidden")
        //After 1 second, send to top
        setTimeout(function() {
            //Set the position of the user to Top0 and Left0
            window.scrollTo(0, 0)
        }, 1000)
    } else { //If one or more is false
        //Show the error message
        document.getElementById("form-error-message").setAttribute("data-state", "visible")
        //and hide the info message
        document.getElementById("form-info-message").setAttribute("data-state", "hidden")
    }
}

//This event listener is to prevent user to scroll to the left. This can happen on mobile version of the website
// window.addEventListener("scroll", event => {
//     if (htmlDoc.scrollLeft !== 0){
//         htmlDoc.scrollLeft = 0
//     }
// } )

//This is ear attributes and go directly to the page asked
if (goToPosition === "form"){
    //If link is link.com?position=form
    //Launch function enterWebsite automatically
    enterWebsite()
    //and 1 second later, launch function openForm to go to the form page directly
    setTimeout( function(){
        openForm()
    }, 1000)
//But if link is link.com?position=main
} else if (goToPosition === "main"){
    //Go to the main page directly with the function enterWebsite()
    enterWebsite()
}

//This is a keydown event listener for multiple reason
window.addEventListener('keydown', (event) =>{
    switch (event.key) {
        //If the key is Enter
        case "Enter":
            //If user already enteredWebsite, return
            if (enteredWebsite){
                return
            }
            //Enter website
            enterWebsite()
            break;
        //If user press left arrow
        case "ArrowLeft":
            //Go to previous project
            previousProject()
            break;
        //If user press right arrow
        case "ArrowRight":
            //Go to next project
            nextProject()
            break;
        default:
            break;
    }
})
