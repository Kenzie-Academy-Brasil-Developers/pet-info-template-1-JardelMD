// Desenvolva as funcionalidades de login aqui
import { loginRequest, token } from "./requests.js";

// const authentication = () => {
//     if(token) {
//       location.replace('./src/pages/feed.html')
//     }
//   }
//   authentication()

//Criando a função para login:
const handleLogin = () => {
    const inputs = document.querySelectorAll('.text3')
    const button = document.querySelector('#login__submit')

    button.addEventListener('click', (event) => {
        event.preventDefault()
        const loginBody = {}
        inputs.forEach(input => {
            loginBody[input.name] = input.value
        })
        return loginRequest(loginBody)
    })
}

handleLogin();

//Redirecionando para a página de cadastro: 
const registerPage = () => {
    const button = document.querySelector("#register__button");
    button.addEventListener("click", (event) => {
        event.preventDefault();
        location.replace("./src/pages/register.html"); //Redireciona para a página de cadastro
    })
}
registerPage();

