//UI vars - element definitions
const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let items;

//load items
loadItems();

//call event listners
eventListeners();

function eventListeners() {
  //submit events
  form.addEventListener("submit", addNewItem);

  //delete an item
  taskList.addEventListener("click", deleteItem);

  // delete all items
  btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
  items = getItemsFromLS();
  items.forEach(function (item) {
    createItem(item);
  });
}

//get ıtems from Local Storage
function getItemsFromLS() {
  if (localStorage.getItem("items") === null) {
    // If there are no items in localstorage, reset the array, if there is, fetch it.
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

//set items to Local Storgare
function setItemToLS(text) {
  itema = getItemsFromLS();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items)); // Local Storage is sent as a string.
}

//delete items from Local Storge
function deleteItemFromLS(text) {
  items = getItemsFromLS(); // get items
  items.forEach(function (item, index) {
    // We are looping through the items in the foreach. index information.
    if (item === text) {
      // If the selected item and text are equal.
      items.splice(index, 1); // We delete which index we want to delete.
    }
  });
  localStorage.setItem("items", JSON.stringify(items)); // To save again.
}
function createItem(text) {
  // create li
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text));

  //create a
  const a = document.createElement("a"); // a tag created.
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>'; //icon

  // add a to li
  li.appendChild(a);

  // add li to ul
  taskList.appendChild(li);
}

function addNewItem(e) {
  if (input.value === "") {
    //if input value null
    alert("add new item");
  }
  //createıtem
  createItem(input.value);

  //save to ls
  setItemToLS(input.value);

  // clear input
  input.value = "";

  e.preventDefault(); //it is checking that the form is submitt by default.
}

//delete an item
function deleteItem(e) {
  if (e.target.className === "fas fa-times") {
    if (confirm("are you sure?")) {
      /// icon class find
      e.target.parentElement.parentElement.remove(); //li-a-li(parent element) it is necessary to go up two.
      //delte item fromLS
      deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }
  }
  e.preventDefault();
}

//delete all items
function deleteAllItems(e) {
  // taskList.innerHTML=''; -case 1

  //  foeach with browse all items.
  if (confirm("are you sure?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }
  e.preventDefault();
}
