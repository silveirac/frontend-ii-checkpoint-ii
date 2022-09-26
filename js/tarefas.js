const baseUrl = "https://ctd-fe2-todo-v2.herokuapp.com/v1"

// rotaciona o icone de expansão da lista de pendências
document.getElementById("pending-list-expand").addEventListener("click", function (event) {
    const arrow = event.target
    const list = arrow.parentElement.parentElement.parentElement.nextElementSibling;
    arrow.classList.toggle("no-turn");
    list.classList.toggle("hidden");
})

function taskMove () {
    const moveUpArrow = Array.from(document.getElementsByClassName("move-up"))
    const moveDownArrow = Array.from(document.getElementsByClassName("move-down"))

    // move uma tarefa para cima
    moveUpArrow.forEach(element => element.addEventListener("click", function (event) {
        let currentTaskId = event.target.parentElement.parentElement.id;
        const currentTask = document.getElementById(currentTaskId);
        const previousTask = currentTask.previousElementSibling;

        let taskList = Array.from(JSON.parse(sessionStorage.getItem("pendingList")));
        let taskIndex = taskList.indexOf(parseInt(currentTaskId));

        if (previousTask != null) {

            let previousTaskId = previousTask.id;
            currentTask.parentElement.removeChild(currentTask);
            previousTask.before(currentTask);

            if (taskIndex >= 0) {

                taskList.splice((taskIndex - 1), 2, parseInt(currentTaskId), parseInt(previousTaskId))
                sessionStorage.setItem("pendingList", JSON.stringify(taskList))

                pendingListReorder ()
            }
        }
    }))
    
    // move uma tarefa para baixo
    moveDownArrow.forEach(element => element.addEventListener("click", function (event) {
        let currentTaskId = event.target.parentElement.parentElement.id;
        const currentTask = document.getElementById(currentTaskId);
        const nextTask = currentTask.nextElementSibling;

    
        let taskList = Array.from(JSON.parse(sessionStorage.getItem("pendingList")));
        let taskIndex = taskList.indexOf(parseInt(currentTaskId));

        if (nextTask != null) {

            let nextTaskId = nextTask.id;
            currentTask.parentElement.removeChild(currentTask);
            nextTask.after(currentTask);

            if (taskIndex <= (taskList.length - 1)) {

                taskList.splice((taskIndex), 2, parseInt(nextTaskId), parseInt(currentTaskId))
                sessionStorage.setItem("pendingList", JSON.stringify(taskList))

                pendingListReorder ()
            }
        }

    }))

}

// abre o formulário de criação de tarefas
document.getElementById("task-add").addEventListener("click", function () {
    let addForm = document.createElement("div");
    addForm.id = "add-task-container";
    
    addForm.innerHTML = `
        <form id="add-task-form" class="form">
        <a href="javascript:void(0)" id="add-task-close">X</a>
        <textarea name="task-description" id="task-description-input" class="form-input" placeholder="O que precisa fazer?" maxlength="100" rows="4"></textarea>
        <label for="radio-input-container" id="radio-input-container-label">PRIORIDADE</label>
        <div class="radio-input-container" id="radio-input-container">
            <span>MIN</span>
            <span class="radio-group">
                <input type="radio" name="priority" id="radio-input-min" class="radio-input" value="1" checked="true">
                <label for="radio-input-min" class="radio-input-label"></label>
                <input type="radio" name="priority" id="radio-input-med" class="radio-input" value="2">
                <label for="radio-input-med" class="radio-input-label"></label>
                <input type="radio" name="priority" id="radio-input-max" class="radio-input" value="3">
                <label for="radio-input-max" class="radio-input-label"></label>
            </span>
            <span>MAX</span>
        </div>
        <button type="button" id="save-task" class="save-task">SALVAR</button>
        </form>
    `;

    document.body.appendChild(addForm);

    // fecha o formulário de criação de tarefas
    document.getElementById("add-task-close").addEventListener("click", function (event) {
        let formContainer = event.target.parentElement.parentElement;
        let body = formContainer.parentElement;
        body.removeChild(formContainer);
    })

    // altera o radio button ao clicar na label
    let rbLabels = Array.from(document.getElementsByClassName("radio-input-label"));
    rbLabels.forEach(element => {

        element.addEventListener("click", function () {

            rbLabels.forEach(element2 => {

                radio = element2.previousElementSibling;
                if (element2 == element) {
                    radio.setAttribute("checked", true);
                } else {
                    radio.setAttribute("checked", false);
                }
            })
        })
    });


    // listener - expandem o campo de descrição da tarefa ao se digitar
    document.getElementById("task-description-input").addEventListener("keydown", expandOnKeydown);
    document.getElementById("task-description-input").addEventListener("blur", expandOnBlur);

    // listener - adiciona tarefa
    document.getElementById("save-task").addEventListener("click", function (event) {
        event.preventDefault();
        taskAdd();
    });
})

function expandOnKeydown () {  
    let textArea = document.getElementById("task-description-input")
    let sHeight = textArea.scrollHeight;

    switch (sHeight) {
        case 43:
            textArea.style.height = "45px"
            break;
        case 60:
            textArea.style.height = "65px"
            break;
        case 80:
            textArea.style.height = "85px"
            break;
        case 100:
            textArea.style.height = "110px"
            break;
    }
}

function expandOnBlur () {  
    let textArea = document.getElementById("task-description-input")  
    textArea.style.height = "45px";
    let sHeight = textArea.scrollHeight;

    switch (sHeight) {
        case 43:
            textArea.style.height = "45px"
            break;
        case 63:
            textArea.style.height = "65px"
            break;
        case 80:
            textArea.style.height = "85px"
            break;
        case 100:
            textArea.style.height = "110px"
            break;
    
    }

}

function taskAdd () {
    // capturando a descrição
    let descriptionInput = document.getElementById("task-description-input").value

    // capturando a prioridade
    let rButtons = Array.from(document.getElementsByClassName("radio-input"));
    let priority = rButtons.filter(element => element.checked == true);
    
    let fetchBody = JSON.stringify({
        description : {
            content : descriptionInput,
            priority : priority[0].value,
            type : "task"
        },
        completed : false
    });

    fetch (`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
            "authorization" : sessionStorage.getItem("jwt"),
            "content-type" : "application/json"
        },
        body: fetchBody
    })
    .then ( (resolve) => resolve.json())
    .then (result => {

        let taskId = result.id;
        let array = Array.from(JSON.parse(sessionStorage.getItem("pendingList")))
        array.unshift(taskId);

        fetchBody = JSON.stringify({
            description : {
                content : array,
                priority : 0,
                type : "pendingList"
            }
        });

        fetch (`${baseUrl}/tasks/${parseInt((sessionStorage.getItem("pendingListId")))}`, {
            method: 'PUT',
            headers: {
                "authorization" : sessionStorage.getItem("jwt"),
                "content-type" : "application/json"
            },
            body: fetchBody
        })


        sessionStorage.setItem("pendingList", JSON.stringify(array))
        document.getElementById("add-task-container").remove()
        getTasks ();
    }

    )
    .catch (
    );
}

function taskElementCreation (id, description, priority, completed) {
    let pendingTaskList = document.getElementById("pending-list");
    let pendingTask = document.createElement("div");
    pendingTask.setAttribute("id",`${id}`);
    pendingTask.setAttribute("completed", `${completed}`);
    pendingTask.classList.add("pending-task")
    
    pendingTask.innerHTML = `
        <div class="task-move">
            <div class="move-up"></div>
            <div class="move-down"></div>
        </div>
        <p class="task-description priority-${priority}">${description}</p>
        <div class="task-actions">
            <span class="complete-button">&checkmark;</span>
            <span class="delete-button">X</span>
            <span class="edit-button">&#9998;</span>
        </div>     
    `;

    pendingTaskList.appendChild(pendingTask);  
}

function getTasks () {
    // fetch para buscar as tasks na API
    let fetchBody = {
        method: "GET",
        headers: {
            authorization: sessionStorage.getItem("jwt")
        }
    }
    
    fetch (`${baseUrl}/tasks`, fetchBody)
    .then (response => response.json())
    .then (result => {
        let pendingList = document.getElementById("pending-list")
        pendingList.innerHTML = ""

        let taskOrder = Array.from(JSON.parse(sessionStorage.getItem("pendingList")));
        let allTasks = Array.from(result);
        
        taskOrder.forEach(element => {
            let taskMatch = allTasks.filter(element2 => element2.id == element)

            if (taskMatch[0] != undefined && taskMatch[0] != null ) {

                let taskId = taskMatch[0].id;
                let taskDescription = JSON.parse(taskMatch[0].description);
                let taskContent = taskDescription.content;
                let taskPriority = taskDescription.priority;
                let taskCompleted = taskMatch[0].completed;
                let taskType = taskDescription.type;

                if (taskType == "task") {

                    taskElementCreation(taskId, taskContent, taskPriority, taskCompleted);
                    
                } else if  (taskType == "pendingList") {
                    sessionStorage.setItem("pendingListId", taskId)
                    sessionStorage.setItem("pendingList", JSON.parse(taskContent))
    
                } else if (taskType == "doneList") {
                    sessionStorage.setItem("doneListId", taskId)
                    sessionStorage.setItem("doneList", JSON.stringify(taskContent))
                }
            }
        })

        deleteButtonIteration ();
        taskMove ();

    })
    .catch();
}

function deleteButtonIteration () {
    let allDeleteButtonsHTML = Array.from(document.querySelectorAll(".delete-button"));
    allDeleteButtonsHTML.forEach(element => {
        element.addEventListener("click", event => deleteYesNo(event.target))
    })
}

function deleteYesNo (deleteButton) {
    let taskId = deleteButton.parentElement.parentElement.id
    let yesNoContainer = document.createElement("div");
    yesNoContainer.classList.add("darken-background");

    yesNoContainer.innerHTML = `
        <div id="yes-no-form">
            <p class="yes-no-msg">Tem certeza de que deseja excluir esta tarefa?</p>
            <div>
                <button id="no-button">Não</button>
                <button id="yes-button">Sim</button>
            </div>
        </div>    
    `;

    document.body.appendChild(yesNoContainer)

    deleteTask (taskId);

}

function deleteTask (taskId) {
    document.getElementById("yes-button").addEventListener("click", (event) => {

        let fetchBody = {
            method: "DELETE",
            headers: {
                authorization: sessionStorage.getItem("jwt")
            }
        }
        fetch (`${baseUrl}/tasks/${taskId}`, fetchBody)
        .then(response => response.json())
        .then(result => {
            let pendingList = JSON.parse(sessionStorage.getItem("pendingList"));
            let taskIndex = pendingList.indexOf(taskId);
            pendingList.splice(taskIndex, 1)
            newPendingList = Array.from(pendingList);

            sessionStorage.setItem("pendingList", `[${newPendingList}]`);

            // getTasks()
            pendingListReorder ()

            let formContainer = event.target.parentElement.parentElement.parentElement
            formContainer.remove();
        })
        .catch();

    });

    document.getElementById("no-button").addEventListener("click", event => {
        let formContainer = event.target.parentElement.parentElement.parentElement
        formContainer.remove();
        
    })

}

function pendingListReorder () {
    let pendingListId = parseInt(sessionStorage.getItem("pendingListId"));

    let fetchBody = JSON.stringify({
        description : {
            content : JSON.stringify(sessionStorage.getItem("pendingList")),
            priority : 0,
            type : "pendingList"
        }
    });

    fetch (`${baseUrl}/tasks/${pendingListId}`, {
        method: 'PUT',
        headers: {
            "authorization" : sessionStorage.getItem("jwt"),
            "content-type" : "application/json"
        },
        body: fetchBody
    })
}

getTasks ();
// pendingListReorder()
