document.addEventListener('DOMContentLoaded', function () {
    // Get the item ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    console.log('Item ID:', itemId);

    // Fetch item details based on the ID
    console.log('Fetching URL:', `../shop-DB-manage.php?id=${itemId}`);
    fetch(`../shop-DB-manage.php?id=${itemId}`)
        .then(response => {
            console.log('Response from PHP:', response);
            return response.json();
        })
        .then(itemData => {
            console.log('Item Data:', itemData);

            // Find the selected item based on ID
            const selectedItem = itemData.find(item => item.Product_ID === itemId);

            // Update the page elements with the item details
            const itemImageElement = document.getElementById('itemImage');
            const itemNameElement = document.getElementById('itemName');
            const itemPriceElement = document.getElementById('itemPrice');
            const itemBrandElement = document.getElementById('itemBrand');
            const itemCategoriesElement = document.getElementById('itemCategories');

            if (itemImageElement && selectedItem) {
                itemImageElement.src = selectedItem.Product_Image;
                const fileName = selectedItem.Product_Image.split('/').pop();
                console.log('Extracted File Name:', fileName);
                itemImageElement.src = `../shop-DB-image-store/${fileName}`;

            }
            if (itemNameElement && selectedItem) {
                itemNameElement.innerText = selectedItem.Product_Name;
            }
            if (itemPriceElement && selectedItem) {
                const productPrice = parseFloat(selectedItem.Product_Price);
                const discount = parseFloat(selectedItem.Discount);
                const discountedPrice = productPrice - discount;
                itemPriceElement.innerText = `Rs.${discountedPrice}`;
            }
            if (itemBrandElement && selectedItem) {
                itemBrandElement.innerText = `Brand: ${selectedItem.Product_Brand}`;
            }
            if (itemCategoriesElement && selectedItem) {
                itemCategoriesElement.innerText = `Category: ${selectedItem.Product_Category}`;
            }
        })
        .catch(error => console.error('Error fetching item details:', error));
});


// Search bar
const SearchResultContainer = document.querySelector(".mySearch-results-container");
const SearchInput = document.querySelector("#mySearchbarID");

SearchInput.onkeyup = function () {
    let input = SearchInput.value;
    if (input.length) {
        fetch('../shop-DB-manage.php')
            .then(response => response.json())
            .then(data => {
                let result = data.map(product => ({
                    id: product.Product_ID,
                    name: product.Product_Name
                }))
                    .filter(product => product.name.toLowerCase().includes(input.toLowerCase()));
                display(result);

                if (!result.length) {
                    SearchResultContainer.innerHTML = '';
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        SearchResultContainer.innerHTML = '';
    }
};

function display(result) {
    const content = result.map((product) => {
        return `<a href='../Shop-Items/shop_item.html?id=${product.id}' onclick='selectInput(this)'><li>${product.name}</li></a>`;
    });

    SearchResultContainer.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(element) {
    SearchInput.value = element.querySelector('li').innerHTML;
    SearchResultContainer.innerHTML = '';
}


function addToCart() {
    console.log('addToCart function called');
    // Get the product_id (assume you have a function to retrieve it from the database)
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    var productId = itemId;

    // Get the quantity input value
    var quantity = document.getElementById('CartNumberInput').value;

    // Prepare the data to be sent
    var data = new URLSearchParams();
    data.append('product_id', productId);
    data.append('quantity', quantity);

    console.log('Sending request to server...');

    // Make a fetch POST request to the PHP file
    fetch('../shop-DB-cart-send.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
    })
    .then(response => {
        console.log('Server responded:', response);
        return response.json();  // Read the entire response as text
    })
    .then(data => {
        console.log('Server response data:', data);
        // Check if the response contains a "success" property
        if (data && data.success) {
            // Show a success alert to the user
            alert(data.success);
        } else {
            // Show an error alert to the user
            alert('Error: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Show a generic error alert to the user
        alert('An error occurred while processing your request.');
    });
}

var addToCartButton = document.getElementById('CartNumberInputBTN');
addToCartButton.addEventListener('click', function () {
    addToCart();
});


