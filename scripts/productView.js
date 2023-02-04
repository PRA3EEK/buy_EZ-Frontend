const cookie = document.cookie.split("=")[1];
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');
console.log(productId);

fetch(`http://localhost:8765/buy_EZ/user/searchById?productId=${productId}`, {
    headers: {
        'Authorization': `Bearer ${cookie}`
    }
}).then(response => {
    if (response.ok) {
        return response.json();
    }
    else {
        return Promise.reject(response);
    }
}).then(response => {
    console.log(response);
    var images = response.imageUrl;

    let imageView = document.createElement('div');

    imageView.id = 'view';
    for (let i = 0; i < images.length; i++) {

        let img = document.createElement('img');
        img.src = images[i];
        imageView.append(img);
        let addToCart = document.createElement('button');
        addToCart.className = 'btn'
        addToCart.innerText = 'Add To Cart'

        img.onclick = function () {
            document.getElementById('image').innerHTML = "";
            let copyImage = document.createElement('img');
            copyImage.src = images[i];
            document.getElementById('image').append(copyImage, addToCart);
        }

    }
    let bigImage = document.createElement('div');
    bigImage.id = 'image'
    let addToCart = document.createElement('button');
    addToCart.className = 'btn'
    addToCart.innerText = 'Add To Cart'
    let firstImage = document.createElement('img');
    firstImage.src = images[0];
    bigImage.append(firstImage, addToCart);

    let productDetails = document.createElement('div');
    productDetails.id = 'details';

    //product details are being added 
    let title = document.createElement('h2');
    title.id = 'title';
    title.innerText = response.productName;
    let ratings = document.createElement('p');
    ratings.innerText = `${response.ratings}/5 stars ${response.numberOfRatings} ratings`;

    let off = Math.round(((response.market_price - response.sale_price) / response.market_price) * 100);
    let price = document.createElement('p');
    let strike = document.createElement('s');
    strike.innerText = `M.R.P.:${response.market_price}`;
    price.id = 'price';
    price.innerText = `- ${off}% ₹ ${response.sale_price}\n`
    price.append(strike)

    let specs = document.createElement('p');
    specs.id = 'specs'
    specs.innerText = `About this item: \n\n${response.specification}`;
    let menu = document.createElement('p');
    menu.id = 'manu';
    menu.innerText = `Manufacutrer:  ${response.manufacturer}`
    let dim = document.createElement('p');
    dim.id = 'dim';
    dim.innerText = `Dimensions: ${response.dimension}`


    productDetails.append(title, ratings, price, specs, menu, dim);




    document.getElementById('pDiv').append(imageView, bigImage, productDetails);
}).catch(response => {
    document.getElementById('pDiv').append(document.createElement('h1').innerText = response);
})