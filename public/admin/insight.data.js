
async function gettingDataNumber(data, data2){   
    let main = document.querySelector('#mainNumber').childNodes;
    main[1].lastChild.innerHTML = data2;
    main[3].lastChild.innerHTML = data[0].total
    main[5].lastChild.innerHTML = data[1].total   
}

function renderData(elements) {
    let place = document.querySelector(".main-data-container");
    place.innerHTML = "";
    elements.forEach((el) => {
        let html = `<div class="order-item">
        <span>${el.item_name}</span><span>${el.order_price}</span><span>${el.order_approved}</span><br>
        <span>${new Date(el.order_date).toLocaleDateString()}</span><span>${el.room_no}</span><span>${el.order_qnt}</span>
        </div>`
        place.insertAdjacentHTML('afterbegin', html)
    });
}

document.getElementById("date").defaultValue = dateFuck(new Date());
function dateFuck(tarikh) {
    let {m, d, y} = {m : tarikh.getMonth() + 1, d: tarikh.getDate(),  y : tarikh.getFullYear()}
    m = m > 10 ? m : "0"+m
    d = d > 10 ? d : "0"+d
    let currDate = `${y}-${m}-${d}`;
    return currDate;}

function getPrevDate(x) {
    let dataDate = dateFuck(new Date());
    let dt = new Date(dataDate);
    dt.setDate(dt.getDate() - x);
    return dateFuck(dt);}

async function getPrevdata(even) {
   let num = even.target.value;
   let dataFromTo = {start: dateFuck(new Date()), end: num}
    let fet = await fetch('/getByPeriod', {method: 'POST', body: JSON.stringify(dataFromTo), headers : { "Content-Type": "application/json"}});
    let response = await fet.json();
    gettingDataNumber(response[1], response[0].length)
    console.log(response, response.length);
}

async function getPrevdataBydate(even) {
    let num = even === undefined ? dateFuck(new Date())  : even.target.value;
    let dataFromTo = {start: num}
     let fet = await fetch('/getByDate', {method: 'POST', body: JSON.stringify(dataFromTo), headers : { "Content-Type": "application/json"}});
     let response = await fet.json();
     console.log(response[0]);
     gettingDataNumber(response[1], response[0].length)
     renderData(response[0]);
 }

 getPrevdataBydate();


