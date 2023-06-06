console.log("Welcome to js File")


  async function getVal() {
        let mainData = document.querySelector('.fill')
        let data = {username: mainData.childNodes[1].value, password: mainData.childNodes[4].value }
        let retun = await fetch('http://localhost:3000/user/admin', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json', 
              Authorization: `Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg1MDE3NTY3LCJleHAiOjE2ODU2MTc1Njd9.FxLcj0-VzZMqpyNI6fhw1Jjx8YFhT4aNgYyh_bPPJI0`}
        })
      if(retun.redirected === true){
        window.location.href = retun.url;
      }else{
        console.log(await retun.json());
      }
    }


document.getElementById('login-btn').addEventListener('click', getVal)

