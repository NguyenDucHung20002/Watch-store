// spinner();
import spinner from "./spinner.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
import head from "./head.js";
const User = JSON.parse(localStorage.getItem("loginUser"));
if (!User) {
  //   window.location.replace("./index.html");
}
const carts = JSON.parse(localStorage.getItem("checkout"));
renderProduct(carts);
function renderProduct(data) {
  let totalCart = 0;
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

    const purchase = {
      fullName,
      streetAdress,
      city,
      phone,
      email,
      carts,
    };
  //   fetch(`${http}purchase`, {
  //     method: "PUT", // or 'PUT'
  //     headers: {
  //       "Content-Type": "application/json",
  //       authentication: User.token,
  //     },
  //     body: JSON.stringify({ purchase }),
  //   })
  //     .then((data) => data.json())
  //     .then((res) => {
  //       if (res.success) {
  //         console.log(data);
  //         fetch(`${http}statistic`)
  //           .then((data) => data.json())
  //           .then((data) => {
  //             if (data.success) {
  //               const order = data.data[0].order + res.data.length;
  //               const revenue = data.data[0].revenue + res.data.length;
  //               fetch(`${http}statistic`, {
  //                 method: "PUT", // or 'PUT'
  //                 headers: {
  //                   "Content-Type": "application/json",
  //                 },
  //                 body: JSON.stringify({ users }),
  //               });
  //             }
  //           });
  //       }
  //     });
  // });
});
