# Sonoro Bacanora

Landing pages for Sonoro Bacanora, warm neither Sonoro nor love.

<img src="/app/public/imgReadme/Sonoro.png" width="400">

## Table of contents
- [History](#history)
- [Vision](#vision)

## History
Sonoro is a new brand of bacanora from Sonora, dedicated to becoming the best brand of this spirit. With decades of tradition in bacanora production, Sonoro captures the essence of Sonoran culture in every bottle. Bacanora, a distilled spirit made from native agave from Sonora, has a rich history dating back more than 300 years. Initially produced clandestinely due to government prohibitions, bacanora resurfaced strongly and was legalized in 1992, being recognized as a Protected Designation of Origin.

Sonoro honors this ancestral heritage with a meticulous and artisanal production process. Each agave used in its production is hand-selected and cooked in traditional stone ovens, following methods that have been passed down from generation to generation. This care and dedication result in a bacanora with an angelic flavor, full body, and robustness.

In addition to its incomparable taste, Sonoro stands out for its commitment to sustainability and support for local communities. The brand works closely with local producers to ensure responsible and fair agricultural practices.

Sonoro is not just a drink; it is an experience that transports you to the heart of Sonora. It is the perfect companion for your celebrations and important moments, creating unforgettable memories with each sip. With Sonoro, you carry with you the history, tradition, and passion of a land rich in culture and flavor.

## Vision
To lead the production and sale of Bacanora, standing out for quality, tradition and sustainability. We want to make Bacanora a cultural icon of Mexico and a globally recognized distillate.

## Landing pages specifications
This landing page was developed in a simple way. We used technologies such as:

- HTML <img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white" width="50">
- CSS <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white" width="50">
- JavaScript <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" width="50">
- Bootstrap <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" width="50">

### Structure
It was arranged in a way that first shows the brand's slogan next to its bottle, then the vision of what Sonoro is, followed by recommendations of preparations with bacanoro `(which are made with sonoro)` and finally a contact form with the brand.

### Age of majority verification form
By law all websites related to spirits companies must have a form to validate the age of the consumer. In this case was no exception, this form validates the year of birth and decides if the consumer is of legal age or not, by marking it as legal age it saves the age in a `cookie` for an hour, this to avoid having to show the form during that period every time the page is refreshed.

#### Cookie Handler Class
This is the Cookie Handler class:

```javascript
export class CookieHandler{
    constructor(name, value = '', minutes = 90){
        this.name = name;
        this.minutes = minutes;
        // if the value is not empty...
        if (value !== '') {
            this.setCookie(value, minutes);
        }
    }

    // getter...
    get value(){
        return this.getCookie();
    }

    //setter...
    set value(newValue){
        this.setCookie(newValue, this.minutes);
    }

    // method to obtain the value of a cookie
    getCookie() {
        // Create a string with the cookie name followed by an equal sign
        const nameEQ = `${this.name}=`;
        // Split the document.cookie string into individual cookies using the semicolon as a delimiter
        const cookies = document.cookie.split(';');
        // Iterate through the array of cookies
        for (let i = 0; i < cookies.length; i++) {
            // Get the current cookie and store it in a variable
            let cookie = cookies[i];
            // Remove any leading spaces from the cookie string
            while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
            // Check if the current cookie starts with the desired cookie name
            if (cookie.indexOf(nameEQ) === 0) {
                // If the desired cookie is found, return its value
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        // If the desired cookie is not found, return null
        return null;
    }

    // method to set the value of a cookie...
    setCookie(value, minutes) {
        let expires = "";
        // if minutes isn't empty...
        if (minutes) {
            // Create a new Date object representing the current date and time
            const date = new Date();
            // Set the time of the Date object to the current time plus the number of minutes (converted to milliseconds)
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            // Format the expiration time as a string in UTC format and prepend it with "; expires="
            expires = "; expires=" + date.toUTCString();
        }
        // Set the cookie with the specified name, value, expiration time, and path
        document.cookie = `${this.name}=${value || ""}${expires}; path=/`;
    }

    // method to delete a cookie...
    deleteCookie (){
        document.cookie = `${this.name}=; Max-Age=-99999999;`;
    }
}
```

#### Logic of the form of legal age
The next thing we are going to see is the logic that handles the form to validate that the user is of legal age.

```JavaScript
// import the require class CookieHandler...
import { CookieHandler } from "./cookieHandler.js";

// first we get the variables we want to use...
// the section tag that contains everything...
const ageGate = document.getElementById("section_ask_age");
// the div that has inside the form to indicate that we are of legal age...
const ask_age_div = document.getElementById("mainDiv_ask_age");
// label tag..
const lblAge = document.getElementById("lblAge");
// this is the btn that sends the year of birth to validate...
const btn_access = document.getElementById("btn_access");
// the input where we write the year...
const inputAge = document.getElementById("age");

// this function will display the age gate after 3 seconds of entering the web page...
const displayAgeGate = () => {
    //initialize an instance of cookie handler
    const ageCookie = new CookieHandler('age');

    //get the value stored in the cookie
    const age = ageCookie.value;

    //check if the value is null and if the age (which is the value) is out of the range to display the age gate...
    if(age === null  || (age < 18 || age > 95)){
        // set time out to display the element after 1.5 seconds...
        setTimeout(() => {
            ageGate.style.display = "flex";
            // we do not need the scroll bar in this part...
            document.body.style.overflow = "hidden";
        }, 1500);
    }
}
// call the function...
displayAgeGate();

// this function will check if the age of the user is in the correct range...
const calculateAge = (yearOfBirth) => {
    // obtains the year...
    const currentYear = new Date().getFullYear();
    // calculate age and return the result..
    return currentYear - yearOfBirth;
}

/**
 *
 */
// function to validate that the input is correct (digits only)...
const digitsOnly = (str) => {
    // this regular expression hleps us to remove all that is not a digit...
    const digits = str.replace(/\D/g, '');
    // we retunr the string only with digits in it...
    return digits;
}

//this event listens every time you write in the input, to only let you write digits and only 4 digits max...
inputAge.addEventListener('keyup', (e) => {
    // we get the value returned by the function that clears the string of characters other than digits...
    e.target.value = digitsOnly(e.target.value);
});

/**
 * This event will listen if the access button is clicked and check if the age is in the
 * correct range, and then let you in or not let you in
 */
btn_access.addEventListener('click', (e) => {
    // this is by deafult...
    e.preventDefault();

    //obtain the value of the input...
    const yearOfBirthStr = inputAge.value;
    //we parse the string to int
    const yearOfBirthInt = parseInt(yearOfBirthStr, 10);

    // call the function...
    const age = calculateAge(yearOfBirthInt);

    //if the costumer is of legal age, the age gate disappears
    if(age >= 18 && age <= 94){
        ageGate.style.display = "none";
        document.body.style.overflow = "auto";

        // we set the value into a cookie...
        const ageCookie = new CookieHandler('age', '', 90);
        ageCookie.value = age;
    } else if(age > 95){ // we also validate that you do not enter an age that exceeds the average human lifespan...
        //add the class 'shake_div'...
        ask_age_div.classList.add('shake_div');
        // we get the current text and color value of the label tag...
        const lblText = lblAge.innerText;
        const lblColor = lblAge.style.color;

        //change the text and color, this as a warning that the costumer is not of legal age...
        lblAge.innerText = "Edad incorrecta";
        lblAge.style.color = "red";

        //after 2s we return the text and the color value to their previous values...
        setTimeout(() => {
            ask_age_div.classList.remove('shake_div');
            lblAge.innerText = lblText;
            lblAge.style.color = lblColor;
        }, 2000);
    } else{// then, if the costumer is not of legal age, they can not see  the website...
        //add the class 'shake_div'...
        ask_age_div.classList.add('shake_div');
        // we get the current text and color value of the label tag...
        const lblText = lblAge.innerText;
        const lblColor = lblAge.style.color;

        //change the text and color, this as a warning that the costumer is not of legal age...
        lblAge.innerText = "No eres mayor de edad";
        lblAge.style.color = "red";

        //after 2s we return the text and the color value to their previous values...
        setTimeout(() => {
            ask_age_div.classList.remove('shake_div');
            lblAge.innerText = lblText;
            lblAge.style.color = lblColor;
        }, 2000);
    }
});
```

## Development Team

- Ricardo Medina [Linkedin](https://www.linkedin.com/in/ricardomedinamartin/) - [GitHub](https://github.com/ramedina98)

## Contact E-mail
Email: <a href="mailto:rmedinamartindelcampo@gmail.com?subject=Consulta&body=Hola, quisiera hacer una consulta.">rmedinamartindelcampo@gmail.com</a>