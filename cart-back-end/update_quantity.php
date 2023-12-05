<?php
$server = "localhost";
$user = "root";
$pw = "";
$db = "nsbm"; // Use the correct database name

$conn = new mysqli($server, $user, $pw, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$productCode = $_POST['productCode'];
$newQuantity = $_POST['newQuantity'];

// Assuming you have a column named 'selected_qty' in your temporary_cart table
$sql = "UPDATE temporary_cart SET selected_qty = $newQuantity WHERE product_code = '$productCode'";

if ($conn->query($sql) === TRUE) {
    echo "Quantity updated successfully";
} else {
    echo "Error updating quantity: " . $conn->error;
}

$conn->close();
?>