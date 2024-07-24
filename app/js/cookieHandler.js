class cookieHandler{
    constructor(name, value = '', minutes = 90){
        this.name = name;
        this._value = value;
        this.minutes = minutes;
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
    getCookie(){
        // get the cookies...
        const value = `${document.cookie}`;
        // search the require cookie...
        const parts = value.split(`; ${this.name}=`);
        // if the cookie is the correct one we return its value...
        if(parts.length === 2) return parts.pop().split(';').shift();
        // else, just return null to indicate that we don't find the required cookie
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