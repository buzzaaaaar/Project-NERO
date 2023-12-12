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


$sqlGetTotalQty = "SELECT total_qty FROM temporary_cart WHERE product_code = '$productCode'";
$resultTotalQty = $conn->query($sqlGetTotalQty);

if ($resultTotalQty->num_rows > 0) {
    $row = $resultTotalQty->fetch_assoc();
    $totalQty = $row['total_qty'];

    // Check if the new quantity exceeds the total_qty
    if ($newQuantity <= $totalQty) {
        
        $sqlUpdateQuantity = "UPDATE temporary_cart SET selected_qty = $newQuantity WHERE product_code = '$productCode'";

        if ($conn->query($sqlUpdateQuantity) === TRUE) {
            echo "Quantity updated successfully";
        } else {
            echo "Error updating quantity: " . $conn->error;
        }
    } else {
        echo "Quantity exceeds available stock.";
    }
} else {
    echo "Error: Product not found.";
}

$conn->close();
?>
