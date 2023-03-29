const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

spinner(false);
import head from "./head.js";

window.addEventListener("load", function () {
  head();
});
