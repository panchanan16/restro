console.log("Welcome to main admin page");

function dateFuck(tarikh) {
  let {m, d, y} = {m : tarikh.getMonth() + 1, d: tarikh.getDate(),  y : tarikh.getFullYear()}
  m = m > 10 ? m : "0"+m
  d = d > 10 ? d : "0"+d
  let currDate = `${y}-${m}-${d}`;
  return currDate;}

async function adminhomeData(even) {
  let num = even === undefined ? 2 : even.target.value;
  let dataFromTo = {start: dateFuck(new Date()), end: num}
  let data = await fetch('/adminhome',  {method: 'POST', body: JSON.stringify(dataFromTo), headers : { "Content-Type": "application/json"}});
  let res  = await data.json();
  res.result.forEach((el)=>{
      let html = `<div class="order-item">
      <span>${el.item_name}</span><span>${el.order_price}</span><span>${el.order_approved}</span><span>${el.order_cus_number}</span><br>
      <span>${new Date(el.order_date).toLocaleDateString()}</span><span>${el.room_no}</span><span>${el.order_qnt}</span><button onclick="updateTime(event)">update-time</button>
      </div>`
      document.getElementById("order-items").insertAdjacentHTML("afterbegin", html);
  })
}
adminhomeData();

function updateTime(even){
  let num = even.target.parentNode.childNodes;
  console.log(num[4].innerHTML);
  let time = prompt("Enter time in 'Minute'")
  fetch('/updatetime', {method: 'POST', body: JSON.stringify({time : time, cus: num[4].innerHTML, date : dateFuck(new Date())}), headers : { "Content-Type": "application/json"}})
}

function changeInput(even) {
  document.getElementById('searchbar').placeholder = "search By Date"
}

const sseSource = new EventSource("http://localhost:3000/real");
sseSource.onmessage = function (event) {
  let space = document.getElementById("orders");
  space.innerHTML = "";
  voice();
    let indata = JSON.parse(event.data);
    indata.forEach((el)=> {
      let html = `<div id="eachOrder" data-ordid="${el.order_id}">
      <span>${el.item_name}</span><span>${el.order_price}</span><br>
      <span>${el.order_qnt}</span><span>room no : ${el.room_no}</span><br>
      <span>${el.order_time}</span><span>${new Date(el.order_date).toLocaleDateString()}</span><img src="" alt="no image"><br>
      <button id="acceptBtn" onclick="orderAccept(event)">Accept</button><button onclick="orderReject(event)">Reject</button>
        </div>`
    space.insertAdjacentHTML("afterbegin", html);
    });
  }; 
function stopdata() {sseSource.close()}

function orderAccept(evet){
  let orderId = {Id: document.getElementById("eachOrder").dataset.ordid}
  fetch('/statusAccept', {method: 'POST', body: JSON.stringify(orderId), headers: {'Content-Type': 'application/json'}}).then((res)=>{return res.json()}).then((data)=>{console.log(data)});
  evet.target.parentNode.remove();
}

function orderReject(evet){
  let orderId = {Id: document.getElementById("eachOrder").dataset.ordid}
  fetch('/statusReject', {method: 'POST', body: JSON.stringify(orderId), headers: {'Content-Type': 'application/json'}}).then((res)=>{return res.json()}).then((data)=>{console.log(data)});
  evet.target.parentNode.remove();
}

document.getElementById("cancel").addEventListener('click', stopdata)

function voice() {
  const audio = new Audio("orderVoice.mp3");
  audio.play();
}

function NewTab() {window.open("/insight");}

function itemPage() {window.open("/add-item");}





