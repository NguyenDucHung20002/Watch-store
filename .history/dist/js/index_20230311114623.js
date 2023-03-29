spinner(true);
import debounceFn from "./debouceFn.js";
import spinner from "./spinner.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

window.addEventListener("load", function () {
  const wrapperNav = document.querySelector(".wrapper-nav");
  const navIcon = document.querySelectorAll(".nav-icon");
  const iconActived = document.querySelector(".active");
  const heightActive = iconActived.offsetWidth;
  const activeScroll = document.querySelector(".animation");
  activeScroll.style.width = `${heightActive}px`;

  [...navIcon].forEach((val) =>
    val.addEventListener("mouseenter", function (e) {
      const getLocate = this.offsetLeft;
      const getWidth = this.offsetWidth;
      activeScroll.style = `left: ${getLocate}px; width: ${getWidth}px`;
    })
  );

  wrapperNav.addEventListener("mouseleave", function (e) {
    const heightActive = iconActived.offsetWidth;
    const locateActive = iconActived.offsetLeft;
    activeScroll.style = `width: ${heightActive}px; left: ${locateActive}px`;
  });

  const eScrollTop = $(".scroll-top");
  const formSearch = $(".form-search");
  const header = $(".header");
  const navTop = $(".nav-top");
  const windowScroll = window.pageYOffset;
  if (windowScroll >= 120) {
    eScrollTop.classList.add("active-scroll-top");
  }
  if (windowScroll >= 100) {
    formSearch.classList.remove("form-scroll");
    navTop.classList.add("nav-down");
    header.style.paddingTop = "74px";
  }

  window.addEventListener(
    "scroll",
    debounceFn(function (e) {
      const windowScroll = window.pageYOffset;
      if (windowScroll >= 120) {
        eScrollTop.classList.add("active-scroll-top");
      } else {
        eScrollTop.classList.remove("active-scroll-top");
      }
      if (windowScroll >= 100) {
        formSearch.classList.remove("form-scroll");
        navTop.classList.add("nav-down");
        header.style.paddingTop = "74px";
      } else {
        formSearch.classList.add("form-scroll");
        navTop.classList.remove("nav-down");
        header.style.paddingTop = "0";
      }
    }, 100)
  );
  eScrollTop.onclick = function (e) {
    document.documentElement.scrollTop = 0;
  };
  const navPage = $(".pagination");
  console.log("navPage:", navPage);
  const products = {
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
    page: async function () {
      const getCountProducts = await fetch(
        "http://localhost:5000/api/count/product"
      )
        .then((data) => data.json())
        .then((data) => {
          const countPage = Math.ceil(data.length / 9);
          console.log("countPage:", countPage);
          if (countPage <= 5) {
            for (let index = 0; index < 5; index++) {
              const page = document.createElement("li");
              page.classList.add("col");
              page.setAttribute("data-page", `${index}`);
              page.innerHTML = `<a href="">${index + 1}</a>`;
              navPage.lastElementChild.insertAdjacentElement(
                "beforebegin",
                page
              );
            }
          }
          // for (let index = 0; index < 5; index++) {}
          // console.log("countPage:", countPage);
          // lastPage.innerHTML = `<a href="">${countPage}</a>`;
        });
    },
    product: async function () {
      await fetch("http://localhost:5000/api/product?page=1&limit=9")
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

    start: function () {
      // spinner(false);
      this.product();
      this.page();
      // this.render(this.data);
    },
  };

  products.start();
});
