import spinner from "./spinner.js";
spinner(true);

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

function rederImgProduct(data) {
  const imgHtml = data.map((val, index) => {
    if (index === 0) {
      return `<div class="product-item active  id-${index}">
                  <img src="${val}"
                      alt="">
              </div>`;
    } else {
      return `<div class="product-item  id-${index}">
                  <img src="${val}"
                      alt="">
              </div>`;
    }
  });

  $(".product-main").innerHTML = imgHtml.join("");
}

function rederContentProduct(data) {
  const imgHtml = `
                  <div class="content">
                  <h2 class="product-name">
                    ${data.name}
                </h2>
                <div class="stars-rating">
                    <i class="fa-sharp fa-solid fa-star fa-flip"></i>
                    <i class="fa-sharp fa-solid fa-star fa-flip"></i>
                    <i class="fa-sharp fa-solid fa-star fa-flip"></i>
                    <i class="fa-sharp fa-solid fa-star fa-flip"></i>
                    <i class="fa-sharp fa-solid fa-star fa-flip"></i>
                </div>
                <div class="prise">
                    $${data.price}
                </div>
                <p class="describe">
                    architecto animi eius ex, error quos voluptate fugiat blanditiis fugit quam ea reiciendis
                    ipsam facilis.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iusto consequuntur iure quidem eligendi
                    veniam sunt fuga quod nisi consequatur. Illum, obcaecati voluptatum! Mollitia, obcaecati ipsam. A in
                    quos possimus?
                </p>
                </div>`;
  $(".detail-content").innerHTML = imgHtml;
}

window.addEventListener("load", function () {
  head();

  const { idpd } = getSearchParameters();
  fetch(`${http}product/${idpd}`)
    .then((data) => data.json())
    .then((data) => {
      console.log("data:", data);
      spinner(false);
      rederImgProduct(data.data?.detail);
      rederContentProduct(data.data);
      showProduct();
    })
    .catch((err) => {
      spinner(false);
      console.log(err);
    });
  const productMain = document.querySelector(".product-main");
  const nextBtn = document.querySelector(".btn-next");
  const prevBtn = document.querySelector(".btn-prev");
  productMain.addEventListener("click", function (e) {
    e.preventDefault();
  });
  let currentImg = 0;

  nextBtn.addEventListener("click", function (e) {
    const productItems = document.querySelectorAll(".product-item");
    const slidesLength = productItems.length;

    $(".product-item.active").classList.remove("active");

    currentImg++;
    if (currentImg >= slidesLength) {
      currentImg = 0;
    }
    $(`.product-item.id-${currentImg}`).classList.add("active");
    scrollInToProduct("product-item");
    showProduct();
  });

  prevBtn.addEventListener("click", function (e) {
    const productItems = document.querySelectorAll(".product-item");
    const slidesLength = productItems.length;
    $(".product-item.active").classList.remove("active");
    currentImg--;
    if (currentImg < 0) {
      currentImg = slidesLength - 1;
    }
    $(`.product-item.id-${currentImg}`).classList.add("active");
    scrollInToProduct("product-item");
    showProduct();
  });
});
