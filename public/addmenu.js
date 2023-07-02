console.log('Welcome to addmenu.js')

async function updateOrdelete() {
    const fet = await fetch('/getitembyadmin')
    const res = await fet.json()
    res.forEach((el) => {
        let html = `<tr id="${el.item_id}">
    <td>${el.item_name}</td>
    <td>${el.category}</td>
    <td>$ ${el.item_price}</td>
    <td>${el.item_offer}</td>
    <td><button onclick="updateMenu(event)">update</button></td>
  </tr>`
        document.getElementById('item_table').innerHTML += html;
    });
}

updateOrdelete();

function deleteItem(e) {
    let dlid = e.target.parentNode.parentNode.id;
    fetch('/deleteitem', {
        method: "POST",
        body: JSON.stringify({ data: dlid }),
        headers: {"Content-Type": "application/json"}
    })
}

function updateMenu(eve){
   const updateBox = document.querySelector('.update-item').childNodes
   updateBox[1].parentNode.classList.toggle('hide');
   const updateData = eve.target.parentNode.parentNode.childNodes;
   let updateForm = updateBox[3].childNodes;
   updateForm[1].value = updateData[1].innerHTML;
   updateForm[3].value = updateData[3].innerHTML;
   updateForm[5].value = updateData[5].innerHTML.replace('$', '');
   updateForm[9].value = updateData[7].innerHTML;
   updateForm[11].value = updateData[1].parentNode.id;
}

async function dynamicCategory(){
  let fet = await fetch('/categ-ories');
  let res = await fet.json();
  console.log(res);
  res.forEach((el)=>{
    let html = `<option value="${el.cat_id}">${el.category}</option>`;
    document.getElementById("cat").innerHTML += html;
    document.getElementById("catU").innerHTML += html;
  })
}

dynamicCategory();

// async function SubmitUpdateMenu(e) {
//     e.preventDefault();

// }