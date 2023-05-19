import { alertFullfill, alertFail } from "./alert.js";
import spinner from "./spinner.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const User = JSON.parse(localStorage.getItem("loginUser"));
console.log("User:", User);
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
let idUpdateNow = "";
let searching = "";
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
  const formSubmit = $(".wrapper-detail-all");
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

async function addProduct(data) {
  try {
    await fetch(`${http}/product`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        authentication: User.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.success) {
          alertFail();
        } else {
          alertFullfill("Add Succeed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    alertFail();
  }
}

async function editProduct(data) {
  console.log("data:", data._id);
  const res = await fetch(`${http}product/${data._id}`, {
    method: "PUT", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      authentication: User.token,
    },
    body: JSON.stringify(data),
  });

  const checkDone = await res.json();
  console.log("checkDone:", checkDone);
}

function showModelEdit(dataproduct) {
  const formSubmit = $(".wrapper-detail-all");
  const btnAddData = $(".add-data");
  const btnEditData = $(".edit-data");
  idUpdateNow = dataproduct._id;
  getDataProduct = { ...dataproduct };
  formSubmit.elements["name"].value = dataproduct.name;
  formSubmit.elements["url"].value = dataproduct.img;
  formSubmit.elements["urlBG"].value = dataproduct.imgBg;
  formSubmit.elements["state"].value = dataproduct.state;
  formSubmit.elements["price"].value = dataproduct.price;
  formSubmit.elements["rating"].value = dataproduct.rating;
  dataUrlDetail = [...dataproduct.detail];
  renderDetail(dataUrlDetail);
  rederApplyProduct(getDataProduct);
  btnAddData.classList.remove("active");
  btnEditData.classList.add("active");
}

async function fetchData(http, page, searching) {
  spinner(true);
  const checkSearch = searching || "";
  const url = `${http}product?page=${page}&limit=6`;
  const response = await fetch(url, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      search: checkSearch,
    },
  });
  const products = await response.json().finally(spinner(false));
  if (products?.data.length > 0 && Array.isArray(products.data)) {
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

  fetchData(http, page++, searching);
  const loadMore = $(".btn-load-more");

  loadMore.onclick = function () {
    fetchData(http, page++, searching);
  };

  const addDetail = document.querySelector(".add-detail");
  const formSubmit = $(".wrapper-detail-all");
  const btnAddProduct = $(".btn-add-product");
  const block = $(".block-view");
  const blockItem = $(".wrapper-block");
  const addData = $(".add-data");
  const editData = $(".edit-data");
  const urlTable = $(".url-tiem");
  const btnResetModel = $(".reset");
  const search = $(".search-product");
  const productItems = $(".product-items");

  //handle Edit
  productItems.addEventListener("click", async function (e) {
    const btnEditId = e.target.closest(".edit");

    if (btnEditId) {
      const getEditId = btnEditId.dataset.id;
      const getEditData = await fetch(`${http}product/${getEditId}`);
      const editData = await getEditData.json();
      if (editData.success) {
        block.classList.add("show-block-view");
        showModelEdit(editData.data);
      } else {
        alertFail();
      }
    }
  });

  //Edit
  editData.addEventListener("click", function (e) {
    if (getDataProduct) {
      editProduct(getDataProduct);
    }
  });

  // searching
  search.addEventListener("submit", function (e) {
    e.preventDefault();
    searching = this.elements["search"].value;
    $(".product-items").innerHTML = "";
    fetchData(http, (page = 1), searching);
  });

  //add to database
  addData.addEventListener("click", async function () {
    if (getDataProduct) {
      await addProduct(getDataProduct);
      resetModal();
      $(".product-items").innerHTML = "";
      await fetchData(http, (page = 1));
    }
  });

  // block event parent
  blockItem.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  //add array detail
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

  //delete array detail
  urlTable.addEventListener("click", function (e) {
    e.preventDefault();
    const btnDelDetail = e.target.closest(".btn-delete-detail");
    const dataDelId = btnDelDetail.dataset.id;
    dataUrlDetail = dataUrlDetail.filter((val, index) => index != dataDelId);
    renderDetail(dataUrlDetail);
  });

  // get data from form

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

  // btn resset model

  btnResetModel.addEventListener("click", function (e) {
    e.preventDefault();
    resetModal();
  });

  // show model

  btnAddProduct.addEventListener("click", function (e) {
    e.preventDefault();
    block.classList.add("show-block-view");
    addData.classList.add("active");
    editData.classList.remove("active");
  });

  //hide model
  block.addEventListener("click", function (e) {
    block.classList.remove("show-block-view");
  });
});
