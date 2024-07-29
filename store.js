const store = {
    todos: [
        {
            id: "1",
            title: "Complete Task A",
            completed: false,
        },
        {
            id: "2",
            title: "Read Book",
            completed: true,
        },

    ],

};

//agar user kuch change kar rha hai toh hamme pata chalna chaiyeee
//ham store se baat nhi karrge proxy se kare ge
//aur proxy sirf object pe chalti hai

//PROXIES

const storeHandler =
{   //target:-> store hai aur property:-> jo bhi chaiye
    get(target, property) {
        // console.log("You are trying to get Property", property);
        // console.log(target[property])
        return target[property];
    },

    set(target, property, value) {

        target[property] = value;

        if (property == "todos") {
            window.dispatchEvent(new Event("Todos Change"));
        }
        localStorage.setItem("store", JSON.stringify(store));
        return true;
    }
};


const storeProxy = new Proxy(store, storeHandler);

//!ADDING A NEW TODO
function addTodo(newTodo) {
    storeProxy.todos = [...storeProxy.todos, newTodo];//spread operator used bcz we have to create new array and then add new todo
}

//!Deleting A TODO
function deleteTodo(id) {
    storeProxy.todos = storeProxy.todos.filter(todo => todo.id !== id);
}

//!Marking a todo as completed
function toggleCompleted(id, completed) {
    storeProxy.todos = storeProxy.todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: completed }
        }
        else {
            return todo;
        }
    })
}
export { addTodo };
export { deleteTodo };
export { toggleCompleted };

export default storeProxy;

