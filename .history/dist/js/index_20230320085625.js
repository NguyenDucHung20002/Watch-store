spinner(true);
const User = JSON.parse(localStorage.getItem("loginUser"));
localStorage.removeItem("loginUser");
console.log("User:", User);
import spinner from "./spinner.js";
import head from "./head.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
window.addEventListener("load", function () {
  if (User) {
    const showUser = $(".user");
    showUser.innerHTML = `<i class="fa-solid fa-user"></i> ${User.data?.username}
    `;
  }
  head();
  const navPage = $(".pagination");
  const products = {
    pageInto: 1,
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
    page: async function (pageNow = 1, limit = 8) {
      await fetch("http://localhost:5000/api/count/product")
        .then((data) => data.json())
        .then((data) => {
          const countPage = Math.ceil(data.length / limit);
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
              navPage.lastElementChild.insertAdjacentElement(
                "beforebegin",
                page
              );
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
                ? ` <li class="col page" data-page="${
                    countPage - 2
                  }"><a href="#">${countPage - 2}</a></li>
            <li class="col page active" data-page="${
              countPage - 1
            }"><a href="#">${countPage - 1}</a></li>
            <li class="col page last-page " data-page="${countPage}"><a href="#">${countPage}</a></li>`
                : ` <li class="col page" data-page="${
                    countPage - 2
                  }"><a href="#">${countPage - 2}</a></li>
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
        });
    },
    product: async function (page = 1, limit = 8) {
      await fetch(
        `http://localhost:5000/api/product?page=${page}&limit=${limit}`
      )
        .then((data) => data.json())
        .then((data) => {
          this.render(data);
          spinner(false);
        })
        .catch((err) => {
          spinner(false);
          console.log(err);
        });
    },

    render: function (product) {
      const productHtml = product.map((val, index) => {
        const checkState = val.state
          ? `<li class="content">${val.state}</li>`
          : "";
        return `
            <div class="product col-6  col-lg-3" >
                    <div class="item">
                        <a data-id=${val._id} href="#">
                            <img class="pd-img" src=${val.img} alt="">
                            <img class="pd-bg-img" src=${val.imgBg} alt="">
                        </a>
                        <button class="add-cart" data-id=${val._id}><i class="fa-solid fa-bag-shopping"></i></i> Add To Cart</button>
                        <ul class="product-action">
                            ${checkState}
                            <li class="detail" data-id=${index}><i class="fa-solid fa-eye"></i></li>
                        </ul>
                    </div>
                    <h3 class="product-name">
                        ${val.name}
                    </h3>
                    <p class="price">${val.price}$</p>
                </div>
        `;
      });

      $(".wrapper-products").innerHTML = productHtml.join("");
    },
    handlerEvent: function () {
      const _this = this;
      const pagination = $(".pagination");
      pagination.onclick = function (e) {
        e.preventDefault();
        const page = e.target.closest(".page");
        const prev = e.target.closest(".prev");
        const next = e.target.closest(".next");
        // console.log("lastPageElement:", lastPageElement);
        // const lastpage = lastPageElement.dataset.page;
        // console.log("lastpage:", lastpage);
        if (prev) {
          if (_this.pageInto > 1) {
            _this.pageInto = _this.pageInto - 1;
            spinner();
            _this.product(_this.pageInto);
            _this.page(_this.pageInto);
          }
        }
        if (next) {
          const countLastPage = this.children.length;
          const lastpage = Number(
            this.children[countLastPage - 2].dataset.page
          );
          if (_this.pageInto < lastpage) {
            _this.pageInto = _this.pageInto + 1;
            spinner();
            _this.product(_this.pageInto);
            _this.page(_this.pageInto);
          }
        }
        if (page) {
          [...this.children].forEach((val) => {
            val.classList.remove("active");
          });
          _this.pageInto = Number(page.dataset.page);
          spinner();
          _this.product(_this.pageInto);
          _this.page(_this.pageInto);
        }
      };
    },

    start: function () {
      // spinner(false);
      this.product(this.pageInto, 8);
      this.page(this.pageInto, 8);
      this.handlerEvent();
      // this.render(this.data);
    },
  };

  products.start();
});
