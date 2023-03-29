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
    page: async function (pageNow) {
      const getCountProducts = await fetch(
        "http://localhost:5000/api/count/product"
      )
        .then((data) => data.json())
        .then((data) => {
          const countPage = Math.ceil(data.length / 6);
          console.log("countPage:", countPage);
          navPage.innerHTML = `<li class="col prev"><i class="fa-solid fa-angles-left"></i></li>
            <li class="col  next"><i class="fa-solid fa-angles-right"></i></li>`;
          if (countPage <= 5) {
            for (let index = 0; index < countPage; index++) {
              const page = document.createElement("li");
              page.classList.add("col");
              if (index === 0) {
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
                ? ` <li class="col active" data-page="1"><a href="#">1</a></li>
            <li class="col" data-page="2"><a href="#">2</a></li>
            <li class="col" data-page="3"><a href="#">3</a></li>`
                : pageNow === 1
                ? ` <li class="col " data-page="1"><a href="#">1</a></li>
            <li class="col active" data-page="2"><a href="#">2</a></li>
            <li class="col" data-page="3"><a href="#">3</a></li>`
                : ` <li class="col " data-page="1"><a href="#">1</a></li>
            <li class="col " data-page="2"><a href="#">2</a></li>
            <li class="col active" data-page="3"><a href="#">3</a></li>`;
            navPage.innerHTML = `
            <li class="col prev"><i class="fa-solid fa-angles-left"></i></li>
            ${pageOneTwo}
            
            <li class="col" data-page="4"><a href="#">4</a></li>
            <li class="col" data-page="5"><a href="#">5</a></li>
            <li class="col">...</li>
            <li class="col  last-page data-page="${countPage}""><a href="#">${countPage}</a></li>
            <li class="col  next"><i class="fa-solid fa-angles-right"></i></li>
           `;
          }
          // else if (countPage >= 6 && pageNow > 2 && pageNow < countPage - 1) {
          //   navPage.innerHTML = `
          //   <li class="col prev"><i class="fa-solid fa-angles-left"></i></li>
          //   <li class="col active" data-page="1"><a href="#">1</a></li>
          //   <li class="col" data-page="2"><a href="#">2</a></li>
          //   <li class="col" data-page="3"><a href="#">3</a></li>
          //   <li class="col" data-page="4"><a href="#">4</a></li>
          //   <li class="col" data-page="5"><a href="#">5</a></li>
          //   <li class="col">...</li>
          //   <li class="col  last-page data-page="${countPage}""><a href="#">${countPage}</a></li>
          //   <li class="col  next"><i class="fa-solid fa-angles-right"></i></li>
          //  `;
          // }
        });
    },
    product: async function () {
      await fetch("http://localhost:5000/api/product?page=1&limit=2")
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
      this.page(3);
      // this.render(this.data);
    },
  };

  products.start();
});
