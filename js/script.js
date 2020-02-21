let addMessage = document.querySelector('.input_add');
let addNew = document.querySelector('.add_new');
let todo = document.querySelector('.todo');

let todoList = [];


// Работа с локальным хранилищем
if (localStorage.getItem('todolist')) {
    todoList = JSON.parse(localStorage.getItem('todolist'));
    createTask();
};
// Обработчик для создания новой задачи
addNew.addEventListener('click', function () {

    let newTodo = {
        task: addMessage.value,
        checked: false,
        important: false
    };

    if (addMessage.value === '') {

        return (addMessage.value)

    } else {

        todoList.push(newTodo);
        addMessage.value = '';
        createTask();
        localStorage.setItem('todolist', JSON.stringify(todoList));
    };

});

// Обработчик проверки выполненной задачи
todo.addEventListener('change', function (event) {
    let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;

    todoList.forEach(function (item) {
        if (item.task === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todolist', JSON.stringify(todoList));
        };
    });
});
// Функция создания задачи
function createTask() {

    let displayTask = '';
    if (todoList.length === 0) {
        todo.innerHTML = ""
    }
    todoList.forEach(function (item, i) {
        displayTask += `
        <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.task}</label>
        </li>
        `;
        todo.innerHTML = displayTask;

    });

};
// Удаление задач
todo.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    todoList.forEach(function(item,i){
        if (item.task === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(i,1);
            }else{
                item.important = !item.important;
            }
            createTask();
            localStorage.setItem('todolist', JSON.stringify(todoList));
            
        }
    });
});
