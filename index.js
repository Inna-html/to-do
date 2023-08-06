// elements  ==============================================================================================
const  inputElement = document.getElementById('input');
const  todosElement = document.getElementById('todos');
const  counterElement = document.getElementById('counter');
const  filterElement = document.getElementById('filter');
const  clearElement = document.getElementById('clear');

const subBtn = document.querySelector('.sub_btn');

// implementation  ===========================================================================================
const saveTodos = () => {
    const list = [];
    for (const todo of  todosElement.querySelectorAll('.todo')) {
        list.unshift({
            done: todo.children[0].checked,
            text: todo.children[1].textContent,
        });
    }
    localStorage.setItem('todos', JSON.stringify(list));
}

const loadTodos = () => {
    todosElement.innerHTML = '';
    const list = JSON.parse(localStorage.getItem('todos') || '');
    for (const {done, text} of list) {
        createTodo(text, done);
    }
};

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
            <h4 class="todo--text">${text}</h4>
            <input type="checkbox" class="todo--remove"/>
        </div>`
    );  //     ${event.target.value} вместо ${text}
    updateCounter();
    saveTodos();
    return todosElement.childNodes[0];
};

const updateCounter = () => {
    const count = todosElement.querySelectorAll('.todo:not(:has(input:checked)').length;
    counterElement.textContent = `${count} item left`; 
};                             

updateCounter();

const clearCompleted = () => {
   const elementsToRemove = todosElement.querySelectorAll('.todo:has(input:checked)');
    for(let el of elementsToRemove) {
        todosElement.removeChild(el);
    } 
    saveTodos();
};

loadTodos();

//events   ====================================================================================================

todosElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('todo--remove')) {
        deleteToDo(event.target);
    }
    updateCounter();
    saveTodos();
})

inputElement.addEventListener('keyup', (event) => {
    event.key === 'Enter'
    if(event.key === 'Enter') {
        if (event.target.value !== '') {
            createTodo(event.target.value);
            event.target.value = '';
        }
    }
});

filterElement.addEventListener('change', (event) => {
    todosElement.dataset.filter = event.target.value;
  });

clearElement.addEventListener('click', clearCompleted); 

/* ============ counter of input ============================================================================ */ 

const txtItem = document.querySelector ('.textarea__item');
const txtItemLimit = txtItem.getAttribute('maxlength');
const txtCounter = document.querySelector ('.textarea__counter span');
txtCounter.innerHTML = txtItemLimit;

txtItem.addEventListener('input', txtSetCounter);
txtItem.addEventListener('click', txtSetCounter);


function txtSetCounter() {
	const txtCounterResult = txtItemLimit - txtItem.value.length;
	txtCounter.innerHTML = txtCounterResult;

    txtItem.addEventListener('keyup', (event) => {
        event.key === 'Enter'
        if(event.key === 'Enter') {
            txtCounter.innerHTML = txtItemLimit;
        }
        })

    subBtn.addEventListener('click', (event) => {
        event.target === subBtn
        if (event.target === subBtn) {
            txtCounter.innerHTML = txtItemLimit;
            }
        })
}

// ########### mobile version ################################################################################### */

subBtn.addEventListener("click", (e) => {
    e.target === subBtn 
        if (e.target === subBtn) {
            if (inputElement.value !== '') {
                createTodo(inputElement.value);
                inputElement.value = '';
            }
        }
    });

