export default function spinner(check = true) {
  const getSpinner = document.querySelector(".spinner");

  if (check) {
    const addSpinner = `<li>
            <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </li>
        <li>
            <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </li>
        <li>
            <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </li>`;
    getSpinner.insertAdjacentElement("afterbegin", addSpinner);
  } else {
    getSpinner.innerHTML = "";
  }
}
