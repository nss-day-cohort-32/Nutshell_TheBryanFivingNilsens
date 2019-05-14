
import handleUser from "./login"
import API from "./dbCalls";
import eventsPage from "./events";
import newsPage from "./news";
import messageBoard from "./messageBoard";

var moment = require('moment');
moment().format();

console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));

const loginContainer = document.querySelector("#login-container")
const friendsContainer = document.querySelector("#friends-container")
const username = document.querySelector("#username")
const email = document.querySelector("#email")

const myEventsBtn = document.querySelector("#my-events-link");
const myNewsBtn = document.querySelector("#my-news-link");
const messageBoardBtn = document.querySelector("#message-board")
const primaryContainer = document.querySelector("#primary-container");



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
    if (e.target.id === "friend-in-list") {
        console.log(e.target)
    }
})



myEventsBtn.addEventListener("click", (e) => {
    const primary = document.querySelector("#primary-container");
    primary.innerHTML = "";
    const userId = sessionStorage.getItem("activeUser");
    eventsPage.getMyEvents(userId);
    eventsPage.createAddEventButton();
})

myNewsBtn.addEventListener("click", (e) => {
    const primary = document.querySelector("#primary-container");
    primary.innerHTML = "";
    const userId = sessionStorage.getItem("activeUser");
    console.log(userId);
    newsPage.getUserNews(userId);
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
        API.addEvent(newEventObj);
        eventsPage.newEventSuccessMsg();
    }
})

// Bring up edit form and populate with exist data
primaryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-event-btn")) {
        let itemArray = e.target.id.split("--");
        let targetId = itemArray[1];
        eventsPage.populateExistingEventData(targetId);
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
        console.log(targetId)
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
        submitButton.setAttribute("id", "new-news-submission-btn");
    }
})

// Submit new event
primaryContainer.addEventListener("click", (e) => {
    if (e.target.id === "new-news-submission-btn") {
        e.preventDefault();
        const newNewsObj = newsPage.captureNewNewsData();
        console.log(newNewsObj);
        API.addNews(newNewsObj);
        newsPage.newNewsSuccessMsg();
    }
})

// Bring up edit form and populate with exist data
primaryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-news-btn")) {
        let itemArray = e.target.id.split("--");
        let targetId = itemArray[1];
        newsPage.populateExistingNewsData(targetId);
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
                newsPage.newNewsSuccessMsg();
            })
        }
    }
})

/////////////////////Messages////////////////////////////

messageBoardBtn.addEventListener("click", (e) => {
    if (e.target.id === "message-board") {
        console.log("working")
        messageBoard.getMessages();
    }
})

primaryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("acceptFriend")) {
        let itemArray = e.target.id.split("--");
        let targetId = itemArray[1];
        if (confirm("Are you sure you want to add this friend?") == true) {
            messageBoard.addFriend(targetId);
        }
    }
})

primaryContainer.addEventListener("click", (e) => {
    if (e.target.id === "new-msg-submit-btn") {
        const newMessage = messageBoard.captureNewMessage();
        API.addMessages(newMessage).then(response => {
            messageBoard.getMessages();
        })
    }
})

// Bring up edit form and populate with exist data
primaryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-msg-btn")) {
        let itemArray = e.target.id.split("--");
        let targetId = itemArray[1];
        messageBoard.populateExistingMsgData(targetId);
    }
})

// send edited data to JSON
primaryContainer.addEventListener("click", (e) => {
    if (e.target.id === "edited-msg-submission-btn") {
        const newMessageObj = messageBoard.captureEditedMessage();
        const hiddenValue = document.querySelector("#hiddenField").value;
        API.editMessages(hiddenValue, newMessageObj)
            .then(response => {
                console.log("response", response)
                messageBoard.getMessages();
            })
    }
})
