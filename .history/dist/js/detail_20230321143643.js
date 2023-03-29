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
  setTimeout(() => {
    $(`.${params}.active`).scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 200);
}
window.addEventListener("load", function () {
  head();

  const productMain = document.querySelector(".product-main");
  const productItems = document.querySelectorAll(".product-item");
  const nextBtn = document.querySelector(".btn-next");
  const prevBtn = document.querySelector(".btn-prev");

  const sliderItemWidth = productItems[0].offsetWidth;
  const slidesLength = productItems.length;
  let currentImg = 1;

  nextBtn.addEventListener("click", function (e) {
    // const idActive = $(".product-item.active");
    // idActive.classList.remove("active");
    currentImg++;
    if (currentImg >= slidesLength) {
      currentImg = 1;
    }
    console.log(currentImg);
  });

  prevBtn.addEventListener("click", function (e) {});
  scrollInToProduct("product-item");
});
