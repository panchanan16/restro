console.log("Welcome to main admin page");

async function POSTreq(route, data){
  let fet = await fetch(`/${route}`, {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}})
  let res = await fet.json();
  return res;
}

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
  document.getElementById("order-items").innerHTML = "";
  res.result.forEach((el)=>{
      let html = `<div class="orderItem ${el.order_serve ? 'served' : ''}" id="${el.order_id}">
      <p id="name">${el.item_name}<b>Room No: <span>${el.room_no}</span></b> </p>
      <p><span>&#8377;${el.order_price}</span><span>${el.order_cus_number}</span></p>
      <p><span>Qt: ${el.order_qnt}</span>
          <span>${new Date(el.order_date).toLocaleDateString()}</span>
      </p>
      <p id="act">${el.order_approved}</p>
      <div class="btn">
          <button onclick="updateTime(event)">update-time</button><button onclick="orderServed(event)">served</button>
      </div>
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
            <p id="orderNmae">${el.item_name} <span>&#8377;${el.order_price}</span></p>
            <p><span>Qt: ${el.order_qnt}</span>
                <span>Room No:${el.room_no}</span>
                
            </p>
            <p><span>${el.order_time}</span> <span>${new Date(el.order_date).toLocaleDateString()}</span></p>
            <div class="btn">
                <button id="acceptBtn" onclick="orderAccept(event)">Accept</button>
                <button id="rjctBtn" onclick="orderReject(event)">Reject</button>
            </div>
        </div>`
    space.insertAdjacentHTML("afterbegin", html);
    });
  }; 
function stopdata() {sseSource.close()}

function orderAccept(evet){
  let orderId = {Id: document.getElementById("eachOrder").dataset.ordid}
  fetch('/statusAccept', {method: 'POST', body: JSON.stringify(orderId), headers: {'Content-Type': 'application/json'}}).then((res)=>{return res.json()}).then((data)=>{console.log(data)});
  evet.target.parentNode.parentNode.remove();
}

function orderReject(evet){
  let orderId = {Id: document.getElementById("eachOrder").dataset.ordid}
  fetch('/statusReject', {method: 'POST', body: JSON.stringify(orderId), headers: {'Content-Type': 'application/json'}}).then((res)=>{return res.json()}).then((data)=>{console.log(data)});
  evet.target.parentNode.parentNode.remove();
}

// document.getElementById("cancel").addEventListener('click', stopdata)

function voice() {
  const audio = new Audio("orderVoice.mp3");
  audio.play();
}

function NewTab() {window.open("/insight");}

function itemPage() {window.open("/add-item");}


async function orderServed(eve){
  let req = await POSTreq('orderserve', {id: eve.target.parentNode.parentNode.id});
  eve.target.parentNode.parentNode.classList.add('served');
  console.log(req);
}





