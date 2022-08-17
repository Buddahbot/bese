// import "regenerator-runtime/runtime";
import axios from "axios";
import { createPopup } from "./logic.js";

// ...

const BASE_URL = "http://localhost:3300/api/users";

const getCustomerItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);

    const customerItems = response.data;

    console.log(response.data);

    console.log(`Customer list`, customerItems);

    return customerItems;
  } catch (errors) {
    console.error(errors);
  }
};

export const makePopup = createPopup;

////////// Create Customer Item
export const createCustomer = (item) => {
  //console.log(item);
  console.log("The is from hot reload");

  let customerElement = document.createElement("li");
  let link = document.createElement("p");

  var linkIt = document.createTextNode("");

  // link.appendChild(linkIt);
  // link.title = "This is Link Test";
  // link.href = "./updateCustomer.html";

  customerElement.appendChild(link);

  customerElement.id = item.customer_id;

  customerElement.appendChild(document.createTextNode(item.customer_id));
  customerElement.appendChild(document.createTextNode(item.name));
  customerElement.appendChild(document.createTextNode(item.email));
  customerElement.appendChild(document.createTextNode(item.town));
  customerElement.appendChild(document.createTextNode(item.country));
  customerElement.addEventListener("click", (event) => {
    createPopup(item.customer_id, {
      name: item.name,
      email: item.email,
      town: item.town,
      country: item.country,
    });
  });

  return customerElement;
};

///////// Update the customer list
const updateCustomerList = (customerItems) => {
  customerItems;
  const customerList = document.querySelector("ul");
  console.log(Array.isArray(customerItems));
  if (Array.isArray(customerItems) && customerItems.length > 0) {
    customerItems.map((customerItem) => {
      // console.log(customerItem);

      console.log(customerItem);
      console.log(customerItem);
      customerList.appendChild(createCustomer(customerItem));
    });
  } else if (customerItems) {
    customerList.appendChild(createCustomer(customerItems));
  }
};

const main = async () => {
  updateCustomerList(await getCustomerItems());
};

main();

const formNewCustomer = document.querySelector(
  'form[name = "formNewCustomer"]'
);

formNewCustomer.addEventListener("submit", async (event) => {
  event.preventDefault();

  const customer_id = document.querySelector("#customer_id").value;
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const town = document.querySelector("#town").value;
  const country = document.querySelector("#country").value;

  const cust = {
    customer_id: customer_id,
    name: name,
    email: email,
    town: town,
    country: country,
  };

  const submitCustomerItem = await addCustomerItem(cust);
  updateCustomerList(submitCustomerItem);
});

////
export const addCustomerItem = async (cust) => {
  try {
    const response = await axios.post(
      `http://localhost:3300/api/users/create`,
      cust
    );
    const newCustomerItem = response.data;
    console.log(newCustomerItem);

    console.log(`Added!`, newCustomerItem);
  } catch (errors) {
    console.error(errors);
  }
};

const formUpdateCustomer = document.querySelector("formUpdateCustomer");

formUpdateCustomer.addEventListener("submit", async (event) => {
  event.preventDefault();

  const customer_id = document.querySelector("#customer_id").value;
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const town = document.querySelector("#town").value;
  const country = document.querySelector("#country").value;

  const cust = {
    customer_id: customer_id,
    name: name,
    email: email,
    town: town,
    country: country,
  };

  const submitCustItem = await addCustomerItem(cust);
  updateCustomerList(cust);
});

////// Update customer
export async function updateUser(customer) {
  try {
    const res = await axios.put(
      `http://localhost:3300/api/users/update/${customer.customer_id}`,
      customer
    );
    setIsLoading(false);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//// Delete request

export const deleteCustomerItem = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/customer/${id}`);
    console.log(`Deleted customer Id: `, id);

    return response.data;
  } catch (errors) {
    console.error(errors);
  }
};
