import { loaderHtml } from "./loader.js";
import { loaderAnimation } from "./loader.js";

// document.getElementById("logo").innerHTML += loaderHtml;
//     loaderAnimation(); 

let form = document.getElementById("signinForm");

form.addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById("response").innerText = "";
  let id = form.id.value;
  let username = form.username.value;
  let password = form.password.value;


  fetch('http://localhost:8765/buy_EZ/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      id: id,
      username: username,
      password: password,
    }),
    headers: {
      "Content-type": "application/json"
    }

  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(function (body) {
      let cookieArr = body.jwtToken.split(";");
      let name = cookieArr[0];
      let expiry = cookieArr[3];
      let age = cookieArr[2];
      let path = cookieArr[1];

      console.log(body.jwtToken + "; samesite=strict");
      document.cookie = name + "; " + expiry + "; Path=/";
      window.location.href = 'home.html'
      //buyEZUserCookie=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmEzZWVrIiwiaWF0IjoxNjcyNzM5MjA5LCJleHAiOjE2NzI4MjU2MDl9.fytohyGaD_O9BmxFDHG0rbLtOILmtwyo9G7V6XFz-es; Path=/buy_EZ; Max-Age=86400; Expires=Wed, 04 Jan 2023 09:46:49 GMT

    })
    .catch((response) => {

      let textResponse = document.createElement("h3");
      textResponse.innerText = response.message;
      document.getElementById('response').append(textResponse);


      // 3. get error messages, if any
    });
})



