// first we get the variables we want to use...
const ageGate = document.getElementById("section_ask_age");
const btn_access = document.getElementById("btn_access");
const inputAge = document.getElementById("age");

// this function will display the age gate after 3 seconds of entering the web page...
const displayAgeGate = () => {
    setTimeout(() => {
        ageGate.style.display = "flex";
        document.body.style.overflow = "hidden";
    }, 1500)
}
// call the function...
displayAgeGate();

console.log(inputAge.value);
// this function will check if the age of the user is in the correct range...
const calculateAge = (yearOfBirth) => {
    const currentYear = new Date().getFullYear(); // Obtiene el año actual
    return currentYear - yearOfBirth; // Calcula la edad
}

/**
 * This event will listen if the access button is clicked and check if the age is in the
 * correct range, and then let you in or not let you in
 */
btn_access.addEventListener('click', (e) => {
    // this is by deafult...
    e.preventDefault();

    //obtain the value of the input...
    const yearOfBirthStr = inputAge.value;
    //
    const yearOfBirthInt = parseInt(yearOfBirthStr, 10);

    // call the function...
    const age = calculateAge(yearOfBirthInt);

    //
    if(age >= 18){
        ageGate.style.display = "none";
        document.body.style.overflow = "auto";
    }
});