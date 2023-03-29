const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const data = JSON.parse(localStorage.getItem("checkout"));
localStorage.removeItem("checkout");
console.log("data:", data);

if (data) {
  let total = 0;
  $(".cart-items").innerHTML = "";

  const carts = data.map((val) => {
    total += val.total;
    return `
            <div class="items">
                <span class="name-items">${val.name} - <span>${val.category}</span> - <strong>x${val.quantity}</strong></span>
                <span class="price-items">$${val.total}</span>
            </div>
    `;
  });
  $(".cart-items").innerHTML = carts.join("");
  $(".total-price").innerHTML = `$${total}`;
}

$("#btn-gohome").onclick = (e) => {
  e.preventDefault();
  $("#btn-gohome").classList.add("active");
  setTimeout(() => {
    window.location.replace("./index.html");
  }, 300);
};
