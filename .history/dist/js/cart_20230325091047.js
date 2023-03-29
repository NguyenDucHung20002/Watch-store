spinner();
import spinner from "./spinner.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
import head from "./head.js";

let dataCart = [];
const alertSuccess = $(".alert-primary");
const alertDanger = $(".alert-danger");
const cartQuantities = $(".quantities-cart");
function alertFullil() {
  alertSuccess.children[0].textContent = `Add successfuly`;
  alertSuccess.classList.add("get-active");
  setTimeout(() => {
    alertSuccess.classList.remove("get-active");
  }, 3000);
}

function alertFail() {
  alertDanger.children[0].textContent = `Something fail!`;
  alertDanger.classList.add("get-active");
  setTimeout(() => {
    alertDanger.classList.remove("get-active");
  }, 3000);
}

function renderCart(data) {
  let total = 0;
  const productHtml = data.data.map((val, index) => {
    total += val.total;
    return `
            <tr class="product-item">
                                <th>
                                    <a data-id="${val._id}" href="" class="img">
                                        <img src="${val.imgBg}" alt="">
                                    </a>

                                </th>
                                <th>
                                    <div class="name-product">
                                        ${val.name}
                                    </div>
                                </th>
                                <th>
                                    $${val.price}
                                </th>
                                <th>
                                    <div class="quantiti-product">
                                        <button data-id="${index}" class="sub">-</button>
                                        <input class="quantity" data-id="${index}" type="number" value="${val.quantity}" min="1" max="100">
                                        <button data-id="${index}" class="plus">+</button>
                                    </div>
                                </th>
                                <th>$${val.total}</th>
                                <th>
                                    <button data-id="${val._id}" class="delete">
                                        <i class="fa-sharp fa-solid fa-xmark"></i>
                                    </button>
                                </th>
                            </tr>
        `;
  });
  $(".total").innerHTML = `Total: $${total}`;
  $("#add-to-cart").innerHTML = productHtml.join("");
}

async function getCart(userId, token) {
  await fetch(`${http}cart/user/${userId}`, {
    headers: { authentication: token },
  })
    .then((data) => data.json())
    .then((data) => {
      dataCart = [...data.data];

      renderCart(data);
    })
    .finally(() => {
      spinner(false);
    });
}

window.addEventListener("load", function () {
  head();
  const User = JSON.parse(localStorage.getItem("loginUser"));
  console.log("User:", User);
  getCart(User.data?.idUser, User.token);

  //handle quantiy
  const alertDanger = $(".alert-danger");
  const addCart = $("#add-to-cart");
  const updateCart = $(".update-cart");
  const btnDeleteCartAll = $(".detele-all");
  const modelDeleteAll = $(".model-detele-all");

  btnDeleteCartAll.addEventListener("click", function (e) {
    modelDeleteAll.classList.add("active");
    setTimeout(() => {
      modelDeleteAll.classList.remove("active");
    }, 6000);
  });
  modelDeleteAll.addEventListener("click", function (e) {
    const btnYes = e.target.closest("#yes");
    const btnNo = e.target.closest("#no");

    if (btnNo) {
      this.classList.remove("active");
    }

    if (btnYes) {
      this.classList.remove("active");
      fetch(`${http}/updatecart/user/${User.data?.idUser}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authentication: User.token,
        },
        method: "PUT",
        body: JSON.stringify({ carts: [] }),
      })
        .then((data) => data.json())
        .then((data) => {
          renderCart(data);
          cartQuantities.innerHTML = "0";
          dataCart = [];
        })
        .catch(() => {
          alertFail();
        });
    }
  });

  updateCart.addEventListener("click", function (e) {
    if (dataCart.length !== 0) {
      fetch(`${http}/updatecart/user/${User.data?.idUser}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authentication: User.token,
        },
        method: "PUT",
        body: JSON.stringify({ carts: dataCart }),
      })
        .then((data) => data.json())
        .then((data) => {
          renderCart(data);
        })
        .catch(() => {
          alertFail();
        });
    }
  });
  addCart.addEventListener("change", function (e) {
    const quantityInput = e.target.closest(".quantity");
    if (quantityInput) {
      const index = quantityInput.dataset.id;
      if (+quantityInput.value >= 1 && +quantityInput.value <= 100) {
        dataCart[index].quantity = +quantityInput.value;
        dataCart[index].total =
          dataCart[index].price * dataCart[index].quantity;
      } else {
        quantityInput.value = dataCart[index].quantity;
        alertDanger.children[0].textContent = "The input must be less than 100";
        alertDanger.classList.add("get-active");
        setTimeout(() => {
          alertDanger.classList.remove("get-active");
        }, 2000);
      }
    }
  });

  addCart.addEventListener("click", function (e) {
    const sub = e.target.closest(".sub");
    const plus = e.target.closest(".plus");
    const btnDelete = e.target.closest(".delete");

    if (btnDelete) {
      const getDelId = btnDelete.dataset.id;
      const delProduct = dataCart.filter((val) => val._id !== getDelId);
      if (delProduct) {
        fetch(`${http}/updatecart/user/${User.data?.idUser}`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authentication: User.token,
          },
          method: "PUT",
          body: JSON.stringify({ carts: delProduct }),
        })
          .then((data) => data.json())
          .then((data) => {
            renderCart(data);
            dataCart = delProduct;
            cartQuantities.innerHTML = `${dataCart.length}`;
          })
          .catch(() => {
            alertFail();
          });
      }
    }

    if (sub) {
      const index = sub.dataset.id;
      if (dataCart[index].quantity > 1) {
        dataCart[index].quantity--;
        dataCart[index].total =
          dataCart[index].price * dataCart[index].quantity;
        sub.nextElementSibling.value = dataCart[index].quantity;
      }
    }
    if (plus) {
      const index = plus.dataset.id;
      if (dataCart[index].quantity < 100) {
        dataCart[index].quantity++;
        dataCart[index].total =
          dataCart[index].price * dataCart[index].quantity;
        plus.previousElementSibling.value = dataCart[index].quantity;
      }
    }
  });
});
