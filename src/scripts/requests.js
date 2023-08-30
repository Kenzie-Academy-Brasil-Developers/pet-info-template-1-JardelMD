const baseUrl = "http://localhost:3333";
const token = localStorage.getItem("@petinfo:token");

const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// Informações de usuário logado
export async function getCurrentUserInfo() {
  const request = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: requestHeaders,
  });
  const user = await request.json();

  return user;
}

// Listagem de posts
export async function getAllPosts() {
  const request = await fetch(`${baseUrl}/posts`, {
    method: "GET",
    headers: requestHeaders,
  });
  const posts = await request.json();
  return posts;
}

// Desenvolva as funcionalidades de requisições aqui
