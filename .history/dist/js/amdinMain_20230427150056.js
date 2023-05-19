import { alertFullfill, alertFail } from "./alert.js";
import spinner from "./spinner.js";
import adminProduct from "./adminProduct.js";
import adminDashboard from "./adminDashboard.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const User = JSON.parse(localStorage.getItem("loginUser"));
console.log("User:", User);
const http = "http://localhost:5000/api/";
spinner(false);
if (User?.token) {
  checkUser();
} else {
  window.location.replace("./user.html");
}
async function checkUser() {
  try {
    await fetch(`${http}user/check/${User?.token}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.success && data.data === 0) {
          window.location.replace("./index.html");
        }
        if (!data.success && data.err) {
          window.location.replace("./user.html");
        }
      })
      .catch((err) => {
        alertFail();
      });
  } catch (error) {
    console.log("error:", error);
  }
}

window.addEventListener("load", async function (e) {
  await adminDashboard();
  const menuToggle = $(".menu-toggle");
  const list = $$(".list");
  const nav = $(".navigation");

  let checkProductsPage = false;
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
