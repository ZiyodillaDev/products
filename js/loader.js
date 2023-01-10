setTimeout(function () {
    $(".earth-loading").fadeToggle();
  }, 7000);
  setTimeout(function () {
    $(".starlight").fadeToggle();
  }, 7000);

  var loader = document.querySelector(".earth-loading");
  var loader2 = document.querySelector(".starlight");

  window.addEventListener("load", vanish);

  function vanish() {
    loader.classList.add("dissapear");
    loader2.classList.add("dissapear");
  }