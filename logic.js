import { updateUser } from "./app.js";

export function createPopup(customer_id, item) {
  if (!customer_id) return;
  let html = `<div class="popup-body" id="popup-${customer_id}">
    <div>
      <button name="cancel-${customer_id}">X</button>
    </div>
    <div>
      <label>
        Name
        <input type="text" id="name-${customer_id}" value="${item.name}" />
      </label>
    </div>
    <div>
      <label>
        Email
        <input type="text" id="email-${customer_id}" value="${item.email}" />
      </label>
    </div>
    <div>
      <label>
        Town
        <input type="text" id="town-${customer_id}" value="${item.town}" />
      </label>
    </div>
    <div>
      <label>
        Country
        <input type="text" id="country-${customer_id}" value="${item.country}" />
      </label>
    </div>

    <div>
      <button name="cancel-${customer_id}">Cancel</button>
      <button id="update-customer-${customer_id}">Update</button>
    </div>
    </div>`;
  let popupHolder = document.createElement("div");
  popupHolder.innerHTML = html;

  document.body.appendChild(popupHolder);
  document.getElementsByName("cancel-" + customer_id).forEach((elem) => {
    elem.addEventListener("click", (event) => {
      remove(customer_id);
    });
  });

  document.body.appendChild(popupHolder);
  document
    .querySelector("#update-customer-" + customer_id)
    .addEventListener("click", async (event) => {
      await makeUpdate(customer_id);
    });

  window.addEventListener("click", removePopupHandler, { capture: true });
}

export async function makeUpdate(id) {
  let customer = {
    customer_id: id,
    name: document.querySelector("#name-" + id).value,
    email: document.querySelector("#email-" + id).value,
    town: document.querySelector("#town-" + id).value,
    country: document.querySelector("#country-" + id).value,
  };

  let response = await updateUser(customer);
  console.log(response.data);
}

export function remove(id) {
  document.querySelector("#popup-" + id).remove();
  window.removeEventListener("click", removePopupHandler);
}

export function removePopupHandler(event) {
  console.log("Window clicked");
  let currentPopup = document.querySelector(".popup-body");
  if (currentPopup) {
    if (!currentPopup.contains(event.target)) {
      let id = currentPopup.id.split("-")[1];
      remove(id);
    }
  }
}
