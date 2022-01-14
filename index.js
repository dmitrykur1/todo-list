// import validators from "./validators";

const input = document.getElementById("input");
const output = document.getElementById("output");
const button = document.getElementById("button");
const notification = document.getElementById("notification");

output.innerText = "empty";

const KEYBOARD_KEY__ENTER = "Enter";

let listOfTodo = [];

let removedTodo;
let timeout;

output.onclick = function (event) {
  const target = event.target;
  const index = target.dataset.index;
  const role = target.dataset.role;
  console.log("> onRemove -> event", { index, bool: !!index });
  if (!!index && Number.isFinite(parseInt(index)) && role == 'delete') {
    if (!confirm('подтвердите удаление')) {
      return;
    }
    removedTodo = listOfTodo.splice(index, 1);
    console.log("> onRemove -> listOfTodo", listOfTodo);
    renderTodoList(output, listOfTodo);
    renderUserNotification(index, 10);
  }
};

input.onkeyup = function (keyboardEvent) {
  // console.log("> onkeyup -> event", keyboardEvent);
  console.log("> onkeyup -> input", input.value);
  if (isEventWithSpecialButtonPressed(keyboardEvent, KEYBOARD_KEY__ENTER)) {
    addTodo();
  }
};

button.onclick = addTodo;

notification.onclick = function (event) {
  const target = event.target;
  const index = target.dataset.index;
  console.log(target, index)
  if (!!index && Number.isFinite(parseInt(index))) {
    clearTimeout(timeout);
    listOfTodo.splice(index, 0, removedTodo);
    removedTodo = '';
    notification.innerHTML = '';
    renderTodoList(output, listOfTodo);
  }
}

function addTodo() {
  const text = input.value;
  if (text.length > 0) {
    listOfTodo.push(text);
    renderTodoList(output, listOfTodo);
  } else {
    alert(
      "Sorry the length of the text does not conform with required length"
    );
  }
  clearInput(input);
}

function renderTodoList(output, list) {
  output.innerHTML = list
    .map((value, index) => {
      console.log("> listOfTodo -> map", index, value);
      // return index + ". " + value + "\n";
      return renderTodoItem(index, value);
    })
    .join("");
}

function renderTodoItem(index, value) {
  return(
    `<div id='todo_${index}'>
      <input type='checkbox' />
      <button data-index='${index}' data-role='delete'>x</button>
      <span>${index + 1}. ${value}</span>
      <button data-index='${index}'>Edit</button>
    </div>`
  );
}

function isEventWithSpecialButtonPressed(e, buttonKey) {
  console.log("> onkeyup -> isEventWithSpecialButtonPressed", e, buttonKey);
  return e.key === buttonKey;
}

function renderUserNotification(index, countdown) {
  clearTimeout(timeout);
  if (countdown <= 0) {
    notification.innerHTML = '';
    removedTodo = '';
    return;
  }
  notification.innerHTML = `Хотите отменить удаление кликните - <button type="button" data-index=${index}>Undo</button>, ${countdown}`;
  timeout = setTimeout(() => renderUserNotification(index, countdown - 1), 1000);
}

function clearInput(input) {
  input.value = "";
}
