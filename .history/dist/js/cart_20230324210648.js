import spinner from "./spinner.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
import head from "./head.js";
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
  const productHtml = data.data.map((val, index) => {
    const checkState = val.state ? `<li class="content">${val.state}</li>` : "";
    return `
            <tr class="product-item">
                                <th>
                                    <a href="" class="img">
                                        <img src="http://127.0.0.1:5500/productsImg/product-bg-3.jpg" alt="">
                                    </a>

                                </th>
                                <th>
                                    <div class="name-product">
                                        Watch Longines L3
                                    </div>
                                </th>
                                <th>
                                    $2000
                                </th>
                                <th>
                                    <div class="quantiti-product">
                                        <button class="sub">-</button>
                                        <input class="quantity" data-id="0" type="number" value="1" min="1" max="100">
                                        <button class="plus">+</button>
                                    </div>
                                </th>
                                <th>$2000</th>
                                <th>
                                    <button class="delete">
                                        <i class="fa-sharp fa-solid fa-xmark"></i>
                                    </button>
                                </th>
                            </tr>
        `;
  });

  $(".add-to-cart").innerHTML = productHtml.join("");
}

async function getCart(userId, token) {
  await fetch(`${http}cart/user/${userId}`, {
    headers: { authentication: token },
  })
    .then((data) => data.json())
    .then((data) => {
      console.log("data:", data);
    });
}

window.addEventListener("load", function () {
  head();
  const User = JSON.parse(localStorage.getItem("loginUser"));
  console.log("User:", User);
  //handle quantiy
  const alertDanger = $(".alert-danger");
  const addCart = $("#add-to-cart");
  addCart.addEventListener("click", function (e) {
    const sub = e.target.closest(".sub");
    const plus = e.target.closest(".plus");
    const quantityInput = e.target.closest(".quantity");

    // if (sub) {
    //   if (quantity > 1) {
    //     quantity--;
    //     quantityInput.value = quantity;
    //   }
    // }
    // if (plus) {
    //   if (quantity < 100) {
    //     quantity++;
    //     quantityInput.value = quantity;
    //   }
    // }
    if (quantityInput) {
      const index = quantityInput.dataset.id;
      console.log("index:", index);
      let quantity = +quantityInput.value;
      if (quantity >= 1 && quantity <= 100) {
        quantity = +quantityInput.value;
      } else {
        quantityInput.value = quantity;
        alertDanger.children[0].textContent = "The input must be less than 100";
        alertDanger.classList.add("get-active");
        setTimeout(() => {
          alertDanger.classList.remove("get-active");
        }, 2000);
      }
    }
  });

  start();
});
