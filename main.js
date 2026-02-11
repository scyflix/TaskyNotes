const taskEl = document.getElementById("task");
const timeEl = document.getElementById("taskTime");
const noteEl = document.getElementById("note");

const createdLogs = document.getElementById("createdLogs");

const logTaskBtn = document.getElementById("logTask");

logTaskBtn.addEventListener("click", () => {
  const taskValue = taskEl.value.trim();
  const timeValue = timeEl.value.trim();
  const noteValue = noteEl.value.trim();

  if(!taskValue || !timeValue || !noteValue) {
    alert("Input field must not be empty")
    return
  }
  const logData = {
    taskValue,
    timeValue,
    noteValue,
  };

  const loggedTaskContainer = document.createElement("div");
  loggedTaskContainer.classList.add("loggedTaskContainer");

  const taskDetails = document.createElement("details");
  const taskSummary = document.createElement("summary");

  taskSummary.textContent = taskValue;

  const taskTime = document.createElement("span");
  taskTime.textContent = timeValue;

  const taskNote = document.createElement("p");
  taskNote.textContent = noteValue;

  taskDetails.append(taskSummary, taskTime, taskNote);

  createdLogs.prepend(taskDetails);
});
