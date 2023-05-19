import { alertFullfill, alertFail } from "./alert.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const User = JSON.parse(localStorage.getItem("loginUser"));
const http = "http://localhost:5000/api/";

const websiteTraffic = $(".website-straffic");
console.log("websiteTraffic:", websiteTraffic);
const menbers = $(".user-member");
console.log("menbers:", menbers);
const orders = $(".orders");
console.log("orders:", orders);
const revenue = $(".revenue");
console.log("revenue:", revenue);

function statistical() {}

export default function adminDashboard() {}
