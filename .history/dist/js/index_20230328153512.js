import spinner from "./spinner.js";
import head, { updateCart } from "./head.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const alertSuccess = $(".alert-primary");
const alertDanger = $(".alert-danger");
const User = JSON.parse(localStorage.getItem("loginUser"));
console.log("User:", User);
const userId = User?.data.idUser;
spinner(true);
let likes = [];

async function checkAdmin() {
  await fetch("http://localhost:5000/api/user/check")
    .then((data) => data.json())
    .then((data) => {
      if (data.success && data.data === 1) {
        window.location.replace = "./admin.html";
      }
    });
}

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

window.addEventListener("load", function () {
  head();
  const navPage = $(".pagination");
  const products = {
    pageInto: 1,
    searching: "",
    data: [
      {
        name: "Watch",
        img: "./productsImg/product-1.jpg",
        imgBg: "./productsImg/product-bg-1.jpg",
        price: 1200,
        state: "New",
      },
      {
        name: "Watch",
        img: "./productsImg/product-1.jpg",
        imgBg: "./productsImg/product-bg-1.jpg",
        price: 1200,
        state: "New",
      },
    ],
    HTTP: "http://localhost:5000/api",

    updateCart: function () {},

    page: function (pageNow = 1, limit = 8, countData) {
      const countPage = Math.ceil(countData / limit);
      navPage.innerHTML = `<li class="col prev"><i class="fa-solid fa-angles-left"></i></li>
            <li class="col  next"><i class="fa-solid fa-angles-right"></i></li>`;
      if (countPage <= 5) {
        for (let index = 0; index < countPage; index++) {
          const page = document.createElement("li");
          page.classList.add("col");
          page.classList.add("page");
          if (index === pageNow - 1) {
            page.classList.add("active");
          }
          page.setAttribute("data-page", `${index + 1}`);
          page.innerHTML = `<a href="#">${index + 1}</a>`;
          navPage.lastElementChild.insertAdjacentElement("beforebegin", page);
        }
      } else if (countPage >= 6 && pageNow <= 3) {
        const pageOneTwo =
          pageNow === 1
            ? ` <li class="col page active" data-page="1"><a href="#">1</a></li>
            <li class="col page" data-page="2"><a href="#">2</a></li>
            <li class="col page" data-page="3"><a href="#">3</a></li>`
            : pageNow === 2
            ? ` <li class="col page" data-page="1"><a href="#">1</a></li>
            <li class="col page active" data-page="2"><a href="#">2</a></li>
            <li class="col page" data-page="3"><a href="#">3</a></li>`
            : ` <li class="col page" data-page="1"><a href="#">1</a></li>
            <li class="col page" data-page="2"><a href="#">2</a></li>
            <li class="col page active" data-page="3"><a href="#">3</a></li>`;
        navPage.innerHTML = `
            <li class="col prev"><i class="fa-solid fa-angles-left"></i></li>
            ${pageOneTwo}
            
            <li class="col page" data-page="4"><a href="#">4</a></li>
            <li class="col page" data-page="5"><a href="#">5</a></li>
            <li class="col page last-page" data-page="${countPage}"><a href="#">${countPage}</a></li>
            <li class="col  next"><i class="fa-solid fa-angles-right"></i></li>
           `;
      } else if (countPage >= 6 && pageNow > 3 && pageNow < countPage - 2) {
        navPage.innerHTML = `
            <li class="col prev"><i class="fa-solid fa-angles-left"></i></li>
            <li class="col page " data-page="1"><a href="#">1</a></li>
            <li class="col page" data-page="${pageNow - 2}"><a href="#">${
          pageNow - 2
        }</a></li>
            <li class="col page" data-page="${pageNow - 1}"><a href="#">${
          pageNow - 1
        }</a></li>
            <li class="col page active" data-page="${pageNow}"><a href="#">${pageNow}</a></li>
            <li class="col page" data-page="${pageNow + 1}"><a href="#">${
          pageNow + 1
        }</a></li>
            <li class="col page" data-page="${pageNow + 2}"><a href="#">${
          pageNow + 2
        }</a></li>
            <li class="col page last-page" data-page="${countPage}"><a href="#">${countPage}</a></li>
            <li class="col  next"><i class="fa-solid fa-angles-right"></i></li>
           `;
      } else if (countPage >= 6 && pageNow >= countPage - 2) {
        const pageOneTwo =
          pageNow === countPage - 2
            ? ` <li class="col page active" data-page="${
                countPage - 2
              }"><a href="#">${countPage - 2}</a></li>
            <li class="col page" data-page="${countPage - 1}"><a href="#">${
                countPage - 1
              }</a></li>
            <li class="col page last-page" data-page="${countPage}"><a href="#">${countPage}</a></li>`
            : pageNow === countPage - 1
            ? ` <li class="col page" data-page="${countPage - 2}"><a href="#">${
                countPage - 2
              }</a></li>
            <li class="col page active" data-page="${
              countPage - 1
            }"><a href="#">${countPage - 1}</a></li>
            <li class="col page last-page " data-page="${countPage}"><a href="#">${countPage}</a></li>`
            : ` <li class="col page" data-page="${countPage - 2}"><a href="#">${
                countPage - 2
              }</a></li>
            <li class="col page" data-page="${countPage - 1}"><a href="#">${
                countPage - 1
              }</a></li>
            <li class="col page  last-page active" data-page="${countPage}"><a href="#">${countPage}</a></li>`;
        navPage.innerHTML = `
            <li class="col prev"><i class="fa-solid fa-angles-left"></i></li>
            <li class="col page" data-page="1"><a href="#">1</a></li>
            <li class="col page" data-page="${countPage - 4}"><a href="#">${
          countPage - 4
        }</a></li>
            <li class="col page data-page="${countPage - 3}"><a href="#">${
          countPage - 3
        }</a></li>
            ${pageOneTwo}
            <li class="col  next"><i class="fa-solid fa-angles-right"></i></li>
           `;
      }
    },

    product: async function (page = 1, search, limit = 8) {
      const checkSearch = search ? search : "";
      await fetch(`${this.HTTP}/product?page=${page}&limit=${limit}`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          search: checkSearch,
        },
      })
        .then((data) => data.json())
        .then((data) => {
          this.render(data);
          this.page(page, limit, data.length);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          spinner(false);
        });
    },

    render: function (data) {
      if (data.success) {
        const productHtml = data.data.map((val, index) => {
          let rating = "";
          for (let index = 0; index < 5; index++) {
            if (val.rating >= index + 1) {
              rating += `<li class="active"><i class="fa-sharp fa-solid fa-star"></i></li>`;
            } else {
              rating += `<li ><i class="fa-sharp fa-solid fa-star"></i></li>`;
            }
          }

          const checkLike = likes.findIndex((lik) => lik === val._id);
          let like = "";
          if (checkLike >= 0) {
            like = `<i class="fa-solid fa-thumbs-up active"></i>`;
          } else {
            like = `<i class="fa-solid fa-thumbs-up"></i>`;
          }
          const checkState = val.state
            ? `<li class="content">${val.state}</li>`
            : "";
          return `
            <div class="product col-6  col-lg-3" >
                    <div class="item">
                        <a class="detail-img" data-id=${val._id} href="#">
                            <img class="pd-img" src=${val.img} alt="">
                            <img class="pd-bg-img" src=${val.imgBg} alt="">
                        </a>
                        <button class="add-cart" data-id=${val._id}><i class="fa-solid fa-bag-shopping"></i></i> Add To Cart</button>
                        <ul class="product-action">
                            ${checkState}
                            <li class="detail" data-id=${val._id}><i class="fa-solid fa-eye"></i></li>
                        </ul>
                    </div>
                    <h3 class="product-name">
                        ${val.name}
                    </h3>
                    <p class="price">${val.price}$</p>
                    <div class="wrapper-rating">
                      <ul class="stars">
                          ${rating}
                      </ul>
                      <button data-id="${val._id}" class="like">${like}</button>
                  </div>
                </div>
        `;
        });

        $(".wrapper-products").innerHTML = productHtml.join("");
      } else {
        $(".wrapper-products").innerHTML = data.state;
      }
    },

    handlerEvent: function () {
      const _this = this;
      const pagination = $(".pagination");
      const wrapperDetail = $(".wrapper-products");
      const searchInput = $(".form-search");
      wrapperDetail.onclick = function (e) {
        e.preventDefault();
        const detailIcon = e.target.closest(".detail");
        const detailImg = e.target.closest(".detail-img");
        const btnAddCart = e.target.closest(".add-cart");
        const btnLike = e.target.closest(".like");
        const detail = detailIcon || detailImg;
        if (detail) {
          const idProduct = detail.dataset.id;
          window.location.href = `./detail.html?idpd=${idProduct}`;
        }

        if (btnLike) {
          const dataId = btnLike.dataset.id;
          console.log("dataId:", dataId);
          fetch(`${_this.HTTP}/like/user/${userId}`, {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authentication: User.token,
            },
          })
            .then((data) => data.json())
            .then((data) => {
              const indexLike = data.data.findIndex((val) => val === dataId);
              if (indexLike >= 0) {
                likes = data.data.filter((val) => val !== dataId);
              } else {
                likes = [...data.data, dataId];
              }
              console.log(likes);
              fetch(`${_this.HTTP}/updatelike/user/${userId}`, {
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  authentication: User.token,
                },
                method: "PUT",
                body: JSON.stringify({ likes }),
              })
                .then(() => {
                  _this.product(_this.pageInto, _this.searching);
                })
                .catch(() => {
                  alertFail();
                });
            })
            .catch(() => {
              alertFail();
            });
        }

        if (btnAddCart) {
          const dataProduct = btnAddCart.dataset.id;
          fetch(`${_this.HTTP}/product/${dataProduct}`)
            .then((data) => data.json())
            .then((data) => {
              // const cartsUser = JSON.parse(localStorage.getItem("cartsUser"));
              const { _id, imgBg, name, price, state } = data.data;
              const dataProduct = {
                _id,
                imgBg,
                name,
                price,
                state,
                total: price,
                quantity: 1,
              };
              fetch(`${_this.HTTP}/cart/user/${userId}`, {
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  authentication: User.token,
                },
              })
                .then((data) => data.json())
                .then((data) => {
                  const checkCarts = data.data.findIndex(
                    (val) => val._id === dataProduct._id
                  );
                  let carts = [];
                  if (checkCarts >= 0) {
                    carts = [...data.data];
                    carts[checkCarts].quantity++;
                    carts[checkCarts].total =
                      carts[checkCarts].price * carts[checkCarts].quantity;
                  } else {
                    carts = [...data.data, dataProduct];
                  }

                  fetch(`${_this.HTTP}/updatecart/user/${userId}`, {
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                      authentication: User.token,
                    },
                    method: "PUT",
                    body: JSON.stringify({ carts }),
                  })
                    .then(() => {
                      updateCart();
                      alertFullil();
                    })
                    .catch(() => {
                      alertFail();
                    });
                })
                .catch(() => {
                  alertFail();
                });
            })
            .catch(() => {
              alertFail();
            });
        }
      };

      searchInput.onsubmit = function (e) {
        e.preventDefault();
        const getInfo = this.elements["search"].value;
        _this.searching = getInfo;
        _this.pageInto = 1;
        _this.product(_this.pageInto, _this.searching);
      };

      pagination.onclick = function (e) {
        e.preventDefault();
        const page = e.target.closest(".page");
        const prev = e.target.closest(".prev");
        const next = e.target.closest(".next");
        if (prev) {
          if (_this.pageInto > 1) {
            _this.pageInto = _this.pageInto - 1;
            _this.product(_this.pageInto, _this.searching);
            spinner();
          }
        }
        if (next) {
          const countLastPage = this.children.length;
          const lastpage = Number(
            this.children[countLastPage - 2].dataset.page
          );
          if (_this.pageInto < lastpage) {
            _this.pageInto = _this.pageInto + 1;
            _this.product(_this.pageInto, _this.searching);
            spinner();
          }
        }
        if (page) {
          [...this.children].forEach((val) => {
            val.classList.remove("active");
          });
          _this.pageInto = Number(page.dataset.page);
          _this.product(_this.pageInto, _this.searching);
          spinner();
        }
      };
    },

    start: function () {
      // spinner(false);
      this.product(this.pageInto, this.searching);
      this.handlerEvent();
      // this.render(this.data);
    },
  };

  products.start();
});
