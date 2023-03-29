export default function spinner(check = true) {
  const getSpinner = document.querySelector(".spinner");
  console.log("getSpinner:", getSpinner);

  if (check) {
    getSpinner.classList.add("hide-spinner");
  } else {
    getSpinner.classList.remove("hide-spinner");
  }
}
