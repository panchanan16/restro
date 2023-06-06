console.log("Welcome to menu page");

let room = window.location.href.toString().split("/")[4];

function removeItem(even) {
  even.target.parentNode.remove();
  calculateBill()
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
  calculateBill();
}
function calculateBill() {
  let price = document.querySelectorAll(".item-selected");
  if (price.length > 0) {
    let pricePerItem = Array.from(price).map((el) => { return Number(el.querySelector(".price-item").innerHTML.replace("$", "")); })
    let bill = pricePerItem.reduce((acc, curr) => { return acc + curr; })
    document.getElementById('bill').innerHTML = `$ ${bill}`
  } else {
    document.getElementById('bill').innerHTML = ""
  }
}

function calldata() {
  let num;
  if (document.cookie.split(";")[0].split("=")[1] === undefined) {
    num = setcook();
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

function collectdata(num) {
  let arr = [];
  let dateCur = new Date();
  let currDate = `${dateCur.getFullYear()}-${dateCur.getMonth() + 1}-${dateCur.getDate()}`
  let currtime = `${dateCur.getHours()}:${dateCur.getMinutes()}`
  let databox = document.getElementById('cartbox');
  if (databox.childNodes.length > 1) {
    databox.querySelectorAll(".item-selected").forEach((el) => {
      arr.push(new Array(el.dataset.itid, el.childNodes[2].innerHTML, 'Qnt : 1', 'image', 'category', room, '0', '', currDate, currtime, num))
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
    calculateBill();
  } else { console.log("No  discount available on this product") }
  even.target.removeAttribute("onclick");

}


async function setcook() {
  let number = prompt("Enter Your Phone Number");
  document.cookie = `username=${number}; max-age=` + 3600;
  return number;
}

async function mycartData(){
  if (document.cookie.split(";")[0].split("=")[1] != undefined) {
    const fet = await fetch('/getcartitem', {method: 'POST', body: JSON.stringify({num : document.cookie.split(";")[0].split("=")[1]}), headers :{"Content-Type": "application/json"}})
    const response = await fet.json() ;
    console.log(response)
  }
}


function cowndown(out) {
  let aim = out * 60;
  let x = setInterval(() => {
    if (aim < 1) {
      clearInterval(x)
    }else{
      aim = aim - 1
      let time = `${Math.floor(aim/60)} min ${aim%60}sec left`
      console.log(time)  ; 
    }
    
  }, 1000);
}

cowndown(.1);










