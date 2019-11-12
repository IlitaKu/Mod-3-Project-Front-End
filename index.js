document.addEventListener('DOMContentLoaded', () => {
    console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

const userUrl = "http://localhost:3000/users"
const taskUrl = "http://localhost:3000/tasks/"
const categoriesUrl = "http://localhost:3000/categories"


    function fetchTasksHtml(categoryId) {
        return fetch(taskUrl)
            .then(res => res.json())
            .then(tasks => displayCards(tasks, categoryId))
    }



    fetch(categoriesUrl)
        .then(res => res.json())
        .then(data => displayCategories(data))

    function displayCategories(categories){
        const container = document.querySelector('.container')
        categories.forEach(category => {
            // create ul for each category id
            const categoryUl = document.createElement('ul');
            const name = document.createElement('h4');
            const div = document.createElement('div')
            name.innerHTML  = `${category.name}`
            // fetch tasks for category id
            fetchTasksHtml(category.id) // 1
                .then(tasksLi => {
                    // append tasks li to the category ul
                    categoryUl.append(tasksLi);
                    div.append(name)
                    div.append(categoryUl)
                    
                    container.append(div);
            })
        })
    }

function createNewTask(newTask){
    const configObject = {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(
          newTask
        ) 
    }
        fetch(taskUrl,configObject)
}

function displayCards(tasks, categoryId){
    const filterredTaskList = tasks.filter(task => task.category_id === categoryId)
    const list = document.createElement('li')
    const appendedList = filterredTaskList.map(item => (list.innerHTML = `${item.title}`))
    // const container = document.querySelector('.container')
    console.log(appendedList)
    return appendedList;
}

 const submit = document.querySelector('#js-task-list-form')
 submit.addEventListener('submit', function(e){
     e.preventDefault()
     console.log(e.target.value)
     const title = document.querySelector('.js-task-title-entry').value
     const description = document.querySelector('.js-task-description-entry').value
     const newTask = {
         title,
         description,
         category_id : 1

     }
     createNewTask(newTask)
 })
})
