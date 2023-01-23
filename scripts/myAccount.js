let cookie = document.cookie;
    
    // console.log(cookie)
    if(cookie == "")
    {
        document.getElementById("details").append(document.createElement("h3").innerText="You are not logged in");
    }else{
        cookie = document.cookie.split("=")[1];
        fetch('http://localhost:8765/buy_EZ/user/details', 
        {
            headers: {
                "Authorization":`Bearer ${cookie}`
            }
        }).then(res => {
            if(res.ok){
                return res.json();
            }else{
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
            let details =res.address.details;
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

            p1.innerText = "Customer id : "+userId;
            p2.innerText = "First Name : " +firstName;
            p3.innerText = "Last Name : "+lastName;
            p4.innerText = "Username : "+username;
            p5.innerText = "Email : "+email;
            p6.innerText = "Mobile Number : "+phone;
            p7.innerText = "Pincode : "+pincode;
            p8.innerText = "City : "+city;
            p9.innerText = "State : "+state;
            p10.innerText = "Address Details : "+details;
            let logOutBtn = document.createElement("button");
            logOutBtn.innerText = "Log out"
            logOutBtn.className = 'btn';
            logOutBtn.onclick = function ()
            {
                fetch('http://localhost:8765/buy_EZ/auth/logout', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${cookie}`
                    }
                }).then(res => {
                    if(res.ok)
                    {
                        return res.json();
                    }
                }).then(res => {
                    console.log(res);
                    document.cookie="";
                })
            }
            let myOrdersBtn = document.createElement('button');
            myOrdersBtn.className = 'btn'
            myOrdersBtn.innerText = 'My orders';
            myOrdersBtn.onclick = function ()
            {
                fetch('http://localhost:8765/buy_EZ/user/orders', {
                    headers: {
                        'Authorization':`Bearer ${cookie}`
                    }
                }).then(response => {
                    if(response.ok)
                    {
                        return response.json()
                    }else{
                        return Promise.reject(response)
                    }
                }).then(response => {
                    console.log(response);
                })
            }
            let div = document.createElement("div");
           div.append(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, logOutBtn, myOrdersBtn);
           document.getElementById("userInfo").append(div);

        }).catch(res => {
            res.json().then(res => {
                console.log(res);
            })
        })

        
    }