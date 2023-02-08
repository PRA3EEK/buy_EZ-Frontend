var cookie = document.cookie;
var address = null;
var paymentType = 'Debit Card';
if (cookie != "") {
    cookie = document.cookie.split("=")[1];
    fetch('http://localhost:8765/buy_EZ/user/details', {
        headers: {
            'Authorization': `Bearer ${cookie}`
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then((response) => {
        // console.log(response);

        var inputCheckbox = document.createElement('input');
        inputCheckbox.type = 'checkbox';
        inputCheckbox.value = `${response.address.details}, ${response.address.city}, ${response.address.state}, ${response.address.pincode}, ${response.country}`;
        inputCheckbox.id = 'defaultAddress';
        inputCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {

                document.getElementById('addAddress').innerHTML = '';
                address = response.address;
                // console.log(address)
            }
        })
        var label = document.createElement('label')
        label.setAttribute('for', 'defaultAddress');
        label.innerText = `${response.address.details}, ${response.address.city}, ${response.address.state}, ${response.address.pincode}, ${response.country}`;
        document.getElementById('defaultAddBox').append(inputCheckbox, label);
    }).catch
        ((response) => {
            console.log('Error');
        })


    function appear() {
        document.getElementById('addAddress').innerHTML = "";
        document.getElementById('defaultAddress').checked = false;
        var addressForm = document.createElement('form');
        addressForm.id = 'addressForm';
        var state = document.createElement('input');
        state.setAttribute('required', '');
        state.placeholder = 'State'
        state.type = 'text';
        state.id = 'state';
        var city = document.createElement('input');
        city.setAttribute('required', '');
        city.placeholder = 'City'
        city.type = 'text';
        city.id = 'city';
        var pincode = document.createElement('input');
        pincode.setAttribute('required', '');
        pincode.placeholder = 'Pincode'
        pincode.type = 'number';
        pincode.id = 'pincode';
        var details = document.createElement('input');
        details.setAttribute('required', '');
        details.placeholder = 'Details'
        details.type = 'text';
        details.id = 'details';

        var addressSubmit = document.createElement('input');
        addressSubmit.className = 'button'
        addressSubmit.id = 'addressSubmit';
        addressSubmit.value = 'Update Address'
        addressSubmit.type = 'submit'
        addressForm.addEventListener('submit', (e) => {
            e.preventDefault();
            address = {
                state: state.value,
                city: city.value,
                details: details.value,
                pincode: pincode.value
            }
            addressSubmit.value = 'Address Updated'
            // console.log(address);
            addressForm.reset();
            return false;

        })



        addressForm.append(state, city, pincode, details, addressSubmit);

        document.getElementById('addAddress').append(addressForm);
    }

    function paymentsAppear() {
        fetch('http://localhost:8765/buy_EZ/user/payments').then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                return Promise.reject(response);
            }
        }).then(response => {
            // console.log(response)
            let selectPayment = document.createElement('select');
            selectPayment.setAttribute('required', '')
            selectPayment.id = 'payment';

            let payments = response;
            for (let i = 0; i < payments.length; i++) {
                let option = document.createElement('option');
                option.value = payments[i].type;
                if (i == 0) {
                    option.setAttribute('selected', 'selected');
                }
                if (payments[i].allowed == 'No') {
                    option.setAttribute('disabled', '');
                }
                option.className = 'paymentOptions';
                option.innerText = payments[i].type;
                selectPayment.append(option);
            }
            selectPayment.addEventListener('change', () => {
                paymentType = selectPayment.value;
                if (selectPayment.value != 'POD') {
                    document.getElementById('type').innerText = selectPayment.value;
                }
            })

            document.getElementById('types').append(selectPayment);
        })
    }
    paymentsAppear();
 
    function proceed() {
        if(paymentType != 'POD'){
            document.getElementById('paymentForm').style.visibility = 'visible';
        }
    }



    // console.log(address)


    document.getElementById('right').insertAdjacentHTML('afterBegin', ' <h1>Cart Summary</h1><p id="items"></p><s><p id="totalAmount"></p></s><p id="payAmount"></p><p id="msg"></p><button id="checkout" class="button" onclick="proceed()">Checkout</button>');
    fetch('http://localhost:8765/buy_EZ/user/cart', {
        headers: {
            'Authorization': `Bearer ${cookie}`
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(response => {
        // console.log(response)
        let itemNumber = response.numberOfItems;
        let totalAmount = response.totalAmount;
        let payAmount = response.payAmount;
        let save = response.save;
        document.getElementById('items').innerText = `Total items : ${itemNumber}`;
        document.getElementById('totalAmount').innerText = `Total amount : ₹ ${totalAmount}`;
        document.getElementById('payAmount').innerText = `Total amount to pay : ₹ ${payAmount}`;
        document.getElementById('msg').innerText = `You are saving : ₹ ${save}`;
    })

    
    document.getElementById('paymentForm').addEventListener('submit', (e) => {
        
        placeOrder(e);
    })
 
    //function to process order
    function placeOrder(e) {
        e.preventDefault() 

        if (address === null || paymentType == null) {
            document.getElementById('paymentForm').style.visibility = 'hidden';
            alert('Please choose address and payment type you wish to pay with')
        } else {
            console.log(address);
            console.log(paymentType);
            fetch(`http://localhost:8765/buy_EZ/user/cart/order?paymentType=${paymentType}`, {
                method: 'POST',
                
                body: JSON.stringify({
                        'city': address.city,
                        'state': address.state,
                        'pincode': address.pincode,
                        'details': address.details
                }),
                headers: {
                    'Authorization': `Bearer ${cookie}`,
                    "Content-type": "application/json"
                }
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    return Promise.reject(response);
                }
            }).then(response => {
                window.location.href = `orderSummary.html?orderId=${response.orderId}`;
            }).catch(response => {
                console.log('ERROR');
            })
        }
    }

    //function to add dashes after every four characters in the card number input field
    document.getElementById('cardNumber').addEventListener('input', function () {
        if (this.value.length > 19) {
            this.value = this.value.substring(0, 19);
        }
        var foo = this.value.split('-').join("");
        if (foo.length > 0) {
            foo = foo.match(new RegExp('.{1,4}', 'g')).join("-");
        }
        this.value = foo;
    })
    

     document.getElementById("cross").addEventListener('click', () => {
        document.getElementById('paymentForm').style.visibility = 'hidden';
     })


}


