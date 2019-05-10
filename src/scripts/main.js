
import handleUser from "./login"
import API from "./dbCalls"

const loginContainer = document.querySelector("#login-container")
const friendsContainer = document.querySelector("#friends-container")
const username = document.querySelector("#username")
const email = document.querySelector("#email")



loginContainer.addEventListener("click", (e) => {
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
    } else if (e.target.id === "logout") {
        handleUser.logOut()
    }
})

friendsContainer.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(e)
    // handle remove friend
    if (e.target.className === "friendName") {
        const friendDiv = e.target.nextElementSibling
        friendDiv.classList.toggle("hidden")
    }
})







// const friendsListId = e.target.id.split("--")[1]
// const friendListInfo = document.querySelectorAll(".friend-info")
// const friendEmail = document.querySelector("#friend-in-list-email")
// const deleteFriendBtn = document.querySelector("#delete-friend")







