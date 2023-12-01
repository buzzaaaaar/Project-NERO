// document.addEventListener('DOMContentLoaded', function () {
  
//     const filterFreeShippingBtn = document.getElementById('catagory-btn-free-shipping-js');
  
//     if (filterFreeShippingBtn) {
//         filterFreeShippingBtn.addEventListener('click', function () {

//             filterFreeShippingBtn.classList.toggle('active', filterFreeShippingBtn.getAttribute('aria-pressed') === 'true');

//             const sourceElements = document.querySelectorAll('.myCutom-js-FreeShipping');

//             sourceElements.forEach((sourceElement, index) => {
              
//                 const sourceText = sourceElement.innerText || sourceElement.textContent;
//                 const hasData = sourceText.trim() !== '';
             
//                 const destinationElements = document.querySelectorAll('.myCustom-JS-filter-itenm');
//                 const destinationElement = destinationElements[index]; 
//                 if (filterFreeShippingBtn.classList.contains('active')) {
                                      
//                     if (hasData) {
//                         destinationElement.classList.remove('shop-item-filter');
                       
//                     } else {
//                         destinationElement.classList.add('shop-item-filter');
                       
//                     }
//                 } else {
//                     destinationElement.classList.remove('shop-item-filter');
                   
//                 }
//             });
//         });
//     } else {
//         console.error('Button element not found.');
//     }
// });


document.addEventListener('DOMContentLoaded', function () {

    const freeShippingCheckbox = document.getElementById('catagory-checkbox-free-shipping-js');
    const offerCheckbox = document.getElementById('catagory-checkbox-offeres-js');

    if (freeShippingCheckbox && offerCheckbox) {

        function filterItems() {
            const freeShippingChecked = freeShippingCheckbox.checked;
            const offerChecked = offerCheckbox.checked;

            const sourceElements = document.querySelectorAll('.myCustom-JS-filter-itenm');

            sourceElements.forEach((sourceElement, index) => {
                const sourceTextFreeShipping = sourceElement.querySelector('.myCutom-js-FreeShipping').innerText || sourceElement.querySelector('.myCutom-js-FreeShipping').textContent;
                const sourceTextOffer = sourceElement.querySelector('.myCustom-Shop-item-offer').innerText || sourceElement.querySelector('.myCustom-Shop-item-offer').textContent;

                const hasFreeShippingData = sourceTextFreeShipping.trim() !== '';
                const hasOfferData = sourceTextOffer.trim() !== '';

                const destinationElement = document.querySelectorAll('.myCustom-JS-filter-itenm')[index];

                if (freeShippingChecked && offerChecked) {
                    destinationElement.classList.toggle('shop-item-filter', !(hasFreeShippingData && hasOfferData));
                }
                else if (freeShippingChecked) {
                    destinationElement.classList.toggle('shop-item-filter', !hasFreeShippingData);
                }
                else if (offerChecked) {
                    destinationElement.classList.toggle('shop-item-filter', !hasOfferData);
                } else {
                    destinationElement.classList.remove('shop-item-filter');
                }
            });
        }

        freeShippingCheckbox.addEventListener('change', function () {
            // freeShippingCheckbox.classList.toggle('active', freeShippingCheckbox.checked);
            filterItems();
        });

        offerCheckbox.addEventListener('change', function () {
            // offerCheckbox.classList.toggle('active', offerCheckbox.checked);
            filterItems();
        });

    } else {
        console.error('Checkbox element not found.');
    }


    //  Filter button ---> Haircare
    function handleButtonClick() {
        const sourceElements = document.querySelectorAll('.myCustom-item-category-aa');
    
        sourceElements.forEach((sourceElement, index) => {
            const sourceText = sourceElement.innerText || sourceElement.textContent;
            const targetText = "Haircare";
            const hasData = sourceText.trim() === targetText;
            console.log('hasData:', hasData);
    
            const destinationElements = document.querySelectorAll('.myCustom-JS-filter-itenm');
            const destinationElement = destinationElements[index];
    
            if (this.classList.contains('active')) {
                if (hasData) {
                    destinationElement.classList.remove('shop-item-filter2');
                } else {
                    destinationElement.classList.add('shop-item-filter2');
                }
            } else {
                destinationElement.classList.remove('shop-item-filter2');
            }
        });
    }
    
    const filterCategoryBtn1 = document.getElementById('myCutom-Category-JS-btn-1');
    const filterCategoryBtn12 = document.getElementById('myCutom-Category-JS-btn-12');
    
    if (filterCategoryBtn1 && filterCategoryBtn12) {
        filterCategoryBtn1.addEventListener('click', handleButtonClick);
        filterCategoryBtn12.addEventListener('click', handleButtonClick);
    } else {
        console.error('Button elements not found.');
    }
    

    
    //  Filter button ---> Skincare
    function handleButtonClick() {
        const sourceElements = document.querySelectorAll('.myCustom-item-category-aa');
    
        sourceElements.forEach((sourceElement, index) => {
            const sourceText = sourceElement.innerText || sourceElement.textContent;
            const targetText = "Skincare";
            const hasData = sourceText.trim() === targetText;
            console.log('hasData:', hasData);
    
            const destinationElements = document.querySelectorAll('.myCustom-JS-filter-itenm');
            const destinationElement = destinationElements[index];
    
            if (this.classList.contains('active')) {
                if (hasData) {
                    destinationElement.classList.remove('shop-item-filter2');
                } else {
                    destinationElement.classList.add('shop-item-filter2');
                }
            } else {
                destinationElement.classList.remove('shop-item-filter2');
            }
        });
    }
    
    const filterCategoryBtn2 = document.getElementById('myCutom-Category-JS-btn-2');
    const filterCategoryBtn22 = document.getElementById('myCutom-Category-JS-btn-22');
    
    if (filterCategoryBtn2 && filterCategoryBtn22) {
        filterCategoryBtn2.addEventListener('click', handleButtonClick);
        filterCategoryBtn22.addEventListener('click', handleButtonClick);
    } else {
        console.error('Button elements not found.');
    }

    //  Filter button ---> Body-care
    function handleButtonClick() {
        const sourceElements = document.querySelectorAll('.myCustom-item-category-aa');
    
        sourceElements.forEach((sourceElement, index) => {
            const sourceText = sourceElement.innerText || sourceElement.textContent;
            const targetText = "Body-care";
            const hasData = sourceText.trim() === targetText;
            console.log('hasData:', hasData);
    
            const destinationElements = document.querySelectorAll('.myCustom-JS-filter-itenm');
            const destinationElement = destinationElements[index];
    
            if (this.classList.contains('active')) {
                if (hasData) {
                    destinationElement.classList.remove('shop-item-filter2');
                } else {
                    destinationElement.classList.add('shop-item-filter2');
                }
            } else {
                destinationElement.classList.remove('shop-item-filter2');
            }
        });
    }
    
    const filterCategoryBtn3 = document.getElementById('myCutom-Category-JS-btn-3');
    const filterCategoryBtn32 = document.getElementById('myCutom-Category-JS-btn-32');
    
    if (filterCategoryBtn3 && filterCategoryBtn32) {
        filterCategoryBtn3.addEventListener('click', handleButtonClick);
        filterCategoryBtn32.addEventListener('click', handleButtonClick);
    } else {
        console.error('Button elements not found.');
    }


    //  Filter button ---> Makeup
    function handleButtonClick() {
        const sourceElements = document.querySelectorAll('.myCustom-item-category-aa');
    
        sourceElements.forEach((sourceElement, index) => {
            const sourceText = sourceElement.innerText || sourceElement.textContent;
            const targetText = "Makeup";
            const hasData = sourceText.trim() === targetText;
            console.log('hasData:', hasData);
    
            const destinationElements = document.querySelectorAll('.myCustom-JS-filter-itenm');
            const destinationElement = destinationElements[index];
    
            if (this.classList.contains('active')) {
                if (hasData) {
                    destinationElement.classList.remove('shop-item-filter2');
                } else {
                    destinationElement.classList.add('shop-item-filter2');
                }
            } else {
                destinationElement.classList.remove('shop-item-filter2');
            }
        });
    }
    
    const filterCategoryBtn4 = document.getElementById('myCutom-Category-JS-btn-4');
    const filterCategoryBtn42 = document.getElementById('myCutom-Category-JS-btn-42');
    
    if (filterCategoryBtn4 && filterCategoryBtn42) {
        filterCategoryBtn4.addEventListener('click', handleButtonClick);
        filterCategoryBtn42.addEventListener('click', handleButtonClick);
    } else {
        console.error('Button elements not found.');
    }


    // Filter price 
    const filterPriceBtn = document.getElementById('filter-price-btn');

    if (filterPriceBtn) {
        filterPriceBtn.addEventListener('click', function () {
            const minPriceInput = document.querySelector('input[placeholder="Minimum Price"]');
            const maxPriceInput = document.querySelector('input[placeholder="Maximem Price"]');

            const minPrice = parseFloat(minPriceInput.value) || 0;
            const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

            const sourceElements = document.querySelectorAll('.myCustom-Shop-cardbody');

            sourceElements.forEach((sourceElement, index) => {
                const priceData = sourceElement.dataset.price; // get price from class data
                const itemPrice = parseFloat(priceData) 

                const destinationElements = document.querySelectorAll('.myCustom-JS-filter-itenm');
                const destinationElement = destinationElements[index];

                const isInRange = itemPrice >= minPrice && itemPrice <= maxPrice;

                if (isInRange) {
                    destinationElement.classList.remove('shop-item-filter3');
                } else {
                    destinationElement.classList.add('shop-item-filter3');
                }
            });
        });
    } else {
        console.error('Button element not found.');
    }



});

