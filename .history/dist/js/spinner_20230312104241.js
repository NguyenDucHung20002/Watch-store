export default function spinner(check = true) {
  const getSpinner = document.querySelector(".wrapper-spinner");

  if (check) {
    const addSpinner = `<ul class="spinner">
            <li>
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
            </li>
        </ul>`;
    // getSpinner.innerHTML = addSpinner;
  } else {
    // getSpinner.innerHTML = "";
  }
}
