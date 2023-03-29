export default function spinner(check = true) {
  const getSpinner = document.querySelector(".spinner");

  if (check) {
    getSpinner.classList.remove("hide-spinner");
    getSpinner.classList.add("show-spinner");
  } else {
    getSpinner.classList.add("hide-spinner");
    getSpinner.classList.remove("show-spinner");
  }
}
