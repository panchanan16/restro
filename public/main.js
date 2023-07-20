//SLIDER

let slideIndex = 0;
showSlides();

function showSlides() {let i;
    let slides = document.getElementsByClassName("mySlide");
    for (i = 0; i < slides.length; i++) {slides[i].style.display = "none";}
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1;}
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000);
}
//SEARCH ICON
const searchIcon = document.querySelector(".search-icon");
const searchBox = document.querySelector(".search-input");
const phone = document.querySelector(".fa-phone")

searchIcon.onclick = function () {searchBox.classList.toggle("active");
    searchIcon.classList.toggle("active");
    phone.classList.toggle("active");
}

// FOOTER MENU
let icons = document.querySelectorAll(`.icons`);

function activeLink() {icons.forEach((item) =>
        item.classList.remove(`active`));
    this.classList.add(`active`);
}

icons.forEach((item) =>item.addEventListener('click', activeLink));

document.getElementById("times").addEventListener("click", function () {
    document.querySelector(".my-cart").classList.add('hide');
})
document.getElementById("cross").addEventListener("click", function () {
    let a = document.querySelector(".item-amount")
    a.classList.add('hide')
    a.querySelector('.num').innerText = 1;

})


let half = document.querySelector(".half");
let full = document.querySelector(".full");

half.onclick = function () {half.classList.toggle("active");
    full.classList.remove("active");}
full.onclick = function () {full.classList.toggle("active");
    half.classList.remove("active");}

function gotocart() { document.querySelector('.my-cart').classList.remove('hide'); }

document.getElementById('see-all-Offer').onclick = function () { document.querySelector('.all-offers').classList.toggle('hide'); }


