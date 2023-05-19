const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
if (User?.token) {
  checkUser();
} else {
  window.location.replace("./index.html");
}

window.addEventListener("load", function (e) {
  const menuToggle = $(".menu-toggle");
  const list = $$(".list");
  const nav = $(".navigation");

  menuToggle.onclick = (e) => {
    nav.classList.toggle("active");
  };

  [...list].forEach((val) =>
    val.addEventListener("click", function (e) {
      [...list].forEach((lis) => lis.classList.remove("active"));
      this.classList.add("active");
    })
  );
});
