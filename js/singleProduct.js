const backBtn = document.querySelector(".back");

backBtn.addEventListener("click", () => {
  location.href = "index.html";
});

const List = document.querySelector(".allDiv");

function renderPost(array, node) {
  node.innerHTML += `
    <div class="w-50">
    <img class="w-100 bigPic pt-5" src="${array.thumbnail}" alt="bigPic">
    <div class="imgsDiv d-flex w-100 gap-5 pt-5 ">
   
    </div>
</div>
<div class="w-50">
    <h2 class="mt-5">${array.title}</h2>
    <p class="pt-2">${array.description}</p>
    <h3><s>${array.price}$</s> ${Math.round(
    array.price - array.price / array.discountPercentage
  )}$</h3>
    <div class="d-flex pt-4 justify-content-around">
        <h4 class="text-capitalize">rating:</h4>
        <h4 class="text-capitalize">stock:</h4>
        <h4 class="text-capitalize">brand:</h4>
        <h4 class="text-capitalize">category:</h4>
    </div>
    <div class="d-flex pt-4 pb-3 justify-content-around">
        <p class="text-capitalize">${array.rating}</p>
        <p class="text-capitalize">${array.stock}</p>
        <p class="text-capitalize">${array.brand}</p>
        <p class="text-capitalize">${array.category}</p>
    </div>
    <div class="d-flex pt-5 justify-content-around">
    <button class="btn btn-primary">Liked</button>
    <button class="btn btn-primary">Buy</button>
</div>
</div>
          `;
}

const id = localStorage.getItem("id");
function renderImages(array, node) {
  array.forEach((el) => {
    node.innerHTML += `
    <img class="flex-fill bottomImages" src="${el}" alt="element">`;
  });
}

async function productGet() {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await response.json();
  data.images.forEach((item) => {
    console.log(item);
  });

  renderPost(data, List);
    var imgsDiv = document.querySelector(".imgsDiv");
    renderImages(data.images, imgsDiv);
}
productGet();
