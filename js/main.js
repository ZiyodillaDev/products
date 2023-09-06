// Main codes

const elCards = document.querySelector(`.cards`);
elCards.setAttribute("class", "row gap-3 justify-content-between pt-5 center");
const elInput = document.querySelector(`.js-input`);
const elSelect = document.querySelector("#js-select");
const elTemplate = document.querySelector(`template`).content;
let docFragment = document.createDocumentFragment();
let limit = 20;
let skip = 0;

function renderPosts(array, node) {
  node.innerHTML = "";
  array.forEach((el) => {
    let elCard = elTemplate.cloneNode(true);
    let elImg = elCard.querySelector(`.card-img-top`);
    let elTitle = elCard.querySelector(".card-title");
    let elPopular = elCard.querySelector(`.popular`);
    let elCapital = elCard.querySelector(".capital");
    let elRegion = elCard.querySelector(`.region`);
    let elLink = elCard.querySelector(`.linkProduct`);

    elImg.src = el.thumbnail;
    elTitle.textContent = el.title;
    elPopular.textContent = "Price:  " + el.price + "$";
    elCapital.textContent = "Rating:  " + el.rating;
    elRegion.textContent = "Brand:  " + el.brand;
    elLink.id = el.id;

    elLink.addEventListener("click", () => {
      localStorage.setItem("id", elLink.id);
    });

    docFragment.appendChild(elCard);
  });
  node.appendChild(docFragment);

  let likedBtns = document.querySelectorAll(".like");

  likedBtns.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("liked");
      if (item.classList.contains("liked")) {
        item.src = "images/liked-done.svg";
      } else {
        item.src = "images/liked.svg";
      }
    });
  });
}

let category;
async function productsGet() {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
  const data = await response.json();
  localStorage.setItem("all", data.total);
  renderPosts(data.products, elCards);
}
productsGet();
async function productsSort() {
  const response = await fetch(`https://dummyjson.com/products/categories`);
  const data = await response.json();

  for (i of data) {
    const elOption = document.createElement("option");
    elOption.textContent = i;
    elSelect.appendChild(elOption);
  }
  elSelect.addEventListener("change", (evt) => {
    category = elSelect.value;
    async function FilterRegion() {
      if (category == "all") {
        const response = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
        );
        const data = await response.json();
        renderPosts(data.products, elCards);
      } else {
        const res = await fetch(
          `https://dummyjson.com/products/category/${category}`
        );
        const data = await res.json();
        renderPosts(data.products, elCards);
      }
    }
    FilterRegion();
  });
}
productsSort();

let nameCountry;

elInput.addEventListener("input", () => {
  if (elInput.value !== "") {
    nameCountry = elInput.value;
    SearchFunc();
  }
});

const SearchFunc = async () => {
  const res = await fetch(
    `https://dummyjson.com/products/search?q=${nameCountry}`
  );
  const data = await res.json();
  renderPosts(data.products, elCards);
};

const elMode = document.querySelector(".js-mode");
const header = document.querySelector("header");
const logo = document.querySelector(".brand-title");
let theme = "dark";
elMode.addEventListener("click", () => {
  theme = !theme;
  const bg = theme ? "dark" : "light";
  window.localStorage.setItem("theme", bg);
  ChangeTheme();
});
function ChangeTheme() {
  if (window.localStorage.getItem("theme") == "dark") {
    document.body.classList.add("dark");
    elMode.classList.add("btn");
    header.classList.add("dark");
    logo.classList.add("dark-text");
  } else {
    document.body.classList.remove("dark");
    elMode.classList.remove("btn");
    header.classList.remove("dark");
    logo.classList.remove("dark-text");
  }
}
ChangeTheme();

var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let all = localStorage.getItem("all");

if (skip == 0) {
  prev.disabled = true;
} else if (skip <= all) {
  next.disabled = true;
}

next.addEventListener("click", () => {
  skip += limit;
  prev.disabled = false;
  productsGet();
  if (skip >= all) {
    next.disabled = true;
  }
});

prev.addEventListener("click", () => {
  skip -= limit;
  next.disabled = false;
  productsGet();
  if (skip == 0) {
    prev.disabled = true;
  }
});
