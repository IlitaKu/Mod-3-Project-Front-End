const taskUrl = "http://localhost:3000/tasks/"
const categoriesUrl = "http://localhost:3000/categories"

function fetchTasksHtml(categoryId) {
  return fetch(taskUrl)
    .then(res => res.json())
    .then(tasks => displayCards(tasks, categoryId))
}

function createNewTask(newTask) {
  const configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newTask)
  }
  fetch(taskUrl, configObject)
}

fetch(categoriesUrl)
  .then(res => res.json())
  .then(data => displayCategories(data))

function displayCategories(categories) {
  // const name = document.createElement('h4')
  // container is the whole main body.
  const categoriesCollection = document.querySelector("#categories_collection")
  categories.forEach(category => {
    const divFor1Category = document.createElement("div")
    divFor1Category.className = "card"
    const h2tag = document.createElement("h2")
    h2tag.innerHTML = category.name
    const ulTag = document.createElement("ul")
    ulTag.id = `task-list${category.id}`
    // const divForForm = document.createElement('div')
    // divForForm.classList = 'form-popup'
    // const formForTask = document.createElement('form')
    const submitButton = document.createElement("button")
    submitButton.classList.add("submit")
    submitButton.dataset.id = category.id
    submitButton.innerText = "New Task"
    submitButton.addEventListener("click", submitNewTask)
    submitButton.dataset = category.id
    fetchTasksHtml(category.id).then(tasksLi => {
      tasksLi.forEach(task => {
        // get tasks and place in li
        const taskListElement = document.createElement("li")
        taskListElement.innerHTML = `${task.title}`
        const taskDescription = document.createElement("p")
        taskDescription.innerHTML = `${task.description}`
        taskListElement.append(taskDescription)

        // append to li to get semantic structure
        ulTag.append(taskListElement)
      })

      // create form
      const formContainer = document.createElement("form")
      formContainer.class = `task-list-form${category.id}`

      const inputTitleField = document.createElement("input")
      inputTitleField.className = `task-title-entry${category.id}`
      const inputDescriptionField = document.createElement("input")
      inputDescriptionField.className = `task-description-entry${category.id}`

      // const divFormHolder = document.createElement("div")
      formContainer.append(
        inputTitleField,
        inputDescriptionField,
        submitButton
      )
      divFor1Category.append(h2tag, ulTag, formContainer)
      categoriesCollection.append(divFor1Category)
    })
  })
}

function displayCards(tasks, categoryId) {
  // debugger
  const filterredTaskList = tasks.filter(
    task => task.category_id === categoryId
  )
  return filterredTaskList
}

// function submitNewTask(e) {}

// const submitNewTask = document.querySelector(".task-list-form")
function submitNewTask(e) {
  e.preventDefault()
  const categoryId = event.target.dataset.id
  const title = document.querySelector(`.task-title-entry${categoryId}`).value
  const description = document.querySelector(
    `.task-description-entry${categoryId}`
  ).value
  const newTask = {
    title,
    description,
    category_id: categoryId
  }
  console.log(newTask)
  createNewTask(newTask)
}



// //  const submit = document.querySelector('#js-task-list-form')
// //  submit.addEventListener('submit', function(e){
// //      e.preventDefault()
// //      console.log(e.target.value)
// //      const title = document.querySelector('.js-task-title-entry').value
// //      const description = document.querySelector('.js-task-description-entry').value
// //      const newTask = {
// //          title,
// //          description,
// //          category_id : 1

// //      }
// //      createNewTask(newTask)
// //  })

