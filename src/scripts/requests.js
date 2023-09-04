
const baseUrl = "http://localhost:3333";
export const token = localStorage.getItem("@petinfo:token");

const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// Informações de usuário logado
async function getCurrentUserInfo() {
  const request = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: requestHeaders,
  });
  const user = await request.json();
  return user;
}

// Listagem de posts
async function getAllPosts() {
  const request = await fetch(`${baseUrl}/posts`, {
    method: "GET",
    headers: requestHeaders,
  });
  const posts = await request.json();
  return posts;
}

//Requisição para fazer login na página
const loginRequest = async (loginBody) => {
  const tokenLogin = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginBody)
  })
    .then(async (response) => {
      const inputEmail = document.querySelector("#Email")
      const inputPassword = document.querySelector("#Senha")
      const smallEmail = document.querySelector("#wrong-email")
      const smallPassword = document.querySelector("#wrong-password")
      const convert = await response.json()
      localStorage.setItem("@petinfo:token", convert.token)
      if (response.ok) {
        alert("Login realizado com sucesso")
        setTimeout(() => {
          location.replace('./src/pages/feed.html')
        }, 1000)
        return convert
      } else {
        console.log(convert.message)
        if (convert.message === "O email está incorreto") {
          smallEmail.classList.remove("hidden");
          smallPassword.classList.add("hidden");
          inputEmail.classList.add("error");
          inputPassword.classList.remove("error");
        } else if (convert.message === "A senha está incorreta") {
          smallEmail.classList.add("hidden");
          smallPassword.classList.remove("hidden");
          inputEmail.classList.remove("error");
          inputPassword.classList.add("error");
        }
      }
    })
  return tokenLogin
}

//Requisição para fazer cadastro na página
const createLogin = async (userLogin) => {
  const newUser = await fetch(`${baseUrl}/users/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userLogin)
  })
    .then(async (response) => {
      const responseJson = await response.json()
      if (response.ok) {
        alert("Usuário cadastrado com sucesso")
        setTimeout(() => {
          location.replace("../../index.html");
        }, 1000)
        return responseJson
      } else {
        alert(responseJson.message)
      }
    })
  return newUser
}

//Requisição para nova postagem
const createNewPost = async (userPost) => {
  const post = await fetch(`${baseUrl}/posts/create`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(userPost)
  })
    .then(async (response) => {
      const responseJson = await response.json()
      if (response.ok) {
        alert("Nova publicação feita com sucesso");
        return responseJson;
      } else {
        alert(responseJson.message);
      }
    })
  return post
}

//Requisição para deletar a postagem
const deletePost = async (id) => {
  const delet = await fetch(`${baseUrl}/posts/${id}`, {
    method: 'DELETE',
    headers: requestHeaders
  })
    .then(async (response) => {
      const responseJson = await response.json()
      if (response.ok) {
        alert(responseJson.message);
        return responseJson;
      } else {
        alert(responseJson.message);
      }
    })
  return delet
}

export { getCurrentUserInfo, getAllPosts, loginRequest, createLogin, createNewPost, deletePost }

