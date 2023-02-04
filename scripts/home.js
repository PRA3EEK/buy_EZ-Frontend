


function redirect() {
    window.location = "cart.html"
}


let cookie = document.cookie;
let username = "";
if (cookie != "") {
    cookie = document.cookie.split("=")[1]
    document.getElementById("sign").innerHTML = "";
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
        }).then((res) => {
            let roles = res.roles;
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name == 'ROLE_ADMIN') {
                    let adminPageLink = document.createElement('a');
                    adminPageLink.innerText = "Admin resources"
                    adminPageLink.className = 'navLink';
                    adminPageLink.href = "Admin.html";

                    document.getElementById("Nav1").append(adminPageLink);
                }
            }
            username = res.username.toUpperCase();
            let p = document.createElement("P");
            p.innerText = username;
            document.getElementById("sign").append(p);
        })
    //.catch((response)=> {
    //     response.json().then(res => {
    //         console.log(res);
    //     })
    // })

}



fetch('http://localhost:8765/buy_EZ/user/categories',
    {
        headers: {
            "Authorization": `Bearer ${cookie}`
        }
    }).then(response => {
        return response.json();
    }).then(response => {
        let categories = response;
        for (let i = 0; i < categories.length; i++) {
            let div = document.createElement("div");
            let a = document.createElement("a");
            div.append(a);
            a.className = "catLink";
            a.innerText = categories[i].categoryName;
            div.addEventListener('click', () => {
                fetch(`http://localhost:8765/buy_EZ/user/search?name=${categories[i].categoryName}`).then(response => { return response.json() }).then(response => { createBodyForPoducts(response) })
            });
            document.getElementById("categories").append(div);
        }
    });

  let pageNumber = 1;

fetch(`http://localhost:8765/buy_EZ/user/products?page=${pageNumber}&size=5`,
    {
        headers: {
            "Authorization": `Bearer ${cookie}`
        }
    }).then(response => {
        return response.json();
    }).then(response => {
        console.log(response)

        createBodyForPoducts(response);



    })




// Adding search function to search bar with id searchBar

document.getElementById('searchBar').addEventListener('keydown', (e) => {
    const name = document.getElementById('searchBar').value;
    if (e.code == 'Enter') {
        search(name);
    }
})


function search(name) {
    fetch(`http://localhost:8765/buy_EZ/user/search?name=${name}`).then((response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            return new Promise(reject);
        }
    }).then((response) => {
        //   console.log(response)
        createBodyForPoducts(response);
    }).catch(response => {
        console.log(response);
    })
}


function createBodyForPoducts(response) {
    document.getElementById('products').innerHTML = "";
    let arr = response;
    for (let i = 0; i < arr.length; i++) {
        let div = document.createElement("div");
        div.style.cursor = "pointer";


        let img = document.createElement("img");

        img.onclick = function () {
            window.location = `productView.html?productId=${arr[i].productId}`

        }


        let h5 = document.createElement("p");
        h5.className = 'title'
        let h5_2 = document.createElement("p");
        let h5_3 = document.createElement("p");
        let h5_4 = document.createElement("p");
        let h5_5 = document.createElement("p");
        let btn = document.createElement("button");
        btn.className = 'button'
        btn.innerText = "Add to cart";


        btn.onclick = function () {

            fetch(`http://localhost:8765/buy_EZ/user/add-cart?productId=${arr[i].productId}&quantity=1`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${cookie}`
                }
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            }).then(res => {
                console.log(res);
                btn.innerText = "Product added to cart!"
                btn.onclick = "";
            }).catch(res => {
                window.location.href = "signup.html"
            })
        }
        let off = Math.round(((arr[i].market_price - arr[i].sale_price) / arr[i].market_price) * 100);
        let strike = document.createElement('s');
        h5_2.innerText = `M.R.P.: ₹ ${arr[i].market_price}`;
        strike.append(h5_2);
        h5_3.innerText = `Sale price: ₹ ${arr[i].sale_price}`;
        h5_4.innerText = `${off}% Off`
        h5_5.innerText = `You are saving ₹ ${arr[i].market_price - arr[i].sale_price}`;
        let infoDiv = document.createElement('div');
        infoDiv.className = 'info';
        infoDiv.append(h5, strike, h5_3, h5_4, h5_5, btn);

        div.append(img, infoDiv);
        img.src = arr[i].imageUrl[0];
        h5.innerText = arr[i].productName;
        document.getElementById("products").append(div);
    }

}

//  console.log(loaderAnimation());

//  console.log(spans);



