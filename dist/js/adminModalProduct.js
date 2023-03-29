const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api";
const User = JSON.parse(localStorage.getItem("loginUser"));
export default function adminModal() {
  const statistical = $(".nav-statistical");
  const products = $(".nav-products");
  const wrapperStatistic = $(".wrapper-statistic");
  const pageNavigation = $(".page-navigation");
  const section = $("section");
  statistical.addEventListener("click", function (e) {
    section.style = "display: none;";
    pageNavigation.style = "display: none;";
    wrapperStatistic.style = "display: block;";

    getStatistic();
  });

  products.addEventListener("click", function (e) {
    section.style = "display: block;";
    pageNavigation.style = "display: block;";
    wrapperStatistic.style = "display: none;";
  });
  async function getStatistic() {
    const ratingProduct = $(".rating-product");
    const ratingRevenue = $(".rating-revenue");
    const users = $(".rating-users");
    const websiteTraffic = $(".getWebsiteTraffic");
    const ratingOrders = $(".rating-orders");
    await fetch(`${http}/statistic`)
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          const res = data.data[0];
          console.log("res:", res);
          ratingProduct.textContent = res.products;
          ratingRevenue.textContent = res.revenue;
          users.textContent = res.users;
          websiteTraffic.textContent = res.websiteTraffic;
          ratingOrders.textContent = res.order;
        }
      });
  }
}
