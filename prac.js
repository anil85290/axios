let name1 = document.getElementById("nameid");
let email = document.getElementById("email");
let number = document.getElementById("number");
let submit = document.getElementById("submit");

submit.addEventListener("click", addBtn);

function addBtn(e) {
  e.preventDefault();

  //adding user details to ui
  let items = document.getElementById("items");
  let newELement = document.createElement("li");
  newELement.innerHTML = `<span>${name1.value}</span> <span>${email.value} </span><span>${number.value}</span>`;

  //adding delete button and edit button
  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.className = "btn btn-danger mr-2";

  //edit btn
  let editBtn = document.createElement("button");
  editBtn.innerHTML = "Edit";
  editBtn.className = "btn btn-dark mr-2";

  //user input
  let obj = {
    name: name1.value,
    email: email.value,
    number: number.value,
  };
  axios.post('https://crudcrud.com/api/eb547c157c804d3588314670d7301184/user',obj)
  .then((response)=>{


    console.log(response.data)

  })
  .catch((err)=>{console.log(err)})
  let userDetails = JSON.stringify(obj);
  // console.log(userDetails);

  if (email.value !== "") {
    items.appendChild(newELement);

    localStorage.setItem(obj.email, userDetails);
    newELement.appendChild(deleteBtn);
    newELement.appendChild(editBtn);
  } else {
    alert("Please fill all fields ");
  }

  //adding delete button
  deleteBtn.addEventListener("click", deleteBtnClick);

  function deleteBtnClick(e) {
    e.preventDefault();
    deleteBtn.parentElement.remove();
    console.log(obj.email);

    localStorage.removeItem(obj.email);
    // document.getElementById('items').innerHTML=emailLocal
  }

  //edit button

  editBtn.addEventListener("click", edit);

  function edit(e) {
    console.log("edit");
    editBtn.parentElement.remove();
    name1.value = obj.name;
    email.value = obj.email;
  }
}