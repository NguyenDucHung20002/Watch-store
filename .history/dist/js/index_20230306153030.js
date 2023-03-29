import debounceFn from "./debouceFn.js";

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

  window.addEventListener(
    "scroll",
    debounceFn(function (e) {
      const windowScroll = window.pageYOffset;
      if (windowScroll >= 120) {
        eScrollTop.classList.add("active-scroll-top");
      } else {
        eScrollTop.classList.remove("active-scroll-top");
      }
    }, 100)
  );

  eScrollTop.onclick = function (e) {
    window.offsetTop = 0;
  };
});
