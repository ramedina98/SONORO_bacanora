class CookieHandler{
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