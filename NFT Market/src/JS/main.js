
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
};
closeCart.onclick = () =>{
    cart.classList.remove("active");
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProduct = button.parentElement;
    var title = shopProduct.getElementsByClassName('product-title')[0].innerText;
    var price = shopProduct.getElementsByClassName('price')[0].innerText;
    var productImg = shopProduct.getElementsByClassName("product-img")[0].src;

    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartItems = cartContent.getElementsByClassName("cart-box");
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var itemTitle = cartItem.getElementsByClassName("cart-product-title")[0].innerText;
        if (itemTitle === title) {
            alert('You have already added this item to cart');
            return;
        }
    }

    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
           
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartContent.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
}

function buyButtonClicked() {
    alert('Your order is placed');

    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");

    // Remove pictures from the left side
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var cartProductTitle = cartBox.getElementsByClassName("cart-product-title")[0].innerText;
        var productBoxes = document.getElementsByClassName("product-box");

        for (var j = 0; j < productBoxes.length; j++) {
            var productBox = productBoxes[j];
            var productTitle = productBox.getElementsByClassName("product-title")[0].innerText;

            if (cartProductTitle === productTitle) {
                productBox.style.display = "none";
                break;
            }
        }
    }

    // Clear the cart and update the total price
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    pay_me(); 
    updatetotal();   
    
}
// //connection
// function pay()
// {
//     var tamt=document.getElementsByClassName("total-price").value;
//     web3.eth.getAccounts().then(function(account){
    
//         return contract.methods.pay(tamt).send({from: account[0]});

//     }).then(function(tmp){
    
//     $("#total-price").val("");
//     show_balance();
//     }).catch(function(tmp){
//         alert(tmp);
//     })
// }
// //connection
// function show_balance(){
//   contract.methods.getBalance().call().then(function(Balance){
//       $("#balance").html(Balance);
//   })
// }

function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        // var quantity = quantityElement.value;
        total += price;
    }
    total = Math.round(total * 100) / 100;
document.getElementsByClassName('total-price')[0].innerText = "$" + total;
}









































// var web3;
// var address="0x17ba759e43fbBfECb9945c13818Dae7425cCAE07";

// async function Connect(){
// 	await window.web3.currentProvider.enable();
// 	web3=new Web3(window.web3.currentProvider);
// }

//  if(typeof web3 !== 'undefine'){
//  	web3 =new Web3(window.web3.currentProvider);
// }
// else{
// web3=new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545")); 
// }

//  var abi=[
//     {
//       "inputs": [],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "name": "balances",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "owner",
//       "outputs": [
//         {
//           "internalType": "address payable",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "stateMutability": "payable",
//       "type": "receive"
//     },
//     {
//       "inputs": [],
//       "name": "pay",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "getBalance",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     }
//   ];
 
// var contract= new web3.eth.Contract (abi, address);


// function deposite(){
//     var inputval=document.getElementById("amount").value;
//     web3.eth.getAccounts().then(function(account){
    
//         return contract.methods.deposit_money (inputval).send({from: account[0]});

//     }).then(function(tmp){
    
//     $("#amount").val("");
//     show_balance();
//     }).catch(function(tmp){
//         alert(tmp);
//     })
// }

//      function withdraw(){
    
//     var inputval=document.getElementById("amount").value;
//     web3.eth.getAccounts().then(function(account){
    
//     return contract.methods.withdraw(inputval).send({from: account[0]});
    
//     }).then(function(tmp){
    
//     $("#amount").val("");
//     show_balance();
//     }).catch(function(tmp){ alert(tmp);
    
//     })
// }


// function show_balance(){
//     contract.methods.getBalance().call().then(function(Balance){
//         $("#balance").html(Balance);
//     })
// }


