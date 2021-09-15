const regExpLogin = /^[a-zA-z][a-z]{3,15}$/;
const regExpPassword = /^[\w_-]{4,16}$/;
const regExpEmailAddress = /^[\w-]*@[\w-]*\.[\w-]*$/;

const LOGIN: HTMLInputElement = document.querySelector('.login');
const PASSWORD: HTMLInputElement = document.querySelector('.password');
const EMAIL_ADDRESS: HTMLInputElement = document.querySelector('.email-address');
const BTN_ADD_USER: HTMLButtonElement = document.querySelector('.add-user');
const BTN_EDIT_USER: HTMLButtonElement = document.querySelector('.edit-user');
const USERS_LIST: HTMLTableSectionElement = document.querySelector('.users-list');
const EDIT: HTMLInputElement = document.querySelector('.btn-edit-style');
const DELETE: HTMLInputElement = document.querySelector('.btn-delete-style');

interface IUsers {
    loginUser: string;
    passwordUser: string;
    emailAddressUser: string;
}

let arrUsers: Array<IUsers> = [];

let indexEdit: number;
class User {
    loginUser: string;
    passwordUser: string;
    emailAddressUser: string;
    constructor(loginUser: string, passwordUser: string, emailAddressUser: string) {
        this.loginUser = loginUser;
        this.passwordUser = passwordUser;
        this.emailAddressUser = emailAddressUser;
    };
};

LOGIN.addEventListener('blur', () => {
    if (regExpLogin.test(LOGIN.value) == true) {
        LOGIN.classList.remove('red');
        LOGIN.classList.add('green');
    } else {
        LOGIN.classList.remove('green');
        LOGIN.classList.add('red');
    };
});

PASSWORD.addEventListener('blur', () => {
    if (regExpPassword.test(PASSWORD.value) == true) {
        PASSWORD.classList.remove('red');
        PASSWORD.classList.add('green');
    } else {
        PASSWORD.classList.remove('green');
        PASSWORD.classList.add('red');
    };
});

EMAIL_ADDRESS.addEventListener('blur', () => {
    if (regExpEmailAddress.test(EMAIL_ADDRESS.value) == true) {
        EMAIL_ADDRESS.classList.remove('red');
        EMAIL_ADDRESS.classList.add('green');
    } else {
        EMAIL_ADDRESS.classList.remove('green');
        EMAIL_ADDRESS.classList.add('red');
    };
});

BTN_ADD_USER.addEventListener('click', () => {
    if (regExpEmailAddress.test(EMAIL_ADDRESS.value) == true && regExpPassword.test(PASSWORD.value) == true && regExpLogin.test(LOGIN.value) == true) {
        let newUser = new User(LOGIN.value, PASSWORD.value, EMAIL_ADDRESS.value);
        arrUsers.push(newUser);
        clearInput();
        render();
    };

});

USERS_LIST.addEventListener('click', (event: any) => {
    console.log(event.target.classList.value);
    if(event.target.classList.value == 'btn-delete-style'){
        let indexDelete: number = event.target.name;
        arrUsers.splice(indexDelete, 1);
        render();
    }
    if(event.target.classList.value == 'btn-edit-style'){
        indexEdit = event.target.name;
        LOGIN.value = arrUsers[indexEdit].loginUser;
        PASSWORD.value = arrUsers[indexEdit].passwordUser;
        EMAIL_ADDRESS.value = arrUsers[indexEdit].emailAddressUser;
        BTN_ADD_USER.style.display = 'none';
        BTN_EDIT_USER.style.display = 'block';
    }   
})

BTN_EDIT_USER.addEventListener('click', function () {
    if (regExpEmailAddress.test(EMAIL_ADDRESS.value) == true && regExpPassword.test(PASSWORD.value) == true && regExpLogin.test(LOGIN.value) == true) {
        let newUserEdit: IUsers = {
            loginUser: LOGIN.value,
            passwordUser: PASSWORD.value,
            emailAddressUser: EMAIL_ADDRESS.value
        };
        arrUsers.splice(indexEdit, 1, newUserEdit);
        BTN_EDIT_USER.style.display = 'none';
        BTN_ADD_USER.style.display = 'block';
        clearInput();
        render();
    };
});

function render(): void {
    USERS_LIST.innerHTML = '';
    let TR: any = '';
    for (let i = 0; i < arrUsers.length; i++) {
        let myTr: any = `
        <tr>
            <td>${i + 1}</td>
            <td>${arrUsers[i].loginUser}</td>
            <td>${arrUsers[i].passwordUser}</td>
            <td>${arrUsers[i].emailAddressUser}</td>
            <td>
                <input type="button" class="btn-edit-style" name="${i}" value="Edit">
            </td>
            <td>
                <input type="button" class="btn-delete-style" name="${i}" value="Delete">
            </td>
        </tr>`;
       TR += myTr;
    }
    USERS_LIST.innerHTML = TR;
};

function clearInput(): void {
    LOGIN.value = '';
    PASSWORD.value = '';
    EMAIL_ADDRESS.value = '';
    LOGIN.classList.remove('green');
    LOGIN.classList.remove('red');
    PASSWORD.classList.remove('red');
    PASSWORD.classList.remove('green');
    EMAIL_ADDRESS.classList.remove('red');
    EMAIL_ADDRESS.classList.remove('green');
};