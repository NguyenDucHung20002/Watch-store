import { alertFullfill, alertFail } from "./alert.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const User = JSON.parse(localStorage.getItem("loginUser"));
const http = "http://localhost:5000/api/";

const websiteTraffic = $(".website-straffic");
const menbers = $(".user-member");
const orders = $(".orders");
const revenue = $(".revenue");

async function statistical() {
  await fetch(`${http}statistic`, {
    headers: {
      "Content-Type": "application/json",
      authentication: User?.token,
    },
  })
    .then((data) => data.json())
    .then((data) => console.log(data));
}

export default function adminDashboard() {
  statistical();
}
