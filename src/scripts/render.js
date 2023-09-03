import { getCurrentUserInfo, getAllPosts } from "./requests.js";

// Renderiza todos os posts
export async function renderAllPosts() {
  const postSection = document.querySelector(".posts");
  postSection.innerHTML = "";
  const posts = await getAllPosts();

  posts.forEach(async (post) => {
    const postArticle = await renderPost(post);
    postSection.appendChild(postArticle);
  });
}

//Criando modal para abrir posts
const modalPosts = async (post) => {
  const modalDialog = document.getElementById("modal__post");
  //Criando elementos via DOM
  const divModal = document.createElement("div");
  divModal.classList.add("modal__public")
  // const divHeader = await renderPostHeader(post);
  const divHeader = document.createElement("div");
  divHeader.classList.add("header__modal")
  const divNameDate = document.createElement("div");
  divNameDate.classList.add("info__modal")
  const img = document.createElement("img");
  const name = document.createElement("p");
  const divisorText = document.createElement("small");
  const pDate = document.createElement("p");
  const closeButton = document.createElement("button");
  const title = document.createElement("h2");
  const contentPost = document.createElement("p")
  //img
  img.src = post.user.avatar;
  img.alt = post.user.username;
  img.classList.add("post__author-image");
  //name
  name.innerText = post.user.username;
  name.classList.add("post__author-name", "text4", "bolder");
  //divisor
  divisorText.innerText = "|";
  divisorText.classList.add("post__date", "text4");
  //pDate
  pDate.innerText = handleDate(post.createdAt);
  pDate.classList.add("post__date", "text4");
  //Botão de fechar modal:
  closeButton.innerText = "X";
  closeButton.setAttribute("id", "close__modal");
  closeButton.classList.add("button__closeModal");
  //Título do post:
  title.innerText = post.title;
  title.classList.add("post__title", "text1", "bolder");
  //Conteúdo do Post
  contentPost.innerText = post.content;
  contentPost.classList.add("post__content", "text3");

  // Adicionar elementos filhos
  divNameDate.append(img, name, divisorText, pDate)
  divHeader.append(divNameDate, closeButton);
  divModal.append(divHeader, title, contentPost);
  modalDialog.appendChild(divModal);
  const closeModal = document.getElementById("close__modal")
  closeModal.addEventListener("click", () => {
    modalDialog.close()
    modalDialog.innerHTML = "";
  })
}

// Renderiza um post
async function renderPost(post) {
  const postContainer = document.createElement("article");
  postContainer.classList.add("post");

  const postTitle = document.createElement("h2");
  postTitle.classList.add("post__title", "text1", "bolder");
  postTitle.innerText = post.title;

  const postContent = document.createElement("p");
  postContent.classList.add("post__content", "text3");

  const postHeader = await renderPostHeader(post);

  postContent.classList.add("post__content--feed", "text3");
  postContent.innerText = post.content;

  const openButton = document.createElement("a");
  openButton.classList.add("post__open", "text3", "bold");
  openButton.innerText = "Acessar publicação";
  openButton.dataset.id = post.id;

  //Evento de clique para "Acessar publicação"
  const modal = document.getElementById("modal__post")
  openButton.addEventListener('click', () => {
    modalPosts(post);
    modal.showModal()
  })

  postContainer.append(postHeader, postTitle, postContent, openButton);

  return postContainer;
}

// Verifica a permissao do usuário para editar/deletar um post
async function checkEditPermission(authorID) {
  const { id } = await getCurrentUserInfo();

  if (Object.values({ id }, [0]).toString() == authorID) {
    return true;
  } else {
    return false;
  }
}

// Renderiza o cabeçalho de um post no feed
async function renderPostHeader(post) {
  const userInfo = post.user;

  const postDateInfo = handleDate(post.createdAt);

  const postHeader = document.createElement("header");
  postHeader.classList.add("post__header");

  const postInfo = document.createElement("div");
  postInfo.classList.add("post__info");

  const authorImage = document.createElement("img");
  authorImage.classList.add("post__author-image");
  authorImage.src = userInfo.avatar;

  const authorName = document.createElement("h2");
  authorName.classList.add("post__author-name", "text4", "bolder");
  authorName.innerText = userInfo.username;

  const divisor = document.createElement("small");
  divisor.innerText = "|";
  divisor.classList.add("post__date", "text4");

  const postDate = document.createElement("small");
  postDate.classList.add("post__date", "text4");
  postDate.innerText = postDateInfo;

  postInfo.append(authorImage, authorName, divisor, postDate);

  postHeader.appendChild(postInfo);

  const editable = await checkEditPermission(userInfo.id);

  if (editable) {
    const postActions = renderPostActions(post.id);
    postHeader.appendChild(postActions);
  }

  return postHeader;
}

// Renderiza as opções de "Editar" e "Deletar" caso o usuário seja dono do post
function renderPostActions(postID) {
  const actionsContainer = document.createElement("div");
  actionsContainer.classList.add("post__actions");

  const editButton = document.createElement("button");
  editButton.classList.add(
    "post__button--edit",
    "btn",
    "btn--gray",
    "btn--small",
    "text4"
  );
  editButton.dataset.id = postID;
  editButton.innerText = "Editar";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add(
    "post__button--delete",
    "btn",
    "btn--gray",
    "btn--small",
    "text4"
  );
  deleteButton.dataset.id = postID;
  deleteButton.innerText = "Excluir";

  actionsContainer.append(editButton, deleteButton);
  return actionsContainer;
}

// Lida com a data atual
function handleDate(timeStamp) {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const date = new Date(timeStamp);
  const month = months.at(date.getMonth());
  const year = date.getFullYear();

  return `${month} de ${year}`;
}

