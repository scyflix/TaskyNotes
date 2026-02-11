const taskEl = document.getElementById("task");
const timeEl = document.getElementById("taskTime");
const noteEl = document.getElementById("note");

const createdLogs = document.getElementById("createdLogs");
const logTaskBtn = document.getElementById("logTask");

function formatDateTime(isoString) {
  const date = new Date(isoString);

  return date.toLocaleString("en-US", {
    month: "long", // February
    day: "numeric", // 11
    year: "numeric", // 2026
    hour: "2-digit", // 12
    minute: "2-digit", // 27
  });
}

function checkIfEmpty() {
    if (!savedLogDetails.length === 0) {
      createdLogs.innerHTML = `<p class="placeholderText">No task logged yet. Add one using the form next to this panel.</p>`;
    }
}
document.addEventListener("change", () => {
  checkIfEmpty()
})
const savedLogDetails = JSON.parse(localStorage.getItem("logDetails")) || []

checkIfEmpty();
savedLogDetails.forEach((log) => {

  const taskDetails = document.createElement("details");
  taskDetails.classList.add("taskContainer");
  
  const taskSummary = document.createElement("summary");
  taskSummary.title = "click to see details"
  taskSummary.innerHTML = `${log.taskValue} <button data-title="delete Task" type="button" class="deleteBtn tooltip"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="3 6 5 6 21 6" />
  <path d="M19 6l-1 14H6L5 6" />
  <path d="M10 11v6" />
  <path d="M14 11v6" />
  <path d="M9 6V4h6v2" />
</svg>
</button>`;

  const taskTime = document.createElement("span");
taskTime.textContent = formatDateTime(log.timeValue);

  const taskNote = document.createElement("p");
  taskNote.textContent = log.noteValue;

  taskDetails.append(taskSummary, taskTime, taskNote);

  createdLogs.append(taskDetails);

  requestAnimationFrame(() => {
    taskDetails.classList.add("show");
  });

  deleteTask();
})


//When log task button is clicked to create new log
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
  
  savedLogDetails.unshift(logData);
  
  localStorage.setItem("logDetails", JSON.stringify(savedLogDetails));

  const taskDetails = document.createElement("details");
taskDetails.classList.add("taskContainer")

  const taskSummary = document.createElement("summary");
  taskSummary.innerHTML = `${logData.taskValue} <button data-title="delete Task" type="button" class="deleteBtn tooltip"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="3 6 5 6 21 6" />
  <path d="M19 6l-1 14H6L5 6" />
  <path d="M10 11v6" />
  <path d="M14 11v6" />
  <path d="M9 6V4h6v2" />
</svg>
</button>`;

  const taskTime = document.createElement("span");
taskTime.textContent = formatDateTime(logData.timeValue);

  const taskNote = document.createElement("p");
  taskNote.textContent = logData.noteValue;

  taskDetails.append(taskSummary, taskTime, taskNote);
  createdLogs.prepend(taskDetails);

  requestAnimationFrame(() => {
    taskDetails.classList.add("show");
  });


deleteTask()

  taskEl.value = ""
  timeEl.value = ""
  noteEl.value = ""
  panelToggle();
});


//Delete a log
function deleteTask() {
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((btn) => {
    btn.onclick = () => {
      const confirmDelete = confirm("Delete this task log?");
      if (!confirmDelete) return;

      const logToDelete = btn.closest(".taskContainer");

      const index = [...createdLogs.children].indexOf(logToDelete);
      savedLogDetails.splice(index, 1);
      localStorage.setItem("logDetails", JSON.stringify(savedLogDetails));

      // Add animation class
      logToDelete.classList.add("removing");

      // Remove after animation ends
      setTimeout(() => {
        logToDelete.remove();
      }, 250); // matches CSS transition time
    };
    //check if task log conatiner is empty
checkIfEmpty();
  })
}



const toggleInputContainer = document.getElementById("toggleInputContainer");
const inputContainer = document.querySelector(".inputContainer");

toggleInputContainer.addEventListener("click", () => {
  toggleInputContainer.textContent =
    toggleInputContainer.textContent === "Close Input Panel"
      ? "Open Input Panel"
      : "Close Input Panel";
  inputContainer.classList.toggle("expand");
  toggleInputContainer.classList.toggle("panelClosed");
});

function panelToggle() {
  toggleInputContainer.textContent =
         toggleInputContainer.textContent === "Close Input Panel"
           ? "Open Input Panel"
           : "Close Input Panel";
       inputContainer.classList.toggle("expand");
       toggleInputContainer.classList.toggle("panelClosed");
      }

      //Textarea autoexpand
      const textarea = document.querySelector("#note");
      textarea.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      });