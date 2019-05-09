import API from "./dbCalls";
import makeFriendsList from "./friendsList"

const loginBtn = document.querySelector("#login-btn")
const registerBtn = document.querySelector("#register-btn")
const registerLink = document.querySelector("#register-link")



const handleUser = {
    login(username, email) {
        API.loginUser(username, email).then(user => {
            if (user.length === 0) {
                alert("username and email do not match")
            } else {
                console.log(user[0].id)
                sessionStorage.setItem("activeUser", user[0].id)
                const friendsList = API.getFriendsList(user[0].id)
                // console.log(friendsList)
                // makeFriendsList(friendsList)
            }
        })
    },
    register(username, email) {
        const newUser = {
            username: username,
            email: email
        }

        API.getAllUsers().then(users => {
            users.forEach(user => {
                if (username === user.username || email === user.email) {
                    alert("You are already registered")
                }
            })
        })
        API.addUser(newUser)
    },
    makeRegistration() {
        loginBtn.className = "hidden"
        registerLink.className = "hidden"
        registerBtn.classList.remove("hidden")
    },
}

export default handleUser