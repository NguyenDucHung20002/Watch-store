export default function adminModal(dataProduct) {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  const http = "http://localhost:5000/";
  const User = JSON.parse(localStorage.getItem("loginUser"));
  function rederApplyProduct(data) {
    let rating = "";
    for (let index = 0; index < 5; index++) {
      if (data.rating >= index + 1) {
        rating += `<li class="active"><i class="fa-sharp fa-solid fa-star"></i></li>`;
      } else {
        rating += `<li ><i class="fa-sharp fa-solid fa-star"></i></li>`;
      }
    }

    const productHtml = `
            <div class="product col-12  " >
                    <div class="item">
                        <a class="detail-img"  href="#">
                            <img class="pd-img" src=${data.img} alt="">
                            <img class="pd-bg-img" src=${data.imgBg} alt="">
                        </a>
                        <button class="add-cart" ><i class="fa-solid fa-bag-shopping"></i></i> Add To Cart</button>
                        <ul class="product-action">
                        <li class="content"><i class="fa-solid fa-thumbs-up"></i></li>
                            
                            <li class="detail" ><i class="fa-solid fa-eye"></i></li>
                        </ul>
                    </div>
                    <h3 class="product-name">
                        ${data.name}
                    </h3>
                    <p class="price">$${data.price}</p>
                    <div class="wrapper-rating">
                      <ul class="stars">
                          ${rating}
                      </ul>
                      <button  class="like"><i class="fa-solid fa-thumbs-up"></i></button>
                  </div>
                </div>
        `;

    $(".wrapper-products-modal").innerHTML = productHtml;
  }

  const arrDetail = document.querySelector(".card-body");
  const form = document.querySelector(".wrapper-detail-all");
  const addDetail = document.querySelector(".add-detail");
  const urlTable = document.querySelector(".url-tiem");
  const blockView = document.querySelector(".block-view");
  const wrapperBlock = document.querySelector(".wrapper-block");
  const addProduct = $(".create-cart");
  addProduct.addEventListener("click", function (e) {
    blockView.classList.add("show-block-view");
  });
  blockView.addEventListener("click", function (e) {
    blockView.classList.remove("show-block-view");
  });
  wrapperBlock.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  async function addToProduct(data) {
    try {
      await fetch(`${http}api/register`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          authentication: User.token,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (!response.success) {
            alertDanger.children[0].textContent = `${response.message}`;
            alertDanger.classList.add("get-active");
            setTimeout(() => {
              alertDanger.classList.remove("get-active");
            }, 3000);
          } else {
            alertSuccess.children[0].textContent = `Register successfuly`;
            alertSuccess.classList.add("get-active");
            setTimeout(() => {
              alertSuccess.classList.remove("get-active");
            }, 3000);
            signinBtn.click();
            formSignin.elements["email"].value = data.email;
            formSignin.elements["password"].value = data.password;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
      alertDanger.classList.add("get-active");
      setTimeout(() => {
        alertDanger.classList.remove("get-active");
      }, 2000);
    }
  }

  let dataUrlDetail = [];
  function renderDetail(data) {
    const rnederData = data.map((val, index) => {
      return `<tr>
                <th>
                  <button data-id="${index}" class="btn-delete-detail"><i class="fa-sharp fa-solid fa-trash"></i></button>
                </th>
                <th>
                  <p class="text-url">${val}</p>
                </th>
              </tr>
             `;
    });
    urlTable.innerHTML = rnederData.join("");
  }
  renderDetail(dataUrlDetail);
  urlTable.addEventListener("click", function (e) {
    e.preventDefault();
    const btnDelDetail = e.target.closest(".btn-delete-detail");
    const dataDelId = btnDelDetail.dataset.id;
    dataUrlDetail = dataUrlDetail.filter((val, index) => index != dataDelId);
    renderDetail(dataUrlDetail);
  });
  addDetail.addEventListener("click", function (e) {
    e.preventDefault();
    const urlInput = document.querySelector(".input-detail");
    const urlInputValue = urlInput.value;
    if (urlInputValue) {
      urlInput.value = "";
      dataUrlDetail.push(urlInputValue);
      renderDetail(dataUrlDetail);
    }
  });
  let getDataProduct = {};
  const btnAddData = $(".add-data");
  btnAddData.addEventListener("click", function (e) {
    e.preventDefault();
    if (getDataProduct) {
    }
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const details = document.querySelectorAll(".text-url");
    const addData = document.querySelectorAll(".add-data");
    const name = this.elements["name"].value;
    const img = this.elements["url"].value;
    const imgBg = this.elements["urlBG"].value;
    const state = this.elements["state"].value;
    const price = this.elements["price"].value;
    const rating = this.elements["rating"].value;
    const detailValue = [...details].map((val) => val.textContent);

    const data = {
      name,
      img,
      imgBg,
      state,
      price,
      rating,
      detail: detailValue,
    };
    getDataProduct = { ...data };
    rederApplyProduct(data);
  });
}
