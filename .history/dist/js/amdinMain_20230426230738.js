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
      })
      .catch(() => {
        window.location.replace("./index.html");
      });
  } catch (error) {
    console.log("error:", error);
    alertFail();
  }
}

window.addEventListener("load", async function (e) {
  const menuToggle = $(".menu-toggle");
  const list = $$(".list");
  const nav = $(".navigation");

  let checkProductsPage = false;
  let checkDashboardPage = false;
  let checkCustomersPage = false;
  let checkOrdersPage = false;
  let checkPasswordPage = false;
  let checkMessagesPage = false;

  const navigation = $$(".funtion");
  const productsPage = $("#products");
  const dashboardPage = $("#dashboard");
  const customersPage = $("#customers");
  const ordersPage = $("#orders");
  const passwordPage = $("#password");
  const messagesPage = $("#messages");

  const products = $(".products");
  const dashboard = $(".dashboard");
  const customers = $(".customers");
  const orders = $(".orders");
  const password = $(".password");
  const messages = $(".messages");

  dashboard.addEventListener("click", function (e) {
    navigation.forEach((val) => val.classList.remove("active"));
    dashboardPage.classList.add("active");
    if (!checkDashboardPage) {
    }
    checkDashboardPage = true;
  });

  products.addEventListener("click", async function (e) {
    navigation.forEach((val) => val.classList.remove("active"));
    productsPage.classList.add("active");
    if (!checkProductsPage) {
      await adminProduct();
    }
    checkProductsPage = true;
  });

  customers.addEventListener("click", function (e) {
    navigation.forEach((val) => val.classList.remove("active"));
    customersPage.classList.add("active");
    if (!checkCustomersPage) {
    }
    checkCustomersPage = true;
  });

  orders.addEventListener("click", function (e) {
    navigation.forEach((val) => val.classList.remove("active"));
    ordersPage.classList.add("active");
    if (!checkOrdersPage) {
    }
    checkOrdersPage = true;
  });

  password.addEventListener("click", function (e) {
    navigation.forEach((val) => val.classList.remove("active"));
    passwordPage.classList.add("active");
    if (!checkPasswordPage) {
    }
    checkPasswordPage = true;
  });

  messages.addEventListener("click", function (e) {
    navigation.forEach((val) => val.classList.remove("active"));
    messagesPage.classList.add("active");
    if (!checkMessagesPage) {
    }
    checkMessagesPage = true;
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
});
