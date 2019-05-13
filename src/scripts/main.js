
import handleUser from "./login"
import API from "./dbCalls";
import eventsPage from "./events";
import newsPage from "./news";
import handleFriends from "./friendsList"

const navContainer = document.querySelector("#links-container")
const loginContainer = document.querySelector("#login-page-container")
const friendsContainer = document.querySelector("#friends-container")
const friendRequestContainer = document.querySelector("#friend-requests")
const logOutBtn = document.querySelector("#logout")

const myEventsBtn = document.querySelector("#my-events-link");
const myNewsBtn = document.querySelector("#my-news-link");
const primaryContainer = document.querySelector("#primary-container");


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

//start events handlers

myEventsBtn.addEventListener("click", (e) => {
    const primary = document.querySelector("#primary-container");
    primary.innerHTML = "";
    eventsPage.getMyEvents(2);
    eventsPage.createAddEventButton();
})

myNewsBtn.addEventListener("click", (e) => {
    const primary = document.querySelector("#primary-container");
    primary.innerHTML = "";
    newsPage.getUserNews(2);
    newsPage.createAddNewsButton();
})

/////////////////////EVENTS////////////////////////////

// Plus button to bring up new event form
primaryContainer.addEventListener("click", (e) => {
    if (event.target.id === "create-new-event-btn") {
        const primary = document.querySelector("#primary-container");
        primary.innerHTML = "";
        eventsPage.renderEventForm();
        const submitButton = document.querySelector("#submit-new-event");
        submitButton.setAttribute("id", "new-event-submission-btn");
    }
})

// Submit new event
primaryContainer.addEventListener("click", (e) => {
    if (e.target.id === "new-event-submission-btn") {
        e.preventDefault();
        const newEventObj = eventsPage.captureNewEventData();
        API.addEvents(newEventObj);
        eventsPage.newEventSuccessMsg();
    }
})

// Bring up edit form and populate with exist data
primaryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-event-btn")) {
        let itemArray = e.target.id.split("--");
        let targetId = itemArray[1];
        eventsPage.populateExistingEventData(5);
    }
})

// Submit edited data to database
primaryContainer.addEventListener("click", (e) => {
    if (e.target.id === "edited-event-submission-btn") {
        console.log("edited event button");
        const editedEventObj = eventsPage.captureEditedEventData();
        const selectedId = editedEventObj.id;
        console.log(selectedId);
        API.editEvent(editedEventObj.id, editedEventObj);
        eventsPage.newEventSuccessMsg();
    }
})

// Delete entry
primaryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-event-btn")) {
        let itemArray = e.target.id.split("--");
        let targetId = itemArray[1];
        if (confirm("Are you sure you want to cancel this event?") == true) {
            API.deleteEvents(targetId).then(() => {
                eventsPage.newEventSuccessMsg();
            })

        }
    }
})

/////////////////////NEWS////////////////////////////

// Plus button to bring up new event form
primaryContainer.addEventListener("click", (e) => {
    if (event.target.id === "create-new-news-btn") {
        const primary = document.querySelector("#primary-container");
        primary.innerHTML = "";
        newsPage.renderNewsForm();
        const submitButton = document.querySelector("#submit-new-news");
        submitButton.setAttribute("id", "new-submission-btn");
    }
})

// Submit new event
primaryContainer.addEventListener("click", (e) => {
    if (e.target.id === "new-news-submission-btn") {
        e.preventDefault();
        const newNewsObj = newsPage.captureNewNewsData();
        API.addNews(newNewsObj);
        newsPage.newNewsSuccessMsg();
    }
})

// Bring up edit form and populate with exist data
primaryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-news-btn")) {
        let itemArray = e.target.id.split("--");
        let targetId = itemArray[1];
        newsPage.populateExistingNewsData(2);
    }
})

// Submit edited data to database
primaryContainer.addEventListener("click", (e) => {
    if (e.target.id === "edited-news-submission-btn") {
        console.log("edited event button");
        const editedNewsObj = newsPage.captureEditedNewsData();
        const selectedId = editedNewsObj.id;
        console.log(selectedId);
        API.editNews(editedNewsObj.id, editedNewsObj);
        newsPage.newNewsSuccessMsg();
    }
})

// Delete entry
primaryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("news-delete-btn")) {
        let itemArray = e.target.id.split("--");
        let targetId = itemArray[1];
        if (confirm("Are you sure you want to delete this news item?") == true) {
            API.deleteNews(targetId).then(() => {
                newssPage.newNewsSuccessMsg();
            })
        }
    }
})
