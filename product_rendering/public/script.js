console.log("Script is running!");

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search-button").addEventListener("click", () => {
        console.log("search function is clicked");
        searchFunction();
    });
});

function searchFunction() {
    const productName = document.getElementById("search-input").value;
    console.log("Clicked! Product:", productName);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/product?name=${encodeURIComponent(productName)}`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                console.log("printData function is clicked");
                printData(data);
            } else {
                console.error("Error fetching product:", xhr.statusText);
            }
        }
    };
    xhr.send();
}

function printData(data) {
    const outputDiv = document.getElementById("product-data");
    outputDiv.innerHTML = "";

    if (Object.keys(data).length === 0) {
        outputDiv.textContent = "Product not found";
    } else {
        console.log("data is displayed");

        const name = document.createElement("p");
        name.textContent = `Name: ${data.name}`;

        const price = document.createElement("p");
        price.textContent = `Price: ${data.price}`;

        const type = document.createElement("p");
        const productType = data.type || data.description;
        type.textContent = `Type: ${productType}`;

        const addedDate = document.createElement("p");
        addedDate.textContent = `Added Date: ${new Date(data.addedDate || Date.now()).toLocaleDateString()}`;

        const onSale = document.createElement("p");
        onSale.textContent = `On Sale: ${data.onSale ? "Yes" : "No"}`;

        outputDiv.appendChild(name);
        outputDiv.appendChild(price);
        outputDiv.appendChild(type);
        outputDiv.appendChild(addedDate);
        outputDiv.appendChild(onSale);

        setTimeout(() => recommendations(productType), 5000);
    }
}

async function recommendations(type) {
    const recom = document.getElementById("recommend");
    recom.innerHTML = "";

    try {
        const response = await fetch(`/recommendations?type=${encodeURIComponent(type)}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Recommended data:", data);

        displayRecommendations(data);
    } catch (error) {
        console.error("Error while fetching the recommendations:", error);
        recom.textContent = "Could not load recommendations.";
    }
}

function displayRecommendations(products) {
    const recom = document.getElementById("recommend");

    if (!products || products.length === 0) {
        recom.innerHTML += "<p>No recommendations available.</p>";
        return;
    }

    const ul = document.createElement("ul");

    products.forEach(product => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - ₹${product.price}`;
        ul.appendChild(li);
    });

    recom.appendChild(ul);
}
