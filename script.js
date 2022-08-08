let taskList = document.querySelector('ul');
let addTask = document.querySelector('#add-task-button');


let Store = [];

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const deleteTask = (id) => {
    let newStore = Store.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(newStore));
    displayToDoList();
};

const doneTask = (id) => {
    let newStore = Store.map(task => {
        if(task.id === id) {
            task.done = !task.done;
            return task;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(newStore));
    displayToDoList();
}

const displayToDoList = () => {
    Store = JSON.parse(localStorage.getItem('tasks')) || [];
    removeAllChildNodes(taskList);
    Store.map(task => {
        let newTask = document.createElement('li');
        newTask.setAttribute('key', task.id);
        newTask.innerHTML = `
            <input type="checkbox" onchange="doneTask((Number(this.parentNode.getAttribute('key'))))">
            <span class="task ${task.done && "selectTask"}">${task.text}</span>
            <button class="delete-btn" onclick="return this.parentNode.remove();">Delete</button>
            <button class="delete-btn" onclick="deleteTask(Number(this.parentNode.getAttribute('key')));">Delete</button>`;
        taskList.append(newTask);
    });
};

addTask.addEventListener("click", () => {
    let taskText = document.querySelector('#input-task');
    let newTask = {
        id: Number(Store.length) + 1,
        text: taskText.value,
        done: false,
    };
    Store.push(newTask);
    taskText.value = '';
    localStorage.setItem("tasks", JSON.stringify(Store));
    displayToDoList();
});

displayToDoList();


