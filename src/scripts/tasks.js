/*
    Author: Jason Collum
    Name: Tasks
    Purpose: Build Tasks Component
*/
import API from "./dbCalls"
// import renderToDom from "./rendorToDom"  // NOT WORKING ???

// Task Form Elements
// const hiddenInput = document.querySelector('#hidden-input');
// const taskName = document.querySelector('#task-input');
// const completionDate = document.querySelector('#task-completion-date');
// const cancelEditBtn = document.querySelector('#cancel-edit-btn');
// const submitBtn = document.querySelector('#save-task-btn');
// const taskNameMessage = document.querySelector('#task-name-message');
// const taskCompletionDateMessage = document.querySelector('#task-date-message');

const taskListContainer = document.querySelector('#task-list-container');
const taskListInstructions = document.querySelector('#task-list-instructions');

function renderToDom(target, frag) {
    target.appendChild(frag);
}

const tasks = {
    renderUserTasks(userId) {
        API.getUserTasks(userId)
            .then(userTasks => {
                if (userTasks.length > 0) {
                    taskListInstructions.classList.remove('hidden');
                    userTasks.forEach(task => {
                        tasks.addToTaskList(task)
                    })
                }
            })
    },
    createNewTaskObject(userId, name, targetCompletionDate) {
        const taskObj = {
            userId,
            name,
            targetCompletionDate,
            completed: false
        }
        return taskObj;
    },
    addToTaskList(task) {   // Create task element and render to DOM
        const taskDiv = document.createElement('div');
        taskDiv.id = `task-div--${task.id}`;
        taskDiv.className = 'task-div';

        const label = document.createElement('label');
        label.className = `task-label`;

        const dateSpan = document.createElement('span');
        const formattedDate = tasks.saveTheDate(task.targetCompletionDate);
        dateSpan.textContent = `complete by: ${formattedDate}`;
        dateSpan.className = 'date-span';

        const taskItemLink = document.createElement('a');
        taskItemLink.id = `task-item--${task.id}`;
        taskItemLink.className = 'task-item-link';
        taskItemLink.textContent = task.name;

        const taskItem = document.createElement('h4');
        taskItem.className = `task-item line-through`;
        // taskItem.textContent = task.name;
        taskItem.append(taskItemLink);
        taskItem.append(dateSpan);

        const removeBtn = document.createElement('button');
        removeBtn.id = `remove-btn--${task.id} `;
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'X';

        const completeCheckbox = document.createElement('input');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.id = `complete-check--${task.id}`;
        completeCheckbox.className = 'complete-check';
        if (task.completed) {
            completeCheckbox.checked = true;
        }

        label.append(removeBtn, completeCheckbox, taskItem);
        taskDiv.append(label);

        if (task) {
            taskListInstructions.classList.remove('hidden');
        }
        taskListInstructions.classList.remove('hidden');
        renderToDom(taskListContainer, taskDiv);
    },
    editTask(targets, taskToEditId) {    // Fill form with task data to edit, show cancel button
        API.getSingleUserTask(taskToEditId)
            .then(task => {
                // Populate form to edit task
                targets.hiddenInput.value = task.id;
                targets.taskName.value = task.name;
                targets.completionDate.value = task.targetCompletionDate;
                // Show cancel button
                targets.cancelEditBtn.classList.remove('hidden');
                targets.submitBtn.value = 'Update Task';
                // Clear any messages that may be present
                targets.noTaskOrDateMessage.classList.add('hidden');
                targets.taskNameMessage.classList.add('hidden');
                targets.taskCompletionDateMessage.classList.add('hidden');
            })
    },
    removeTaskFromDOM(taskId) { // Remove task item from list when selected for edit
        const taskToRemove = document.querySelector(`#task-div--${taskId}`);
        taskToRemove.parentNode.removeChild(taskToRemove);
        const count = tasks.getTaskItemsCount();
        if (count < 1) {
            taskListInstructions.classList.add('hidden');
        }
    },
    removeAndDeleteTask(taskId) {   // Remove task item from DOM and delete task from db
        tasks.removeTaskFromDOM(taskId);
        API.deleteTask(taskId)
    },
    saveTheDate(date) {
        const dateArray = date.split('-');
        const year = dateArray.shift();
        dateArray.push(year);
        const formattedDate = dateArray.join('-');
        return formattedDate;
    },
    getTaskItemsCount() {
        const taskItemsCount = document.querySelectorAll('.task-div');
        return taskItemsCount.length;
    },
    // Event Listener Functionality
    handleSubmitBtn(targets, userId) {   // Save or Update Task
        if (!targets.taskName.value && !targets.completionDate.value) {
            targets.noTaskOrDateMessage.classList.remove('hidden');
        } else if (!targets.taskName.value) {
            targets.taskNameMessage.classList.remove('hidden');
        } else if (!targets.completionDate.value) {
            targets.taskCompletionDateMessage.classList.remove('hidden');
        } else {
            const taskId = targets.hiddenInput.value;
            const formattedDate = targets.completionDate.value;
            // Create task object
            const taskObj = tasks.createNewTaskObject(userId, targets.taskName.value, formattedDate);
            // Reset input fields and hidden input
            targets.hiddenInput.value = '';
            targets.taskName.value = '';
            targets.completionDate.value = '';

            if (!taskId) {  // Save NEW task to db
                API.addTask(taskObj)
                    .then(newTask => {
                        tasks.addToTaskList(newTask)
                    })
            } else {    // Update EDITED task to db
                targets.submitBtn.value = 'Save Task'; // Reset submit button text
                tasks.removeTaskFromDOM(taskId)   // Remove old task from list
                API.editTask(taskId, taskObj)   // Save updated task to db and render to DOM
                    .then(editedTask => {
                        tasks.addToTaskList(editedTask)
                    })
            }
        }
    },
    handleCancelEditBtn(targets) {
        targets.hiddenInput.value = '';
        targets.taskName.value = '';
        targets.completionDate.value = '';
        targets.noTaskOrDateMessage.classList.add('hidden');
        targets.taskNameMessage.classList.add('hidden');
        targets.taskCompletionDateMessage.classList.add('hidden');
        targets.cancelEditBtn.classList.add('hidden');
        targets.submitBtn.value = 'Save Task';
    },
    handleCheckbox(e) { // Create true/false object to patch
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
    },
    clearMessage(targets, targetId, targetValue) {    // Clear incomplete fields messages
        if (targetId === 'task-input' && targetValue) {
            targets.taskNameMessage.classList.add('hidden');
            targets.noTaskOrDateMessage.classList.add('hidden');
        }
        if (targetId === 'task-completion-date' && targetValue) {
            targets.taskCompletionDateMessage.classList.add('hidden');
            targets.noTaskOrDateMessage.classList.add('hidden');
        }
    }
}

export default tasks



