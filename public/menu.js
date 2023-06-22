console.log("Welcome to menu page");

let room = window.location.href.toString().split("/")[4];

async function category_get(){
  let fet = await fetch('/category')
  let res = await fet.json();
  //console.log(res);
  res.forEach(elem => {
    let html = `<span class="eachcat" onclick="filter_cat(event)">${elem.category}</span>`;
    document.querySelector('.category').innerHTML += html;
  });
}
category_get();

function removeItem(even) {
  even.target.parentNode.remove();
  calculateBill('item-selected', 'bill');
} 

function addtocart(eli, cartboxid) {
  let cartbox = document.getElementById(cartboxid)
  let mainel = eli.target.parentNode.childNodes
  let html = eli.target.parentNode.querySelector("#offer") === null ? `<div class="item-selected" data-itid="${eli.target.parentNode.dataset.itemid}">
  <span>${mainel[1].innerHTML}</span><span class="price-item">${mainel[3].innerHTML}</span><br>
  <span>Qt: 1</span><button onclick="removeItem(event)">remove</button></div>` :
    `<div class="item-selected" data-itid="${eli.target.parentNode.dataset.itemid}">
  <span>${mainel[1].innerHTML}</span><span class="price-item">${mainel[3].innerHTML}</span> <span id="offApply">${eli.target.parentNode.querySelector("#offer").innerHTML}</span><br>
  <span>Qt: 1</span><button id="applyOffer" onclick="applyOffer(event)">Apply offer</button><button onclick="removeItem(event)">remove</button></div>`
  let fillter = Array.from(cartbox.childNodes).filter((el) => {
    if (el.dataset) { return el.dataset.itid === eli.target.parentNode.dataset.itemid; }
  })
  fillter.forEach((el) => { if (el) { cartbox.removeChild(el); } })
  cartbox.insertAdjacentHTML('afterbegin', html);
  calculateBill("item-selected", "bill");
}
function calculateBill(className, idName) {
  let price = document.querySelectorAll(`.${className}`);
  if (price.length > 0) {
    let pricePerItem = Array.from(price).map((el) => { return Number(el.querySelector(".price-item").innerHTML.replace("$", "")); })
    let bill = pricePerItem.reduce((acc, curr) => { return acc + curr; })
    document.getElementById(idName).innerHTML = `$ ${bill}`
  } else {
    document.getElementById(idName).innerHTML = ""
  }
}

function calldata() {
  let num;
  if (document.cookie.split(";")[0].split("=")[1] === undefined) {
    num = setcook();
    console.log(collectdata(num));
    fetch("/order", {
    method: "POST",
    body: JSON.stringify({ data: collectdata(num)}),
    headers: {
      "Content-Type": "application/json"
    }
  }).then((response) => { return response.json() }).then((res) => { console.log(res) })
  }else{
    num = document.cookie.split(";")[0].split("=")[1];
    fetch("/order", {
    method: "POST",
    body: JSON.stringify({ data: collectdata(num)}),
    headers: {
      "Content-Type": "application/json"
    }
  }).then((response) => { return response.json() }).then((res) => { console.log(res) })
  }
}

function collectdata(numb) {
  let arr = [];
  let dateCur = new Date();
  let currDate = `${dateCur.getFullYear()}-${dateCur.getMonth() + 1}-${dateCur.getDate()}`
  let currtime = `${dateCur.getHours()}:${dateCur.getMinutes()}`
  let databox = document.getElementById('cartbox');
  if (databox.childNodes.length > 1) {
    databox.querySelectorAll(".item-selected").forEach((el) => {
      arr.push(new Array(el.dataset.itid, el.childNodes[2].innerHTML, 'Qnt : 1', 'image', 'category', room, '0', '', currDate, currtime, numb))
    });
    return arr;
  }
}

let orderBtn = document.querySelectorAll('#orderNow')
orderBtn.forEach((el) => {
  el.addEventListener('click', calldata);
})

function applyOffer(even) {
  if (even.target.parentNode.querySelector("#offApply") != null) {
    let off = Number(even.target.parentNode.querySelector("#offApply").innerHTML.replace(/off|%/g, ""));
    let ogPrice = Number(even.target.parentNode.querySelector(".price-item").innerHTML.replace('$', ''));
    let discountPrice = ogPrice - (off / 100) * ogPrice
    even.target.parentNode.querySelector(".price-item").innerHTML = `$ ${discountPrice}`
    calculateBill("item-selected", "bill");
  } else { console.log("No  discount available on this product") }
  even.target.removeAttribute("onclick");

}

function setcook() {
  let number = prompt("Enter Your Phone Number");
  document.cookie = `username=${number}; max-age=` + 3600;
  return number;
}

function filter_cat(eve) {
  let ActualCat = document.querySelectorAll('.menubox')
  Array.from(ActualCat).forEach((el)=>{
     if (el.dataset.cate != eve.target.textContent) {el.classList.add("hide");}else{el.classList.remove("hide")}
  }) 
}

function filter_cat_al(){
  document.querySelectorAll('.menubox').forEach((el)=>{
    el.classList.remove("hide");
  })
}











