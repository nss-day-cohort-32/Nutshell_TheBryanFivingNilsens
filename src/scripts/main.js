
import handleUser from "./login"
import API from "./dbCalls";

const loginContainer = document.querySelector("#login-container")
const username = document.querySelector("#username")
const email = document.querySelector("#email")


loginContainer.addEventListener("click", (e) => {
    //handle login
    if (e.target.id === "login-btn") {
        handleUser.login(username.value, email.value)
        username.value = ""
        email.value = ""
        //regigister link
    } else if (e.target.id === "register-link") {
        handleUser.makeRegistration()
        //register user
    } else if (e.target.id === "register-btn") {
        handleUser.register(username.value, email.value)
    }
})