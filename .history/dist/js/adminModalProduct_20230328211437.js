export default function adminModal(dataProduct) {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  const http = "http://localhost:5000/";
  const User = JSON.parse(localStorage.getItem("loginUser"));

  const statistical = $(".statistical");
  statistical.addEventListener("click", function (e) {
    console.log("hehe");
  });
}
