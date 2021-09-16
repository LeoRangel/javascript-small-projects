
// Anonymous function defined and executed together
(function () {
    'use strict';

    var tasker = {

        // Inicia app
        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.evalTasklist();
        },

        // Get all necessary elements
        cacheDom: function () {
            this.taskInput = document.getElementById("input-task");
            this.addBtn = document.getElementById("add-task-btn");
            this.tasklist = document.getElementById("tasks");
            this.tasklistChildren = this.tasklist.children;
            this.errorMessage = document.getElementById("error");
        },

        // Add events to add tasks button and task input
        bindEvents: function () {
            this.addBtn.onclick = this.addTask.bind(this);
            this.taskInput.onkeypress = this.enterKey.bind(this);
        },

        // Add events to task checkboxes and delete buttons
        evalTasklist: function () {
            var i, checkBox, deleteBtn;

            //BIND CLICK EVENTS TO ELEMENTS
            for (i = 0; i < this.tasklistChildren.length; i += 1) {

                //ADD CLICK EVENT TO CHECKBOXES
                checkBox = this.tasklistChildren[i].getElementsByTagName("input")[0];
                checkBox.onclick = this.completeTask.bind(
                    this,
                    this.tasklistChildren[i],
                    checkBox
                );

                //ADD CLICK EVENT TO DELETE BUTTON
                deleteBtn = this.tasklistChildren[i].getElementsByTagName("button")[0];
                deleteBtn.onclick = this.delTask.bind(this, i);
            }
        },

        // Create Task HTML element
        render: function () {
            var taskLi, taskCheckbox, taskVal, taskDeleteBtn, taskDeleteIcon;

            //BUILD HTML - <li class="task"></li>
            taskLi = document.createElement("li");
            taskLi.setAttribute("class", "task");

            //CHECKBOX - <input type="checkbox">
            taskCheckbox = document.createElement("input");
            taskCheckbox.setAttribute("type", "checkbox");

            //TASK NAME
            taskVal = document.createTextNode(this.taskInput.value);

            //DELETE BUTTON - <button></button>
            taskDeleteBtn = document.createElement("button");

            //TRASH ICON - <span class="material-icons">delete_outline</span>
            taskDeleteIcon = document.createElement("span");
            taskDeleteIcon.setAttribute("class", "material-icons");
            taskDeleteIcon.innerHTML = 'delete_outline';

            //INSTERT TRASH ICON INTO DELETE BUTTON
            taskDeleteBtn.appendChild(taskDeleteIcon);

            //APPEND ELEMENTS TO TASKLI
            taskLi.appendChild(taskCheckbox);
            taskLi.appendChild(taskVal);
            taskLi.appendChild(taskDeleteBtn);

            //ADD TASK TO TASK LIST
            this.tasklist.appendChild(taskLi);
        },

        // Change the Task HTML element class to "task completed" if the checkbox is checked
        completeTask: function (i, checkBox) {
            if (checkBox.checked) {
                i.className = "task completed";
            } else {
                this.incompleteTask(i);
            }
        },

        // Set the Task HTML element class to "task"
        incompleteTask: function (i) {
            i.className = "task";
        },

        // Call the addTask function if the Return or Enter key on keyboard is pressed
        enterKey: function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                this.addTask();
            }
        },

        // Add new task or display error message if task input value is empty
        addTask: function () {
            var taskInputValue = this.taskInput.value;
            this.errorMessage.style.display = "none";

            if (taskInputValue === "") {
                this.error();
            } else {
                this.render();
                this.taskInput.value = "";
                this.evalTasklist();
            }
        },

        // Delete Task HTML element from tasklist
        delTask: function (i) {
            this.tasklist.children[i].remove();
            this.evalTasklist();
        },

        // Display error message
        error: function () {
            this.errorMessage.style.display = "block";
        }

    };

    // Start the app
    tasker.init();

}());