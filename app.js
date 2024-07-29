import render from "./render.js";
import store from "./store.js";
import { addTodo, deleteTodo, toggleCompleted } from "./store.js";

window.addEventListener("Todos Change", () => {
    render();
});

//trying to get from local storage
const storeFromLocalStorage = JSON.parse(localStorage.getItem("store"));
if (storeFromLocalStorage?.todos.length > 0) {
    store.todos = storeFromLocalStorage.todos;
} else {
    render();
}


//? todos is array :-> refference type



//Form Get

const form = document.querySelector("#form");
const todoTitleInput = document.querySelector(".todo-title-input");

form.addEventListener("submit", (e) => {
    e.preventDefault();//refresh hone se bchaaya ga
    
    const todoTitle = todoTitleInput.value;

    const newTodo = { id: crypto.randomUUID(), title: todoTitle, completed: false };
    addTodo(newTodo);
});

//delete
const todos = document.querySelector(".todos");

todos.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("delete-todo-button")) {

        // console.log("You clicked Cross button");
        const id = target.closest(".todo").dataset.id;
        deleteTodo(id);
    }
});

todos.addEventListener("change", (e) => {
    const target = e.target;
    if (target.classList.contains("todo-checkbox")) {
        const id = target.closest(".todo").dataset.id;
        const completed = target.checked;
        toggleCompleted(id, completed);

    }
})


