const btRegister = document.getElementById("btRegister");
const btLimpar = document.getElementById("btLimpar");
const btLimparTudo = document.getElementById("btClearAll");

let userList = [];
let count = 1;
let date = new Date();

const addUser = (name, email, pass) => {
  let newUser = {
    id: count++,
    name: name,
    email: email,
    pass: pass,
    date: date.toLocaleDateString(),
  };

  userList.push(newUser);

  localStorage.setItem("userList", JSON.stringify(userList));

  renderUserList();
};

function deleteUser(userId) {
  var updatedUserList = userList.filter(function (user) {
    return user.id !== userId;
  });

  if (updatedUserList.length < userList.length) {
    userList = updatedUserList;
    localStorage.setItem("userList", JSON.stringify(userList));
    renderUserList();
  } else {
    alert("Usuário não encontrado.");
  }
}

function getUserList() {
  var storedList = JSON.parse(localStorage.getItem("userList"));
  userList = storedList || [];
}

function renderUserList() {
  var userListElment = document.getElementById("lista");
  userListElment.innerHTML = "";

  userList.forEach(function (user) {
    var listItem = document.createElement("li");
    listItem.innerHTML = `${user.date} - Nome: ${user.name} - Email: ${user.email} <button class="delete-button" onclick="deleteUser(${user.id})">Excluir</button>`;
    userListElment.appendChild(listItem);
  });
}

getUserList();

renderUserList();

btRegister.addEventListener("click", function (event) {
  event.preventDefault();

  let inputValueName = document.getElementById("userName").value;
  let inputValueEmail = document.getElementById("userEmail").value;
  let inputValuePass = document.getElementById("userPass").value;

  if (
    inputValueName === "" ||
    inputValueEmail === "" ||
    inputValuePass === ""
  ) {
    alert("Preencha todos os campos de cadastro");
    return;
  }
  addUser(inputValueName, inputValueEmail, inputValuePass);
});

const limparForm = () => {
  document.getElementById("userName").value = "";
  document.getElementById("userEmail").value = "";
  document.getElementById("userPass").value = "";
};

const clearAll = () => {
  localStorage.clear();
  document.getElementById("lista").innerHTML = "";
  userList.splice(0);
};

btLimparTudo.onclick = clearAll;
btLimpar.onclick = limparForm;
