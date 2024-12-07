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

  function dateFuck(tarikh) {
    let {m, d, y} = {m : tarikh.getMonth() + 1, d: tarikh.getDate(),  y : tarikh.getFullYear()}
    m = m > 10 ? m : "0"+m
    d = d > 10 ? d : "0"+d
    let currDate = `${y}-${m}-${d}`;
    return currDate;}

async function mycartData(){
    if (document.cookie.split(";")[0].split("=")[1] != undefined) {
      let send = {num: document.cookie.split(";")[0].split("=")[1], date: dateFuck(new Date())}
      const fet = await fetch(`/getcartitem/${send.num}/${send.date}`);
      const response = await fet.json() ;
      console.log(response)
      myordercarteach(response)
    }
  }
  // {method: 'POST', body: JSON.stringify({num : document.cookie.split(";")[0].split("=")[1], date: dateFuck(new Date())}), headers :{"Content-Type": "application/json"}}

  let timeValue = '';
  
function myordercarteach(element) {
  if(!timeValue){
    timeValue = element[0].order_update;
  }
    element.forEach((el)=>{
      let html = `<div class="perorder ${el.order_approved === 'accepted' ? 'ordersprice' : ''}">
      <span>${el.item_name}</span><span class="price-item">${el.order_price}</span><span>${el.order_approved}</span><span>Qnt: 1</span><br>
      <span>${el.order_time}</span><span>${new Date(el.order_date).toLocaleDateString()}</span><span>${el.order_cus_number}</span><span>room :3</span>
      </div>`
      if(el.order_approved != ''){
        document.querySelector(".myeachorder").insertAdjacentHTML("afterbegin", html);
        calculateBill("ordersprice", "cartBill");
      }
    })
  cowndown(timeValue);
  }
  
mycartData();

function cowndown(out) {
  let aim = out * 60;
  let x = setInterval(() => {
    if (aim < 1) {clearInterval(x);}else{
      aim = aim - 1;
      let time = `${Math.floor(aim/60)} min ${aim%60}sec left`;
      document.getElementById('cowndown').innerHTML = time;
     }  
  }, 1000);
}