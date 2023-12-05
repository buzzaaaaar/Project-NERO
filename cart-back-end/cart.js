//========================= Function to fetch and display cart items when open the cart ===========================//
function loadCartItems() {
    $.ajax({
        type: "POST",
        url: "cart_items.php",
        dataType: "html",
        success: function (data) {
            // Replace the content of the cart with the fetched data
            $('.cart').html(data);

            $.when(updateTotalPrice()).done(function () {
                console.log('Total price updated');
                setInitialShipping(); //used this to calculate "chekoutPrice = totalPrice + 300(default shipping method)";
            });
        },
        error: function (xhr, status, error) {
            console.error("Error fetching cart items:", status, error);
        }
    });
}

// Call the function to fetch and display cart items when the page loads
$(document).ready(function () {
    loadCartItems();
});

//Function to set the initial shipping price and calculate checkoutTotal
function setInitialShipping() {
    var initialShippingPrice = 300;
    $('#checkoutTotal').setText("Standard-Delivery- Rs.300.00");
    updateCheckoutTotal(initialShippingPrice);
}

function updateCheckoutTotal(shippingPrice) {
    var totalPrice = parseFloat($('#totalPrice').text());
    var checkoutTotal = totalPrice + shippingPrice;

    $('#checkoutTotal').text(checkoutTotal.toFixed(2));
}

//=================================== Event handler for shipping option change =====================================//
$(document).on('change', '#shippingOption', function () {
    var shippingPrice = parseInt($(this).val());
    updateCheckoutTotal(shippingPrice);
});





//========================= Function to update the quantity in the database ===========================//
function updateQuantityInDatabase(productCode, newQuantity) {
    return $.ajax({
        type: "POST",
        url: "update_quantity.php",
        data: {
            productCode: productCode,
            newQuantity: newQuantity
        },
        success: function (data) {
            if (typeof callback === 'function') {
                callback();
            }
        },
        error: function (xhr, status, error) {
            console.error("Error updating quantity:", status, error);
        }
    });
}



//======================= Event handler for quantity buttons (+ or - button in the cart view) =================//
$(document).on('click', '.quantity', function (e) {
    e.preventDefault();
    var productCode = $(this).data('product-code');
    var quantityElement = $('.qty[data-product-code="' + productCode + '"]');
    var currentQty = parseInt(quantityElement.text());

    if ($(this).text() === '-') {
        if (currentQty > 1) {
            quantityElement.text(currentQty - 1);
            
            updateQuantityInDatabase(productCode, currentQty - 1).done(function () {
                loadCartItems();
            });
        }
    } else {
        quantityElement.text(currentQty + 1);
        
        updateQuantityInDatabase(productCode, currentQty + 1).done(function () {
            loadCartItems();
        });
    }
});


//========================= Function to remove the item from the database =========================//
function removeItemFromDatabase(productCode, callback) {
    $.ajax({
        type: "POST",
        url: "remove_item.php", // Create this file to handle item removal
        data: {
            productCode: productCode
        },
        success: function(data) {
            if (typeof callback === 'function') {
                callback();
            }
        },
        error: function(xhr, status, error) {
            console.error("Error removing item:", status, error);
        }
    });
}


//================ Event handler for remove buttons (x) in  each cart item's end =============//
$(document).on('click', '.cart', '.close', function (e) {
    e.preventDefault();
    var productCode = $(this).closest('.cart-item').find('.qty').data('product-code');

    removeItemFromDatabase(productCode, function () {
        loadCartItems();
    });
});




//=============================== Function to update the total price =================================//
function updateTotalPrice() {
    var totalItems = 0;
    var totalPrice = 0;

    $('.cart-item').each(function () {
        var quantity = parseInt($(this).find('.qty').text());
        var price = parseFloat($(this).find('.col:last-child').text().replace('Rs.', '').replace(',', ''));

        var totalItemPrice = quantity * price;
        $(this).find('.col:last-child').text('Rs.' + totalItemPrice.toFixed(2));

        totalItems += quantity;
        totalPrice += totalItemPrice;
    });

    $('#totalItems').text(totalItems);
    $('#totalPrice').text(totalPrice.toFixed(2));

    var shippingPrice = parseInt($('#shippingOption').val());

    // Update checkoutTotal
    updateCheckoutTotal(shippingPrice);
}





//=============================== Checkout function ====================================//
function checkout() {
    // Implement the checkout logic here
}