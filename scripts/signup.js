  
  let form = document.getElementById('signUpForm');

  form.addEventListener('submit',(e)=>{
     e.preventDefault();

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
 

     fetch('http://localhost:8765/auth/register',{
       method:'POST',
       body:JSON.stringify({
           username: username,
           password: password,
           firstName: firstName,
           lastName: lastName,
           address:{
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
     .then(function(response){
       return response.json();
     })
     .then(function(body){
       console.log(body);
     })

  })


