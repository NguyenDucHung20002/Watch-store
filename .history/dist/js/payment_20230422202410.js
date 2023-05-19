// spinner();
import spinner from "./spinner.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
import head from "./head.js";
localStorage.removeItem("Purchase");
const User = JSON.parse(localStorage.getItem("loginUser"));
if (!User) {
  window.location.replace("./index.html");
}
const products = JSON.parse(localStorage.getItem("checkout"));
let totalCart = 0;
renderProduct(products);
function renderProduct(data) {
  const products = data.map((val) => {
    totalCart += val.total;
    return `
    <div class="product">
        <div class="wrapper-product">
            <img src=${val.imgBg}
                alt="">
            <div class="content">
                <div class="name">${val.name}</div>
                <div class="category-quantity">
                    <div class="quantity">x${val.quantity}</div>
                </div>
            </div>
        </div>
        <div class="product-total">$${val.total}</div>
    </div>       
    `;
  });
  $(".subtotal-detail").innerHTML = `$${totalCart}`;
  $(".products").innerHTML = products.join("");
}

window.addEventListener("load", function () {
  head();

  const Submit = document.querySelector(".form-checkout-user");
  Submit.addEventListener("submit", function (e) {
    e.preventDefault();
    const fullName = this.elements["name"].value;
    const streetAddress = this.elements["address"].value;
    const city = this.elements["city-town"].value;
    const phone = this.elements["phone"].value;
    const email = this.elements["email"].value;
    const d = new Date();
    const datetime =
      d.getHours() +
      ":" +
      d.getMinutes() +
      " " +
      d.getDate() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getFullYear();
    const purchase = {
      fullName,
      streetAddress,
      city,
      phone,
      email,
      products,
      total: totalCart,
      datetime,
    };

    fetch(`${http}momo`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        total: totalCart,
        nextUrl: "http://127.0.0.1:5500/thanks.html",
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("data:", data);
        const dataPayment = { ...purchase, orderId: data?.data?.orderId };
        console.log("dataPayment:", dataPayment);
        localStorage.setItem("Purchase", JSON.stringify(dataPayment));
        window.location.replace(`${data.data?.payUrl}`);
      });
  });
});
