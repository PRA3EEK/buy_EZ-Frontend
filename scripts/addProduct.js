let cookie = document.cookie.split("=")[1];
fetch('http://localhost:8765/buy_EZ/user/subCategories',
    {
        headers: {
            "Authorization": `Bearer ${cookie}`
        }
    }).then(response => {
        return response.json();
    }).then(response => {
        // console.log(response)
        let categories = response;
        for (let i = 0; i < categories.length; i++) {
            let option = document.createElement('option');
            option.setAttribute('value', categories[i].name);
            option.innerText = categories[i].name;
            document.getElementById('cat').append(option);
        }
    });



// console.log(imgCopy);
var categoryName = "";
function test() {
    var selvalue = document.getElementById("cat");
    var text = selvalue.options[selvalue.selectedIndex].text;
    categoryName = text;

}


let form = document.getElementById('productDetails');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    var img_1 = form.img1.value;
    var img_2 = form.img2.value;
    var img_3 = form.img3.value;
    var img_4 = form.img4.value;
    var img_5 = form.img5.value;
    var img_6 = form.img6.value;

    fetch(`http://localhost:8765/buy_EZ/admin/add-product/${categoryName}`, {
        method: 'POST',
        body: JSON.stringify({
            productName: form.name.value,
            market_price: form.mrp.value,
            sale_price: form.sp.value,
            color: form.color.value,
            dimension: form.dim.value,
            specification: form.specs.value,
            manufacturer: form.manu.value,

            quantity: form.quant.value,

            imageUrl: [
                img_1,
                img_2,
                img_3,
                img_4,
                img_5,
                img_6
            ]
        }),
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${cookie}`
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            return Promise.reject(response);
        }
    }).then((response) => {
        console.log(response);
        document.getElementById('add').value = 'Product added successfully!'
        form.reset();
        return false;
    })
})