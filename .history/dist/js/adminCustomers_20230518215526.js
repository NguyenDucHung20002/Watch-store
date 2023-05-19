import spinner from "./spinner.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:5000/api/";
const User = JSON.parse(localStorage.getItem("loginUser"));
if (!User) {
  window.location.replace("./index.html");
}

function renderUser(data) {
  if (data && data.length > 0) {
    data.forEach((val) => {
      const item = `
                    <tr class="product-item">
                      <th>
                        ${val._id}
                      </th>
                      <th>
                        ${val.username}
                      </th>
                      <th>
                        ${val.email}
                      </th>
                      <th>${val.createdAt}</th>
                    </tr>
      `;
      $(".users").insertAdjacentHTML("beforeend", item);
    });
  } else {
    $(".wrapper-checkout").innerHTML = `
    <div class="wrapper-bill-empty">
        <img class="bill-empty" src="./img/empty-cart.png" alt="">
        <h2>Your bill is empty</h2>
    </div>`;
  }
}

async function fetchUser(page, userInfor) {
  // const stringDate = JSON.stringify(dateTime);
  // console.log("stringDate:", stringDate);
  try {
    await fetch(`${http}users?page=${page}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authentication: User?.token,
        search: userInfor || "",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          console.log("data:", data);
          renderUser(data.data);
        }
      })
      .finally(() => {
        spinner(false);
      });
  } catch (error) {
    console.log("error:", error);
  }
}

export default function adminUser() {
  let userInfor = "";
  let page = 1;
  fetchUser(page++);

  const loadMore = $(".btn-user-load-more");
  const searchUser = $(".search-users");

  searchUser.addEventListener("submit", function (e) {
    e.preventDefault();
    const getSearch = this.elements["search"].value;
    if (getSearch) {
      page = 1;
      userInfor = getSearch;

      $(".users").innerHTML = "";
      fetchUser(page++, userInfor);
    } else {
      page = 1;
      userInfor = "";
      $(".users").innerHTML = "";

      fetchUser(page++, userInfor);
    }
  });

  loadMore.addEventListener("click", function () {
    fetchUser(page++, userInfor);
  });
}
