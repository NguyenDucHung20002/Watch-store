const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const data = JSON.parse(localStorage.getItem("Purchase"));
// localStorage.removeItem("Purchase");
console.log("data:", data);

function 

// fetch(`${http}purchase`, {
//   method: "PUT", // or 'PUT'
//   headers: {
//     "Content-Type": "application/json",
//     authentication: User.token,
//   },
//   body: JSON.stringify({ purchase }),
// })
//   .then((data) => data.json())
//   .then((res) => {
//     if (res.success) {
//       fetch(`${http}statistic`)
//         .then((data) => data.json())
//         .then((data) => {
//           if (data.success) {
//             const order = data.data[0].order + res.data.length;
//             const revenue = data.data[0].revenue + totalCart;
//             fetch(`${http}statistic`, {
//               method: "PUT", // or 'PUT'
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ order, revenue }),
//             })
//               .then((data) => data.json())
//               .then((data) => {
//                 fetch(`${http}updatecart/user/${User.data?.idUser}`, {
//                   headers: {
//                     "Content-type": "application/json; charset=UTF-8",
//                     authentication: User.token,
//                   },
//                   method: "PUT",
//                   body: JSON.stringify({ carts: [] }),
//                 }).then(() => {
//                   fetch(`${http}momo`, {
//                     method: "POST", // or 'PUT'
//                     headers: {
//                       "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                       total: totalCart,
//                       nextUrl: "http://127.0.0.1:5500/thanks.html",
//                     }),
//                   })
//                     .then((data) => data.json())
//                     .then((data) => {
//                       window.location.replace(`${data.data?.payUrl}`);
//                     });
//                 });
//               });
//           }
//         });
//     }
//   });

if (data?.length > 0) {
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
