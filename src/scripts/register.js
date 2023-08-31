// Desenvolva as funcionalidades de cadastro aqui
import { createLogin } from "./requests.js"


//Criando função para cadastrar usuário:
const createUser = () => {
    const inputs = document.querySelectorAll('.text3')
    const buttonRegister = document.querySelector('#register__submit')
    console.log(buttonRegister)
    buttonRegister.addEventListener('click', (event) => {
        event.preventDefault()
        const userLogin = {}
        inputs.forEach(input => {
            userLogin[input.name] = input.value
        })
        return createLogin(userLogin);
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