console.log('welcome to your order');

console.log(document.cookie.split(";")[0].split("=")[1]);

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

async function mycartData(){
    if (document.cookie.split(";")[0].split("=")[1] != undefined) {
      const fet = await fetch('/getcartitem', {method: 'POST', body: JSON.stringify({num : document.cookie.split(";")[0].split("=")[1]}), headers :{"Content-Type": "application/json"}})
      const response = await fet.json() ;
      console.log(response)
      myordercarteach(response)
    }
  }

  
function myordercarteach(element) {
    element.forEach((el)=>{
      let html = `<div class="perorder">
      <span>${el.item_name}</span><span class="price-item">${el.order_price}</span><span>${el.order_approved}</span><span>Qnt: 1</span><br>
      <span>${el.order_time}</span><span>${new Date(el.order_date).toLocaleDateString()}</span><span>${el.order_cus_number}</span><span>room :3</span>
      </div>`
      document.querySelector(".myeachorder").insertAdjacentHTML("afterbegin", html);
      calculateBill("perorder", "cartBill")
    })
  
  }
  
mycartData();