document.addEventListener("DOMContentLoaded", () => {
    const taskList = [
        "Change wallpapers",
        "Move possible new apps into folder",
        "Delete any unneeded/unplanned alarms",
        "Add new events to calendar",
        "Add new tasks to reminders app and remove old",
        "Clear out unneeded photos and videos",
        "Clear out unneeded texts",
        "Clear out unneeded notes",
        "Organise shopping apps (wish lists)",
        "Organise Spotify",
        "Delete unneeded bookmarks",
        "Clear all tabs",
        "Delete unused apps",
        "Check out all unanswered notifications"
    ];

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
