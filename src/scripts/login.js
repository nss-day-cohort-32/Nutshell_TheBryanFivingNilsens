import API from "./dbCalls";
import friendsNews from "./friendsNews";
import friendsEvents from "./friendsEvents"
import handleFriends from "./friendsList"


const logOutBtn = document.querySelector("#logout")
const loginContainer = document.querySelector("#login-page-container")


const handleUser = {
    renderLogin() {
        loginContainer.innerHTML = `
        <div id="login-container" class="">
            <h2>Login or Sign up</h2>
            <input type="text" id="username" placeholder="Enter username"/>
            <input type="text" id="email" placeholder="Enter email"/>
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
                sessionStorage.setItem("activeUserName", user[0].username)
                API.getFriendsList(user[0].id, "true", "true")
                    .then(friends => {
                        handleFriends.makeFriendsList(friends)
                    })
                API.getFriendsList(user[0].id, "false", "false")
                    .then(friends => {
                        handleFriends.makeFriendRequestList(friends)
                    })
                const primary = document.querySelector("#primary-container");
                const newsTitle = document.createElement("h1");
                newsTitle.textContent = "News";
                const eventsTitle = document.createElement("h1");
                eventsTitle.textContent = "Events";
                const innerDiv = document.createElement("div")
                const news = document.createElement("div")
                const horizRule = document.createElement("hr");
                news.setAttribute("id", "news-container")
                const newsModal = document.createElement("div")
                newsModal.setAttribute("id", "news-modals")
                const events = document.createElement("div")
                events.setAttribute("id", "events-container")
                const eventsModal = document.createElement("div")
                eventsModal.setAttribute("id", "events-modals")
                primary.innerHTML = "";

                news.appendChild(newsModal)
                events.appendChild(eventsModal)
                innerDiv.appendChild(news)
                innerDiv.appendChild(horizRule);
                innerDiv.appendChild(eventsTitle);
                innerDiv.appendChild(events)
                primary.appendChild(newsTitle)
                primary.appendChild(innerDiv)

                friendsEvents.createFriendsEvents()
                friendsEvents.createEventListener()
                friendsNews.createFriendsNews()
                friendsNews.createNewsListener()
                friendsEvents.createFriendsEvents()
                friendsEvents.createEventListener()
                friendsNews.createFriendsNews()
                friendsNews.createNewsListener()
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
        const loginBtn = document.querySelector("#login-btn")
        const registerBtn = document.querySelector("#register-btn")
        const registerLink = document.querySelector("#register-link")
        loginBtn.className = "hidden"
        registerLink.className = "hidden"
        registerBtn.classList.remove("hidden")
    },
    logOut() {
        console.log("logout")
        sessionStorage.removeItem("activeUser")
        sessionStorage.removeItem("activeUserName")
    }
}

export default handleUser
