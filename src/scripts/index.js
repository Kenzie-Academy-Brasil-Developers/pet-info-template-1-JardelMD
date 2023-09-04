// Desenvolva as funcionalidades de login aqui
import { loginRequest } from "./requests.js";

//Criando a função para login:
const handleLogin = () => {
    const input = document.getElementById('Email')
    console.log(input)
    const password = document.getElementById("Senha")
    const button = document.querySelector('#login__submit')

    button.addEventListener('click', (event) => {
        event.preventDefault()
        let count = 0;
        const loginBody = {}
        if (input.value.trim() === '' || password.value.trim() === "") {
            count++
        }
        loginBody[input.name] = input.value
        loginBody[password.name] = password.value
        if (count !== 0) {
            alert("Por favor, preencha todos os campos necessários!")
        }else{
            return loginRequest(loginBody)
        }
    })
}
handleLogin();

//Redirecionando para a página de cadastro: 
const registerPage = () => {
    const button = document.querySelector("#register__button");
    button.addEventListener("click", (event) => {
        event.preventDefault();
        location.replace("./src/pages/register.html");
    })
}
registerPage();
