
document.addEventListener("DOMContentLoaded", () => {
  let productsdata = [];
  document.getElementById("fetch-btn").addEventListener("click", () => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        console.log("Data fetched successfully:", data);
        productsdata = data;
        displaydata(productsdata);
      })
      .catch(err => console.error("Error fetching products:", err));
  });

  function displaydata(products) {
    console.log("Displaying products:", products);
    const container = document.getElementById("products");
    container.innerHTML = "";

    if (products.length === 0) {
      container.innerHTML = "No products found.";
      return;
    }

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      if (product.onSale) {
        const badge = document.createElement("div");
        badge.className = "sale-badge";
        badge.textContent = "ON SALE";
        card.appendChild(badge);
      }

      card.insertAdjacentHTML(
        "beforeend",
        `
          <div class="product-name">${product.name}</div>
          <div class="product-price">Price: ₹${product.price}</div>
          <div class="product-category">Category: ${product.type}</div>
        `
      );

      container.appendChild(card);
    });

    console.log("Products displayed successfully!");
  }

  document.getElementById("search-input").addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = productsdata.filter(p =>
      p.name.toLowerCase().includes(searchTerm)
    );
    displaydata(filtered);
  });
});
