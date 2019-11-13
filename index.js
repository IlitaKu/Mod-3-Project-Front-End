
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
        

    function displayCategories(categories) {
        // const name = document.createElement('h4');
        // container is the whole main body.
        const categoriesCollection = document.querySelector('#categories_collection')
        categories.forEach(category => {
            const divFor1Category = document.createElement('div')
            divFor1Category.className = 'card'
            const divFormHolder = document.createElement('div')
            const h2tag = document.createElement('h2')
            h2tag.innerHTML = category.name
            const ulTag = document.createElement('ul')
            // ulTag.innerHTML = 'List of Tasks:'
            // const divForForm = document.createElement('div')
            // divForForm.classList = 'form-popup'
            // const formForTask = document.createElement('form')
            const submitButton = document.createElement('button')
            submitButton.classList.add('submit')
            submitButton.dataset.id = category.id
            submitButton.innerText = "New Task"
            // submitButton.addEventListener('click', submitNewTask)
            fetchTasksHtml(category.id)
                .then(tasksLi => {
                    tasksLi.forEach(task => {
                        const taskListElement = document.createElement('li')
                        taskListElement.innerHTML = `${task.title}`
                        const taskDescription = document.createElement('p')
                        taskDescription.innerHTML = `${task.description}`
                        taskListElement.append(taskDescription)
                        ulTag.append(taskListElement)
                        divFor1Category.append(h2tag, ulTag )
                        const formContainer = document.querySelector('.form-container')
                        divFormHolder.append(formContainer)
                        divFor1Category.append(divFormHolder)
                        categoriesCollection.append(divFor1Category)
                    })
                })
        })
    }

function displayCards(tasks, categoryId) {
    // debugger
    const filterredTaskList = tasks.filter(task => task.category_id === categoryId)
    return filterredTaskList;
}

function submitNewTask(e){
    
}



    // function createNewTask(newTask){
    //     const configObject = {
    //         method: 'POST', 
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify(
    //           newTask
    //         ) 
    //     }
    //         fetch(taskUrl,configObject)
    // }

//  const submit = document.querySelector('#js-task-list-form')
//  submit.addEventListener('submit', function(e){
//      e.preventDefault()
//      console.log(e.target.value)
//      const title = document.querySelector('.js-task-title-entry').value
//      const description = document.querySelector('.js-task-description-entry').value
//      const newTask = {
//          title,
//          description,
//          category_id : 1

//      }
//      createNewTask(newTask)
//  })

