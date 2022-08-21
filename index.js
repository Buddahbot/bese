// import "regenerator-runtime/runtime";

// import axios from "axios";
import { createPopup } from "./logic.js";

// const createPopup = require("./logic.js");

// ...

const BASE_URL = "http://localhost:3300/api/users";

const getCustomerItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);

    const customerItems = response.data;
    customerItems.join(",hkh ");
    // console.log(customerItems);

    // console.log(`Customer list`, customerItems);

    return customerItems;
  } catch (errors) {
    console.error(errors);
  }
};

export const makePopup = createPopup;

////////// Create Customer Item
export const createCustomer = (item) => {
  //console.log(item);
  // console.log("The is from hot reloaddddd");

  let customerElement = document.createElement("tr");

  customerElement.id = item.customer_id;

  let diva = document.createElement("td");
  let divb = document.createElement("td");
  let divc = document.createElement("td");
  let divd = document.createElement("td");
  let dive = document.createElement("td");

  // customerElement.appendChild(document.createTextNode(item.customer_id));
  diva.appendChild(document.createTextNode(item.customer_id));
  customerElement.appendChild(diva);
  divb.appendChild(document.createTextNode(item.name));
  customerElement.appendChild(divb);
  divc.appendChild(document.createTextNode(item.email));
  customerElement.appendChild(divc);
  divd.appendChild(document.createTextNode(item.town));
  customerElement.appendChild(divd);
  dive.appendChild(document.createTextNode(item.country));
  customerElement.appendChild(dive);
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

///// remove elements from popup form
// document.body.appendChild(popupHolder);

///////// Update the customer list
const updateCustomerList = (customerItems) => {
  const customerList = document.querySelector("tbody");
  console.log(customerItems);
  // customerItems.forEach((e) => {
  //   console.log(e);
  //   for (let i = 0; i < customerItems.length; i++) {
  //     const myDiv = document.createElement("div");
  //     myDiv + e.customer_id + myDiv;
  //     myDiv + e.name + myDiv;
  //     myDiv + e.email + myDiv;
  //     myDiv + e.town + myDiv;
  //     myDiv + e.country + myDiv;
  //   }
  // });
  console.log(customerItems);

  if (Array.isArray(customerItems) && customerItems.length > 0) {
    customerItems.map((customerItem) => {
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
  // event.preventDefault();

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

// console.log("all good here");

////// Update customer
export async function updateUser(customer) {
  try {
    console.log(customer);
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

//// Delete customer

export const deleteCustomer = async (customer_id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${customer_id}`);
    console.log(`Deleted customer Id: `, customer_id);

    return response.data;
  } catch (errors) {
    console.error(errors);
  }
};

// document.querySelector("#parent").addEventListener("click", function (e) {
//   console.log(e.target.getAttribute("id") + "is clicked");
// });

// console.log(items);

// let parent = document.querySelector("#parent");
// // let listOfLi = document.getElementsByTagName("li");
// let listOfLi = ["Sebastian", "Raul", "Adrian"];
// console.log(listOfLi);
// // Array.from(listOfLi);

// let nodes = listOfLi.map((lang) => {
//   let li = document.createElement("li");
//   li.textContent = listOfLi;
//   return li;
// });
// parent.append(...nodes);

// const newThing = Array.from(document.getElementsByTagName("div")).forEach(
//   (div) => {
//     console.log(div);
//   }
// );

// let x = document.querySelector("#parent").innerText;
// console.log(x);

// const listItems = Array.from(document.getElementsByTagName("div"));
// {
//   for (let i = 0; i < listItems.length; i++) {
//     listItems[i].style.fontSize = "5rem";
//   }
// }

// listOfLi.parentNode.insertBefore(newElement, listOfLi);

// let app = document.querySelector("#parent");

// let langs = ["TypeScript", "HTML", "CSS"];

// let nodes = langs.map((lang) => {
//   let li = document.createElement("li");
//   li.textContent = lang;
//   return li;
// });

// app.append(...nodes);

// Array.from(listOfLi).forEach(myFunction);

// function myFunction(item, index, array) {
//   array[index] = "<p>" + item + "</p>";
// }
// const theParentNode = document.querySelector("parent");
// const x = listOfLi;
// theParentNode.append(listOfLi);

// console.log("NEW LIsss", x);

// const formUpdateCustomer = document.querySelector("formUpdateCustomer");

// formUpdateCustomer.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const customer_id = document.querySelector("#customer_id").value;
//   const name = document.querySelector("#name").value;
//   const email = document.querySelector("#email").value;
//   const town = document.querySelector("#town").value;
//   const country = document.querySelector("#country").value;

//   const cust = {
//     customer_id: customer_id,
//     name: name,
//     email: email,
//     town: town,
//     country: country,
//   };

//   const submitCustItem = await addCustomerItem(cust);
//   updateCustomerList(cust);
// });

// document.querySelector("#parent").addEventListener("click", function (e) {
//   console.log("row is clicked");
//   const target = e.target;
//   console.log(target);
//   if (target.matches("li")) {
//     target.style.backgroundColor = "lightgrey";
//   }
// });

document.querySelector("#parent").addEventListener("click", function (e) {
  console.log(e.target.getAttribute("id") + "is clicked");
});
