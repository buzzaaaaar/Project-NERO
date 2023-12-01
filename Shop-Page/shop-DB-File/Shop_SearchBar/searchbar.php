<?php
// Sample data - replace this with your actual data source
$data = array(
    "Item 1",
    "Item 2",
    "Item 3",
    // ... add more items as needed
);

// Get the search query from the AJAX request
$searchQuery = $_GET['query'];

// Perform the search
$results = array_filter($data, function($item) use ($searchQuery) {
    return stripos($item, $searchQuery) !== false;
});

// Return the results as JSON
echo json_encode($results);
?>
