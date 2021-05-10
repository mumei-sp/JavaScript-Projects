const input = document.querySelector("input");
const submit = document.querySelector("#submit");
const todos = document.querySelector("ul");
const filter = document.querySelector("#filter");

submit.addEventListener("click", addTodoToUl);
todos.addEventListener("click", compDel);
filter.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

function addTodoToUl(e) {
  e.preventDefault();
  const div = document.createElement("div");
  const todo = document.createElement("li");
  todo.innerText = input.value;
  sendToLocalStorage(input.value);
  const check = document.createElement("button");
  check.classList.add("comp");
  check.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`;
  const del = document.createElement("button");
  del.classList.add("delete");
  del.classList.add("delete");
  del.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
  div.appendChild(todo);
  div.appendChild(check);
  div.appendChild(del);
  todos.appendChild(div);
  input.value = "";
}

function compDel(e) {
  if (e.target.classList[0] == "comp") {
    const parent = e.target.parentElement;
    parent.classList.toggle("done");
  }
  if (e.target.classList[0] == "delete") {
    const parent = e.target.parentElement;
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach(function (todo, index) {
      if (todo === parent.childNodes[0].innerText) {
        todos.splice(index, 1);
      }
      localStorage.setItem("todos", JSON.stringify(todos));
    });
    parent.classList.add("fall");
    parent.addEventListener("transitionend", function () {
      parent.remove();
    });
  }
}

function filterTodo(e) {
  todo_list = todos.childNodes;
  for (todo of todo_list) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (!todo.classList.contains("done")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("done")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  }
}

function sendToLocalStorage(input) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(input);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  if (localStorage.getItem("todos") != null) {
    const todo_list = JSON.parse(localStorage.getItem("todos"));
    for (item of todo_list) {
      const div = document.createElement("div");
      const todo = document.createElement("li");
      todo.innerText = item;
      const check = document.createElement("button");
      check.classList.add("comp");
      check.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`;
      const del = document.createElement("button");
      del.classList.add("delete");
      del.classList.add("delete");
      del.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
      div.appendChild(todo);
      div.appendChild(check);
      div.appendChild(del);
      todos.appendChild(div);
    }
  }
}
