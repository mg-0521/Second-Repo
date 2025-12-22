/* Getting HTML elements */
const inputBox = document.getElementById("myInput");
const taskList = document.getElementById("taskList");

/* Function to add new task */
function newElement() {
    let task = inputBox.value.trim(); // remove extra spaces

    if (task === "") {
        alert("You must write something!!");
        return;
    }

    /* Create a new <li> */
    let li = document.createElement("li");
    li.textContent = task;

    /* Create edit button */
    let editBtn = document.createElement("span");
    editBtn.innerHTML = "✎";
    editBtn.classList.add("editBtn");
    li.appendChild(editBtn);

    /* Create delete button */
    let delBtn = document.createElement("span");
    delBtn.innerHTML = "\u00d7";
    delBtn.classList.add("deleteBtn");
    li.appendChild(delBtn);

    taskList.appendChild(li);

    inputBox.value = ""; // clear input
    saveData(); // save to storage
}

/* Event listener on task list (for check, edit, delete) */
taskList.addEventListener("click", (e) => {

    /* Toggle check/uncheck */
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }

    /* Edit button clicked */
    else if (e.target.classList.contains("editBtn")) {
        let li = e.target.parentElement;
        let oldText = li.firstChild.nodeValue.trim();

        let newText = prompt("Edit your task:", oldText);

        if (newText && newText.trim() !== "") {
            li.firstChild.nodeValue = newText;
        }
    }

    /* Delete button clicked */
    else if (e.target.classList.contains("deleteBtn")) {
        e.target.parentElement.remove();
    }

    saveData(); // update localStorage
});

/* Save data to localStorage */
function saveData() {
    localStorage.setItem("todo-data", taskList.innerHTML);
}

/* Load saved data on page refresh */
function showData() {
    let saved = localStorage.getItem("todo-data");
    if (saved) taskList.innerHTML = saved;
}

showData(); // Load data when page opens
