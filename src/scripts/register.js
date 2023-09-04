// Desenvolva as funcionalidades de cadastro aqui
import { createLogin } from "./requests.js"


//Criando função para cadastrar usuário:
const createUser = () => {
    const input = document.getElementById('user')
    const email = document.getElementById("Email")
    const avatar = document.getElementById("picture")
    const password = document.getElementById("Senha")
    const buttonRegister = document.querySelector('#register__submit')
    buttonRegister.addEventListener('click', (event) => {
        event.preventDefault()
        let count = 0;
        const userLogin = {}
        if (input.value.trim() === "" ||
            email.value.trim() === "" ||
            avatar.value.trim() === "" ||
            password.value.trim() === "") {
            count++
        }
        userLogin[input.name] = input.value;
        userLogin[email.name] = email.value;
        userLogin[avatar.name] = avatar.value;
        userLogin[password.name] = password.value;
        if (count !== 0) {
            alert("Por favor, preencha todos os campos necessários para realizar o cadastro!")
        } else {
            return createLogin(userLogin);
        }
    })
}
createUser();

//Função para voltar para a página de login:
const redirectToHomePage = () => {
    const buttonComeBack = document.querySelector("#redirect__button");
    buttonComeBack.addEventListener("click", (event) => {
        event.preventDefault();
        location.replace("../../index.html");
    })
}
redirectToHomePage(); 