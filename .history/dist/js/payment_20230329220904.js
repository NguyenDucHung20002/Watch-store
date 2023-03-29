// spinner();
import spinner from "./spinner.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "https://api-do-an-co-so.vercel.app/api/";
import head from "./head.js";
const User = JSON.parse(localStorage.getItem("loginUser"));
if (!User) {
  //   window.location.replace("./index.html");
}
const carts = JSON.parse(localStorage.getItem("checkout"));
let totalCart = 0;
renderProduct(carts);
function renderProduct(data) {
  const carts = data.map((val) => {
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
  $(".products").innerHTML = carts.join("");
}

window.addEventListener("load", function () {
  head();

  const Submit = document.querySelector(".form-checkout-user");
  Submit.addEventListener("submit", function (e) {
    e.preventDefault();
    const fullName = this.elements["name"].value;
    const streetAdress = this.elements["address"].value;
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
      streetAdress,
      city,
      phone,
      email,
      carts,
      total: totalCart,
      datetime,
    };
    console.log("purchase:", purchase);

    fetch(`${http}purchase`, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        authentication: User.token,
      },
      body: JSON.stringify({ purchase }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.success) {
          fetch(`${http}statistic`)
            .then((data) => data.json())
            .then((data) => {
              if (data.success) {
                const order = data.data[0].order + res.data.length;
                const revenue = data.data[0].revenue + totalCart;
                fetch(`${http}statistic`, {
                  method: "PUT", // or 'PUT'
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ order, revenue }),
                })
                  .then((data) => data.json())
                  .then((data) => {
                    fetch(`${http}/updatecart/user/${User.data?.idUser}`, {
                      headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        authentication: User.token,
                      },
                      method: "PUT",
                      body: JSON.stringify({ carts: [] }),
                    }).then(() => {
                      window.location.replace("./thanks.html");
                    });
                  });
              }
            });
        }
      });
  });
});
