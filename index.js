const taskUrl = "http://localhost:3000/tasks/";
const categoriesUrl = "http://localhost:3000/categories/";

//api calls

fetch(categoriesUrl)
  .then(res => res.json())
  .then(data => displayCategories(data));

function fetchTasksHtml(categoryId) {
  return fetch(taskUrl)
    .then(res => res.json())
    .then(tasks => filterTaskForCategories(tasks, categoryId));
}

function createNewTask(newTask) {
  const configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newTask)
  };
  return fetch(taskUrl, configObject);
}

function deleteTask(taskId) {
  return fetch(`${taskUrl}${taskId}`, { method: "DELETE" });
}

// HTML Builders

function createDeleteButton(taskId, parentLiElement) {
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete task";
  deleteButton.dataset.id = taskId;
  deleteButton.className = "redButton";
  deleteButton.id = "title-comment";
  deleteButton.addEventListener("click", removeTask);
  // append with task
  parentLiElement.appendChild(deleteButton);
}

function createAddTaskButton(categoryId, parentFormElement) {
  const submitButton = document.createElement("button");
  submitButton.classList.add("submit");
  submitButton.dataset.id = categoryId;
  submitButton.innerText = "New Task ✎";
  submitButton.addEventListener("click", submitNewTask);
  submitButton.dataset = categoryId;
  // append with form
  parentFormElement.append(submitButton);
}

function createTitleField(categoryId, parentFormContainer) {
  const inputTitleField = document.createElement("input");
  inputTitleField.className = `task-title-entry${categoryId}`;
  inputTitleField.placeholder = "title";
  // append with form
  parentFormContainer.append(inputTitleField);
}

function createDescriptionField(categoryId, parentFormContainer) {
  const inputDescriptionField = document.createElement("input");
  inputDescriptionField.className = `task-description-entry${categoryId}`;
  inputDescriptionField.placeholder = "description";
  // append with form
  parentFormContainer.append(inputDescriptionField);
}

function wrapTaskLi(task, ulTag) {
  // place tasks in li
  const taskListElement = document.createElement("li");
  taskListElement.dataset.id = task.id;
  const taskTitle = document.createElement("h5");
  taskTitle.innerHTML = task.title;
  const taskDescription = document.createElement("div");
  taskDescription.innerHTML = task.description;
  taskListElement.append(taskTitle, taskDescription);
  // add delete button to each task
  createDeleteButton(task.id, taskListElement);

  // append to li to get semantic structure
  ulTag.append(taskListElement);
}

function wrapTasksInHTML(tasksLi, categoryId, parentDiv) {
  const ulTag = document.createElement("ul");
  ulTag.id = `task-list${categoryId}`;

  tasksLi.forEach(task => {
    wrapTaskLi(task, ulTag);
  });

  parentDiv.append(ulTag);
}

// Helper Functions

function filterTaskForCategories(tasks, categoryId) {
  const filteredTaskList = tasks.filter(
    task => task.category_id === categoryId
  );
  return filteredTaskList;
}

function getTasksAndAttachToCategory(
  categoryId,
  parentDivForCategory,
  parentCategoriesCollection
) {
  fetchTasksHtml(categoryId).then(tasksLi => {
    wrapTasksInHTML(tasksLi, categoryId, parentDivForCategory);

    // create form
    const formContainer = document.createElement("form");
    formContainer.id = `task-list-form`;
    formContainer.class = `task-list-form${categoryId}`;

    // dynamically create elements
    createTitleField(categoryId, formContainer);
    createDescriptionField(categoryId, formContainer);
    createAddTaskButton(categoryId, formContainer);
    parentDivForCategory.append(formContainer);
    // render on top level parent to be displayed in the dom
    parentCategoriesCollection.append(parentDivForCategory);
  });
}

function displayCategories(categories) {
  const categoriesCollection = document.querySelector("#categories_collection");
  categories.forEach(category => {
    const h2tag = document.createElement("h2");
    h2tag.innerHTML = category.name;
    const divFor1Category = document.createElement("div");
    divFor1Category.className = "card";
    divFor1Category.append(h2tag);

    getTasksAndAttachToCategory(
      category.id,
      divFor1Category,
      categoriesCollection
    );
  });
}

function submitNewTask(e) {
  e.preventDefault();
  const categoryId = event.target.dataset.id;
  const title = document.querySelector(`.task-title-entry${categoryId}`).value;
  const description = document.querySelector(
    `.task-description-entry${categoryId}`
  ).value;
  displayCategories;

  const newTask = {
    title,
    description,
    category_id: categoryId
  };

  createNewTask(newTask).then(resp => {
    if (resp.status === 201) {
      resp.json().then(createdTask => {
        const currentList = document.getElementById(`task-list${categoryId}`);
        wrapTaskLi(createdTask, currentList);
        e.target.parentElement.reset();
      });
    }
  });
}

function removeTask(e) {
  const removeTaskId = parseInt(e.target.dataset.id);
  return deleteTask(removeTaskId).then(resp => {
    if (resp.status === 204) {
      e.target.parentElement.remove();
    }
  });
}





//     const taskUrl = "http://localhost:3000/tasks/"
//     const categoriesUrl = "http://localhost:3000/categories/"

//     fetch(categoriesUrl)
//     .then(res => res.json())
//     .then(data => displayCategories(data))

//     function fetchTasksHtml(categoryId) {
//      return fetch(taskUrl)
//         .then(res => res.json())
//         .then(tasks => displayCards(tasks, categoryId))
//     }

//     function createNewTask(newTask) {
//     const configObject = {
//         method: "POST",
//         headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//         },
//         body: JSON.stringify(newTask)
//     }
//     return fetch(taskUrl, configObject)
//         .then(function(response){
//             return response.json()
//         })
//     }





//     function displayCategories(categories) {
//         // 
//     const categoriesCollection = document.querySelector("#categories_collection")
//     categories.forEach(category => {
//         const divFor1Category = document.createElement("div")
//         divFor1Category.className = "card"
//         const h2tag = document.createElement("h2")
//         h2tag.innerHTML = category.name
//         const ulTag = document.createElement("ul")
//         ulTag.id = `task-list${category.id}`
//         const submitButton = document.createElement("button")
//         submitButton.classList.add("submit")
//         submitButton.dataset.id = category.id
//         submitButton.innerText = "New Task"
//         submitButton.addEventListener("click", submitNewTask )
//         submitButton.dataset = category.id
//         // create another fuction with categeroy id parameter passed on, and cattgories collection
//         fetchTasksHtml(category.id).then(tasksLi => {
//         tasksLi.forEach(task=> (createTaskList(task, ulTag)))
//         // create form
//         const formContainer = document.createElement("form")
//         formContainer.class = `task-list-form${category.id}`

//         const inputTitleField = document.createElement("input")
//         inputTitleField.className = `task-title-entry${category.id}`
//         const inputDescriptionField = document.createElement("input")
//         inputDescriptionField.className = `task-description-entry${category.id}`

//         // const divFormHolder = document.createElement("div")
//         formContainer.append(
//             inputTitleField,
//             inputDescriptionField,
//             submitButton
//         )
//         divFor1Category.append(h2tag, ulTag, formContainer)
//         categoriesCollection.append(divFor1Category)
//         })
//     })
//     }

//     function createTaskList(task, ulTag){
//       // get tasks and place in li
//     //   create new function for button
//       const taskListElement = document.createElement("li")
//       taskListElement.innerHTML = task.title
//       taskListElement.dataset.id = task.id
//       const deleteButton = document.createElement('button')
//       deleteButton.innerHTML ='x'
//       deleteButton.dataset.id = task.id
//       taskListElement.appendChild(deleteButton)
//      deleteButton.className = 'redButton'
//       taskListElement.id = 'title-comment'
//       deleteButton.addEventListener('click', removeTask)
//       const taskDescription = document.createElement("p")
//       taskDescription.innerHTML = task.description
//       taskListElement.append(taskDescription)

//       // append to li to get semantic structure
//       ulTag.append(taskListElement)
//     }

// function displayCards(tasks, categoryId) {
//     // debugger
//     const filterredTaskList = tasks.filter(
//         task => task.category_id === categoryId
//     )
//     return filterredTaskList
//     }

//     function submitNewTask(e) {
//     e.preventDefault()
//     const categoryId = event.target.dataset.id
//     const title = document.querySelector(`.task-title-entry${categoryId}`).value
//     const description = document.querySelector(
//         `.task-description-entry${categoryId}`
//     ).value
//         displayCategories

//     const newTask = {
//         title,
//         description,
//         category_id: categoryId
//     }
//     const currentList = document.getElementById(`task-list${categoryId}`)
//     createTaskList(newTask, currentList)
//     createNewTask(newTask)
//     e.target.parentElement.reset()
//     // chekck return valaue with .then, chek respone and play with the value of it, and than
//     }

//     function removeTask(e){
//         const removeTaskId = parseInt(e.target.dataset.id)
//         // dic=vide into two- function and fetch req
//         return fetch(`${taskUrl}${removeTaskId}`, {method: 'DELETE'})
//         .then(() => {
//                 e.target.parentElement.remove()
//             })
//     }


