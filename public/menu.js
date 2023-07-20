
let room = window.location.href.toString().split("/")[4];
async function category_get() {
  let fet = await fetch('/category')
  let res = await fet.json();
  res.forEach(elem => {
    let html = `<div class="categoryItem"><img src="/img/vegr.jpg" alt="food">
    <p class="categoryItem-name"  onclick="filter_cat(event)">${elem.category}</p></div>`;
    document.querySelector('.main-category').innerHTML += html;
  });
}
category_get();

function removeItem(even) {
  even.target.parentNode.parentNode.remove();
  calculateBill('item-selected', 'bill');
}

function addItemToCartWithAmount(eli, mainel, cartbox, arr, itemP) {
  let validation = eli.target.parentNode.querySelector("#offer")
  let html = `<div class="itemAdded item-selected" data-itemid="${eli.target.parentNode.parentNode.dataset.itemid}" data-itemprice="${itemP != undefined ? itemP : mainel[1].childNodes[5].querySelector('.price-item').innerHTML}">  
  <p><span class="fa-solid fa-dice-one"></span>${mainel[1].childNodes[3].innerHTML}</p>
  <p><span id="price-value">${arr != undefined ? arr : mainel[1].childNodes[5].innerHTML}</span></p>
  ${validation != null ? `<p class="newOffer"><img src="/img/offer.svg" alt=""><span id="offApply">${mainel[3].querySelector("#offer").innerHTML}</span></p>` : ''}
  <div class="applyOffer">
    ${validation != null ? `<span onclick="applyOffer(event)"><img src="/img/offer.svg" alt="">Apply Offer</span>` : ''}
    <span onclick="removeItem(event)">Remove&nbsp;&minus;</span>
  </div>
  <div>
  <div class="qnt-cart wrapper">
   <span class="quantity">Qt:</span>
   <span class="minus" onclick="qntCartDecrease(event, 'menubox')">-</span>
   <span class="num">1</span>
   <span class="plus" onclick="qntCartIncrease(event, 'menubox')">+</span>
   </div></div></div>`
  cartbox.insertAdjacentHTML('afterbegin', html);
  calculateBill("item-selected", "bill");
}

function addtocart(eli, cartboxid) {
  let cartbox = document.getElementById(cartboxid)
  let mainel = eli.target.parentNode.parentNode.childNodes;
  let halfPrice = eli.target.parentNode.parentNode.querySelector('#half_price');
  if (halfPrice != null) {let popUpamount = document.querySelector('.item-amount');
    popUpamount.classList.remove('hide');
    popUpamount.querySelector('.half').childNodes[1].value = mainel[1].childNodes[7].childNodes[3].innerHTML;
    popUpamount.querySelector('.full').childNodes[1].value = mainel[1].childNodes[5].childNodes[4].innerHTML;
    function addAmountButton(){
      let add = document.getElementById('item-added-quantity')
      add.innerHTML = Number(add.innerHTML) + 1;
      let itemP = popUpamount.querySelector('input[name="fuck"]:checked').value
      let arrAmount = `<i class="fa-solid fa-circle"></i><span>&nbsp;</span>
       &#8377;<span class="weight price-item">${itemP}</span>/-`
      addItemToCartWithAmount(eli, mainel, cartbox, arrAmount, itemP);
      popUpamount.classList.add('hide');
      eli.target.parentNode.querySelector('.wrapp').classList.add('active')
      eli.target.classList.add('active');
      let fullhalfqntvalue = popUpamount.querySelector('.num').innerHTML;
      let itemIdd = mainel[0].parentNode.dataset.itemid;
      cartbox.childNodes.forEach((element)=>{
        if (element.dataset && element.dataset.itemid === itemIdd) {
          element.querySelector('.num').innerHTML = fullhalfqntvalue;
          mainel[0].parentNode.querySelector('.num').innerHTML = fullhalfqntvalue;
          popUpamount.querySelector('.num').innerHTML = 1; }})
      // document.getElementById('add-amount-button').removeEventListener('click', addAmountButton)
    }
    document.getElementById('add-amount-button').onclick = addAmountButton;
  } else {addItemToCartWithAmount(eli, mainel, cartbox);}
}
function calculateBill(className, idName) {
  let price = document.querySelectorAll(`.${className}`);
  if (price.length > 0) {
    let pricePerItem = Array.from(price).map((el) => {return Number(el.querySelector(".price-item").innerHTML);})
    let bill = pricePerItem.reduce((acc, curr) => { return acc + curr; })
    document.getElementById(idName).innerHTML = `${bill}`
  } else {document.getElementById(idName).innerHTML = "";}
}

function calldata() {
  console.log('btn clicked hence proved')
  let num ;
  if (document.cookie.split(";")[0].split("=")[1] === undefined) {
    num = setcook();
    console.log(collectdata(num));
    fetch("/order", {
      method: "POST",
      body: JSON.stringify({ data: collectdata(num) }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => { return response.json() }).then((res) => { console.log(res) })
  } else {
    num = document.cookie.split(";")[0].split("=")[1];
    fetch("/order", {
      method: "POST",
      body: JSON.stringify({ data: collectdata(num) }),
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
      arr.push(new Array(el.dataset.itemid, el.dataset.itemprice, el.querySelector('.num').innerHTML, 'image', 'category', room, '0', '', currDate, currtime, numb))
    });
    return arr;
  }
}

let orderBtn = document.querySelectorAll('#orderNow')
orderBtn.forEach((el) => {
  el.addEventListener('click', calldata);
})

function applyOffer(even) {
  if (even.target.parentNode.parentNode.querySelector("#offApply") != null) {
    let off = Number(even.target.parentNode.parentNode.querySelector("#offApply").innerHTML.replace(/off|%/g, ""));
    let ogPrice = Number(even.target.parentNode.parentNode.querySelector(".price-item").innerHTML);
    let discountPrice = ogPrice - (off / 100) * ogPrice
    even.target.parentNode.parentNode.querySelector(".price-item").innerHTML = `${discountPrice}`
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
  Array.from(ActualCat).forEach((el) => {
    if (el.dataset.cate != eve.target.textContent) {
      document.querySelector('.title').innerHTML = eve.target.textContent;
      el.style.display = 'none';
    } else { el.style.display = 'flex' }
  })
}

function filter_cat_al() {
  document.querySelectorAll('.menubox').forEach((el) => {
    document.querySelector('.title').innerHTML = "All";
    el.style.display = 'flex';
  })
}

function redirectToMyOrder() {
  location.href = 'myAllorders';
}

let spanadd = document.querySelectorAll(".spanAdd");
spanadd.forEach((el) => {
  el.onclick = function () {
    if (el.parentNode.parentNode.querySelector('.halfPrice') === null) {let add = document.getElementById('item-added-quantity')
      el.classList.toggle("active");
      el.parentNode.querySelector('.wrapp').classList.toggle("active");
      document.querySelector('.footer-cart').style.display = 'flex';
      document.querySelector('.footer-icons').style.bottom = "4rem";
      add.innerHTML = Number(add.innerHTML) + 1;
    }
    addtocart(event, 'cartbox');
  }})

  function increasePriceOnQnt(arg, element, i) {
    if (arg.dataset.itemprice != null) {let p = arg.dataset.itemprice; 
        arg.querySelector('.price-item').innerHTML = p * i;                
    }else{element.querySelector('.price-item').innerHTML = element.dataset.itemprice * i;} 
}

function qntCartIncrease(even, className) {let evenParent = even.target.parentNode;
    let i = evenParent.childNodes[5].innerHTML;
    i++;
    evenParent.childNodes[5].innerHTML = i;
    if (className != null) {
        document.querySelectorAll(`.${className}`).forEach((elem) => {
        if (evenParent.parentNode.parentNode.dataset.itemid === elem.dataset.itemid) { 
            elem.querySelector('.num').innerHTML = i; 
            increasePriceOnQnt(evenParent.parentNode.parentNode, elem, i)
        }}) 
    }
    calculateBill("item-selected", "bill");
}


function qntCartDecrease(even, className) {let evenParent = even.target.parentNode;
  let i = even.target.parentNode.childNodes[5].innerHTML;
  i--;
  if (className === null) {if (i < 1) {i = 1;}};
  even.target.parentNode.childNodes[5].innerHTML = i;
  if (className != null) {
      document.querySelectorAll(`.${className}`).forEach((elem) => {
          if (even.target.parentNode.parentNode.parentNode.dataset.itemid === elem.dataset.itemid) {
              elem.querySelector('.num').innerHTML = i;
              increasePriceOnQnt(evenParent.parentNode.parentNode, elem, i)  
              let addFooter = document.getElementById('item-added-quantity');
              if (i < 1) {i = 1;
                  even.target.parentNode.childNodes[5].innerHTML = i;
                  elem.querySelector('.num').innerHTML = i;
                  addFooter.innerHTML = addFooter.innerHTML - 1;
                  if (addFooter.innerHTML < 0) {addFooter.innerHTML = 0; }
                  if (className === 'item-selected') {
                      even.target.parentNode.parentNode.querySelector('.spanAdd').classList.toggle('active');
                      even.target.parentNode.classList.toggle('active');
                      elem.remove();}
              } else { i = i }
          }
      })
  }
  calculateBill("item-selected", "bill");
}














