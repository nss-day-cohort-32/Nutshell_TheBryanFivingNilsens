
import handleUser from "./login"
import API from "./dbCalls"
import handleFriends from "./friendsList";

const navContainer = document.querySelector("#links-container")
const loginContainer = document.querySelector("#login-page-container")
const friendsContainer = document.querySelector("#friends-container")
const friendRequestContainer = document.querySelector("#friend-requests")
const logOutBtn = document.querySelector("#logout")


if (sessionStorage.length === 0) {
    handleUser.renderLogin()
} else {
    let currentUser = sessionStorage.getItem("activeUser")
    logOutBtn.classList.remove("hidden")
    API.getFriendsList(currentUser, "true")
        .then(friends => {
            handleFriends.makeFriendsList(friends)
        })
    API.getFriendsList(currentUser, "false")
        .then(friends => {
            handleFriends.makeFriendRequestList(friends)
        })
}

console.log(sessionStorage)

//handle logout
navContainer.addEventListener("click", (e) => {
    e.preventDefault()
    if (e.target.id === "logout") {
        handleUser.logOut()
        location.reload()
    }
})

loginContainer.addEventListener("click", (e) => {
    const username = document.querySelector("#username")
    const email = document.querySelector("#email")
    e.preventDefault()
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
        username.value = ""
        email.value = ""
    }
})

friendsContainer.addEventListener("click", (e) => {
    e.preventDefault()
    // handle friend
    if (e.target.className === "friendName") {
        const friendDiv = e.target.nextElementSibling
        const friendBtn = friendDiv.nextElementSibling
        friendDiv.classList.toggle("hidden")
        friendBtn.classList.toggle("hidden")
        // handle delete friend
    } else if (e.target.className === "deleteFriend") {
        const deleteFriendId = e.target.id.split("--")[1]
        handleFriends.deleteFriend(deleteFriendId)
        let friendToRemove = e.target.parentNode
        friendRequestContainer.removeChild(friendToRemove)
    } else if (e.target.className === "acceptFriend") {
        let friendToAccept = (e.target.previousElementSibling.textContent)
        handleFriends.acceptFriendRequest(friendToAccept)
        let friendToMove = (e.target.parentNode)
        friendRequestContainer.removeChild(friendToMove)
        friendsContainer.appendChild(friendToMove)
    }
})

