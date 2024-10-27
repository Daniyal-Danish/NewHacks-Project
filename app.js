document.addEventListener("DOMContentLoaded", () => {
    const taskList = [
       
 
    ];

    const result = localStorage.getItem("result");
    console.log(result);
    const taskListJson = JSON.stringify(taskList);
    const taskListFromJson = JSON.parse(result);
    taskListFromJson.forEach((task) => {
        taskList.push(task.value);
    });

    const taskContainer = document.getElementById("task-container");

    function renderTasks() {
        taskContainer.innerHTML = ""; // Clear existing tasks

        taskList.forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task-item");

            // Task checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `task-${index}`;
            checkbox.classList.add("task-checkbox");
            checkbox.addEventListener("change", (e) => {
                taskLabel.classList.toggle("completed", e.target.checked);
            });

            // Task label
            const taskLabel = document.createElement("label");
            taskLabel.htmlFor = `task-${index}`;
            taskLabel.textContent = task;
            taskLabel.classList.add("task-label");

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskLabel);
            taskContainer.appendChild(taskItem);
        });
    }

    renderTasks();
});