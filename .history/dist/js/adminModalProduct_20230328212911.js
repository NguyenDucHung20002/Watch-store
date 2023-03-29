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
    const ratingProduct = $(".rating-product");
    const ratingRevenue = $(".rating-revenue");
    const ratingUsers = $(".rating-users");
    const websiteTraffic = $(".websiteTraffic");
    const ratingOrders = $(".rating-orders");
  });

  products.addEventListener("click", function (e) {
    section.style = "display: block;";
    pageNavigation.style = "display: block;";
    wrapperStatistic.style = "display: none;";
  });
}

async function getStatistic() {
  await fetch(`${http}statistic`)
    .then((data) => data.json())
    .then((data) => {
      console.log("data:", data);
    });
}
