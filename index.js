let todoList = [];
loadItems();

function addTask(){
    let inputElement = document.querySelector('#todo-input');
    let inputDateElement = document.querySelector('#todo-date');
    let todoItem = inputElement.value;
    let todoDate = inputDateElement.value.split('-').reverse().join('-');   //Accepting date and correcting the format (dd-mm-yyyy)
    if(todoItem === '' || todoDate===''){
        showPopup();
        return;
    }
    todoList.push({item: todoItem, dueDate: todoDate});             //Add task to array
    console.log(todoDate);
    console.log(todoList);
    inputElement.value = '';    //Automatically clearing the text box after clicking Add button
    inputDateElement.value = '';
    localStorage.setItem('todo-list', JSON.stringify(todoList));    //Save the item to storage
}

function loadItems(){
    todoList = JSON.parse(localStorage.getItem('todo-list')) || [];
    if(todoList.length===0)    return;     //Stop if array is empty
    displayItems();
}

function displayItems(){
    let taskListHtml = '';
    for(let i=0; i<todoList.length; i++){
        taskListHtml += `
            <span>${(todoList[i]).item}</span>
            <span style="text-align: center">${(todoList[i]).dueDate}</span>
            <button class='btn-delete' 
            onclick="todoList.splice(${i}, 1);
            localStorage.setItem('todo-list', JSON.stringify(todoList));
            displayItems();    //Rerender entire list to correct i(th) ordering
            ">Delete</button>
        `;
    }
    document.querySelector('#display-canvas').innerHTML = taskListHtml;
    localStorage.setItem('todo-list', JSON.stringify(todoList));
}

function showPopup(){
    document.querySelector(".pop-up").classList.add("pop-show");
    setTimeout(()=>{document.querySelector(".pop-up").classList.remove("pop-show");},2000);
}