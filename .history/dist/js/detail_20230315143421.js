const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
import debounceFn from "./debouceFn.js";
import spinner from "./spinner.js";
spinner(false);
import head from "./head.js";

window.addEventListener("load", function () {
  head();
});
