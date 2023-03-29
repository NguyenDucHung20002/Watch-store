export default products = {
  product: [
    {
      name: "Watch",
      img: "./productsImg/product-1.jpg",
      imgBg: "./productsImg/products-bg-1.jpg",
      price: 1200,
      states: "New",
    },
  ],

  render: function () {
    const productHtml = this.product.map((val, index) => {
      return `
            <div class="product col-6 col-md-4 col-lg-3" data-id="${index}">
                    <div class="item">
                        <a href="#">
                            <img class="pd-img" src=${val.img} alt="">
                            <img class="pd-bg-img" src=${val.imgBg} alt="">
                        </a>
                        <button class="add-cart" data-id="${index}><i class="fa-solid fa-bag-shopping"></i></i> Add To Cart</button>
                        <ul class="product-action">
                            <li class="content">${val.states}</li>
                            <li class="detail" data-id="${index}><i class="fa-solid fa-eye"></i></li>
                        </ul>
                    </div>
                    <h3 class="product-name">
                        ${val.name}
                    </h3>
                    <p class="price">${val.price}$</p>
                </div>
        `;
    });

    $(".wrapper-products").innerHTML = productHtml.join("");
  },

  start: function () {
    this.render();
  },
};
