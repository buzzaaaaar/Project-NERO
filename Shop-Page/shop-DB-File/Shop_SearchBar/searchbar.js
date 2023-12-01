const SearchResultContainer = document.querySelector(".mySearch-results-container");
const SearchInput = document.querySelector("#mySearchbarID");

SearchInput.onkeyup = function () {
    let input = SearchInput.value;
    if (input.length) {
        fetch('shop-DB-manage.php')
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
        return `<a href='Shop-Items/shop_item.html?id=${product.id}' onclick='selectInput(this)'><li>${product.name}</li></a>`;
    });

    SearchResultContainer.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(element) {
    SearchInput.value = element.querySelector('li').innerHTML;
    SearchResultContainer.innerHTML = '';
}
