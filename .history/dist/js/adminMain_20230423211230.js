import { alertFullfill, alertFail } from "./alert.js";
import spinner from "./spinner.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const User = JSON.parse(localStorage.getItem("loginUser"));
const http = "http://localhost:5000/api/";
if (User?.token) {
  checkUser();
} else {
  window.location.replace("./index.html");
}
async function checkUser() {
  await fetch("http://localhost:5000/api/user/check", {
    headers: {
      "Content-Type": "application/json",
      authentication: User.token,
    },
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.success && data.data === 0) {
        window.location.replace("./index.html");
      }
    });
}

let page = 1;
let dataUrlDetail = [];
let getDataProduct = {};
function rederApplyProduct(data) {
  let rating = "";
  for (let index = 0; index < 5; index++) {
    if (data.rating >= index + 1) {
      rating += `<li class="active"><i class="fa-sharp fa-solid fa-star"></i></li>`;
    } else {
      rating += `<li ><i class="fa-sharp fa-solid fa-star"></i></li>`;
    }
  }

  const productHtml = `
            <div class="product col-12  " >
                    <div class="item">
                        <a class="detail-img"  href="#">
                            <img class="pd-img" src=${data.img} alt="">
                            <img class="pd-bg-img" src=${data.imgBg} alt="">
                        </a>
                        <button class="add-cart" ><i class="fa-solid fa-bag-shopping"></i></i> Add To Cart</button>
                        <ul class="product-action">
                        <li class="content"><i class="fa-solid fa-thumbs-up"></i></li>
                            
                            <li class="detail" ><i class="fa-solid fa-eye"></i></li>
                        </ul>
                    </div>
                    <h3 class="product-name">
                        ${data.name}
                    </h3>
                    <p class="price">$${data.price}</p>
                    <div class="wrapper-rating">
                      <ul class="stars">
                          ${rating}
                      </ul>
                      <button  class="like"><i class="fa-solid fa-thumbs-up"></i></button>
                  </div>
                </div>
        `;

  $(".wrapper-products-modal").innerHTML = productHtml;
}

function resetModal() {
  formSubmit.elements["name"].value = "";
  formSubmit.elements["url"].value = "";
  formSubmit.elements["urlBG"].value = "";
  formSubmit.elements["state"].value = "";
  formSubmit.elements["price"].value = "";
  formSubmit.elements["rating"].value = "";
  dataUrlDetail = [];
  getDataProduct = {};
  idUpdateNow = "";
  renderDetail(dataUrlDetail);
  $(".wrapper-products-modal").innerHTML = "";
}

function renderDetail(data) {
  const rnederData = data.map((val, index) => {
    return `<tr>
                <th>
                  <button data-id="${index}" class="btn-delete-detail"><i class="fa-sharp fa-solid fa-trash"></i></button>
                </th>
                <th>
                  <p class="text-url">${val}</p>
                </th>
              </tr>
             `;
  });
  $(".url-tiem").innerHTML = rnederData.join("");
}

function renderProducts(val) {
  const item = `
              <tr class="product-item">
                <th>
                  <a href="/detail.html?idpd=${val._id}" class="img" target="_blank">
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
                  ${val.state}
                </th>
                <th>${val.rating}</th>
                <th>${val.sold}</th>
                <th>
                  <div class="product-action">
                    <button class="delete" data-id="${val._id}">
                      <i class="fa-sharp fa-solid fa-xmark"></i>
                    </button>
                    <button class="edit" data-id="${val._id}">
                      <i class="fa-solid fa-pen"></i>
                    </button>
                  </div>

                </th>

              </tr>
  `;

  $(".product-items").insertAdjacentHTML("beforeend", item);
}

async function fetchData(http, page) {
  spinner(true);
  const response = await fetch(`${http}product?page=${page}&limit=6`);
  const products = await response.json().finally(spinner(false));
  console.log("products:", products);
  if (products?.data.length > 0 && Array.isArray(products.data)) {
    console.log(products.data);
    products.data.forEach((val) => renderProducts(val));
  }
}

window.addEventListener("load", function (e) {
  const menuToggle = $(".menu-toggle");
  const list = $$(".list");
  const nav = $(".navigation");

  menuToggle.onclick = (e) => {
    nav.classList.toggle("active");
  };

  [...list].forEach((val) =>
    val.addEventListener("click", function (e) {
      [...list].forEach((lis) => lis.classList.remove("active"));
      this.classList.add("active");
    })
  );

  fetchData(http, page++);
  const loadMore = $(".btn-load-more");

  loadMore.onclick = function () {
    fetchData(http, page++);
  };

  const addDetail = document.querySelector(".add-detail");
  const formSubmit = $(".wrapper-detail-all");
  const addProduct = $(".btn-add-product");
  const block = $(".block-view");
  const blockItem = $(".wrapper-block");
  // add new detail
  blockItem.coclick = (e) => {
    e.stopPropagation();
  };

  addDetail.addEventListener("click", function (e) {
    e.preventDefault();
    const urlInput = document.querySelector(".input-detail");
    const urlInputValue = urlInput.value;
    if (urlInputValue) {
      urlInput.value = "";
      dataUrlDetail.push(urlInputValue);
      renderDetail(dataUrlDetail);
    }
  });

  // submit add product

  formSubmit.addEventListener("submit", function (e) {
    e.preventDefault();
    const details = document.querySelectorAll(".text-url");
    const name = this.elements["name"].value;
    const img = this.elements["url"].value;
    const imgBg = this.elements["urlBG"].value;
    const state = this.elements["state"].value;
    const price = +this.elements["price"].value;
    const rating = +this.elements["rating"].value;
    const detailValue = [...details].map((val) => val.textContent);

    const data = {
      name,
      img,
      imgBg,
      state,
      price,
      rating,
      detail: detailValue,
    };
    getDataProduct = { ...data };
    rederApplyProduct(data);
  });

  // add product

  addProduct.addEventListener("click", function (e) {
    e.preventDefault();
    block.classList.add("show-block-view");
  });
  block.addEventListener("click", function (e) {
    block.classList.remove("show-block-view");
  });
});
