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

window.addEventListener("load", function () {
  head();
  const User = JSON.parse(localStorage.getItem("loginUser"));
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
      const index = this.dataset.id;
      console.log("index:", index);
      let quantity = +this.value;
      if (quantity >= 1 && quantity <= 100) {
        quantity = +this.value;
      } else {
        this.value = quantity;
        alertDanger.children[0].textContent = "The input must be less than 100";
        alertDanger.classList.add("get-active");
        setTimeout(() => {
          alertDanger.classList.remove("get-active");
        }, 2000);
      }
    }
  });
});
