import { alertFullfill, alertFail } from "./alert.js";
import spinner from "./spinner.js";
import adminProduct from "./adminProduct.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const User = JSON.parse(localStorage.getItem("loginUser"));
console.log("User:", User);
const http = "http://localhost:5000/api/";
if (User?.token) {
  checkUser();
} else {
  window.location.replace("./index.html");
}
async function checkUser() {
  try {
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
  } catch (error) {
    console.log("error:", error);
    alertFail();
    window.location.replace("./index.html");
  }
}
window.addEventListener("load", async function (e) {
  const menuToggle = $(".menu-toggle");
  const list = $$(".list");
  const nav = $(".navigation");
  const products = $("#products");
  const dashboard = $("#dashboard");
  const customers = $("#customers");
  const orders = $("#orders");
  const password = $("#password");
  const mcessages = $("#mcessages");

  dashboard.addEventListener("click", function (e) {
    console.log("dashboard:", dashboard);
  });

  products.addEventListener("click", function (e) {
    console.log("products:", products);
  });

  customers.addEventListener("click", function (e) {
    console.log("customers:", customers);
  });

  orders.addEventListener("click", function (e) {
    console.log("orders:", orders);
  });

  password.addEventListener("click", function (e) {
    console.log("password:", password);
  });

  mcessages.addEventListener("click", function (e) {
    console.log("mcessages:", mcessages);
  });

  menuToggle.onclick = (e) => {
    nav.classList.toggle("active");
  };

  [...list].forEach((val) =>
    val.addEventListener("click", function (e) {
      [...list].forEach((lis) => lis.classList.remove("active"));
      this.classList.add("active");
    })
  );

  await adminProduct();
});
