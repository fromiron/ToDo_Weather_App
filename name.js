const nameParent = document.querySelector('#name__input__wrap');
const nameInput = document.querySelector('#name__input');
const greetingsMsg = document.querySelector('#greetings__msg');

const saveName = (name) => {
  greetingsMsg.innerHTML = `Welcome, ${name}`;
  logoutBtn();
  nameParent.removeChild(nameInput);
  localStorage.setItem('name', name);
};

const logoutBtn = () => {
  const logout = document.createElement('button');
  logout.innerHTML = 'LOGOUT';
  logout.id = 'logoutBtn';
  logout.addEventListener('click', clearLocal);
  nameParent.appendChild(logout);
};
const clearLocal = () => {
  localStorage.removeItem('name');
  location.reload(true);
};

const loadName = () => {
  const name = localStorage.getItem('name');
  if (name !== null) {
    greetingsMsg.innerHTML = `Welcome, ${name}`;
    nameParent.removeChild(nameInput);
    logoutBtn();
  }
};

function init() {
  loadName();
}
init();

nameInput.addEventListener('keydown', function (e) {
  if (e.keyCode === 13 && e.target.value !== '') saveName(e.target.value);
});