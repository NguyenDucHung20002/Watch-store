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
    console.log("getWidth:", getWidth);
    activeScroll.style = `left: ${getLocate}px; width: ${getWidth}px`;
  })
);

wrapperNav.addEventListener("mouseleave", function (e) {
  const heightActive = iconActived.offsetWidth;
  const locateActive = iconActived.offsetLeft;
  activeScroll.style = `width: ${heightActive}px; left: ${locateActive}px`;
});

const test = [1, 5, 3, 5, 11, 8, 89, 3, 4];
console.log(test.sort((a, b) => (a < b ? -1 : 1)));
