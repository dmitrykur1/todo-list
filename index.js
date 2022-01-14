// import validators from "./validators";

const input = document.getElementById("input");
const output = document.getElementById("output");
const button = document.getElementById("button");

output.innerText = "empty";

const KEYBOARD_KEY__ENTER = "Enter";

let listOfTodo = [];

output.onclick = function (event) {
  const target = event.target;
  const index = target.dataset.index;
  console.log("> onRemove -> event", { index, bool: !!index });
  if (!!index && Number.isFinite(parseInt(index))) {
    listOfTodo.splice(index, 1);
    console.log("> onRemove -> listOfTodo", listOfTodo);
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

function addTodo() {
  const text = input.value;
  if (text.length > 0) {
    listOfTodo.push(text);
    renderTodoList(output, listOfTodo);
    renderUserNotification(text);
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
      <button data-index='${index}'>x</button>
      <span>${index + 1}. ${value}</span>
      <button data-index='${index}'>Edit</button>
    </div>`
  );
}

function isEventWithSpecialButtonPressed(e, buttonKey) {
  console.log("> onkeyup -> isEventWithSpecialButtonPressed", e, buttonKey);
  return e.key === buttonKey;
}

function renderUserNotification(todoItem) {
  console.log('> text = ${todoItem}');
}

function clearInput(input) {
  input.value = "";
}
