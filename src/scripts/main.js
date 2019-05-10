
import handleUser from "./login"
import API from "./dbCalls";
import tasks from "./tasks"

const primaryContainer = document.querySelector("#primary-container")

const loginBtn = document.querySelector("#login-btn")
const registerLink = document.querySelector("#register-link")
const registerBtn = document.querySelector("#register-btn")
const username = document.querySelector("#username")
const email = document.querySelector("#email")

// JASON - TASK LISTENERS SECTION *********************************************
// Primary Container Event Listener - Tasks
primaryContainer.addEventListener('click', (e) => {
    // Form - Save/Submit Button
    if (e.target.id === 'save-task-btn') {
        e.preventDefault()
        const taskName = document.querySelector('#task-input');
        const completionDate = document.querySelector('#task-completion-date');
        // Format date
        const formattedDate = tasks.saveTheDate(completionDate.value);
        // Create new task object
        const newTask = tasks.createNewTaskObject(2, taskName.value, formattedDate);
        // Reset input fields
        taskName.value = '';
        completionDate.value = '';
        // Save new task to db
        API.addTask(newTask)
            .then(newTask => {
                tasks.addToTaskList(newTask)
            })
    }
    // Task List Item - Checkbox (create true/false object to patch)
    if (e.target.className === 'complete-check') {
        const taskId = e.target.id.split('--')[1];
        if (e.target.checked) {
            const trueObj = {
                completed: true
            }
            API.editTask(taskId, trueObj);
        } else {
            const falseObj = {
                completed: false
            }
            API.editTask(taskId, falseObj);
        }
    }
    // Task List Item Name - h4
    if (e.target.className === 'task-item') {
        e.preventDefault()
        const itemId = e.target.id.split('--')[1]
        console.log(itemId)
    }
    // Task List - Remove Button
    if (e.target.className === 'remove-btn') {
        e.preventDefault()
        console.log('Remove Button Clicked')
    }
})
// END JASON TASK SECTION ***************************************************

loginBtn.addEventListener("click", () => {
    handleUser.login(username.value, email.value)
    username.value = ""
    email.value = ""
})

registerLink.addEventListener("click", (e) => {
    handleUser.makeRegistration()
})

registerBtn.addEventListener("click", (e) => {
    handleUser.register(username.value, email.value)
})

tasks.buildTasks(2)
// console.log(API.acceptFriends(1, "john"))








