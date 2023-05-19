import spinner from "./spinner.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
const User = JSON.parse(localStorage.getItem("loginUser"));
if (!User) {
  window.location.replace("./index.html");
}

export default function Password() {
  const userId = $(".userid .data");
  console.log("userId:", userId);
  const userName = $(".username .data");
  console.log("userName:", userName);
  const email = $(".useremail .data");
  console.log("email:", email);
}
