<?php
include 'shop-DB-connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $product_id = filter_input(INPUT_POST, "product_id", FILTER_VALIDATE_INT);
    $product_quantity = filter_input(INPUT_POST, "quantity", FILTER_VALIDATE_INT);

    // Use a single SQL statement for both insert and update
    $sql = "
        INSERT INTO temporary_cart (product_code, selected_qty, description, unit_price, total_qty, total_price) 
        SELECT ?, ?, Product_Name, Product_Price, ?, ? * Product_Price
        FROM product_table
        WHERE Product_ID = ?
        ON DUPLICATE KEY UPDATE selected_qty = VALUES(selected_qty), total_price = VALUES(total_qty) * VALUES(unit_price)
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiiii", $product_id, $product_quantity, $product_quantity, $product_quantity, $product_id);
    $result = $stmt->execute();

    if ($result) {
        echo json_encode(["success" => "Product added to cart"]);
    } else {
        echo json_encode(["error" => "Error executing statement"]);
    }
    
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>

