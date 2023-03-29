export default function adminModal(dataProduct) {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  const http = "http://localhost:5000/";
  const User = JSON.parse(localStorage.getItem("loginUser"));

  const statistical = $(".nav-statistical");
  const products = $(".nav-products");
  const wrapperStatistic = $(".wrapper-statistic");
  const pageNavigation = $(".page-navigation");
  const section = $("section");
  statistical.addEventListener("click", function (e) {
    section.style = "display: none;";
    pageNavigation.style = "display: none;";
    wrapperStatistic.style = "display: block;";
  });
}
