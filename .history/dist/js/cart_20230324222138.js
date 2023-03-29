spinner();
import spinner from "./spinner.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
import head from "./head.js";

let dataCart = [];

function getSearchParameters() {
  var prmstr = window.location.search.substr(1);
  return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}
function transformToAssocArray(prmstr) {
  var params = {};
  var prmarr = prmstr.split("&");
  for (var i = 0; i < prmarr.length; i++) {
    var tmparr = prmarr[i].split("=");
    params[tmparr[0]] = tmparr[1];
  }
  return params;
}
function scrollInToProduct(params) {
  $(`.${params}.active`).scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}
function showProduct() {
  const getProductId = $(".product-item.active").children[0];
  const getProductSrc = getProductId.getAttribute("src");
  $(".action-slider-show").setAttribute("src", getProductSrc);
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
      console.log("data:", data);
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

  updateCart.addEventListener("click", function (e) {
    console.log(dataCart);
    // fetch(`${_this.HTTP}/updatecart/user/${userId}`, {
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //     authentication: User.token,
    //   },
    //   method: "PUT",
    //   body: JSON.stringify({ carts }),
    // })
    //   .then(() => {
    //     updateCart();
    //     alertFullil();
    //   })
    //   .catch(() => {
    //     alertFail();
    //   });
  });
  addCart.addEventListener("change", function (e) {
    const quantityInput = e.target.closest(".quantity");
    console.log("quantityInput:", +quantityInput.value);
    if (quantityInput) {
      const index = quantityInput.dataset.id;
      if (+quantityInput.value >= 1 && +quantityInput.value <= 100) {
        dataCart[index].quantity = +quantityInput.value;
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
    if (sub) {
      const index = sub.dataset.id;
      if (dataCart[index].quantity > 1) {
        dataCart[index].quantity--;
        sub.nextElementSibling.value = dataCart[index].quantity;
      }
    }
    if (plus) {
      const index = plus.dataset.id;
      if (dataCart[index].quantity < 100) {
        dataCart[index].quantity++;
        plus.previousElementSibling.value = dataCart[index].quantity;
      }
    }
  });
});
