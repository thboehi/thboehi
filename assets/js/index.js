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
//Variable to let know if the user is hover the player
let isWatching = false
//Variable that save last time the user clicked on Next or Previous
let lastClick
//Variable to tell which project is active. By default, first is active
let currentProject = 1
//Variable for the contact form button
let contactButton = document.getElementById("contact-button")
//Get the file project.json where all the projects are stored. Easy to add new projects
fetch('./assets/project.json')
  .then(response => response.json())
  .then(data => {
    //Save all the project to one variable
    projectsList = data
    //Save the number on projects in the file
    projectMax = data.length
  })
  .catch(error => {
    //Log the error in the console
    console.log(error)
    //Show an alert to explain why I had to do that
    alert("Merci de charger cette page via un Live Server.\n\nGoogle Chrome n'autorisant pas de faire un fetch depuis un fichier local (CORS Policy), il est impératif d'utiliser un live server pour que ce site fonctionne comme s'il était hébergé.\n\nCordialement\nThoma")
    //Close the page
    close()
  });
//Get elements for the project container
let projectImage = document.querySelector(".project-image")
let projectTitle = document.querySelector(".project-title")
let projectDescription = document.querySelector(".project-description")
let projectContainer = document.querySelector(".image-container")
let projectNumber = document.querySelector(".project-number")
//Get the form submit error/confirm box
let resultMessageBox = document.getElementById("form-confirm-message");

//Boolean to prevent opening the form before it has finished closing it
let closingForm = false
//Boolean to let know if the user is on the form page
let watchingForm = false

//Define different Regex needed for form validation
//Allow to use any name from any country in world
let regexName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$/u;
//Allow to use any name from any country in world
let regexSurname = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$/u;
//Small regex for email validation that check if contain caracters, @, caracters, ., and caracters.
let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
//Accept only swiss numbers for the moment
let regexPhone = /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/;
//Check if message is not empty or not full of white spaces
let regexMessage = /(.|\s)*\S(.|\s)*/;

//Boolean to check if the input fields are corrects or not. By default on false
let nameCorrect = false
let surnameCorrect = false
let phoneCorrect = false
let emailCorrect = false
let messageCorrect = false

//This get the attributes in the URL
const queryString = window.location.search;
//Create a new URLSearchParams list
const urlParams = new URLSearchParams(queryString);
//Get the position attribute/params
const goToPosition = urlParams.get('to')

//Function to get the user to the top/left page
const toTop = () => {
    //Timeout to launch the action after 10ms, just to prevent some issues with direct load
    setTimeout(function() {
        //Set the position of the user to Top0 and Left0
        window.scrollTo(0, 0)
    }, 10)
}

//Function to enter the website when on "Welcome page"
const enterWebsite = () => {
    enterContainer.removeAttribute("style")
    //Change the attribute data-state to hidden to play the animation and hide the Welcome page
    enterContainer.setAttribute("data-state", "hidden")
    //Hide the welcome, it disapears before anything else
    enterWebsiteButton.setAttribute("data-state", "hidden")
    //Do the same to the body
    document.querySelector('html').setAttribute("style", "overflow: hidden; overflow-x: hidden;")
    //Change the enteredWebsite boolean to true, to prevent function to run again. Just to be sure.
    enteredWebsite = true
    setTimeout(() => {
        //Change the color of the theme at the end of the animation (Change the top bar on iOS). This is not important but it make the website far more enjoyable.
        document.querySelector('meta[name="theme-color"]').setAttribute("content", "#1d1d1d")
        //Activate the overflow on the page to let the user go up and down, but prevent horizontal navigation
        htmlDoc.setAttribute("style", "overflow: unset; overflow-x: hidden;")
        //Launch the name animation
        profileUsernameAnimationAdd()
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
    //Change the current project number
    projectNumber.innerHTML = `${currentProject} / ${projectMax}`
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
    //Check if the auto is on pause or if the user is watching the current project
    if (onPause || isWatching){
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
        //Change the current project number
        projectNumber.innerHTML = `${currentProject} / ${projectMax}`
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
    //Change the current project number
    projectNumber.innerHTML = `${currentProject} / ${projectMax}`
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
        document.getElementById("play-pause-button").innerHTML = "PAUSE SLIDE"
    } else { //If not on pause
        //Enable pause
        onPause = true
        //And rename the element play-pause-button to REPRENDRE
        document.getElementById("play-pause-button").innerHTML = "REPRENDRE"
    }
}

//Function to open the form page
const openForm = () => {
    //Block the contact button
    contactButton.setAttribute("disabled", "")
    //If the form is still closing, stop the function
    if(closingForm){return}
    //Remove the attribute style from the form-container to remove display: none
    document.getElementById("form-container").removeAttribute("style")
    //Go to the top of the screen if user was scrolling
    window.scrollTo(0, 0)
    //Block the vertical navigation for a moment
    htmlDoc.setAttribute("style", "overflow: hidden; overflow-x: hidden;")
    //Tell that the user opened the form
    watchingForm = false
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
            document.querySelector('meta[name="theme-color"]').setAttribute("content", "#5450ff")
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
        //Unblock the contact button
        contactButton.removeAttribute("disabled")
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
            if (regexName.test(document.getElementById(type).value)){
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
        case "surname":
            //Test the regex to see if it's valid or not
            if (regexSurname.test(document.getElementById(type).value)){
                //If the content is correct, show a green marker that tell the user that he is correct
                document.getElementById(`${type}-ok`).setAttribute("data-state", "visible")
                //In case the wrong marker was shown, hide it
                document.getElementById(`${type}-wrong`).setAttribute("data-state", "hidden")
                //In case the user had already clicked on Envoyer and the background was red, change it
                document.getElementById(type).setAttribute("data-missing", "false")
                //Change the boolean to let the user send his form
                surnameCorrect = true
            } else { //If the regex didn't pass
                //Hide the green marker, in case it was shown
                document.getElementById(`${type}-ok`).setAttribute("data-state", "hidden")
                //Show the red cross to tell the user that the value isn't correct
                document.getElementById(`${type}-wrong`).setAttribute("data-state", "visible")
                //Change the boolean to prevent sending the form
                surnameCorrect = false
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

//This event listener is to prevent user to scroll to the left. This can happen on mobile version of the website
// window.addEventListener("scroll", event => {
//     console.log("asd")
//     if (htmlDoc.scrollLeft !== 0){
//         htmlDoc.scrollLeft = 0
//     }
// }

//Event to open the website is not already opened
window.addEventListener('wheel', event => {
    if (event.deltaY > 0 && !enteredWebsite) {
        enterWebsite()
    }
  });

window.addEventListener('touchmouve', event => {
    console.log(event)
    if (event.deltaY > 0 && !enteredWebsite) {
        enterWebsite()
    }
});

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
document.addEventListener('keydown', (event) =>{
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


// THIS PART IS A S3CR3T PART TO ACTIVATE THE K0N@MI C0DE AND ADD CONTENT ON THE WEBSITE

//Keep the K0n@mi c0de in a variable
const c0deK0n = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

//Get the audio file for the music
let audio = new Audio('./assets/nucleaire.mp3');

//Array where to save the keys the user pressed
let pressedKey = [];

//Event listener when a key is pressed
document.addEventListener('keydown', function(event) {
  //Add the pressed key to the array list
  pressedKey.push(event.key);

  //Check if the array contains the c0de
  if (pressedKey.toString().indexOf(c0deK0n) >= 0) {
    //If the user is still on the welcome page or on the form
    if (!enterWebsite || watchingForm){
        //then empty the array
        pressedKey = []
        //And stop the function
        return
    }
    //Remove the container display none to let it exists
    document.getElementById("main-scrt-container").removeAttribute("style")
    //After 100ms, which is used to prevent the container to appears suddently
    setTimeout(() => {
        //Set the data-state to visible to let it fade in
        document.getElementById("main-scrt-container").setAttribute("data-state", "visible")
    }, 100);
    //Empty the pressedKey array
    pressedKey = [];
  }
});

//Function to play or pause the music
const playOrPause = () => {
    //If the audio is on pause
    if (audio.paused) {
        //Then play
        audio.play()
        //And change the image to pause button
        document.getElementById("scrt-playpause").setAttribute("src", "./images/scrt/pause.svg")
    } else { //if the audio is not on pause
        //Pause the music
        audio.pause()
        //And change the image to play button
        document.getElementById("scrt-playpause").setAttribute("src", "./images/scrt/play.svg")
    }
}

// Capturer l'événement de soumission du formulaire
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    //If nameCorrect is on false
    if (!nameCorrect){
        //then set attribute data-missing to true
        document.getElementById("name").setAttribute("data-missing", "true")
    }
    //If nameCorrect is on false
    if (!surnameCorrect){
        //then set attribute data-missing to true
        document.getElementById("surname").setAttribute("data-missing", "true")
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
    //If all four are on true
    if (emailCorrect && phoneCorrect && nameCorrect && surnameCorrect){
        //Hide the error message
        document.getElementById("form-error-message").setAttribute("data-state", "hidden")
        //Hide the info message
        document.getElementById("form-info-message").setAttribute("data-state", "hidden")
        //Show the confirmation message
        resultMessageBox.setAttribute("data-state", "visible")
        //Hide the form container
        document.getElementById("form").setAttribute("data-state", "hidden")
        //Hide the send button
        document.getElementById("form-button-submit").setAttribute("data-state", "hidden")
        //After 1 second, send to top
        setTimeout(function() {
            //Set the position of the user to Top0 and Left0
            window.scrollTo(0, 0)
        }, 1000)
        
        // Récupérer les données du formulaire
        const formData = new FormData(event.target);

        // Vérifier reCAPTCHA v3 avant d'envoyer les données via AJAX
        grecaptcha.ready(function() {
            grecaptcha.execute('6LdOjicpAAAAAO1N_RfFFxvNnwzQI2D0R4mkYeBt', {action: 'submit'}).then(function(token) {
                // Ajouter le token reCAPTCHA aux données du formulaire
                formData.append('g-recaptcha-response', token);

                // Envoyer les données du formulaire avec le token reCAPTCHA via AJAX
                const xhr = new XMLHttpRequest();
                xhr.open("POST", "/assets/php/send.php");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        // Mettre à jour le conteneur de réponse avec le message de retour
                        if (xhr.status === 200) {
                            resultMessageBox.innerHTML = "Merci! Le formulaire a bien été envoyé. Vous recevrez une copie sous peu.";
                        } else {
                            resultMessageBox.innerHTML = "Une erreur est survenue lors de l'envoi de l'email.";
                            resultMessageBox.setAttribute("data-error", "true");
                        }
                    }
                };
                xhr.send(formData);
            });
        });

    } else { //If one or more is false
        //Show the error message
        document.getElementById("form-error-message").setAttribute("data-state", "visible")
        //and hide the info message
        document.getElementById("form-info-message").setAttribute("data-state", "hidden")
        //make button bounce
        document.getElementById("form-button-submit").classList.add("makeitbounce")
        document.getElementById("form-button-submit").onanimationend = () => {
            document.getElementById("form-button-submit").classList.remove("makeitbounce")
        }
    }

    
});

tippy('#phone', {
    content: 'Numéro suisse uniquement</br>au format <strong>07x ou 00417x</strong>',
    allowHTML: true,
});
tippy('.link-button', {
    content(reference) {
        const img = reference.querySelector('img');
        return img ? img.alt : '#';
    },
    allowHTML: true,
});

let animationRunning = false

const profileUsernameAnimationAdd = () => {
    if (animationRunning) {
        console.warn("Eh oh! Calmos là. L'animation est déjà en cours...")
        return
    } else {
        animationRunning = true
        const element = document.getElementById("profile-username")
        setTimeout(() => {
            element.innerText = "THOBO"
        }, 100)

        setTimeout(() => {
            element.innerText = "THOBOE"
        }, 200)

        setTimeout(() => {
            element.innerText = "THOMBO"
        }, 300)

        setTimeout(() => {
            element.innerText = "THOMBOE"
        }, 400)

        setTimeout(() => {
            element.innerText = "THOMABOE"
        }, 500)

        setTimeout(() => {
            element.innerText = "THOMABOEH"
        }, 600)

        setTimeout(() => {
            element.innerText = "THOMA BOEH"
        }, 700)

        setTimeout(() => {
            element.innerText = "THOMA BOEHI"
        }, 800)

        setTimeout(profileUsernameAnimationRemove, 4000)
    }



}

const profileUsernameAnimationRemove = () => {

    animationRunning = true
    const element = document.getElementById("profile-username")
    setTimeout(() => {
        element.innerText = "THOMABOEHI"
    }, 50)

    setTimeout(() => {
        element.innerText = "THOMABOEH"
    }, 100)

    setTimeout(() => {
        element.innerText = "THOMBOEH"
    }, 150)

    setTimeout(() => {
        element.innerText = "THOMBOE"
    }, 200)

    setTimeout(() => {
        element.innerText = "THOBOE"
    }, 250)

    setTimeout(() => {
        element.innerText = "THOBO"
    }, 300)

    setTimeout(() => {
        element.innerText = "THBO"
    }, 350)
    animationRunning = false

}


/* TEST FOR MOBILE KONAMI CODE ALTERNATIVE */

//const showGarden = () => {
//    console.log("Show Garden function")
//}
//// Fonction pour détecter l'événement tactile ou le geste spécifique
//function detectMobileAction(callback) {
//    var touchsurface = document.getElementById('mobile-action-element'); // Remplacez 'mobile-action-element' par l'ID de l'élément interactif de votre choix
//
//    var startX, startY, distX, distY;
//
//    touchsurface.addEventListener('touchstart', function(e) {
//      var touchobj = e.changedTouches[0];
//      startX = touchobj.pageX;
//      startY = touchobj.pageY;
//      distX = 0;
//      distY = 0;
//    }, false);
//
//    touchsurface.addEventListener('touchmove', function(e) {
//      var touchobj = e.changedTouches[0];
//      distX = touchobj.pageX - startX;
//      distY = touchobj.pageY - startY;
//    }, false);
//
//    touchsurface.addEventListener('touchend', function(e) {
//      // Définissez ici la condition pour déclencher votre action, par exemple, si l'utilisateur a fait glisser son doigt vers la droite
//      if (distX > 100 && Math.abs(distY) < 100) {
//        callback(); // Appel de la fonction showGarden()
//      }
//    }, false);
//  }
//
//  // Appel de la fonction detectMobileAction avec showGarden comme callback
//  detectMobileAction(showGarden);