let regLogin = /\S+/;
let regPassword = /\S{6,}/;
let regEmail = /^\S+@[a-z]+\.[a-z]+/;

const form = document.forms.formRegistration;
const formLogin = form.querySelector("#formName");
const formPassword = form.querySelector("#formPassword");
const formEmail = form.querySelector("#formEmail");
const btnAdd = form.querySelector(".btn-add");
const tableContent = document.querySelector("#tableContent");
const btnNewAdd = form.querySelector(".btnNewAdd");
const hidden = form.querySelector(".hidden");

function fildStyle(reg, form) {
  if (reg.test(form.value)) {
    form.classList.add("green");
    form.classList.remove("red");
  } else {
    form.classList.add("red");
    form.classList.remove("green");
  }
}

form.addEventListener("input", function (event) {
  event.target.id == "formName"
    ? fildStyle(regLogin, formLogin)
    : event.target.id == "formPassword"
    ? fildStyle(regPassword, formPassword)
    : event.target.id == "formEmail"
    ? fildStyle(regEmail, formEmail)
    : console.log("some");
  if (
    regEmail.test(formEmail.value) &&
    regPassword.test(formPassword.value) &&
    regLogin.test(formLogin.value)
  ) {
    btnAdd.classList.add("btn-add-initialView", "btn-add-right");
    btnAdd.classList.remove("swing");
  }
});

let arrAllValues = [];
btnAdd.addEventListener("click", function (event) {
  if (
    regEmail.test(formEmail.value) &&
    regPassword.test(formPassword.value) &&
    regLogin.test(formLogin.value)
  ) {
    if (!hidden.value) {
      const userValues = {
        id: hidden.value,
        login: formLogin.value,
        password: formPassword.value,
        email: formEmail.value,
      };
      arrAllValues.push(userValues);
    } else {
      arrAllValues = arrAllValues.map(function (el) {
        if (el.id == hidden.value) {
          el.login = formLogin.value;
          el.password = formPassword.value;
          el.email = formEmail.value;
          form.reset();
          hidden.value = null;
          return el;
        } else {
          return el;
        }
      });
    }
    recordTable();
    formLogin.classList.remove("green");
    formPassword.classList.remove("green");
    formEmail.classList.remove("green");
  } else {
    btnAdd.classList.remove("btn-add-initialView");
    btnAdd.classList.add("swing");
  }
});

function recordTable() {
  tableContent.innerHTML = "";
  let userId = 0;
  let newBtnEdit;
  let newBtnDelete;
  for (let j = 0; j < arrAllValues.length; j++) {
    let newRow = document.createElement("tr");
    newRow.setAttribute("data", userId++);
    for (let i = 0; i < 6; i++) {
      let newTd = document.createElement("td");
      newRow.appendChild(newTd);
    }
    newBtnEdit = document.createElement("button");
    newBtnDelete = document.createElement("button");
    newBtnEdit.classList.add("BtnEdit");
    newBtnEdit.innerText = "Edit";
    newBtnDelete.classList.add("BtnDelete");
    newBtnDelete.innerText = "Delete";

    newRow.children[1].textContent = arrAllValues[j].login;
    newRow.children[2].textContent = arrAllValues[j].password;
    newRow.children[3].textContent = arrAllValues[j].email;
    newRow.children[4].appendChild(newBtnEdit);
    newRow.children[5].appendChild(newBtnDelete);
    tableContent.appendChild(newRow);
    arrAllValues[j].id = newRow.getAttribute("data");
    deleteRow(newBtnDelete);
    editeRow(newBtnEdit);
  }
  form.reset();
}

function deleteRow(del) {
  del.addEventListener("click", function (event) {
    const idElem = this.parentElement.parentElement.getAttribute("data");
    arrAllValues = arrAllValues.filter((el) => el.id != idElem);
    recordTable();
  });
}
function editeRow(edit) {
  edit.addEventListener("click", function (event) {
    let idElem = parseInt(this.parentElement.parentElement.getAttribute("data"));
    formLogin.value = arrAllValues[idElem].login;
    formPassword.value = arrAllValues[idElem].password;
    formEmail.value = arrAllValues[idElem].email;
    hidden.value = arrAllValues[idElem].id;
  });
}
