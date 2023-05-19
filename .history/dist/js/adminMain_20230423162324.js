const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const User = JSON.parse(localStorage.getItem("loginUser"));
const http = "http://localhost:5000/api/";
if (User?.token) {
  checkUser();
} else {
  window.location.replace("./index.html");
}
async function checkUser() {
  await fetch("http://localhost:5000/api/user/check", {
    headers: {
      "Content-Type": "application/json",
      authentication: User.token,
    },
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.success && data.data === 0) {
        window.location.replace("./index.html");
      }
    });
}

function alertFullil(texting) {
  alertSuccess.children[0].textContent = texting;
  alertSuccess.classList.add("get-active");
  setTimeout(() => {
    alertSuccess.classList.remove("get-active");
  }, 3000);
}

function alertFail(texting) {
  alertDanger.children[0].textContent = texting;
  alertDanger.classList.add("get-active");
  setTimeout(() => {
    alertDanger.classList.remove("get-active");
  }, 3000);
}

function renderProducts(data) {
  const item = `
              <tr class="product-item">
                <th>
                  <a href="#" class="img" target="_blank">
                    <img src="${val.imgBg}" alt="">
                  </a>

                </th>
                <th>
                  <div class="name-product">
                    ${val.name}
                  </div>
                </th>
                <th>
                  $${val.price}
                </th>
                <th>
                  ${val.state}
                </th>
                <th>${val.rating}</th>
                <th>${val.sold}</th>
                <th>
                  <div class="product-action">
                    <button class="delete" data-id="${val._id}">
                      <i class="fa-sharp fa-solid fa-xmark"></i>
                    </button>
                    <button class="edit" data-id="${val._id}">
                      <i class="fa-solid fa-pen"></i>
                    </button>
                  </div>

                </th>

              </tr>
  `;

  $(".product-items").insertAdjacentHTML("beforeend", item);
}

async function fetchData(http) {
  const response = await fetch(`${http}product`);
  const products = await response.json();
  console.log("products:", products);
  if (products?.data.length > 0 && Array.isArray(products.data)) {
    products.data.forEach((val) => renderProducts());
  }
}

window.addEventListener("load", function (e) {
  const menuToggle = $(".menu-toggle");
  const list = $$(".list");
  const nav = $(".navigation");

  menuToggle.onclick = (e) => {
    nav.classList.toggle("active");
  };

  [...list].forEach((val) =>
    val.addEventListener("click", function (e) {
      [...list].forEach((lis) => lis.classList.remove("active"));
      this.classList.add("active");
    })
  );

  fetchData(http);
});
