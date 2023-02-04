document.getElementById('password').onfocus = function () {
  document.getElementById('warnings').style.display = 'block';
}

document.getElementById('password').onblur = function () {
  document.getElementById('warnings').style.display = 'none';
}
const cookie = document.cookie.split("=")[1];

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

var form = document.getElementById('userForm')
form.addEventListener('submit', (e) => {

  e.preventDefault();
  let username = form.username.value; let firstName = form.firstname.value; let lastName = form.lastname.value; let password = form.password.value; let number = form.phone.value; let email = form.email.value; let city = form.city.value; let state = form.state.value; let pincode = form.pincode.value; let details = form.details.value; let country = form.country.value;
  if (uppercase && lowercase && !isSpace && special && numeric && greaterthan8) {
    let address = {
      "state": state,
      "city": city,
      "pincode": pincode,
      "details": details
    }
    console.log(address);
    fetch('http://localhost:8765/buy_EZ/admin/add', {
      method: 'POST',

      body: JSON.stringify({
        'username': username,
        'firstName': firstName,
        'lastName': lastName,
        'password': password,
        'mobileNumber': number,
        'email': email,
        'address': {
          'city': city,
          'state': state,
          'details': details,
          'pincode': pincode
        },
        'country': country
      }),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${cookie}`
      }
    }).then(response => {
      if (response.ok) {

        return response.json();
      } else {
        return Promise.reject(response);
      }
    }).then(response => {
      console.log(response);
      document.getElementById('submit').value = 'Added Admin successfully!'
      form.reset();
      return false;
    }).catch(response => {
      return response.json().then(response => { console.log(response) })
    })

  }
  else {
    console.log('error');
  }
})

