import spinner from "./spinner.js";
import { alertFullfill, alertFail } from "./alert.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
const User = JSON.parse(localStorage.getItem("loginUser"));
console.log("User:", User);
if (!User) {
  window.location.replace("./index.html");
}
alertFullfill("haha");
async function changePassword(password, newPassword) {
  try {
    await fetch(`${http}changepassword`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, newPassword }),
    })
      .then((response) => response.json())
      .then((response) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {}
}

export default function Password() {
  const userId = $(".userid .data");
  const userName = $(".username .data");
  const email = $(".useremail .data");
  userName.innerHTML = User?.data.username;
  userId.innerHTML = User?.data.idUser;
  email.innerHTML = User?.data.email;
}