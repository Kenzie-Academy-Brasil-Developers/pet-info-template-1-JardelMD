import { renderAllPosts } from "./render.js";
import { createNewPost, getCurrentUserInfo, token } from "./requests.js";

//Menu que aparece as informações quando clicamos no avatar
const showUserMenu = async () => {
  const userAction = document.querySelector(".user__image");
  const menu = document.querySelector(".user__logout");
  const user = await getCurrentUserInfo(); //Obtem as informações do usuário logado
  userAction.addEventListener("click", (e) => {
    //h2 na div que irá receber o Username
    const uniqueName = document.querySelector(".user__uniquename");
    uniqueName.innerText = `@${user.username}`
    menu.classList.toggle("hidden");
  });
}

export const authentication = () => {
  console.log("Entrou aqui")
  if (!token) {
    window.location.href = "../../index.html";
  } 
}

async function main() {
  authentication();
  // Adiciona os eventos de click ao menu flutuante de logout
  await showUserMenu();
  // Renderiza todos os posts no feed (render.js)
  await renderAllPosts();

  createModalPosts();
  
}

main();

// Criando modal via DOM
const createModalPosts = () => {
  const modalDialog = document.querySelector("#modalController"); //Captura o modal do html
  //Criando elementos via DOM
  const divModal = document.createElement("div");
  const divHeader = document.createElement("div");
  const titleModal = document.createElement("h1");
  const buttonClose = document.createElement("button");
  const formInputs = document.createElement("form");
  const titlePost = document.createElement("h2");
  const input = document.createElement("input");
  const titleTextarea = document.createElement("h2");
  const textarea = document.createElement("textarea");
  const divButtons = document.createElement("div");
  const buttonCancel = document.createElement("button");
  const buttonPost = document.createElement("button");

  // Adicionando conteúdo e classes de estilo CSS para as consts criadas:
  // Título do Modal
  titleModal.innerText = "Criando novo post";
  titleModal.classList.add("modal__title");
  //Botão de fechar modal:
  buttonClose.innerText = "X";
  buttonClose.setAttribute("id", "closeModal");
  buttonClose.classList.add("button__closeModal");
  //Título do input:
  titlePost.innerText = "Título do post";
  titlePost.classList.add("h2__title");
  //Input para o título do post:
  input.setAttribute("id", "postTitle");
  input.setAttribute("name", "textTitle");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Digite o título aqui...")
  input.classList.add("input__post");
  //Título do textarea:
  titleTextarea.innerText = "Conteúdo do post";
  titleTextarea.classList.add("h2__title");
  //Textarea para conteúdo do post:
  textarea.setAttribute("id", "postContent");
  textarea.setAttribute("name", "textContent");
  textarea.setAttribute("type", "text");
  textarea.setAttribute("placeholder", "Desenvolva o conteúdo do post aqui...")
  textarea.classList.add("textarea__post");
  //Botão de Cancelar 
  buttonCancel.innerText = "Cancelar";
  buttonCancel.setAttribute("id", "cancelModal");
  buttonCancel.classList.add("button__CancelModal");
  //Botão de Publicar 
  buttonPost.innerText = "Publicar";
  buttonPost.setAttribute("id", "postModal");
  buttonPost.classList.add("button__postModal");
  //Div do modal
  divModal.classList.add("modal__container");
  //Div do cabeçalho
  divHeader.classList.add("modal__header");
  //Form com input e textarea
  formInputs.classList.add("form__post");
  //Div com botões de cancelar e publicar
  divButtons.classList.add("div__buttons");

  //Evento de clique no botão de "Publicar"
  buttonPost.addEventListener('click', async (event) => {
    event.preventDefault();
    const userPost = {
      title: input.value, //Pega o valor do input na chave title
      content: textarea.value //Pega o valor do textarea na chave content
    };
    modalDialog.close(); //Fecha o modal
    location.replace('./feed.html'); //redireciona para a página de feed
    return await createNewPost(userPost);
  })

  // Adicionar elementos filhos
  divHeader.append(titleModal, buttonClose);
  formInputs.append(titlePost, input, titleTextarea, textarea);
  divButtons.append(buttonCancel, buttonPost);
  divModal.append(divHeader, formInputs, divButtons);
  modalDialog.appendChild(divModal);
}

//Criando função para abrir modal ao clicar no botão "Criar publicação"
const newPost = () => {
  const button = document.querySelector("#user__newpost");
  const modalContainer = document.querySelector("#modalController")
  button.addEventListener("click", () => {
    modalContainer.showModal();

    closeModal();
  });
}

//Eventos para fechar modal nos botões de Fechar "X" e "Cancelar"
const closeModal = () => {
  const buttonClose = document.querySelector("#closeModal"); //Botão de fechar
  const buttonCancel = document.querySelector("#cancelModal"); //Botão de cancelar
  const modalContainer = document.querySelector("#modalController")
  const input = document.querySelector('#postTitle')
  const textarea = document.querySelector("#postContent")

  buttonClose.addEventListener("click", () => {
    input.value = "";//Limpa o input
    textarea.value = ""; //limpa o textarea
    modalContainer.close(); //Fecha o modal
  });
  buttonCancel.addEventListener("click", () => {
    input.value = "";//Limpa o input
    textarea.value = ""; //limpa o textarea
    modalContainer.close(); //Fecha o modal
  });
}
newPost();

//Evento de clique para sair da página
const logoutPage = () => {
  const buttonLogout = document.querySelector(".logout__button");
  buttonLogout.addEventListener("click", () => {
    localStorage.clear();
    location.replace("../../index.html")
  })
}
logoutPage();



