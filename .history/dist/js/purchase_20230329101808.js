import spinner from "./spinner.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
import head from "./head.js";
const User = JSON.parse(localStorage.getItem("loginUser"));
if (!User) {
  //   window.location.replace("./index.html");
}
window.addEventListener("load", function () {
  head();
});
