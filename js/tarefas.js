// window.addEventListener ("load", getUser);

// function getUser () {
//     let jwt = sessionStorage.getItem("jwt");
// };

// let pendingTasks = Array.from(document.querySelectorAll(".pending-task"))
// let pendingList = document.getElementById("pending-list")
// console.log(pendingList.children);






let moveUpArrow = Array.from(document.getElementsByClassName("move-up"))

moveUpArrow.forEach(element => element.addEventListener("click", function (event) {
    let currentTaskId = event.target.parentElement.parentElement.id
    const pendingList = document.getElementById("pending-list")
    console.log(pendingList);
    const currentTask = document.getElementById(currentTaskId)
    console.log(currentTask);
    const previousTask = currentTask.previousElementSibling
    console.log(previousTask);
    
    currentTask.parentElement.removeChild(currentTask)
    
    previousTask.before(currentTask)
}))



// console.log(getTask);