const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const User = JSON.parse(localStorage.getItem("loginUser"));
const http = "http://localhost:5000/api/";
if (User?.token) {
  checkUser();
} else {
  window.location.replace("./index.html");
}
async function checkUser() {
  await fetch("http://localhost:5000/api/user/check", {
    headers: {
      "Content-Type": "application/json",
      authentication: User.token,
    },
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.success && data.data === 0) {
        window.location.replace("./index.html");
      }
    });
}

function alertFullil(texting) {
  alertSuccess.children[0].textContent = texting;
  alertSuccess.classList.add("get-active");
  setTimeout(() => {
    alertSuccess.classList.remove("get-active");
  }, 3000);
}

function alertFail(texting) {
  alertDanger.children[0].textContent = texting;
  alertDanger.classList.add("get-active");
  setTimeout(() => {
    alertDanger.classList.remove("get-active");
  }, 3000);
}

function renderProducts(data) {
  const item = ``;
}

async function fetchData(http) {
  const response = await fetch(`${http}product`);
  const products = await response.json();
  if (products?.data.length > 0 && Array.isArray(products.data)) {
  }
}

window.addEventListener("load", function (e) {
  const menuToggle = $(".menu-toggle");
  const list = $$(".list");
  const nav = $(".navigation");
  const productList = $(".prodcut-items");
  console.log("productList:", productList);

  menuToggle.onclick = (e) => {
    nav.classList.toggle("active");
  };

  [...list].forEach((val) =>
    val.addEventListener("click", function (e) {
      [...list].forEach((lis) => lis.classList.remove("active"));
      this.classList.add("active");
    })
  );

  fetchData(http);
});