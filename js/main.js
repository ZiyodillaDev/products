// Navbar Shrink
window.onscroll = function () {
    scrollFunction();
  };
  
  function scrollFunction() {
    if (document.documentElement.scrollTop > 150) {
      document.getElementById("navbar").classList.add("navbar-shrink");
    } else {
      document.getElementById("navbar").classList.remove("navbar-shrink");
    }
  }

  
// Backtop
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})


// Main codes

const elCards= document.querySelector(`.cards`)
elCards.setAttribute("class","row gap-3 justify-content-between pt-5 center")
const elInput= document.querySelector(`.js-input`)
const elSelect = document.querySelector('#js-select')
const elTemplate = document.querySelector(`template`).content
let docFragment = document.createDocumentFragment();

let region;
async function countries(){
    const response =await fetch(`https://restcountries.com/v3.1/all`)
    const data = await response.json()
    renderPosts(data,elCards) 
   
    const newRegion = new Set(data.map((el)=>el.region))
    
    for( i of newRegion){
const elOption =document.createElement('option')
elOption.textContent =i
elSelect.appendChild(elOption)

}
elSelect.addEventListener('change', (evt)=>{
region = elSelect.value
async function FilterRegion(){
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`)
    const data = await res.json()
    renderPosts(data,elCards)
}
FilterRegion()
})

}
countries()

function renderPosts(array,node){

    node.innerHTML = ""
    array.forEach(el => {
        let elCard =elTemplate.cloneNode(true)
        let elImg = elCard.querySelector(`.card-img-top`)
        let elTitle =elCard.querySelector(".card-title")
        let elPopular =elCard.querySelector(`.popular`)
        let elCapital =elCard.querySelector(".capital")
        let elRegion =elCard.querySelector(`.region`)

        elImg.src = el.flags.svg
        elTitle.textContent = el.name.common
        elPopular.textContent ='Population:  ' + el.population
        elCapital.textContent ='Capital:  ' + el.capital
        elRegion.textContent ='Region:  ' + el.region 

        docFragment.appendChild(elCard)
});
node.appendChild(docFragment)

}

let nameCountry ;

elInput.addEventListener('input',()=>{
 if (elInput.value !== "") {
    nameCountry = elInput.value
    SearchFunc()
 }
})

const SearchFunc = async () =>{
    const res =await fetch(`https://restcountries.com/v3.1/name/${nameCountry}`)
    const data = await res.json()
    renderPosts(data,elCards)

}

const elMode =document.querySelector('.js-mode')
const header =document.querySelector('header')
const logo =document.querySelector('.brand-title')
let theme =false
elMode.addEventListener('click', ()=>{
    theme =!theme
    const bg =theme ? 'dark':'light';
    window.localStorage.setItem('theme',bg)
    ChangeTheme()
})
function ChangeTheme() {
    if (window.localStorage.getItem("theme" ) == "dark") {
        document.body.classList.add('dark')
        elMode.classList.add('btn')
        header.classList.add('dark')
        logo.classList.add('dark-text')
    }else{
        document.body.classList.remove('dark')
        elMode.classList.remove('btn')
        header.classList.remove('dark')
        logo.classList.remove('dark-text')
    }
}
ChangeTheme()
