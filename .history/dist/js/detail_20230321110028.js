const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

import head from "./head.js";

window.addEventListener("load", function () {
  head();
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

  const sliderMain = document.querySelector(".product-img");
  console.log("sliderMain:", sliderMain);
  const sliderItems = document.querySelectorAll(".product-item");
  console.log("sliderItems:", sliderItems);
  const nextBtn = document.querySelector(".btn-next");
  console.log("nextBtn:", nextBtn);
  const prevBtn = document.querySelector(".btn-prev");
  console.log("prevBtn:", prevBtn);
});
