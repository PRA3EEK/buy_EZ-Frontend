var totalCartAmmount = 0;
let cookie = document.cookie.split("=")[1];
if (cookie == "") {
    let h2 = document.createElement("h2");
    h2.innerText = "You are not logged in";
    document.getElementById("cart").append(h2);
}
else {
    fetch('http://localhost:8765/buy_EZ/user/cart',
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
            let products = res.cartProducts;
            console.log(res);

            for (let i = 0; i < products.length; i++) {
                let id = products[i].productDtoId;
                fetch(`http://localhost:8765/buy_EZ/user/searchById?productId=${id}`, {

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
                    var cartPrice = 0;
                    cartPrice = (cartPrice + (products[i].quantity) * (res.sale_price));
                    let parentDiv = document.createElement('div');
                    parentDiv.className = 'parent'
                    let div = document.createElement("div");
                    div.className = 'image'
                    let quantityDiv = document.createElement("div");
                    quantityDiv.className = 'prodDetails'
                    let img = document.createElement("img");
                    img.src = res.imageUrl[0];
                    let h5 = document.createElement("h2");
                    h5.innerText = `${res.productName}`;
                    let p = document.createElement("p");
                    let btn = document.createElement("button");
                    btn.className = 'btn'
                    btn.innerText = "Remove from cart";
                    btn.onclick = function (totalCartAmmount) {
                        fetch(`http://localhost:8765/buy_EZ/user/delete-cart?productId=${res.productId}`, {
                            method: 'DELETE',
                            headers: {
                                "Authorization": `Bearer ${cookie}`
                            }
                        }).then(res => {
                            if (res.ok) { return res.json() }
                            else { return Promise.reject(res) };
                        }).then(res => {
                            console.log(res);
                            window.location.reload();
                        }).catch(res => {
                            console.log(res);
                        })
                    }
                    let price = document.createElement("p");
                    price.innerText = `₹ ${cartPrice}`;
                    p.innerText = "Quantity : " + products[i].quantity;


                    let input = document.createElement('input');
                    input.className = 'quantInput'
                    input.type = 'number';
                    input.placeholder = 'Quantity...'

                    //creating dom to display sale price and market price.
                    let off = Math.round(((res.market_price - res.sale_price) / res.market_price) * 100);
                    let salePrice = document.createElement('p');
                    salePrice.innerText = `-${off}% ${res.sale_price}`
                    let strike = document.createElement('s');
                    strike.innerText = `M.R.P.: ₹ ${res.market_price}`


                    let updateBtn = document.createElement('button');
                    updateBtn.className = 'btn'
                    updateBtn.innerText = 'Update'
                    updateBtn.onclick = function () {

                        console.log(input.value);

                        fetch(`http://localhost:8765/buy_EZ/user/update-quantity?productId=${id}&quantity=${input.value}`, {
                            method: 'PUT',
                            headers: {
                                'Authorization': `Bearer ${cookie}`
                            }
                        }).then((response) => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                console.log("error");
                            }
                        }).then(response => {
                            console.log(response);
                        })

                    }
                    let thirdDiv = document.createElement('div')
                    thirdDiv.className = 'thirdDiv'
                    thirdDiv.append(input, updateBtn, btn)
                    quantityDiv.append(h5, p, price, salePrice, strike, thirdDiv);
                    div.append(img);
                    parentDiv.append(div, quantityDiv)
                    document.getElementById('cart').append(parentDiv);


                    totalCartAmmount = totalCartAmmount + cartPrice;


                    document.getElementById('amount').innerText = "Total Amount : ₹ " + totalCartAmmount;

                }).catch(response => {
                    console.log(response);

                    // let errorHeading = document.createElement("h1");

                    // errorHeading.innerText = ''

                })

            }

        }).catch(response => {
            document.getElementById("content").innerHTML = "<div id='errorMessage'><h1>>_<</h1><h1>OOPS! looks like you are not registered or logged in to your account.</h1><div class='linksContainer'><a href='signup.html' class='links'>Sign up</a>|<a href='signin.html' class='links'> Sign in</a></div></div>"
        })

    function placeOrder() {
        window.location = "order.html"
    }

}