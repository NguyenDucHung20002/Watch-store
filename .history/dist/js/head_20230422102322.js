const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
import debounceFn from "./debouceFn.js";
const User = JSON.parse(localStorage.getItem("loginUser"));
console.log("User:", User);
const HTTP = "http://localhost:5000/api";
export function updateCart() {
  const cartQuantities = $(".quantities-cart");
  fetch(`${HTTP}/cart/user/${User.data.idUser}`, {
    headers: {
      authentication: User.token,
    },
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.success) {
        const product = data.data.map((val) => val._id);
        fetch(`${HTTP}/check/product`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authentication: User.token,
          },
          method: "POST",
          body: JSON.stringify({ _id: product }),
        })
          .then((data) => data.json())
          .then((res) => {
            if (res.data.length > 0) {
              const carts = res.data;
              fetch(`${HTTP}/updatecart/user/${User.data?.idUser}`, {
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  authentication: User.token,
                },
                method: "PUT",
                body: JSON.stringify({ carts }),
              })
                .then((data) => data.json())
                .then((data) => {
                  cartQuantities?.innerHTML = data?.data.length;
                });
            }
          });
      } else {
        localStorage.removeItem("loginUser");
        logoff.click();
      }
    });
}

export default function head() {
  const wrapperNav = document.querySelector(".wrapper-nav");
  const navIcon = document.querySelectorAll(".nav-icon");
  const iconActived = document.querySelector(".nav-icon.active");
  const heightActive = iconActived.offsetWidth;
  const activeScroll = document.querySelector(".animation");
  const goRegister = document.querySelector(".register");
  activeScroll.style.width = `${heightActive}px`;
  if (User) {
    const showUser = $(".user");
    showUser.innerHTML = `<i class="fa-solid fa-user"></i> ${User.data?.username}
    <ul class="dropdown-user">
        <li class="profile">Your profile</li>
        <li class="purchase"><a href="./puchase.html">Purchase</a></li>
        <li class="logout">Logout</li>
    </ul>
    `;

    updateCart();
    const logoff = $(".logout");
    logoff.addEventListener("click", function () {
      localStorage.removeItem("loginUser");
      window.location.reload();
    });
  }

  if (goRegister) {
    goRegister.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.setItem("register", JSON.stringify(true));
      window.location.href = "./user.html";
    });
  }

  [...navIcon].forEach((val) =>
    val.addEventListener("mouseenter", function (e) {
      const getLocate = this.offsetLeft;
      const getWidth = this.offsetWidth;
      activeScroll.style = `left: ${getLocate}px; width: ${getWidth}px`;
    })
  );

  [...navIcon].forEach((val) =>
    val.addEventListener("mouseleave", function (e) {
      const iconActived = document.querySelector(".nav-icon.active");
      const getLocate = iconActived.offsetLeft;
      const getWidth = iconActived.offsetWidth;
      activeScroll.style = `left: ${getLocate}px; width: ${getWidth}px`;
    })
  );

  [...navIcon].forEach((val) =>
    val.addEventListener("click", function (e) {
      [...navIcon].forEach((val) => {
        val.classList.remove("active");
      });

      this.classList.add("active");
    })
  );

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
}
