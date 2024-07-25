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