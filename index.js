// elements
const  inputElement = document.getElementById('input');
const  todosElement = document.getElementById('todos');
const  counterElement = document.getElementById('counter');
const  filterElement = document.getElementById('filter');
const  clearElement = document.getElementById('clear');

// implementation 
const saveTodos = () => {
    const list = [];
    for (const todo of  todosElement.querySelectorAll('.todo')) {
        list.unshift({
            done: todo.children[0].checked,
            text: todo.children[1].textContent,
        })
    }
    localStorage.setItem('todos', JSON.stringify(list));
}

const loadTodos = () => {
    // todosElement.innerHTML = '';
    const list = JSON.parse(localStorage.getItem('todos') || '');
    for (const {done, text} of list) {
        createTodo(text, done);
    };
}

const deleteToDo = (removeElement) => {
    const todoElement = removeElement.parentNode;
    todosElement.removeChild(todoElement);
    updateCounter();
    saveTodos();
};

const createTodo = (text, done = false) => {
    todosElement.insertAdjacentHTML(
        'afterbegin', 
        `<div class="todo">
            <input type="checkbox" class="todo--check" ${done ? 'checked' : ''} />
            <h4 class="todo--text">${event.target.value}</h4>
            <input type="checkbox" class="todo--remove"/>
        </div>`
    );
    updateCounter();
    saveTodos();
    return todosElement.childNodes[0];
}

const updateCounter = () => {
    const count = todosElement.querySelectorAll(' .todo:not(input:checked)  ').length;
    counterElement.textContent = `${count} item`;
    saveTodos();
};

updateCounter();
/*
const clearCompletede = () => {
   const elementsToRemoves = todosElement.querySelectorAll('input:checked');
    for (const elementToRemove of elementsToRemoves) { 
        todosElement.removeChild(elementToRemove);
    } 
    saveTodos();
};
clearCompletede();
*/
//events
loadTodos();

todosElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('todo--remove')) {
        deleteToDo(event.target);
    }
    updateCounter();
    saveTodos();
})

inputElement.addEventListener('keyup', (event) => {
    // event.key === 'Enter'
    if(event.key === 'Enter') {
        if (event.target.value !== '') {
            createTodo(event.target.value);
            event.target.value = '';
        }
    }
});

filterElement.addEventListener('click', (event) => {
    if (event.target.nodeName === 'input') {
        todosElement.dataset.filter = event.target.value  
    }

        
})

// clearElement.addEventListener('click', clearCompletede);






















/*
const addTodo = (parts, ...vars) => {
    const html = parts.reduce((result, parts, index) => {
        console.log(result, parts, index);
        return result + vars[index] + parts;
    })
    todosElement.insertAdjacentHTML('afterbegin', html);
    return todosElement.childNodes[0];
}

*/





