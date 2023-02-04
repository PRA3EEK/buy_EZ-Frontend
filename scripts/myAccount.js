let cookie = document.cookie;

// console.log(cookie)
if (cookie == "") {
    document.getElementById("details").append(document.createElement("h3").innerText = "You are not logged in");
} else {
    document.getElementById('userDetails').innerHTML = "";
    cookie = document.cookie.split("=")[1];
    fetch('http://localhost:8765/buy_EZ/user/details',
        {
            headers: {
                "Authorization": `Bearer ${cookie}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res);
            }
        }).then(res => {
            // console.log(res)
            let firstName = res.firstName;
            let lastName = res.lastName;
            let username = res.username;
            let userId = res.userId;
            let email = res.email;
            let phone = res.mobileNumber;
            let pincode = res.address.pincode;
            let city = res.address.city;
            let state = res.address.state;
            let details = res.address.details;
            let p1 = document.createElement("p");
            let p2 = document.createElement("p");
            let p3 = document.createElement("p");
            let p4 = document.createElement("p");
            let p5 = document.createElement("p");
            let p6 = document.createElement("p");
            let p7 = document.createElement("p");
            let p8 = document.createElement("p");
            let p9 = document.createElement("p");
            let p10 = document.createElement("p");
            let greeting = document.createElement('h1');
            greeting.append(`Hi ! ${username.toUpperCase()}`)

            p1.innerText = "Customer id : " + userId;
            p2.innerText = "First Name : " + firstName;
            p2.innerHTML += "<a href='updateDetails.html' class='link' value='updatefirstname'>Update first name</a>"
            p3.innerText = "Last Name : " + lastName;
            p3.innerHTML += "<a href='updateDetails.html' class='link' value='updatelastname'>Update last name</a>"
            p4.innerText = "Username : " + username;
            p4.innerHTML += "<a href='updateDetails.html' class='link' value='updateusername'>Update username</a>"
            p5.innerText = "Email : " + email;
            p5.innerHTML += "<a href='updateDetails.html' class='link' value='updateemail'>Update email</a>"
            p6.innerText = "Mobile Number : " + phone;
            p6.innerHTML += "<a href='updateDetails.html' class='link' value='updatephone'>Update contact</a>"
            p7.innerText = "Pincode : " + pincode;
            p8.innerText = "City : " + city;
            p9.innerText = "State : " + state;
            p10.innerText = "Address Details : " + details;
            p10.innerHTML += "<a href='updateDetails.html' class='link' value='updateaddress'>Update address details</a>"
            let logOutBtn = document.createElement("button");
            logOutBtn.innerText = "Log out"
            logOutBtn.className = 'btn';
            logOutBtn.onclick = function () {
                fetch('http://localhost:8765/buy_EZ/auth/logout', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${cookie}`
                    }
                }).then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                }).then(res => {
                    console.log(res);
                    document.cookie += "loggedOut";
                })
            }
            let myOrdersBtn = document.createElement('button');
            myOrdersBtn.className = 'btn'
            myOrdersBtn.innerText = 'My orders';
            myOrdersBtn.onclick = function () {
                fetch('http://localhost:8765/buy_EZ/user/orders', {
                    headers: {
                        'Authorization': `Bearer ${cookie}`
                    }
                }).then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        return Promise.reject(response)
                    }
                }).then(response => {
                    console.log(response);
                })
            }
            let div = document.createElement("div");
            div.append(greeting, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, logOutBtn, myOrdersBtn);
            document.getElementById("userDetails").append(div);

        }).catch(res => {
            // res.json().then(res => {
            //     console.log(res);
            // })
            console.log(res);
        })


}