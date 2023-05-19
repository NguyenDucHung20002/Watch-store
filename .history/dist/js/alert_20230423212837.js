const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const alertSuccess = $(".alert-primary");
const alertDanger = $(".alert-danger");

export function alertFullfill(texting) {
  alertSuccess.children[0].textContent = texting;
  alertSuccess.classList.add("get-active");
  setTimeout(() => {
    alertSuccess.classList.remove("get-active");
  }, 3000);
}

export function alertFail(texting) {
  alertDanger.children[0].textContent = texting;
  alertDanger.classList.add("get-active");
  setTimeout(() => {
    alertDanger.classList.remove("get-active");
  }, 3000);
}
