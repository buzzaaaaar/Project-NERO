<?php
 $server = "15.235.146.132";
 $user = "nero";
 $pw = "bD4z92R9";
 $db = "neroweb"; 
 
$conn = new mysqli($server, $user, $pw, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$itemsToCheckout = json_decode($_POST['items'], true);

foreach ($itemsToCheckout as $item) {
    $productCode = $item['productCode'];
    $selectedQty = $item['selectedQty'];
    $userId = $item['userId'];


    $sqlInsertOrder = "INSERT INTO placed_order (product_code, selected_qty, user_id) VALUES ('$productCode', $selectedQty, '$userId')";
    $conn->query($sqlInsertOrder);
}

$conn->close();

echo "Checkout successful!";
?>