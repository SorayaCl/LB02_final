'use strict'

let usual = [{
        "task": "Einkaufen"
    },
    {
        "task": "Waschen"
    },
    {
        "task": "Lernen"
    },
    {
        "task": "Staubsaugen"
    },
    {
        "task": "Hausaufgaben"
    },
    {
        "task": "Kochen"
    },
    {
        "task": "Tischdecken"
    }

]

let taskNumber = 0

function whatButton(number) {
    taskNumber = number
};

function showButtons() {
    document.getElementById("usualButtons").style.display = "block"
}

function hideButtons() {
    document.getElementById("usualButtons").style.display = "none"
}

//get task list as JSON-object format
let tasks = getSavedTasks();

//set initial filter of empty
const filters = {
    searchText: '',
    hideCompleted: false
}

//show task list
renderTasks(tasks, filters);


/**
 * Event when searching for tasks
 */
document.querySelector('#search-text')
    .addEventListener('input', (e) => {
        //set search filter
        filters.searchText = e.target.value;
        //show task list with filter
        renderTasks(tasks, filters);
    })


/**
 * Event for a new task
 */
const usualButtons = document.querySelectorAll(".usualButtons");
for (let i = 0; i < usualButtons.length; i++) {
    usualButtons[i].addEventListener("click", function() {
        //add new task with push-method into JSON-object
        tasks.push({
            id: uuidv4(),
            text: usual[taskNumber].task,
            completed: false
        });
        //save tasks
        saveTasks(tasks);
        //show tasks
        renderTasks(tasks, filters);
    });
}
/**
 * Event for a new task
 */
document.querySelector('#new-task')
    .addEventListener('submit', (e) => {
        e.preventDefault()

        //add new task with push-method into JSON-object
        tasks.push({
            id: uuidv4(),
            text: e.target.elements.text.value,
            completed: false
        });

        //save tasks
        saveTasks(tasks);
        //show tasks
        renderTasks(tasks, filters);
        e.target.elements.text.value = '';
    })

/**
 * Hide completed tasks
 */
document.querySelector('#hide-completed')
    .addEventListener('change', (e) => {
        //en- or disable completed tasks
        filters.hideCompleted = e.target.checked;
        //show tasks
        renderTasks(tasks, filters);
    })