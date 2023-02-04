
let form = document.getElementById('signUpForm');




document.getElementById('password').onfocus = function () {
  document.getElementById('warnings').style.display = 'block';
}

document.getElementById('password').onblur = function () {
  document.getElementById('warnings').style.display = 'none';
}

var uppercase = false;
var lowercase = false;
var special = false;
var numeric = false;
var greaterthan8 = false;
var isSpace = true;

function check() {
  uppercase = false;
  lowercase = false;
  special = false;
  numeric = false;
  greaterthan8 = false;
  isSpace = false;
  var text = document.getElementById('password').value;



  for (let i = 0; i < text.length; i++) {
    if (text.length >= 8) {
      greaterthan8 = true;
    }
    if (text[i] >= "A" && text[i] <= "Z") {
      uppercase = true;
    } else if (text[i] >= "a" && text[i] <= "z") {
      lowercase = true;
    } else if (text[i] >= "0" && text[i] <= "9") {
      numeric = true;
    }
    else if (text[i] == " ") {
      isSpace = true
    } else {
      special = true;
    }
  }

  if (lowercase) {
    document.getElementById('low').childNodes[0].src = 'correct.png';
  } else {
    document.getElementById('low').childNodes[0].src = 'incorrect.png';
  }

  if (uppercase) {
    document.getElementById('upp').childNodes[0].src = 'correct.png';
  } else {
    document.getElementById('upp').childNodes[0].src = 'incorrect.png';
  }

  if (greaterthan8) {
    document.getElementById('len').childNodes[0].src = 'correct.png';
  } else {
    document.getElementById('len').childNodes[0].src = 'incorrect.png';
  }

  if (special) {
    document.getElementById('spe').childNodes[0].src = 'correct.png';
  } else {
    document.getElementById('spe').childNodes[0].src = 'incorrect.png';
  }

  if (numeric) {
    document.getElementById('num').childNodes[0].src = 'correct.png';
  } else {
    document.getElementById('num').childNodes[0].src = 'incorrect.png';
  }

  if (!isSpace) {
    document.getElementById('spa').childNodes[0].src = 'correct.png';
  } else {
    document.getElementById('spa').childNodes[0].src = 'incorrect.png';
  }

}


form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (uppercase && lowercase && greaterthan8 && special && numeric && isSpace) {
    let username = document.getElementById('username').value;
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let password = document.getElementById('password').value;
    let pincode = document.getElementById('pincode').value;
    let state = document.getElementById('state').value;
    let city = document.getElementById('city').value;
    let details = document.getElementById('details').value;
    let mobile = document.getElementById('mobile').value;
    let email = document.getElementById('email').value;
    let country = document.getElementById('country').value;

    console.log(username, password, pincode, state, city, details, email, country);


    fetch('http://localhost:8765/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        address: {
          pincode: pincode,
          state: state,
          city: city,
          details: details
        },
        mobileNumber: mobile,
        email: email,
        country: country
      }),
      headers: {
        "Content-type": "application/json"
      }

    })
      .then(function (response) {
        return response.json();
      })
      .then(function (body) {
        console.log(body);
      })
  }


})




