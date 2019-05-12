/*
    Author: Jason Collum
    Name: Tasks
    Purpose: Build Tasks Component
*/
import API from "./dbCalls"

// Create elements and target divs
const primaryContainer = document.querySelector('#primary-container');
const tasksContainer = document.querySelector('#tasks-container');
const taskListContainer = document.querySelector('#task-list-container');
// const tasksContainer = document.createElement('div');
// const taskListContainer = document.createElement('div');
// const tasksForm = document.createElement('form');

// tasksContainer.setAttribute('id', 'tasks-container');
// taskListContainer.setAttribute('id', 'tasks-list-container');
// tasksForm.setAttribute('id', 'tasks-form');

// TEMPORARY RENDER TO DOM FUNCTION
function renderToDom(target, frag) {
    target.append(frag);
}
// ********************************

const tasks = {
    renderUserTasks(userId) {
        // Clear primary container
        // primaryContainer.innerHTML = '';

        // Create task form
        // tasksForm.innerHTML = `
        //     <div id="form-elements">
        //         <fieldset>
        //             <input type="text" id="hidden-input" class="hidden">
        //             <input type="text" id="task-input" placeholder="Enter a task...">
        //             <label for="task-completion-date">Complete Task By: </label>
        //             <input type="date" name="task-completion-date" id="task-completion-date" required>
        //             <input id="save-task-btn" type="submit" value="Save Task">
        //             <input id="update-task-btn" type="submit" class="hidden" value="Save Updated Task">
        //         </fieldset>
        //     </div>
        //     `;

        // tasksContainer.append(tasksForm, taskListContainer);
        // renderToDom(primaryContainer, tasksContainer);

        API.getUserTasks(userId)  // needs to be userId
            .then(userTasks => {
                userTasks.forEach(task => {
                    tasks.addToTaskList(task)
                })
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
    addToTaskList(task) {
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

        renderToDom(taskListContainer, taskDiv);
    },
    editTask() {

    },
    removeTaskFromDOM(taskId) {
        const taskToRemove = document.querySelector(`#task-div--${taskId}`);
        taskToRemove.parentNode.removeChild(taskToRemove);
    },
    removeAndDeleteTask(taskId) {
        const taskToRemove = document.querySelector(`#task-div--${taskId}`);
        taskToRemove.parentNode.removeChild(taskToRemove);
        API.deleteTask(taskId)
    },
    saveTheDate(date) {
        const dateArray = date.split('-');
        const year = dateArray.shift();
        dateArray.push(year);
        const formattedDate = dateArray.join('-');
        return formattedDate;
    }
}

export default tasks



