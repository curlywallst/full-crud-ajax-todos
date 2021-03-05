window.addEventListener("DOMContentLoaded", () => {
  fetchTodos()
  document.querySelector('#new-todo').addEventListener('submit', addTodo)
})

function fetchTodos() {
  fetch('http://localhost:3000/todos')
  .then(resp => resp.json())
  .then(data => {
    const todosContainer = document.querySelector("#todos-container")
    todosContainer.innerHTML = renderAllTodos(data)
    addTodoListeners()
  })
}

function addTodoListeners() {
  let todos = document.querySelector('#todos-container')
  todos.addEventListener('click', deleteTodo)
  // todos.forEach((todo) => {
  //   todo.querySelector(".todo-delete-button").addEventListener('click', () => deleteTodo(todo))
  // })
}

function renderAllTodos(todosArray) {
  return todosArray.map(renderSingleTodo).join('')
}

function renderSingleTodo(todo) {
  return (`
  <div class="todo-card" id="${todo.id}">
    <div class="todo-frame">
      <h1 class="center-text">${todo.content}</h1>
      <button data-action="delete" class="todo-delete-button" id="${todo.id}">Delete</button><br>
    </div>
  </div>`)
}

function addTodo(event) {
  event.preventDefault()
  const todo = {
    content: document.querySelector("#content").value
  }
  fetch('http://localhost:3000/todos', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  .then(resp => resp.json())
  .then(data => {
    const todosContainer = document.querySelector("#todos-container")
    todosContainer.innerHTML += renderSingleTodo(data)
    addTodoListeners()
    document.querySelector("#content").value = ""
  })

}

function deleteTodo(event) {
  fetch(`http://localhost:3000/todos/${event.target.id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  const todoNode = event.target.parentElement.parentElement
  document.querySelector("#todos-container").removeChild(todoNode)
}



