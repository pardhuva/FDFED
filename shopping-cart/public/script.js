const totalcost = 0;

document.getElementById("add-to-cart").addEventListener("click",()=>{
    const productName = document.getElementById("dropdown").value;

    fetch(`/item?name$=${encodedURIComponent(productName)}`)
    .then(response => response.json())
    .then(data =>{
         console.log("printData button function is invoked");
         printData(data);
     })
     .catch(error =>{
         console.log("Error while fetching the product");
     });

});


function printData(data){
    const outputDiv = document.getElementById("added-products");
    outputDiv.innerHTML = "";

    if(Object.keys(data).length == 0){
        console.log("error while fetching the data");
    }
    else{
        const name = document.createElement("p");
        name.textContent = ${data.name};

        const price = document.createElement("p");
        price.textContent = ${data.price};

        outputDiv.appendChild(name);
        outputDiv.appendChild(price);
    }

    const cost = document.getElementById("totalcost");
    totalcost += (${data.price} *${data.discount})/100;
    const total = document.createElement("p");
    total.textContent = ${totalcost};
    cost.appendChild(total);

    document.getElementById("payment").addEventListener("click",()=>{
         const paymeentdone = 
    })
}