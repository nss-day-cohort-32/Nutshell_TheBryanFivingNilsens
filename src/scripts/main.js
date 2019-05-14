
import handleUser from "./login"
import API from "./dbCalls"
import friendsEvents from "./friendsEvents"
import friendsNews from "./friendsNews"
import tasks from "./tasks"
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
const myFriedndsBtn = document.querySelector("#my-friends-link")
const primaryContainer = document.querySelector("#primary-container");

// TASKS - targeted elements
const hiddenInput = document.querySelector('#hidden-input');
const taskName = document.querySelector('#task-input');
const completionDate = document.querySelector('#task-completion-date');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const submitBtn = document.querySelector('#save-task-btn');
const noTaskOrDateMessage = document.querySelector('#task-and-date-message');
const taskNameMessage = document.querySelector('#task-name-message');
const taskCompletionDateMessage = document.querySelector('#task-date-message');
const myTasksLink = document.querySelector("#my-tasks-link");
const tasksContainer = document.querySelector("#tasks-container");

const targets = {
    hiddenInput,
    taskName,
    completionDate,
    cancelEditBtn,
    submitBtn,
    noTaskOrDateMessage,
    taskNameMessage,
    taskCompletionDateMessage
}

if (sessionStorage.length === 0) {
    handleUser.renderLogin()
} else {
    let currentUser = sessionStorage.getItem("activeUser")
    logOutBtn.classList.remove("hidden")
    API.getFriendsList(currentUser, "true", "true")
        .then(friends => {
            handleFriends.makeFriendsList(friends)
        })
    API.getFriendsList(currentUser, "false", "false")
        .then(friends => {
            handleFriends.makeFriendRequestList(friends)
        })
}

console.log(sessionStorage)

// nf handle logout
navContainer.addEventListener("click", (e) => {
    e.preventDefault()
    if (e.target.id === "logout") {
        handleUser.logOut()
        location.reload()
    }
})

// nf login listeners



// LOGIN - LOGIN LISTENER
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

// nf friends listeners
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
        //handle accept friend
    } else if (e.target.className === "acceptFriend") {
        let friendToAccept = `${e.target.previousElementSibling.textContent}`
        handleFriends.acceptFriendRequest(friendToAccept)
        let friendToMove = e.target.parentNode
        //handle send request
    } else if (e.target.id === "sendRequestBtn") {
        const searchFriendInput = document.querySelector("#searchFriends")
        let friendName = searchFriendInput.value
        handleFriends.sendFriendRequest(friendName)
        searchFriendInput.value = ""

    }
})

//start event listeners

// TASK LISTENERS SECTION ///////////////////////////////////////////////////
const userId = 1   // temporary userId
tasks.renderUserTasks(userId) // temporary call to load user tasks

// My Tasks Link - listener : to show tasks component
myTasksLink.addEventListener('click', (e) => {
    tasksContainer.classList.remove('hidden');
})

// Tasks Container Event Listener
tasksContainer.addEventListener('click', (e) => {
    if (e.target.id === 'cancel-edit-btn') {
        e.preventDefault()
        tasks.handleCancelEditBtn(targets)
    }
    if (e.target.id === 'save-task-btn') {
        e.preventDefault()
        tasks.handleSubmitBtn(targets, userId)
    }
    if (e.target.className === 'complete-check') {  // Task Form - Checkbox
        tasks.handleCheckbox(e)
    }
    if (e.target.className === 'task-item-link') { // Task List - Anchor Tag
        e.preventDefault()
        const taskToEditId = e.target.id.split('--')[1]
        tasks.editTask(targets, taskToEditId)
    }
    // Task List - Remove Button
    if (e.target.className === 'remove-btn') {  // Task List - Remove Button
        e.preventDefault()
        const taskId = e.target.id.split('--')[1];
        tasks.removeAndDeleteTask(targets, taskId);  // Remove task from DOM & Delete task from db
    }
})

// Task Form INPUT Listener
targets.taskName.addEventListener('keyup', (e) => {
    tasks.clearMessage(targets, e.target.id, e.target.value);
})
// Task Form DATE Listener
targets.completionDate.addEventListener('change', (e) => {
    tasks.clearMessage(targets, e.target.id, e.target.value);
})

// END TASK SECTION //////////////////////////////////////////////////////////




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

myFriedndsBtn.addEventListener("click", (e) => {
    const primary = document.querySelector("#primary-container");
    const news = document.createElement("div")
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
    primary.appendChild(news)
    primary.appendChild(events)
    friendsEvents.createFriendsEvents()
    friendsEvents.createEventListener()
    friendsNews.createFriendsNews()
    friendsNews.createNewsListener()
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
