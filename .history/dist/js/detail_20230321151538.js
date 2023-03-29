const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

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
console.log(getSearchParameters());
function scrollInToProduct(params) {
  $(`.${params}.active`).scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}
function showProduct() {
  const getProductId = $(".product-item.active").children[0];
  console.log("getProductId:", getProductId.getAttribute("src"));
}
showProduct();
window.addEventListener("load", function () {
  head();

  const productMain = document.querySelector(".product-main");
  const productItems = document.querySelectorAll(".product-item");
  const nextBtn = document.querySelector(".btn-next");
  const prevBtn = document.querySelector(".btn-prev");

  const sliderItemWidth = productItems[0].offsetWidth;
  const slidesLength = productItems.length;
  let currentImg = 0;

  nextBtn.addEventListener("click", function (e) {
    $(".product-item.active").classList.remove("active");

    currentImg++;
    if (currentImg >= slidesLength) {
      currentImg = 0;
    }
    $(`.product-item.id-${currentImg}`).classList.add("active");
    scrollInToProduct("product-item");
  });

  prevBtn.addEventListener("click", function (e) {
    $(".product-item.active").classList.remove("active");
    currentImg--;
    if (currentImg < 0) {
      currentImg = slidesLength - 1;
    }
    $(`.product-item.id-${currentImg}`).classList.add("active");
    scrollInToProduct("product-item");
  });
});
