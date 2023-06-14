var web3;
var address="0x17ba759e43fbBfECb9945c13818Dae7425cCAE07";

async function Connect(){
	await window.web3.currentProvider.enable();
	web3=new Web3(window.web3.currentProvider);
}

 if(typeof web3 !== 'undefine'){
 	web3 =new Web3(window.web3.currentProvider);
}
else{
web3=new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545")); 
}


var abi=[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balances",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amt",
          "type": "uint256"
        }
      ],
      "name": "pay",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
 
var contract= new web3.eth.Contract (abi, address);

//connection
function pay_me()
{
    var tamt=document.getElementsByClassName("total-price").value;
    web3.eth.getAccounts().then(function(account){
    
        return contract.methods.pay(tamt).send({from: account[0]});

    }).then(function(tmp){
    
    $("#total-price").val("");
    show_balance();
    }).catch(function(tmp){
        alert(tmp);
    })
}
//connection
function show_balance(){
  contract.methods.getBalance().call().then(function(Balance){
      $("#balance").html(Balance);
  })
}