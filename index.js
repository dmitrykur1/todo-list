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
    removedTodo = listOfTodo.splice(index, 1)[0];
    console.log("> onRemove -> listOfTodo", listOfTodo);
    renderUserNotification(index, 10);
    renderTodoList(output, listOfTodo);
  } else if (role == 'edit') {
    const text = prompt();
    if (text.length > 1) {
      listOfTodo[index].text = text;
      renderTodoList(output, listOfTodo);
    } else {
      alert(
        "Sorry the length of the text does not conform with required length"
      );
    }
  } else if (role == 'complete') {
    const completed = listOfTodo[index].completed;
    if (completed) {
      listOfTodo[index].completed = false;
    } else {
      listOfTodo[index].completed = true;
      listOfTodo[index].date = new Date();
    }
    renderTodoList(output, listOfTodo);
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
  if (!!index && Number.isFinite(parseInt(index))) {
    clearTimeout(timeout);
    console.log(removedTodo)
    listOfTodo.splice(index, 0, removedTodo);
    removedTodo = null;
    notification.innerHTML = '';
    renderTodoList(output, listOfTodo);
  }
}

function addTodo() {
  const text = input.value;
  if (text.length > 1) {
    const todo = {
      text: text,
      completed: false
    }
    listOfTodo.push(todo);
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
  console.log(value)
  if (value.completed) {
    return(
      `<div id='todo_${index}' style="color: grey;">
        <input data-index='${index}' type='checkbox' data-role='complete' checked/>
        <button data-index='${index}' data-role='delete'>x</button>
        <span>${index + 1}. ${value.text}</span>
        ${value.date.toLocaleString('ru-RU').slice(0, -3)}
      </div>`
    );
  } else {
    return(
      `<div id='todo_${index}'>
        <input data-index='${index}' type='checkbox' data-role='complete'/>
        <button data-index='${index}' data-role='delete'>x</button>
        <span>${index + 1}. ${value.text}</span>
        <button data-index='${index}' data-role='edit'>Edit</button>
      </div>`
    )
  }

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
