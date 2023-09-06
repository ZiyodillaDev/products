const elCards = document.querySelector(`.cards`);
elCards.setAttribute("class", "row gap-3 justify-content-between pt-5 center");
const elInput = document.querySelector(`.js-input`);
const elSelect = document.querySelector("#js-select");
const elTemplate = document.querySelector(`template`).content;
let docFragment = document.createDocumentFragment();

function renderPosts(array, node) {
  node.innerHTML = "";
  array.forEach((el) => {
    let elCard = elTemplate.cloneNode(true);
    let elImg = elCard.querySelector(`.card-img-top`);
    let elTitle = elCard.querySelector(".card-title");
    let elPopular = elCard.querySelector(`.popular`);
    let elCapital = elCard.querySelector(".capital");
    let elRegion = elCard.querySelector(`.region`);

    elImg.src = el.thumbnail;
    elTitle.textContent = el.title;
    elPopular.textContent = "Price:  " + el.price + "$";
    elCapital.textContent = "Rating:  " + el.rating;
    elRegion.textContent = "Brand:  " + el.brand;


    docFragment.appendChild(elCard);
  });
  node.appendChild(docFragment);
}

async function productsGet() {
  const response = await fetch(`https://dummyjson.com/products`);
  const data = await response.json();
  renderPosts(data.products, elCards);
}
productsGet();
