// script.js
function submitForm() {
  console.log('submitForm function called');  // Add this line for debugging
  var emailInput = document.getElementById('subscriberEmail');
  var email = emailInput.value;

  // Perform AJAX request to submit the form data to your PHP script
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'subscribe.php', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
      if (xhr.status === 200) {
          // Handle the response (if needed)
          console.log('AJAX request successful');  // Add this line for debugging
          console.log(xhr.responseText);

          // Clear the textbox content
          emailInput.value = '';
      } else {
          console.log('AJAX request failed');  // Add this line for debugging
      }
  };

  // Prevent the default form submission
  xhr.addEventListener("beforeSend", function (e) {
      e.preventDefault();
  });

  // Send the request with the email data
  xhr.send('subscriberEmail=' + encodeURIComponent(email));
}

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  grabCursor: true, // Corrected typo
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
