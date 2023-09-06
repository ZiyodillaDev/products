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
    let elEdit = elCard.querySelector(`.edit`);
    let elDelete = elCard.querySelector(`.delete`);

    elImg.src = el.thumbnail;
    elTitle.textContent = el.title;
    elPopular.textContent = "Price:  " + el.price + "$";
    elCapital.textContent = "Rating:  " + el.rating;
    elRegion.textContent = "Brand:  " + el.brand;
    elEdit.id = el.id;
    elDelete.id = el.id;

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

// create

const productCreateForm = document.querySelector(".productCreateForm");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const discount = document.querySelector("#discount");
const stock = document.querySelector("#stock");
const brand = document.querySelector("#brand");
const myModal = document.querySelector("#myModal");

productCreateForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title.value,
      description: description.value,
      price: price.value,
      discount: discount.value,
      stock: stock.value,
      brand: brand.value,
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTUNNMDslmJkfFCY7KQ1BVTxY6JTd4y2dXTpJQSzmd&s",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data) {
        Toastify({
          text: "Invalid credentials",
          duration: 3000,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "red",
          },
        }).showToast();
      } else {
        Toastify({
          text: "Successfully created product",
          duration: 3000,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "green",
          },
        }).showToast();
        (title.value = ""),
          (description.value = ""),
          (price.value = ""),
          (discount.value = ""),
          (stock.value = ""),
          (brand.value = "");
        myModal.style.display = "none";
      }
    });
});

// delete

setTimeout(() => {
  let deleteBtns = document.querySelectorAll(".delete");

  deleteBtns.forEach((item) => {
    item.addEventListener("click", () => {
      fetch(`https://dummyjson.com/products/${item.id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data) {
            Toastify({
              text: "Invalid credentials",
              duration: 3000,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "red",
              },
            }).showToast();
          } else {
            Toastify({
              text: "Successfully deleted product",
              duration: 3000,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "red",
              },
            }).showToast();
            (title.value = ""),
              (description.value = ""),
              (price.value = ""),
              (discount.value = ""),
              (stock.value = ""),
              (brand.value = "");
            myModal.style.display = "none";
          }
        });
    });
  });
}, 350);

// edit

setTimeout(() => {
  var modal2 = document.getElementById("myModal2");

  var btn2 = document.querySelectorAll(".edit");

  var span2 = document.getElementsByClassName("close2")[0];

  span2.onclick = function () {
    modal2.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal2.style.display = "none";
    }
  };

  btn2.forEach((element) => {
    element.onclick = function () {
      modal2.style.display = "block";
      const productEditForm = modal2.querySelector(".productEditForm");
      const title = modal2.querySelector("#title2");
      const description = modal2.querySelector("#description2");
      const price = modal2.querySelector("#price2");
      const discount = modal2.querySelector("#discount2");
      const stock = modal2.querySelector("#stock2");
      const brand = modal2.querySelector("#brand2");
      productEditForm.addEventListener("submit", (evt) => {
        evt.preventDefault();

        fetch(`https://dummyjson.com/products/${element.id}`, {
          method: "PUT" /* or PATCH */,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.value,
            description: description.value,
            price: price.value,
            discount: discount.value,
            stock: stock.value,
            brand: brand.value,
            thumbnail:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTUNNMDslmJkfFCY7KQ1BVTxY6JTd4y2dXTpJQSzmd&s",
          }),
        })
          .then((res) => res.json())
          .then(data =>{
            if (!data) {
                Toastify({
                  text: "Invalid credentials",
                  duration: 3000,
                  close: true,
                  gravity: "top", // `top` or `bottom`
                  position: "right", // `left`, `center` or `right`
                  stopOnFocus: true, // Prevents dismissing of toast on hover
                  style: {
                    background: "red",
                  },
                }).showToast();
              } else {
                Toastify({
                  text: "Successfully updated product",
                  duration: 3000,
                  close: true,
                  gravity: "top", // `top` or `bottom`
                  position: "right", // `left`, `center` or `right`
                  stopOnFocus: true, // Prevents dismissing of toast on hover
                  style: {
                    background: "green",
                  },
                }).showToast();
                (title.value = ""),
                  (description.value = ""),
                  (price.value = ""),
                  (discount.value = ""),
                  (stock.value = ""),
                  (brand.value = "");
                  modal2.style.display = "none";
              }
          });
      });
    };
  });
}, 850);
