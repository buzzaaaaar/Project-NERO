document.addEventListener("DOMContentLoaded", function () {
  fetch('genarateItems.php')
    .then(response => response.json())
    .then(data => {
      data.forEach(row => {
        createCartView(row);
      });
    })
    .catch(error => console.error('Error fetching data:', error));


  // Event listener for shipping method option
  document.getElementById('shippingOption').addEventListener('change', function () {
    updateCheckoutTotal();

  });


  // Add click event handler for the "Remove" button
  var cartTableBody = document.getElementById('cart-table-body');
  cartTableBody.addEventListener('click', function (event) {
    if (event.target.classList.contains('close')) {
      var description = event.target.closest('tr').querySelector('.description').textContent.trim();

      // Call a function to remove the item from the temporary cart
      removeItem(description);
    }
  });


  function removeItem(description) {
    // Send a fetch request to remove the item from the temporary cart
    fetch('removeItem.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: description }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP Error: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {

          var rowToRemove = document.querySelector('#cart-table-body tr[data-description="' + description + '"]');
          if (rowToRemove) {
            rowToRemove.remove();
          }

          location.reload();

        } else {
          console.error('Error removing item: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Fetch Error: ' + error);
      });
  }



  // Event listeners for + and -
  document.getElementById('cart-table-body').addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      event.preventDefault();
      var row = event.target.closest('tr');
      var description = row.querySelector('.description').innerText.trim();
      console.log(description);
      var selectedQty = parseInt(row.querySelector('.selected-qty').innerText, 10);
      console.log(selectedQty);

      fetchTotalQuantity(description)
        .then(data => {
          const totalQty = data.totalQty;
          console.log(totalQty);
          if (event.target.innerText === '+') {
            // Increase quantity
            if (selectedQty < totalQty) {
              handleQuantityChange(description, selectedQty + 1);
            } else {
              alert('Cannot increase quantity beyond total quantity.');
            }
          } else if (event.target.innerText === '-') {
            // Decrease quantity
            if (selectedQty > 0) {
              handleQuantityChange(description, selectedQty - 1);
            } else {
              alert('Quantity cannot be less than 0.');
            }
          }
        })
        .catch(error => console.error('Error fetching total quantity:', error));
    }
  });
});


//=========================================== Create the view by loading details =================================//
function createCartView(cartItem) {
  cartItem.unit_price = parseFloat(cartItem.unit_price);
  var cartItemRow = document.createElement('tr');
  cartItemRow.innerHTML = `
      <td><img class="img-fluid" src="images/${cartItem.image_path}"></td>
      <td style="text-align:center;" class="description">${cartItem.description}</td>
      <td style="padding-right:3vw;">Rs.${cartItem.unit_price.toFixed(2)}</td>
      <td>
          <a href="#">-</a>
          <a href="#" class="border selected-qty">${cartItem.selected_qty}</a>
          <a href="#">+</a>
      </td>
      <td>Rs.${(cartItem.unit_price * cartItem.selected_qty).toFixed(2)}</td>
      <td><span class="close" style="cursor:pointer;">&#10005;</span></td>
  `;
  calculateItemAndTotal(cartItem.selected_qty, (cartItem.unit_price * cartItem.selected_qty).toFixed(2));
  document.getElementById('cart-table-body').appendChild(cartItemRow);
}

//============================== calculate Total ==================================//
function calculateItemAndTotal(quantity, price) {
  //--------------Total Items Count---------//
  var totalItemsElement = document.getElementById('totalItems');
  var currentTotalItems = parseInt(totalItemsElement.innerText || 0, 10);
  totalItemsElement.innerText = currentTotalItems + parseInt(quantity, 10);

  //--------------Total Price Count---------//
  var totalPriceElement = document.getElementById('totalPrice');
  var currentTotalPrice = parseFloat(totalPriceElement.innerText || 0.00);
  totalPriceElement.innerText = (currentTotalPrice + parseFloat(price)).toFixed(2);

  updateCheckoutTotal();
}

//====================================== Update the checkout total based on shipping =========================================//
function updateCheckoutTotal() {
  var shippingOption = document.getElementById('shippingOption').value;
  var totalPrice = parseFloat(document.getElementById('totalPrice').innerText || 0.00);
  var checkoutTotal = totalPrice + parseFloat(shippingOption);
  document.getElementById('checkoutTotal').innerText = checkoutTotal.toFixed(2);
}

function fetchTotalQuantity(description) {
  return fetch('getTotalQuantity.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: description,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    });
}



//================================== Function to handle quantity change ===================================//
function handleQuantityChange(description, newQuantity) {
  fetch('updateQuantity.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: description,
      newQuantity: newQuantity,
    }),
  })
    .then(response => response.json())
    .then(data => {
      location.reload();
    })
    .catch(error => console.error('Error updating quantity:', error));
}


//Event listner for checkout button
var checkoutButton = document.getElementById('checkoutButton');
checkoutButton.addEventListener('click', function () {
  checkoutButton.disabled = true;
  checkout();
});


//=============================== Checkout function ====================================//
function checkout() {
  var userId = $('input[name="userId"]').val();

  var itemsToCheckout = [];

  // Loop through each row in the cart table
  $('#cart-table-body tr').each(function () {
      var productCode = $(this).find('.description').text().trim();
      var selectedQty = parseInt($(this).find('.selected-qty').text());

      if (selectedQty > 0) {
          var item = {
              productCode: productCode,
              selectedQty: selectedQty,
              userId: userId
          };

          itemsToCheckout.push(item);
      }
  });

  if (itemsToCheckout.length > 0) {
      $.ajax({
          type: "POST",
          url: "checkout.php",
          data: {
              items: JSON.stringify(itemsToCheckout)
          },
          success: function (data) {
              alert("Checkout successful!");
              clearTemporaryCart();
              location.reload();
          },
          error: function (xhr, status, error) {
              console.error("Error during checkout:", status, error);
              alert("Checkout failed. Please try again later.");
          }
      });
  } else {
      alert("No items selected for checkout.");
  }
}
//======================== Function to clear the temporary cart ========================//
function clearTemporaryCart() {
  $.ajax({
      type: "POST",
      url: "clear_temporary_cart.php", 
      success: function (data) {
          console.log("Temporary cart cleared.");
      },
      error: function (xhr, status, error) {
          console.error("Error clearing temporary cart:", status, error);
      }
  });
  checkoutButton.disabled = false;
}
