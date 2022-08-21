import { updateUser } from "./index.js";
import { deleteCustomer } from "./index.js";

export function createPopup(customer_id, item) {
  if (!customer_id) return;
  let html = `<div class="popup-body" id="popup-${customer_id}">
    <div>
    <button class="button-3" name="cancel-${customer_id}">X</button>
    </div>
    <div>
      <label class="form__label">
        Name
        <input class="form__input" type="text" id="name-${customer_id}" value="${item.name}" />
      </label>
    </div>
    <div>
      <label class="form__label">
        Email
        <input class="form__input" type="text" id="email-${customer_id}" value="${item.email}" />
      </label>
    </div>
    <div>
      <label class="form__label">
        Town
        <input class="form__input" type="text" id="town-${customer_id}" value="${item.town}" />
      </label>
    </div>
    <div>
      <label class="form__label">
        Country
        <input class="form__input" type="text" id="country-${customer_id}" value="${item.country}" />
      </label>
    </div>

    <div>
      <button class="button-3" name="cancel-${customer_id}">Cancel</button>
      <button class="button-3" id="update-customer-${customer_id}">Update</button>
      <button class="button-3" id="delete-customer-${customer_id}">Delete</button>
    </div>
    </div>`;

  //// put in a div
  let popupHolder = document.createElement("div");
  popupHolder.innerHTML = html;

  ///// remove elements from popup form
  document.body.appendChild(popupHolder);
  document.getElementsByName("cancel-" + customer_id).forEach((elem) => {
    elem.addEventListener("click", (event) => {
      remove(customer_id);
    });
  });

  //// Add eventlistener for update button
  document.body.appendChild(popupHolder);
  document
    .querySelector("#update-customer-" + customer_id)
    .addEventListener("click", async (event) => {
      await makeUpdate(customer_id);
      location.reload();
    });

  //// Delete customer
  document
    .querySelector("#delete-customer-" + customer_id)
    .addEventListener("click", async (e) => {
      await deleteCustomer(customer_id);
      location.reload();
    });

  ///// Clear window of popup when clicking outside popup
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
  console.log(response);
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
