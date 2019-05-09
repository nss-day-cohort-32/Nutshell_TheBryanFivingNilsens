import handleUser from "./login"

const loginBtn = document.querySelector("#login-btn")
const registerLink = document.querySelector("#register-link")
const registerBtn = document.querySelector("#register-btn")
const username = document.querySelector("#username")
const email = document.querySelector("#email")


loginBtn.addEventListener("click", () => {
    handleUser.login(username.value, email.value)
    username.value = ""
    email.value = ""
})

registerLink.addEventListener("click", (e) => {
    handleUser.makeRegistration()
})

registerBtn.addEventListener("click", (e) => {
    handleUser.register(username.value, email.value)
})