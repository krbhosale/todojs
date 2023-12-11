const addItemPopupBtn = document.querySelector("#addItemPopupBtn");
const AddItemPopupWindow = document.querySelector("#AddItemPopup");
const BlurBg = document.querySelector("#BlurBg");
const ClosePopupBtn = document.querySelectorAll(".ClosePopup");
const TaskListNameInput = document.querySelector("#TaskListNameInput");
const AddNewTaskBtn = document.querySelector("#AddNewTaskBtn");

const AddSubTaskPopupWindow = document.querySelector("#AddSubTaskPopup");
const subTaskNameInput = document.querySelector("#subTaskNameInput");
const AddNewSubTaskBtn = document.querySelector("#AddNewSubTaskBtn");

const TaskCardContainer = document.getElementById("TaskCardContainer");


const AppLogoBox = document.querySelector(".AppLogo");
const SingleCardContainer = document.querySelector(".SingleCardContainer");
const ClickedCardHeading = document.querySelector("#ClickedCardHeading");
const BackButton = document.querySelector("#BackButton");
const addPopupbtnText = document.querySelector(".addPopupbtnText");
let currentClickdCard;

let TaskCardCount = 0;
let currentSubCardContainer;

ClosePopupBtn.forEach((CloseButton) => {
    CloseButton.addEventListener('click', (e) => {
        let ParentPopup = (e.target.parentNode).parentNode;
        ParentPopup.classList.remove("ActivePopup");
        ParentPopup.classList.add("UnactivePopup");
        BlurBg.style.display = "none";
        TaskListNameInput.classList.remove("ErrorNotice");
        TaskListNameInput.value = "";
        subTaskNameInput.value = "";
    })
})

addItemPopupBtn.addEventListener('click', (e) => {
    AddItemPopupWindow.classList.remove("UnactivePopup");
    AddItemPopupWindow.classList.add("ActivePopup");
    BlurBg.style.display = "block";
    TaskListNameInput.focus();
})

function ShowHIdeDefaultMessage() {
    const DefaultText = document.getElementById("DefaultText");
    if (TaskCardCount === 0) {
        DefaultText.style.display = "block"
    } else {
        DefaultText.style.display = "none"
    }
}

function HideSingleCardContainer() {
    if (currentClickdCard) {
        SingleCardContainer.classList.add("UnactivePopup");
        currentClickdCard.classList.remove("SingleCardShow");
        AppLogoBox.classList.remove("UnactivePopup");
        BackButton.classList.add("UnactivePopup");
        addPopupbtnText.classList.remove("UnactivePopup");
    }

}

function createTaskCardList(TaskName) {
    ShowHIdeDefaultMessage();
    
    let divTaskCard = document.createElement("div");
    let h2TaskHeading = document.createElement('h2');
    let divSubTaskContainer = document.createElement("div");
    let divButtonContainer = document.createElement("div");
    let iDeleteTaskCardButton = document.createElement("i");
    let iAddSubTaskPopupBtn = document.createElement("i");

    divTaskCard.classList.add("TaskCard");
    h2TaskHeading.classList.add("TaskHeading");
    divSubTaskContainer.classList.add("SubTaskContainer");
    divButtonContainer.classList.add("ButtonContainer");
    iDeleteTaskCardButton.classList.add("fa-solid", "fa-trash", "deleteTaskCardBtn", "cardCommonBtn");
    iAddSubTaskPopupBtn.classList.add("fa-solid", "fa-circle-plus", "AddSubTaskPopupBtn", "cardCommonBtn")

    h2TaskHeading.innerText = TaskName;

    iDeleteTaskCardButton.addEventListener("click", (e) => {
        
        let Parent = (e.target.parentNode).parentNode;
        Parent.classList.add("DeletedCard");
        ClickedCardHeading.innerText = "";
        setTimeout(() => {
            Parent.remove();
            HideSingleCardContainer();
        }, 1200);
        
        TaskCardCount--;
        ShowHIdeDefaultMessage();

    })

    iAddSubTaskPopupBtn.addEventListener("click", (e) => {
        currentSubCardContainer = (e.target.parentNode).previousSibling;
        AddSubTaskPopupWindow.classList.remove("UnactivePopup");
        AddSubTaskPopupWindow.classList.add("ActivePopup");
        BlurBg.style.display = "block";
        subTaskNameInput.focus();
    })

    h2TaskHeading.addEventListener("click", (e) => {
        ClickedCardHeading.innerText = e.target.innerText;
        currentClickdCard = e.currentTarget.parentNode;
        currentClickdCard.classList.add("SingleCardShow");
        SingleCardContainer.classList.remove("UnactivePopup")
        AppLogoBox.classList.add("UnactivePopup");
        BackButton.classList.remove("UnactivePopup");
        addPopupbtnText.classList.add("UnactivePopup");
    })

    divTaskCard.appendChild(h2TaskHeading);
    divTaskCard.appendChild(divSubTaskContainer);
    divButtonContainer.appendChild(iDeleteTaskCardButton);
    divButtonContainer.appendChild(iAddSubTaskPopupBtn);
    divTaskCard.appendChild(divButtonContainer);

    TaskCardContainer.appendChild(divTaskCard);
}

AddNewTaskBtn.addEventListener('click', (e) => {
    if (TaskListNameInput.value == "") {
        TaskListNameInput.classList.add("ErrorNotice");
        TaskListNameInput.focus();
    } else {
        TaskCardCount++;
        let TaskName = TaskListNameInput.value;
        TaskListNameInput.classList.remove("ErrorNotice");
        createTaskCardList(TaskName);
        HideSingleCardContainer();
        AddItemPopupWindow.classList.remove("ActivePopup");
        AddItemPopupWindow.classList.add("UnactivePopup");
        BlurBg.style.display = "none";
        TaskListNameInput.value = "";
        TaskListNameInput.focus();

    }

})



function createSubTaskList(SubTaskName) {
    let psubTask = document.createElement("p");
    let sSubTaskMarkDoneBtn = document.createElement("span");

    psubTask.classList.add("subTask")
    sSubTaskMarkDoneBtn.classList.add("subTaskMarkDoneBtn")

    sSubTaskMarkDoneBtn.innerText = "MARK DONE";
    psubTask.innerText = SubTaskName;

    sSubTaskMarkDoneBtn.addEventListener("click", (e) => {
        let parentSubTask = (e.target.parentNode);
        parentSubTask.classList.add("subTaskCompleted");
    })


    psubTask.appendChild(sSubTaskMarkDoneBtn);

    currentSubCardContainer.appendChild(psubTask);

}

AddNewSubTaskBtn.addEventListener('click', (e) => {
    if (subTaskNameInput.value == "") {
        subTaskNameInput.classList.add("ErrorNotice");
        subTaskNameInput.focus();
    } else {
        let subTaskName = subTaskNameInput.value;
        subTaskNameInput.classList.remove("ErrorNotice");
        createSubTaskList(subTaskName);

        AddSubTaskPopupWindow.classList.remove("ActivePopup");
        AddSubTaskPopupWindow.classList.add("UnactivePopup");
        BlurBg.style.display = "none";
        subTaskNameInput.value = "";
        subTaskNameInput.focus();

    }

})


BackButton.addEventListener('click', (e) => {
    HideSingleCardContainer();
})