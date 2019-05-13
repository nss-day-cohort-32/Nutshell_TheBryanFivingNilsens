import API from "./dbCalls";
import handleFriends from "./friendsList"


const loginBtn = document.querySelector("#login-btn")
const registerBtn = document.querySelector("#register-btn")
const logOutBtn = document.querySelector("#logout")
const registerLink = document.querySelector("#register-link")

const loginContainer = document.querySelector("#login-page-container")

const handleUser = {
    renderLogin() {
        loginContainer.innerHTML = `
        <div id="login-container" class="">
            <h2>Login or Sign up</h2>
            <label id="">Username:</label>
            <input type="text" id="username" />
            <label id="">Email:</label>
            <input type="text" id="email" />
            <button id="login-btn">Login</button>
            <a href="#" id="register-link">Register</a>
            <button id="register-btn" class="hidden">Register</button>
        </div>
        `
    },
    login(username, email) {
        API.loginUser(username, email).then(user => {
            if (user.length === 0) {
                alert("username and email do not match")
            } else {
                console.log(user[0].id)
                loginContainer.innerHTML = ""
                logOutBtn.classList.remove("hidden")
                sessionStorage.setItem("activeUser", user[0].id)
                API.getFriendsList(user[0].id, "true")
                    .then(friends => {
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
        console.log("logout")
        sessionStorage.removeItem("activeUser")
    }
}

export default handleUser