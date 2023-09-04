import { getCurrentUserInfo, getAllPosts, deletePost, editPost, getPostByID } from "./requests.js";

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

//Cria modal para deletar o post
const modalDelete = () => {
  const modalDel = document.getElementById("modal__delete");
  const divModalDelete = document.createElement("div");
  divModalDelete.classList.add("modal__public")
  const divHeaderDelete = document.createElement("div");
  const title = document.createElement("h2");
  const buttonX = document.createElement("button");
  const divContentDelete = document.createElement("div");
  divContentDelete.classList.add("div__content")
  const titlePost = document.createElement("h1");
  const paragraph = document.createElement("p");
  const divButton = document.createElement("div");
  divButton.classList.add("div__buttons")
  const buttonCancel = document.createElement("button");
  const buttonAfirm = document.createElement("button");
  //Title
  title.innerText = "Confirmação de exclusão"
  title.classList.add("h2__title")
  //Button X
  buttonX.innerText = "X";
  buttonX.setAttribute("id", "close__modal--modal");
  buttonX.classList.add("button__closeModal");

  buttonX.addEventListener("click", () => {
    modalDel.innerHTML = ""
    modalDel.close();
  });
  //titulo  do postModal
  titlePost.innerText = "Tem certeza que deseja excluir este post?";
  titlePost.classList.add("post__title", "text1", "bolder")
  //paragraph 
  paragraph.innerText = "Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir"
  paragraph.classList.add("post__content", "text3")
  //buttonCancel
  buttonCancel.innerText = "Cancelar";
  buttonCancel.classList.add("button__CancelModal")

  buttonCancel.addEventListener("click", () => {
    modalDel.innerHTML = ""
    modalDel.close();
  });
  // buttonAfirm
  buttonAfirm.innerText = "Sim, excluir este post"
  buttonAfirm.setAttribute("id", "deleteModal");
  buttonAfirm.classList.add("button__Afirm");

  divHeaderDelete.append(title, buttonX);
  divHeaderDelete.classList.add("headerDelete")
  divContentDelete.append(titlePost, paragraph);
  divButton.append(buttonCancel, buttonAfirm);
  divModalDelete.append(divHeaderDelete, divContentDelete, divButton)
  modalDel.appendChild(divModalDelete)
}

//Cria modal para editar post
const modalEdit = () => {
  const modalEd = document.getElementById("modal__edit");
  //Criando elementos via DOM
  const divModalEdit = document.createElement("div");
  const divHeaderEdit = document.createElement("div");
  const titleModalEdit = document.createElement("h1");
  const buttonCloseEdit = document.createElement("button");
  const formInputsEdit = document.createElement("form");
  const titlePostEdit = document.createElement("h2");
  const inputEdit = document.createElement("input");
  const titleTextareaEdit = document.createElement("h2");
  const textareaEdit = document.createElement("textarea");
  const divButtonsEdit = document.createElement("div");
  const buttonCancelEdit = document.createElement("button");
  const buttonSaveEdit = document.createElement("button");

  // Adicionando conteúdo e classes de estilo CSS para as consts criadas:
  // Título do Modal
  titleModalEdit.innerText = "Edição";
  titleModalEdit.classList.add("modal__title");
  //Botão de fechar modal:
  buttonCloseEdit.innerText = "X";
  buttonCloseEdit.setAttribute("id", "closeModalEdit");
  buttonCloseEdit.classList.add("button__closeModal");

  buttonCloseEdit.addEventListener("click", () => {
    modalEd.innerHTML = ""
    modalEd.close();
  });

  //Título do input:
  titlePostEdit.innerText = "Título do post";
  titlePostEdit.classList.add("h2__title");
  //Input para o título do post:
  inputEdit.setAttribute("id", "postTitleEdit");
  inputEdit.setAttribute("name", "title");
  inputEdit.setAttribute("type", "text");
  inputEdit.setAttribute("placeholder", "Digite o título aqui...")
  inputEdit.classList.add("input__post", "input__edit");
  //Título do textarea:
  titleTextareaEdit.innerText = "Conteúdo do post";
  titleTextareaEdit.classList.add("h2__title");
  //Textarea para conteúdo do post:
  textareaEdit.setAttribute("id", "postContentEdit");
  textareaEdit.setAttribute("name", "content");
  textareaEdit.setAttribute("type", "text");
  textareaEdit.setAttribute("placeholder", "Desenvolva o conteúdo do post aqui...")
  textareaEdit.classList.add("textarea__post", "input__edit");
  //Botão de Cancelar 
  buttonCancelEdit.innerText = "Cancelar";
  buttonCancelEdit.setAttribute("id", "cancelModalEdit");
  buttonCancelEdit.classList.add("button__CancelModal");

  buttonCancelEdit.addEventListener("click", () => {
    // modalEd.innerHTML = ""
    modalEd.close();
  });

  //Botão de Salvar Publicação 
  buttonSaveEdit.innerText = "Salva Alterações";
  buttonSaveEdit.setAttribute("id", "saveModal");
  buttonSaveEdit.classList.add("button__saveModal");
  //Div do modal
  divModalEdit.classList.add("modal__container");
  //Div do cabeçalho
  divHeaderEdit.classList.add("modal__header");
  //Form com input e textarea
  formInputsEdit.classList.add("form__post");
  //Div com botões de cancelar e salvar
  divButtonsEdit.classList.add("div__buttons");

  // Adicionar elementos filhos
  divHeaderEdit.append(titleModalEdit, buttonCloseEdit);
  formInputsEdit.append(titlePostEdit, inputEdit, titleTextareaEdit, textareaEdit);
  divButtonsEdit.append(buttonCancelEdit, buttonSaveEdit);
  divModalEdit.append(divHeaderEdit, formInputsEdit, divButtonsEdit);
  modalEd.appendChild(divModalEdit);
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

  //Evento de clique no botão de Editar:
  const modalEd = document.getElementById("modal__edit");
  editButton.addEventListener("click", async () => {
    modalEd.innerHTML = ""
    modalEdit();
    const foundPost = await getPostByID(editButton.dataset.id)
    const inputTitle = document.getElementById("postTitleEdit");
    const textareaContent = document.getElementById("postContentEdit");
    modalEd.showModal();
    inputTitle.value = foundPost.title;
    textareaContent.value = foundPost.content;

    //Evento de clique dentro do modal para salvar alterações
    const edit = document.getElementById("saveModal")
    const inputsEdit = document.querySelectorAll(".input__edit");
    const contentEdit = {};
    edit.addEventListener("click", () => {
      inputsEdit.forEach(input => {
        contentEdit[input.name] = input.value;
      })
      editPost(editButton.dataset.id, contentEdit)
      modalEd.close();
      setTimeout(() => {
        location.replace('./feed.html');
      }, 1000)
    })
  })

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
  //Evento de clique no botão de excluir:
  const modalDel = document.getElementById("modal__delete");
  deleteButton.addEventListener("click", () => {
    modalDelete();
    modalDel.showModal();

    //Evento de clique dentro do modal para excluir post
    const del = document.getElementById("deleteModal")
    del.addEventListener("click", () => {
      deletePost(deleteButton.dataset.id)
      modalDel.innerHTML = ""
      modalDel.close();
      setTimeout(() => {
        location.replace('./feed.html');
      }, 1000)

    })
  })

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

