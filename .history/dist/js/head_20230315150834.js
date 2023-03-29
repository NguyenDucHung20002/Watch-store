const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
import debounceFn from "./debouceFn.js";
import spinner from "./spinner.js";

export default function head() {
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
}
