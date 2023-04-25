"use strict";
let totalMoneyElement = document.querySelector("#totalMoney");
let percentageElement = document.querySelector("#percentageLeft");
let buyButtons = document.querySelectorAll("#buy");
let sellButtons = document.querySelectorAll("#sell");
const appContainer = document.querySelector(".app-container");
let elonFortune = 217000000000;
let totalPercentage = 100;
let elements = [];
appContainer.addEventListener("click", (e) => {
  let element = e.target.parentElement;
  if (e.target.classList.contains("btn-buy")) {
    buyItem(element);
  } else if (e.target.classList.contains("btn-sell")) {
    sellItem(element);
  }
});
function buyItem(element) {
  if (elonFortune - Number(element.dataset.price) >= 0) {
    elonFortune -= Number(element.dataset.price);
    totalPercentage = (elonFortune * 100) / 217000000000;
    let itemName = element.parentElement.querySelector("#name").textContent;
    let amountOfItems = element.querySelector("#amount");
    amountOfItems.textContent = `${Number(amountOfItems.textContent) + 1}`;
    let button = element.querySelector("#sell");
    if (Number(amountOfItems.textContent) > 0) {
      button.disabled = false;
    }
    updateTotalAndPercentage();
    createReciptItem(
      itemName,
      Number(amountOfItems.textContent),
      formatMoney(
        Number(element.dataset.price) * Number(amountOfItems.textContent)
      )
    );
    updateReceipt();
  } else {
    cantAffordAlert();
  }
}
function cantAffordAlert() {
  totalMoneyElement.innerHTML = `<p class="totalMoney">Can't afford that!</p>`;
  percentageElement.innerHTML = `<p class ="percentageLeft">Sell something!</p>`;
}
function createReciptItem(name, amount, total) {
  let receiptItem = new ReceiptItem();
  receiptItem.name = name;
  receiptItem.amount = amount;
  receiptItem.total = total;
  if (!checkReceiptItemExists(receiptItem)) {
    receiptItemsArr.push(receiptItem);
  } else {
    updateReceiptItem(receiptItem);
  }
}
function sellItem(element) {
  elonFortune += Number(element.dataset.price);
  totalPercentage = (elonFortune * 100) / 217000000000;
  let itemName = element.parentElement.querySelector("p").textContent;
  let amountOfItems = element.querySelector("span");
  amountOfItems.textContent = `${Number(amountOfItems.textContent) - 1}`;
  let button = element.querySelector("#sell");
  if (Number(amountOfItems.textContent) === 0) {
    button.disabled = true;
  }
  updateTotalAndPercentage();
  createReciptItem(
    itemName,
    Number(amountOfItems.textContent),
    formatMoney(
      Number(element.dataset.price) * Number(amountOfItems.textContent)
    )
  );
  updateReceipt();
}
function updateTotalAndPercentage() {
  totalMoneyElement.innerHTML = `<p class="totalMoney">Remaining: ${formatMoney(
    elonFortune
  )} USD</p>`;
  percentageElement.innerHTML = `<p class ="percentageLeft">You only spent ${(
    100 - totalPercentage
  ).toFixed(6)} % of the total!</p>`;
}
function formatMoney(number) {
  return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
class ReceiptItem {
  constructor() {
    this.name;
    this.amount;
    this.total;
  }
}
let receiptItemsArr = [];
function checkReceiptItemExists(receiptItem) {
  let i = 0;
  let exists = false;
  while (!exists && i < receiptItemsArr.length) {
    let itemX = receiptItemsArr[i];
    if (itemX.name === receiptItem.name) {
      exists = true;
    }
    i++;
  }
  return exists;
}
function updateReceiptItem(receiptItem) {
  let i = 0;
  let itemInArr = null;
  while (itemInArr === null && i < receiptItemsArr.length) {
    let itemX = receiptItemsArr[i];
    if (itemX.name === receiptItem.name) {
      itemInArr = itemX;
    }
    i++;
  }
  if (itemInArr) {
    itemInArr.name = receiptItem.name;
    itemInArr.amount = receiptItem.amount;
    itemInArr.total = receiptItem.total;
  }
}
function updateReceipt() {
  let title = `<h1>Receipt</h1>`;
  let receipt = "";
  let total = formatMoney(217000000000 - elonFortune);
  for (let i = 0; i < receiptItemsArr.length; i++) {
    let itemX = receiptItemsArr[i];
    if (itemX.amount !== 0) {
      receipt += `<p>${itemX.name} x <strong> ${itemX.amount}</strong>..............$ ${itemX.total}</p>`;
    }
  }
  document.querySelector("#receipt-container").innerHTML =
    title + receipt + `<p class="totalRecipt">Total is: $ ${total}</p>`;
}
function printSection(el) {
  let printsection = document.getElementById(el).innerHTML;
  document.body.innerHTML = printsection;
  window.print();
}
class Element {
  static nro = 1;
  constructor(name, price, image) {
    this.id = Element.nro++;
    this.name = name;
    this.price = price;
    this.amount = 0;
    this.image = image;
  }
}
function createAndSaveElement(elementName, price, image) {
  if (elementName !== "" && price > 0 && image !== "") {
    let newElement = new Element(elementName, price, image);
    elements.push(newElement);
  }
}
preLoad();
function preLoad() {
  createAndSaveElement("AirPods Pro", 249, "../image/image1.jpg");
  createAndSaveElement("Nintendo Switch", 299, "../image/image2.jpg");
  createAndSaveElement("PS5", 499, "../image/image3.jpg");
  createAndSaveElement("Xbox Series X", 499, "../image/image4.jpg");
  createAndSaveElement("Iphone 14 Pro Max - 1TB", 1599, "../image/image5.jpg");
  createAndSaveElement("Samsung S23 Ultra - 1TB", 1499, "../image/image6.jpg");
  createAndSaveElement(
    "MacBook Pro 14' M2 Max (64GB RAM | 4TB) ",
    4699,
    "../image/image7.jpg"
  );
  createAndSaveElement(
    "2023 Mac Studio M1 Ultra (128GB RAM | 8TB)",
    6999,
    "../image/image8.jpg"
  );
  createAndSaveElement(
    "Pro Gaming PC(I9 13900K, RTX 4090, 64GB, 4TB SSD)",
    6950,
    "../image/image9.jpg"
  );
  createAndSaveElement(
    "Razer Blade 14 Top spec (2023)",
    2799,
    "../image/image10.jpg"
  );
  createAndSaveElement(
    "Ipad Air M1 Chip (2023) (256GB)",
    749,
    "../image/image12.jpg"
  );
  createAndSaveElement(
    "Tesla Bot (Available 2024)",
    20000,
    "../image/image13.jpg"
  );
  createAndSaveElement(
    "Start your own StartUp",
    5000000,
    "../image/image14.jpg"
  );
  createAndSaveElement(
    "Open Fast Food Franchise",
    1500000,
    "../image/image15.jpg"
  );
  createAndSaveElement("Spotify for 80 years", 10600, "../image/image16.jpg");
  createAndSaveElement(
    "Entire Steam library (2023 - No discounts)",
    728000,
    "../image/image17.jpg"
  );
  createAndSaveElement("Netflix for 80 Years", 16500, "../image/image18.jpg");
  createAndSaveElement(
    "Entire production of Nvidia GPUs for 2023",
    900000000,
    "../image/image19.jpg"
  );
  createAndSaveElement(
    "Influence 1 high ranking politician",
    2000000,
    "../image/image20.jpg"
  );
  createAndSaveElement(
    "Private Concert with ANY Super Star",
    1000000,
    "../image/image21.jpg"
  );
  createAndSaveElement(
    "Give 10,000 USD to 5000 people",
    50000000,
    "../image/image22.jpg"
  );
  createAndSaveElement("LG 88' OLED 8K ThinQ®", 19990, "../image/image23.jpg");
  createAndSaveElement("Fiat 500", 19000, "../image/image24.jpg");
  createAndSaveElement("Toyota Camry", 29000, "../image/image25.jpg");
  createAndSaveElement("Ford F150 Raptor 2023", 65900, "../image/image26.jpg");
  createAndSaveElement("Tesla Model S Plaid", 132000, "../image/image27.jpg");
  createAndSaveElement("Cybertruck (Tri Motor)", 70000, "../image/image28.jpg");
  createAndSaveElement("Tesla Roadster 2024", 200000, "../image/image29.jpg");
  createAndSaveElement("Ferrari F8 Tributo", 276000, "../image/image30.jpg");
  createAndSaveElement(
    "Lamborghini Aventador SVJ",
    512000,
    "../image/image31.jpg"
  );
  createAndSaveElement(
    "Bugatti La Voiture Noire",
    11000000,
    "../image/image32.jpg"
  );
  createAndSaveElement("1000 Acres of land", 4100000, "../image/image33.jpg");
  createAndSaveElement(
    "Private Island, Central America (medium size)",
    4950000,
    "../image/image34.jpg"
  );
  createAndSaveElement(
    "Eating out for 80 years (4 meals/day)",
    3100000,
    "../image/image35.jpg"
  );
  createAndSaveElement(
    "Diamond Ring (Tiffany - 1 carat)",
    17000,
    "../image/image36.jpg"
  );
  createAndSaveElement(
    "Whisky Macallan Michael Dillon 1926",
    1530000,
    "../image/image37.png"
  );
  createAndSaveElement("Rolex Oyster", 14000, "../image/image38.jpg");
  createAndSaveElement(
    "Les Femmes d'Alger by Picasso",
    179400000,
    "../image/image39.jpg"
  );
  createAndSaveElement(
    "Monalisa by Leonardo da Vinci (estimate)",
    869000000,
    "../image/image40.jpg"
  );
  createAndSaveElement("Helicopter Bell 206", 850000, "../image/image41.jpg");
  createAndSaveElement("10 plastic surgeries", 130000, "../image/image42.jpg");
  createAndSaveElement(
    "One week in EVERY country of the planet",
    1250000,
    "../image/image43.jpg"
  );
  createAndSaveElement(
    "College Education (USA)",
    190000,
    "../image/image44.jpg"
  );
  createAndSaveElement(
    "NFL Team (Average)",
    3000000000,
    "../image/image45.jpg"
  );
  createAndSaveElement(
    "NBA Team (Average)",
    2400000000,
    "../image/image46.jpg"
  );
  createAndSaveElement("F1 Team (Average)", 700000000, "../image/image47.jpg");
  createAndSaveElement("Jet Gulfstream G450", 18000000, "../image/image48.jpg");
  createAndSaveElement("M1 Abrams", 8000000, "../image/image49.jpg");
  createAndSaveElement(
    "Produce a Hollywood Movie",
    90000000,
    "../image/image50.jpg"
  );
  createAndSaveElement(
    "Regular Modern Apartment (3 bd, 2 ba)",
    420000,
    "../image/image51.jpg"
  );
  createAndSaveElement(
    "Paris Luxury Apartment(3 bd, 3 ba)",
    3200000,
    "../image/image52.jpg"
  );
  createAndSaveElement("L.A Home (5bd, 6ba)", 6000000, "../image/image53.jpg");
  createAndSaveElement(
    "L.A Mega Mansion (8 bd, 20 ba)",
    52000000,
    "../image/image54.jpg"
  );
  createAndSaveElement(
    "Modern Building (35 condos + 10 Offices)",
    12000000,
    "../image/image55.jpg"
  );
  createAndSaveElement("Sailboat", 130000, "../image/image56.jpg");
  createAndSaveElement("Mega Yatch", 300000000, "../image/image55.jpg");
}
elements.forEach((element) => {
  let newElement = document.createElement("div");
  newElement.classList.add("element");
  newElement.innerHTML = `<img src="${element.image}" alt="${element.name}" />
  <p id="name">${element.name}</p>
  <span id="price">USD ${formatMoney(element.price)}</span>
  <div class="buyAndSellContainer" data-price="${element.price}">
    <button class="btn-sell" id="sell" disabled>Sell</button>
    <span id="amount">${element.amount}</span>
    <button class="btn-buy" id="buy" >Buy</button>
  </div>`;
  appContainer.appendChild(newElement);
});
