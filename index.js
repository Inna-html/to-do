// elements
const  inputElement = document.getElementById('input');
const  todosElement = document.getElementById('todos');
const  counterElement = document.getElementById('counter');
const  clearElement = document.getElementById('clear');
const  filterElement = document.getElementById('filter');

// implementation 
const deleteToDo = (removeElement) => {
    const todoElement = removeElement.parentNode;
    todosElement.removeChild(todoElement)
};

//events
todosElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('todo--remove')) {
        deleteToDo(event.target);
    }
})

inputElement.addEventListener('keyup', () => {
    // event.key === 'Enter'
    if(event.key === 'Enter') {
        if (event.target.value !== '') {
            todosElement.insertAdjacentHTML(
            'afterbegin', 
            `<div class="todo">
                <input type="checkbox" class="todo--check"/>
                <h4 class="todo--text">${event.target.value}</h4>
                <input type="checkbox" class="todo--remove"/>
            </div>`);
            event.target.value = '';
        }
    }
})




