import API from "./dbCalls";

const loginBtn = document.querySelector("#login-btn")
const registerBtn = document.querySelector("#register-btn")
const registerLink = document.querySelector("#register-link")



const handleUser = {
    login(username, email) {
        API.loginUser(username, email).then(response => {
            console.log(response.length)
            if (response.length === 0) {
                alert("username and email do not match")
            }
        })
    },
    register(username, email) {
        const newUser = {
            name: username,
            email: email
        }

        API.addUser(newUser).then(response => console.log(response))
    },
    makeRegistration() {
        console.log("hello")
        loginBtn.className = "hidden"
        registerLink.className = "hidden"
        registerBtn.classList.remove("hidden")
    }
}

export default handleUser