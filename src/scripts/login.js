import API from "./dbCalls";
import handleFriends from "./friendsList"


const loginBtn = document.querySelector("#login-btn")
const registerBtn = document.querySelector("#register-btn")
const registerLink = document.querySelector("#register-link")
const logOutBtn = document.querySelector("#logout")
const mainDiv = document.querySelector("#primary-container")

const handleUser = {
    login(username, email) {
        API.loginUser(username, email).then(user => {
            if (user.length === 0) {
                alert("username and email do not match")
            } else {
                console.log(user[0].id)
                mainDiv.innerHTML = ""
                logOutBtn.classList.remove("hidden")
                sessionStorage.setItem("activeUser", user[0].id)
                API.getFriendsList(user[0].id, "true")
                    .then(friends => {
                        console.log(friends)
                        handleFriends.makeFriendsList(friends)
                    })
                API.getFriendsList(user[0].id, "false")
                    .then(friends => {
                        handleFriends.makeFriendRequestList(friends)
                    })
            }
        })
    },
    register(username, email) {
        const newUser = {
            username: username,
            email: email
        }

        API.getAllUsers().then(users => {
            if (users.find(user =>
                username === user.username || email === user.email
            ) !== undefined) {
                alert("You are already a user")
            } else {
                API.addUser(newUser).then(newuserInfo => {
                    handleUser.login(newuserInfo.username, newuserInfo.email)
                })
            }
        })

    },
    makeRegistration() {
        loginBtn.className = "hidden"
        registerLink.className = "hidden"
        registerBtn.classList.remove("hidden")
    },
    logOut() {
        sessionStorage.removeItem("activeUser")
    }
}

export default handleUser