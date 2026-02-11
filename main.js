const taskEl = document.getElementById("task");
const timeEl = document.getElementById("taskTime");
const noteEl = document.getElementById("note");

const createdLogs = document.getElementById("createdLogs");
const logTaskBtn = document.getElementById("logTask");

const savedLogDetails = JSON.parse(localStorage.getItem("logDetails")) || []

savedLogDetails.forEach((log) => {

  const taskDetails = document.createElement("details");
  const taskSummary = document.createElement("summary");
  
  taskSummary.textContent = log.taskValue;

  const taskTime = document.createElement("span");
  taskTime.textContent = log.timeValue;

  const taskNote = document.createElement("p");
  taskNote.textContent = log.noteValue;

  taskDetails.append(taskSummary, taskTime, taskNote);

  createdLogs.prepend(taskDetails);
})
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
  
  savedLogDetails.push(logData);
  
  localStorage.setItem("logDetails", JSON.stringify(savedLogDetails));

  const taskDetails = document.createElement("details");

  const taskSummary = document.createElement("summary");
  taskSummary.textContent = logData.taskValue;

  const taskTime = document.createElement("span");
  taskTime.textContent = logData.timeValue;

  const taskNote = document.createElement("p");
  taskNote.textContent = logData.noteValue;

  taskDetails.append(taskSummary, taskTime, taskNote);
  createdLogs.prepend(taskDetails);

  taskEl.value = ""
  timeEl.value = ""
  noteEl.value = ""
});