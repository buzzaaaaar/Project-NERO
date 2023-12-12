document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the 'shop-DB-manage.php' endpoint
    fetch('shop-DB-manage.php')
        .then(response => {
            console.log('Response from PHP:', response);
            return response.json();
        })
        .then(data => {
            console.log('Data from PHP:', data);   //==================================================================== Remove this after project is done:)
            // Once the data is successfully fetched and parsed, handle it

            // Get the element with the id 'myShop-product-containerID'
            const productContainer = document.getElementById('myShop-product-containerID');

            // Loop through each product in the fetched data
            data.forEach(product => {
                // console.log('Product data:', product);
                // Create HTML content for each product
                const productHTML = `

                <div class="col p-1 myCustom-JS-filter-itenm">
                    <div class="card myCustom-Shop-item-card h-100">
                    <a href="Shop-Items/shop_item.html?id=${product.Product_ID}" class="card h-100 text-decoration-none">
                    <!-- Float Button -->
                    <!-- 
                    <button class="btn myCustom-Shop-item-float-button  "> 
                      <i class="bi bi-cart myCustom-Shop-icon-item"></i>
                    </button> 
                    -->
                        
                    <div class="myCustom-Shop-image-container p-2">
                        <img src="${product.Product_Image}" class="card-img-top myCustom-Shop-itme-image" alt="...">
                     </div>
                    <div class="card-body myCustom-Shop-cardbody " data-price=${product.Product_Price - product.Discount}>
                        <h5 class="card-title px-1">${product.Product_Name}</h5>
                        <div class="container d-flex p-0">
            
                        <p>
                        ${product.Discount > 0 ? `
                        <del class="myCustom-Shop-discounted-price px-1">Rs.${product.Product_Price}</del>
                            <span class="myCustom-Shop-original-price px-1" >Rs.${product.Product_Price - product.Discount}</span>                     
                        ` : `
                            <span class="myCustom-Shop-original-price px-1">Rs.${product.Product_Price}</span>
                        `}
                        </p>
                        </div>
                        <div class="myCustom-Shop-rating-container">
                            <span class="myCustom-item-category-aa" >    ${product.Product_Category}      </span>
                        
                        </div>
                    </div>
                    <div class="card-footer row gx-0">
                    <div class="col-6">
                        <small class="text-body-secondary myCutom-js-FreeShipping">${product.Free_Shipping === '1' ? 'Free Shipping' : '<div class="myCutom-free-ship-spacer-for-js"></div>'}</small>
                    </div>
                    <div class="col-6 text-end">
                        ${product.Discount > 0 ? `<span class="text-body-secondary mx-1 px-1 py-1 myCustom-Shop-item-offer" style="white-space: nowrap;">${product.Discount_Percentage}% OFF</span>  ` :
                         `<span class="myCustom-Shop-item-offer">`}
                        
                    </div>
                    </div>
                
                    </a>
                    </div>
                    
                </div>
                

                    
                `;

                // Append the product HTML to the 'productContainer'
                productContainer.innerHTML += productHTML;
            });
        })
        .catch(error => console.error('Error fetching data:', error)); // Handle any errors that occur during the fetch process
});



