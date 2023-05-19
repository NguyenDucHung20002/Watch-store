const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

window.addEventListener("load", function (e) {
  const menuToggle = $(".menu-toggle");

  const nav = $(".navigation");

  menuToggle.onclick = (e) => {
    nav.classList.toggle("active");
  };
});
