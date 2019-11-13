
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
        // const name = document.createElement('h4');
        // container is the whole main body.
        const categoriesCollection = document.querySelector('#categories_collection')
        categories.forEach(category => {
            const divFor1Category = document.createElement('div')
                    const h2tag = document.createElement('h2')
                        h2tag.innerHTML = category.name
                    const ulTag = document.createElement('ul')
                        ulTag.innerHTML= 'List of Tasks:'
                    const submitButton = document.createElement('button')
                            submitButton.classList.add('submit')
                            submitButton.dataset.id = category.id
                            submitButton.innerText= "New Task"
            divFor1Category.append(h2tag, ulTag, submitButton)
            categoriesCollection.appendChild(divFor1Category)
            fetchTasksHtml(category.id)
                .then(taskslist => {
                    const listedTasks = document.createElement('li')
                    taskslist.forEach(task => {
                        listedTasks.innerText = task
                    })
                    
                    
                    debugger
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
    debugger
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


  // fetch tasks for category id
   // fetchTasksHtml(category.id) // 1
            //     .then(tasksLi => {
            //         // debugger
            //         // append tasks li to the category ul
            //         const categoryUl = document.createElement('ul');
            //         const tasklist = document.createElement('li')
            //         tasklist.innerHTML = tasksLi.join()
            //         categoryUl.append(tasksLi)
            //         // categoryUl.append(tasksLi);
            //         // debugger
            //         // div.append(name)
            //         // div.append(categoryUl)

            //         // container.append(div);
            //         divFor1Category.append(categoryUrl)
            // })
